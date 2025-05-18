<template>
  <Header />
  <div class="relative h-[100vh] bg-transparent overflow-hidden">
    <video ref="backgroundVideo" class="absolute  w-full h-[100vh] object-cover min-height-[800px]" preload="auto" loop
      playsinline autoplay tabindex="-1" muted>
      <source src="https://bg-1359278315.cos.ap-nanjing.myqcloud.com/bgav1.mp4"
        type="video/mp4; codecs=av01.0.01M.08" />
      <source src="/video/bgav1.mp4" type="video/mp4; codecs=av01.0.01M.08" />
      <source src="/video/bg.mp4" type="video/mp4" />
      您的浏览器不支持 HTML5 视频。
    </video>
    <div ref="contentRef" class="absolute left-0 top-0 w-full h-[100vh] select-none animate-fadeUp">
      <div
        class="font-[汉仪文黑-85w] absolute flex flex-col justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 text-white text-center">
        <div class="subtitle fade-in font-medium  text-lg  lg:text-2xl tracking-[10px] mb-4">碧瑶の狐歧资料站</div>
        <div class="title font-medium text-5xl lg:text-6xl mb-4">伤心花开人未还</div>
        <nuxt-link to="/main" class="catBtn"><button id="try-btn"
            class="cursor-pointer catBtn w-40 h-13 mt-3 relative text-white  bg-gradient-to-br from-gray-100 to-emerald-400 shadow-xl text-center rounded-full text-lg transition-all duration-300 ease-in-out"
            tabindex="0">立刻进入</button></nuxt-link>
        <div class="title font-medium text-sm lg:text-2xl mt-4">狐歧资料站献给碧瑶与所有陪伴在她身边的花瓣们</div>
      </div>
      <div
        class="absolute right-4 lg:right-20 bottom-40 lg:bottom-50  text-base lg:text-3xl font-semibold text-green-300">
        ———— 在互联网上完全属于我们的资料站
      </div>
      <div id="music-btn"
        class="absolute w-12 h-12 right-10 top-18 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-emerald-400 shadow-xl transition-all duration-300 ease-in-out"
        @click="toggleMute">
        <svg t="1746972615065" class="icon w-full h-full" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="7653" width="200" height="200">
          <path
            d="M918.3 74.7c-13.3-11.2-30.8-15.9-47.9-12.8l-503.3 88.8c-28.1 5-48.5 29.3-48.5 57.8v500.8c-24.9-21.2-57.1-34.1-92.3-34.1-78.6 0-142.6 64-142.6 142.6s64 142.6 142.6 142.6 142.6-64 142.6-142.6V369.2L889 277.4v331.2c-24.9-21.2-57.1-34.1-92.3-34.1-78.6 0-142.6 64-142.6 142.6s64 142.6 142.6 142.6 142.6-64 142.6-142.6V119.7c0-17.4-7.6-33.8-21-45zM226.3 910c-50.9 0-92.3-41.4-92.3-92.3s41.4-92.3 92.3-92.3 92.3 41.4 92.3 92.3-41.4 92.3-92.3 92.3z m142.6-591.9V208.5c0-4.1 2.9-7.6 6.9-8.3l503.3-88.8c3.4-0.5 5.7 0.9 6.8 1.9 1.1 0.9 3 3 3 6.4v106.7l-520 91.7z m427.8 491.3c-50.9 0-92.3-41.4-92.3-92.3s41.4-92.3 92.3-92.3 92.3 41.4 92.3 92.3-41.4 92.3-92.3 92.3z"
            fill="#3CB87F" p-id="7654"></path>
          <!-- 添加一条红色斜线表示禁止 -->
          <line v-if="isMuted" x1="100" y1="100" x2="924" y2="924" stroke="#d0fae5" stroke-width="60"
            stroke-linecap="round" />
        </svg>
      </div>
    </div>
  </div>
  <div class="flex justify-center items-center w-full h-[100vh] bg-black">
    <div class="flex justify-between items-center text-white">
      <img class="w-30 mr-0" src="/img/by.png" alt="未来" />
      <p class="font-medium text-4xl">·世界·未来</p>
    </div>
  </div>
  <Footer />
</template>

<script lang="js" setup>
definePageMeta({
  layout: false,
  layoutTransition: {
    name: 'slide-in'
  }
})

const backgroundVideo = ref(null);
const isMuted = ref(true);
const route = useRoute()
const contentRef = ref(null)
//检测当切换页面时,触发一次浮动动画
watch(() => route.fullPath, () => {
  const el = contentRef.value
  if (el) {
    el.classList.remove('animate-fadeUp')
    void el.offsetWidth // 触发重排
    el.classList.add('animate-fadeUp')
  }
})
const toggleMute = () => {
  if (backgroundVideo.value) {
    backgroundVideo.value.muted = !backgroundVideo.value.muted;
    isMuted.value = backgroundVideo.value.muted;
    // 你可以在这里添加一些视觉反馈，例如改变音乐按钮的图标
  }
};
</script>

<style scoped>
.subtitle::after {
  content: "";
  /* 必须设置 content，伪元素才会显示 */
  display: inline-block;
  /* 让伪元素像图片一样展示 */
  width: 20px;
  /* 图标宽度 */
  height: 20px;
  /* 图标高度 */
  background: url("/img/icon1.png") no-repeat center;
  /* 替换为你的图标路径 */
  background-size: contain;
  /* 确保图标适应大小 */
  vertical-align: middle;
  /* 对齐文字 */
}



/*为渐变背景添加平滑过渡,通过给伪元素添加透明层,然后给透明层添加过渡的方式*/
#try-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3dcba0, #f4f4f5);
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 100px;
  z-index: -1;
}

#try-btn:hover::before {
  opacity: 1;
}

#try-btn:hover {
  transform: translateY(-3px) scale(1.1);
  /* 悬停效果 */
  transition: all 0.3s ease;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
  /* 增强阴影效果 */
}

#try-btn:active {
  transform: translateY(0);
  /* 点击时恢复位置 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* 点击时减少阴影 */
}

/*为渐变背景添加平滑过渡,通过给伪元素添加透明层,然后给透明层添加过渡的方式*/
#music-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3dcba0, #f4f4f5);
  border-radius: 100px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

#music-btn:hover::before {
  opacity: 1;
}

#music-btn:hover {
  transform: translateY(-3px) scale(1.1);
  /* 悬停效果 */
  transition: transform 0.3s ease;
  /* 悬停时向上浮动 */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
  /* 增强阴影效果 */
}

#music-btn:active {
  transform: translateY(0);
  /* 点击时恢复位置 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* 点击时减少阴影 */
}
</style>