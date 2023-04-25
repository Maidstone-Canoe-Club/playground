<template>
  <div class="calendar">
    <div
      v-for="(week, weekIndex) in weeks"
      :key="weekIndex"
      class="week">
      <div
        v-for="(day, dayIndex) in week.days"
        :key="dayIndex"
        class="day">
        <span>{{ day.label }}</span>
        <span>{{ (day.dayOfMonth + "" + getDayOrdinal(day.dayOfMonth)) }}</span>
        <div
          v-if="day.events.length"
          class="day__events"
          :style="getDayItemStyling(day)">
          <div
            v-for="(event, eventIndex) in day.events"
            :key="eventIndex"
            class="day__event-item"
            :style="getSpanStyling(event)">
            <span
              class="day__event-item-label"
              :style="getLabelStyling(event)">
              {{ event.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getDaysInMonth, getISODay, startOfMonth, getWeekOfMonth, intervalToDuration,
  setDefaultOptions
} from "date-fns";
import { dayOfWeekLabel, getDayOrdinal } from "~/utils/date";

const props = defineProps<{
  month: number,
  year: number
}>();

const weeks = ref([]);

setDefaultOptions({
  locale: {
    code: "en-GB"
  },
  weekStartsOn: 1
});

const startDate = startOfMonth(new Date());
const startDayOfTheWeek = getISODay(startDate) - 1;

const monthLengthInDays = getDaysInMonth(props.month);
const weeksInMonth = Math.ceil(monthLengthInDays / 7);

for (let i = 0; i < weeksInMonth; i++) {
  const weekData = {
    index: i,
    days: []
  };

  for (let j = 0; j < 7; j++) {
    weekData.days.push({
      index: j,
      label: dayOfWeekLabel(j),
      dayOfMonth: (i * 7) + j + 1 - startDayOfTheWeek,
      topPush: 0,
      events: []
    });
  }

  weeks.value.push(weekData);
}

const events = [];

addEvent({
  name: "The First Multi Day Event",
  startDate: new Date("2023-04-04"),
  endDate: new Date("2023-04-19"),
  color: "#ed6161"
});

addEvent({
  name: "The First Multi Day Event",
  startDate: new Date("2023-04-05"),
  endDate: new Date("2023-04-11"),
  color: "#9ded61"
});

addEvent({
  name: "A second multi day event",
  startDate: new Date("2023-04-06"),
  endDate: new Date("2023-04-10"),
  color: "#6199ed"
});

addEvent({
  name: "single",
  startDate: new Date("2023-04-08"),
  endDate: new Date("2023-04-08"),
  color: "#ed61e8"
});
addEvent({
  name: "single",
  startDate: new Date("2023-04-08"),
  endDate: new Date("2023-04-08"),
  color: "#ed61e8"
});

function addEvent (eventData) {
  const spannedDays = getSpannedEventsForDate(eventData.startDate);
  events.push(eventData);

  const startWeek = getWeekOfMonth(eventData.startDate);
  const endWeek = getWeekOfMonth(eventData.endDate);
  const startDayOfWeek = getISODay(eventData.startDate) - 1;
  const endDayOfWeek = getISODay(eventData.endDate);

  const durationInDays = intervalToDuration({
    start: eventData.startDate,
    end: eventData.endDate
  }).days + 1;

  if (durationInDays > 1) {
    const weeksSpanned = (endWeek - startWeek) + 1;

    if (weeksSpanned > 1) {
      weeks.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
      weeks.value[startWeek - 1].days[startDayOfWeek].events.push({
        label: eventData.name,
        spanLength: 7 - startDayOfWeek,
        color: eventData.color
      });

      for (let i = 1; i < weeksSpanned - 1; i++) {
        weeks.value[startWeek + i - 1].days[0].events.push({
          label: `(cont) ${eventData.name}`,
          spanLength: 7,
          color: eventData.color
        });
      }

      weeks.value[endWeek - 1].days[0].events.push({
        label: `(cont) ${eventData.name}`,
        spanLength: endDayOfWeek,
        color: eventData.color
      });
    } else {
      weeks.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
      weeks.value[startWeek - 1].days[startDayOfWeek].events.push({
        label: eventData.name,
        spanLength: durationInDays,
        color: eventData.color
      });
    }
  } else {
    weeks.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
    weeks.value[startWeek - 1].days[startDayOfWeek].events.push({
      label: eventData.name,
      color: eventData.color
    });
  }
}

function getSpannedEventsForDate (date: Date) {
  let result = 0;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    if (date > event.startDate && date < event.endDate) {
      const durationInDays = intervalToDuration({
        start: event.startDate,
        end: event.endDate
      }).days;

      if (durationInDays > 1) {
        result++;
      }
    }
  }
  return result;
}

function getDayItemStyling (day) {
  const result = {
    paddingTop: "0"
  };

  if (day.topPush) {
    result.paddingTop = `${17 * day.topPush}px`;
  }

  return result;
}

function getSpanStyling (event) {
  const result = {
    width: "100%"
  };

  if (event.spanLength) {
    result.width = `${100 * event.spanLength}%`;
  }

  return result;
}

function getLabelStyling (event) {
  return {
    backgroundColor: event.color,
    borderLeftColor: `darken(${event.color}, 10%)`
  };
}

</script>

<style lang="scss" scoped>
.calendar {
  border: 1px solid lightgray;
  border-top: none;
  border-left: none;

  .week {
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7));
  }

  .day {
    outline: 1px solid lightgray;
    border-right: none;
    border-bottom: none;
    left: 1px;
    width: 100%;
    min-height: 100px;

    &__events {
      display: flex;
      flex-direction: column;
      gap: .1rem;
    }

    &__event-item {
      display: flex;
      flex-direction: column;
      min-width: 0;
      padding: 0 .25rem;

      &-time {
        font-size: .7rem;
        padding-left: .3rem;
        line-height: 1;
      }

      &-label {
        background-color: #b1d5ff;
        border-left: 5px solid red;
        font-weight: 700;
        font-size: .7rem;
        padding: 0 .5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 15px;
        line-height: 15px;
        z-index: 10;
        transition: background-color .2s ease-out;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
