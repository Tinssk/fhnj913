<template>
  <!-- 页头背景和样式 -->
  <div ref="headerRef"
    :class="{ 'bg-transparent': isTop, 'bg-gradient-to-r from-green-500/85 to-teal-500/85 shadow-xl backdrop-blur-md ': !isTop }"
    class="fixed top-0 w-full h-16  transition-all duration-300 text-white z-20  ">
    <div class="container mx-auto h-full flex items-center justify-between px-6 lg:px-20">
      <!-- Logo 区域 -->
      <div class="flex items-center flex-2">
        <nuxt-link to="/" class="flex items-center space-x-3">
          <img src="/img/byIcon2.png" alt="图标" :class="{ 'border-2 border-white': !isTop }"
            class="w-14 h-14 rounded-full " />
          <h1 class="text-2xl font-semibold tracking-wide">碧瑶个人空间</h1>
        </nuxt-link>
      </div>
      <!-- 搜索框 -->
      <div id="search" class="flex items-center flex-1 relative h-full" @mouseleave="handleMouseLeaveContainer">
        <!-- 搜索图标按钮 -->
        <button @click="toggleSearch" @mouseenter="isHovered = true"
          class="ml-auto z-10 p-4 rounded-full transition-all duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none group"
          :class="{ 'bg-blue-50 dark:bg-blue-900/30': isOpen || isHovered }">
          <svg t="1745890218850" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="8209" width="24" height="24">
            <path
              d="M983.04 911.36l-276.48-276.48c112.64-148.48 102.4-358.4-35.84-491.52-148.48-148.48-384-148.48-532.48 0C0 291.84 0 527.36 143.36 675.84c133.12 133.12 343.04 143.36 491.52 35.84l276.48 276.48c10.24 10.24 25.6 10.24 30.72 0l40.96-40.96c10.24-10.24 10.24-25.6 0-35.84z m-768-302.08c-107.52-107.52-107.52-281.6 0-389.12 107.52-107.52 281.6-107.52 389.12 0 107.52 107.52 107.52 281.6 0 389.12-107.52 107.52-281.6 107.52-389.12 0z"
              p-id="8210"></path>
          </svg>
        </button>

        <!-- 搜索框 - 现在位于按钮正下方 -->
        <div class="absolute right-0 pt-2 top-full w-96 origin-top transition-all duration-300 ease-in-out"
          :class="{ 'opacity-100 scale-100 ': isOpen || isHovered, 'opacity-0 scale-95 translate-y-0 invisible pointer-events-none': !isOpen && !isHovered }">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform transition-all duration-300 flex">
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input type="text" v-model="searchQuery" @focus="handleFocusInput" @keyup.enter="handleSearch"
                @blur="handleBlurInput"
                class="block w-full pl-10 pr-3 py-2 border-0 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 text-sm h-10"
                placeholder="搜索内容..." ref="searchInput" />
            </div>
            <button @click="handleSearch"
              class="h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 transition-colors duration-200 focus:outline-none focus:ring-0">搜索</button>
          </div>
        </div>
      </div>
      <!-- 导航栏 -->
      <nav class="flex-5 hidden lg:flex flex-nowrap justify-around items-center space-x-6">
        <nuxt-link to="/" class="text-lg hover:text-teal-200 transition duration-300">主页</nuxt-link>

        <!-- 同人合集 Dropdown -->
        <div class="relative group">
          <button
            class="text-lg hover:text-teal-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-200">
            同人合集
            <svg class="w-5 h-5 inline-block ml-1 transform transition-transform duration-300 group-hover:rotate-180"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <div
            class="absolute left-0 pt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 group-hover:block hidden">
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
              <nuxt-link to="/feature1" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">卷丹青</nuxt-link>
              <nuxt-link to="/feature2" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">碧瑶传</nuxt-link>
              <nuxt-link to="/feature2" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">折花笺</nuxt-link>
              <nuxt-link to="/feature2" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">铃音渺</nuxt-link>
              <nuxt-link to="/feature2" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">半面妆</nuxt-link>
            </div>
          </div>
        </div>

        <!-- 资料合集 Dropdown -->
        <div class="relative group">
          <button
            class="text-lg hover:text-teal-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-200">
            资料合集
            <svg class="w-5 h-5 inline-block ml-1 transform transition-transform duration-300 group-hover:rotate-180"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <div
            class="absolute left-0 pt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 group-hover:block hidden">
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
              <nuxt-link to="/feature1" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">证据存档</nuxt-link>
            </div>
          </div>
        </div>

        <nuxt-link to="/about" class="text-lg hover:text-teal-200 transition duration-300">关于</nuxt-link>
      </nav>
      <!-- 女书logo -->
      <div class="flex-1 flex justify-end">
        <a href="https://weibo.com/6191654993/5161784295035068" target="_blank" rel="noopener noreferrer">
          <img src="/img/logo-biyao.svg" alt="Logo"
            class="w-14 h-14 transition-transform duration-300 hover:scale-110 select-none " />
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
const isOpen = ref(false);
const isHovered = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const isInputFocused = ref(false);
const isTop = ref(true) // 控制页头透明度

const headerRef = ref(null)
// 切换搜索框显示状态
const toggleSearch = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
};

// 处理鼠标离开
// 新增：处理父容器的 mouseleave 事件
const handleMouseLeaveContainer = () => {
  isHovered.value = false;
  setTimeout(() => {
    if (!isHovered.value && !isInputFocused.value) {
      isOpen.value = false;
    }
  }, 100);
};

function handleFocusInput() {
  isInputFocused.value = true;
  if (!isOpen.value) {
    toggleSearch();
  }
}
function handleBlurInput() {
  isInputFocused.value = false;
}
// 关闭搜索框
const closeSearch = () => {
  isOpen.value = false;
  isHovered.value = false;
  searchQuery.value = "";
};

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("搜索内容:", searchQuery.value);
    // 这里添加搜索逻辑，后续可以添加API调用
  }
};

// 点击外部关闭搜索框
const clickOutside = (event) => {
  const searchContainer = document.querySelector("#search");
  if (isOpen.value && searchContainer && !searchContainer.contains(event.target)) {
    if (!isInputFocused.value) {
      closeSearch();
    }
  }
};
// 监听滚动事件，检测页面滚动位置
const handleScroll = () => {
  if (window.scrollY === 0) {
    isTop.value = true
  } else {
    isTop.value = false
  }
}
// 监听点击事件
onMounted(() => {
  document.addEventListener("click", clickOutside);
  window.addEventListener('scroll', handleScroll)

});

onUnmounted(() => {
  document.removeEventListener("click", clickOutside);
  window.removeEventListener('scroll', handleScroll)
});
</script>
