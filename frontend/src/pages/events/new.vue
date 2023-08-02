<template>
  <div class="new-event">
    <div class="container">
      <event-wizard />
      <!--      <div>-->
      <!--        <user-search />-->
      <!--      </div>-->
      <!--      <div class="new-event__editor">-->
      <!--        <div class="new-event__fields">-->
      <!--          <div class="new-event__row">-->
      <!--            <input-field-->
      <!--              id="title"-->
      <!--              v-model="event.title"-->
      <!--              type="text"-->
      <!--              label="Title" />-->
      <!--            <input-field-->
      <!--              id="location"-->
      <!--              v-model="event.location"-->
      <!--              type="text"-->
      <!--              label="Location" />-->
      <!--          </div>-->

      <!--          <div class="new-event__type-selector">-->
      <!--            <button class="btn btn&#45;&#45;selected">-->
      <!--              <span class="new-event__button-text">-->
      <!--                <strong>One-off event</strong>-->
      <!--                <span>Occurs only once</span>-->
      <!--              </span>-->
      <!--            </button>-->
      <!--            <button class="btn">-->
      <!--              <span class="new-event__button-text">-->
      <!--                <strong>-->
      <!--                  Repeating event-->
      <!--                </strong>-->
      <!--                <span>Occurs multiple times</span>-->
      <!--              </span>-->
      <!--            </button>-->
      <!--          </div>-->

      <!--          <div class="new-event__row">-->
      <!--            <input-field-->
      <!--              id="startDate"-->
      <!--              v-model="event.startDate"-->
      <!--              type="date"-->
      <!--              label="Start date" />-->
      <!--            <input-field-->
      <!--              v-if="!event.isFullDay"-->
      <!--              id="startTime"-->
      <!--              v-model="event.startTime"-->
      <!--              type="time"-->
      <!--              label="Start time" />-->
      <!--          </div>-->
      <!--          <div class="new-event__row">-->
      <!--            <input-field-->
      <!--              id="endDate"-->
      <!--              v-model="event.endDate"-->
      <!--              type="date"-->
      <!--              label="End date" />-->
      <!--            <input-field-->
      <!--              v-if="!event.isFullDay"-->
      <!--              id="endTime"-->
      <!--              v-model="event.endTime"-->
      <!--              type="time"-->
      <!--              label="End time" />-->
      <!--          </div>-->
      <!--          <checkbox-field-->
      <!--            id="fullDay"-->
      <!--            v-model="event.isFullDay"-->
      <!--            label="Is full day" />-->
      <!--          <dropdown-field-->
      <!--            id="recurring"-->
      <!--            v-model="recurringState"-->
      <!--            label="Does the event repeat?"-->
      <!--            :options="recurringOptions" />-->

      <!--          <div v-if="recurringState === 'Custom'">-->
      <!--            <span>Repeats every</span>-->
      <!--            <input-field-->
      <!--              id="separation"-->
      <!--              v-model="event.recurringPattern.separationCount"-->
      <!--              type="number" />-->
      <!--            <dropdown-field-->
      <!--              id="recurring-type"-->
      <!--              v-model="event.recurringPattern.type"-->
      <!--              :options="recurringTypes"-->
      <!--              label-key="display_name"-->
      <!--              value-key="id" />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="new-event__description-container">-->
      <!--          <div class="new-event__description-label">-->
      <!--            Description-->
      <!--          </div>-->
      <!--          <client-only>-->
      <!--            <custom-editor v-model="event.description" />-->
      <!--            <template #fallback>-->
      <!--              <loading-spinner />-->
      <!--            </template>-->
      <!--          </client-only>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <button @click="onClick">-->
      <!--        Create-->
      <!--      </button>-->
    </div>

    <!--    <pre>{{ event }}</pre>-->
    <!--    <pre>{{ recurringState }}</pre>-->
  </div>
</template>

<script setup lang="ts">
import { EventItem } from "~/types";

const { getItems } = useDirectusItems();

const { data: recurringEventTypes } = await useAsyncData("recurring-event-types", () => {
  return getItems({
    collection: "recurring_event_type"
  });
});

const recurringTypes = computed(() => [{
  id: null,
  display_name: "Doesn't repeat"
}, ...recurringEventTypes.value]);

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
    separationCount: 1, // interval before the next event instance is allowed
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

  // console.log("res", res.data);
}

</script>

<style lang="scss" scoped>
.new-event {
  &__editor {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  &__description-container {
    flex-basis: 50%;
  }

  &__description-label {
    margin-bottom: .5rem;
  }

  &__type-selector {
    display: flex;
    gap: 1rem;
    justify-content: space-between;

    .btn {
      flex-basis: 50%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      text-align: left;
      justify-content: center;
      align-items: flex-start;
      background-color: #fff;
      border: 1px solid lightgray;

      &--selected {
        border: none;
        box-shadow: 0 0 0 3px #ccc;
      }

      &:hover {
        background-color: #ddd;
      }

      strong {
        font-size: 1.2rem;
      }
    }
  }

  &__button-text {
    display: flex;
    flex-direction: column;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
  }

  &__row {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    .input-field {
      flex-grow: 1;
    }
  }
}
</style>
