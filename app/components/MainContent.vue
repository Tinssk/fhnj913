<template>
  <main ref="contentRef" class=" flex-1 container mx-auto -translate-y-12 animate-fadeUp  px-4 py-0 rounded-lg z-1">
    <slot />
    <!-- 这里放页面内容 -->

  </main>

</template>

<script setup>
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
<style scoped>
.wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  margin-inline: auto;
  transform: scale(1);
  pointer-events: none;
}

.target {
  position: sticky;
  top: 200px;
  pointer-events: auto;
}
</style>