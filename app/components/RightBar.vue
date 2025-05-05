<template>
  <div id="right-bar"
    class="fixed right-4 top-1/2 -translate-y-1/2 w-15 h-80 z-30 bg-gray-200/50 backdrop-blur-md rounded-xl shadow-lg border border-white/30">
    <div class="follow_us w-7 h-full mx-auto my-0 pt-3 flex flex-col flex-nowrap justify-between relative"
      @mouseleave="hideCodeBox">
      <a href="#" id="bilibili" class="follow-btn bg-position-[0_0]" @mouseenter="showCodeBox(0)"></a>
      <a href="#" id="weibo" class="follow-btn bg-position-[0_-6rem]" @mouseenter="showCodeBox(2)"></a>
      <a href="#" id="qq" class="follow-btn bg-position-[0_-9.5rem]" @mouseenter="showCodeBox(1)"></a>
      <a href="#" id="douyin" class="follow-btn bg-position-[0_-12.5rem]" @mouseenter="showCodeBox(3)"></a>
      <a href="#" id="redBook" class="follow-btn bg-position-[0_-22.2rem]" @mouseenter="showCodeBox(4)"></a>
      <a href="#" id="shop" class="follow-btn bg-position-[0_-19.5rem]" @mouseenter="showCodeBox(5)"></a>

      <!-- 弹出二维码框 -->
      <div id="code_box" class="absolute left-[-35rem] top-0 w-140 h-full z-30 flex items-center justify-center"
        :class="{ hidden: !showBox }">
        <img v-for="(img, index) in qrList" :key="index" :src="img"
          :style="{ display: currentIndex === index ? 'block' : 'none' }" class="" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const showBox = ref(false)
const currentIndex = ref(-1)

// 注意顺序与 index 一致
const qrList = [
  'https://zxsj.wanmei.com/images/cover231129/B_qr.png',
  'https://zxsj.wanmei.com/images/cover231129/weixin_qr.png',
  'https://zxsj.wanmei.com/images/cover231129/weibo_qr.png',
  'https://zxsj.wanmei.com/images/cover231129/douyin_qr.png',
  'https://zxsj.wanmei.com/images/cover231129/kefu_qr.png',
  'https://zxsj.wanmei.com/images/cover231129/kefu_qr.png'
]

function showCodeBox(index: number) {
  if (index < 0 || index >= qrList.length) {
    showBox.value = false
    return
  }
  currentIndex.value = index
  showBox.value = true
}

function hideCodeBox() {
  showBox.value = false
  currentIndex.value = -1
}
</script>

<style></style>