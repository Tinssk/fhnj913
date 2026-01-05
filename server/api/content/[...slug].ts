import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { decodeURIComponentSafe } from "~~/server/utils/decode-url";
import tableWrapperPlugin from "~~/server/utils/tableWrapperPlugin";
import extractToc from "~~/server/utils/extractToc";
import headingAnchorPlugin from "~~/server/utils/headingAncchorPlugin";
import imageDimensionPlugin from "~~/server/utils/imageDimensionPlugin";
export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};

  if (!slug) {
    throw createError({ statusCode: 400, message: "No slug provided" });
  }

  // 确保 slug 是数组，并 decode 每一段（支持中文）
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const decodedSlug = slugArray.map(decodeURIComponentSafe);
  // 拼接markdown文件路径，例如 瓶瑶.md
  const fileName = decodedSlug.join("/") + ".md";
  // 通过useStorage读取server assets中的markdown内容
  const fileContent = await useStorage("assets:content").getItemRaw(fileName);
  if (!fileContent) {
    throw createError({ statusCode: 404, message: "Markdown file not found" });
  }

  // 解析 Markdown 内容
  const matterResult = matter(fileContent.toString("utf-8"));
  const md = new MarkdownIt({ breaks: true, html: true });
  md.use(tableWrapperPlugin); //为所有表格外包一层div
  md.use(headingAnchorPlugin); // 为标题添加锚点
  md.use(imageDimensionPlugin); // 为图片添加宽高属性
  md.disable("code"); // 禁用内置代码块渲染
  const toc = extractToc(md, matterResult.content); // 提取目录
  const html = md.render(matterResult.content);
  return {
    frontmatter: matterResult.data,
    content: html,
    toc,
  };
});
