<template>
  <div class="px-6 mt-5">
    <div class="text-center">
      <p class="text-black">是的,上面的搜索框是个纯摆设,搜图功能后续待开发~敬请期待</p>
      <h2 class="text-black text-xl">很抱歉,因为521流量太大,为了防止一觉醒来房子归移动,暂时不提供原图下载,想下载原图的花瓣们移步微博碧瑶主页</h2>
    </div>
    <div id="ImgContainer" class="gap-4 min-w-full mx-auto">
      <div v-for="(img, idx) in allImages" :key="idx"
        class="groupN group relative mb-4 overflow-hidden rounded-lg transition-all duration-300"
        @click.stop="handleImageClickShow(idx)">
        <img :src="img" :alt="'img' + idx" loading="lazy" class="w-full block transition-all duration-300" />
        <button @click.stop="downloadImage(img)" :class="{ 'opacity-70': activeImageIndex === idx && isMobile }"
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-70 transition-all duration-300 hover:scale-120 cursor-pointer">
          <svg class="w-8 h-8 text-gray-800 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  banner: '/img/header/picture-header.jpg',
  title: '卷丹青',
  wrapperHeight: 'h-160',
  textCol: "text-black"
});
const numberOfImages = 24; // 定义要构造的图片个数
const imageBaseURL = '/img/juandanqing/';
const allImages = ref([]);
const activeImageIndex = ref(null); // 跟踪当前被点击的图片索引
const isMobile = ref(false); // 是否为移动设备

onMounted(() => {
  const images = Array.from({ length: numberOfImages }, (_, i) => `${imageBaseURL}${i + 1}.jpg`);
  // 随机打乱数组
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  allImages.value = images;

  // 检查是否为移动设备
  isMobile.value = window.innerWidth <= 1024;

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1024;
  });

  // 添加点击文档其他区域时取消激活状态的事件监听
  document.addEventListener('click', () => {
    activeImageIndex.value = null;
  });
});

const downloadImage = (imgUrl) => {
  const link = document.createElement('a');
  link.href = imgUrl;
  link.download = imgUrl.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 处理图片点击事件
const handleImageClickShow = (idx) => {
  // 只在移动端（宽度小于1024px）时应用点击效果
  if (isMobile.value) {
    // 如果点击的是当前激活的图片，则取消激活状态
    if (activeImageIndex.value === idx) {
      activeImageIndex.value = null;
    } else {
      // 否则设置新的激活图片
      activeImageIndex.value = idx;
    }
  }
};
</script>

<style scoped>
#ImgContainer {
  columns: 4 300px;
}

.groupN::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.75) 0%,
      /* 顶部：灰色，70% 透明度 */
      transparent 20%, transparent 80%, rgba(255, 255, 255, 0.75) 100%
      /* 底部：灰色，70% 透明度 */
    );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.groupN:hover::before {
  opacity: 1;
}

@media (max-width: 1024px) {
  .groupN img {
    cursor: pointer;
  }

  .groupN button {
    width: 120px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 添加 transform 偏移 */
  }

  .active {
    opacity: 1;
  }

  .groupN button svg {
    width: 120px;
    height: 120px;
  }
}
</style>
