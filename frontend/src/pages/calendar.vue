<template>
  <div class="calendar-page">
    <div class="container">
      <div class="calendar-page__heading">
        <h1>{{ selectedMonthLabel }} {{ selectedYear }}</h1>
        <nuxt-link
          class="btn btn-outline"
          to="/events/new">
          <fa-icon icon="fa-solid fa-plus" />
          New event
        </nuxt-link>
      </div>

      <client-only>
        <month-calendar
          :year="selectedYear"
          :month="selectedMonth" />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { getMonthFromIndex } from "~/utils/date";

const now = new Date();

const selectedYear: Ref<number> = ref(now.getFullYear());
const selectedMonth: Ref<number> = ref(now.getMonth());

const selectedMonthLabel = getMonthFromIndex(selectedMonth.value);

</script>

<style lang="scss" scoped>
.calendar-page {
  &__heading {
    display: flex;
    flex-direction: row;
    align-items: center;

    justify-content: space-between;
  }
}
</style>
