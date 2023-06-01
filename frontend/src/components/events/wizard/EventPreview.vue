<template>
  <div class="event-preview">
    <h2>{{ (eventItem.title || "Event title") }}</h2>

    <div class="event-preview__items">
      <div class="event-preview__item">
        <fa-icon
          icon="far fa-calendar"
          class="icon" />
        Start date - {{ formatDate(eventItem.startDate, true) ?? "Select a start date" }}
      </div>

      <div class="event-preview__item">
        <fa-icon icon="far fa-calendar" class="icon" />
        End date - {{ formatDate(eventItem.endDate, true) ?? "Select an end date" }}
      </div>

      <div class="event-preview__item">
        <fa-icon icon="fa-location-dot" class="icon" />
        <span>
          {{ eventItem.location || "Select a location" }}
        </span>
      </div>

      <div class="event-preview__item">
        <fa-icon icon="fa-users" class="icon" />
        <span>
          {{ eventItem.maxAttendees + " max attendees"|| "Unlimited attendees" }}
        </span>
      </div>

      <div
        v-if="eventItem.price"
        class="event-preview__item">
        <fa-icon icon="fa-sterling-sign" class="icon" />
        <span>
          {{ formatPrice(eventItem.price) }} <small>per person</small>
        </span>
      </div>
    </div>

    <div
      class="event-preview__description"
      v-html="eventItem.description" />
  </div>
</template>

<script setup lang="ts">
import Dinero from "dinero.js";
import { formatDate } from "#imports";
import { EventItem } from "~/types";
// @ts-ignore

defineProps<{
  eventItem: EventItem
}>();

function formatPrice (amount) {
  if (!amount) {
    return null;
  }
  let formatter = "0";

  // format pence if amount is not a whole pound value
  if (amount % 100 !== 0) {
    formatter += ".00";
  }

  return Dinero({ amount, currency: "GBP" }).toFormat(formatter);
}
</script>

<style scoped lang="scss">
.event-preview {
  color: var(--color-gray-600);
  transition: color .2s ease-out;

  h2 {
    margin-bottom: .75rem;
  }

  &:hover {
    color: inherit;
  }

  &__item {
    display: flex;
    gap: .25rem;
    align-items: center;

  }

  ::v-deep(.icon) {
    width: 1.2rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: .25rem;
  }

  &__description {
    margin-top: 1rem;
  }
}
</style>
