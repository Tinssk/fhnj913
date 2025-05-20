<template>
  <BrowserCompatibilityCheck />
  <!-- 页面切换过渡层 -->
  <CustomLoading />
  <!-- 🔥 视频特效层 -->
  <ScreenEffect />
  <!-- 游戏组件 -->
  <GameShade />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="js">
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
