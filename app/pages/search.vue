<template>
  <div class="flex flex-col items-center w-full mt-8">
    <div class="w-full max-w-xl mb-6">
      <div class="flex">
        <input v-model="searchKeyword" @keyup.enter="handleSearch" type="text" placeholder="搜索资料站内容..."
          class="texto w-full px-5 py-3 rounded-full shadow-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-green-800 placeholder-green-400 transition-all duration-200" />
      </div>
    </div>
    <!-- 搜索到内容,进行展示 -->
    <div class="w-full max-w-2xl">
      <ul class="divide-y divide-green-200 rounded-lg shadow">
        <li v-for="search in pagedsearchs" :key="search" class="flex items-center hover:bg-green-200 m-2 rounded-full">
          <NuxtLink :to="`/${search.full.split('/').map(encodeURIComponent).join('/')}`"
            class="catBtn block w-full h-full py-3 px-6">
            <!-- 前缀图标 -->
            <span class="inline-block w-2 h-2 rounded-full mr-6"
              :style="{ border: '2px solid', marginRight: '1.5rem' }">
              <svg v-if="search.tagName" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <rect x="2" y="5" width="16" height="10" rx="2" />
              </svg> </span>{{ search.name }}
            <!-- 后缀标签 -->
            <span v-if="search.tagName" :class="['tag-label', search.tagColor, search.prefix]" class="catBtn">
              <svg class="inline-block w-4 h-4 mr-1 align-middle opacity-70" fill="none" stroke="currentColor"
                stroke-width="2" viewBox="0 0 20 20">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7 7h.01M3 11l4-4a2 2 0 012.828 0l4.243 4.243a2 2 0 010 2.828l-4 4a2 2 0 01-2.828 0L3 13.828a2 2 0 010-2.828z" />
              </svg>
              {{ search.tagName }}
            </span>
          </NuxtLink>
        </li>
      </ul>
      <!-- 分页器逻辑 -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 gap-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="catBtn px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">上一页</button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
          :class="['catBtn px-3 py-1 rounded border', page === currentPage ? 'bg-green-400 text-white border-green-400' : 'bg-white text-green-700 border-green-300']">{{
            page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="catBtn px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">下一页</button>
      </div>
    </div>
    <!-- 搜索中加载提示 -->
    <div v-if="isSearching"
      class="mt-8 flex flex-col items-center justify-center p-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm max-w-2xl text-green-800 text-center animate-fade-in">
      <div class="flex items-center justify-center gap-4">
        <div class="w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
        <p class="text-lg font-medium">瑶瑶正在努力搜索中，请稍候...</p>
      </div>
    </div>
    <!-- 未搜到提示 -->
    <div v-if="searchNull"
      class="mt-6 flex items-center justify-center gap-4 p-5 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm max-w-xl text-green-800 text-center transition-all duration-300">
      <img src="/img/errorWeep.png" alt="not found" class="w-14 h-14 opacity-90" />
      <p class="text-lg font-medium">
        很抱歉，瑶瑶没有搜索到您想找的
        <span class="font-semibold text-green-700">「{{ searchKeyword_Result }}」</span>，请尝试搜索其他。
      </p>
    </div>
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  title: '碧瑶|搜索结果',
  textCol: "text-black"
});
// 设置页面 <title>
useHead({
  title: `碧瑶|搜索结果`,
});
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { NuxtLink } from '#components';
import data from "~/../server/data/Search.json";

const route = useRoute();
const router = useRouter()
const currentPage = ref(1);
const pageSize = 20;
const searchKeyword = ref("");
const searchKeyword_Result = ref("");
/*请求列表数据 */
const searchsData = ref([])
const searchs = computed(() => searchsData.value || []);
const searchResult = ref(null); //暂时弃用
const searchNull = ref(false)  // 未搜到状态
const isSearching = ref(false); // 搜索中状态

