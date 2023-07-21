<template>
  <div class="user-details-step">
    <div class="input-group">
      <input-field
        id="first-name"
        v-model="internalValue.firstName"
        type="text"
        label="First name"
        required />
      <input-field
        id="last-name"
        v-model="internalValue.lastName"
        type="text"
        label="Last name"
        required />
      <input-date
        id="dob"
        v-model="internalValue.dob"
        label="Date of birth"
        required />
      <input-field
        id="home-tel"
        v-model="internalValue.homeTel"
        type="tel"
        label="Home tel" />
      <input-field
        id="mobile"
        v-model="internalValue.mobile"
        type="tel"
        label="Mobile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserDetails } from "~/components/registration/RegistrationForm.vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: UserDetails
}>();

const internalValue = ref<UserDetails>(props.modelValue);

watch(() => props.modelValue, (val) => {
  internalValue.value = val;
}, { deep: true });

watch(internalValue, (val) => {
  emits("update:modelValue", val);
}, { deep: true });

</script>

<style scoped lang="scss">

</style>
