<template>
  <div class="event-type-selector">
    <!--    <p>What kind of event are you creating?</p>-->
    <RadioGroup v-model="selectedMailingLists">
      <RadioGroupLabel class="text-base font-semibold leading-6 text-gray-900">
        Select an event type
      </RadioGroupLabel>

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <RadioGroupOption v-for="eventType in eventTypes" :key="eventType.id" v-slot="{ active, checked }" as="template" :value="eventType">
          <div :class="[active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
            <span class="flex flex-1">
              <span class="flex flex-col">
                <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ eventType.title }}</RadioGroupLabel>
                <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{ eventType.description }}</RadioGroupDescription>
                <RadioGroupDescription as="span" class="mt-6 text-sm font-medium text-gray-900">{{ eventType.users }}</RadioGroupDescription>
              </span>
            </span>
            <CheckCircleIcon :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600']" aria-hidden="true" />
            <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-600' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <button
      class="mt-5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="emits('next')">
      Next
    </button>
    <!--    <div class="event-type-selector__cards">-->
    <!--      <div-->
    <!--        class="event-type-selector__type"-->
    <!--        :class="{'event-type-selector__type&#45;&#45;selected': internalValue === 'single'}">-->
    <!--        <strong>-->
    <!--          <fa-icon icon="fa-calendar-day" />-->
    <!--          Single event</strong>-->
    <!--        <p>-->
    <!--          An event that will only occur once, but could span multiple days, like a trip.-->
    <!--        </p>-->
    <!--        <button-->
    <!--          class="btn btn-primary"-->
    <!--          @click="onClick('single')">-->
    <!--          Select-->
    <!--        </button>-->
    <!--      </div>-->

    <!--      <div-->
    <!--        class="event-type-selector__type"-->
    <!--        :class="{'event-type-selector__type&#45;&#45;selected': internalValue === 'multi'}">-->
    <!--        <strong>-->
    <!--          <fa-icon icon="fa-calendar-days" />-->
    <!--          Multi day event</strong>-->
    <!--        <p>An event that occurs over multiple days, like a beginners course.</p>-->
    <!--        <button-->
    <!--          class="btn btn-primary"-->
    <!--          @click="onClick('multi')">-->
    <!--          Select-->
    <!--        </button>-->
    <!--      </div>-->

    <!--      <div-->
    <!--        class="event-type-selector__type"-->
    <!--        :class="{'event-type-selector__type&#45;&#45;selected': internalValue === 'recurring'}">-->
    <!--        <strong>-->
    <!--          <fa-icon icon="fa-repeat" />-->
    <!--          Recurring event</strong>-->
    <!--        <p>An event that repeats, like a Sunday paddle or the kids club.</p>-->
    <!--        <button-->
    <!--          class="btn btn-primary"-->
    <!--          @click="onClick('recurring')">-->
    <!--          Select-->
    <!--        </button>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";

const eventTypes = [
  { id: "single", title: "Single event", description: "An event that will only occur once, but could span multiple days, like a trip", users: "621 users" },
  { id: "multi", title: "Multi day event", description: "An event that occurs over multiple days, like a beginners course", users: "1200 users" },
  { id: "recurring", title: "Recurring event", description: "An event that repeats, like a Sunday paddle or the kids club", users: "2740 users" }
];

const selectedEventType = ref(eventTypes[0]);
const internalValue = ref<EventType>(props.modelValue);

watch(selectedEventType, (val) => {
  internalValue.value = val.id;
}, { immediate: true });

const emits = defineEmits(["update:modelValue", "selected", "next"]);

type EventType = "single" | "multi" | "recurring" | "";

const props = defineProps<{
  modelValue: EventType
}>();

watch(() => props.modelValue, (val) => {
  selectedEventType.value = eventTypes.find(x => x.id === val);
  internalValue.value = val;
});

watch(internalValue, (val) => {
  emits("update:modelValue", val);
  emits("selected");
});

function onClick (type: EventType) {
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
