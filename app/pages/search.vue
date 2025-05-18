<template>
  <div class="flex flex-col items-center w-full mt-8">
    <div class="w-full max-w-xl mb-6">
      <div class="flex">
        <input v-model="searchKeyword" @keyup.enter="handleSearch" type="text" placeholder="搜索资料馆内容..." class="texto w-full px-5 py-3 rounded-full shadow-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-green-800 placeholder-green-400 transition-all duration-200" />
      </div>
    </div>
    <div class="w-full max-w-2xl">
      <ul class="divide-y divide-green-200 rounded-lg shadow">
        <li v-for="search in pagedsearchs" :key="search" class="flex items-center hover:bg-green-200">
          <NuxtLink :to="`/${search.full.split('/').map(encodeURIComponent).join('/')}`" class="catBtn block w-full h-full py-3 px-6">
            <span
              class="inline-block w-2 h-2 rounded-full mr-6"
              :class="{
                'bg-green-400 border-green-400': search.tagColor.includes('green-100') || search.tagColor.includes('green-200') || search.tagColor.includes('green-400'),
                'bg-lime-400 border-lime-400': search.tagColor.includes('lime-100') || search.tagColor.includes('lime-200'),
                'bg-emerald-400 border-emerald-400': search.tagColor.includes('emerald-100') || search.tagColor.includes('emerald-200'),
                'bg-teal-400 border-teal-400': search.tagColor.includes('teal-100') || search.tagColor.includes('teal-200'),
                'bg-cyan-400 border-cyan-400': search.tagColor.includes('cyan-100') || search.tagColor.includes('cyan-200'),
                'bg-gray-400 border-gray-400': search.tagColor.includes('gray-200'),
              }"
              :style="{ border: '2px solid', marginRight: '1.5rem' }">
              <svg v-if="search.tagName && search.prefix === 'evidence'" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" />
              </svg>
              <svg v-else-if="search.tagName && search.prefix === 'novels'" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <rect x="2" y="5" width="16" height="10" rx="2" />
              </svg>
              <svg v-else-if="search.tagName && search.prefix === 'musics'" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 19V6l8-2v13" />
              </svg>
              <svg v-else-if="search.tagName && search.prefix === 'games'" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <rect x="4" y="4" width="12" height="12" rx="3" />
              </svg>
              <svg v-else-if="search.tagName && search.prefix === 'official'" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <polygon points="10,2 2,18 18,18" />
              </svg>
              <svg v-else-if="search.tagName && search.prefix === 'pictures'" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <rect x="3" y="5" width="14" height="10" rx="2" />
              </svg>
              <svg v-else-if="search.tagName && search.prefix === 'updateLog'" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2v16M2 10h16" />
              </svg> </span
            >{{ search.name }}
            <span v-if="search.tagName" :class="['tag-label', search.tagColor, search.prefix]" class="catBtn">
              <svg class="inline-block w-4 h-4 mr-1 align-middle opacity-70" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 20 20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M3 11l4-4a2 2 0 012.828 0l4.243 4.243a2 2 0 010 2.828l-4 4a2 2 0 01-2.828 0L3 13.828a2 2 0 010-2.828z" />
              </svg>
              {{ search.tagName }}
            </span>
          </NuxtLink>
        </li>
      </ul>
      <!-- 分页器逻辑 -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 gap-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">上一页</button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="['px-3 py-1 rounded border', page === currentPage ? 'bg-green-400 text-white border-green-400' : 'bg-white text-green-700 border-green-300']">{{ page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 rounded border border-green-300 bg-white text-green-700 disabled:opacity-50">下一页</button>
      </div>
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
const currentPage = ref(1);
const pageSize = 20;
const searchKeyword = ref("");
/*请求列表数据 */
const searchsData = ref([])
const searchs = computed(() => searchsData.value || []);
const searchResult = ref(null);

//搜索函数
async function handleSearch() {
    const keyword = searchKeyword.value.trim();
    if (!keyword) return;
    const res = await $fetch("/api/globalSearch", { params: { q: keyword } }); // 注意用 q
    console.log("搜索结果：", res);
    // 只取 results 数组部分
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
            'index': 'bg-red-200 text-red-800 border-red-400',
            'main': 'bg-blue-200 text-blue-800 border-blue-400',
            'about': 'bg-purple-200 text-purple-800 border-purple-400',
            'think': 'bg-orange-200 text-orange-800 border-orange-400',
            'biyaofame': 'bg-pink-200 text-pink-800 border-pink-400',
            'evidence': 'bg-cyan-200 text-cyan-800 border-cyan-400',
            'novels': 'bg-green-300 text-green-900 border-green-500',
            'musics': 'bg-yellow-200 text-yellow-900 border-yellow-400',
            'games': 'bg-indigo-200 text-indigo-900 border-indigo-400',
            'official': 'bg-teal-200 text-teal-900 border-teal-400',
            'pictures': 'bg-fuchsia-200 text-fuchsia-900 border-fuchsia-400',
            'updateLog': 'bg-lime-400 text-white border-lime-600',
        };
        tagColor = colorMap[item.prefix] || 'bg-gray-200 text-gray-700 border-gray-400';
        console.log(tagColor)
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
  background: linear-gradient(90deg, #fff 0%, #f0fff4 100%);
  box-shadow: 0 2px 12px 0 rgba(34, 197, 94, 0.16), 0 2px 8px 0 rgba(34, 197, 94, 0.1);
  font-size: 0.95rem;
  font-weight: 700;
  color: #222;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
  cursor: pointer;
  user-select: none;
}

.tag-label.index {
  border-color: #f87171;
  background: linear-gradient(90deg, #fee2e2 0%, #fca5a5 100%);
  color: #b91c1c;
}

.tag-label.main {
  border-color: #60a5fa;
  background: linear-gradient(90deg, #dbeafe 0%, #60a5fa 100%);
  color: #1e40af;
}

.tag-label.about {
  border-color: #a78bfa;
  background: linear-gradient(90deg, #ede9fe 0%, #a78bfa 100%);
  color: #6d28d9;
}

.tag-label.think {
  border-color: #fdba74;
  background: linear-gradient(90deg, #ffedd5 0%, #fdba74 100%);
  color: #c2410c;
}

.tag-label.biyaofame {
  border-color: #f472b6;
  background: linear-gradient(90deg, #fdf2f8 0%, #f472b6 100%);
  color: #be185d;
}

.tag-label.evidence {
  border-color: #22d3ee;
  background: linear-gradient(90deg, #cffafe 0%, #22d3ee 100%);
  color: #0e7490;
}

.tag-label.novels {
  border-color: #22c55e;
  background: linear-gradient(90deg, #bbf7d0 0%, #22c55e 100%);
  color: #166534;
}

.tag-label.musics {
  border-color: #fde047;
  background: linear-gradient(90deg, #fef9c3 0%, #fde047 100%);
  color: #a16207;
}

.tag-label.games {
  border-color: #818cf8;
  background: linear-gradient(90deg, #e0e7ff 0%, #818cf8 100%);
  color: #3730a3;
}

.tag-label.official {
  border-color: #2dd4bf;
  background: linear-gradient(90deg, #ccfbf1 0%, #2dd4bf 100%);
  color: #134e4a;
}

.tag-label.pictures {
  border-color: #e879f9;
  background: linear-gradient(90deg, #fae8ff 0%, #e879f9 100%);
  color: #a21caf;
}

.tag-label.updateLog {
  border-color: #84cc16;
  background: linear-gradient(90deg, #d9f99d 0%, #84cc16 100%);
  color: #365314;
}
</style>
