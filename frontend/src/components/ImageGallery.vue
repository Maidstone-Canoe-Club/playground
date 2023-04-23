<template>
  <div class="image-gallery">
    <div class="container">
      <h1>{{ name }}</h1>
      <small>By {{ author }}</small>
      <masonry-wall
        v-slot="{item, index}"
        :items="images"
        :column-width="400"
        :gap="16">
        <nuxt-img
          class="image-gallery__item"
          :src="item.thumbnailUrl"
          :alt="item.altText"
          @click="selectedIndex = index" />
      </masonry-wall>
    </div>
    <client-only>
      <image-viewer
        :open="!!selectedImage"
        :src="selectedImage?.fullUrl"
        :alt="selectedImage?.altText"
        :show-prev="showPrev"
        :show-next="showNext"
        @prev="selectPrevImage"
        @next="selectNextImage"
        @close="selectedIndex = null" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";
import { GalleryImage } from "~/types";

const props = defineProps<{
  name: string,
  author: string,
  images: GalleryImage[]
}>();

const selectedIndex = ref<number | null>(null);

onKeyStroke("ArrowRight", (e) => {
  e.preventDefault();
  selectNextImage();
});

onKeyStroke("ArrowLeft", (e) => {
  e.preventDefault();
  selectPrevImage();
});

const selectedImage = computed(() => {
  return selectedIndex.value !== null ? props.images[selectedIndex.value] : null;
});

const showPrev = computed(() => {
  return selectedIndex.value !== null ? selectedIndex.value > 0 : false;
});

const showNext = computed(() => {
  return selectedIndex.value !== null ? selectedIndex.value < props.images.length - 1 : false;
});

function selectPrevImage () {
  if (selectedIndex.value !== null && selectedIndex.value > 0) {
    selectedIndex.value -= 1;
  }
}

function selectNextImage () {
  if (selectedIndex.value !== null && selectedIndex.value < props.images.length - 1) {
    selectedIndex.value += 1;
  }
}

</script>

<style lang="scss" scoped>
.image-gallery {
  &__item {
    width: 100%;
    height: 100%;
    border-radius: .5rem;
    transition: filter .2s ease-out;

    &:hover {
      filter: brightness(115%) saturate(105%);
      cursor: pointer;
    }
  }
}
</style>
