<template>
  <div class="galleries-page">
    <div class="container ">
      <div>
        <h1>Photo Gallery</h1>
        <nuxt-link
          to="/galleries/new"
          class="btn btn-primary">
          New Gallery
        </nuxt-link>
      </div>
      <div>
        <ul
          v-if="galleries"
          class="galleries-page__galleries">
          <li
            v-for="(gallery, index) in galleries"
            :key="index">
            <nuxt-link
              :to="'/galleries/' + gallery.id"
              class="galleries-page__gallery-link">
              <gallery-icon />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useDirectusFolders } from "~/composables/useDirectusFolders";

const { getItems, getSingletonItem } = useDirectusItems();
const { getFolders } = useDirectusFolders();

const directusUrl = useDirectusUrl();
const url = directusUrl + "/folders";

const { data: gallery } = await useAsyncData("gallery", () => {
  return getSingletonItem({ collection: "gallery" });
});

const galleryFolderId = gallery.value.gallery_folder;

const { data: galleries } = await useAsyncData("gallery-folders", () => {
  return getFolders({
    params: {
      filter: {
        parent: {
          _eq: galleryFolderId
        }
      }
    }
  });
});

</script>

<style lang="scss" scoped>
.galleries-page {

  &__galleries {
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__gallery-link {
    text-decoration: none;
    color: inherit;
  }
}
</style>