//搜索函数
async function handleSearch() {
  /*进行搜索校检 */
  //判断是否为空
  const keyword = searchKeyword.value.trim();
  if (!keyword) return;
  // 清空旧数据与提示状态
  searchsData.value = [];
  searchNull.value = false;
  // 更新地址栏

  /*开始搜索 */
  isSearching.value = true; //搜索中状态初始化
  const res = await $fetch("/api/globalSearch", { params: { q: keyword } }); // 注意用 q
  // 只取 results 数组部分
  // ✅ 检查是否为空数组或返回 false
  isSearching.value = false; //关闭加载状态
  if (!res || res.length === 0) {
    searchKeyword_Result.value = keyword; // 保存搜索关键字用于提示
    searchNull.value = true; // 显示“没有搜到”
    return;
  }
  searchNull.value = false; // 有结果就隐藏提示

  searchsData.value = res.map(item => {
    // 标签名映射
    let tagName = '';
    let tagColor = '';
    const tagMap = Object.assign({}, ...data.map(obj => obj));
    if (item.prefix && tagMap[item.prefix]) {
      tagName = tagMap[item.prefix];
    } else {
      tagName = item.prefix || '';
    }
    // 颜色映射
    const colorMap = {
      'index': 'border-[#f87171] text-[#b91c1c] bg-gradient-to-r from-[#fee2e2] to-[#fca5a5]',
      'main': 'border-[#60a5fa] text-[#1e40af] bg-gradient-to-r from-[#dbeafe] to-[#60a5fa]',
      'about': 'border-[#a78bfa] text-[#6d28d9] bg-gradient-to-r from-[#ede9fe] to-[#a78bfa]',
      'think': 'border-[#fdba74] text-[#c2410c] bg-gradient-to-r from-[#ffedd5] to-[#fdba74]',
      'biyaofame': 'border-[#f472b6] text-[#be185d] bg-gradient-to-r from-[#fdf2f8] to-[#f472b6]',
      'evidence': 'border-[#22d3ee] text-[#0e7490] bg-gradient-to-r from-[#cffafe] to-[#22d3ee]',
      'novels': 'border-[#22c55e] text-[#166534] bg-gradient-to-r from-[#bbf7d0] to-[#22c55e]',
      'musics': 'border-[#fde047] text-[#a16207] bg-gradient-to-r from-[#fef9c3] to-[#fde047]',
      'games': 'border-[#818cf8] text-[#3730a3] bg-gradient-to-r from-[#e0e7ff] to-[#818cf8]',
      'official': 'border-[#2dd4bf] text-[#134e4a] bg-gradient-to-r from-[#ccfbf1] to-[#2dd4bf]',
      'pictures': 'border-[#e879f9] text-[#a21caf] bg-gradient-to-r from-[#fae8ff] to-[#e879f9]',
      'updateLog': 'border-[#84cc16] text-[#365314] bg-gradient-to-r from-[#d9f99d] to-[#84cc16]',
      'mailbox': 'border-[#38bdf8] text-[#075985] bg-gradient-to-r from-[#e0f2fe] to-[#38bdf8]'
    };

    tagColor = colorMap[item.prefix] || 'bg-gray-200 text-gray-700 border-gray-400';
    return { ...item, tagName, tagColor };
  });
  currentPage.value = 1;
}

// 监听路由参数变化和页面加载，自动执行搜索
onMounted(() => {
  if (route.query.q) {
    searchKeyword.value = route.query.q;
    handleSearch();
  }
});


watch(() => route.query.q, (newQ, oldQ) => {
  if (newQ !== oldQ) {
    searchKeyword.value = newQ || "";
    if (searchKeyword.value) handleSearch();
  }
});
// 洗牌算法
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


const totalPages = computed(() => Math.ceil(searchs.value.length / pageSize));
const pagedsearchs = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return searchs.value.slice(start, start + pageSize);
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

<style>
.tag-label {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  margin-left: 1rem;
  border-radius: 9999px;
  border-width: 2.5px;
  border-style: solid;
  box-shadow: 0 2px 12px 0 rgba(34, 197, 94, 0.16), 0 2px 8px 0 rgba(34, 197, 94, 0.1);
  font-size: 0.95rem;
  font-weight: 700;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
  cursor: pointer;
  user-select: none;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-in-out forwards;
}
</style>
