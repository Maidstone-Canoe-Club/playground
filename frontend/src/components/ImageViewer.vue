<template>
  <div
    class="image-viewer"
    :class="{'image-viewer--open': open}">
    <div class="image-viewer__container">
      <img
        v-if="src"
        ref="image"
        class="image-viewer__image"
        :src="constrainedUrl"
        :alt="alt ?? 'Photo gallery image'"
        @load="loaded = true">
      <div
        v-if="!loaded"
        class="image-viewer__loading">
        <fa-icon icon="fa-solid fa-spinner" spin />
      </div>
    </div>
    <button
      class="image-viewer__close-button"
      @click="emits('close')">
      <fa-icon icon="fa-solid fa-xmark" />
    </button>
    <button
      v-show="showPrev"
      ref="prev"
      :disabled="!loaded"
      class="image-viewer__navigation image-viewer__navigation--left"
      @click.prevent="emits('prev')">
      <span class="image-viewer__navigation-icon">
        <fa-icon icon="fa-solid fa-angle-left" />
      </span>
    </button>
    <button
      v-show="showNext"
      ref="next"
      :disabled="!loaded"
      class="image-viewer__navigation image-viewer__navigation--right"
      @click.prevent="emits('next')">
      <span class="image-viewer__navigation-icon">
        <fa-icon icon="fa-solid fa-angle-right" />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke, onClickOutside, useSwipe } from "@vueuse/core";

const props = defineProps<{
  src?: string,
  alt?: string,
  open: boolean,
  showPrev: boolean,
  showNext: boolean
}>();

const emits = defineEmits(["close", "prev", "next"]);

onKeyStroke("Escape", (e) => {
  e.preventDefault();
  emits("close");
});

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

const constrainedUrl = computed(() => `${props.src}&width=${maxWidth}&height=${maxHeight}&fit=inside`);

watch(() => props.src, () => {
  loaded.value = false;
});

const loaded = ref(false);

const image = ref(null);
const next = ref(null);
const prev = ref(null);

const { isSwiping, direction } = useSwipe(image);

watch(isSwiping, () => {
  if (direction.value === "left") {
    emits("prev");
  } else if (direction.value === "right") {
    emits("next");
  }
});

onClickOutside(image, (e) => {
  emits("close");
}, {
  ignore: [next, prev]
});

</script>

<style lang="scss" scoped>
.image-viewer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000007d;
  backdrop-filter: blur(3px) brightness(75%);
  overflow: hidden;
  opacity: 0;
  transition: opacity .2s ease-out;
  pointer-events: none;

  &__loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    color: #fff;
    opacity: .7;
    z-index: 99;
  }

  &--open {
    opacity: 1;
    pointer-events: all;
  }

  &__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    //padding: 3rem;

    @media ( max-width: 767px ) {
      padding: 1rem;
    }
  }

  &__image {
    z-index: 100;
    display: block;
    object-fit: contain;
    max-height: 100%;
    max-width: 100%;
  }

  &__close-button {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
    padding: 1rem;
    margin: 0;
    width: 84px;
    height: 84px;
    color: #fff;
    background: transparent;
    border: none;
    border-radius: .5rem;
    transition: font-size .1s ease-out;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.53));
    z-index: 101;

    &:hover {
      cursor: pointer;
      font-size: 2.25rem;
    }
  }

  &__navigation {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 1rem;
    width: 162px;
    height: calc(100% - 168px);
    font-size: 2rem;
    color: #fff;
    background: transparent;
    border: none;
    border-radius: .5rem;
    filter: drop-shadow(0 0 5px #000);
    opacity: 0.7;
    z-index: 101;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: font-size .1s ease-out,
  opacity .1s ease-out;

    &-icon {
      background-color: transparent;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      transition: background-color .2s ease-out;
    }

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }

    @media ( max-width: 767px ) {
      padding: 1.5rem;

      .image-viewer__navigation-icon{
        background-color: rgba(0, 0, 0, 0.35);
      }

      &--left {
        justify-content: flex-start;
      }
      &--right {
        justify-content: flex-end;
      }
    }

    &:hover:not(:disabled) {
      cursor: pointer;
      font-size: 2.25rem;
      opacity: 1;

      .image-viewer__navigation-icon{
        background-color: rgba(0, 0, 0, 0.55);
      }
    }
  }
}
</style>
