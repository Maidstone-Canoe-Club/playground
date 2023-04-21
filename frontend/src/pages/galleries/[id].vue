<template>
  <div class="container photo-gallery">
    <div class="container">
      <h1>A Gallery!</h1>
      <masonry-wall
        v-slot="{ item }"
        :items="imageUrls"
        :column-width="400"
        :gap="16">
        <nuxt-img
          class="photo-gallery__image"
          :placeholder="true"
          :src="item.url"
          :alt="item.altText"
          @click="selectedImage = item" />
      </masonry-wall>
    </div>
    <client-only>
      <image-viewer
        :class="{'image-viewer--open': !!selectedImage}"
        :src="selectedImage?.fullUrl"
        :alt="selectedImage?.altText"
        @close="selectedImage = null" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useDirectusFiles } from "#imports";

const route = useRoute();
const id = route.params.id;

const selectedImage = ref(null);

const { getFiles } = useDirectusFiles();

const { data: files } = await useAsyncData("files-" + id, () => {
  return getFiles({
    params: {

      filter: {
        folder: id
      }
    }
  });
});

const directusUrl = useDirectusUrl();

const imageUrls = computed(() => {
  const result = [];

  files.value?.forEach((f) => {
    result.push({
      fullUrl: directusUrl + "/assets/" + f.id + "?format=webp&quality=80",
      url: directusUrl + "/assets/" + f.id + "?width=500&format=webp&quality=80",
      altText: f.title
    });
  });

  return result;
});

</script>

<style lang="scss" scoped>
.photo-gallery {
  .container {
    padding: 0 1rem;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: .5rem;
    transition: transform .2s ease-out;

    &:hover {
      cursor: pointer;
      transform: scale(103%);
    }
  }

  ::v-deep(.image-viewer){
    opacity: 0;
    pointer-events: none;
    transition: opacity .2s ease-out;
  }

  ::v-deep(.image-viewer--open){
    opacity: 1;
    pointer-events: all;
  }
}
</style>
