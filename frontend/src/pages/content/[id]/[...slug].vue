<template>
  <div
    v-if="item"
    class="mx-auto max-w-3xl mt-8 px-3 sm:px-0">
    <h1
      v-if="item.title"
      class="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {{ item.title }}
    </h1>
    <rich-text :content="item.content" />
  </div>
</template>

<script setup lang="ts">
import { redirectToSlug } from "~/utils/redirects";

const { getItemById } = useDirectusItems();
const route = useRoute();

export type ContentItem = {
  title?: string
  content?: string
}

const id: string = route.params.id as string;

if (!id) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found"
  });
}

const { data: item } = await useAsyncData(`content-${id}`, async () => {
  try {
    return await getItemById<ContentItem>({
      collection: "content",
      id
    });
  } catch (e) {
    console.log("error loading content", e);
  }
});

if (!item.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Content not found"
  });
}

await redirectToSlug(item.value);

</script>
