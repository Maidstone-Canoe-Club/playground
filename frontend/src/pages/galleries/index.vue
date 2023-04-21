<template>
  <div class="galleries-page">
    <div class="container ">
      <div class="galleries-page__content">
        <div class="galleries-page__header">
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
                <gallery-icon
                  :name="gallery.name"
                  :date="gallery.date_created"
                  :folder-id="gallery.gallery_folder" />
              </nuxt-link>
            </li>
          </ul>
        </div>
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

const { data: galleries } = await useAsyncData("galleries", () => {
  return getItems({
    collection: "photo_gallery",
    params: {
      sort: "-date_created"
    }
  });
});

</script>

<style lang="scss" scoped>
.galleries-page {

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
