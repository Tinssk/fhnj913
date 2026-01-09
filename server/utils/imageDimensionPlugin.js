/*本markdown-it插件,用来对md中的图片添加大小占位符,防止偏移 */
import { getImageMetaSync } from "../image-meta-cache";
import imgSizeMap from "~/../public/img/imgSizeMap.json";

export default function imageWrapperPlugin(md) {
  md.core.ruler.push("image-wrapper", (state) => {
    const tokens = state.tokens;
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
          const smallSrc = src.replace(/^\/img\//, "/img/small/"); //提取缩略图的src
          // 只处理我们关心的本地路径图片
          if (!src.startsWith("/")) {
            return match;
          }

          // 2. 获取图片元数据（宽高）
          let meta;
          try {
            meta = imgSizeMap[src];
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
          let newImgHtml;

          if (hasStyle) {
            // 已有 style → 在 style 内容末尾追加
            newImgHtml = match.replace(/\bstyle\s*=\s*["']([^"']*)["']/i, (styleMatch, styleContent) => {
              if (/aspect-ratio\s*:/i.test(styleContent)) {
                return styleMatch;
              }
              return `style="${styleContent.trim()}; aspect-ratio: ${aspectRatio}"`;
            });
          } else {
            // 没有 style → 直接插入新的 style 属性
            // 在 src 后面或其他位置插入都可以，这里放在开头比较常见
            newImgHtml = match.replace(/<img\s+/i, `<img style="aspect-ratio: ${aspectRatio};" `);
          }
          //4. 获取img的类名
          const classMatch = attrs.match(/\bclass\s*=\s*["']([^"']+)["']/i);
          const imgClass = classMatch ? classMatch[1].trim() : "";

          /*进行包装div */
          return `<div class="blurred-img ${imgClass}" style="background-image: url('${smallSrc}');background-size: cover;background-repeat: no-repeat;inset:0;aspect-ratio: ${aspectRatio}">${newImgHtml}</div>`;
        });
      }
    }
  });
}
