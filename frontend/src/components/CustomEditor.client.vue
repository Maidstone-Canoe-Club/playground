<template>
  <quill-editor
    v-model:content="content"
    :modules="modules"
    content-type="html"
    toolbar="full" />
</template>

<script setup>
import ImageUploader from "quill-image-uploader";
import axios from "axios";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String
});

const directusUrl = useDirectusUrl();
const { token } = useDirectusToken();

const modules = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("title", file.name);
        formData.append("image", file);

        axios.post(
          directusUrl + "/files",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          })
          .then((res) => {
            resolve(directusUrl + "/assets/" + res.data.data.id);
          })
          .catch((err) => {
            reject(new Error("Upload failed"));
            console.error("Upload failed", err);
          });
      });
    }
  }
};

const content = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    emit("update:modelValue", value);
  }
});

</script>

<style lang="scss">
.ql-toolbar {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.ql-container {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
