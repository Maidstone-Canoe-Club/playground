import { Directus } from "@directus/sdk";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { EventItem } from "~/types";

type Types = {
  events: EventItem
}

const directus = new Directus<Types>(process.env.NUXT_DIRECTUS_URL!);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const start = query.start;
  const end = query.end;

  const events = directus.items("events");

  let items;
  try {
    items = await events.readByQuery({
      filter: {
        _and: [
          {
            start_date: { _lte: end }
          },
          {
            _or: [
              {
                end_date: { _gt: start }
              },
              {
                end_date: { _null: true }
              }
            ]
          }
        ]
      }
    });

    console.log("items", items.value);
  } catch (e) {
    console.error("error loading events", e);
  }

  // return "ok";
  return items;
});
