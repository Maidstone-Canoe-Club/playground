<template>
  <div>
    <page-header />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";

const route = useRoute();
let user;
try {
  user = useDirectusUser();
} catch (err) {
  console.log("Error loading user", err);
}
const { logout } = useDirectusAuth();

const appStore = useAppStore();

const loginUrl = "/login?redirect=" + route.fullPath;

const onLogout = async () => {
  const res = await logout();
  appStore.accessTokenExpiry = 0;
};

</script>
