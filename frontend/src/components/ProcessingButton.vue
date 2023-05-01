<template>
  <button
    ref="button"
    :class="buttonClass"
    :style="{ 'width': width }"
    :disabled="buttonDisabled"
    class="processing-button"
    @click="onClick">
    <slot />
    <div
      class="processing-button__loader"
      :class="{'processing-button__loader--visible': loading}">
      <loading-spinner />
    </div>
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
.processing-button {
  position: relative;

  &__loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity .1s ease-out;

    &--visible {
      opacity: 1;

      &:hover {
        cursor: inherit;
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
