<template>
  <span>
    <input-field
      id="password"
      v-model="password"
      :label="label"
      type="password"
      :v="v" />

    <span
      v-if="showStrength"
      class="password-strength">
      <span
        v-for="index in 4"
        :key="index"
        class="password-strength__bar"
        :class="getBarStyle(index)" />
      <span
        v-if="passwordStrengthLabel"
        class="password-strength__label"
        :class="getLabelColor()">
        {{ passwordStrengthLabel }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ZxcvbnResult } from "@zxcvbn-ts/core";
import { Validation } from "@vuelidate/core";
import { Ref } from "vue";

const { zxcvbnOptions, zxcvbnAsync, debounce } = await import("@zxcvbn-ts/core");
const zxcvbnCommonPackage = await import("@zxcvbn-ts/language-common");

const options = {
  dictionary: {
    ...zxcvbnCommonPackage.default.dictionary
  },
  graphs: zxcvbnCommonPackage.default.adjacencyGraphs
};
zxcvbnOptions.setOptions(options);

const props = defineProps<{
    modelValue?: string,
    label?: string
    v: Validation,
    showStrength?: boolean
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
  return labels[score - 1] ?? null;
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
      background-color: var(--color-danger-500);
    }

    &--orange {
      background-color: var(--color-warning-500);
    }

    &--lightgreen {
      background-color: var(--color-success-500);
    }

    &--green {
      background-color: var(--color-primary-500);
    }
  }

  &__label {
    color: #fff;
    font-size: .875rem;
    flex: 0 0 100%;
    text-align: right;
    margin-top: -.25rem;

    &--red {
      color: var(--color-danger-500);
    }

    &--orange {
      color: var(--color-warning-600);
    }

    &--lightgreen {
      color: var(--color-success-600);
    }

    &--green {
      color: var(--color-primary-500);
    }
  }
}
</style>
