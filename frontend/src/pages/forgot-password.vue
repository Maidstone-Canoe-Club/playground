﻿<template>
  <div class="container request-password-reset container--md">
    <template v-if="status === Status.Waiting">
      <h1>Forgot your password?</h1>
      <p>We'll send you reset instructions</p>
      <div
        class="request-password-reset__form input-group">
        <input-field
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          :v="v$.email"
          label="Email" />
        <processing-button class="btn btn-primary" :action="onSubmit">
          Reset password
        </processing-button>
      </div>
    </template>
    <template
      v-else-if="status === Status.Success">
      <h1>Check your email</h1>
      <p>We've sent a password reset link to </p>
      <strong>{{ email }}</strong>
    </template>
    <alert-box
      v-else-if="status === Status.Error"
      variant="warning">
      An error occured, please try again
    </alert-box>
    <nuxt-link
      to="/login"
      class="btn back-to-login">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
        <path
          fill="currentColor"
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
      Back to login
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">

import { Ref } from "vue";
import { useVuelidate, Validation } from "@vuelidate/core";
import { email as emailValidator, minLength, required } from "@vuelidate/validators";

enum Status {
  Waiting,
  Success,
  Error
}

const { requestPasswordReset } = useDirectusAuth();

const email = ref("foo@bar.com");

const status = ref<Status>(Status.Waiting);

const rules = {
  email: {
    required,
    emailValidator
  }
};
const v$: Ref<Validation> = useVuelidate(rules, { email });

watch(email, () => {
  v$.value.$reset();
});

async function onSubmit () {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    const foo = () => new Promise(resolve => setTimeout(resolve, 2000));

    try {
      await foo();
      // await requestPasswordReset({
      //   email: email.value,
      //   reset_url: "http://localhost:3000/reset-password"
      // });
      status.value = Status.Success;
    } catch {
      status.value = Status.Error;
    }
  }
}
</script>

<style scoped lang="scss">
.request-password-reset {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  h1 {
    margin-bottom: .5rem;
  }

  &__form {
    margin-top: 1rem;
    width: 100%;
    display: flex;
  }

  .alert-box {
    width: 100%;
    margin-top: 1rem;
  }

  .back-to-login {
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--color-gray-700);
  }
}
</style>
