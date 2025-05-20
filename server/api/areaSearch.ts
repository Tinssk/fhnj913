// server/api/novels-list.ts
export default defineEventHandler(async (event) => {
  const storage = useStorage("assets:content");
  const query = getQuery(event) || {};
  let { keyword, path } = query;
  //提取path,去掉前面的/
  if (typeof path === "string") {
    if (path.startsWith("/")) {
      path = path.slice(1);
    }
  } else {
    // 如果 path 不是字符串，置为空字符串或者 null
    path = "";
  }
  // 获取所有 markdown 文件名（含 novels 目录下的）
  const files = await storage.getKeys();
  // 过滤出 novels 目录下的 .md 文件
  let namesFiles = files.filter((f) => f.startsWith(`${path}:`) && f.endsWith(".md"));

  // 如果传入 path 参数，则进一步筛选
  if (path) {
    // path 只支持 novels: 开头的子目录
    namesFiles = namesFiles.filter((f) => f.startsWith(`${path}`));
  }
  // 去掉 目录 前缀和 .md 后缀，只保留文件名
  let names = namesFiles.map((f) => f.replace(/^[^:]+:/, "").replace(/\.md$/, ""));

  // 如果传入 keyword 参数，则进行模糊搜索
  if (keyword) {
    if (typeof keyword === "string") {
      const lowerKeyword = keyword.toLowerCase();
      names = names.filter((name) => name.toLowerCase().includes(lowerKeyword));
    }
  }

  return names;
});
