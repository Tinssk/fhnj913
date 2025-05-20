<template>
  <div class="flex flex-col min-h-screen bg-green-100">
    <!-- 图片版头 -->
    <PageWrapper :banner="banner" :title="title" :wrapperHeight="wrapperHeight" :textCol="textCol" />

    <!-- 引入 Header 组件 -->
    <Header />
    <!-- 移动端目录,侧拉式菜单 -->

    <!-- 引入 MainContent 组件，页面内容将通过 slot 插入 -->
    <MainContent>
      <slot />
      <!-- 这里是动态页面内容 -->
    </MainContent>

    <!-- 引入 Footer 组件 -->
    <Footer />
  </div>
</template>

<script setup lang="js">
const route = useRoute();
const router = useRouter();
const banner = computed(() => typeof route.meta?.banner === "string" ? route.meta.banner : "/img/header/default-header.jpg");
const title = computed(() => typeof route.meta?.title === "string" ? route.meta.title : "碧瑶の狐歧资料馆");
const wrapperHeight = computed(() => typeof route.meta?.wrapperHeight === "string" ? route.meta.wrapperHeight : "h-120");
const textCol = computed(() => typeof route.meta?.textCol === "string" ? route.meta.textCol : "text-black");

router.afterEach((to, from) => {
  if (to.fullPath === from.fullPath) {
    window.scrollTo({ top: 0 });
  }
});
</script>

<style scoped></style>
