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
const { data } = await useAsyncData(`content-${route.path}`, () =>
    $fetch(`/api/content${route.path}`)
);
// 获取最后一段路径作为文件名（slug）
const slug = decodeURIComponent(route.path.split("/").filter(Boolean).pop() || "小说");

// 设置页面 <title>
useHead({
    title: `碧瑶|证据存档|${slug}`,
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
    /* ✅ 支持中文、英文换行 */
    overflow-wrap: break-word;
    /* ✅ 解决长单词、长链接问题 */
    white-space: pre-wrap;
    /* ✅ 保留 Markdown 中换行 */
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

@media (max-width: 600px) {
    .proseEvidence {
        font-size: 16px;
        padding: 1.5rem 1rem;
    }
}
</style>