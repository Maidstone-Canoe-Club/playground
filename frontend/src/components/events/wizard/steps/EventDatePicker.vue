<template>
  <div class="event-date-picker">
    <div
      v-if="eventType === 'single'"
      class="event-date-picker__single">
      <div class="input-row">
        <input-date
          id="start-date"
          v-model="eventItem.start_date"
          label="Start date"
          enable-time-picker />
        <input-date
          id="end-date"
          v-model="eventItem.end_date"
          enable-time-picker
          label="End date" />
      </div>
    </div>
    <div
      v-else-if="eventType === 'multi'"
      class="event-date-picker__multi">
      <div class="day-rows">
        <div
          v-for="(day, index) in eventDates.multiple"
          :key="day.id"
          class="day-row">
          <span>Day {{ index + 1 }}</span>
          <div class="input-row">
            <input-date
              :id="'day-start-' + index"
              v-model="eventDates.multiple[index].start_date"
              placeholder="Start date"
              enable-time-picker />
            <input-date
              :id="'day-end-' + index"
              v-model="eventDates.multiple[index].end_date"
              placeholder="End date"
              enable-time-picker />
          </div>
          <button
            class="btn day-row__remove"
            @click="removeDay(index)">
            <fa-icon icon="fa-trash-can" />
          </button>
        </div>
      </div>
      <button
        class="btn btn-link"
        @click="addDay">
        <fa-icon icon="fa-solid fa-plus" />
        Add day
      </button>
    </div>
    <div
      v-else-if="eventType === 'recurring'"
      class="event-date-picker__recurring">
      <div class="input-group">
        <input-date
          id="recurring-start"
          v-model="eventDates.recurring.startDate"
          enable-time-picker
          label="When does the event start?" />

        <dropdown-field
          id="recurring-type"
          v-model="eventDates.recurring.recurringType"
          label="How often does the event repeat?"
          :options="recurringTypes" />

        <div>
          <input-field
            id="recurring-occurrences"
            v-model="eventDates.recurring.maxOccurrences"
            type="number"
            label="How many times will the event repeat?" />
          <small>Leave blank to repeat indefinitely</small>
        </div>
      </div>
    </div>

    <div>
      <button
        class="btn btn-primary"
        @click="onContinue">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { EventDate, EventDates, EventItem } from "~/types";

const emits = defineEmits(["update:eventItem", "update:eventDates", "next"]);

const props = defineProps<{
  eventType: string,
  eventItem: EventItem,
  eventDates: EventDates
}>();

const eventItem: Ref<EventItem> = ref(props.eventItem);
const eventDates: Ref<EventDates> = ref(props.eventDates);

const recurringTypes = ["Daily", "Weekly", "Monthly", "Yearly"];

watch(() => props.eventItem, (val) => {
  eventItem.value = val;
}, { deep: true });

watch(() => props.eventDates, (val) => {
  eventDates.value = val;
}, { deep: true });

watch(eventItem, (val) => {
  emits("update:eventItem", val);
}, { deep: true });

watch(eventDates, (val) => {
  emits("update:eventDates", val);
}, { deep: true });

// const dates = reactive([newDay()]);

function addDay () {
  eventDates.value.multiple.push(newDay());
}

function removeDay (index: number) {
  nextTick(() => {
    eventDates.value.multiple.splice(index, 1);
  });
}

function newDay (): EventDate {
  return {
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    start_date: null,
    end_date: null
  } as EventDate;
}

function onContinue () {
  eventItem.value.is_recurring = props.eventType === "recurring";
  emits("next");
}

</script>

<style scoped lang="scss">
.event-date-picker {
  &__multi {

    .day-rows {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      margin-bottom: 1rem;
    }

    .day-row {
      display: flex;
      gap: .5rem;
      align-items: center;

      .input-row {
        flex-grow: 1;
      }

      &__remove {
        background-color: transparent;
      }
    }
  }
}
</style>
