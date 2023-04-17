<template>
  <div class="default-layout">
    <page-header />
    <div class="default-layout__page">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>
<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  &__page {
    flex-grow: 1;
  }
}
</style>
