﻿<template>
  <div class="lg:flex lg:h-full lg:flex-col">
    <header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        <time datetime="2022-01">{{ monthLabel }} {{ calendarStore.getYear }}</time>
      </h1>
      <div class="flex items-center">
        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <div class="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300" aria-hidden="true" />
          <button
            type="button"
            class="flex items-center justify-center rounded-l-md py-2 pr-4 pl-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            @click="calendarStore.decrementMonth(1)">
            <span class="sr-only">Previous month</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="hidden text-sm font-semibold text-gray-900 px-3.5 hover:bg-gray-50 focus:relative md:block"
            @click="calendarStore.resetDate()">
            Today
          </button>
          <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            class="flex items-center justify-center rounded-r-md py-2 pr-3 pl-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            @click="calendarStore.incrementMonth(1)">
            <span class="sr-only">Next month</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden md:ml-4 md:flex md:items-center">
          <!--          <HeadlessMenu as="div" class="relative">-->
          <!--            <HeadlessMenuButton type="button" class="flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 gap-x-1.5 hover:bg-gray-50">-->
          <!--              Month view-->
          <!--              &lt;!&ndash;              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />&ndash;&gt;-->
          <!--            </HeadlessMenuButton>-->

          <!--            <transition-->
          <!--              enter-active-class="transition duration-100 ease-out"-->
          <!--              enter-from-class="scale-95 transform opacity-0"-->
          <!--              enter-to-class="scale-100 transform opacity-100"-->
          <!--              leave-active-class="transition duration-75 ease-in"-->
          <!--              leave-from-class="scale-100 transform opacity-100"-->
          <!--              leave-to-class="scale-95 transform opacity-0">-->
          <!--              <HeadlessMenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">-->
          <!--                <div class="py-1">-->
          <!--                  <HeadlessMenuItem v-slot="{ active }">-->
          <!--                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>-->
          <!--                  </HeadlessMenuItem>-->
          <!--                  <HeadlessMenuItem v-slot="{ active }">-->
          <!--                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>-->
          <!--                  </HeadlessMenuItem>-->
          <!--                  <HeadlessMenuItem v-slot="{ active }">-->
          <!--                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>-->
          <!--                  </HeadlessMenuItem>-->
          <!--                  <HeadlessMenuItem v-slot="{ active }">-->
          <!--                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>-->
          <!--                  </HeadlessMenuItem>-->
          <!--                </div>-->
          <!--              </HeadlessMenuItems>-->
          <!--            </transition>-->
          <!--          </HeadlessMenu>-->
          <div class="ml-6 h-6 w-px bg-gray-300" />
          <nuxt-link to="/events/new" class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Add event
          </nuxt-link>
        </div>
        <HeadlessMenu as="div" class="relative ml-6 md:hidden">
          <HeadlessMenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Open HeadlessMenu</span>
            <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
          </HeadlessMenuButton>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="scale-95 transform opacity-0"
            enter-to-class="scale-100 transform opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="scale-100 transform opacity-100"
            leave-to-class="scale-95 transform opacity-0">
            <HeadlessMenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <div class="py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <nuxt-link to="/events/new" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                    Add event
                  </nuxt-link>
                </HeadlessMenuItem>
              </div>
              <div class="py-1">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    type="button"
                    class="w-full text-left"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                    @click="calendarStore.resetDate()">
                    Go to today
                  </button>
                </HeadlessMenuItem>
              </div>
              <!--              <div class="py-1">-->
              <!--                <HeadlessMenuItem v-slot="{ active }">-->
              <!--                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Day view</a>-->
              <!--                </HeadlessMenuItem>-->
              <!--                <HeadlessMenuItem v-slot="{ active }">-->
              <!--                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Week view</a>-->
              <!--                </HeadlessMenuItem>-->
              <!--                <HeadlessMenuItem v-slot="{ active }">-->
              <!--                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Month view</a>-->
              <!--                </HeadlessMenuItem>-->
              <!--                <HeadlessMenuItem v-slot="{ active }">-->
              <!--                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Year view</a>-->
              <!--                </HeadlessMenuItem>-->
              <!--              </div>-->
            </HeadlessMenuItems>
          </transition>
        </HeadlessMenu>
      </div>
    </header>
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div class="bg-white py-2">
          M<span class="sr-only sm:not-sr-only">on</span>
        </div>
        <div class="bg-white py-2">
          T<span class="sr-only sm:not-sr-only">ue</span>
        </div>
        <div class="bg-white py-2">
          W<span class="sr-only sm:not-sr-only">ed</span>
        </div>
        <div class="bg-white py-2">
          T<span class="sr-only sm:not-sr-only">hu</span>
        </div>
        <div class="bg-white py-2">
          F<span class="sr-only sm:not-sr-only">ri</span>
        </div>
        <div class="bg-white py-2">
          S<span class="sr-only sm:not-sr-only">at</span>
        </div>
        <div class="bg-white py-2">
          S<span class="sr-only sm:not-sr-only">un</span>
        </div>
      </div>
      <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">
          <div
            v-for="day in days"
            :key="day.date + '-day'"
            class="min-h-[80px]"
            :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative px-3 py-2']">
            <time :datetime="day.date" :class="day.isToday ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
            <ol v-if="day.events.length > 0" class="mt-2">
              <li v-for="event in day.events.slice(0, 2)" :key="event.id">
                <nuxt-link :to="event.href" class="flex group">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {{ event.name }}
                  </p>
                  <time :datetime="event.datetime" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">{{ event.time }}</time>
                </nuxt-link>
              </li>
              <li v-if="day.events.length > 2" class="text-gray-500">
                + {{ day.events.length - 2 }} more
              </li>
            </ol>
          </div>
        </div>
        <div class="isolate grid w-full grid-cols-7 gap-px lg:hidden">
          <button
            v-for="day in days"
            :key="day.date + '-day-small'"
            type="button"
            :class="[day.isCurrentMonth ? 'bg-white' : 'bg-gray-50', (day.isSelected || day.isToday) && 'font-semibold', day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-indigo-600', !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900', !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500', 'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10']"
            @click="selectDay(day)">
            <time :datetime="day.date" :class="[day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full', day.isSelected && day.isToday && 'bg-indigo-600', day.isSelected && !day.isToday && 'bg-gray-900', 'ml-auto']">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
            <span class="sr-only">{{ day.events.length }} events</span>
            <span v-if="day.events.length > 0" class="mt-auto flex flex-wrap-reverse -mx-0.5">
              <span v-for="event in day.events" :key="event.id" class="mb-1 rounded-full bg-gray-400 mx-0.5 h-1.5 w-1.5" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="selectedDay?.events.length > 0" class="py-10 sm:px-6 lg:hidden">
      <ol class="overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
        <li v-for="event in selectedDay.events" :key="event.id" class="flex p-4 pr-6 group focus-within:bg-gray-50 hover:bg-gray-50">
          <div class="flex-auto">
            <p class="font-semibold text-gray-900">
              {{ event.name }}
            </p>
            <time :datetime="event.datetime" class="mt-2 flex items-center text-gray-700">
              <!--                  <ClockIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />-->
              {{ event.time }}
            </time>
          </div>
          <nuxt-link
            :to="event.href"
            class="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 group-hover:opacity-100 hover:ring-gray-400 focus:opacity-100">
            View<span class="sr-only">, {{ event.name }}</span>
          </nuxt-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";
