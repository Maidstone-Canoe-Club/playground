<template>
  <div
    class="input-field input-field--text-area"
    :class="{'input-field--invalid': !isValid}">
    <label :for="id">
      {{ label }}
    </label>
    <textarea
      :id="id"
      v-model="internalValue"
      :required="required"
      :rows="rows"
      v-bind="$attrs" />
    <span v-if="error">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Validation } from "@vuelidate/core";

interface Props {
  modelValue: string | null,
  id: string,
  label: string,
  required?: boolean,
  rows?: number,
  v?: Validation | null
}

const emit = defineEmits(["update:modelValue"]);
const props = withDefaults(defineProps<Props>(), {
  required: false,
  rows: null,
  v: null
});

const error = computed(() => {
  if (props.v && props.v?.$errors?.length >= 1) {
    return props.v.$errors[0].$message;
  }
});

const isValid = computed(() => !props.v?.$invalid ?? true);

const internalValue = computed<string | null>({
  get () {
    return props.modelValue;
  },
  set (val) {
    emit("update:modelValue", val);
  }
});

</script>

<style  lang="scss" scoped>

</style>
