<template>
  <div class="new-gallery container">
    <h1>New Gallery</h1>
    <drop-zone
      v-slot="{dropZoneActive}"
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
          <div>
            <strong>Drag your files here</strong>
            <small>or <strong>click here</strong> to select files</small>
          </div>
        </span>
        <input
          id="file-input"
          class="new-gallery__file-dropper-input"
          type="file"
          multiple
          @change="onInputChange">
      </label>
      <div class="new-gallery__files-wrapper">
        <ul class="new-gallery__files">
          <file-preview
            v-for="(file, index) in files"
            :key="index"
            :file="file"
            @remove="removeFile">
            {{ file.file.name }}
          </file-preview>
        </ul>
      </div>
    </drop-zone>
    <button
      class="btn btn-primary"
      :disabled="files.length === 0"
      @click="onUploadClick">
      {{ uploadLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">

import { useFileManager } from "~/compositions/useFileManager";
import { useFileUploader } from "~/compositions/useFileUploader";

const { addFiles, removeFile, files } = useFileManager();
const { createFolder, uploadFiles } = useFileUploader();
const { getSingletonItem } = useDirectusItems();

const { data: gallery } = await useAsyncData("gallery", () => {
  return getSingletonItem({ collection: "gallery" });
});

function onInputChange (e) {
  addFiles(e.target.files);
  e.target.value = null;
}

const galleryName = ref("New Gallery");
const parentFolderId = gallery.value.gallery_folder;

const uploadLabel = computed(() => {
  return "Upload " + files.value.length + " images";
});

async function onUploadClick () {
  const folderId = await createFolder(parentFolderId, galleryName.value);
  if (!folderId) {
    throw new Error("Could not create gallery");
  }
  await uploadFiles(files.value, folderId);
}

</script>

<style lang="scss" scoped>
.new-gallery {
  padding: 0 1rem;

  &__file-dropper {
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-heading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 3rem 0;

      &:hover {
        cursor: pointer;
      }
    }

    &-input {
      display: none;
    }
  }

  &__files-wrapper {
    padding: 1rem;
  }

  &__files {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
