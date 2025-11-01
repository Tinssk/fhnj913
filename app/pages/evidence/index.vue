<template>
  <div class="flex flex-col items-center w-full mt-8">
    <div class="w-full max-w-xl mb-6">
      <input v-model="searchKeyword" @keyup.enter="handleSearch" type="text" placeholder="搜索证据库..." class="texto w-full px-5 py-3 rounded-full shadow-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-green-800 placeholder-green-400 transition-all duration-200" />
    </div>
    <!-- 搜索到内容,进行展示 -->
    <div class="w-full max-w-2xl">
      <ul class="divide-y divide-green-200 rounded-lg shadow">
        <li v-for="evidence in pagedEvidences" :key="evidence" class="flex items-center hover:bg-green-200">
          <NuxtLink :to="`/evidence/${encodeURIComponent(evidence)}`" class="catBtn block w-full h-full py-3 px-6"><span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-6"></span>{{ evidence }}</NuxtLink>
        </li>
      </ul>
      <!-- 分页器逻辑 -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 gap-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">上一页</button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="['px-3 py-1 rounded border', page === currentPage ? 'bg-green-400 text-white border-green-400' : 'bg-white text-green-700 border-green-300']">{{ page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">下一页</button>
      </div>
    </div>
    <!-- 搜索中加载提示 -->
    <div v-if="isSearching" class="mt-8 flex flex-col items-center justify-center p-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm max-w-2xl text-green-800 text-center animate-fade-in">
      <div class="flex items-center justify-center gap-4">
        <div class="w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
        <p class="text-lg font-medium">瑶瑶正在努力搜索中，请稍候...</p>
      </div>
    </div>
    <!-- 未搜到提示 -->
    <div v-if="searchNull" class="mt-6 flex items-center justify-center gap-4 p-5 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm max-w-xl text-green-800 text-center transition-all duration-300">
      <img src="/img/errorWeep.png" alt="not found" class="w-14 h-14 opacity-90" />
      <p class="text-lg font-medium">
        很抱歉，瑶瑶没有搜索到
        <span class="font-semibold text-green-700">「{{ searchKeyword }}」</span>相关的证据资料,请尝试搜索其他。
      </p>
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
  { name: 'keywords', content: '碧瑶,诛仙,诛仙女主角碧瑶,资料站,证据,资料库,存档' },]
});
import { ref, computed } from "vue";
import { NuxtLink } from '#components';
const route = useRoute()
const router=useRouter()
const searchKeyword = ref("");
const currentPage = ref(1);
const pageSize = 20;

const searchNull = ref(false)  // 未搜到状态
const isSearching = ref(false); // 搜索中状态
/*请求列表数据 */
/*设置缓存保证一次访问的顺序一致性 */
const cachedEvidences = useState('evidencesList-cache', () => null);
if (!cachedEvidences.value) {
  const { data } = await useAsyncData("evidences-list", async () => {
    const path = route.path;
    const list = await $fetch("/api/areaSearch", { params: { path } });
    return shuffle(list); // 只服务端执行重排
  });
  cachedEvidences.value = data.value
}
const evidencesData = ref(cachedEvidences.value || [])
const evidences = computed(() => evidencesData.value || []);

//搜索函数
async function handleSearch() {
  //判断是否为空
  const keyword = searchKeyword.value.trim();
  if (!keyword) return;
  // 清空旧数据与提示状态
  evidencesData.value = [];
  searchNull.value = false;
  isSearching.value = true; //搜索中状态初始化
  const path = route.path; // 填入页面路径
  const res = await $fetch("/api/areaSearch", { params: { keyword, path } });
  isSearching.value = false; //关闭加载状态
  if (!res || res.length === 0) {
    searchNull.value = true; // 显示“没有搜到”
    return;
  }
  searchNull.value = false; // 有结果就隐藏提示
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
