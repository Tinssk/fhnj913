<template>
  <!-- 该组件无实际UI，仅用于执行自动化检测逻辑 -->
  <div class="selenium-detector" style="display: none;"></div>
</template>

<script setup>

// onMounted(() => {
//   // 1. 检测 navigator.webdriver 特征
//   console.log(`[自动化检测] navigator.webdriver 值: ${navigator.webdriver}`);
//   if (navigator.webdriver) {
//     console.log("[自动化检测] 检测到Selenium/webdriver");
//   } else {
//     console.log("[自动化检测] 未检测到webdriver");
//   }

//   // 2. 检测 Chrome 自动化标志（AutomationControlled）
//   let chromeVariations = [];
//   if (window.navigator.chrome && window.navigator.chrome.getVariations) {
//     chromeVariations = window.navigator.chrome.getVariations();
//   }
//   console.log(`[自动化检测] Chrome 特征列表（前5项）: ${chromeVariations.slice(0, 5).join(', ')}${chromeVariations.length > 5 ? '...' : ''}`);
//   if (chromeVariations.includes('AutomationControlled')) {
//     console.log("[自动化检测] 检测到 Selenium（Chrome 自动化标志）");
//   } else {
//     console.log("[自动化检测] 未检测到 Chrome 自动化标志");
//   }

//   // 3. 检测可疑窗口尺寸
//   const [width, height] = [window.innerWidth, window.innerHeight];
//   console.log(`[自动化检测] 当前窗口尺寸: ${width}x${height}`);
//   const suspiciousSizes = [
//     [1050, 708], [1366, 768], [1920, 1080]
//   ];
//   const isSuspiciousSize = suspiciousSizes.some(([w, h]) => w === width && h === height);
//   if (isSuspiciousSize) {
//     console.log("[自动化检测] 检测到可疑窗口尺寸（可能为自动化工具）");
//   } else {
//     console.log("[自动化检测] 未检测到可疑窗口尺寸");
//   }

//   // 4. 检测鼠标事件异常（输出具体delta值）
//   let mouseEventLogs = [];
//   const handleMouseMove = (e) => {
//     mouseEventLogs.push(`deltaX: ${e.deltaX}, deltaY: ${e.deltaY}`);
//     // 只保留最近5条记录，避免日志过多
//     if (mouseEventLogs.length > 5) mouseEventLogs.shift();
//   };
//   document.addEventListener('mousemove', handleMouseMove);

//   setTimeout(() => {
//     console.log(`[自动化检测] 最近5次鼠标移动事件: ${mouseEventLogs.join('; ')}`);
//     const hasZeroDelta = mouseEventLogs.some(log => log.includes('deltaX: 0') && log.includes('deltaY: 0'));
//     if (hasZeroDelta) {
//       console.log("[自动化检测] 检测到异常鼠标事件（存在deltaX和deltaY均为0的情况）");
//     } else {
//       console.log("[自动化检测] 未检测到异常鼠标事件（鼠标移动有正常delta值）");
//     }
//     // 移除事件监听，避免内存泄漏
//     document.removeEventListener('mousemove', handleMouseMove);
//   }, 3000);

//   // 5. 检测可疑 User-Agent
//   const userAgent = window.navigator.userAgent;
//   console.log(`[自动化检测] 当前User-Agent: ${userAgent}`);
//   const suspiciousKeywords = ['webdriver', 'selenium'];
//   const hasSuspiciousUA = suspiciousKeywords.some(keyword => userAgent.includes(keyword));
//   if (hasSuspiciousUA) {
//     console.log(`[自动化检测] 检测到可疑 User-Agent（包含关键词: ${suspiciousKeywords.find(k => userAgent.includes(k))}）`);
//   } else {
//     console.log("[自动化检测] 未检测到可疑 User-Agent");
//   }

//   // 6. 检测根元素自动化类名
//   const rootElement = document.documentElement;
//   const rootClass = rootElement.className;
//   console.log(`[自动化检测] 根元素（html）类名: ${rootClass || '无类名'}`);
//   const automationClasses = ['webdriver', 'automation'];
//   const hasWebdriverClass = automationClasses.some(cls => rootClass.includes(cls));
//   if (hasWebdriverClass) {
//     console.log(`[自动化检测] 检测到根元素包含自动化类名: ${automationClasses.find(c => rootClass.includes(c))}`);
//   } else {
//     console.log("[自动化检测] 未检测到根元素包含自动化类名");
//   }
// });
</script>

<style scoped>
/* 组件无实际样式，隐藏占位元素 */
.selenium-detector {
  display: none !important;
}
</style>