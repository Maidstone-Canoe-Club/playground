<template>
  <div class="image-viewer">
    <div class="image-viewer__container">
      <div
        ref="image"
        class="image-viewer__image-wrapper">
        <img
          class="image-viewer__image"
          :src="constrainedUrl"
          :alt="alt">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  src?: string,
  alt?: string
}>();

const emits = defineEmits(["close"]);

const maxWidth = ref(window.innerWidth);
const maxHeight = ref(window.innerHeight);

const constrainedUrl = computed(() => `${props.src}&width=${maxWidth.value}`);

const image = ref(null);

onClickOutside(image, (e) => {
  emits("close");
});

</script>

<style lang="scss" scoped>
.image-viewer{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000007d;
  backdrop-filter: blur(3px) brightness(75%);

  &__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
  }

  &__image-wrapper {
    //width: 100%;
    //height: 100%;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
