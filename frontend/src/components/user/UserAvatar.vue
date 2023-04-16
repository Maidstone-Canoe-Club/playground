<template>
  <div
    class="user-avatar"
    :style="sizeStyle">
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      :style="sizeStyle"
      :alt="user.first_name + ' avatar'"
      class="user-avatar__image">
    <div
      v-else
      class="user-avatar__missing">
      ?
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirectusUser } from "nuxt-directus/dist/runtime/types";

const props = defineProps<{
  user: DirectusUser,
  size: number
}>();

const avatarUrl = ref(null);
if (props.user.avatar) {
  const directusUrl = useDirectusUrl();
  avatarUrl.value = `${directusUrl}/assets/${props.user.avatar}?width=${props.size}&height=${props.size}&fit=cover`;
}

const sizeStyle = reactive({
  width: props.size + "px",
  height: props.size + "px"
});

</script>

<style lang="scss" scoped>
.user-avatar {
  border-radius: 100%;
  overflow: hidden;

  &__image {
    object-fit: cover;
  }

  &__missing {
    background-color: lightgray;
    color: gray;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: 700;
  }
}
</style>
