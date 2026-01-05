<template>
  <!-- 页头背景和样式 -->
  <div ref="headerRef"
    :class="{ 'bg-transparent': isTop, 'bg-gradient-to-r from-green-500/75 to-teal-500/75 shadow-xl backdrop-blur-lg': !isTop }"
    class="fixed top-0 w-full h-16 transition-all duration-500 text-white z-20 border-b border-white/10">
    <div
      class="container mx-auto h-full flex items-center justify-between pl-0 pr-2 lg:px-10 relative w-full gap-4 lg:gap-0">
      <!-- Logo 区域 -->
      <div class="flex items-start relative overflow-visible w-45 xl:w-60 scale-150 lg:scale-100">
        <nuxt-link to="/" class="catBtn flex items-start space-x-3 transform lg:translate-y-1/6">
          <img src="/img/title.png" alt="标题图片" class="w-full max-h-full rounded-full hover:scale-110" />
        </nuxt-link>
      </div>
      <!-- 导航栏 -->
      <nav class="flex-5 hidden lg:flex flex-nowrap justify-around items-center space-x-6">
        <div class="nav-dot dot-green">
          <nuxt-link to="/main"
            :class="['catBtn text-lg  hover:text-teal-200 transition duration-300 relative after:content-[\'\'] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full', $route.path === '/main' ? 'after:w-full text-teal-200' : '']">主页</nuxt-link>
        </div>

        <!-- 同人合集 Dropdown -->
        <div class="nav-dot dot-amber relative group">
          <button
            class="catBtn text-lg hover:text-teal-200 transition duration-300 focus:outline-none relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full group-hover:after:w-full"
            :class="isHighlighted($route.path, 'opus') ? 'after:w-full text-teal-200' : ''">
            同人集合
            <svg
              class="w-5 h-5 inline-block ml-1 transform transition-transform duration-300 rotate-180 group-hover:rotate-0"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <div
            class="absolute left-0 top-[calc(100%+0.5rem)] w-48 rounded-lg shadow-xl bg-white/90 backdrop-blur-sm ring-1 ring-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
            <div class="py-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
              <nuxt-link to="/pictures"
                class="catBtn nav-dot dot-green block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">卷丹青</nuxt-link>
              <nuxt-link to="/biyaofame"
                class="catBtn nav-dot dot-emerald block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">碧瑶传</nuxt-link>
              <nuxt-link to="/novels"
                class="catBtn nav-dot dot-cyan block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">折花笺</nuxt-link>
              <nuxt-link to="/musics"
                class="catBtn nav-dot dot-teal block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">铃音渺</nuxt-link>
              <nuxt-link to="/games"
                class="catBtn nav-dot dot-amber block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">趣事物</nuxt-link>
              <div
                class="catBtn block px-6 py-2 text-sm italic text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                @click="useState('showGame').value = true">瑶瑶翻翻乐小游戏<br />(临时置顶,点击游玩)</div>
            </div>
          </div>
        </div>

        <!-- 资料合集 Dropdown -->
        <div class="nav-dot dot-lime relative group">
          <button
            class="catBtn text-lg hover:text-teal-200 transition duration-300 focus:outline-none relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full group-hover:after:w-full"
            :class="isHighlighted($route.path, 'party') ? 'after:w-full text-teal-200' : ''">
            圈子集合
            <svg
              class="w-5 h-5 inline-block ml-1 transform transition-transform duration-300 rotate-180 group-hover:rotate-0"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <div
            class="absolute left-0 top-[calc(100%+0.5rem)] w-48 rounded-lg shadow-xl bg-white/90 backdrop-blur-sm ring-1 ring-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
            <div class="catBtn py-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
              <nuxt-link to="/official"
                class="catBtn nav-dot dot-green block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">官方讯息</nuxt-link>
              <nuxt-link to="/evidence"
                class="catBtn nav-dot dot-pink block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">证据存档</nuxt-link>
              <nuxt-link to="/mailbox"
                class="catBtn nav-dot dot-cyan block px-6 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">狐岐信箱</nuxt-link>
            </div>
          </div>
        </div>

        <div class="nav-dot dot-indigo">
          <nuxt-link to="/about"
            :class="['catBtn text-lg hover:text-teal-200 transition duration-300 relative after:content-[\'\'] after:absolute after:w-0 after:h-0.5 after:bg-teal-200 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full', $route.path === '/about' ? 'after:w-full text-teal-200' : '']">关于</nuxt-link>
        </div>
      </nav>

      <MobileSearch />

      <!-- 女书logo -->
      <div class="hidden lg:flex justify-end w-20">
        <a href="https://weibo.com/6191654993/5161784295035068" target="_blank" rel="noopener noreferrer">
          <img src="/img/logo-biyao.svg" alt="Logo"
            class="catBtn w-10 h-10 lg:w-14 lg:h-14 transition-transform duration-300 hover:scale-110 select-none" />
        </a>
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="lg:hidden no-click-animation">
        <button class="flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none group"
          @click="toggleMenu">
          <span class="block w-6 h-0.5 bg-white rounded-sm transition-all duration-300 origin-center"
            :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"></span>
          <span class="block w-6 h-0.5 bg-white rounded-sm transition-all duration-300 origin-center"
            :class="isMenuOpen ? 'opacity-0' : ''"></span>
          <span class="block w-6 h-0.5 bg-white rounded-sm transition-all duration-300 origin-center"
            :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"></span>
        </button>
      </div>
    </div>
  </div>
  <!-- 移动端下拉导航栏 -->
  <details :open="isMenuOpen"
    class="mobile-menu fixed left-0 top-16 w-full z-30 bg-gradient-to-br from-green-100 via-green-50 to-teal-100 text-green-900 shadow-2xl rounded-b-3xl overflow-hidden lg:hidden border-b-4 border-green-300/40 overflow-y-auto">
    <!-- 隐藏原生summary，保留触发逻辑 -->
    <summary class="hidden"></summary>

    <div class="flex flex-col gap-2 py-4 px-6 overflow-y-auto">
      <nuxt-link to="/main"
        class="block py-3 px-2 text-lg font-semibold rounded-xl hover:bg-gradient-to-r hover:from-green-200 hover:to-teal-100 hover:text-green-700 border-b border-green-100 transition-all duration-200"
        @click="closeMenu">主页</nuxt-link>

      <!-- 手风琴菜单：同人合集（修复原生冲突 + 动画） -->
      <div class="rounded-xl overflow-hidden shadow-sm mb-1">
        <!-- 替换原生summary为自定义触发按钮，避免原生details冲突 -->
        <button @click="toggleAccordion('fan')" class="w-full flex justify-between items-center py-3 px-2 text-lg font-semibold rounded-xl bg-gradient-to-r
          from-green-200/60 to-teal-100/60 hover:from-green-300 hover:to-teal-200 text-green-800 border-b
          border-green-100 focus:outline-none transition-all duration-200">
          <span>同人集合</span>
          <svg :class="accordionOpen.fan ? ' text-green-500' : 'rotate-180 text-green-400'"
            class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <!-- 动画容器：通过max-height控制下拉动画 -->
        <div :class="accordionOpen.fan ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
          class="pl-4 flex flex-col gap-1 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-200 rounded-b-xl shadow-inner transition-all duration-300 ease-in-out overflow-hidden">
          <nuxt-link to="/pictures"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">卷丹青</nuxt-link>
          <nuxt-link to="/biyaofame"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">碧瑶传</nuxt-link>
          <nuxt-link to="/novels"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">折花笺</nuxt-link>
          <nuxt-link to="/musics"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">铃音渺</nuxt-link>
          <nuxt-link to="/games"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">趣事物</nuxt-link>
        </div>
      </div>

      <!-- 手风琴菜单：资料合集（同上述修复 + 动画） -->
      <div class="rounded-xl overflow-hidden shadow-sm mb-1">
        <button @click="toggleAccordion('info')"
          class="w-full flex justify-between items-center py-3 px-2 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-200/60 to-teal-100/60 hover:from-green-300 hover:to-teal-200 text-green-800 border-b border-green-100 focus:outline-none transition-all duration-200">
          <span>圈子集合</span>
          <svg :class="accordionOpen.info ? ' text-green-500' : 'rotate-180 text-green-400'"
            class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div :class="accordionOpen.info ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
          class="pl-4 flex flex-col gap-1 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-200 rounded-b-xl shadow-inner transition-all duration-300 ease-in-out overflow-hidden">
          <nuxt-link to="/official"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">官方讯息</nuxt-link>
          <nuxt-link to="/evidence"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">证据存档</nuxt-link>
          <nuxt-link to="/mailbox"
            class="block py-2 px-2 text-base rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
            @click="closeMenu">狐岐信箱</nuxt-link>
        </div>
      </div>

      <nuxt-link to="/about"
        class="block py-3 px-2 text-lg font-semibold rounded-xl hover:bg-gradient-to-r hover:from-green-200 hover:to-teal-100 hover:text-green-700 border-b border-green-100 transition-all duration-200"
        @click="closeMenu">关于</nuxt-link>
    </div>
  </details>
