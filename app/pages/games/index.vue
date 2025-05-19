<template>
  <div>
    <div class="w-max-[1024px]">
      <p class="text-center">用来放一些好玩的东西,敬请期待</p>
      <div class="mx-auto max-w-xl p-6 bg-green-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center gap-4">
        <img src="/img/games/File/完成喝彩.png" class="w-24 h-24 object-cover rounded-xl shadow-sm" />
        <div class="flex flex-col text-green-900">
          <p class="text-lg font-semibold mb-1">瑶瑶翻翻乐</p>
          <p class="text-sm text-green-700 mb-3">来找出所有藏着的瑶瑶吧</p>
          <p class="text-sm font-medium text-green-800 mb-1">点击开始：</p>
          <button class="catBtn h-10 bg-green-400 rounded-xl hover:shadow-xl hover:bg-green-500" @click="useState('showGame').value = true">瑶瑶翻翻乐</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "碧瑶|趣事物|一切好玩的东西",
  textCol: "text-black",
});
// 设置页面 <title>
useHead({
  title: `碧瑶|趣事物|一切好玩的东西`,
});
</script>

<style></style>
