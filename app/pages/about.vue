<template>
  <div class="w-full p-4">
    <div class="proseAbout max-w-none" v-html="data?.content" />
  </div>
</template>

<script setup lang="js">
definePageMeta({
  banner: '/img/header/about-header.jpg',
  title: '关于我们',
  wrapperHeight: 'h-80',
  textCol: "text-white"
});
useHead({
  title: `碧瑶|关于我们`,
});
const route = useRoute();
const { data } = await useAsyncData(`content-${route.path}`, () =>
  $fetch(`/api/content${route.path}`)
);
</script>

<style>
.proseAbout {
  max-width: 80vw;
  /* 限制最大宽度，居中显示 */
  margin: 2rem auto;
  padding: 2rem;
  line-height: 1.7;
  color: #333;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.proseAbout>* {
  margin-bottom: 1.5rem;
}

.proseAbout> :last-child {
  margin-bottom: 0;
}

/* 标题 */
.proseAbout h1,
.proseAbout h2,
.proseAbout h3,
.proseAbout h4,
.proseAbout h5,
.proseAbout h6 {
  color: #1a202c;
  line-height: 1.3;
  font-weight: 600;
}

.proseAbout h1 {
  text-align: center;
  font-size: 2.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e6ed;
  margin-bottom: 2rem;
}

.proseAbout h2 {
  font-size: 2rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #e0e6ed;
  margin-bottom: 1.75rem;
}

.proseAbout h3 {
  font-size: 1.75rem;
}

.proseAbout h4 {
  font-size: 1.5rem;
  color: #4a5568;
}

.proseAbout h5 {
  font-size: 1.25rem;
  color: #718096;
}

.proseAbout h6 {
  font-size: 1rem;
  color: #a0aec0;
}

/* 段落 */
.proseAbout p {
  font-size: 1rem;
  color: #4a5568;
}

/* 链接 */
.proseAbout h2 a {
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

.proseAbout h2 a:hover {
  color: black;
  /* 禁用悬停时的文字颜色 */
  text-decoration: none;
  /* 移除悬停下划线 */
}

.proseAbout a {
  color: blue;
}

.proseAbout a:hover {
  text-decoration: underline
}

/* 强调 */
.proseAbout strong {
  font-weight: 700;
  color: #2d3748;
}

.proseAbout em {
  font-style: italic;
  color: #718096;
}

/* 列表 */
.proseAbout ul,
.proseAbout ol {
  padding-left: 1.5rem;
}

.proseAbout ul {
  list-style-type: disc;
}

.proseAbout ol {
  list-style-type: decimal;
}

.proseAbout li {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.75rem;
}

.proseAbout li>ul,
.proseAbout li>ol {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

/* 引用 */
.proseAbout blockquote {
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  color: #718096;
  border-left: 4px solid #cbd5e0;
  background-color: #edf2f7;
  border-radius: 0.25rem;
  font-style: italic;
}

.proseAbout blockquote p:last-child {
  margin-bottom: 0;
}

/* 代码块 */
.proseAbout pre {
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background-color: #2d3748;
  color: #f8f8f2;
  border-radius: 0.25rem;
  overflow-x: auto;
  font-size: 0.9rem;
}

.proseAbout pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

/* 行内代码 */
.proseAbout code {
  padding: 0.2rem 0.4rem;
  font-size: 0.9rem;
  color: #c678dd;
  background-color: #282c34;
  border-radius: 0.25rem;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

/* 分割线 */
.proseAbout hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #e0e6ed;
}

/* 表格 */
.proseAbout table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.proseAbout th {
  padding: 0.75rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 2px solid #e0e6ed;
}

.proseAbout td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e6ed;
}

.proseAbout tr:last-child td {
  border-bottom: none;
}

/* 图片 */
.proseAbout img {
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
}

/* --------------------------------------------------
  响应式调整 (可选)
----------------------------------------------------- */
@media (max-width: 768px) {
  .proseAbout {
    max-width: 95vw;
    padding: 1.5rem;
    margin: 1.5rem auto;
  }

  .proseAbout h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .proseAbout h2 {
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
  }

  .proseAbout h3 {
    font-size: 1.5rem;
  }
}
</style>
