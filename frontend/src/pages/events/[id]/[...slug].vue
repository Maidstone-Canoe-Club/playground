<template>
  <div class="event-page">
    <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {{ event.title }}
        </h1>
      </div>

      <!-- Options -->
      <div class="mt-4 lg:row-span-3 lg:mt-0">
        <h2 class="sr-only">
          Event information
        </h2>
        <p
          v-if="event.price"
          class="text-3xl tracking-tight text-gray-900">
          {{ renderPrice(event.price) }}
        </p>

        <div class="mt-10">
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900">
              Location
            </h3>
            <span>Maidstone Canoe Club</span>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-900">
              Attendees
            </h3>
            <span>8 max attendees</span>
          </div>

          <template v-if="alreadyBooked">
            <div class="w-full flex justify-center items-center gap-2 mt-10 px-8 py-3">
              You're booked!
              <HandThumbUpIcon class="w-6 h-6" />
            </div>
          </template>
          <template v-else>
            <form
              v-if="!!event.price"
              :action="paymentUrl"
              method="post">
              <button
                type="submit"
                class="mt-10 font-semibold flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Pay now
              </button>
            </form>
            <button
              v-else
              type="submit"
              class="mt-10 font-semibold flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Book now
            </button>
          </template>
        </div>

        <!--        <div class="relative mt-8 mb-8">-->
        <!--          <div class="absolute inset-0 flex items-center" aria-hidden="true">-->
        <!--            <div class="w-full border-t border-gray-300" />-->
        <!--          </div>-->
        <!--          <div class="relative flex justify-start">-->
        <!--            <span class="bg-[#F9FBFC] pr-2 text-sm text-gray-500">Attendees</span>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div>-->
        <!--          <ul role="list" class="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">-->
        <!--            <li-->
        <!--              v-for="person in people"-->
        <!--              :key="person.email"-->
        <!--              class="flex items-center justify-between py-3">-->
        <!--              <div class="flex items-center">-->
        <!--                <img :src="person.imageUrl" alt="" class="h-8 w-8 rounded-full">-->
        <!--                <p class="ml-4 text-sm font-medium text-gray-900">-->
        <!--                  {{ person.name }}-->
        <!--                </p>-->
        <!--              </div>-->
        <!--              <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">-->
        <!--                View<span class="sr-only"> Aimee Douglas</span>-->
        <!--              </button>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </div>-->
      </div>

      <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <!-- Description and details -->
        <div>
          <h3 class="sr-only">
            Description
          </h3>

          <div class="space-y-6">
            <rich-text
              class="text-base text-gray-900"
              :content="event.description" />
          </div>

          <strong>Attendees</strong>
          <div class="flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="person in people" :key="person.email">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {{ person.name }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ person.email }}
                      </td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, {{ person.name }}</span></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!--        <div class="mt-10">-->
        <!--          <h3 class="text-sm font-medium text-gray-900">-->
        <!--            Highlights-->
        <!--          </h3>-->

        <!--          <div class="mt-4">-->
        <!--            <ul role="list" class="list-disc space-y-2 pl-4 text-sm">-->
        <!--              &lt;!&ndash;              <li v-for="highlight in product.highlights" :key="highlight" class="text-gray-400">&ndash;&gt;-->
        <!--              &lt;!&ndash;                <span class="text-gray-600">{{ highlight }}</span>&ndash;&gt;-->
        <!--              &lt;!&ndash;              </li>&ndash;&gt;-->
        <!--            </ul>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="mt-10">-->
        <!--          <h2 class="text-sm font-medium text-gray-900">-->
        <!--            Details-->
        <!--          </h2>-->

        <!--          <div class="mt-4 space-y-6">-->
        <!--            <p class="text-sm text-gray-600" />-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>

    <!--    <h1 class="mb-4 text-4xl font-bold text-gray-700">-->
    <!--      {{ event.title }}-->
    <!--    </h1>-->
    <!--    <div v-html="event.description" />-->
    <!--    <template v-if="user">-->
    <!--      <template v-if="alreadyBooked">-->
    <!--        <p>You are already booked on to this event!</p>-->
    <!--      </template>-->
    <!--      <template v-else>-->
    <!--        <form-->
    <!--          v-if="!!event.price"-->
    <!--          :action="paymentUrl"-->
    <!--          method="POST">-->
    <!--          <button-->
    <!--            type="submit"-->
    <!--            class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">-->
    <!--            Pay now-->
    <!--          </button>-->
    <!--        </form>-->
    <!--        <button-->
    <!--          v-else-->
    <!--          class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">-->
    <!--          Book-->
    <!--        </button>-->
    <!--      </template>-->
    <!--    </template>-->
    <!--    <template v-else>-->
    <!--      <button>Sign in to book</button>-->
    <!--    </template>-->

    <!--    <div class="pt-5 pb-5 sm:px-0 sm:pt-0">-->
    <!--      <dl class="space-y-8 sm:space-y-6">-->
    <!--        <div>-->
    <!--          <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">-->
    <!--            Location-->
    <!--          </dt>-->
    <!--          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">-->
    <!--            {{ event.location }}-->
    <!--          </dd>-->
    <!--        </div>-->
    <!--        <template v-if="!event.has_multiple">-->
    <!--          <div>-->
    <!--            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">-->
    <!--              Start date-->
    <!--            </dt>-->
    <!--            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">-->
    <!--              {{ formatDateTime(event.start_date) }}-->
    <!--            </dd>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">-->
    <!--              End date-->
    <!--            </dt>-->
    <!--            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">-->
    <!--              <time datetime="1988-06-23">June 23, 1988</time>-->
    <!--            </dd>-->
    <!--          </div>-->
    <!--        </template>-->
    <!--      </dl>-->
    <!--    </div>-->
    <!--    <div v-if="sessionDates">-->
    <!--      <div class="px-4 sm:px-6 lg:px-8">-->
    <!--        <div class="mt-8 flow-root">-->
    <!--          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">-->
    <!--            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">-->
    <!--              <table class="min-w-full divide-y divide-gray-300">-->
    <!--                <thead>-->
    <!--                  <tr>-->
    <!--                    <th scope="col" class="pr-3 pl-4 text-left text-sm font-semibold text-gray-900 py-3.5 sm:pl-0">-->
    <!--                      Session-->
    <!--                    </th>-->
    <!--                    <th scope="col" class="px-3 text-left text-sm font-semibold text-gray-900 py-3.5">-->
    <!--                      Date-->
    <!--                    </th>-->
    <!--                  </tr>-->
    <!--                </thead>-->
    <!--                <tbody class="divide-y divide-gray-200">-->
    <!--                  <tr-->
    <!--                    v-for="(date, index) in sessionDates"-->
    <!--                    :key="index">-->
    <!--                    <td class="whitespace-nowrap py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">-->
    <!--                      {{ date.name }}-->
    <!--                    </td>-->
    <!--                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">-->
    <!--                      {{ formatDateTime(date.date) }}-->
    <!--                    </td>-->
    <!--                  </tr>-->
    <!--                </tbody>-->
    <!--              </table>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    &lt;!&ndash; ATTENDEES&ndash;&gt;-->
    <!--    <div class="px-4 sm:px-6 lg:px-8">-->
    <!--      <div class="sm:flex sm:items-center">-->
    <!--        <div class="sm:flex-auto">-->
    <!--          <h1 class="text-base font-semibold leading-6 text-gray-900">-->
    <!--            Attendees-->
    <!--          </h1>-->
    <!--        </div>-->
    <!--        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">-->
    <!--          <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">-->
    <!--            Add user-->
    <!--          </button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="mt-4 flow-root">-->
    <!--        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">-->
    <!--          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">-->
    <!--            <table class="min-w-full divide-y divide-gray-300">-->
    <!--              <thead>-->
    <!--                <tr>-->
    <!--                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">-->
    <!--                    Name-->
    <!--                  </th>-->
    <!--                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">-->
    <!--                    Email-->
    <!--                  </th>-->
    <!--                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">-->
    <!--                    Mobile-->
    <!--                  </th>-->
    <!--                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">-->
    <!--                    Home tel.-->
    <!--                  </th>-->
    <!--                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">-->
    <!--                    <span class="sr-only">Edit</span>-->
    <!--                  </th>-->
    <!--                </tr>-->
    <!--              </thead>-->
    <!--              <tbody class="divide-y divide-gray-200">-->
    <!--                <tr v-for="attendee in attendees" :key="attendee.email">-->
    <!--                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">-->
    <!--                    {{ attendee.first_name }} {{ attendee.last_name }}-->
    <!--                  </td>-->
    <!--                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">-->
    <!--                    {{ attendee.email }}-->
    <!--                  </td>-->
    <!--                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">-->
    <!--                    {{ attendee.mobile }}-->
    <!--                  </td>-->
    <!--                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">-->
    <!--                    {{ attendee.home_tel }}-->
    <!--                  </td>-->
    <!--                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">-->
    <!--                    <a-->
    <!--                      href="#"-->
    <!--                      class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, {{ attendee.first_name }}</span></a>-->
    <!--                  </td>-->
    <!--                </tr>-->
    <!--              </tbody>-->
    <!--            </table>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <pre>{{ event }}</pre>-->
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import Dinero from "dinero.js";
import { format } from "date-fns";
import { HandThumbUpIcon } from "@heroicons/vue/24/outline";
import { EventItem } from "~/types";
import { isUserBooked } from "~/utils/events";

