<template>
  <div>
    <h1>Login Page</h1>

    <NuxtErrorBoundary>
      <login-form :redirect="redirect" />
      <template #error="{error}">
        <p>There was an error</p>
        <pre>{{ error }}</pre>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const redirect = route.query.redirect;

</script>
