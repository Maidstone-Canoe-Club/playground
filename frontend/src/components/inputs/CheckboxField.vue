<template>
  <div class="checkbox-field input-field">
    <input
      :id="id"
      v-model="internalValue"
      type="checkbox">
    <label :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: boolean
  id: string
  label: string
}>();

const internalValue = computed<boolean>({
  get () {
    return props.modelValue;
  },
  set (val) {
    emits("update:modelValue", val);
  }
});

</script>

<style lang="scss" scoped>

</style>
