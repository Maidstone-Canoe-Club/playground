<template>
  <div class="calendar-page">
    <div class="container">
      <div class="calendar-page__heading">
        <h1>{{ selectedMonthLabel }} {{ selectedYear }}</h1>
        <month-calendar
          :year="selectedYear"
          :month="selectedMonth" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { getMonthFromIndex } from "~/utils/date";
import MonthCalendar from "~/components/calendar/MonthCalendar.vue";

const now = new Date();

const selectedYear: Ref<number> = ref(now.getFullYear());
const selectedMonth: Ref<number> = ref(now.getMonth());

const selectedMonthLabel = getMonthFromIndex(selectedMonth.value);

</script>

<style lang="scss" scoped>
.calendar-page {
  &__heading {
    display: flex;
    flex-direction: column;
  }
}
</style>
