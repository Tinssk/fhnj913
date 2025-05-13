import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { decodeURIComponentSafe } from "~~/server/utils/decode-url"; // 我们待会定义这个函数

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};

  if (!slug) {
    throw createError({ statusCode: 400, message: "No slug provided" });
  }

  // 确保 slug 是数组，并 decode 每一段（支持中文）
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const decodedSlug = slugArray.map(decodeURIComponentSafe);

  // 拼接文件路径，例如 server/content/瓶瑶.md
  const filePath = path.resolve("content", ...decodedSlug) + ".md";

  // 如果文件不存在，抛出 404
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, message: "Markdown file not found" });
  }

  // 读取并解析 Markdown
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const matterResult = matter(fileContent);
  // 创建 MarkdownIt 实例
  const md = new MarkdownIt({ breaks: true });
  md.disable("code");
  const html = md.render(matterResult.content);
  console.log(html);

  return {
    frontmatter: matterResult.data,
    content: html,
  };
});
