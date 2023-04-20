<template>
  <button
    :class="buttonClass"
    :disabled="buttonDisabled"
    @click="onClick">
    <template v-if="loading">
      <fa-icon icon="fa-solid fa-spinner" spin />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  class?: string,
  disabled?: boolean,
  action: Function
}>();

const buttonDisabled = computed(() => {
  return props.disabled || loading.value;
});

const buttonClass = ref(props.class);

const loading = ref(false);

async function onClick () {
  loading.value = true;

  try {
    await props.action();
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>

</style>
