<template>
  <div class="flex">
    <!-- 文章目录 -->
    <div class="w-1/5 p-4 bg-emerald-100 text-black rounded-xl shadow-md">
      <div
        class="sticky top-25 h-screen p-4 max-h-[80vh] overflow-y-auto rounded-md scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <ul>
          <li v-for="(section, index) in sections" :key="index" class="py-2">
            <div class="flex items-center justify-between">
              <a :href="'#' + section.id" :id="'link-' + section.id"
                class="hover:text-blue-500 transition-colors py-1 px-2 block rounded-md text-lg flex-grow" :class="{
                  'bg-emerald-800 text-white ': isActive(section.id),
                  'bg-emerald-800 text-white': section.children.some((child) => isActive(child.id)),
                }" @click.prevent="scrollToSection(section.id)">
                {{ section.text }}
              </a>
              <!-- 修改折叠按钮样式 -->
              <button v-if="section.children && section.children.length" @click="toggleSection(index)"
                class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ml-2">
                <span class="inline-block transition-transform duration-300"
                  :class="{ '-rotate-180': collapsedSections[index] }"> ▼ </span>
              </button>
            </div>

            <!-- 子目录 -->
            <ul v-if="section.children && section.children.length"
              class="pl-4 mt-2 transition-all duration-300 origin-top" :class="{
                'h-0 opacity-0 scale-y-0': collapsedSections[index],
                'h-auto opacity-100 scale-y-100': !collapsedSections[index],
              }">
              <li v-for="(child, childIndex) in section.children" :key="childIndex" class="py-1">
                <a :href="'#' + child.id" :id="'link-' + child.id"
                  class="text-sm hover:text-blue-500 transition-colors py-1 px-2 block rounded-md"
                  :class="{ 'bg-emerald-800 text-white': isActive(child.id) }"
                  @click.prevent="scrollToSection(child.id)">
                  {{ child.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="w-4/5 p-4">
      <ContentRenderer v-if="page" :value="page"
        class="prose prose-lg text-black max-w-none prose-headings:scroll-mt-16 prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl prose-img:shadow-lg prose-table:border-collapse" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  banner: "/img/header/index-header.jpg",
  title: "碧瑶角色介绍",
  wrapperHeight: "h-120",
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
// 提取页面中的标题作为目录
const sections = ref([]);

onMounted(() => {
  // 等待DOM渲染完成后提取标题
  nextTick(() => {
    // 只获取3-4级标题，忽略1-2级标题
    const headings = document.querySelectorAll("h3, h4");
    const extractedSections = [];
    let currentH3 = null;

    headings.forEach((heading) => {
      const id =
        heading.id ||
        heading.textContent
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");

      // 确保标题有ID以便锚点定位
      if (!heading.id) {
        heading.id = id;
      }

      const section = {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.substring(1)),
        children: [],
      };

      // 处理标题层级关系
      if (section.level === 3) {
        // 三级标题作为主目录项
        currentH3 = section;
        extractedSections.push(section);
      } else if (section.level === 4 && currentH3) {
        // 四级标题作为三级标题的子项
        currentH3.children.push(section);
      } else if (section.level === 4) {
        // 如果没有前置的三级标题，则直接添加到顶层
        extractedSections.push(section);
      }
    });

    sections.value = extractedSections;
    // **设置默认高亮第一个目录项**
    if (sections.value.length > 0) {
      currentId.value = sections.value[0].id;
    }
  });

  window.addEventListener("scroll", onScroll);

  // 如果初始有 hash，滚动到位置
  if (route.hash) {
    const id = route.hash.replace("#", "");
    setTimeout(() => {
      scrollToSection(id);
    }, 100); // 延迟一点，等页面渲染完
  }
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
// 添加折叠状态数组
const collapsedSections = ref(Array(sections.value.length).fill(false));

// 切换折叠状态的方法
const toggleSection = (index) => {
  collapsedSections.value[index] = !collapsedSections.value[index];
};
// 当前激活的目录 id
const currentId = ref("");

// 判断高亮
function isActive(id) {
  // 找到当前激活的 section
  return currentId.value === id;
}

// 点击目录滚动
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    const headerOffset = 80; // 根据你的实际页头高度调整
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    history.replaceState(null, "", `#${id}`);
    currentId.value = id;
  }
}

// 监听滚动，实时切换高亮
function onScroll() {
  const scrollTop = window.scrollY;
  const headerOffset = 90; // 页头高度偏移
  const translateOffset = 48; // -translate-y-12 对应的像素值 (12 * 4 = 48px)
  const allSections = document.querySelectorAll("h3, h4"); // 根据你的需要选择标题级别

  let current = "";
  for (let i = 0; i < allSections.length; i++) {
    const section = allSections[i];
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY - translateOffset;
    if (scrollTop + headerOffset >= top) {
      current = section.id;
    } else {
      break;
    }
  }

  // 页面最上方，强制高亮第一个目录
  if (!current && sections.value.length > 0) {
    current = sections.value[0].id;
  }
  // 检查是否滚动到页面底部
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    // 滚动到距离底部 10px 时
    // 获取最后一个目录项 ID
    current = allSections[allSections.length - 1].id;
  }

  currentId.value = current;
}

watchEffect(() => {
  if (currentId.value) {
    // 找到当前高亮的目录链接
    const activeLink = document.getElementById(`link-${currentId.value}`);
    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: "smooth", // 平滑滚动
        block: "nearest", // 只滚动到刚好能看到
        inline: "nearest",
      });
    }
  }
});

useSeoMeta(page.value?.seo || {});
</script>
<style>
/* Markdown内容样式 */
.prose h1 {
  font-size: 2rem;
}

.prose h3 {
  border-left: 8px solid #21bb6b;
  padding-left: 1rem;
  color: #2563eb;
  margin-top: 1.5rem;
  font-size: 1.5rem;
}

.prose h4 {
  color: #4b5563;
  margin-top: 1.25rem;
  font-size: 1.25rem;
}

.prose p {
  text-indent: 2em;
  /* 首行缩进两个中文字符宽度 */
  margin-bottom: 1rem;
  line-height: 1.8;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.9em;
}

.prose pre {
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  margin: 1.5rem 0;
  color: #6b7280;
}

.prose blockquote p {
  text-indent: 0;
  /* 引用块取消首行缩进 */
}

.prose img {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose th,
.prose td {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: left;
}

.prose th {
  background-color: #f9fafb;
}

/* 暗黑模式样式 */
.dark .prose code {
  background-color: #374151;
  color: #e5e7eb;
}

.dark .prose blockquote {
  border-left-color: #4b5563;
  color: #9ca3af;
}

.dark .prose th {
  background-color: #1f2937;
}
</style>
