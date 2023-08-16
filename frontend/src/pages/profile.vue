<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <aside class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          <li v-for="item in secondaryNavigation" :key="item.name">
            <a :href="item.href" :class="[item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold']">
              <component :is="item.icon" :class="[item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div v-if="route.hash === ''">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>

          <dl class="mt-6 border-t border-gray-200 text-sm leading-6 space-y-6 divide-y divide-gray-100">
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Photo
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div
                  v-if="avatarUrl"
                  class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full" :src="avatarUrl" alt="">
                </div>
                <UserCircleIcon
                  v-else
                  class="h-12 w-12 text-gray-300"
                  aria-hidden="true" />
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>

            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.first_name }} {{ user.last_name }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Email address
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.email }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Date of birth
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ formatDate(user.dob) }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Mobile
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.mobile }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Home Telephone
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.home_tel }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
          </dl>
        </div>

        <!-- EMERGENCY CONTACT DETAILS-->
        <div v-if="route.hash === '#emergency'">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Emergency contact details
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">
            This information will be private and only be made available to coaches and instructors.
          </p>

          <dl class="mt-6 border-t border-gray-200 text-sm leading-6 space-y-6 divide-y divide-gray-100">
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.first_name }} {{ user.last_name }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Email address
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.email }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Date of birth
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ formatDate(user.dob) }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Mobile
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.mobile }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Home Telephone
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">
                  {{ user.home_tel }}
                </div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </dd>
            </div>
          </dl>
        </div>

        <!-- MEDICAL INFORMATION -->
        <div v-if="route.hash === '#medical'">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Medical information
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">
            This information will be private and only be made available to coaches and instructors.
          </p>

          <dl class="mt-6 border-t border-gray-200 text-sm leading-6 space-y-6 divide-y divide-gray-100">
            todo: medical information form
          </dl>
        </div>

        <!-- CHANGE PASSWORD -->
        <div v-if="route.hash === '#password'">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Change password
          </h2>

          <dl class="mt-6 border-t border-gray-200 text-sm leading-6 space-y-6 divide-y divide-gray-100">
            todo: change password form
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ExclamationCircleIcon, KeyIcon, HeartIcon } from "@heroicons/vue/24/outline";
import { DirectusUser } from "nuxt-directus/dist/runtime/types";
import { Ref } from "vue";
import { format } from "date-fns";
import { useDirectusItems } from "#imports";

definePageMeta({
  middleware: ["auth"]
});

let user: Ref<DirectusUser> = ref(null);

try {
  user = useDirectusUser();
} catch (err) {
  console.log("error loading user on profile", err);
}

const menuItems = [
  {
    url: "#details",
    label: "My details"
  },
  {
    url: "#password",
    label: "Change password"
  }
];

const route = useRoute();
const secondaryNavigation = computed(() => {
  return [
    { name: "General", href: "#", icon: UserCircleIcon, current: !route.hash },
    { name: "Emergency contact", href: "#emergency", icon: ExclamationCircleIcon, current: route.hash === "#emergency" },
    { name: "Medical information", href: "#medical", icon: HeartIcon, current: route.hash === "#medical" },
    { name: "Change password", href: "#password", icon: KeyIcon, current: route.hash === "#password" }
  ];
});

const currentPage = computed(() => {
  const href = secondaryNavigation.value.filter(n => n.current)?.href;
  if (!href || href === "#") {
    return "general";
  }
  return href.substring(1);
});

function formatDate (date: string | Date | undefined | null) {
  return date ? format(new Date(date), "do MMMM yyyy") : null;
}

const directusUrl = useDirectusUrl();
const avatarUrl = computed(() => user.value ? `${directusUrl}/assets/${user.value.avatar}?width=${40}&height=${40}&fit=cover` : null);

const { getItems } = useDirectusItems();

const { token } = useDirectusToken();

const res = await getItems({
  collection: "emergancy_contacts",
  params: {
    filter: {
      user: {
        _eq: user.value.id
      }
    }
  }
});

// const res = await useFetch("/api/users/emergancyContacts", {
//   query: {
//     userId: user.value.id
//   },
//   headers: {
//     Authorization: `Bearer ${token.value}`
//   }
// });
console.log("user res", res);

</script>

<style lang="scss" scoped>
$avatar-size: 150px;

.profile {

  &__wrapper {
    display: flex;
  }

  &__sidebar {
    flex-basis: 250px;

    &-menu {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }

  &__avatar {
    &-container {
      overflow: hidden;
      border-radius: 100%;
      width: $avatar-size;
      height: $avatar-size;
    }

    &-image {
      width: $avatar-size;
      height: $avatar-size;
      object-fit: cover;
    }
  }
}
</style>
