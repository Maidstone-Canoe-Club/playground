﻿<template>
  <Disclosure v-slot="{ open }" as="nav" class="border-b border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <nuxt-link to="/">
              <img class="block h-8 w-auto lg:hidden" src="/images/logo-no-text.svg" alt="Maidstone Canoe Club logo">
              <img class="hidden h-8 w-auto lg:block" src="/images/logo-no-text.svg" alt="Maidstone Canoe Club logo">
            </nuxt-link>
          </div>
          <div class="hidden sm:space-x-8 sm:-my-px sm:ml-6 sm:flex">
            <nuxt-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
              {{ item.name }}
            </nuxt-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Profile dropdown -->
          <template v-if="user">
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img
                    v-if="hasAvatar"
                    class="h-8 w-8 rounded-full"
                    :src="avatarUrl!"
                    alt="User avatar">
                  <UserCircleIcon
                    v-else
                    class="h-12 w-12 text-gray-300"
                    aria-hidden="true" />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="scale-95 transform opacity-0"
                enter-to-class="scale-100 transform opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="scale-100 transform opacity-100"
                leave-to-class="scale-95 transform opacity-0">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a
                      v-if="item.onClick"
                      href="javascript:;"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                      @click="item.onClick">
                      {{ item.name }}
                    </a>
                    <nuxt-link
                      v-else
                      :to="item.href"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                      {{ item.name }}
                    </nuxt-link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </template>
          <template v-else>
            <nuxt-link :to="loginUrl" class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Login
            </nuxt-link>
          </template>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[item.current ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800', 'block border-l-4 py-2 pl-3 pr-4 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">
          {{ item.name }}
        </DisclosureButton>
      </div>
      <div
        v-if="user"
        class="border-t border-gray-200 pt-4 pb-3">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="avatarUrl" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            @click="item.onClick">
            {{ item.name }}
          </DisclosureButton>
        </div>
      </div>
      <div v-else>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="a"
            href="javascript:;"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            @click="navigateTo(loginUrl)">
            Login
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Bars3Icon, UserCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { Disclosure, DisclosurePanel, DisclosureButton, Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { DirectusUser } from "nuxt-directus/dist/runtime/types";
import { Ref } from "vue";
import { logout } from "~/utils/auth";

const NuxtLink = resolveComponent("nuxt-link");

const route = useRoute();

let user: Ref<DirectusUser>;
try {
  user = useDirectusUser();
} catch (err) {
  console.log("Error loading user", err);
}

const loginUrl = "/login?redirect=" + route.fullPath;

const links = ref([
  { url: "/", name: "Home" },
  { url: "/news", name: "News" },
  { url: "/galleries", name: "Galleries" },
  { url: "/calendar", name: "Calendar" }
]);

const navigation = computed(() => {
  return [
    { name: "Home", href: "/", current: route.path === "/" },
    { name: "News", href: "/news", current: route.path === "/news" },
    { name: "Calendar", href: "/calendar", current: route.path === "/calendar" },
    { name: "Coaching", href: "/content/1/coaching", current: route.path === "/content/1/coaching" },
    { name: "Galleries", href: "/galleries", current: route.path === "/galleries" }
  ];
});

const userNavigation = [
  { name: "Profile", href: "/profile" },
  {
    name: "Sign out",
    href: "#",
    onClick: async () => {
      await logout();
      await navigateTo("/");
    }
  }
];

const directusUrl = useDirectusUrl();
const avatarUrl = computed(() => user.value ? `${directusUrl}/assets/${user.value.avatar}?width=${40}&height=${40}&fit=cover` : null);
const hasAvatar = computed(() => !!user.value.avatar);

</script>

<style lang="scss" scoped>
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
      color: var(--text-color);
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
    color: var(--text-color);
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
