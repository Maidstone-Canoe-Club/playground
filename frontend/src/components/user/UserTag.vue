<template>
  <div
    class="user-link">
    <user-avatar
      :user="user"
      :size="25" />
    <span class="user-link__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { DirectusUser } from "nuxt-directus/dist/runtime/types";

const props = defineProps<{
  user: DirectusUser,
}>();
const label = computed(() => `${props.user.first_name} ${props.user.last_name}`);
</script>

<style scoped lang="scss">
.user-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;

  &__label {
    font-weight: 700;
  }
}
</style>
