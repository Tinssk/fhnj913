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
  },
});



const route = useRoute();
const router = useRouter();
const contentRef = ref(null);
const randomLine = ref("");
const randomLineCheck = ref(true);
/*判断是是否为卷丹青 */
const pictures = ref(false);
watchEffect(() => {
  // 检查当前路由的路径是否是 '/picturess'
  if (route.path === '/pictures') {
    // 如果是，将 pictures.value 设置为 true
    pictures.value = true;
  } else {
    // 如果不是，将 pictures.value 设置为 false
    pictures.value = false;
  }
});
//判断是否为novels界面
const novels = ref(false);
watchEffect(() => {
  // 检查当前路由的路径是否是 '/picturess'
  if (route.path.startsWith('/novels')) {
    // 如果是，将 pictures.value 设置为 true
    novels.value = true;
  } else {
    // 如果不是，将 pictures.value 设置为 false
    novels.value = false;
  }
});
//判断是否为novels界面
const biyaofameCh = ref(false);
watchEffect(() => {
  biyaofameCh.value = /^\/biyaofame\/\d+$/.test(route.path);
});
//小说页面时把标题设置为小说的标题
const biyaofameChapter = useState('biyaofameChapter');

//设置语录数组
let segments = [];
// 加载随机段落
const { data } = await useFetch("/api/random-ana", { server: true });
// 首次加载：只在服务端执行随机选取，避免 hydration 后再次变动
if (process.server && data.value?.segments && Array.isArray(data.value.segments)) {
  segments = data.value.segments;
  const random = segments[Math.floor(Math.random() * segments.length)];
  randomLine.value = `—— ${random}`;
} else if (process.server) {
  console.log("语录数据获取失败");
}
function loadAndPickRandomSegment() {
  if (data.value?.segments && Array.isArray(data.value.segments)) {
    segments = data.value.segments;
    const random = segments[Math.floor(Math.random() * segments.length)];
    const result = `—— ${random}`;
    if (result !== randomLine.value) {
      //如果不同,返回结果
      randomLine.value = `—— ${random}`;
    } else {
      //如果相同,再递归调用一次
      loadAndPickRandomSegment();
    }
  } else {
    console.log("语录数据获取失败");
  }
}
//检测当切换页面时,触发一次浮动动画与语录
watch(
  () => route.fullPath,
  () => {
    const el = contentRef.value;
    loadAndPickRandomSegment();

    if (el) {
      el.classList.remove("animate-fadeUp");
      void el.offsetWidth; // 触发重排
      el.classList.add("animate-fadeUp");
    }
  }
);
router.afterEach((to, from) => {
  // 如果点击的是当前路径（不含 hash）
  if (to.fullPath === from.fullPath) {
    // 滚动到顶部
    loadAndPickRandomSegment();
  }
});
</script>

<template>
  <div>
    <!-- Banner 区域：设置固定高度，并保持图片的原始比例，同时裁剪下部，保留上部 -->
    <div v-if="banner" :class="[`${wrapperHeight}`, 'relative w-full overflow-hidden z-10']">
      <!-- 图片 -->
      <img :src="banner" alt="页面头图" class="w-full h-full object-cover object-top shadow-inner-2xl wrappimg"
        style="mask-image: linear-gradient(to bottom, black 75%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%)" />
      <div ref="contentRef"
        class="absolute flex flex-col items-center justify-center top-0 w-full h-full animate-fadeUp">
        <!-- 标题 -->
        <h1 v-if="title" class=" text-3xl lg:text-5xl font-bold text-white text-center z-20">
          {{ title }}
        </h1>
        <h2 v-if="novels" class="text-2xl lg:text-4xl text-black mt-5">折花笺</h2>
        <h2 v-if="biyaofameCh" class="text-2xl lg:text-4xl text-black mt-10">{{ biyaofameChapter }}</h2>
        <!-- 25年521宣传标志 -->
        <div class=" group w-fit absolute left-2 lg:left-20 bottom-10 lg:bottom-15">
          <!-- 宣传图 -->
          <a href="https://weibo.com/p/1008082ba2304bd954b238b1684564e6818499" target="_blank"
            rel="noopener noreferrer">
            <img src="/img/header/25521.png" class="catBtn  hover:scale-110 w-40 lg:w-60 h-auto" />
          </a>

          <!-- 悬浮卡片 -->
          <div
            class="absolute bottom-full mb-2 left-0 w-64 p-3 bg-white text-black rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <p class="text-sm">
              🎉 25年521活动正在进行中,心火燎原,来微博碧瑶超话社区,感受这永不停歇的爱吧~
            </p>
          </div>
        </div>
        <!-- 右下角偏上段落 -->
        <p v-if="randomLineCheck" :class="[`${textCol}`]"
          class="absolute right-5 lg:right-25 bottom-12 lg:bottom-20 translate-y-1/3 text-sm lg:text-xl font-light text-right w-50 lg:w-200 leading-relaxed z-10">
          {{ randomLine }}
        </p>
        <!-- 搜索框 -->
        <div v-if="pictures" class="absolute left-1/2 transform -translate-x-1/2 top-[60%] w-full max-w-4xl px-4 z-30">
          <SearchBar placeholder="搜索您感兴趣的内容..." />
        </div>
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
