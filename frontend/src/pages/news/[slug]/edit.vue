<template>
  <div>
    <input-field
      id="title"
      v-model="item.title"
      type="text"
      label="Title" />
    <custom-editor v-model="item.content" />
    <button
      class="btn"
      @click="onSave">
      {{ !item.id ? 'Create' : 'Save' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { NewsItem } from "~/types";

const { getItems, createItems, updateItem } = useDirectusItems();
const route = useRoute();

let item: NewsItem = reactive<NewsItem>({
  id: undefined,
  title: "",
  content: ""
});

const { data: items } = await useAsyncData("news-item", async () => {
  return await getItems<NewsItem[]>({
    collection: "news",
    params: {
      filter: {
        id: route.params.slug
      }
    }
  });
});

if (items.value?.length) {
  item = items.value[0];
}

async function onSave () {
  if (item.id) {
    await updateItem<NewsItem>({
      collection: "news",
      id: String(item.id),
      item
    });
  } else {
    await createItems<NewsItem>({
      collection: "news",
      items: [item]
    });
  }
}

</script>
