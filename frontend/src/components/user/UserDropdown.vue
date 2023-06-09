﻿<template>
  <div class="wrapper">
    <div
      ref="caret"
      class="user-dropdown"
      :class="{'user-dropdown--open': open}"
      @click="open = !open">
      <div class="user-dropdown__top">
        <user-avatar
          :user="user"
          :size="50" />

        <div class="icon-container">
          <fa-icon
            icon="fa-solid fa-angle-up"
            :rotation="iconRotation" />
        </div>
      </div>
    </div>
    <Collapse
      ref="collapsible"
      :when="open"
      class="v-collapse dropdown">
      <div>
        <div class="user-dropdown__info">
          <strong class="user-dropdown__info-name">{{ fullName }}</strong>
          <span class="user-dropdown__info-email">{{ user.email }}</span>
        </div>
        <ul
          @click="open = false">
          <li>
            <nuxt-link
              to="/profile"
              class="user-dropdown__list-item">
              <fa-icon icon="fa-regular fa-user" />
              Profile
            </nuxt-link>
          </li>
          <li>
            <button
              class="user-dropdown__list-item"
              @click="onLogout">
              <fa-icon icon="fa-solid fa-arrow-right-to-bracket" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse } from "vue-collapsed";
import { DirectusUser } from "nuxt-directus/dist/runtime/types";
import { onClickOutside } from "@vueuse/core";
import { logout } from "~/utils/auth";

const props = defineProps<{
  user: DirectusUser
}>();

const avatarUrl = ref(null);
if (props.user.avatar) {
  const directusUrl = useDirectusUrl();
  if (props.user.avatar) {
    avatarUrl.value = directusUrl + "/assets/" + props.user.avatar;
  }
}

const fullName = ref(props.user.first_name + " " + props.user.last_name);

const open = ref(false);
const iconRotation = computed(() => {
  return open.value ? "180" : undefined;
});

const onLogout = async () => {
  await logout();
  await navigateTo("/");
};

const collapsible = ref(null);
const caret = ref(null);

onClickOutside(collapsible, (e) => {
  open.value = false;
}, {
  ignore: [caret]
});

</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wrapper {
  position: relative;
}

.user-dropdown {
  position: relative;
  padding: .5rem;
  overflow: hidden;

  &--open {
    height: auto;
  }

  &__top {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: .5rem;
  }

  &:hover {
    cursor: pointer;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    font-size: .9rem;

    &-email {
      color: gray;
    }
  }

  &__caret {
    margin: 0 1rem;
  }

  &__items {
  }

}

.icon-container {
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-collapse {
  transition: height 300ms cubic-bezier(0.33, 1, 0.68, 1);
}

.dropdown {
  position: absolute;
  background: #fff;
  top: calc(100% + .5rem);
  right: 0;
  border-radius: .5rem;
  box-shadow: 0 3px 6px -1px lightgray;
  overflow: hidden;
  z-index: 10000;
  border: 1px solid lightgray !important;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    a, button {
      background: #fff;
      border: none;
      width: 100%;
      display: flex;
      gap: .5rem;
      align-items: center;
      text-decoration: none;
      padding: 1rem;
      text-align: left;
      color: #4f4f4f;
      transition: color .1s ease-out, background-color .1s ease-out;

      &:hover {
        color: $black;
        cursor: pointer;
        background-color: #f5f5f5;
      }
    }
  }
}

</style>
