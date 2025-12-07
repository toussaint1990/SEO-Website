// api/create-checkout-session.js

import Stripe from "stripe";
import dotenv from "dotenv";

// Load env vars locally
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY environment variable.");
}

const stripe = new Stripe(stripeSecretKey);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: "Missing priceId" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // this comes from App.jsx
          quantity: 1,
        },
      ],
      success_url: `${process.env.SITE_URL}/?checkout=success`,
      cancel_url: `${process.env.SITE_URL}/?checkout=cancel`,
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({
      error: "Stripe error",
      message: err.message,
      statusCode: err.statusCode,
      type: err.type,
      code: err.code,
      param: err.param,
    });
  }
}
