<template>
  <div class="container">
    <h1>Login Page</h1>

    <div class="login-container">
      <NuxtErrorBoundary>
        <login-form :redirect="redirect" />
        <template #error="{error}">
          <p>There was an error</p>
          <pre>{{ error }}</pre>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const redirect = route.query.redirect;

</script>

<style lang="scss" scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  border: 1px solid lightgray;
  border-radius: .5rem;
  padding: 1rem;
}
</style>
