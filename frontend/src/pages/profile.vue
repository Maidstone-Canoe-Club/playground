<template>
  <div
    v-if="user"
    class="profile container">
    <user-avatar
      :user="user"
      :size="150" />
    <h1>Hi, {{ user.first_name }}</h1>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup lang="ts">
import { DirectusUser } from "nuxt-directus/dist/runtime/types";
import { Ref } from "vue";

definePageMeta({
  middleware: ["auth"]
});

let user: Ref<DirectusUser> = ref(null);

try {
  user = await useDirectusUser();
} catch (err) {
  console.log("error loading user on profile", err);
}

</script>

<style lang="scss" scoped>
$avatar-size: 150px;

.profile {
  &__avatar {
    &-container {
      overflow: hidden;
      border-radius: 100%;
      width: $avatar-size;
      height: $avatar-size;
    }

    &-image {
      width: $avatar-size;
      height: $avatar-size;
      object-fit: cover;
    }
  }
}
</style>
