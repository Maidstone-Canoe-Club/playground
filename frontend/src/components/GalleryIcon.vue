<template>
  <div class="gallery-icon">
    <div class="images">
      <div
        v-for="(preview, index) in files"
        :key="index"
        class="preview">
        <nuxt-img :src="getUrl(preview)" />
      </div>
      <div class="images-count" />
    </div>
    <div class="content">
      <strong>{{ name }}</strong>
      <small>{{ dateLabel }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { useDirectusFiles } from "#imports";
import { buildQuery } from "~/utils/queryBuilder";

const { getFiles } = useDirectusFiles();
const directusUrl = useDirectusUrl();

const props = defineProps<{
  name: string,
  date: string,
  folderId: string,
}>();

const dateLabel = useDateFormat(new Date(props.date), "MMMM YYYY");

const { data: files } = await useAsyncData("files-" + props.folderId, () => {
  return getFiles({
    params: {
      limit: 3,
      filter: {
        folder: props.folderId
      }
    }
  });
});

function getUrl (image) {
  return buildQuery(directusUrl + "/assets/" + image.id, {
    width: 255,
    height: 255,
    format: "webp",
    quality: 80
  });
}

</script>

<style lang="scss" scoped>
.gallery-icon {
  border-radius: 10px;
  width: 250px;
  overflow: hidden;
  transition: transform .2s ease-out,
  box-shadow .2s ease-out;
  box-shadow: 0 0.2px 0.1px rgba(0, 0, 0, 0.02),
  0 0.5px 0.3px rgba(0, 0, 0, 0.028),
  0 0.9px 0.6px rgba(0, 0, 0, 0.035),
  0 1.6px 1.1px rgba(0, 0, 0, 0.042),
  0 2.9px 2.1px rgba(0, 0, 0, 0.05),
  0 7px 5px rgba(0, 0, 0, 0.07);

  &:hover {
    transform: translateY(-3px);
    cursor: pointer;
    box-shadow: 0 0.3px 0.1px rgba(0, 0, 0, 0.02),
    0 0.7px 0.3px rgba(0, 0, 0, 0.028),
    0 1.3px 0.6px rgba(0, 0, 0, 0.035),
    0 2.2px 1.1px rgba(0, 0, 0, 0.042),
    0 4.2px 2.1px rgba(0, 0, 0, 0.05),
    0 10px 5px rgba(0, 0, 0, 0.07);

    .images {
      filter: brightness(115%) saturate(105%);
    }
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    strong {
    }

    small {
      color: gray;
    }
  }

  .images-count {
    position: absolute;
    bottom: .5rem;
    right: .5rem;
    font-weight: bold;
    color: #fff;
  }
}

.images {
  overflow: hidden;
  display: flex;
  height: 200px;
  transition: transform .2s ease-out,
  filter .2s ease-out;
  position: relative;

  .preview {
    flex: 1 1 0;
    width: 0;
    object-position: center;
    overflow: hidden;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    //transform: scale(150%);
  }
}

</style>
