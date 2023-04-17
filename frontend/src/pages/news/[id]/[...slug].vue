<template>
  <article
    v-if="item"
    class="container">
    <h1>{{ item.title }}</h1>
    <div v-html="item.content" />
  </article>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { NewsItem } from "~/types";

const { getItems } = useDirectusItems();
const route = useRoute();

const { data: items } = await useAsyncData("news-item", async () => {
  return await getItems<NewsItem[]>({
    collection: "news",
    params: {
      filter: {
        id: route.params.id
      }
    }
  });
});

const item: Ref<NewsItem | null> = ref(null);

if (items.value?.length) {
  item.value = items.value[0];
}

if (!item.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "News post not found"
  });
}

if (!route.params.slug && item.value.slug) {
  let redirect = route.path;
  if (!redirect.endsWith("/")) {
    redirect += "/";
  }

  redirect += item.value.slug;
  await navigateTo(redirect);
}

</script>
