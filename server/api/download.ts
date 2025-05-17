export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const path = query.path as string; // 例如 "/img/foo.jpg"

  if (!path || !path.startsWith("/")) {
    throw createError({ statusCode: 400, statusMessage: "Invalid path" });
  }

  // ✅ 动态获取当前部署域名
  const baseURL = getRequestURL(event).origin;
  const url = `${baseURL}${path}`;

  // 封装带超时的fetch函数
  async function fetchWithTimeout(url: string, timeoutMs = 10000, signal?: AbortSignal) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, { signal: signal || controller.signal });
      clearTimeout(timeout);
      return res;
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  }

  // 带重试的fetch
  async function fetchWithRetry(url: string, retries = 3, delayMs = 1000) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const res = await fetchWithTimeout(url, 10000);
        if (!res.ok) {
          throw createError({ statusCode: res.status, statusMessage: "Image not found" });
        }
        return res;
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            // 超时错误
            if (attempt === retries - 1) {
              throw createError({ statusCode: 408, statusMessage: "Request timeout" });
            }
          } else if (err.message.includes("network") || err.message.includes("fetch") || err.message.includes("failed")) {
            // 网络相关错误，进行重试
            if (attempt === retries - 1) {
              throw createError({ statusCode: 503, statusMessage: "Service unavailable" });
            }
          } else {
            // 其他错误直接抛
            throw err;
          }
        } else {
          throw createError({ statusCode: 500, statusMessage: "Unknown error" });
        }
        // 等待一段时间再重试
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
    // 理论上不会执行到这里
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch image after retries" });
  }

  // 主逻辑调用
  const response = await fetchWithRetry(url);

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw createError({ statusCode: 415, statusMessage: `Expected image content-type, but got: ${contentType}` });
  }

  const filename = path.split("/").pop() || "downloaded.jpg";
  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);

  const stream = response.body;
  if (!stream) {
    throw createError({ statusCode: 500, statusMessage: "No response body stream" });
  }

  return stream;
});
