import { Directus } from "@directus/sdk";

const directus = new Directus<Types>(process.env.NUXT_DIRECTUS_URL!);
const eventDelegates = directus.items("event_delegates");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = query.userId;
  const eventId = query.eventId;

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing user ID"
    });
  }

  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing event ID"
    });
  }

  const found = await eventDelegates.readByQuery({
    filter: {
      event: {
        _eq: eventId
      },
      user: {
        _eq: userId
      }
    }
  });

  return found.data && found.data.length > 0;
});
