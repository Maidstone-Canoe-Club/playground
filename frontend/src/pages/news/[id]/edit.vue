<template>
  <div class="container">
    <input-field
      id="title"
      v-model="item.title"
      type="text"
      label="Title" />
    <custom-editor v-model="item.content" />
    <button
      class="btn btn-primary"
      :disabled="saving"
      @click="onSave">
      {{ !item.id ? 'Create' : 'Save' }}
    </button>
    <pre v-if="saving">Saving...</pre>
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

const saving = ref(false);

async function onSave () {
  saving.value = true;
  try {
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
  } finally {
    saving.value = false;
  }
}

</script>
