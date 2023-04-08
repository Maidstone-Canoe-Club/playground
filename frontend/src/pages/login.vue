<template>
  <div>
    <h1>Login Page</h1>

    <NuxtErrorBoundary>
      <login-form />
      <template #error="{error}">
        <p>There was an error</p>
        <pre>{{ error }}</pre>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