import { format, getISODay, setDefaultOptions } from "date-fns";
import { Touch } from "vscode-jsonrpc/lib/common/linkedMap";
import enGB from "date-fns/locale/en-GB/index.js";
import { useCalendarStore } from "~/stores/calendarStore";
import { EventItem } from "~/types";

setDefaultOptions({
  locale: enGB,
  weekStartsOn: 1
});

const props = defineProps<{
  events: EventItem[]
}>();

const calendarStore = useCalendarStore();
calendarStore.$subscribe((mutation, state) => {
  prepareMonths();
  generateDays();
});

const monthLabel = ref();

const prepareMonths = () => {
  monthLabel.value = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(
    new Date(
      calendarStore.getYear,
      calendarStore.getMonth,
      calendarStore.getDay
    )
  );
};

type EventData = {
  id: number,
  name: string,
  time: string,
  datetime: string,
  href: string
}

type Day = {
  date: Date | string,
  events: EventData[],
  isCurrentMonth?: boolean,
  isToday?: boolean,
  isSelected?: boolean
}

const days = ref<Day[]>([]);

function getEventsForDay (date: Date): EventData[] {
  return props.events.filter((e) => {
    return new Date(e.start_date).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
  })
    .map((e) => {
      const date = new Date(e.start_date);
      console.log("e", e, e.parent_event || e.id);
      return {
        id: e.id,
        name: e.title,
        time: format(date, "H:mmaa"),
        datetime: `${format(date, "yyyy-MM-dd")}T${format(date, "H:mm")}`,
        href: `/events/${e.parent_event || e.id}`
      };
    });
}

