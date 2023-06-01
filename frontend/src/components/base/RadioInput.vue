<template>
  <div class="radio-input">
    <input
      :id="id"
      v-model="internalValue"
      type="radio"
      :value="value"
      :name="name"
      :disabled="disabled"
      @change="emits('change')"
      @inout="emits('input')">
    <label :for="id">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue", "change", "input"]);

const props = defineProps<{
  id: string,
  modelValue?: string | number,
  disabled?: boolean,
  name?: string,
  value?: string | number
}>();

const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  internalValue.value = val;
});

watch(internalValue, (val) => {
  emits("update:modelValue", val);
});

</script>

<style scoped lang="scss">
.radio-input {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1.75rem;
  min-height: 1.75rem;

  label {
    position: absolute;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: -1.75rem;
      top: .125rem;
      width: 1.25rem;
      height: 1.25rem;
      display: block
    }

    &::before {
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid var(--color-primary-500);
      box-shadow: 0 0 0 0 transparent;
      transition: border-color .2s ease-out,
    box-shadow .2s ease-out,
    color .2s ease-out,
    background-color .2s ease-out;
    }
  }

  input {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 1.75rem;
    height: 1.75rem;
    opacity: 0;
    margin: 0;
    padding: 0;

    &:focus {
      &:not(:checked){
        & ~ label::before {
          border-color: var(--color-primary-400);
        }
      }

      & ~ label::before {
        box-shadow: 0 0 0 .2rem var(--color-primary-300);
      }
    }

    &:checked {
      & ~ label {
        &::before {
          border-color: var(--color-primary-500);
          background-color: var(--color-primary-500);
        }

        &::after {
          background-color: #fff;
          mask-position: 50% 50%;
          mask-repeat: no-repeat;
          mask-size: 100%;
          mask-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
        }
      }
    }

    &:disabled {
      & ~ label {
        color: gray;

        &::before {
          background-color: var(--color-gray-100);
        }
      }

      &:checked {
        & ~ label::before {
          background-color: var(--color-primary-200);
        }
      }

    }
  }
}
</style>
