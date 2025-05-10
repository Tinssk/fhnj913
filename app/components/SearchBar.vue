<template>
  <div class="w-full flex flex-col items-center">
    <div class="relative w-full max-w-3xl rounded-full overflow-hidden mb-4 shadow-lg">
      <div
        class="flex flex-wrap items-center gap-2 w-full py-2 pl-10 pr-4 text-gray-200 rounded-full bg-transparent border border-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-gray-900 transition-all duration-300">
        <div v-for="(tag, index) in selectedTags" :key="index"
          class="flex items-center bg-green-600/40 text-green-50 px-2 py-1 rounded-full text-sm">
          <span>{{ tag }}</span>
          <button @click="removeTag(index)" class="ml-1 hover:text-red-300 focus:outline-none">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <input v-model="searchQuery" type="text" :placeholder="selectedTags.length ? '' : placeholder"
          class="flex-1 min-w-[100px] bg-transparent focus:outline-none" @keyup.enter="handleSearch" />
      </div>
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>

    <div class="w-full max-w-3xl flex flex-row overflow-x-auto space-x-2 pb-2 scrollbar-hide">
      <button v-for="(tag, index) in tags" :key="index" @click="selectTag(tag)"
        class="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full bg-green-600/40 text-green-50 hover:bg-green-600/90 transform hover:scale-105 transition-all duration-200 ">
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  placeholder: {
    type: String,
    default: "搜索免费图片、视频、音乐等内容",
  },
});

const searchQuery = ref("");
const tags = ref(["蝴蝶头", "狐狸头", "天狐", "三代设", "兔子头", "动漫瑶", "电视剧瑶"]);
const selectedTags = ref([]);

const handleSearch = () => {
  const searchTerms = [...selectedTags.value, searchQuery.value.trim()].filter(Boolean);
  if (searchTerms.length) {
    console.log("搜索:", searchTerms.join(" "));
  }
};

const selectTag = (tag) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag);
    searchQuery.value = "";
  }
};

const removeTag = (index) => {
  selectedTags.value.splice(index, 1);
};
</script>

<style scoped>
/* 保持 scoped 样式为空或只包含与 Tailwind 无关的覆盖 */
</style>
