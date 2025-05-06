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
  textCol: {
    type: String,
    required: false,
    default: "text-black",
  }
});
const route = useRoute()
const router = useRouter()
const contentRef = ref(null)
const randomLine = ref('')
const randomLineCheck = ref(true)
let segments = []
// 加载随机段落
const { data } = await useFetch('/api/random-ana', { server: true })
// 首次加载：只在服务端执行随机选取，避免 hydration 后再次变动
if (process.server && data.value?.segments && Array.isArray(data.value.segments)) {
  segments = data.value.segments
  const random = segments[Math.floor(Math.random() * segments.length)]
  randomLine.value = `—— ${random}`
}
else if (process.server) {
  console.log("语录数据获取失败")
}
function loadAndPickRandomSegment() {
  if (data.value?.segments && Array.isArray(data.value.segments)) {
    segments = data.value.segments
    const random = segments[Math.floor(Math.random() * segments.length)]
    randomLine.value = `—— ${random}`
  }
  else {
    console.log("语录数据获取失败")
  }
}
//检测当切换页面时,触发一次浮动动画与语录
watch(() => route.fullPath, () => {
  const el = contentRef.value
  loadAndPickRandomSegment()

  if (el) {
    el.classList.remove('animate-fadeUp')
    void el.offsetWidth // 触发重排
    el.classList.add('animate-fadeUp')
  }
})
router.afterEach((to, from) => {
  // 如果点击的是当前路径（不含 hash）
  if (to.fullPath === from.fullPath) {
    // 滚动到顶部
    loadAndPickRandomSegment()
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
      <div ref="contentRef" class="absolute top-0 w-full h-full animate-fadeUp">
        <!-- 标题 -->
        <h1 v-if="title"
          class=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white text-center z-20">
          {{ title }}
        </h1>
        <!-- 右下角偏上段落 -->
        <p v-if="randomLineCheck" :class="[`${textCol}`]"
          class="absolute right-20 bottom-20 translate-y-1/3  text-xl font-light text-right w-200 leading-relaxed z-10">
          {{ randomLine }}
        </p>
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
