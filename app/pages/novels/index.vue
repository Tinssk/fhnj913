<template>
  <div class="flex flex-col items-center w-full mt-8">
    <div class="w-full max-w-xl mb-6">
      <div class="flex">
        <input v-model="searchKeyword" @keyup.enter="handleSearch" type="text" placeholder="搜索小说..."
          class="texto w-full px-5 py-3 rounded-full shadow-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-green-800 placeholder-green-400 transition-all duration-200" />
      </div>
    </div>
    <div class="w-full max-w-2xl">
      <ul class="divide-y divide-green-200 rounded-lg shadow">
        <li v-for="novel in pagedNovels" :key="novel" class="flex items-center hover:bg-green-200">
          <NuxtLink :to="`/novels/${encodeURIComponent(novel)}`" class="catBtn block w-full h-full py-3 px-6"><span
              class="inline-block w-2 h-2 rounded-full bg-green-400 mr-6"></span>{{ novel }}</NuxtLink>
        </li>
      </ul>
      <!-- 分页器逻辑 -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 gap-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="catBtn px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">上一页</button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" class="catBtn"
          :class="['px-3 py-1 rounded border', page === currentPage ? 'bg-green-400 text-white border-green-400' : 'bg-white text-green-700 border-green-300']">{{
            page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="catBtn px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">下一页</button>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  title: '碧瑶同人文资料库',
  textCol: "text-black"
});
// 设置页面 <title>
useHead({
  title: `碧瑶|折花笺|同人文资料库`,
  meta: [{ name: 'description', content: '碧瑶的同人文资料库,各种碧瑶的同人文,小说都在这里' },
  { name: 'keywords', content: '碧瑶,小说,同人文,诛仙,诛仙女主角碧瑶,资料馆' },]
});
import { ref, computed } from "vue";
import { NuxtLink } from '#components';
const route = useRoute()
const currentPage = ref(1);
const pageSize = 20;
const searchKeyword = ref("");
console.log(route.path)
/*请求列表数据 */
/*设置缓存保证一次访问的顺序一致性 */
const cachedNovels = useState('novelsList-cache', () => null);

if (!cachedNovels.value) {
  const { data } = await useAsyncData("novels-list", async () => {
    const path = route.path;
    const list = await $fetch("/api/areaSearch", { params: { path } });
    return shuffle(list);
  });
  cachedNovels.value = data.value;
}
const novelsData = ref(cachedNovels.value || []);
const novels = computed(() => novelsData.value || []);

//搜索函数
async function handleSearch() {
  const keyword = searchKeyword.value.trim();
  const path = route.path; // 可根据实际路径调整
  const res = await $fetch("/api/areaSearch", { params: { keyword, path } });
  console.log(res)
  novelsData.value = res;
  currentPage.value = 1;
}
// 洗牌算法
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


const totalPages = computed(() => Math.ceil(novels.value.length / pageSize));
const pagedNovels = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return novels.value.slice(start, start + pageSize);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
// 分页页码显示逻辑（最多显示7个页码）
const visiblePages = computed(() => {
  const total = totalPages.value;
  const cur = currentPage.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (cur >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", cur - 1, cur, cur + 1, "...", total];
});
</script>

<style></style>
