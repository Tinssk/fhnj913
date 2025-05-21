<template>
  <canvas id="petal-canvas" class="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"></canvas>
</template>

<script setup lang="js">
onMounted(() => {
  // 判断是否为移动设备，若是则不执行特效
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const canvas = document.getElementById("petal-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const petals = [];
  const petalCount = isMobile ? 10 : 30;
  const petalSrcList = [
    "/img/petal/1.png",
    "/img/petal/2.png",
    "/img/petal/3.png",
    "/img/petal/4.png",
    "/img/petal/5.png",
    "/img/petal/petal.png",
  ];

  // 加载所有图片
  const imageList = petalSrcList.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  // 确保所有图片加载完成
  Promise.all(imageList.map(img => new Promise(resolve => {
    img.onload = resolve;
  }))).then(() => {
    class Petal {
      constructor() {
        this.image = imageList[Math.floor(Math.random() * imageList.length)];
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = 10 + Math.random() * 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.speedY = 1 + Math.random() * 2;
        this.speedX = Math.random() - 0.5;
        this.opacity = 0.6 + Math.random() * 0.4;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) this.reset();
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((petal) => {
        petal.update();
        petal.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
// 在组件卸载时清理资源
onUnmounted(() => {
  // 停止 requestAnimationFrame 循环
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  // 移除 window resize 事件监听器
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }

  // 清理对 Canvas 的引用，虽然 JavaScript 垃圾回收器会自动处理，
  // 但显式设置为 null 有时可以帮助垃圾回收更快地识别。
  const canvas = document.getElementById("petal-canvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布内容

    }
  }
});
</script>

<style></style>
