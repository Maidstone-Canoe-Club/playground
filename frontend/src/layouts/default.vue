<template>
  <div>
    <div>
      <nuxt-link to="/">
        Home
      </nuxt-link>
      <nuxt-link to="/news">
        News
      </nuxt-link>
      <div v-if="user">
        <nuxt-link to="/profile">
          Profile
        </nuxt-link>
        <button @click="onLogout">
          Logout
        </button>
      </div>
      <div v-else>
        <nuxt-link :to="loginUrl">
          Login
        </nuxt-link>
      </div>
    </div>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";

const route = useRoute();
const user = useDirectusUser();
const { logout } = useDirectusAuth();

const appStore = useAppStore();

const loginUrl = "/login?redirect=" + route.fullPath;

const onLogout = async () => {
  const res = await logout();
  appStore.accessTokenExpiry = 0;
};

</script>
