<template>
  <div
    class="input-field"
    :class="{'input-field--invalid': !isValid}">
    <label
      :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="internalValue"
      :required="required"
      :type="type"
      v-bind="$attrs">
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
    type: string,
    label: string,
    required?: boolean,
    v?: Validation | null
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
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

<style lang="scss">
.input-field {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: .5rem;
  }
}
</style>
