import Stripe from "stripe";
import { Directus } from "@directus/sdk";
import { format } from "date-fns";
import { EventItem } from "~/types.d";

const stripe = new Stripe(process.env.STRIPE_KEY);

const directus = new Directus<Types>(process.env.NUXT_DIRECTUS_URL!);
const events = directus.items("events");

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

  console.log("loading event", query.eventId);
  try {
    const eventItem = await events.readOne<EventItem>(query.eventId);

    if (!eventItem) {
      throw new Error("Could not load event");
    }

    console.log("found event", eventItem);
    const eventDate = format(new Date(eventItem.start_date), "do MMMM yyyy");
    const productName = `${eventItem.title}: ${eventDate}`;

    const session = await stripe.checkout.sessions.create({
      metadata: {
        date: eventDate,
        event_id: eventItem.id,
        user_id: "d9a9c95d-7791-43be-b458-5d59d4ddd542"
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "GBP",
            unit_amount: eventItem.price,
            product_data: {
              name: productName
            }
          }
        }
      ],
      mode: "payment",
      success_url: `${baseUrl}/payments/success`,
      cancel_url: `${baseUrl}/payments/cancel`
    });
    return sendRedirect(event, session.url, 302);
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to submit payment: " + e.message
    });
  }
});
