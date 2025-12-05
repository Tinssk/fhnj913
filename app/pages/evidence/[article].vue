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

@media (max-width: 600px) {
    .proseEvidence {
        font-size: 16px;
        padding: 1.5rem 1rem;
    }
}
</style>