<template>
  <nav class="page-header">
    <div class="page-header__content">
      <nuxt-link to="/">
        <img
          src="/images/logo.svg"
          alt="Maidstone Canoe Club logo"
          class="page-header__logo">
      </nuxt-link>
      <ul class="page-header__links">
        <li
          v-for="(link, index) in links"
          :key="index"
          class="page-header__link">
          <nuxt-link :to="link.url">
            {{ link.name }}
          </nuxt-link>
        </li>
        <li v-if="user">
          <nuxt-link to="/profile">
            {{ user.email }}
          </nuxt-link>
        </li>
        <li v-else>
          <nuxt-link
            to="/login"
            class="btn btn-primary">
            Login
          </nuxt-link>
        </li>
      </ul>
      <div class="page-header__menu-button">
        <div class="page-header__menu-button-line" />
        <div class="page-header__menu-button-line" />
        <div class="page-header__menu-button-line" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

let user;
try {
  user = useDirectusUser();
} catch (err) {
  console.log("Error loading user", err);
}

const links = [
  { url: "/", name: "Home" },
  { url: "/news", name: "News" }
];

</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.page-header {
  width: 100%;
  outline: 1px solid red;
  height: 120px;
  padding: 1rem 0;

  &__content {
    display: flex;
    align-items: center;
    max-width: 1300px;
    padding: 0 1rem;
    margin: 0 auto;
  }

  &__logo{
    height: 120px;
  }

  &__links {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-left: auto;
  }

  &__link > a{
    font-weight: 700;
    text-decoration: none;
    color: $black;
  }

  &__menu-button {
    display: none;
    width: 22px;
    height: 19px;
    flex-direction: column;
    justify-content: space-between;
    padding: .25rem;

    @media ( max-width: 767px ) {
      display: flex;
    }

    &:hover {
      cursor: pointer;
    }

    &-line {
      width: 100%;
      height: 3px;
      background: red;
    }
  }
}
</style>
