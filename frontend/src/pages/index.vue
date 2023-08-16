<template>
  <div class="home">
    <div class="home__header-container">
      <img
        class="home__header-image"
        :src="heroImageUrl"
        :srcset="heroImageSrcSet"
        alt="Join us image">
      <div
        class="home__header-overlay">
        <h1 class="mb-2 text-6xl font-bold text-white">
          Maidstone Canoe Club
        </h1>
        <p>
          Lorem ipsum dolor sit amet. Ut necessitatibus quia aut sapiente facilis et voluptatem quam et aperiam illum
          ab obcaecati aspernatur 33 quae quos hic voluptatem praesentium.
        </p>

        <div>
          <nuxt-link
            to="/join-us"
            class="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Join us
          </nuxt-link>
        </div>
      </div>
    </div>

    <section>
      <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="grid grid-cols-2 gap-4 mt-8">
          <img
            v-if="racingUrlA"
            class="w-full h-[200px] md:h-[350px] object-cover rounded-lg mt-4 lg:mt-10"
            :src="racingUrlA"
            alt="Racing">
          <img
            v-if="whiteWaterBUrl"
            class="w-full h-[200px] md:h-[350px] object-cover rounded-lg"
            :src="whiteWaterBUrl"
            alt="White water">
        </div>
        <div class="flex flex-col gap-4">
          <h2 class="mb-2 text-4xl font-bold text-gray-900">
            Paddleboarding
          </h2>
          <p>{{ whiteWaterContent }}</p>
          <div>
            <button
              class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="flex flex-col gap-4">
          <h2 class="mb-2 text-4xl font-bold text-gray-900">
            {{ whiteWaterHeading }}
          </h2>
          <p>{{ whiteWaterContent }}</p>
          <div>
            <button
              class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Learn more
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8">
          <img
            v-if="whiteWaterUrl"
            class="w-full h-[200px] md:h-[350px] object-cover rounded-lg"
            :src="whiteWaterUrl"
            alt="White water">
          <img
            v-if="whiteWaterBUrl"
            class="w-full h-[200px] md:h-[350px] object-cover rounded-lg mt-4 lg:mt-10"
            :src="whiteWaterBUrl"
            alt="White water">
        </div>
      </div>
    </section>

    <section>
      <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="flex flex-col gap-4">
          <h2 class="mb-2 text-4xl font-bold text-gray-900">
            Racing
          </h2>
          <p>{{ whiteWaterContent }}</p>
          <div>
            <button
              class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Learn more
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8 md:order-first">
          <img
            v-if="racingUrlA"
            class="w-full h-[200px] md:h-[350px] object-cover rounded-lg mt-4 lg:mt-10"
            :src="racingUrlA"
            alt="Racing">
          <img
            v-if="racingUrlB"
            class="w-full h-[200px] md:h-[350px] object-cover rounded-lg"
            :src="racingUrlB"
            alt="Racing">
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

const { getSingletonItem } = useDirectusItems();
const directusUrl = useDirectusUrl();

const { data: home } = await useAsyncData("home", () => {
  return getSingletonItem({ collection: "home" });
});

const heroImageUrl = ref<string | null>(null);
const heroImageSrcSet = ref<string | null>(null);

const whiteWaterUrl = ref<string | null>(generateImageUrl(home.value?.white_water_image));
const whiteWaterBUrl = ref<string | null>(generateImageUrl(home.value?.white_water_image_b));
const whiteWaterHeading = ref<string | null>(home.value.white_water_heading);
const whiteWaterContent = ref<string | null>(home.value.white_water_content);

const racingUrlA = ref<string | null>(generateImageUrl(home.value?.racing_image_a));
const racingUrlB = ref<string | null>(generateImageUrl(home.value?.racing_image_b));

if (home.value?.header_image) {
  heroImageUrl.value = directusUrl + "/assets/" + home.value.header_image + "?quality=80&format=webp";
  heroImageSrcSet.value = `${heroImageUrl.value}&width=1300 1300w, ${heroImageUrl.value}&width=600 600w`;
}

function generateImageUrl (url: string) {
  if (!url) {
    return null;
  }

  const fullUrl = `${directusUrl}/assets/${url}`;
  return buildQuery(fullUrl, {
    quality: 80,
    format: "webp",
    width: 600
  });
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

      @media (max-width: 767px) {
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
