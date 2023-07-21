<template>
  <div class="registration-form">
    <state-manager v-slot="{setState, currentState, goBack, canGoBack}">
      <state-wrapper name="default">
        <user-details-step v-model="internalValue" />
        <button
          class="btn btn-primary"
          @click="setState('account-details')">
          Next
        </button>
      </state-wrapper>
      <state-wrapper name="account-details">
        <account-details-step v-model="internalValue" />
      </state-wrapper>
    </state-manager>
  </div>
</template>

<script setup lang="ts">

export type UserDetails = {
  firstName: string,
  lastName: string
  dob: Date,
  homeTel?: string,
  mobile?: string,
  email: string,
  password: string,
}

const internalValue = ref<UserDetails>({
  firstName: "Bob",
  lastName: "Smith",
  dob: Date.parse("01 Jan 1990"),
  homeTel: null,
  mobile: "01234567891",
  email: "bob@example.com",
  password: "HelloWorld123"
});

</script>

<style scoped lang="scss">

</style>
