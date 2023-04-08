<template>
  <div>
    <div>
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

<script setup>
const user = useDirectusUser();
const { logout } = useDirectusAuth();

const onLogout = async () => {
  await logout();
};

</script>
