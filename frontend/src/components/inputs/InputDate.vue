<template>
  <div
    class="input-field input-date-picker"
    :class="{'input-field--invalid': !isValid}">
    <label
      v-if="label"
      :for="id">
      {{ label }}
    </label>
    <date-picker
      :id="id"
      v-model="internalValue"
      :enable-time-picker="enableTimePicker"
      v-bind="$attrs" />
    <span v-if="error">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Validation } from "@vuelidate/core";

interface Props {
  modelValue: Date | number | null | undefined,
  id: string,
  label?: string,
  required?: boolean,
  enableTimePicker?: boolean,
  v?: Validation | null
}

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<Props>(), {
  label: null,
  required: false,
  v: null
});

const error = computed(() => {
  if (props.v && props.v?.$errors?.length >= 1) {
    return props.v.$errors[0].$message;
  }
});

const isValid = computed(() => !props.v?.$invalid ?? true);

const internalValue = computed<Date | number | null>({
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
