<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const isLoading = ref(false);
const progress = ref(0);
const fadeOut = ref(false);

const router = useRouter();

// // 设置首次加载时触发的动画
// onMounted(() => {
//   isLoading.value = true;
//   fadeOut.value = false;
//   progress.value = 0;
//   simulateProgress();

//   setTimeout(() => {
//     progress.value = 100;
//     setTimeout(() => {
//       fadeOut.value = true;
//       setTimeout(() => {
//         isLoading.value = false;
//         progress.value = 0;
//       }, 400);
//     }, 500);
//   }, 800); // 首次加载时间可以更长一点
// });

router.beforeEach((to, from, next) => {
  // 只在进行页面跳转时触发加载动画，避免#跳转触发
  if (!to.hash) {
    isLoading.value = true;
    fadeOut.value = false;
    progress.value = 0;
    simulateProgress();
  }
  next();
});

router.afterEach(() => {
  progress.value = 100;
  setTimeout(() => {
    fadeOut.value = true;
    setTimeout(() => {
      isLoading.value = false;
      progress.value = 0;
    }, 400);
  }, 500);
});

function simulateProgress() {
  const interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 5;
    } else {
      clearInterval(interval);
    }
  }, 80);
}
</script>

<template>
  <div v-if="isLoading"
    :class="['fixed inset-0 z-50 flex flex-col items-center justify-center', 'bg-white/70 dark:bg-black/50 backdrop-blur-sm', fadeOut ? 'animate-fadeOut' : 'animate-fadeIn']">
    <!-- 中间内容 -->
    <div class="flex flex-col items-center space-y-6">
      <img src="/img/byIcon.png" alt="Loading" class="w-30 h-16" />

      <!-- 小圆点 Loading -->
      <div class="flex space-x-2">
        <span class="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-ping-custom"></span>
        <span class="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-ping-custom delay-150"></span>
        <span class="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-ping-custom delay-300"></span>
      </div>

      <!-- 进度条 -->
      <div class="w-64 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mt-4">
        <div class="h-full bg-green-500 transition-all duration-300 ease-out" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- 文本 -->
      <div class="text-green-700 dark:text-green-300 font-semibold tracking-wide animate-pulse">Loading... {{
        Math.floor(progress) }}%</div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes ping-custom {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

.animate-fadeOut {
  animation: fadeOut 0.4s ease-out forwards;
}

.animate-ping-custom {
  animation: ping-custom 1s infinite ease-in-out;
}
</style>
