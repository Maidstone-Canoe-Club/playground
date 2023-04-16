<template>
  <div
    class="user-dropdown"
    :class="{'user-dropdown--open': open}">
    <div class="user-dropdown__top">
      <user-avatar
        :user="user"
        :size="50" />
      <div class="user-dropdown__info">
        <strong class="user-dropdown__info-name">{{ fullName }}</strong>
        <span class="user-dropdown__info-email">{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirectusUser } from "nuxt-directus/dist/runtime/types";

const props = defineProps<{
  user: DirectusUser
}>();

const avatarUrl = ref(null);
if (props.user.avatar) {
  const directusUrl = useDirectusUrl();
  avatarUrl.value = directusUrl + "/assets/" + props.user.avatar;
}

const fullName = ref(props.user.first_name + " " + props.user.last_name);

const open = ref(false);
</script>

<style lang="scss" scoped>
.user-dropdown {
  box-shadow: 0 3px 6px -1px lightgray;
  border-radius: .5rem;
  position: relative;
  padding: .5rem;
  overflow: hidden;

  &--open {
    height: auto;
  }

  &__top {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: .5rem;
  }

  &:hover {
    cursor: pointer;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-email {
      color: gray;
    }
  }

  &__caret {
    margin: 0 1rem;
  }

  &__items {
  }
}
</style>
