<template>
  <client-only>
    <font-awesome-icon
      :icon="icon"
      :size="size"
      :spin="spin ?? false" />
  </client-only>
</template>

<script setup lang="ts">
defineProps<{
  icon: string | string[],
  size?: string,
  spin?: boolean
}>();
</script>
