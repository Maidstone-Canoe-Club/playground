<template>
  <div>
    <p>profile</p>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
});

const user = useDirectusUser();
</script>
