<template>
  <form
    class="login-form"
    @submit.prevent="onSubmit">
    <input-field
      id="email"
      v-model="email"
      type="email"
      label="Email"
      required
      autocomplete="email"
      :v="v$.email" />
    <zxcvbn-input
      v-model="password"
      label="Password"
      autocomplete="current-password"
      :v="v$.password" />
    <processing-button
      class="btn btn-primary"
      type="submit"
      :action="onSubmit">
      Login
    </processing-button>
    <small>Forgot your password? <nuxt-link to="/forgot-password">Click here to reset it</nuxt-link></small>
    <div v-if="error">
      <p
        v-for="(e, index) in error.errors"
        :key="index">
        {{ e.message }}
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate, Validation } from "@vuelidate/core";
import { minLength, required, email as emailValidator } from "@vuelidate/validators";
import { Ref } from "vue";
import { login } from "~/utils/auth";

const props = defineProps<{
  redirect?: string
}>();

const loading = ref(false);
const email = ref("admin@example.com");
const password = ref("password");

const error : any = ref(null);

const rules = {
  email: {
    required,
    emailValidator
  },
  password: {
    required,
    minLength: minLength(8)
  }
};

const v$: Ref<Validation> = useVuelidate(rules, { email, password });

const onSubmit = async () => {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    error.value = null;
    loading.value = true;
    try {
      const result = await login(email.value, password.value);
      if (result && props.redirect) {
        await navigateTo(props.redirect);
      }
    } catch (e: any) {
      error.value = e.data;
    } finally {
      loading.value = false;
    }
  }
};

</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
