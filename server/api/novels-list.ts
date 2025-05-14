// server/api/novels-list.ts
export default defineEventHandler(async (event) => {
  const storage = useStorage("assets:content");
  // 获取所有 markdown 文件名（含 novels 目录下的）
  const files = await storage.getKeys();
  // 过滤出 novels 目录下的 .md 文件
  const novelFiles = files.filter((f) => f.startsWith("novels:") && f.endsWith(".md"));
  // 去掉 novels/ 前缀和 .md 后缀，只保留文件名
  const names = novelFiles.map((f) => f.slice(7, -3));
  return names;
});
