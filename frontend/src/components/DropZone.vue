<template>
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop">
    <slot :drop-zone-active="active" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["files-dropped"]);

const active = ref(false);
let inactiveTimeout = null;

function setActive () {
  active.value = true;
  clearTimeout(inactiveTimeout);
}

function setInactive () {
  inactiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop (e) {
  setInactive();
  emit("files-dropped", [...e.dataTransfer.files]);
}

function preventDefaults (e) {
  e.preventDefault();
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});

</script>

<style lang="scss" scoped>

</style>
