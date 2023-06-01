<template>
  <div
    class="input-field"
    :class="{'input-field--invalid': !isValid}">
    <label
      v-if="label"
      :for="id">
      {{ label }}
    </label>
    <div class="input-field__wrapper">
      <span class="input-field__currency">£</span>
      <input
        :id="id"
        :value="internalValue"
        :required="required"
        :step="0.01"
        :min="0"
        type="number"
        v-bind="$attrs"
        @blur="onBlur">
    </div>
    <span v-if="error">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Validation } from "@vuelidate/core";
// @ts-ignore
import Dinero from "dinero.js";

interface Props {
  modelValue: number | null,
  id: string,
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

const isValid = computed(() => !props.v?.$invalid ?? true);

const internalValue = computed(() => formatPrice(props.modelValue));

function onBlur (e) {
  const amount = toPrice(e.target.value);
  emits("update:modelValue", amount);
}

function formatPrice (amount) {
  if (!amount) {
    return null;
  }
  return Dinero({ amount, currency: "GBP" }).toFormat("0.00");
}

function toPrice (amount) {
  return Math.round(amount * Math.pow(10, 2));
}

</script>

<style lang="scss" scoped>
.input-field {
  &__wrapper {
    display: inline-block;
    width: 100%;
    position: relative;

    input {
      width: 100%;
      padding-left: 1.75rem;
    }
  }

  &__currency {
    position: absolute;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    color: gray;
  }
}
</style>
