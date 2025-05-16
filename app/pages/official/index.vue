<template>
  <div class="max-w-4xl mx-auto px-4 py-8 bg-gradient-to-br from-green-50 to-teal-50 min-h-screen rounded-lg shadow-sm">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-green-800 mb-2 relative inline-block">
        官方讯息
        <span
          class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></span>
      </h1>
      <p class="text-green-600 text-sm">最新的碧瑶圈子公告讯息</p>
    </div>

    <div class="space-y-4">
      <InfoItem v-for="item in paginatedList" :key="item.time" :time="item.time" :content="item.content"
        :Link="item.Link" />
    </div>

    <!-- 分页控件 -->
    <div class=" mt-8 flex justify-center items-center space-x-2" v-if="totalPages > 1">
      <button @click="currentPage = Math.max(currentPage - 1, 1)" :disabled="currentPage === 1"
        class="px-3 py-1 rounded-md bg-white border border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="flex space-x-1">
        <button v-for="page in displayedPages" :key="page" @click="currentPage = page"
          :class="['px-3 py-1 rounded-md transition-colors duration-200', currentPage === page ? 'bg-green-500 text-white font-medium' : 'bg-white border border-green-300 text-green-700 hover:bg-green-50']">
          {{ page }}
        </button>
      </div>

      <button @click="currentPage = Math.min(currentPage + 1, totalPages)" :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-md bg-white border border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: '碧瑶圈官方讯息|公告栏',
  textCol: "text-black"
});
useHead({
  title: `碧瑶圈官方讯息|公告栏`,
});
import { ref, computed } from "vue";

// 设置列表
const infoList = ref([
  {
    time: "2025-05-21",
    content: "2025年碧瑶521生日庆典正在进行中!祝碧瑶生日快乐!点击参与!",
    Link: "https://weibo.com/p/1008082ba2304bd954b238b1684564e6818499"
  },
  {
    time: "2025-05-21",
    content: "碧瑶的狐歧资料站正式上线啦~",
  },
  {
    time: "2025-05-16",
    content: "25年521新周边来啦~",
    Link: "https://weibo.com/2461312731/Ps3mX0MXP"
  },
  {
    time: "2025-05-16",
    content: "25年521生日接龙活动,一起期待这不止300份的爱吧~",
    Link: "https://weibo.com/2461312731/PrZCjzVAW"
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
