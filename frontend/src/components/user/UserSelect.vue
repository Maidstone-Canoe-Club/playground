<template>
  <div class="user-select">
    <strong>User select</strong>

    <div class="user-select__selected">
      <ul v-if="selectedUsers && selectedUsers.length">
        <li
          v-for="(user, index) in selectedUsers"
          :key="index"
          class="user-select__selected-user">
          <button @click="onUserRemove(user)">
            <user-tag :user="user" />
            <fa-icon icon="fa-solid fa-xmark" />
          </button>
        </li>
      </ul>
    </div>

    <div class="user-select__search">
      <user-search
        :excluded-user-ids="excludedUserIds"
        @selected="onUserSelected" />
    </div>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  selectMultiple?: boolean
}>(), {
  selectMultiple: false
});

const selectedUsers = ref([]);
const excludedUserIds = computed(() => {
  return selectedUsers.value.map(u => u.id);
});

function onUserRemove (user) {
  selectedUsers.value = selectedUsers.value.filter(u => u.id !== user.id);
}

function onUserSelected (user) {
  selectedUsers.value.push(user);
}

</script>

<style scoped lang="scss">
.user-select {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: .5rem;
    flex-wrap: wrap;
  }

  &__selected-user {
    //border: 1px solid lightgray;
    //display: flex;
    //flex-direction: row;
    //align-items: center;
    //gap: .5rem;
    //border-radius: .5rem;

    button {
      border: 1px solid lightgray;
      border-radius: .5rem;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      gap: .5rem;
      align-items: center;
      padding: 0 .25rem;

      //height: 100%;
      //aspect-ratio: 1;
      //background-color: #fff;
      //border: none;
      //border-radius: .5rem;
    }
  }
}
</style>
