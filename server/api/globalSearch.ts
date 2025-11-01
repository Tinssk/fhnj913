// server/api/search
import PageData from "~/../server/data/Search.json";
import biyaofameData from "~/../server/data/chapter_map.json";

export default defineEventHandler(async (event) => {
  /*定义搜索结果的结构类型
  full为导向结果的链接,prefix为前缀,用来进行标签分类,name则为搜索的结果名字;
  */
  interface globalSearchInfo {
    full: string;
    prefix: string;
    name: string;
  }
  /*先定义返回的数组 */
  let results: globalSearchInfo[] = [];
  const storage = useStorage("assets:content");
  //获取查询信息
  const query = getQuery(event) || {};
  const keyword = (query.q || "").toString().trim().toLowerCase();

  if (!keyword) {
    return { success: false, message: "请提供查询关键字参数 ?q=xxx" };
  }
  // 获取所有 页面的md 文件名
  const files = await storage.getKeys();
  const mdFiles = files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const cleaned = f.replace(/\.md$/, "");
      const colonIndex = cleaned.indexOf(":");

      if (colonIndex !== -1) {
        const prefix = cleaned.slice(0, colonIndex);
        const name = cleaned.slice(colonIndex + 1);
        return {
          full: `${prefix}/${name}`, // 替换冒号为斜杠
          prefix,
          name,
        };
      } else {
        return {
          full: cleaned, // 无冒号时直接返回
          prefix: cleaned,
          name: cleaned,
        };
      }
    });

  if (keyword) {
    // 对搜索参数格式化,防止大小写影响
    const lowerKeyword = keyword.toLowerCase();
    // 首先搜索文件名是否匹配
    for (const mdName of mdFiles) {
      if (mdName.name.toLowerCase().includes(lowerKeyword)) {
        // 检查是否已存在，避免重复
        if (!results.some((item) => item.full === mdName.full)) {
          results.push(mdName);
        }
      }
    }
    // 然后搜索页面是否匹配
    for (const item of PageData) {
      const prefix = Object.keys(item)[0];
      const cname = item[prefix as keyof typeof item];
      if (prefix && cname && cname.toLowerCase().includes(lowerKeyword)) {
        // 检查是否已存在，避免重复
        if (!results.some((r) => r.full === prefix)) {
          results.push({
            full: prefix,

            prefix: prefix,

            name: cname,
          });
        }
      }
    }
    //然后是针对碧瑶传章节的特殊搜索:
    for (const item of biyaofameData) {
      const prefix = Object.keys(item)[0];
      const cname = item[prefix as keyof typeof item];
      if (prefix && cname && cname.toLowerCase().includes(lowerKeyword)) {
        // 检查是否已存在，避免重复
        if (!results.some((r) => r.full === prefix)) {
          results.push({
            full: `biyaofame/${prefix}`,

            prefix: `biyaofame`,

            name: cname,
          });
        }
      }
    }
  }
  return results;
});
