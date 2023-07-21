<template>
  <div class="container login-page container--md">
    <NuxtErrorBoundary>
      <h1>Login</h1>
      <login-form :redirect="redirect" />
      <template #error="{error}">
        <p>There was an error</p>
        <pre>{{ error }}</pre>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup lang="ts">
useHead({ title: "Login" });
const route = useRoute();

const redirect = route.query.redirect as string;

</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  h1 {
    margin-bottom: .5rem;
  }
}

.login-form {
  width: 100%;
}
</style>
