/*本markdown-it插件,用来对md中的图片添加大小占位符,防止偏移 */
import { getImageMetaSync } from "../image-meta-cache";

export default function imageWrapperPlugin(md) {
  md.core.ruler.push("image-wrapper", (state) => {
    const tokens = state.tokens;
    console.log("image-wrapper plugin running...");
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      /*处理直接写img标签的情况 <img ...> */
      if (token.type === "html_block") {
        if (!/<img\b/i.test(token.content)) {
          continue; // 没有 img 标签，直接跳过
        }
        token.content = token.content.replace(/<img\s+([^>]*)>/gi, (match, attrs) => {
          // 1. 尝试提取 src
          const srcMatch = attrs.match(/src\s*=\s*["']([^"']+)["']/i);
          if (!srcMatch) {
            return match; // 没有 src，保持原样
          }

          const src = srcMatch[1].trim();

          // 只处理我们关心的本地路径图片
          if (!src.startsWith("/")) {
            return match;
          }

          // 2. 获取图片元数据（宽高）
          let meta;
          try {
            meta = getImageMetaSync(src);
            if (!meta?.width || !meta?.height) {
              return match;
            }
          } catch (e) {
            console.warn(`Failed to get dimensions for ${src}:`, e);
            return match;
          }

          const { width, height } = meta;
          const aspectRatio = `${width} / ${height}`;

          // 3. 根据是否已有 style 属性来决定如何插入
          const hasStyle = /\bstyle\s*=\s*["']/i.test(attrs);

          if (hasStyle) {
            // 已有 style → 在 style 内容末尾追加
            return match.replace(/\bstyle\s*=\s*["']([^"']*)["']/i, (styleMatch, styleContent) => {
              // 避免重复添加 aspect-ratio
              if (/aspect-ratio\s*:/i.test(styleContent)) {
                return styleMatch; // 已存在，不动
              }
              return `style="${styleContent.trim()}; aspect-ratio: ${aspectRatio}"`;
            });
          } else {
            // 没有 style → 直接插入新的 style 属性
            // 在 src 后面或其他位置插入都可以，这里放在开头比较常见
            return match.replace(/<img\s+/i, `<img style="aspect-ratio: ${aspectRatio};" `);
          }
        });
      }
    }
  });
}
