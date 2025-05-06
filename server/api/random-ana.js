// server/api/random-ana.ts

import { readFile } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async () => {
  // 获取 public/data/ana.json 的路径
  const filePath = join(process.cwd(), "public", "data", "ana.json");

  try {
    // 读取文件内容
    const fileContent = await readFile(filePath, "utf-8");

    // 解析 JSON 内容并返回
    const segments = JSON.parse(fileContent);
    return { segments }; // 返回整个数组
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to read JSON file",
    });
  }
});
