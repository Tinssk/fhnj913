<template>
  <div class="wrap">
    <slot />
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.wrap {
  position: absolute;
  pointer-events: none;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  transform: scale(1);
}
</style>