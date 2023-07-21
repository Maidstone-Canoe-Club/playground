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
      v-for="(week, weekIndex) in weeksData"
      :key="weekIndex"
      class="week">
      <div
        v-for="(day, dayIndex) in week.days"
        :key="dayIndex"
        :class="{'day--today': day.isToday, 'day--last-month': !day.isThisMonth}"
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
                'day__event-item-label--in-past': event.inThePast && !event.hoverController.hovering,
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
  setDefaultOptions, addMonths, endOfMonth, format
} from "date-fns";
import { enGB } from "date-fns/locale";
import { dayOfWeekLabel, getDayOrdinal, days } from "~/utils/date";
import { EventItem } from "~/types";

const props = defineProps<{
  date: Date,
  month: number,
  year: number
}>();

const itemIsBeingHovered = ref(false);
// const weeks = ref([]);

setDefaultOptions({
  locale: enGB,
  weekStartsOn: 1
});

const events = ref<EventItem[]>([]);
const weeksData = ref([]);

const now = new Date();

const startDate = computed(() => startOfMonth(props.date));
const startDayOfTheWeek = computed(() => getISODay(startDate.value) - 1);

const monthLengthInDays = computed(() => getDaysInMonth(props.month));
const weeksInMonth = computed(() => Math.ceil(monthLengthInDays.value / 7));
const lastMonthDays = computed(() => getDaysInMonth(addMonths(startDate.value, -1)));

function onItemMouseOver (event) {
  itemIsBeingHovered.value = true;
  event.hoverController.hovering = true;
}

function onItemMouseLeave (event) {
  itemIsBeingHovered.value = false;
  event.hoverController.hovering = false;
}

/**
 * Loading Events
 *
 * Load events with a start and end date between the current date
 * Or events with no end date and a start date before today
 *
 */

const { getItems } = useDirectusItems();

const thingEvents = ref(null);

const fetchEvents = async () => {
  try {
    const filters = {
      _and: [
        {
          start_date: { _lte: format(endOfMonth(props.date), "yyyy-MM-dd") }
        },
        {
          _or: [
            {
              end_date: { _gt: format(startOfMonth(props.date), "yyyy-MM-dd") }
            },
            {
              end_date: { _null: true }
            },
            {
              is_recurring: { _eq: true }
            }
          ]
        }
      ]
    };
    return await getItems<EventItem>({
      collection: "events",
      params: { filter: filters }
    });
  } catch (e) {
    console.error("error loading events", e);
  }
};

watch(() => props.date, async (val) => {
  console.log("month has changed", val);
  events.value = [];
  weeksData.value = generateWeekData();

  const foundEvents: EventItem[] | undefined = await fetchEvents();

  // const foundEvents = await useFetch("/api/events", {
  //   query: {
  //     start: format(startOfMonth(props.date), "yyyy-MM-dd"),
  //     end: format(endOfMonth(props.date), "yyyy-MM-dd")
  //   }
  // });

  console.log("loaded event data", events);
  if (foundEvents && foundEvents.length) {
    foundEvents.sort((a, b) => {
      return new Date(b.start_date) - new Date(a.start_date);
    }).forEach((e) => {
      e.start_date = new Date(e.start_date);
      e.end_date = new Date(e.end_date);
      e.color = "red";
      addEvent(e);
    });
  }
}, { immediate: true });

function generateWeekData () {
  const result = [];

  const daysInMonth = getDaysInMonth(startDate.value);
  const sameMonthAndYear = now.getMonth() === props.month && now.getFullYear() === props.year;

  for (let i = 0; i < weeksInMonth.value; i++) {
    const weekData = {
      index: i,
      days: []
    };

    for (let j = 0; j < 7; j++) {
      const dayOfMonth = (i * 7) + j + 1 - startDayOfTheWeek.value;

      weekData.days.push({
        index: j,
        label: dayOfMonth > 0
          ? (dayOfMonth > daysInMonth ? dayOfMonth - daysInMonth : dayOfMonth)
          : (dayOfMonth + lastMonthDays.value),
        topPush: 0,
        events: [],
        dayOfMonth,
        isThisMonth: dayOfMonth >= 1 && dayOfMonth <= daysInMonth,
        isToday: sameMonthAndYear && dayOfMonth === new Date().getDate()
      });
    }

    result.push(weekData);
  }
  return result;
}

// const weeks = computed(() => {
//   const result = [];
//
//   const daysInMonth = getDaysInMonth(startDate.value);
//   const sameMonthAndYear = now.getMonth() === props.month && now.getFullYear() === props.year;
//
//   for (let i = 0; i < weeksInMonth.value; i++) {
//     const weekData = {
//       index: i,
//       days: []
//     };
//
//     for (let j = 0; j < 7; j++) {
//       const dayOfMonth = (i * 7) + j + 1 - startDayOfTheWeek.value;
//
//       weekData.days.push({
//         index: j,
//         label: dayOfMonth > 0
//           ? (dayOfMonth > daysInMonth ? dayOfMonth - daysInMonth : dayOfMonth)
//           : (dayOfMonth + lastMonthDays.value),
//         topPush: 0,
//         events: [],
//         dayOfMonth,
//         isThisMonth: dayOfMonth >= 1 && dayOfMonth <= daysInMonth,
//         isToday: sameMonthAndYear && dayOfMonth === new Date().getDate()
//       });
//     }
//
//     result.push(weekData);
//   }
//   return result;
// });

