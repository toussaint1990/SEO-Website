// api/create-checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    const price = await stripe.prices.retrieve(priceId);

    // ✅ Detect recurring vs one-time price
    const mode =
      price.recurring && price.recurring.interval ? "subscription" : "payment";

    const domainUrl =
      process.env.SITE_URL ||
      "https://www.toussaintdigitaldevelopments.com";

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${domainUrl}/?checkout=success`,
      cancel_url: `${domainUrl}/?checkout=cancel`,
      payment_method_types: ["card"],
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err.message);
    return res.status(500).json({ error: "Stripe error", message: err.message });
  }
}
