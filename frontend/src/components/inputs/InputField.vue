<template>
  <div
    class="input-field"
    :class="{'input-field--invalid': !isValid}">
    <label
      v-if="label"
      :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="internalValue"
      :required="required"
      :type="type"
      v-bind="$attrs">
    <span
      v-if="error"
      class="input-field__validation-message">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Validation } from "@vuelidate/core";

interface Props {
    modelValue: string | number | null,
    id: string,
    type: string,
    label?: string,
    required?: boolean,
    v?: Validation | null
}

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  label: null,
  required: false,
  v: null
});

const error = computed(() => {
  if (props.v && props.v?.$errors?.length >= 1) {
    return props.v.$errors[0].$message;
  }
});

const isValid = computed(() => {
  if (props.v && props.v.$dirty) {
    console.log("here", props.v.$dirty, props.v.$invalid);
    return !props.v.$invalid;
  }

  return true;
});

const internalValue = computed<string | number | null>({
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
