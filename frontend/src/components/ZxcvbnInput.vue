<template>
  <span>
    <input-field
      id="password"
      v-model="password"
      label="Password"
      type="password"
      :v="v" />

    <div class="password-strength">
      <div
        v-for="index in 4"
        :key="index"
        class="password-strength__bar"
        :class="getBarStyle(index)" />
      <div
        class="password-strength__label"
        :class="getLabelColor()">
        {{ passwordStrengthLabel }}
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
import { zxcvbnAsync, debounce, ZxcvbnResult } from "@zxcvbn-ts/core";
import { Validation } from "@vuelidate/core";

const props = defineProps<{
    modelValue?: string,
    v: Validation
}>();

const emit = defineEmits(["update:modelValue"]);

const result: Ref<ZxcvbnResult | null> = ref(null);

const password = computed<string>({
  get () {
    return props.modelValue ?? "";
  },
  set (value) {
    zxcvbnDebounce();
    emit("update:modelValue", value);
  }
});

const useZxcvbn = async () => {
  if (password) {
    result.value = await zxcvbnAsync(password.value);
  } else {
    result.value = null;
  }
};

const passwordStrengthLabel = computed(() => {
  const score: number = result.value?.score ?? 0;
  const labels: string[] = ["Very weak", "So-so", "Ok", "Great!"];
  return labels[score - 1] ?? "Very weak";
});

useZxcvbn();
const zxcvbnDebounce = debounce(useZxcvbn, 200, false);

const colors: string[] = ["red", "orange", "lightgreen", "green"];

function getBarStyle (index: number) {
  const score: number = result.value?.score ?? 0;

  if (index <= score) {
    return "password-strength__bar--" + colors[score - 1];
  }
  return null;
}

function getLabelColor () {
  const score: number = result.value?.score ?? 0;
  return "password-strength__label--" + colors[score - 1];
}

</script>

<style lang="scss">
.password-strength {
  margin-top: .5rem;
  display: flex;
  flex-direction: row;
  gap: .5rem;
  justify-content: space-between;
  flex-wrap: wrap;

  &__bar {
    display: block;
    height: 3px;
    background-color: lightgray;
    flex-grow: 1;

    &--red {
      background-color: red;
    }

    &--orange {
      background-color: orange;
    }

    &--lightgreen {
      background-color: lightgreen;
    }

    &--green {
      background-color: green;
    }
  }

  &__label {
    color: #fff;
    font-size: .875rem;
    flex: 0 0 100%;
    text-align: right;
    margin-top: -.25rem;

    &--red {
      color: red;
    }

    &--orange {
      color: orange;
    }

    &--lightgreen {
      color: lightgreen;
    }

    &--green {
      color: green;
    }
  }
}
</style>