function generateDays () {
  days.value = [];

  const firstDayOfMonth = getISODay(new Date(calendarStore.getYear, calendarStore.getMonth, 1)) - 1;
  const daysInCurrentMonth = new Date(calendarStore.getYear, calendarStore.getMonth + 1, 0).getDate();
  const totalGrid = firstDayOfMonth <= 5 ? 35 : 42;
  const lastMonthDays = totalGrid - daysInCurrentMonth - firstDayOfMonth;

  for (let i = firstDayOfMonth; i > 0; i--) {
    const date = new Date(calendarStore.getYear, calendarStore.getMonth, 0);
    date.setDate(date.getDate() - i);
    days.value.push({
      date: format(date, "yyyy-MM-dd"),
      events: []
    });
  }

  for (let i = 0; i < daysInCurrentMonth; i++) {
    const date = new Date(calendarStore.getYear, calendarStore.getMonth, i + 1);
    const isToday = date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    days.value.push({
      date: format(date, "yyyy-MM-dd"),
      events: getEventsForDay(date),
      isCurrentMonth: true,
      isSelected: isToday,
      isToday
    });
  }

  const lastDayOfMonth = getISODay(new Date(calendarStore.getYear, calendarStore.getMonth, daysInCurrentMonth));
  const count = 7 - lastDayOfMonth;
  if (count !== 7) {
    for (let i = 0; i < count; i++) {
      const date = new Date(calendarStore.getYear, calendarStore.getMonth, i + 1);
      days.value.push({
        date: format(date, "yyyy-MM-dd"),
        events: []
      });
    }
  }
}

function selectDay (day: Day) {
  if (selectedDay.value) {
    selectedDay.value.isSelected = false;
  }
  day.isSelected = true;
}

const selectedDay = computed(() => days.value.find(day => day.isSelected));

watch(() => props.events, () => {
  generateDays();
}, { immediate: true, deep: true });

onMounted(() => {
  prepareMonths();
});

onUpdated(() => {
});
</script>

<style scoped lang="scss">
.calendar {
  user-select: none;

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }

  &__days {
    font-weight: 700;
    padding: .5rem 0;
    text-align: center;
  }

  &__day {
    outline: 1px solid #d3d3d3;
    min-height: 150px;
    font-weight: 700;
    background: #fff;

    &:first-child{
      border-top-left-radius: .5rem;
    }

    &:nth-child(7){
      border-top-right-radius: .5rem;
    }

    &:nth-last-child(7){
      border-bottom-left-radius: .5rem;
    }

    &:last-child{
      border-bottom-right-radius: .5rem;
    }

    &-content {
      text-align: center;
      display: flex;
      gap: .5rem;
      flex-direction: column;
      padding: 0 .25rem;
    }

    &--today {
      background-color: #f3f3f3;
    }

    &--bounds {
      //outline: 1px solid green;
    }
  }

  &__event {
    @media ( max-width: 767px ) {
      display: none;
    }

    &-item{
      background-color: var(--color-primary-500);
      color: #fff;
      border-radius: .25rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: .1rem .25rem;
    }

    &-title {
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: normal;
    }
  }

  &__mobile-nav {
    @media ( min-width: 767px ) {
      display: none;
    }
  }
}
</style>
