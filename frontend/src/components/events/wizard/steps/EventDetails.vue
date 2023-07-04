<template>
  <div class="event-details">
    <div class="input-group">
      <input-field
        id="name"
        v-model="internalValue.title"
        label="Name"
        type="text" />

      <input-field
        id="location"
        v-model="internalValue.location"
        type="text"
        label="Location" />

      <input-field
        id="max-attendeed"
        v-model="internalValue.max_attendees"
        type="number"
        label="Max attendees" />

      <input-price
        id="price"
        v-model="internalValue.price"
        label="Price per attendee" />

      <alert-box
        v-if="internalValue.price"
        variant="warning"
        icon="fa-triangle-exclamation">
        If you set a price, the event must be approved before it appears in the calendar.
      </alert-box>

      <div class="input-field">
        <hr>

        <label for="description">Description</label>
        <custom-editor
          id="description"
          v-model="internalValue.description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { EventItem } from "~/types";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: EventItem
}>();

const internalValue: Ref<EventItem> = ref<EventItem>(props.modelValue);

watch(() => props.modelValue, (val) => {
  internalValue.value = val;
}, { deep: true });

watch(internalValue, (val) => {
  emits("update:modelValue", val);
}, { deep: true });

// watch([() => internalValue.value.startDate, () => internalValue.value.endDate], validateDates);
//
// function validateDates () {
//   if (!internalValue.value.startDate || !internalValue.value.endDate) {
//     return;
//   }
//
//   if (internalValue.value.startDate > internalValue.value.endDate) {
//     console.warn("Start date must be before end date");
//   }
// }

</script>

<style scoped lang="scss">
.event-details {
  hr {
  }
}
</style>
