<template>
  <div class="event-wizard">
    <state-manager v-slot="{setState, currentState, goBack, canGoBack}">
      <div class="event-wizard__header">
        <strong>
          {{ currentState.value }}
        </strong>

        <div class="event-wizard__steps">
          <div class="event-wizard__step">
            Select event type
          </div>
          <div class="event-wizard__step-separator">
            >
          </div>
          <div>Enter event details</div>
          <div class="event-wizard__step-separator">
            >
          </div>
          <div>Other details</div>
        </div>
      </div>
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
    </state-manager>
  </div>
</template>

<script setup lang="ts">
import { addHours } from "date-fns";

import { Ref } from "vue";
import { EventDates, EventItem } from "~/types";

const eventType: Ref<string> = ref<string>("");

const eventItem: Ref<EventItem> = ref<EventItem>({
  title: "Beginners course",
  location: "Maidstone Canoe Club",
  description: "It's a beginners course!",
  max_attendees: 8,
  start_date: new Date(),
  end_date: addHours(new Date(), 4),
  price: 1000
});

const eventDates: Ref<EventDates> = ref<EventDates>({
  multiple: [
    {
      id: 123,
      start_date: new Date(),
      end_date: addHours(new Date(), 5)
    },
    {
      id: 456,
      start_date: addHours(new Date(), 6),
      end_date: addHours(new Date(), 11)
    },
    {
      id: 789,
      start_date: addHours(new Date(), 20),
      end_date: addHours(new Date(), 24)
    }
  ],
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