</template>

<script setup>
const isTop = ref(true); // 控制页头透明度
const headerRef = ref(null);
const isMenuOpen = ref(false);
const accordionOpen = reactive({ fan: false, info: false });
const router = useRouter();

/*检测路径应用导航栏高亮 */
//根据导航栏的类型选择对应的路径
const opusHighlightPaths = ["/pictures", "/biyaofame", "/novels", "/musics", "/games"];
const partyHighlightPaths = ["/official", "/evidence", "/mailbox"];
const isHighlighted = (path, type) => {
  const highlightPaths = type === "opus" ? opusHighlightPaths : partyHighlightPaths;
  return highlightPaths.some((highlightPath) => path.startsWith(highlightPath));
};


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (!isMenuOpen.value) {
    accordionOpen.fan = false;
    accordionOpen.info = false;
  }
};
const toggleAccordion = (key) => {
  accordionOpen[key] = !accordionOpen[key];
};
const closeMenu = () => {
  isMenuOpen.value = false;
  accordionOpen.fan = false;
  accordionOpen.info = false;
};
const handleMenuToggle = (e) => {
  // 阻止原生details的默认行为，完全由isMenuOpen控制
  e.preventDefault();
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
  router.afterEach(() => {
    closeMenu();
  });
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped>
/* 绿色系现代风格手风琴菜单样式增强 */
@media (max-width: 1023px) {
  .mobile-menu details[open]>div {
    background: linear-gradient(90deg, #e0f7ef 0%, #f0fdf4 100%);
    border-left: 4px solid #86efac;
    box-shadow: 0 2px 8px 0 #bbf7d0;
  }

  .mobile-menu details[open] {
    border-radius: 0 0 1rem 1rem;
  }
}

/* 手风琴菜单动画*/
@media (max-width: 1023px) {

  /* 主菜单展开/收起动画 */
  .mobile-menu {
    transition: all 0.5s ease-in-out;
    max-height: 0;
    opacity: 0;
  }

  .mobile-menu[open] {
    max-height: 100vh;
    /* 足够大的高度容纳所有内容 */
    opacity: 1;
  }

  /* 手风琴子菜单样式（已整合到模板的class中，此处补充说明） */
  .mobile-menu button {
    cursor: pointer;
  }

}
</style>
