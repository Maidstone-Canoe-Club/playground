<template>
  <div class="event-wizard">
    <state-manager v-slot="{setState, currentState, goBack, canGoBack}">
      <div class="event-wizard__header">
        <nav aria-label="Progress">
          <ol role="list" class="space-y-4 md:space-x-8 md:space-y-0 md:flex">
            <li v-for="step in steps" :key="step.name" class="md:flex-1">
              <a v-if="step.status === 'complete'" :href="step.href" class="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 group hover:border-indigo-800 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0">
                <span class="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{{ step.id }}</span>
                <span class="text-sm font-medium">{{ step.name }}</span>
              </a>
              <a v-else-if="step.status === 'current'" :href="step.href" class="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0" aria-current="step">
                <span class="text-sm font-medium text-indigo-600">{{ step.id }}</span>
                <span class="text-sm font-medium">{{ step.name }}</span>
              </a>
              <a v-else :href="step.href" class="flex flex-col border-l-4 border-gray-200 py-2 pl-4 group hover:border-gray-300 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0">
                <span class="text-sm font-medium text-gray-500 group-hover:text-gray-700">{{ step.id }}</span>
                <span class="text-sm font-medium">{{ step.name }}</span>
              </a>
            </li>
          </ol>
        </nav>
        <div class="event-wizard__content">
          <state-wrapper name="default">
            <event-type-select
              v-model="eventType"
              @selected="setState('date')" />
          </state-wrapper>
          <state-wrapper name="date">
            <event-date-picker
              v-model:eventItem="eventItem"
              v-model:eventDates="eventDates"
              :event-type="eventType"
              @next="setState('details')" />
          </state-wrapper>
          <state-wrapper name="details">
            <div class="event-details-wrapper">
              <event-details v-model="eventItem" />
              <event-preview :event-item="eventItem" />
            </div>
          </state-wrapper>
        </div>
        <div
          v-if="canGoBack"
          class="event-wizard__footer">
          <button
            class="btn btn-primary"
            @click="goBack()">
            Back
          </button>
          <button
            class="btn btn-primary"
            @click="onSubmit">
            Submit
          </button>
        </div>
      </div>
    </state-manager>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { EventDates, EventItem } from "~/types";

type EventType = "single" | "multi" | "recurring" | "";
const eventType: Ref<EventType> = ref<EventType>("");

const eventItem: Ref<EventItem> = ref<EventItem>({
  title: "Beginners course",
  location: "Maidstone Canoe Club",
  description: "It's a beginners course!",
  max_attendees: 8,
  start_date: new Date(),
  is_recurring: false,
  has_multiple: false,
  is_full_day: false,
  price: 1000
});

const steps = [
  { id: "Step 1", name: "Select event type", href: "#", status: "complete" },
  { id: "Step 2", name: "Choose event dates", href: "#", status: "current" },
  { id: "Step 3", name: "Event details", href: "#", status: "upcoming" }
];

const eventDates: Ref<EventDates> = ref<EventDates>({
  multiple: [],
  recurring: {}
});

async function onSubmit () {
  const body = {
    eventItem: eventItem.value,
    eventDates: eventDates.value
  };

  const res = await useFetch("/api/events", {
    method: "POST",
    watch: false,
    body
  });
  console.log("res", res.data);
}

watch(eventType, (val) => {
  eventItem.value.is_recurring = false;
  eventItem.value.has_multiple = false;
  if (val === "multi") {
    eventItem.value.has_multiple = true;
  } else if (val === "recurring") {
    eventItem.value.is_recurring = true;
  }
});

</script>

<style scoped lang="scss">
.event-wizard {
  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 1px 2px 0 var(--color-gray-200);

  &__header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-gray-200);
  }

  &__content {
    padding: 1rem 1.5rem 1.5rem;
  }

  &__footer {
    padding: 1rem 1.5rem;
  }

  &__steps {
    display: flex;
    flex-direction: row;
    gap: .25rem;
  }

  .event-details-wrapper {
    display: flex;
    gap: 1rem;

    .event-preview {
      flex-basis: 50%;
      @media (max-width: 767px) {
        display: none;
      }
    }

    .event-details {
      flex-basis: 50%;

      @media (max-width: 767px) {
        flex-basis: 100%;
      }
    }
  }
}
</style>
