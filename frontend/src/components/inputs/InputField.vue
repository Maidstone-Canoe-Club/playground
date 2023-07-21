<template>
  <div>
    <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        :id="id"
        v-model="internalValue"
        :type="type"
        :name="id"
        class="block w-full rounded-md border-0 py-1.5 sm:text-sm sm:leading-6"
        :class="inputClass"
        :placeholder="placeholder"
        :aria-invalid="!isValid"
        :aria-describedby="`${id}-error`">
      <div
        v-if="!isValid"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    </div>
    <p
      v-if="!isValid"
      :id="`${id}-error`"
      class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";
import { Validation } from "@vuelidate/core";

interface Props {
  modelValue: string | number | null | undefined,
  id: string,
  type: string,
  label?: string | null,
  required?: boolean,
  placeholder?: string,
  v?: Validation | null
}

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  label: null,
  required: false,
  placeholder: undefined,
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

const inputClass = computed(() => {
  if (isValid.value) {
    return "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600";
  } else {
    return "pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500";
  }
});

</script>

<style lang="scss" scoped>

</style>
