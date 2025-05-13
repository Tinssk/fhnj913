<template>
  <div class="w-full p-4">
    <ContentRenderer v-if="page" :value="page" class="proseThank  text-black" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  banner: "/img/header/thank-header.jpg",
  title: "致谢",
  wrapperHeight: "h-140",
});
const route = useRoute();
const { data: page } = await useAsyncData(`role`, () => {
  return queryCollection("content").path(route.path).first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}
</script>

<style>
/* --------------------------------------------------
  现代 Markdown 文档样式 (for .proseThank
  )
----------------------------------------------------- */
.proseThank {
  max-width: 80vw;
  /* 限制最大宽度，居中显示 */
  margin: 2rem auto;
  padding: 2rem;
  line-height: 1.7;
  color: #333;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.proseThank>* {
  margin-bottom: 1.5rem;
}

.proseThank> :last-child {
  margin-bottom: 0;
}

/* 标题 */
.proseThank h1,
.proseThank h2,
.proseThank h3,
.proseThank h4,
.proseThank h5,
.proseThank h6 {
  color: #1a202c;
  line-height: 1.3;
  font-weight: 600;
}

.proseThank h1 {
  text-align: center;
  font-size: 2.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e6ed;
  margin-bottom: 2rem;
}

.proseThank h2 {
  font-size: 2rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #e0e6ed;
  margin-bottom: 1.75rem;
}

.proseThank h3 {
  font-size: 1.75rem;
}

.proseThank h4 {
  font-size: 1.5rem;
  color: #4a5568;
}

.proseThank h5 {
  font-size: 1.25rem;
  color: #718096;
}

.proseThank h6 {
  font-size: 1rem;
  color: #a0aec0;
}

/* 段落 */
.proseThank p {
  font-size: 1rem;
  color: #4a5568;
}

/* 链接 */
.proseThank h2 a {
  color: black;
  /* 禁用时的文字颜色 */
  text-decoration: none;
  /* 移除下划线 */
  pointer-events: none;
  /* 阻止鼠标事件（点击、悬停等） */
  cursor: default;
  /* 将鼠标光标改为默认箭头 */
  opacity: 0.6;
  /* 降低不透明度，使其看起来被禁用 */
  /* 或者使用 filter 增加灰度 */
  /* filter: grayscale(80%); */
}

.proseThank h2 a:hover {
  color: black;
  /* 禁用悬停时的文字颜色 */
  text-decoration: none;
  /* 移除悬停下划线 */
}

.proseThank a {
  color: blue;
}

.proseThank a:hover {
  text-decoration: underline
}

/* 强调 */
.proseThank strong {
  font-weight: 700;
  color: #2d3748;
}

.proseThank em {
  font-style: italic;
  color: #718096;
}

/* 列表 */
.proseThank ul,
.proseThank ol {
  padding-left: 1.5rem;
}

.proseThank ul {
  list-style-type: disc;
}

.proseThank ol {
  list-style-type: decimal;
}

.proseThank li {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.75rem;
}

.proseThank li>ul,
.proseThank li>ol {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

/* 引用 */
.proseThank blockquote {
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  color: #718096;
  border-left: 4px solid #cbd5e0;
  background-color: #edf2f7;
  border-radius: 0.25rem;
  font-style: italic;
}

.proseThank blockquote p:last-child {
  margin-bottom: 0;
}

/* 代码块 */
.proseThank pre {
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background-color: #2d3748;
  color: #f8f8f2;
  border-radius: 0.25rem;
  overflow-x: auto;
  font-size: 0.9rem;
}

.proseThank pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

/* 行内代码 */
.proseThank code {
  padding: 0.2rem 0.4rem;
  font-size: 0.9rem;
  color: #c678dd;
  background-color: #282c34;
  border-radius: 0.25rem;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

/* 分割线 */
.proseThank hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #e0e6ed;
}

/* 表格 */
.proseThank table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.proseThank th {
  padding: 0.75rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 2px solid #e0e6ed;
}

.proseThank td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e6ed;
}

.proseThank tr:last-child td {
  border-bottom: none;
}

/* 图片 */
.proseThank img {
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
}

/* --------------------------------------------------
  响应式调整 (可选)
----------------------------------------------------- */
@media (max-width: 768px) {
  .proseThank {
    max-width: 95vw;
    padding: 1.5rem;
    margin: 1.5rem auto;
  }

  .proseThank h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .proseThank h2 {
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
  }

  .proseThank h3 {
    font-size: 1.5rem;
  }
}
</style>