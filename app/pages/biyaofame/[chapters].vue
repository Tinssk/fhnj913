<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-center">{{ slugT }}</h1>
    <div class="chapter-nav-btns flex justify-center gap-6 mt-12 mb-8">
      <button v-if="currentNum > 1"
        class="chapter-btn prev rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-200 font-semibold px-6 py-2 shadow-lg hover:from-green-600 hover:to-green-300 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95"
        @click="goToChapter(currentNum - 1)">上一章</button>
      <button
        class="chapter-btn catalog rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-green-900 font-bold px-6 py-2 shadow-md hover:from-green-500 hover:to-green-700  hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95"
        @click="goToCatalog">目录</button>
      <button v-if="currentNum < maxChapterNum"
        class="chapter-btn next rounded-xl bg-gradient-to-r from-green-200 via-green-400 to-green-500 text-white font-semibold px-6 py-2 shadow-lg hover:from-green-300 hover:to-green-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95"
        @click="goToChapter(currentNum + 1)">下一章</button>
    </div>
    <div class="proseNovel max-w-none" v-html="data?.content" />
    <div class="chapter-nav-btns flex justify-center gap-6 mt-12 mb-8">
      <button v-if="currentNum > 1"
        class="chapter-btn prev rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-200 font-semibold px-6 py-2 shadow-lg hover:from-green-600 hover:to-green-300 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95"
        @click="goToChapter(currentNum - 1)">上一章</button>
      <button
        class="chapter-btn catalog rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-green-900 font-bold px-6 py-2 shadow-md hover:from-green-500 hover:to-green-700  hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95"
        @click="goToCatalog">目录</button>
      <button v-if="currentNum < maxChapterNum"
        class="chapter-btn next rounded-xl bg-gradient-to-r from-green-200 via-green-400 to-green-500 text-white font-semibold px-6 py-2 shadow-lg hover:from-green-300 hover:to-green-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95"
        @click="goToChapter(currentNum + 1)">下一章</button>
    </div>
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  banner: '/img/header/biyaofameChapters-header.jpg',
  title: '碧瑶传',
  wrapperHeight: 'h-220',
});

import chapterMapRaw from '~~/public/chapter_map.json'
const route = useRoute();
const { data } = await useAsyncData(`content-${route.path}`, () =>
  $fetch(`/api/content${route.path}`)
);
// 获取最后一段路径作为文件名（slug）
const slugT = decodeURIComponent(route.path.split("/").filter(Boolean).pop() || "小说");
function getChapterTitleByNum(num) {
  const found = chapterMapRaw.find(obj => Object.keys(obj)[0] == num)
  return found ? found[num] : undefined
}
const slug = getChapterTitleByNum(slugT)

// 设置页面 <title>
useHead({
  title: `碧瑶传|${slug}`,
});
//设置小说全局状态
const biyaofameChapter = useState('biyaofameChapter', () => '');

// 每次页面切换或初始化时自动更新
watchEffect(() => {
  biyaofameChapter.value = slug;
});
const router = useRouter();
const currentNum = computed(() => {
  const n = parseInt(slugT, 10);
  return isNaN(n) ? 1 : n;
});
const maxChapterNum = computed(() => {
  // chapterMapRaw 是数组，每项为{"n": "章节名"}
  return Math.max(...chapterMapRaw.map(obj => Number(Object.keys(obj)[0])));
});
function goToChapter(num) {
  if (num < 1 || num > maxChapterNum.value) return;
  router.push(`/biyaofame/${num}`);
}
function goToCatalog() {
  router.push('/biyaofame');
}
</script>

<style></style>
