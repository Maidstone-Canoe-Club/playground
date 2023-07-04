<template>
  <div class="profile-details">
    <div class="input-group">
      <input-field
        id="first-name"
        v-model="internalValue.first_name"
        type="text"
        label="First name" />
      <input-field
        id="last-name"
        type="text"
        label="Last name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirectusUser } from "nuxt-directus/dist/runtime/types";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: DirectusUser
}>();

const internalValue = ref<DirectusUser>(props.modelValue);

watch(() => props.modelValue, (val: DirectusUser) => {
  internalValue.value = val;
}, { deep: true });

watch(internalValue, (val) => {
  emits("update:modelValue", val);
}, { deep: true });

</script>

<style scoped lang="scss">

</style>
