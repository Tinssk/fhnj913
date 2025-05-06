<template>
  <!-- 页头背景和样式 -->
  <div ref="headerRef"
    :class="{ 'bg-transparent': isTop, 'bg-gradient-to-r from-green-500/75 to-teal-500/75 shadow-xl backdrop-blur-lg': !isTop }"
    class="fixed top-0 w-full h-16 transition-all duration-500 text-white z-20 border-b border-white/10">
    <div class="container mx-auto h-full flex items-center justify-between px-6 lg:px-20 relative">
      <!-- Logo 区域 -->
      <div class="flex items-center flex-2">
        <nuxt-link to="/" class="flex items-center space-x-3">
          <img src="/img/byIcon2.png" alt="图标" :class="{ 'border-2 border-white': !isTop }"
            class="w-14 h-14 rounded-full" />
          <h1 class="text-2xl font-semibold tracking-wide">碧瑶个人空间</h1>
        </nuxt-link>
      </div>
      <!-- 导航栏 -->
      <nav class="flex-5 hidden lg:flex flex-nowrap justify-around items-center space-x-6">
        <div class="nav-dot dot-green">
          <nuxt-link to="/"
            class=" text-lg hover:text-teal-200 transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">主页</nuxt-link>
        </div>

        <!-- 同人合集 Dropdown -->
        <div class="nav-dot dot-amber relative group ">
          <button class=" text-lg hover:text-teal-200 transition duration-300 focus:outline-none relative after:content-['']
          after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1
          after:transition-all after:duration-300 hover:after:w-full group-hover:after:w-full">
            同人合集
            <svg class="w-5 h-5 inline-block ml-1 transform transition-transform duration-300 group-hover:rotate-180"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <div
            class="absolute left-0 top-[calc(100%+0.5rem)] w-48 rounded-lg shadow-xl bg-white/90 backdrop-blur-sm ring-1 ring-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
            <div class="py-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
              <nuxt-link to="/feature1"
                class="nav-dot dot-green block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">卷丹青</nuxt-link>
              <nuxt-link to="/feature2"
                class="nav-dot dot-emerald block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">碧瑶传</nuxt-link>
              <nuxt-link to="/feature2"
                class="nav-dot dot-cyan block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">折花笺</nuxt-link>
              <nuxt-link to="/feature2"
                class="nav-dot dot-teal block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">铃音渺</nuxt-link>
              <nuxt-link to="/feature2"
                class="nav-dot dot-amber block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">半面妆</nuxt-link>
            </div>
          </div>
        </div>

        <!-- 资料合集 Dropdown -->
        <div class="nav-dot dot-lime relative group">
          <button
            class="text-lg hover:text-teal-200 transition duration-300 focus:outline-none relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full group-hover:after:w-full">
            资料合集
            <svg class="w-5 h-5 inline-block ml-1 transform transition-transform duration-300 group-hover:rotate-180"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <div
            class="absolute left-0 top-[calc(100%+0.5rem)] w-48 rounded-lg shadow-xl bg-white/90 backdrop-blur-sm ring-1 ring-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
            <div class="py-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
              <nuxt-link to="/feature1"
                class="nav-dot dot-pink block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">证据存档</nuxt-link>
            </div>
          </div>
        </div>

        <div class="nav-dot dot-indigo">
          <nuxt-link to="/about"
            class=" text-lg hover:text-teal-200 transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">关于</nuxt-link>
        </div>
      </nav>

      <!-- 搜索框 - 直接显示在页头上 -->
      <div id="search" class="flex items-center ml-auto mr-4">
        <div
          class="bg-white/80 backdrop-blur-md rounded-full overflow-hidden flex items-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group hover:bg-white/90">
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-hover:scale-110 transition-transform duration-300">
              <svg class="h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <input type="text" v-model="searchQuery" @keyup.enter="handleSearch"
              class="block w-52 pl-12 pr-3 py-2 border-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 text-sm h-9 bg-transparent transition-all duration-300 focus:w-72 hover:w-72"
              placeholder="搜索网站内容" ref="searchInput" />
          </div>
          <button @click="handleSearch"
            class="h-9 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white text-sm font-medium py-1 px-6 transition-all duration-300 focus:outline-none focus:ring-0 rounded-full mr-0.5 hover:shadow-lg hover:scale-105">搜索</button>
        </div>
      </div>
      <!-- 女书logo -->
      <div class="flex-1 flex justify-end">
        <a href="https://weibo.com/6191654993/5161784295035068" target="_blank" rel="noopener noreferrer">
          <img src="/img/logo-biyao.svg" alt="Logo"
            class="w-14 h-14 transition-transform duration-300 hover:scale-110 select-none" />
        </a>
      </div>

      <!-- 移动端菜单 -->
      <div class="lg:hidden">
        <button class="focus:outline-none focus:ring-2 focus:ring-teal-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref("");
const searchInput = ref(null);
const isTop = ref(true); // 控制页头透明度

const headerRef = ref(null);

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("搜索内容:", searchQuery.value);
    // 这里添加搜索逻辑，后续可以添加API调用
  }
};

// 监听滚动事件，检测页面滚动位置
const handleScroll = () => {
  if (window.scrollY === 0) {
    isTop.value = true;
  } else {
    isTop.value = false;
  }
};

// 监听滚动事件
onMounted(() => {
  /*先检查一次 */
  if (window.scrollY === 0) {
    isTop.value = true;
  } else {
    isTop.value = false;
  }
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
