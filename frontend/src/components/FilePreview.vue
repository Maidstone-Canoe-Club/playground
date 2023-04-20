<template>
  <component
    :is="tag ?? 'li'"
    class="file-preview">
    <div
      v-if="!file.status"
      class="file-preview__remove-container">
      <button
        class="btn file-preview__remove"
        aria-label="Remove"
        @click="onRemove">
        <fa-icon icon="fa-solid fa-trash-can" />
        Remove
      </button>
    </div>
    <div
      class="file-preview__gradient"
      :class="{'file-preview__gradient--show': !!file.status}" />
    <img
      :src="file.url"
      :alt="file.file.name"
      :title="file.file.name"
      @load="onLoaded">
    <span
      v-show="file.status === 'loading'"
      class="file-preview__status file-preview__status--spin">
      <fa-icon icon="fa-solid fa-spinner" spin />
    </span>
    <span
      v-show="file.status === 'ok'"
      class="file-preview__status">
      <fa-icon icon="fa-solid fa-check" />
    </span>
    <span
      v-show="file.status === 'error'"
      class="file-preview__status file-preview__status--error">
      <fa-icon icon="fa-solid fa-circle-exclamation" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { UploadableFile } from "~/composables/useFileManager";

const emit = defineEmits(["remove", "load"]);

const props = defineProps<{
  file: UploadableFile,
  tag?: string
}>();

function onLoaded () {
  emit("load", props.file.id);
}

function onRemove () {
  emit("remove", props.file);
}

</script>

<style lang="scss" scoped>

.file-preview {
  position: relative;
  //height: 200px;
  //flex-grow: 1;

  &__remove {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: #fff;
    justify-content: center;
    align-items: center;
    gap: .25rem;
    font-size: .85rem;
    display: flex;
    opacity: 0;
    transition: opacity .1s ease-out;
    z-index: 10;
  }

  &__gradient {
    background: linear-gradient(0deg, rgba(40, 34, 34, 0.53) 5%, #ffffff11 40%);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1s ease-out;
    border-radius: .25rem;

    &--show {
      opacity: 1;
    }
  }

  &__remove-container {
    background-color: rgba(40, 34, 34, 0.53);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: .25rem;
    opacity: 0;
    transition: opacity .1s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 1;
    }

    &--show {
      opacity: 1;
      outline: 2px solid red;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: .25rem;
  }

  &__status {
    color: #fff;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.93));

    &--error {
      color: #dc3545;
    }
  }

  &:hover {
    .file-preview__remove {
      opacity: 1;
    }
  }
}
</style>
