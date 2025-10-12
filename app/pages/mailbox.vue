<template>
  <div class="px-4 py-10 max-w-3xl mx-auto">
    <!-- 标题部分 -->
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-green-800 mb-2 relative inline-block">
        狐歧信箱
        <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></span>
      </h1>
      <p class="text-green-600 text-sm">狐歧山小狐狸们的专属信箱</p>
    </div>

    <!-- 碧瑶圈子提问箱 -->
    <div class="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl p-6 mb-8 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 class="text-xl font-semibold text-green-800 mb-3">【碧瑶圈子提问箱】</h2>
      <p class="text-green-700 leading-relaxed text-sm sm:text-base mb-5">为更好地共建瑶圈，现开启专属提问箱，长期收集大家对圈子发展的所有宝贵建议 （如活动创意、内容方向等）。每一条建议我们都会认真阅读并回答。 你的每一次发声，都是瑶圈成长的重要力量。提问箱支持匿名，欢迎畅所欲言。</p>

      <div class="text-center">
        <a href="https://pome.vip/OiniU4yY" target="_blank" rel="noopener noreferrer" class="catBtn inline-block px-6 py-2 rounded-full text-white font-medium bg-gradient-to-r from-green-300 to-emerald-400 hover:from-green-400 hover:to-emerald-500 shadow-sm hover:shadow-md transition-all duration-300"> 前往提问箱 </a>
      </div>
    </div>

    <!-- 其他信箱的预留位置 -->
    <div class="text-center text-green-500 italic text-sm">更多狐歧信箱即将开放，敬请期待……</div>
  </div>
</template>

<script lang="js" setup>
definePageMeta({
  title: "碧瑶圈信箱 | 狐歧信箱",
  textCol: "text-black",
});

useHead({
  title: "碧瑶圈信箱 | 狐歧信箱",
  meta: [
    {
      name: "description",
      content:
        "碧瑶圈官方信箱，【碧瑶圈子提问箱】现已开启，长期收集瑶圈发展建议与创意。每一条发声，都是瑶圈成长的重要力量。提问箱支持匿名，欢迎畅所欲言。",
    },
    {
      name: "keywords",
      content:
        "碧瑶,小说,同人文,诛仙,诛仙女主角碧瑶,资料馆,信箱,狐歧信箱,提问箱,意见,反馈,瑶圈",
    },
  ],
});
</script>

<style scoped>
/* 可选微调样式 */
</style>