const { getItemById, getItems } = useDirectusItems();
const user = await useDirectusUser();
const route = useRoute();

const people = [

  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#"
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#"
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#"
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#"
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#"
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#"
  }
];

const { data: event } = await useAsyncData(`event-item-${route.params.id}`, async () => {
  return await getItemById<EventItem>({
    collection: "events",
    id: route.params.id
  });
});

const multiple = ref<EventItem[] | null>();

if (event.value?.has_multiple) {
  const { data: events } = await useAsyncData("event-item" + event.value.id + "-children", async () => {
    return await getItems<EventItem>({
      collection: "events",
      params: {
        filter: {
          parent_event: {
            _eq: event.value.id
          }
        }
      }
    });
  });

  multiple.value = events.value;
}

const sessionDates = computed(() => {
  let result = null;
  if (event.value?.has_multiple && multiple?.value?.length) {
    result = [];

    result.push({
      name: "Session 1",
      date: event.value.start_date
    });

    for (let i = 0; i < multiple.value.length; i++) {
      const e = multiple.value[i];
      result.push({
        name: "Session: " + (2 + i),
        date: e.start_date
      });
    }
  }

  return result;
});

const paymentUrl = "/api/eventPayment?eventId=" + event.value.id;

const alreadyBookedRes = await useFetch("/api/delegates/isBooked", {
  query: {
    userId: user.value.id,
    eventId: route.params.id
  }
});
const alreadyBooked = computed(() => alreadyBookedRes.data.value);

function formatDateTime (date: string) {
  return format(new Date(date), "MMMM do, yyyy - hh:mmaa");
}

const attendeesRes = await useFetch("/api/delegates/attendees", {
  query: {
    eventId: route.params.id
  }
});

const attendees = computed(() => attendeesRes.data.value);

function renderPrice (amount: number) {
  if (!amount) {
    return null;
  }
  let formatter = "$0";

  // format pence if amount is not a whole pound value
  if (amount % 100 !== 0) {
    formatter += ".00";
  }

  return Dinero({ amount, currency: "GBP" }).toFormat(formatter);
}

</script>

<style scoped lang="scss">

</style>
