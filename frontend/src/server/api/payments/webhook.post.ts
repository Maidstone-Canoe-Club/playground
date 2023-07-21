import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const sig = getRequestHeader(event, "stripe-signature");
  if (!sig) {
    throw createError({
      statusCode: 400,
      statusMessage: "Webhook error: No stripe signature in header"
    });
  }
  const rawBody = await readRawBody(event);
  if (!rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: "Webhook error: No body"
    });
  }

  console.log("body", rawBody, "endpoint secret", endpointSecret, "sig", sig);

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    console.log("created stripe event");
  } catch (err) {
    console.log(err);
    throw createError({
      statusCode: 400,
      statusMessage: "Webhook error: Error validating webhook event"
    });
  }

  console.log("event type", stripeEvent.type);

  if (stripeEvent.type === "checkout.session.completed") {
    console.log("completed!");
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(stripeEvent.data.object.id,
      {
        expand: ["line_items"]
      });

    const lineItems = sessionWithLineItems.line_items;
    const metadata = sessionWithLineItems.metadata;

    console.log("got metadata", metadata);
    // console.log("got line items!", JSON.stringify(lineItems));
  }

  return `handled ${stripeEvent.type}`;
});
