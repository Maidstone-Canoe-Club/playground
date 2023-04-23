<template>
  <div class="photo-gallery">
    <image-gallery
      v-if="images"
      :name="gallery.name"
      :author="author"
      :images="images" />
  </div>
</template>

<script setup lang="ts">
import { GalleryImage, PhotoGallery } from "~/types";
import { useDirectusFiles, useDirectusItems } from "#imports";

const route = useRoute();
const id = route.params.id;

const { getFiles } = useDirectusFiles();
const { getItems } = useDirectusItems();

const data = await useAsyncData(`gallery${id}`, () => {
  return getItems<PhotoGallery>({
    collection: "photo_gallery",
    params: {
      fields: [
        "*,user_created.first_name,user_created.last_name"
      ],
      filter: {
        id
      }

    }
  });
});

const gallery: PhotoGallery = data.data.value[0];
const author = `${gallery.user_created?.first_name} ${gallery.user_created?.last_name}`;

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
