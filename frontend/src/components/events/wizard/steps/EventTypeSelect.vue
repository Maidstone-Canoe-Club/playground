<template>
  <div class="event-type-selector">
    <p>What kind of event are you creating?</p>

    <div class="event-type-selector__cards">
      <div
        class="event-type-selector__type"
        :class="{'event-type-selector__type--selected': internalValue === 'single'}">
        <strong>
          <fa-icon icon="fa-calendar-day" />
          Single event</strong>
        <p>
          An event that will only occur once, but could span multiple days, like a trip.
        </p>
        <button
          class="btn btn-primary"
          @click="onClick('single')">
          Select
        </button>
      </div>

      <div
        class="event-type-selector__type"
        :class="{'event-type-selector__type--selected': internalValue === 'multi'}">
        <strong>
          <fa-icon icon="fa-calendar-days" />
          Multi day event</strong>
        <p>An event that occurs over multiple days, like a beginners course.</p>
        <button
          class="btn btn-primary"
          @click="onClick('multi')">
          Select
        </button>
      </div>

      <div
        class="event-type-selector__type"
        :class="{'event-type-selector__type--selected': internalValue === 'recurring'}">
        <strong>
          <fa-icon icon="fa-repeat" />
          Recurring event</strong>
        <p>An event that repeats, like a Sunday paddle or the kids club.</p>
        <button
          class="btn btn-primary"
          @click="onClick('recurring')">
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue", "selected"]);

type EventType = "single" | "multi" | "recurring" | "";

const props = defineProps<{
  modelValue: EventType
}>();

const internalValue = ref<EventType>(props.modelValue);

watch(() => props.modelValue, (val) => {
  internalValue.value = val;
});

watch(internalValue, (val) => {
  emits("update:modelValue", val);
  emits("selected");
});

function onClick (type) {
  internalValue.value = type;
  emits("selected");
}

</script>

<style scoped lang="scss">
.event-type-selector {
  &__cards {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;

    @media ( max-width: 767px ) {
      flex-direction: column;
    }
  }

  &__type {
    flex-basis: calc(33.3% - 1rem);
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid var(--color-primary-500);
    display: flex;
    flex-direction: column;
    gap: .5rem;
    box-shadow: 0 0 0 0 transparent;
    transition: box-shadow .2s ease-out;

    &--selected {
      box-shadow: 0 0 0 4px var(--color-primary-300);
    }
  }
}
</style>
