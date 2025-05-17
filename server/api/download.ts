export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const path = query.path as string; // 例如 "/img/foo.jpg"

  if (!path || !path.startsWith("/")) {
    throw createError({ statusCode: 400, statusMessage: "Invalid path" });
  }

  // ✅ 动态获取当前部署域名
  const baseURL = getRequestURL(event).origin;
  const url = `${baseURL}${path}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30秒超时

  let response;
  try {
    response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        throw createError({ statusCode: 408, statusMessage: "Request timeout" });
      }
      throw err;
    }
    // 如果不是Error类型，也抛出或者自定义处理
    throw createError({ statusCode: 500, statusMessage: "Unknown error" });
  }

  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: "Image not found" });
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw createError({ statusCode: 415, statusMessage: `Expected image content-type, but got: ${contentType}` });
  }

  const filename = path.split("/").pop() || "downloaded.jpg";
  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);

  // 这里使用 Node.js 的流管道，边下载边返回
  const stream = response.body;
  if (!stream) {
    throw createError({ statusCode: 500, statusMessage: "No response body stream" });
  }

  return stream;
});
