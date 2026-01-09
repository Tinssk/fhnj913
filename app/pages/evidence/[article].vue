<template>
    <div>
        <h1 class="text-2xl font-bold mb-4 text-center">{{ slug }}</h1>
        <div class="proseEvidence max-w-none" v-html="data?.content" />
    </div>
</template>

<script lang="js" setup>
definePageMeta({
    wrapperHeight: "h-120",
});
const route = useRoute();
// 设置页面 <title>
// 获取最后一段路径作为文件名（slug）
const slug = decodeURIComponent(route.path.split("/").filter(Boolean).pop() || "小说");
useHead({
    title: `碧瑶|证据存档|${slug}`,
});
const { data } = await useAsyncData(`content-${route.path}`, () =>
    $fetch(`/api/content${route.path}`)
);

onMounted(() => {
    /*加载渐进式图片动画 */
    const blurredImageDivs = document.querySelectorAll(".blurred-img");

    blurredImageDivs.forEach((wrapper) => {
        const img = wrapper.querySelector("img");
        if (!img) return;

        const markLoaded = () => wrapper.classList.add("loaded");

        // 已经命中缓存的图片（同步完成）
        if (img.complete && img.naturalWidth !== 0) {
            markLoaded();
        } else {
            img.addEventListener("load", markLoaded, { once: true });
            img.addEventListener("error", () => wrapper.classList.add("error"), { once: true });
        }
    });
});
</script>

<style>
.proseEvidence {
    font-size: 18px;
    line-height: 1.5;
    color: #333;
    padding: 2rem;
    max-width: 1024px;
    margin: auto;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
    /* 阅读体验优化 */
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: justify;
    letter-spacing: 0.05em;
}


.proseEvidence p {
    margin: 0.5em 0;
    text-indent: 2em;
}

.proseEvidence a {
    text-decoration: underline;
    color: #2563eb;
    /* 蓝色，类似 Tailwind 的 blue-600 */
    transition: color 0.2s ease-in-out;
}

.proseEvidence a:hover {
    color: #1d4ed8;
    /* 深蓝色，hover 时变色 */
    text-decoration-thickness: 2px;
    /* 增强下划线粗细 */
    text-underline-offset: 2px;
    /* 下划线距离文本更远一点，美观 */
}

.proseEvidence h1 {
    font-size: 24px;
    font-weight: bold;
}

.proseEvidence h2 {
    font-size: 20px;
    font-weight: bold;
}

/* 图片样式：块级显示确保独占一行，居中对齐 */
.evidenceImg {
    display: block;
    /* 让图片成为块级元素，确保描述能在下方 */
    margin: 0 auto;
    /* 上下外边距控制间距，左右auto实现居中 */
    width: 450px;
}

/* 图片描述样式：块级显示+居中 */
.proseEvidence p.image-caption {
    text-align: center;
    /* 文字居中 */
    margin: 0 auto;
    padding-bottom: 2em;
    /* 底部留更大间距区分段落，左右auto配合块级居中 */
    font-size: 0.9em;
    /* 可选：缩小描述文字 */
    color: #666;
    /* 可选：调整描述颜色 */
}

/*图片样式 */
/*图片包装器实现渐进式图片 */
.proseEvidence .blurred-img {
    max-width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 1;
    /*缩略图配置 */
    filter: blur(8px);
}

/*加载完后消除滤镜 */
.proseEvidence .blurred-img.loaded {
    filter: blur(0);
}

.proseEvidence .blurred-img>img {
    display: block;
    width: 100%;
    height: auto;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    /* 初始设置不透明度为 0 */
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.proseEvidence .blurred-img.loaded>img {
    opacity: 1;
}


@media (max-width: 600px) {
    .proseEvidence {
        font-size: 16px;
        padding: 1.5rem 1rem;
    }
}
</style>