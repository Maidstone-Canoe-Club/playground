import { Directus } from "@directus/sdk";

const directus = new Directus<Types>(process.env.NUXT_DIRECTUS_URL!);
const eventDelegates = directus.items("event_delegates");

export async function isUserBooked (userId, eventId) : Promise<boolean> {
  console.log("url", process.env.NUXT_DIRECTUS_URL);
  const found = await eventDelegates.readByQuery({
    filter: {
      user: {
        _eq: userId
      },
      event: {
        _eq: eventId
      }
    }
  });

  return found.data && found.data.length > 0;
}

export async function bookUserOnEvent (userId: string, eventId: string | number) {
  await directus.auth.static(process.env.DIRECTUS_STATIC_TOKEN!);
  await eventDelegates.createOne({
    user: userId,
    event: eventId
  });
}
