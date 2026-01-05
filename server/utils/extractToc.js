export default function extractToc(md, content) {
  const tokens = md.parse(content, {});
  const toc = [];

  let currentH3 = null;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    if (t.type === "heading_open") {
      const level = Number(t.tag.replace("h", ""));
      const inline = tokens[i + 1];

      if (!inline || inline.type !== "inline") continue;

      const title = inline.content.trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // ### -> 一级目录
      if (level === 3) {
        currentH3 = {
          title,
          id,
          children: [],
        };
        toc.push(currentH3);
      }

      // #### -> 二级目录
      if (level === 4 && currentH3) {
        currentH3.children.push({
          title,
          id,
        });
      }
    }
  }

  return toc;
}
