<script setup>
defineProps({
  banner: {
    type: String,
    required: false,
    default: "",
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
  wrapperHeight: {
    type: String,
    required: false,
    default: "h-120",
  },
});
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
</script>

<template>
  <div>
    <!-- Banner 区域：设置固定高度，并保持图片的原始比例，同时裁剪下部，保留上部 -->
    <div v-if="banner" :class="[`${wrapperHeight}`, 'relative w-full overflow-hidden z-10']">
      <!-- 图片 -->
      <img :src="banner" alt="页面头图" class="w-full h-full object-cover object-top shadow-inner-2xl wrappimg" style="
    mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
  " />



      <div ref="contentRef" class="absolute top-1/2 left-1/2 animate-fadeUp">
        <!-- 标题 -->
        <h1 v-if="title"
          class=" transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white text-center z-20">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrappimg {
  /*图片无法选中 */
  user-select: none;
  -webkit-user-drag: none;
  /* 禁止拖动 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
