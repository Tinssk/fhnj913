<template>
  <div class="flex flex-col items-center w-full mt-8">
    <div class="w-full max-w-xl mb-6">
      <input v-model="searchKeyword" @keyup.enter="handleSearch" type="text" placeholder="搜索证据库..."
        class="texto w-full px-5 py-3 rounded-full shadow-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-green-800 placeholder-green-400 transition-all duration-200" />
    </div>
    <div class="w-full max-w-2xl">
      <ul class="divide-y divide-green-200 rounded-lg shadow">
        <li v-for="evidence in pagedEvidences" :key="evidence" class="flex items-center hover:bg-green-200">
          <NuxtLink :to="`/evidence/${encodeURIComponent(evidence)}`" class="catBtn block w-full h-full py-3 px-6"><span
              class="inline-block w-2 h-2 rounded-full bg-green-400 mr-6"></span>{{ evidence }}</NuxtLink>
        </li>
      </ul>
      <!-- 分页器逻辑 -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 gap-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">上一页</button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
          :class="['px-3 py-1 rounded border', page === currentPage ? 'bg-green-400 text-white border-green-400' : 'bg-white text-green-700 border-green-300']">{{
            page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">下一页</button>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  title: '碧瑶|证据存档库',
  textCol: "text-black"
});
// 设置页面 <title>
useHead({
  title: `碧瑶|证据存档库`,
  meta: [{ name: 'description', content: '碧瑶相关的一切证据合集,存档' },
  { name: 'keywords', content: '碧瑶,诛仙,诛仙女主角碧瑶,资料馆,证据,资料库,存档' },]
});
import { ref, computed } from "vue";
import { NuxtLink } from '#components';
const route = useRoute()
const searchKeyword = ref("");
const currentPage = ref(1);
const pageSize = 20;

/*请求列表数据 */
const { data: evidencesData } = await useAsyncData("evidences-list", async () => {
  const path = route.path;
  const list = await $fetch("/api/areaSearch", { params: { path } });
  return shuffle(list); // 只服务端执行重排
});
const evidences = computed(() => evidencesData.value || []);

//搜索函数
async function handleSearch() {
  const keyword = searchKeyword.value.trim();
  console.log(keyword)
  const path = route.path; // 可根据实际路径调整
  const res = await $fetch("/api/areaSearch", { params: { keyword, path } });
  console.log(res)
  evidencesData.value = res;
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


const totalPages = computed(() => Math.ceil(evidences.value.length / pageSize));
const pagedEvidences = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return evidences.value.slice(start, start + pageSize);
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
