<template>
  <client-only>
    <font-awesome-icon
      class="icon"
      :icon="icon"
      :size="size"
      :spin="spin ?? false"
      :rotation="rotation" />
  </client-only>
</template>

<script setup lang="ts">
defineProps<{
  icon: string | string[],
  size?: string,
  spin?: boolean
  rotation?: string
}>();
</script>

<style lang="scss" scoped>
.icon {
  transition: transform .1s ease-out;
}
</style>
