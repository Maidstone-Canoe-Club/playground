<template>
  <div class="login-form">
    <input-field
      id="email"
      v-model="email"
      type="email"
      label="Email"
      required
      :v="v$.email" />
    <zxcvbn-input
      v-model="password"
      :v="v$.password" />
    <button
      class="btn btn-primary"
      type="submit"
      :disabled="loading"
      @click="onSubmit">
      Login
    </button>
    <p v-if="loading">
      Loading...
    </p>
    <div v-if="error">
      <p
        v-for="(e, index) in error.errors"
        :key="index">
        {{ e.message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate, Validation } from "@vuelidate/core";
import { minLength, required, email as emailValidator } from "@vuelidate/validators";
import { Ref } from "vue";
import { useAppStore } from "~/stores/app";

const props = defineProps<{
  redirect?: string
}>();

const loading = ref(false);
const email = ref("admin@example.com");
const password = ref("password");

const error : any = ref(null);

const { login } = useDirectusAuth();

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

const appStore = useAppStore();

const onSubmit = async () => {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    error.value = null;
    loading.value = true;
    try {
      const res = await login({
        email: email.value,
        password: password.value
      });

      if (res) {
        appStore.accessTokenExpiry = Date.now() + res.expires;
        if (props.redirect) {
          await navigateTo(props.redirect);
        }
      }
    } catch (e: any) {
      clearError();
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
