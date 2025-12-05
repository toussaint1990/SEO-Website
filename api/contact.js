// api/contact.js  (Vercel serverless function, ESM version)
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { name, email, budget, timeline, message } = req.body ?? {};

    if (!name || !email || !message) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    await resend.emails.send({
      // MUST be a sender on a verified domain in your Resend account
      from: "Website Contact <contact@wow5050.org>",
      to: "toussaint.systemdevelopment@gmail.com",
      reply_to: email,
      subject: `New project inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Budget: ${budget || "not specified"}
Timeline: ${timeline || "not specified"}

Message:
${message}
      `.trim(),
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
