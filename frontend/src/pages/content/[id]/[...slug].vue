<template>
  <div
    v-if="item"
    class="mx-auto max-w-3xl mt-8 px-3 sm:px-0">
    <h1
      v-if="item.title"
      class="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {{ item.title }}
    </h1>
    <div
      v-if="item.content"
      v-html="item.content" />
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
  return await getItemById<ContentItem>({
    collection: "content",
    id
  });
});

if (!item.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Content not found"
  });
}

// if (!route.params.slug && item.value.slug) {
//   let redirect = route.path;
//   if (!redirect.endsWith("/")) {
//     redirect += "/";
//   }
//
//   redirect += item.value.slug;
//   await navigateTo(redirect);
// }

await redirectToSlug(item.value);

</script>

<style scoped lang="scss">
//@tailwind base;
//
//::v-deep(p) {
//  //margin-bottom: 1rem;
//  @apply mt-6 text-xl leading-8 text-gray-700;
//}
//
//::v-deep(ul){
// @apply mt-8 space-y-8 text-gray-600;
//}
//
//::v-deep(li){
//  @apply mt-8 space-y-8 text-gray-600;
//}

</style>
