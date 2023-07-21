<template>
  <div class="event-page">
    <h1 class="mb-4 text-4xl font-bold text-gray-700">
      {{ event.title }}
    </h1>
    <div v-html="event.description" />
    <template v-if="user">
      <form
        v-if="!!event.price"
        :action="paymentUrl"
        method="POST">
        <button
          type="submit"
          class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Pay now
        </button>
      </form>
      <button
        v-else
        class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Book
      </button>
    </template>
    <template v-else>
      <button>Sign in to book</button>
    </template>

    <div class="pt-5 pb-5 sm:px-0 sm:pt-0">
      <dl class="space-y-8 sm:space-y-6">
        <div>
          <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
            Location
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
            {{ event.location }}
          </dd>
        </div>
        <template v-if="!event.has_multiple">
          <div>
            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
              Start date
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
              {{ formatDateTime(event.start_date) }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
              End date
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
              <time datetime="1988-06-23">June 23, 1988</time>
            </dd>
          </div>
        </template>
      </dl>
    </div>
    <div v-if="sessionDates">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" class="pr-3 pl-4 text-left text-sm font-semibold text-gray-900 py-3.5 sm:pl-0">
                      Session
                    </th>
                    <th scope="col" class="px-3 text-left text-sm font-semibold text-gray-900 py-3.5">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="(date, index) in sessionDates"
                    :key="index">
                    <td class="whitespace-nowrap py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ date.name }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ formatDateTime(date.date) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pre>{{ event }}</pre>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { EventItem } from "~/types";

const { getItemById, getItems } = useDirectusItems();
const user = await useDirectusUser();
const route = useRoute();

const { data: event } = await useAsyncData(`event-item-${route.params.id}`, async () => {
  return await getItemById<EventItem>({
    collection: "events",
    id: route.params.id
  });
});

const multiple = ref<EventItem[] | null>();

console.log("multiple?", event.value?.has_multiple);
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

function formatDateTime (date: string) {
  return format(new Date(date), "MMMM do, yyyy - hh:mmaa");
}

</script>

<style scoped lang="scss">

</style>
