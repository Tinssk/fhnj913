// server/api/download.ts
import { sendStream } from "h3";
export default defineEventHandler(async (event) => {
  const url = getQuery(event).url as string;
  if (!url) {
    throw createError({ statusCode: 400, message: "Missing image URL" });
  }
  try {
    const res = await fetch(url, {
      headers: {
        // 可根据需要伪造 Referer 或 User-Agent
        Referer: url,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) {
      throw createError({ statusCode: res.status, message: "图片获取失败" });
    }
    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const filename = url.split("/").pop() || "download.jpg";
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
    return sendStream(event, res.body);
  } catch (e) {
    throw createError({ statusCode: 500, message: "图片下载失败" });
  }
});
