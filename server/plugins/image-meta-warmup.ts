import { warmupImageMeta } from "../image-meta-cache";

export default defineNitroPlugin(async () => {
  await warmupImageMeta();
});
