<template>
  <h1>news</h1>
</template>

<script setup>
definePageMeta({
  middleware: [
    "auth",
    "permission"
  ]
});
</script>
