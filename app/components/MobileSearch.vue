<template>
  <div id="search" class="flex items-center mx-0 flex-1 lg:flex-0 ">
    <div
      class="bg-white/80 backdrop-blur-md  rounded-full overflow-hidden flex flex-1 items-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group hover:bg-white/90 focus-within:bg-white/90 ">
      <div class="relative flex-1">
        <div
          class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-hover:scale-110 transition-transform duration-300">
          <svg class="h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <input type="text" v-model="searchQuery" @keyup.enter="handleSearch"
          class="texto block w-52 pl-12 pr-3 py-2 border-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 text-sm h-9 bg-transparent transition-all duration-300 lg:focus:w-72 lg:hover:w-72"
          placeholder="搜索网站内容" ref="searchInput" />
      </div>
      <button @click="handleSearch"
        class="catBtn hidden lg:block w-20 h-9 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white text-sm font-medium py-1 px-6 transition-transform duration-300 focus:outline-none focus:ring-0 rounded-full mr-0.5 hover:shadow-lg transform hover:scale-105 will-change-transform">搜索</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const searchQuery = ref("");

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("搜索内容:", searchQuery.value);
    // 这里添加搜索逻辑，后续可以添加API调用
  }
};
</script>

<style scoped></style>
