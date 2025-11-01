<template>
  <div class="max-w-4xl mx-auto px-4 py-8 bg-gradient-to-br from-green-50 to-teal-50 min-h-screen rounded-lg shadow-sm">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-green-800 mb-2 relative inline-block">
        网站更新日志
        <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></span>
      </h1>
      <p class="text-green-600 text-sm">网站的更新日志,最新消息</p>
      <p class="text-green-600 text-sm">网站的更新消息都会同步在这里哦,欢迎关注</p>
    </div>

    <div class="space-y-4">
      <InfoItem v-for="item in paginatedList" :key="item.time" :time="item.time" :content="item.content" :Link="item.Link" />
    </div>

    <!-- 分页控件 -->
    <div class="mt-8 flex justify-center items-center space-x-2" v-if="totalPages > 1">
      <button @click="currentPage = Math.max(currentPage - 1, 1)" :disabled="currentPage === 1" class="px-3 py-1 rounded-md bg-white border border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="flex space-x-1">
        <button v-for="page in displayedPages" :key="page" @click="currentPage = page" :class="['px-3 py-1 rounded-md transition-colors duration-200', currentPage === page ? 'bg-green-500 text-white font-medium' : 'bg-white border border-green-300 text-green-700 hover:bg-green-50']">
          {{ page }}
        </button>
      </div>

      <button @click="currentPage = Math.min(currentPage + 1, totalPages)" :disabled="currentPage === totalPages" class="px-3 py-1 rounded-md bg-white border border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  title: '碧瑶的狐岐资料站|更新日志',
  textCol: "text-black"
});
// 设置页面 <title>
useHead({
  title: `碧瑶的狐岐资料站|更新日志`,
});
import { ref, computed } from "vue";

// 构建列表
const infoList = ref([
  {
    time: "2025-11-1",
    content: "优化了搜索表现",
  },
  {
    time: "2025-10-12",
    content: "碧瑶的狐岐信箱上线啦,已上线提问箱",
    Link:"https://www.biyao521.com/mailbox"
  },
  {
    time: "2025-08-03",
    content: "初步优化了移动端主页的大小设置,看起来更加方便",
  },
  {
    time: "2025-07-11",
    content: "最近忙完工作终于可以来继续完善我们的资料站,让文章列表不会因为切换其他页面而重新加载了,同时优化了加载动画的播放逻辑,不会重复播放加载动画极大改善了使用体验",
  },
  {
    time: "2025-06-10",
    content: "完善了主页歌曲列表里面的歌曲,并且都添加了链接,现在可以很方便找歌啦~",
  },
  {
    time: "2025-06-02",
    content: "解决了使用手机端时,仍然加载动态鼠标,导致的页面卡顿问题",
  },
  {
    time: "2025-05-27",
    content: "修复了折花笺分页器鼠标样式显示不正常,无法正常显示动态鼠标的问题",
  },
  {
    time: "2025-05-21",
    content: "狐岐资料站正式上线!值得纪念的一天",
  },
]);

// 分页相关
const currentPage = ref(1);
const pageSize = 10; // 每页显示10条

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(infoList.value.length / pageSize);
});

// 当前页显示的数据
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return infoList.value.slice(start, end);
});

// 显示的页码范围（最多显示5个页码）
const displayedPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    // 总页数少于最大显示页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // 总页数大于最大显示页数，显示部分页码
    let startPage = Math.max(currentPage.value - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
});
</script>
