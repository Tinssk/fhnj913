export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const path = query.path as string; // 例如 "/img/foo.jpg"

  if (!path || !path.startsWith("/")) {
    throw createError({ statusCode: 400, statusMessage: "Invalid path" });
  }

  // ✅ 动态获取当前部署域名
  const baseURL = getRequestURL(event).origin;
  const url = `${baseURL}${path}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw createError({ statusCode: 404, statusMessage: "Image not found" });
  }

  const buffer = await response.arrayBuffer();
  const filename = path.split("/").pop() || "downloaded.jpg";

  setHeader(event, "Content-Type", response.headers.get("content-type") || "application/octet-stream");
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);

  return new Uint8Array(buffer);
});
