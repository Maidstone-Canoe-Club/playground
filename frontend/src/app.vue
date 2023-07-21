<template>
  <nuxt-layout>
    <nuxt-loading-indicator
      color="var(--color-primary-500)" />
    <nuxt-page />
  </nuxt-layout>
</template>
<script setup>
useHead({
  htmlAttrs: {
    class: "h-full"
  },
  bodyAttrs: {
    class: "h-full"
  }
});
</script>
