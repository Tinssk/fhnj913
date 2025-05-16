<template>
  <div
    class="relative p-4 mb-4 rounded-lg bg-white border-l-4 border-green-500 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
    <div class="flex items-center mb-2">
      <div
        class="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="text-sm font-medium text-gray-500 group-hover:text-green-600 transition-colors duration-300">{{ time
      }}</div>
    </div>
    <div class="pl-12 text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">{{ content
    }}</div>
    <a v-if="Link" :href="Link" target="_blank" rel="noopener noreferrer"
      class="absolute right-0 bottom-1/2 top-1/2 inline-block transition-transform duration-200 ease-in-out transform hover:scale-105">
      <button
        class="catBtn px-6 py-2 rounded-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95 transition-all duration-200">
        点击进入
      </button>
    </a>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  time: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: false,
    default: null
  },
});
</script>
