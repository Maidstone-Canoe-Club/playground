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
        :key="index">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  id: string,
  label?: string,
  options: string[]
  modelValue: string
}>();

const selected = computed({
  get () {
    return props.modelValue;
  },
  set (val) {
    emits("update:modelValue", val);
  }
});

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
