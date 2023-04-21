<template>
  <button
    ref="button"
    :class="buttonClass"
    :style="{ 'width': width }"
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

const button = ref(null);
const width = ref(null);

onMounted(() => {
  width.value = `${button.value.clientWidth + 1}px`;
});

async function onClick () {
  loading.value = true;

  try {
    await props.action();
  } finally {
    loading.value = false;
  }
}

</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
