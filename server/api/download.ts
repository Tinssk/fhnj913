// server/api/download.ts
export default defineEventHandler(async (event) => {
  const url = getQuery(event).url as string;
  if (!url) {
    throw createError({ statusCode: 400, message: "Missing image URL" });
  }

  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  // 设置文件头以下载
  event.node.res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(url.split("/").pop() || "download.jpg"));
  event.node.res.setHeader("Content-Type", response.headers.get("Content-Type") || "application/octet-stream");
  return Buffer.from(buffer);
});
