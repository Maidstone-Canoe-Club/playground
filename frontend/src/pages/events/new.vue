<template>
  <div class="new-event">
    <div class="container">
      <h1>New Event</h1>
      <div class="new-event__fields">
        <input-field
          id="title"
          v-model="event.title"
          type="text"
          label="Title" />
        <input-field
          id="location"
          v-model="event.location"
          type="text"
          label="Location" />
        <textarea-field
          id="description"
          v-model="event.description"
          label="Description" />
        <input-field
          id="startDate"
          v-model="event.startDate"
          type="date"
          label="Start date" />
        <input-field
          v-if="!event.isFullDay"
          v-model="event.startTime"
          type="time"
          label="Start time" />
        <input-field
          id="endDate"
          v-model="event.endDate"
          type="date"
          label="End date" />
        <input-field
          v-if="!event.isFullDay"
          v-model="event.endTime"
          type="time"
          label="End time" />
        <checkbox-field
          id="fullDay"
          v-model="event.isFullDay"
          label="Is full day" />
        <dropdown-field
          id="recurring"
          v-model="recurringState"
          label="Does the event repeat?"
          :options="recurringOptions" />

        <div v-if="recurringState !== 'Doesn\'t repeat'">
          <div v-if="recurringState === 'Custom'">
            <strong>
              Recurring options
            </strong>
          </div>
          <div v-else />
        </div>
      </div>
      <button @click="onClick">
        Create
      </button>
    </div>

    <pre>{{ event }}</pre>
    <pre>{{ recurringState }}</pre>
  </div>
</template>

<script setup lang="ts">
import { EventItem } from "~/types";

const event = ref<EventItem>({
  title: "",
  location: null,
  description: null,
  startDate: null,
  endDate: null,
  startTime: null,
  endTime: null,
  isFullDay: true,
  isRecurring: false,
  recurringPattern: {
    type: null, // daily, weekly, monthly or yearly
    separationCount: null, // interval before the next event instance is allowed
    maxOccurrences: null, // no end date but we have a set number of occurrences,
    dayOfWeek: null,
    weekOfMonth: null,
    dayOfMonth: null,
    monthOfYear: null
  }
});

const recurringOptions = [
  "Doesn't repeat",
  "Daily",
  "Weekly",
  "Monthly",
  "Custom"
];

const recurringState = ref(recurringOptions[0]);

watch(recurringState, (val) => {
  event.value.isRecurring = val !== "Doesn't repeat";
});

async function onClick () {
  const res = await useFetch("/api/events", {
    method: "POST",
    body: {
      event: event.value
    }
  });

  console.log("res", res.data);
}

</script>

<style lang="scss" scoped>
.new-event {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
