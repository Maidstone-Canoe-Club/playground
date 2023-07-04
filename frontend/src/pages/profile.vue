<template>
  <div
    v-if="user"
    class="profile container">
    <user-avatar
      :user="user"
      :size="150" />
    <h1>Hi, {{ user.first_name }}</h1>
    <!--    <pre>{{ user }}</pre>-->
    <div class="profile__wrapper">
      <div class="profile__sidebar">
        <ul class="profile__sidebar-menu">
          <li
            v-for="(item, index) in menuItems"
            :key="index">
            <a :href="item.url">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
      <profile-details v-model="user" />
    </div>
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

const menuItems = [
  {
    url: "#details",
    label: "My details"
  },
  {
    url: "#password",
    label: "Change password"
  }
];

</script>

<style lang="scss" scoped>
$avatar-size: 150px;

.profile {

  &__wrapper {
    display: flex;
  }

  &__sidebar {
    flex-basis: 250px;

    &-menu {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }

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
