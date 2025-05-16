<template>
  <div class="chapter-outer-wrapper flex flex-col items-center w-full mt-10">
    <h1 class="text-3xl font-extrabold text-green-800 mb-2 drop-shadow">欢迎大家来到我们的碧瑶传企划</h1>
    <p class="text-green-700">这里未来会很丰富,添加无数内容,现在暂时只放碧瑶传小说,其他内容后续待跟进~</p>
    <NuxtLink :to="`/biyaofame/1`"
      class="catBtn  bg-green-400 hover:bg-green-600 w-30 h-auto hover:scale-110 mt-8 text-center rounded-xl px-6 py-1">
      开始阅读
    </NuxtLink>
    <div
      class="chapter-card bg-gradient-to-br from-green-100 via-green-50 to-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-2xl border border-green-200">
      <h2 class="chapter-title text-2xl font-bold text-green-700 mb-6 text-center tracking-wide drop-shadow">章节目录</h2>
      <div class="text-center mb-8">
      </div>
      <div class="chapter-list-wrapper flex flex-col items-center gap-3 mt-8">
        <template v-for="(chapter, idx) in sortedChapters" :key="idx">
          <NuxtLink :to="`/biyaofame/${chapter.num}`"
            class="catBtn chapter-link block w-full max-w-md px-6 py-1 rounded-xl shadow-md bg-gradient-to-r from-green-300 to-green-500 text-white hover:text-black font-semibold text-lg hover:from-green-400 hover:to-green-600 hover:scale-105 transition-all duration-200 border-b border-green-200 last:border-b-0">
            {{ chapter.title }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue'
import chapterMapRaw from '~~/public/chapter_map.json'

definePageMeta({
  banner: '/img/header/biyaofame-header.jpg',
  title: '碧瑶传',
  wrapperHeight: 'h-200',
});
useHead({
  title: `碧瑶传首页`,
});
const chapters = ref([])
const sortedChapters = ref([])

chapters.value = chapterMapRaw.map(obj => {
  const num = Object.keys(obj)[0]
  return { num: Number(num), title: obj[num] }
})
sortedChapters.value = chapters.value.slice().sort((a, b) => a.num - b.num)
</script>

<style>
.chapter-outer-wrapper {
  background: linear-gradient(120deg, #e0fce6 0%, #f0fdf4 100%);
  min-height: 100vh;
  padding-bottom: 3rem;
}

.chapter-card {
  box-shadow: 0 8px 32px 0 rgba(34, 197, 94, 0.12), 0 1.5px 6px 0 rgba(34, 197, 94, 0.08);
  border-radius: 1.5rem;
  border: 1.5px solid #bbf7d0;
  background: linear-gradient(120deg, #f0fdf4 60%, #e0fce6 100%);
}

.chapter-title {
  letter-spacing: 0.08em;
  text-shadow: 0 2px 8px #bbf7d0;
}

.chapter-list-wrapper {
  margin-bottom: 2rem;
}

.chapter-link {
  background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
  color: #fff;
  border: none;
  border-radius: 0.85rem;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.12);
  font-size: 1.15rem;
  font-weight: 600;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
  border-bottom: 1.5px solid #bbf7d0;
}

.chapter-link:hover {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.18);
}
</style>
