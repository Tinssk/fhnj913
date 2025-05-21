<template>
  <div class="hidden">
    <div class=" unsupported-browser-overlay">
      <img src="/img/errorWeep.png" />
      <h2 class="unsupported-browser-title">出问题了!!瑶儿检测到您的浏览器版本过低</h2>
      <p class="unsupported-browser-message">
        您正在使用的浏览器无法正常使用瑶瑶的资料站。请更新您的浏览器或下载一个现代浏览器。
      </p>
      <div class="unsupported-browser-links">
        <p>网盘下载(选择网盘里面的一个下载即可):</p>
        <a href="https://pan.baidu.com/s/1sDIf6HLsE-7v08bUvFtmGQ?pwd=1234" target="_blank" rel="noopener noreferrer"
          class="browser-link chrome">
          百度网盘下载
        </a>
        <a href="https://www.jianguoyun.com/p/DSUh5bIQ8Iy3DRiPkfcFIAA" target="_blank" rel="noopener noreferrer"
          class="browser-link jianguo">
          坚果云下载
        </a>
        <a href="https://www.123912.com/s/mVOKVv-zdUKA" target="_blank" rel="noopener noreferrer"
          class="browser-link yao23">
          123云盘下载
        </a>
      </div>
      <div class="unsupported-browser-links">
        <p>电脑浏览器官网下载:</p>
        <a href="https://www.mozilla.org/firefox/new/" target="_blank" rel="noopener noreferrer"
          class="browser-link firefox">
          下载 Firefox
        </a>
        <a href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer" class="browser-link edge">
          下载 Edge
        </a>
      </div>
      <p class="unsupported-browser-suggestion">
        经我们检查,很多手机自带浏览器的最新版本依然版本十分落后无法,所以请下载上面更好的现代浏览器;
      </p>
      <p>安卓手机端用户请直接选择网盘下载,Windows电脑端用户如果无法访问官网,也可通过网盘下载</p>
      <p>Firefox链接可能弹出警告</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';


onMounted(() => {

});
</script>

<style scoped>
.unsupported-browser-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d0fae5;
  /* 对应 tailwind bg-gray-900 */
  color: black;
  /* 对应 tailwind text-white */
  z-index: 50;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  /* 对应 tailwind p-6 */
}

.unsupported-browser-overlay img {
  width: 100px;
}

.unsupported-browser-title {
  font-size: 1.5rem;
  /* 接近 tailwind text-2xl */
  font-weight: bold;
  /* 对应 tailwind font-bold */
  margin-bottom: 1rem;
  /* 对应 tailwind mb-4 */
}

.unsupported-browser-message {
  margin-bottom: 1rem;
  /* 对应 tailwind mb-4 */
  text-align: center;
  /* 对应 tailwind text-center */
}

.unsupported-browser-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  /* 对应 tailwind justify-center */
  gap: 1rem;
  /* 对应 tailwind gap-4 */
  margin-top: 5px;
}

.browser-link {
  font-weight: bold;
  /* 对应 tailwind font-bold */
  padding: 0.5rem 1rem;
  /* 对应 tailwind py-2 px-4 */
  border-radius: 0.25rem;
  /* 对应 tailwind rounded */
  color: #fff;
  /* 对应 tailwind text-white */
  text-decoration: none;
}

.browser-link.chrome {
  background-color: #3b82f6;
  /* 对应 tailwind bg-blue-500 */
}

.browser-link.chrome:hover {
  background-color: #1d4ed8;
  /* 对应 tailwind hover:bg-blue-700 */
}

.browser-link.jianguo {
  background-color: #f97316;
  /* 橙色，您可以根据坚果云的品牌色调整 */
}

.browser-link.jianguo:hover {
  background-color: #c2410c;
}

.browser-link.yao23 {
  background-color: #a855f7;
  /* 紫色，您可以根据 123 云盘的品牌色调整 */
}

.browser-link.yao23:hover {
  background-color: #7e22ce;
}

.browser-link.firefox {
  background-color: #ed8936;
  /* 对应 tailwind bg-orange-500 */
}

.browser-link.firefox:hover {
  background-color: #c05621;
  /* 对应 tailwind hover:bg-orange-700 */
}

.browser-link.edge {
  background-color: #48bb78;
  /* 对应 tailwind bg-green-500 */
}

.browser-link.edge:hover {
  background-color: #276749;
  /* 对应 tailwind hover:bg-green-700 */
}


.unsupported-browser-suggestion {
  margin-top: 2rem;
  /* 对应 tailwind mt-8 */
  font-size: 0.875rem;
  /* 对应 tailwind text-sm */
  color: green;
  /* 对应 tailwind text-gray-500 */
}
</style>