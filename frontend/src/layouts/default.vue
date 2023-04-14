<template>
  <div>
    <div>
      <nuxt-link to="/">
        Home
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
        <nuxt-link to="/login">
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

const user = useDirectusUser();
const { logout } = useDirectusAuth();

const appStore = useAppStore();

const onLogout = async () => {
  const res = await logout();
  appStore.accessTokenExpiry = 0;
};

</script>
