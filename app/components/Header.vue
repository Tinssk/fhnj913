<template>
  <!-- 页头背景和样式 -->
  <div ref="headerRef"
    :class="{ 'bg-transparent': isTop, 'bg-gradient-to-r from-green-500/75 to-teal-500/75 shadow-xl backdrop-blur-lg': !isTop }"
    class="fixed top-0 w-full h-16 transition-all duration-500 text-white z-20 border-b border-white/10">
    <div
      class="container mx-auto h-full flex items-center justify-between pl-0 pr-2 lg:px-10 relative w-full gap-4 lg:gap-0">
      <!-- Logo 区域 -->
      <div class="flex items-start relative overflow-visible w-45 xl:w-65 scale-150 lg:scale-100">
        <nuxt-link to="/" class="flex items-start space-x-3 transform lg:translate-y-1/6">
          <img src="/img/title.png" alt="标题图片" class="w-full max-h-full rounded-full" />
        </nuxt-link>
      </div>
      <!-- 导航栏 -->
      <nav class=" flex-5 hidden lg:flex flex-nowrap justify-around items-center space-x-6">
        <div class="nav-dot dot-green">
          <nuxt-link to="/"
            class="text-lg hover:text-teal-200 transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">主页</nuxt-link>
        </div>

        <!-- 同人合集 Dropdown -->
        <div class="nav-dot dot-amber relative group">
          <button
            class="text-lg hover:text-teal-200 transition duration-300 focus:outline-none relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full group-hover:after:w-full">
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
              <nuxt-link to="/picture"
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
            class="text-lg hover:text-teal-200 transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">关于</nuxt-link>
        </div>
      </nav>

      <MobileSearch />

      <!-- 女书logo -->
      <div class="hidden lg:flex justify-end w-20">
        <a href="https://weibo.com/6191654993/5161784295035068" target="_blank" rel="noopener noreferrer">
          <img src="/img/logo-biyao.svg" alt="Logo"
            class="w-10 h-10 lg:w-14 lg:h-14 transition-transform duration-300 hover:scale-110 select-none" />
        </a>
      </div>

      <!-- 移动端菜单 -->
      <div class="lg:hidden">
        <button class="focus:outline-none" @click="toggleMenu">
          <svg class="w-6 h-6" viewBox="0 0 24 24" :class="{ 'open': isMenuOpen }" stroke="currentColor" fill="none">
            <path class="transition-all duration-300" :class="{ 'rotate-45 translate-y-[3px]': isMenuOpen }" d="M4 6h16"
              stroke-width="2" stroke-linecap="round" />
            <path class="transition-all duration-300" :class="{ 'opacity-0': isMenuOpen }" d="M4 12h16" stroke-width="2"
              stroke-linecap="round" />
            <path class="transition-all duration-300" :class="{ '-rotate-45 -translate-y-[3px]': isMenuOpen }"
              d="M4 18h16" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const isTop = ref(true); // 控制页头透明度
const headerRef = ref(null);
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
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
<style scoped>
svg {
  transform-origin: center center;
  /* 确保旋转中心在 SVG 的中心 */
}
</style>