<template>
  <div class="profile">
    <div
      v-if="avatarUrl"
      class="profile__avatar-container">
      <img
        class="profile__avatar-image"
        :src="avatarUrl + '?height=150'"
        :alt="user.first_name + ' avatar'">
    </div>
    <h1>Hi, {{ user.first_name }}</h1>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
});

const user = useDirectusUser();

const avatarUrl = ref(null);
if (user.value.avatar) {
  const directusUrl = useDirectusUrl();
  avatarUrl.value = directusUrl + "/assets/" + user.value.avatar;
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
