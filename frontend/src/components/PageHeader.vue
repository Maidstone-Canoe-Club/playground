<template>
  <header class="page-header">
    <div class="container">
      <nav class="page-header__nav">
        <nuxt-link to="/">
          <img
            src="/images/logo-no-text.svg"
            alt="Maidstone Canoe Club logo"
            class="page-header__logo">
        </nuxt-link>
        <div
          class="page-header__overlay"
          :class="{'page-header__overlay--open': open}" />
        <ul
          ref="sidebar"
          class="page-header__links"
          :class="{'page-header__links--open': open}">
          <li
            v-for="(link, index) in links"
            v-show="!link.hide"
            :key="index"
            class="page-header__link"
            :class="{'page-header__link--active': isActive(link.url)}">
            <nuxt-link
              :to="link.url"
              @click="open = false">
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
        <div class="page-header__menu-controls">
          <div v-if="user">
            <user-dropdown :user="user" />
          </div>
          <div v-else>
            <nuxt-link
              :to="loginUrl"
              class="btn btn-primary">
              Login
            </nuxt-link>
          </div>
        </div>
        <button
          class="page-header__menu-button"
          @click="open = !open">
          Menu
          <fa-icon icon="fa-solid fa-bars" />
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const route = useRoute();

let user;
try {
  user = useDirectusUser();
} catch (err) {
  console.log("Error loading user", err);
}

const open = ref(false);

const loginUrl = "/login?redirect=" + route.fullPath;

const links = ref([
  { url: "/", name: "Home" },
  { url: "/news", name: "News" },
  { url: "/calendar", name: "Calendar" },
  { url: "/galleries", name: "Galleries" }
]);

function isActive (url) {
  return url === route.path;
}

const sidebar = ref(null);

onClickOutside(sidebar, () => {
  open.value = false;
});

</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.page-header {
  width: 100%;
  padding: 1rem 0;

  &__overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000007d;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity .2s ease-out;

    &--open {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    height: 100px;
  }

  &__links {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    margin-left: auto;

    @media ( max-width: 767px ) {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      background: #fff;
      margin: 0;
      display: flex;
      gap: 0;
      flex-direction: column;
      z-index: 10000;
      width: 0;
      overflow: hidden;
      transition: width .2s ease-out;
      box-shadow: 2px 0 13px -1px gray;

      &--open {
        width: calc(100% - 4rem);
      }
    }
  }

  &__link {
    @media ( max-width: 767px ) {
      display: flex;
      width: 100%;

      &:not(:last-child){
        border-bottom: 1px solid lightgray;
      }

      & > a {
        width: 100%;
        padding: 1rem;
      }
    }

    & > a {
      font-weight: 700;
      text-decoration: none;
      color: $black;
    }

    &--active > a {

    }
  }

  &__logout {
    @media ( max-width: 767px ) {
    margin-top: auto;

      & > button {
        width: 100%;
        padding: 1rem;
        border: none;
        background: #fff;
        font-weight: 700;
        text-align: left;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  &__profile-link {
    text-decoration: none;
    color: $black;
  }

  &__menu-controls {
    margin-left: 2rem;
    @media ( max-width: 767px ) {
      display: none;
    }
  }

  &__menu-button {
    padding: 1rem;
    border: none;
    display: flex;
    gap: .5rem;
    align-items: center;
    font-size: 1.5rem;
    background-color: #fff;
    border-radius: .5rem;

    @media ( min-width: 768px ) {
      display: none;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