// TODO: List of events should be ordered by startDate
// addEvent({
//   title: "Event into next month",
//   start_date: new Date("2023-06-20"),
//   end_date: new Date("2023-08-30"),
//   color: "#ed61e8"
// });
// addEvent({
//   title: "An event from last month",
//   start_date: new Date("2023-006-26"),
//   end_date: new Date("2023-07-01"),
//   color: "#ed6161"
// });
//
// addEvent({
//   title: "The First Multi Day Event",
//   start_date: new Date("2023-07-04"),
//   end_date: new Date("2023-07-08"),
//   color: "#ed6161"
// });
// addEvent({
//   title: "The First Multi Day Event",
//   start_date: new Date("2023-07-05"),
//   end_date: new Date("2023-07-11"),
//   color: "#9ded61"
// });
// //
// addEvent({
//   title: "A second multi day event",
//   start_date: new Date("2023-07-06"),
//   end_date: new Date("2023-07-10"),
//   color: "#6199ed"
// });
// addEvent({
//   title: "Single day",
//   start_date: new Date("2023-07-08"),
//   end_date: new Date("2023-07-08"),
//   color: "#ed61e8"
// });
// //
// addEvent({
//   title: "Single day",
//   start_date: new Date("2023-07-22"),
//   end_date: new Date("2023-07-22"),
//   color: "#ed61e8"
// });
// addEvent({
//   title: "Single day",
//   start_date: new Date("2023-07-22"),
//   end_date: new Date("2023-08-22"),
//   color: "#ed61e8"
// });

function addEvent (eventData: EventItem) {
  console.log("ADDING EVENT", eventData);
  const spannedDays = getSpannedEventsForDate(eventData.start_date);
  events.value.push(eventData);

  let startWeek = getWeekOfMonth(eventData.start_date);
  const startMonth = eventData.start_date.getMonth();
  const startYear = eventData.start_date.getFullYear();
  const endWeek = eventData.end_date ? getWeekOfMonth(eventData.end_date) : null;
  const endMonth = eventData.end_date?.getMonth();
  const endYear = eventData.end_date?.getFullYear();
  let startDayOfWeek = getISODay(eventData.start_date) - 1;
  const endDayOfWeek = eventData.end_date ? getISODay(eventData.end_date) : null;
  const inThePast = eventData.end_date < Date.now();

  if (endMonth < props.month || endYear < props.year) {
    return;
  }

  if (startMonth > props.month || startYear > props.year) {
    return;
  }

  let durationInDays = intervalToDuration({
    start: eventData.start_date,
    end: eventData.end_date
  }).days + 1;

  // rename start_date to current selected date/month
  if (eventData.start_date.getMonth() < startDate.value.getMonth()) {
    startWeek = startWeek - weeksInMonth.value + 1;
    startDayOfWeek = 0;
    durationInDays = endDayOfWeek;
  }

  const weeksSpanned = (endWeek - startWeek) + 1;

  const hoverController = {
    hovering: false
  };

  if (weeksSpanned > 1) {
    if (startWeek - 1 >= 0) {
      weeksData.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
      weeksData.value[startWeek - 1].days[startDayOfWeek].events.push({
        label: eventData.title,
        spanLength: 7 - startDayOfWeek,
        color: eventData.color,
        spanWrapsEnd: true,
        hoverController,
        inThePast
      });
    }

    for (let i = 1; i < weeksSpanned - 1; i++) {
      if (startWeek + i - 1 >= 0) {
        weeksData.value[startWeek + i - 1].days[0].events.push({
          label: `(cont) ${eventData.title}`,
          spanLength: 7,
          color: eventData.color,
          hoverController,
          spanWrapsStart: true,
          spanWrapsEnd: true,
          inThePast
        });
      }
    }

    let endWeekDuration = endDayOfWeek;
    let spanWrapsEnd = false;
    if (eventData.end_date.getMonth() > startDate.value.getMonth()) {
      endWeekDuration = 7;
      spanWrapsEnd = true;
    }

    weeksData.value[endWeek - 1].days[0].events.push({
      label: `(cont) ${eventData.title}`,
      spanLength: endWeekDuration,
      color: eventData.color,
      spanWrapsStart: true,
      spanWrapsEnd,
      hoverController,
      inThePast
    });
  } else if (weeksSpanned < 0) {
    weeksData.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
    weeksData.value[startWeek - 1].days[startDayOfWeek].events.push({
      label: eventData.title,
      spanLength: 7 - startDayOfWeek,
      color: eventData.color,
      hoverController,
      inThePast
    });
  } else if (startWeek - 1 >= 0) {
    console.log("adding event for week", startWeek - 1, "for day", startDayOfWeek, " for ", durationInDays, "days");
    weeksData.value[startWeek - 1].days[startDayOfWeek].topPush = spannedDays;
    weeksData.value[startWeek - 1].days[startDayOfWeek].events.push({
      label: eventData.title,
      spanLength: durationInDays,
      color: eventData.color,
      hoverController,
      inThePast
    });
  }
}

function getSpannedEventsForDate (date: Date) {
  let result = 0;
  for (let i = 0; i < events.value.length; i++) {
    const event = events.value[i];

    if (date > event.start_date && date <= event.end_date) {
      const durationInDays = intervalToDuration({
        start: event.start_date,
        end: event.end_date
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
  user-select: none;

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

        &--in-past {
          background-color: lighten(desaturate($primary-color, 10%), 25%);
        }

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
