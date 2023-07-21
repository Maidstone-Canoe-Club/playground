import axios from "axios";
import { Directus } from "@directus/sdk";
import { getDate, getDay, getMonth, getWeekOfMonth, parseISO, setDefaultOptions } from "date-fns";
import enGB from "date-fns/locale/en-GB/index.js";
import { EventDates, EventItem, RecurringEventPattern, RecurringType } from "~/types.d";

type Types = {
  events: EventItem
}

const baseURL = process.env.NUXT_DIRECTUS_URL;
const directus = new Directus<Types>(process.env.NUXT_DIRECTUS_URL!);
const events = directus.items("events");

function mapRecurringTypeEnum (type: RecurringType): string {
  switch (type) {
  case RecurringType.Daily:
    return "daily";
  case RecurringType.Weekly:
    return "weekly";
  case RecurringType.Monthly:
    return "monthly";
  case RecurringType.Yearly:
    return "yearly";
  }
}

function mapRecurringType (type: string): RecurringType {
  if (!type) {
    throw new Error("Missing recurring type");
  }

  switch (type.toLowerCase()) {
  case "daily":
    return RecurringType.Daily;
  case "weekly":
    return RecurringType.Weekly;
  case "monthly":
    return RecurringType.Monthly;
  case "yearly":
    return RecurringType.Yearly;
  default:
    throw new Error(`Unknown recurring type: ${type}`);
  }
}

async function createSingleEvent (eventItem: EventItem) {
  await events.createOne(eventItem);
}

async function createMultipleEvents (eventItem: EventItem, eventDates: EventDates) {
  // Set the parent event start/end dates to the first date from the list
  const firstDate = eventDates.multiple[0];
  eventItem.start_date = firstDate.start_date;
  eventItem.end_date = firstDate.end_date;

  console.log("creating parent of multiples", eventItem);

  const res = await events.createOne(eventItem);
  const eventId = res?.id;

  const newEvents = [];

  for (let i = 1; i < eventDates.multiple.length; i++) {
    const dates = eventDates.multiple[i];
    console.log("creating next date", dates);
    const newEvent = JSON.parse(JSON.stringify(eventItem)); // need node 17 to use structuredClone
    newEvent.parent_event = eventId;
    newEvent.start_date = dates.start_date;
    newEvent.end_date = dates.end_date;
    newEvents.push(newEvent);
  }

  await events.createMany(newEvents);
}

async function createRecurringEvent (eventItem: EventItem, eventDates: EventDates) {
  // TODO: Calculate end date of main event based off recurring data
  const res = await events.createOne(eventItem);
  const eventId = res?.id;

  if (!eventId) {
    throw new Error("Could not create recurring event parent");
  }

  const recurringPattern: RecurringEventPattern = {
    event: eventId,
    type: mapRecurringType(eventDates.recurring.recurringType)
  };
    // recurringPattern.eventId = eventId;

  let dayOfWeek : number | undefined;
  let weekOfMonth : number | undefined;
  let dayOfMonth : number | undefined;
  let monthOfYear : number | undefined;

  const startDate = parseISO(eventItem.start_date);

  if (recurringPattern.type === RecurringType.Weekly) {
    dayOfWeek = getDay(startDate) + 1;
  }

  if (recurringPattern.type === RecurringType.Monthly) {
    weekOfMonth = getWeekOfMonth(startDate);
    dayOfMonth = getDate(startDate);
  }

  if (recurringPattern.type === RecurringType.Yearly) {
    monthOfYear = getMonth(startDate);
  }

  recurringPattern.day_of_week = dayOfWeek;
  recurringPattern.week_of_month = weekOfMonth;
  recurringPattern.day_of_month = dayOfMonth;
  recurringPattern.month_of_year = monthOfYear;

  console.log("day of week", dayOfWeek);
  console.log("week of month", weekOfMonth);
  console.log("dayOfMonth", dayOfMonth);
  console.log("monthOfYear", monthOfYear);

  await axios.post("/items/recurring_event_pattern", recurringPattern, {
    baseURL
  });
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    eventItem: EventItem,
    eventDates: EventDates
  }>(event);

  setDefaultOptions({
    locale: enGB,
    weekStartsOn: 1
  });

  const events = directus.items("events");

  try {
    console.log("creating event");
    if (body.eventItem.is_recurring) {
      await createRecurringEvent(body.eventItem, body.eventDates);
    } else if (body.eventItem.has_multiple) {
      await createMultipleEvents(body.eventItem, body.eventDates);
    } else {
      await createSingleEvent(body.eventItem);
    }

    // const res = await events.createOne(body.eventItem);
    // const eventId = res?.id;
    //
    // if (body.eventItem.is_recurring) {
    //   console.log("creating recurring event");
    //   // const recurringPattern: RecurringEventPattern = body.eventItem.recurring_pattern;
    //   const recurringPattern: RecurringEventPattern = {
    //     event: eventId,
    //     type: mapRecurringType(body.eventDates.recurring.recurringType)
    //   };
    //   // recurringPattern.eventId = eventId;
    //
    //   let dayOfWeek : number | undefined;
    //   let weekOfMonth : number | undefined;
    //   let dayOfMonth : number | undefined;
    //   let monthOfYear : number | undefined;
    //
    //   const startDate = parseISO(body.eventItem.start_date);
    //
    //   if (recurringPattern.type === RecurringType.Weekly) {
    //     dayOfWeek = getDay(startDate) + 1;
    //   }
    //
    //   if (recurringPattern.type === RecurringType.Monthly) {
    //     weekOfMonth = getWeekOfMonth(startDate);
    //     dayOfMonth = getDate(startDate);
    //   }
    //
    //   if (recurringPattern.type === RecurringType.Yearly) {
    //     monthOfYear = getMonth(startDate);
    //   }
    //
    //   recurringPattern.day_of_week = dayOfWeek;
    //   recurringPattern.week_of_month = weekOfMonth;
    //   recurringPattern.day_of_month = dayOfMonth;
    //   recurringPattern.month_of_year = monthOfYear;
    //
    //   console.log("day of week", dayOfWeek);
    //   console.log("week of month", weekOfMonth);
    //   console.log("dayOfMonth", dayOfMonth);
    //   console.log("monthOfYear", monthOfYear);
    //
    //   const recurringRes = await axios.post("/items/recurring_event_pattern", recurringPattern, {
    //     baseURL
    //   });
    //
    //   console.log("recurringres", recurringRes);
    // } else if (body.eventDates.multiple?.length) {
    //   // Create child events of the main event
    //   // Users join the first event only if multiple days long
    //   const newEvents = [];
    //
    //   for (let i = 0; i < body.eventDates.multiple.length; i++) {
    //     const dates = body.eventDates.multiple[i];
    //     const newEvent = JSON.parse(JSON.stringify(body.eventItem)); // need node 17 to use structuredClone
    //     newEvent.parent_event = eventId;
    //     newEvent.start_date = dates.start_date;
    //     newEvent.end_date = dates.end_date;
    //     newEvents.push(newEvent);
    //   }
    //
    //   await events.createMany(newEvents);
    // }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to create event: " + err.message
    });
  }

  return "ok";
});
