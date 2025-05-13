<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-center">{{ slug }}</h1>
    <div class="proseNovel max-w-none" v-html="data?.content" />
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  wrapperHeight: "h-120",
});
const route = useRoute();
const { data } = await useAsyncData(`content-${route.path}`, () =>
  $fetch(`/api/content${route.path}`)
);
// 获取最后一段路径作为文件名（slug）
const slug = decodeURIComponent(route.path.split("/").filter(Boolean).pop() || "小说");

// 设置页面 <title>
useHead({
  title: `碧瑶|折花笺|${slug}`,
});
//设置小说全局状态
const novelsSlug = useState('novelsSlug', () => '');

// 每次页面切换或初始化时自动更新
watchEffect(() => {
  const slug = decodeURIComponent(route.path.split('/').filter(Boolean).pop() || '');
  novelsSlug.value = slug;
});
</script>

<style>
.proseNovel {
  font-size: 18px;
  line-height: 1.5;
  color: #333;
  padding: 2rem;
  max-width: 1024px;
  margin: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  /* 阅读体验优化 */
  word-break: break-word;
  /* ✅ 支持中文、英文换行 */
  overflow-wrap: break-word;
  /* ✅ 解决长单词、长链接问题 */
  white-space: pre-wrap;
  /* ✅ 保留 Markdown 中换行 */
  text-align: justify;
  letter-spacing: 0.05em;
}

.proseNovel p {
  margin: 0.5em 0;
  text-indent: 2em;
}

@media (max-width: 600px) {
  .proseNovel {
    font-size: 16px;
    padding: 1.5rem 1rem;
  }
}
</style>