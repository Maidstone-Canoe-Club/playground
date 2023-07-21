<template>
  <div class="container account-details-step">
    <div class="input-group">
      <input-field
        id="email"
        v-model="internalValue.email"
        type="email"
        required
        label="Email" />

      <zxcvbn-input
        v-model="internalValue.password"
        show-strength
        label="Password"
        :v="v$.password" />
      <input-field
        id="confirm-password"
        v-model="confirmedPassword"
        type="password"
        label="Confirm password"
        :v="v$.confirmedPassword" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { helpers, minLength, required, sameAs } from "@vuelidate/validators";
import { Ref } from "vue";
import { useVuelidate, Validation } from "@vuelidate/core";
import { UserDetails } from "~/components/registration/RegistrationForm.vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: UserDetails
}>();

const internalValue = ref<UserDetails>(props.modelValue);
const confirmedPassword = ref();

watch(() => props.modelValue, (val) => {
  internalValue.value = val;
}, { deep: true });

watch(internalValue, (val) => {
  emits("update:modelValue", val);
}, { deep: true });

const rules = {
  password: {
    required,
    minLength: minLength(8)
  },
  confirmedPassword: {
    required,
    sameAsRef: helpers.withMessage("The passwords must match", sameAs(internalValue.password))
  }
};

const v$: Ref<Validation> = useVuelidate(rules, { password, confirmedPassword });

watch([internalValue.password, confirmedPassword], () => {
  v$.value.$reset();
});

</script>

<style scoped lang="scss">

</style>
