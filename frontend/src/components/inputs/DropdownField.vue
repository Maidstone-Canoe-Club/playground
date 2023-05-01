<template>
  <div class="input-field">
    <label
      v-if="label"
      :for="id">
      {{ label }}
    </label>
    <select
      :id="id"
      v-model="selected">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="getValue(option)">
        {{ getLabel(option) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  id: string,
  label?: string,
  options: string[] | any
  modelValue: any,
  labelKey?: string,
  valueKey?: string
}>();

const selected = computed({
  get () {
    return props.modelValue;
  },
  set (val) {
    emits("update:modelValue", val);
  }
});

function getLabel (option) {
  let result = option;

  if (props.labelKey) {
    result = option[props.labelKey];
  }

  return result;
}

function getValue (option) {
  let result = option;

  if (props.valueKey) {
    result = option[props.valueKey];
  }

  return result;
}

</script>

<style lang="scss" scoped>
.input-field {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: .5rem;
  }
}
</style>
