<template>
  <div class="px-6 mt-5">
    <div class="text-center">
      <p class="text-black">是的,上面的搜索框是个纯摆设,搜图功能后续待开发~敬请期待</p>
      <h2 class="text-black text-xl">很抱歉,因为521流量太大,为了防止一觉醒来房子归移动,暂时不提供原图下载,想下载原图的花瓣们移步微博碧瑶主页</h2>
      <Button class="bg-green-400 hover:bg-green-600"><a href="https://weibo.com/u/2461312731" target="_blank"
          rel="noopener noreferrer"><svg class="mr-2 inline" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24" height="24" viewBox="0 0 48 48">
            <path fill="#FFF"
              d="M34,29c-0.6-5.8-7.6-9.8-16-8.9c-4.9,0.5-9.4,2.6-11.9,5.6C4.5,27.6,3.8,29.8,4,32c0.5,5.3,6.4,9,13.8,9c0.7,0,1.4,0,2.2-0.1c4.9-0.5,9.4-2.6,11.9-5.6C33.5,33.4,34.2,31.2,34,29z">
            </path>
            <path fill="#D32F2F"
              d="M19.8,38.9C12.7,39.6,6.5,36.4,6,31.8c-0.5-4.6,5-9,12.1-9.7c7.2-0.7,13.3,2.5,13.8,7.1C32.4,33.9,27,38.2,19.8,38.9 M34.7,23.9c-0.6-0.2-1-0.3-0.7-1.1c0.7-1.7,0.8-3.2,0-4.3c-1.4-2-5.3-1.9-9.7-0.1c0,0-1.4,0.6-1-0.5c0.7-2.2,0.6-4-0.5-5C20.4,10.5,14,13,8.5,18.4C4.4,22.5,2,26.8,2,30.5C2,37.7,11.2,42,20.3,42C32.1,42,40,35.2,40,29.8C40,26.5,37.2,24.7,34.7,23.9">
            </path>
            <path fill="#263238"
              d="M20.9,30.4c-0.3,0.5-0.9,0.8-1.4,0.6c-0.5-0.2-0.6-0.8-0.4-1.3c0.3-0.5,0.9-0.8,1.3-0.5C21,29.3,21.1,29.8,20.9,30.4 M17.6,32.8c-0.7,1-2.3,1.5-3.5,1c-1.2-0.5-1.5-1.7-0.8-2.6c0.7-1,2.2-1.4,3.4-1C18,30.6,18.4,31.8,17.6,32.8 M20.5,25.2c-3.5-0.9-7.4,0.8-8.9,3.8c-1.5,3.1-0.1,6.5,3.5,7.6c3.6,1.2,7.9-0.6,9.4-3.9C26,29.5,24.1,26.1,20.5,25.2">
            </path>
            <path fill="#F9A825" d="M43.9 20A1.5 1.5 0 1 0 43.9 23A1.5 1.5 0 1 0 43.9 20Z"></path>
            <path fill="#F9A825"
              d="M45.3,22C45.3,22,45.3,22,45.3,22c-0.2,0.6-0.8,1-1.4,1c-0.8,0-1.5-0.7-1.5-1.5c0-0.2,0-0.4,0.1-0.6C42.8,20,43,19,43,18c0-5-4-9-9-9c-0.4,0-0.9,0-1.3,0.1c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5c0,0,0,0,0,0C33,6,33.5,6,34,6c6.6,0,12,5.4,12,12C46,19.4,45.8,20.7,45.3,22z M40,18c0-3.3-2.7-6-6-6c-0.2,0-0.4,0-0.7,0c0,0,0,0-0.1,0c-0.7,0.1-1.3,0.7-1.3,1.5c0,0.8,0.7,1.5,1.5,1.5c0,0,0.1,0,0.1,0c0,0,0,0,0,0c0.1,0,0.3,0,0.4,0c1.7,0,3,1.3,3,3c0,0.3-0.1,0.7-0.2,1c0,0,0,0,0,0c-0.1,0.2-0.1,0.3-0.1,0.5c0,0.8,0.7,1.5,1.5,1.5c0.6,0,1.1-0.4,1.4-0.9c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0.1-0.2C39.9,19.2,40,18.6,40,18z">
            </path>
          </svg>微博:碧瑶主页(点击前往)</a> </Button>
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
import { Button } from '@/components/ui/button'
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
