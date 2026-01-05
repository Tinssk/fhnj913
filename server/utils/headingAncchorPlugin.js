export default function headingAnchorPlugin(md) {
  md.core.ruler.push("heading-anchor", (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];

      if (t.type === "heading_open") {
        const inline = tokens[i + 1];
        if (!inline || inline.type !== "inline") continue;

        let title = inline.content.trim();
        let slug = title
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, "");

        // 给 <h*> 注入 id
        t.attrSet("id", slug);
        // 给标题内容包一层 <a>
        inline.children.unshift(
          Object.assign(new state.Token("link_open", "a", 1), {
            attrs: [
              ["href", `#${slug}`],
              ["class", "heading-anchor"],
            ],
          })
        );

        inline.children.push(Object.assign(new state.Token("link_close", "a", -1)));
      }
    }
  });
}
