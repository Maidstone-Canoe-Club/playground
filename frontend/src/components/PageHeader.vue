<template>
  <nav class="page-header">
    <div class="page-header__content">
      <nuxt-link to="/">
        <img
          src="/images/logo.svg"
          alt="Maidstone Canoe Club logo"
          class="page-header__logo">
      </nuxt-link>
      <ul
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
        <li
          v-if="user"
          class="page-header__link page-header__logout">
          <button @click="onLogout">
            Logout
          </button>
        </li>
        <li v-if="user">
          <nuxt-link
            to="/profile"
            class="page-header__profile-link">
            <user-dropdown :user="user" />
          </nuxt-link>
          <button
            class="btn btn-primary"
            @click="onLogout">
            Logout
          </button>
        </li>
        <li v-else>
          <nuxt-link
            :to="loginUrl"
            class="btn btn-primary">
            Login
          </nuxt-link>
        </li>
      </ul>
      <div
        class="page-header__menu-button"
        @click="open = !open">
        <div class="page-header__menu-button-line" />
        <div class="page-header__menu-button-line" />
        <div class="page-header__menu-button-line" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";

const route = useRoute();
const appStore = useAppStore();
const { logout } = useDirectusAuth();

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
  { url: "/galleries", name: "Galleries" },
  { url: "/profile", name: "Profile", hide: !user.value }
]);

function isActive (url) {
  return url === route.path;
}

const cookie = useCookie("directus_refresh_token");

const onLogout = async () => {
  await logout();
  appStore.accessTokenExpiry = 0;
  cookie.value = null;
  await navigateTo("/");
};

</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.page-header {
  width: 100%;
  height: 120px;
  padding: 1rem 0;

  &__content {
    display: flex;
    align-items: center;
    max-width: 1300px;
    padding: 0 1rem;
    margin: 0 auto;
  }

  &__logo {
    height: 120px;
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

  &__menu-button {
    display: none;
    width: 22px;
    height: 19px;
    flex-direction: column;
    justify-content: space-between;
    padding: .25rem;

    @media (max-width: 767px) {
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
