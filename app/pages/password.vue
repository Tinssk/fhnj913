<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 text-center p-4">
    <div class="bg-white p-8 rounded-xl shadow max-w-md w-full">
      <h2 class="text-black text-xl font-bold mb-4">访问验证</h2>

      <!-- 验证成功提示 -->
      <div v-if="success" class="mb-4">
        <div class="flex justify-center mb-2">
          <!-- 加载动画 -->
          <svg class="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
        <p class="text-green-500 font-medium">密码验证成功，正在跳转...</p>
      </div>

      <!-- 验证表单 -->
      <div v-if="!success">
        <input v-model="input" type="password" placeholder="请输入访问密码"
          class="texto text-black border p-2 w-full rounded mb-4" @keyup.enter="checkPassword" />
        <button @click="checkPassword" :disabled="loading"
          class="catBtn bg-blue-500 text-white px-4 py-2 rounded w-full flex justify-center items-center">
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ loading ? "验证中..." : "验证" }}
        </button>
        <p v-if="error" class="text-red-500 mt-4">密码错误</p>
        <p v-if="inputNull" class="text-red-500 mt-4">密码不能为空</p>
      </div>
    </div>
  </div>
</template>

<script setup>
//取消掉基础布局
definePageMeta({
  layout: false,
});

const input = ref("");
const error = ref(false);
const loading = ref(false); // 添加加载状态
const success = ref(false); // 添加成功状态
const inputNull = ref(false);

async function checkPassword() {
  if (loading.value) return; // 防止重复提交
  error.value = false;
  inputNull.value = false;
  if (!input.value.trim()) {
    inputNull.value = true;
    return;
  }
  loading.value = true; // 开始加载

  try {
    const { data } = await useFetch("/api/auth/devTestVerify", {
      method: "POST",
      body: { password: input.value },
    });

    if (data.value?.success) {
      success.value = true; // 设置成功状态
      setTimeout(() => {
        window.location.href = "/"; // 延迟跳转，让用户看到成功提示
      }, 1500);
    } else {
      error.value = true;
      loading.value = false; // 结束加载
    }
  } catch (e) {
    error.value = true;
    loading.value = false; // 结束加载
  }
}
</script>
