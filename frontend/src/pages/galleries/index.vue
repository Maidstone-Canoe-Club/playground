<template>
  <div class="container">
    <h1>Photo Gallery</h1>
    <nuxt-link
      to="/gallery/new"
      class="btn btn-primary">
      New Gallery
    </nuxt-link>

    <ul>
      <li
        v-for="(gallery, index) in galleries.data"
        :key="index">
        <nuxt-link :to="'/galleries/' + gallery.id">
          {{ gallery.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const { getItems } = useDirectusItems();

const directusUrl = useDirectusUrl();
const url = directusUrl + "/folders";

const { data: galleries } = await useAsyncData("galleries", () => {
  return $fetch(url);
});

</script>

<style lang="scss" scoped>

</style>
