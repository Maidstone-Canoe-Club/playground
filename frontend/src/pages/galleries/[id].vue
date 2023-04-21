<template>
  <div class="photo-gallery">
    <image-gallery
      v-if="images"
      :name="gallery.name"
      :images="images" />
  </div>
</template>

<script setup lang="ts">
import { GalleryImage } from "~/types";
import { useDirectusFiles, useDirectusItems } from "#imports";

const route = useRoute();
const id = route.params.id;

const { getFiles } = useDirectusFiles();
const { getItems } = useDirectusItems();

const data = await useAsyncData("galleries", () => {
  return getItems({
    collection: "photo_gallery",
    params: {
      filter: {
        id
      }
    }
  });
});

const gallery = data.data.value[0];

const { data: files } = await useAsyncData("files-" + id, () => {
  return getFiles({
    params: {
      filter: {
        folder: gallery.gallery_folder
      }
    }
  });
});

const directusUrl = useDirectusUrl();

const images = computed(() => {
  const result: GalleryImage[] = [];

  files.value?.forEach((f) => {
    result.push({
      fullUrl: directusUrl + "/assets/" + f.id + "?format=webp&quality=80",
      thumbnailUrl: directusUrl + "/assets/" + f.id + "?width=500&format=webp&quality=80",
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

}
</style>
