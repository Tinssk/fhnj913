<template>
  <div>
    <div class="w-1/5 p-4 bg-emerald-100 text-black rounded-xl shadow-md">
      <div
        class="sticky top-25 h-screen p-4 max-h-[80vh] overflow-y-auto rounded-md scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <ul>
          <li v-for="(section, index) in sections" :key="index" class="py-2">
            <div class="flex items-center justify-between">
              <a :href="'#' + section.id" :id="'link-' + section.id"
                class="hover:text-blue-500 transition-colors py-1 px-2 block rounded-md text-lg flex-grow" :class="{
                  'bg-emerald-800 text-white ': isActive(section.id),
                  'bg-emerald-800 text-white': section.children?.some((child) => isActive(child.id)),
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
                  :class="{ 'bg-emerald-600 text-white': isActive(child.id) }"
                  @click.prevent="scrollToSection(child.id)">
                  {{ child.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
defineProps({
  sections: {
    required: true,
    default: [],
  },
})
// 当前激活的目录 id
const currentId = ref("");
// 添加折叠状态数组
const collapsedSections = ref(Array(sections.value.length).fill(false));

// 切换折叠状态的方法
const toggleSection = (index) => {
  collapsedSections.value[index] = !collapsedSections.value[index];
};

//初始高亮第一个目录标题
if (sections.value.length > 0) {
  currentId.value = sections.value[0].id;
}
onMounted(() => {
  window.addEventListener("scroll", onScroll);
  // 如果初始有 hash，滚动到位置
  if (route.hash) {
    const id = route.hash.replace("#", "");
    setTimeout(() => {
      scrollToSection(id);
    }, 100); // 延迟一点，等页面渲染完
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
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
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
    //同时也罢目录滚动到顶部
    const directoryContainer = document.querySelector(".sticky"); // 获取目录容器
    if (directoryContainer) {
      directoryContainer.scrollTop = 0; // 将目录滚动到顶部
    }
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
</script>

<style></style>