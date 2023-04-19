<template>
  <div class="container">
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
useHead({ title: "Login" });
const route = useRoute();

const redirect = route.query.redirect as string;

</script>

<style lang="scss" scoped>
.login-container {
  max-width: 350px;
  margin: 2rem auto;
  border: 1px solid lightgray;
  border-radius: .5rem;
  padding: 1rem;

  @media ( max-width: 767px ) {
    max-width: 100%;
    border: none;
  }
}
</style>
