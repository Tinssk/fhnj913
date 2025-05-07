// server/api/random-ana.ts

import { readFile } from "fs/promises";
import { join } from "path";
import data from "~/../server/data/ana.json";

export default defineEventHandler(async () => {
  try {
    // 解析 JSON 内容并返回
    const segments = data;
    return { segments }; // 返回整个数组
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to read JSON file",
    });
  }
});
