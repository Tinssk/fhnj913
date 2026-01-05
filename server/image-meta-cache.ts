// /server/image-meta-cache.ts
import sizeOf from "image-size";

const imageSizeMap = new Map<string, { width: number; height: number }>();

export async function warmupImageMeta() {
  const storage = useStorage("assets:public:img:wiki");
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

export function getImageMetaSync(src: string) {
  const result = imageSizeMap.get(src);
  return result;
}
