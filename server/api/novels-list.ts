import { promises as fs } from "fs";
import path from "path";

const novelsDir = path.resolve(process.cwd(), "content/novels");

async function getMarkdownFiles(dir: string): Promise<string[]> {
  let results: string[] = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const file of list) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(await getMarkdownFiles(filePath));
    } else if (file.isFile() && file.name.endsWith(".md")) {
      results.push(filePath);
    }
  }
  return results;
}

export default defineEventHandler(async (event) => {
  try {
    const files = await getMarkdownFiles(novelsDir);
    // 提取文件名（去掉扩展名）
    const names = files.map(f => path.basename(f, ".md"));
    return names;
  } catch (e) {
    return [];
  }
});
