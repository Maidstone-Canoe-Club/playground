<template>
  <div class="home">
    <div class="home__header-container">
      <img
        class="home__header-image"
        :src="heroImageUrl"
        :srcset="heroImageSrcSet"
        alt="Join us image">
      <div class="home__header-overlay">
        <h1 class="home__header-text">
          Join us
        </h1>
        <p>Words go here</p>
        <button class="btn btn-outline">
          Click here to do something
        </button>
      </div>
    </div>

    <div class="container">
      <p>foo</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const { getSingletonItem } = useDirectusItems();
const directusUrl = useDirectusUrl();

const { data: home } = await useAsyncData("home", () => {
  return getSingletonItem({ collection: "home" });
});

const heroImageUrl = ref(null);
const heroImageSrcSet = ref(null);

if (home.value.header_image) {
  heroImageUrl.value = directusUrl + "/assets/" + home.value.header_image + "?quality=80&format=webp";
  heroImageSrcSet.value = `${heroImageUrl.value}&width=1300 1300w, ${heroImageUrl.value}&width=600 600w`;
}

</script>

<style lang="scss" scoped>
.home {
  &__header {
    &-container {
      max-width: 1300px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      height: 400px;
    }

    &-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    &-overlay {
      background: linear-gradient(0deg, rgba(40, 34, 34, 0.53) 30%, #ffffff44 100%);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: #fff;

      @media ( max-width: 767px ) {
        padding: 3rem 1rem;
      }

      .btn {
        align-self: flex-start;
      }

      p {
        margin-top: 0;
      }
    }

    &-text {
      font-size: 4rem;
      margin: 0;

      //position: absolute;
      //top: 50%;
      //left: 3rem;
      //transform: translateY(-50%);
    }
  }

}
</style>
