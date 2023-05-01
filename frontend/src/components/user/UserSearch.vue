<template>
  <div class="user-search">
    <input-field
      id="search-input"
      ref="searchBar"
      v-model="input"
      type="text"
      placeholder="Enter the name of the user" />
    <div
      v-if="open && ((input) || filteredResults && filteredResults.length)"
      ref="resultContainer"
      class="user-search__results">
      <div class="user-search__results-wrapper">
        <div
          v-if="loading"
          class="user-search__loading">
          <loading-spinner />
        </div>
        <div
          class="user-search__results-heading">
          {{ resultsLabel }}
        </div>
        <ul>
          <li v-for="(result, index) in filteredResults" :key="index">
            <button
              @click="selectUser(result)">
              <user-tag
                :user="result" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const open = ref(false);
const searchBar = ref(null);
const resultContainer = ref(null);

onClickOutside(resultContainer, () => {
  open.value = false;
}, { ignore: [searchBar] });

const emits = defineEmits(["selected"]);

const props = defineProps<{
  excludedUserIds?: string[]
}>();

const loading = ref(null);
const input = ref(null);
const doneSearch = ref(false);

watch(input, () => {
  doneSearch.value = false;
});

watchDebounced(input, async (val) => {
  await runSearch(val);
}, { debounce: 200 });

const { getUsers } = useDirectusUsers();

const resultsLabel = computed(() => {
  let result = `No users found for '${input.value}'`;
  if (filteredResults.value.length) {
    result = `Found ${filteredResults.value.length} user`;
    if (filteredResults.value.length !== 1) {
      result += "s";
    }
  }
  return result;
});

// const results = ref([]);

const results = ref([{
  id: "3747d9f6-45d3-48b9-8aea-27149270e372",
  first_name: "Another",
  last_name: "User",
  email: null,
  password: null,
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: null,
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: null,
  token: null,
  last_access: null,
  last_page: null,
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}, {
  id: "f5346d41-2f96-4fa8-b03a-01abbc2f15db",
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "**********",
  location: null,
  title: null,
  description: null,
  tags: null,
  avatar: "7daa5c0b-913f-4837-a7d3-835d1b19c23c",
  language: null,
  theme: "auto",
  tfa_secret: null,
  status: "active",
  role: "f12c9a0b-094b-4425-8550-03df2c892d2c",
  token: null,
  last_access: "2023-05-01T05:51:10",
  last_page: "/users",
  provider: "default",
  external_identifier: null,
  auth_data: null,
  email_notifications: true
}]);

const filteredResults = computed(() => {
  if (props.excludedUserIds && props.excludedUserIds.length) {
    return results.value.filter((u) => {
      return !props.excludedUserIds.includes(u.id);
    });
  } else {
    return results.value;
  }
});

async function runSearch (input) {
  if (input && input.length) {
    loading.value = true;
    try {
      results.value = await getUsers({
        params: {
          search: input
        }
      });
    } finally {
      loading.value = false;
    }
  } else {
    results.value = [];
  }
  doneSearch.value = true;
  open.value = true;
}

function selectUser (user) {
  emits("selected", user);
}

</script>

<style scoped lang="scss">
.user-search {
  position: relative;

  &__results {
    outline: 1px solid lightgray;
    border-radius: .5rem;
    position: absolute;
    top: calc(100%);
    left: 0;
    right: 0;
    box-shadow: 0 3px 5px -2px rgb(0, 0, 0, 0.5);
    overflow: hidden;
    background-color: #fff;

    &-wrapper {
      overflow-y: auto;
      max-height: 250px;
    }

    &-heading {
      color: gray;
      padding: .5rem 1rem;
    }
  }

  &__loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-color: rgba(1, 1, 1, .2);
    backdrop-filter: blur(2px) brightness(85%);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    button {
      width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
      padding: 0.5rem;
      background-color: #fff;
      transition: background-color .1s ease-out;

      &:hover {
        background-color: lightgray;
      }
    }

  }
}
</style>
