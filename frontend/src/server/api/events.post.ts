import axios from "axios";
import { Directus } from "@directus/sdk";
import { EventDates, EventItem, RecurringEventPattern, RecurringType } from "~/types";

type Types = {
  events: EventItem
}

const directus = new Directus<Types>(process.env.NUXT_DIRECTUS_URL!);

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    eventItem: EventItem,
    eventDates: EventDates
  }>(event);
  console.log("event api", body.eventDates.multiple);

  const baseURL = process.env.NUXT_DIRECTUS_URL;

  const events = directus.items("events");

  try {
    const res = await events.createOne(body.eventItem);
    const eventId = res?.id;

    if (body.eventItem.is_recurring) {
      console.log("creating recurring event");
      const recurringPattern: RecurringEventPattern = body.eventItem.recurring_pattern;
      recurringPattern.eventId = eventId;

      await axios.post("/items/recurring_event_pattern", recurringPattern, {
        baseURL
      });
    } else if (body.eventDates.multiple?.length) {
      const newEvents = [];

      for (let i = 1; i < body.eventDates.multiple.length; i++) {
        const dates = body.eventDates.multiple[i];
        const newEvent = JSON.parse(JSON.stringify(body.eventItem)); // need node 17 to use structuredClone
        newEvent.parent_event = eventId;
        newEvent.start_date = dates.start_date;
        newEvent.end_date = dates.end_date;
        newEvents.push(newEvent);
      }

      await events.createMany(newEvents);
    }
  } catch (err: any) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unable to create event: " + err.message
    });
  }

  return "ok";
});
