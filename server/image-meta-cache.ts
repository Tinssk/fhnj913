// /server/image-meta-cache.ts
/*本代码已停用 */
import sizeOf from "image-size";

const imageSizeMap = new Map<string, { width: number; height: number }>();
//生成图片大小map
export async function warmupImageMeta() {
  const storage = useStorage("assets:wiki");
  const keys = await storage.getKeys();

  for (const key of keys) {
    if (!/\.(png|jpe?g|webp|avif)$/i.test(key)) continue;
    const raw = await storage.getItemRaw(key);
    if (!raw) continue;

    const { width, height } = sizeOf(raw);
    const normalKey = "/img/wiki/" + key.replace(/:/g, "/");
    imageSizeMap.set(normalKey, { width, height });
    console.log(`[image-meta] cached ${normalKey}: ${width}x${height}`);
  }

  console.log("[image-meta] warmed:", imageSizeMap.size);
}
//获取图片大小map的api
export function getImageMetaSync(src: string) {
  const result = imageSizeMap.get(src);
  return result;
}
