<template>
  <div class="container">
    <h1>news</h1>
    <ul>
      <ul
        v-for="(item, index) in items"
        :key="index">
        <nuxt-link :to="'/news/' + item.id">
          {{ item.title }}
        </nuxt-link>
      </ul>
    </ul>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: [
    "auth",
    "permission"
  ]
});

const { getItems } = useDirectusItems();

const { data: items } = await useAsyncData("news", () => {
  return getItems({ collection: "news" });
});

</script>
