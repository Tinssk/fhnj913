<!-- 此为全屏弹窗组件,暂时搁置,日后打算完善好,有作为一个公告栏,或者是跟官方讯息一起重置为一个公告系统 -->
<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative flex flex-col w-[80%] max-w-[600px] h-[80%] bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease]">
        <!-- 顶部标题背景区 -->
        <div class="relative h-[120px] flex items-center justify-center overflow-hidden">
          <!-- 背景图片 -->
          <div class="absolute inset-0 bg-[url('/img/popup.jpg')] bg-cover bg-center z-0"></div>

          <!-- 黑色半透明蒙层 -->
          <span class="absolute inset-0 bg-black/40 z-10"></span>
          <!-- ↑ 这里 z-10 在图片之上、标题之下；/50 控制透明度（50%） -->

          <!-- 标题 -->
          <h1 class="relative z-20 text-2xl font-bold text-green-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {{ title }}
          </h1>
        </div>

        <!-- 右上角关闭按钮 -->
        <button @click="close" class="catBtn absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-green-900 font-bold text-xl bg-white/60 rounded-full hover:bg-white/80 hover:scale-110 transition-all">×</button>

        <!-- 正文区 -->
        <div class="flex-1 overflow-y-auto text-green-900 text-base leading-relaxed px-6 pt-6 pb-3 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
          <p v-html="message"></p>
        </div>

        <!-- 底部按钮区 -->
        <div class="flex justify-center items-center gap-4 py-4 border-t border-black/5">
          <button @click="close" class="catBtn bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full px-6 py-2 min-w-[120px] transition-all hover:-translate-y-[2px] hover:shadow-lg">我知道了</button>
          <a v-if="link" :href="link" target="_blank" class="catBtn border-2 border-green-700 text-green-700 bg-white font-semibold rounded-full px-6 py-2 min-w-[120px] transition-all hover:bg-green-700 hover:text-white"> 跳转链接 </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from "vue";

const props = defineProps({
  title: { type: String, default: "致花瓣们的一封信" },
  message: {
    type: String,
    default: ``,
  },
  link: { type: String, default: "https://weibo.com/" },
});

const visible = ref(true);
const close = () => (visible.value = false);

/**
 * 防止滚动穿透（打开弹窗时禁止页面滚动）
 */
const toggleBodyScroll = (disable: boolean) => {
  if (disable) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none"; // 防止移动端滑动
  } else {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }
};

onMounted(() => toggleBodyScroll(true));
onUnmounted(() => toggleBodyScroll(false));
watch(visible, (val) => toggleBodyScroll(val));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
