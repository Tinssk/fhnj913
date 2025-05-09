<template>
  <div class="text-black">
    <h1>About page</h1>

    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  banner: '/img/header/about-header.jpg',
  title: '关于我们',
  wrapperHeight: 'h-80',
  textCol: "text-white"
});
</script>

<style></style>
