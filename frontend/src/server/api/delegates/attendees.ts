import { Directus } from "@directus/sdk";

const directus = new Directus<Types>(process.env.NUXT_DIRECTUS_URL!);
const eventDelegates = directus.items("event_delegates");
const users = directus.items("directus_users");

export default defineEventHandler(async (event) => {
  // Only return attendees if user is logged in
  // and user has role of coach

  await directus.auth.static("vACWBnWsLMVkLvhr7h4zEv24srlQ7lFW");

  const query = getQuery(event);
  const eventId = query.eventId;

  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: "No event ID provided"
    });
  }

  const delegates = await eventDelegates.readByQuery({
    filter: {
      event: {
        _eq: eventId
      }
    }
  });

  if (!delegates.data || delegates.data.length === 0) {
    console.log("no delegates found for", eventId);
    return [];
  }

  console.log("found", delegates.data.map(d => d.user));

  try {
    const attendees = await users.readMany(delegates.data.map(d => d.user));

    return attendees.data;
  } catch (e) {
    console.log("nope", e);
  }
});
