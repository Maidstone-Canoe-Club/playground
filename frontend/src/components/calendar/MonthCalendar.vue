<template>
  <div class="calendar">
    <div class="week">
      <div
        v-for="(day, columnIndex) in days"
        :key="columnIndex"
        class="day-column">
        {{ day }}
      </div>
    </div>
    <div
      v-for="(week, weekIndex) in weeks"
      :key="weekIndex"
      class="week">
      <div
        v-for="(day, dayIndex) in week.days"
        :key="dayIndex"
        :class="{'day--today': day.isToday, 'day--last-month': day.lastMonth}"
        class="day">
        <span class="day__label">{{ day.label }}</span>
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
              :class="{
                'day__event-item-label--hovering': event.hoverController.hovering,
                'day__event-item-label--no-hovering': itemIsBeingHovered && !event.hoverController.hovering,
                'day__event-item-label--wrap-start': event.spanWrapsStart,
                'day__event-item-label--wrap-end': event.spanWrapsEnd
              }"
              :style="getLabelStyling(event)"
              @mouseover="onItemMouseOver(event)"
              @mouseleave="onItemMouseLeave(event)">
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
  setDefaultOptions, addMonths
} from "date-fns";
import { dayOfWeekLabel, getDayOrdinal, days } from "~/utils/date";

const props = defineProps<{
  month: number,
  year: number
}>();

const itemIsBeingHovered = ref(false);
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
const lastMonthDays = getDaysInMonth(addMonths(startDate, -1));

function onItemMouseOver (event) {
  itemIsBeingHovered.value = true;
  event.hoverController.hovering = true;
}

function onItemMouseLeave (event) {
  itemIsBeingHovered.value = false;
  event.hoverController.hovering = false;
}

for (let i = 0; i < weeksInMonth; i++) {
  const weekData = {
    index: i,
    days: []
  };

  for (let j = 0; j < 7; j++) {
    const dayOfMonth = (i * 7) + j + 1 - startDayOfTheWeek;
    weekData.days.push({
      index: j,
      label: dayOfMonth > 0
        ? dayOfMonth
        : (dayOfMonth + lastMonthDays),
      topPush: 0,
      events: [],
      dayOfMonth,
      lastMonth: dayOfMonth < 1,
      isToday: dayOfMonth === new Date().getDate()
    });
  }

  weeks.value.push(weekData);
}

const events = [];

addEvent({
  name: "The First Multi Day Event",
  startDate: new Date("2023-04-04"),
  endDate: new Date("2023-04-08"),
  color: "#ed6161"
});
addEvent({
  name: "The First Multi Day Event",
  startDate: new Date("2023-04-05"),
  endDate: new Date("2023-04-11"),
  color: "#9ded61"
});
//
addEvent({
  name: "A second multi day event",
  startDate: new Date("2023-04-06"),
  endDate: new Date("2023-04-10"),
  color: "#6199ed"
});
addEvent({
  name: "Single day",
  startDate: new Date("2023-04-08"),
  endDate: new Date("2023-04-08"),
  color: "#ed61e8"
});
//
addEvent({
  name: "Single day",
  startDate: new Date("2023-04-22"),
  endDate: new Date("2023-04-22"),
  color: "#ed61e8"
});
addEvent({
  name: "Single day",
  startDate: new Date("2023-04-22"),
  endDate: new Date("2023-04-22"),
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

  const weeksSpanned = (endWeek - startWeek) + 1;

  const hoverController = {
    hovering: false
  };

  if (weeksSpanned > 1) {
    weeks.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
    weeks.value[startWeek - 1].days[startDayOfWeek].events.push({
      label: eventData.name,
      spanLength: 7 - startDayOfWeek,
      color: eventData.color,
      spanWrapsEnd: true,
      hoverController
    });

    for (let i = 1; i < weeksSpanned - 1; i++) {
      weeks.value[startWeek + i - 1].days[0].events.push({
        label: `(cont) ${eventData.name}`,
        spanLength: 7,
        color: eventData.color,
        hoverController
      });
    }

    weeks.value[endWeek - 1].days[0].events.push({
      label: `(cont) ${eventData.name}`,
      spanLength: endDayOfWeek,
      color: eventData.color,
      spanWrapsStart: true,
      hoverController
    });
  } else {
    weeks.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
    weeks.value[startWeek - 1].days[startDayOfWeek].events.push({
      label: eventData.name,
      spanLength: durationInDays,
      color: eventData.color,
      hoverController
    });
  }
}

function getSpannedEventsForDate (date: Date) {
  let result = 0;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    if (date > event.startDate && date <= event.endDate) {
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
    result.paddingTop = `calc(${23 * day.topPush}px)`;
  }

  return result;
}

function getSpanStyling (event) {
  const result = {
    width: "100%"
  };

  if (event.spanLength) {
    // item widths x double the item padding - 1 item padding
    const dayItemPadding = 0.5;
    result.width = `calc(${100 * event.spanLength}% + ${event.spanLength * dayItemPadding}rem - ${dayItemPadding}rem)`;
  }

  return result;
}

function getLabelStyling (event) {
  return {
    // backgroundColor: event.color,
    // borderLeftColor: `darken(${event.color}, 10%)`
  };
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.calendar {
  .week {
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7));

    &:nth-child(2) {
      & > .day:nth-child(1) {
        border-top-left-radius: .5rem;
      }

      & > .day:nth-child(7) {
        border-top-right-radius: .5rem;
      }
    }

    &:nth-child(6) {
      & > .day:nth-child(1) {
        border-bottom-left-radius: .5rem;
      }

      & > .day:nth-child(7) {
        border-bottom-right-radius: .5rem;
      }
    }
  }

  .day-column {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    padding: .5rem;
  }

  .day {
    outline: 1px solid lightgray;
    width: 100%;
    min-height: 100px;
    background-color: #fff;
    padding: .25rem .25rem .5rem;
    font-weight: 700;

    &--today {
      background-color: #f3f3f3;
    }

    &--last-month {
      color: gray;
      font-weight: inherit;
    }

    &__label {
      display: block;
      margin-bottom: .5rem;
      padding-left: .5rem;
    }

    &__events {
      display: flex;
      flex-direction: column;
      gap: .1rem;
    }

    &__event-item {
      display: flex;
      flex-direction: column;
      min-width: 0;

      &-time {
        font-size: .7rem;
        padding-left: .3rem;
        line-height: 1;
      }

      &-label {
        background-color: $primary-color;
        color: #fff;
        border-radius: .25rem;
        font-weight: 700;
        font-size: .7rem;
        padding: 0 .3rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 21px;
        z-index: 10;
        transition: background-color .2s ease-out;

        &--no-hovering {
          background-color: lighten(desaturate($primary-color, 10%), 25%);
        }

        &--wrap-start {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        &--wrap-end {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
