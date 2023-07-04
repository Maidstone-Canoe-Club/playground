<template>
  <div class="calendar-page">
    <div class="container">
      <div class="calendar-page__heading">
        <h1>{{ selectedMonthLabel }} {{ selectedYear }}</h1>
        <div class="calendar-page__controls">
          <button @click="prevMonth">
            <fa-icon icon="fa-regular fa-circle-left" />
          </button>
          <button @click="nextMonth">
            <fa-icon icon="fa-regular fa-circle-right" />
          </button>
        </div>
        <nuxt-link
          class="btn btn-outline"
          to="/events/new">
          <fa-icon icon="fa-solid fa-plus" />
          New event
        </nuxt-link>
      </div>

      <client-only>
        <month-calendar
          :date="selectedDate"
          :year="selectedYear"
          :month="selectedMonth" />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { add, sub } from "date-fns";
import { getMonthFromIndex } from "~/utils/date";

const selectedDate = ref(new Date());

// const selectedYear: Ref<number> = ref(selectedDate.value.getFullYear());
// const selectedMonth: Ref<number> = ref(selectedDate.value.getMonth());
const selectedYear = computed(() => selectedDate.value.getFullYear());
const selectedMonth = computed(() => selectedDate.value.getMonth());

const selectedMonthLabel = computed(() => getMonthFromIndex(selectedMonth.value));

function prevMonth () {
  const date = new Date();
  const foo = sub(date, {
    months: 1
  });

  selectedDate.value = sub(selectedDate.value, {
    months: 1
  });
}

function nextMonth () {
  selectedDate.value = add(selectedDate.value, {
    months: 1
  });
}

const res = await useFetch(`/api/events?month=${selectedMonth.value}`, {
  method: "GET"
});

</script>

<style lang="scss" scoped>
.calendar-page {
  &__heading {
    display: flex;
    flex-direction: row;
    align-items: center;

    justify-content: space-between;
  }

  &__controls {
    display: flex;
    gap: 1rem;
    ::v-deep(.icon) {
      font-size: 1.5rem;
    }
  }
}
</style>
