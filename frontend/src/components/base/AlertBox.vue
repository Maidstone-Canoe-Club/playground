<template>
  <div
    class="alert-box"
    :class="'alert-box--' + variant">
    <div class="alert-box__content">
      <div
        v-if="icon"
        class="alert-box__icon">
        <fa-icon :icon="icon" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: string,
  icon?: string
}>(), {
  variant: "info",
  icon: null
});
</script>

<style scoped lang="scss">
.alert-box {
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: .5rem;

  &__content {
    display: flex;
    flex-direction: row;
    gap: .5rem;

  }

  &--warning {
    color: var(--color-warning-800);
    background-color: var(--color-warning-200);
    border-color: var(--color-warning-500);
  }
}
</style>
