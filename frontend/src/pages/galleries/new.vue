<template>
  <div class="new-gallery">
    <div class="container">
      <div class="new-gallery__title-editor">
        <input
          v-model="galleryName"
          type="text"
          placeholder="Gallery name"
          class="h1-input">
        <small>Click to change the gallery name</small>
      </div>
      <drop-zone
        v-slot="{dropZoneActive}"
        type="image/"
        class="new-gallery__file-dropper"
        @files-dropped="addFiles">
        <label
          for="file-input"
          class="new-gallery__file-dropper-heading">
          <span v-if="dropZoneActive">
            <strong>Drop them here</strong>
            <small>to add them</small>
          </span>
          <span v-else>
            <span class="new-gallery__file-dropper-info">
              <strong>Drag your files here</strong>
              <small>or <strong>click here</strong> to select files</small>
              <small class="new-gallery__file-dropper-limits">
                Max 100 images up to 8mb each
              </small>
            </span>
          </span>
          <input
            id="file-input"
            class="new-gallery__file-dropper-input"
            type="file"
            accept="image/*"
            multiple
            @change="onInputChange">
        </label>
        <div
          v-if="files && files.length"
          class="new-gallery__files-wrapper">
          <div v-show="imagesLoaded.size >= files.length || !firstLoad">
            <masonry-wall
              v-slot="{ item }"
              :items="files"
              :column-width="175"
              :ssr-columns="3"
              :gap="16">
              <file-preview
                tag="div"
                :file="item"
                @remove="removeFile"
                @load="imageLoaded" />
            </masonry-wall>
          </div>
          <div
            v-show="imagesLoaded.size < files.length && firstLoad"
            class="new-gallery__files-loader">
            <fa-icon icon="fa-solid fa-spinner" spin />
          </div>
        </div>
      </drop-zone>
    </div>
    <div class="new-gallery__footer">
      <div class="container">
        <div class="new-gallery__footer-content">
          <span class="new-gallery__files-count">
            {{ files.length }} / 100 photos
          </span>
          <processing-button
            class="btn btn-primary"
            :disabled="uploadButtonDisabled"
            :action="onUploadClick">
            {{ uploadLabel }}
          </processing-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useFileManager } from "~/composables/useFileManager";
import { useFileUploader } from "~/composables/useFileUploader";
import { PhotoGallery } from "~/types";

definePageMeta({
  middleware: [
    "auth"
  ]
});

const { addFiles, removeFile, files } = useFileManager(100);
const { createFolder, uploadFiles } = useFileUploader();
const { getSingletonItem, createItems } = useDirectusItems();

const { data: gallery } = await useAsyncData("gallery", () => {
  return getSingletonItem({ collection: "gallery" });
});

const parentFolderId = gallery.value.gallery_folder;

function onInputChange (e) {
  addFiles(e.target.files);
  e.target.value = null;
}

const galleryName = ref("New Gallery");

const uploadLabel = computed(() => {
  let result = `Upload ${imagesLoaded.value.size}`;
  result += imagesLoaded.value.size === 1 ? " image" : " images";
  return result;
});

async function onUploadClick () {
  const folderId = await createFolder(parentFolderId, galleryName.value);
  if (!folderId) {
    throw new Error("Could not create gallery");
  }

  const items: PhotoGallery[] = [{
    name: galleryName.value,
    description: "Description here",
    location: "Location here",
    gallery_folder: folderId
  }];

  const data: PhotoGallery[] = await createItems<PhotoGallery>({
    collection: "photo_gallery",
    items
  });
  const galleryId = data[0].id;

  await uploadFiles(files.value, folderId);
  await navigateTo("/galleries/" + folderId);
}

const imagesLoaded = ref(new Set());
const firstLoad = ref(true);

const uploadButtonDisabled = computed(() => {
  return files.value.length === 0 || firstLoad.value;
});

function imageLoaded (id: string) {
  imagesLoaded.value.add(id);
  if (imagesLoaded.value.size >= files.value.length) {
    firstLoad.value = false;
  }
}

</script>

<style lang="scss" scoped>
.new-gallery {
  position: relative;

  .container {
    padding: 0 1rem;
  }

  &__title-editor {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    .h1-input {
      margin-bottom: 0;
    }

    small {
      color: gray;
    }
  }

  &__file-dropper {
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ( max-width: 767px ) {
      border: none;
    }

    &-heading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 3rem 0;

      @media ( max-width: 767px ) {
        border-radius: .5rem;
        border: 1px solid lightgray;
      }

      &:hover {
        cursor: pointer;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .25rem;
    }

    &-limits {
      margin-top: .5rem;
      color: gray;
    }

    &-input {
      display: none;
    }
  }

  &__files-wrapper {
    padding: 1rem;
    @media ( max-width: 767px ) {
      padding: 1rem 0;
    }
  }

  &__files-count {
    color: gray;
    font-weight: 700;
  }

  &__files {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    &-loader {
      color: lightgray;
      font-size: 3rem;
      padding: 2rem;
    }
  }

  &__footer {
    padding: 1rem 0;
    position: sticky;
    bottom: 0;
    background-color: #fff;

    &-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

}
</style>
