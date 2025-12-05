// api/contact.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // Allow only POST
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
    return;
  }

  try {
    // Make sure we always end up with a JS object
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body || "{}");
      } catch {
        body = {};
      }
    }
    body = body || {};

    const { name, email, budget, timeline, message } = body;

    const TO_EMAIL = "toussaint.systemdevelopment@gmail.com";

    const subject = `New project inquiry from ${name || "Website visitor"}`;
    const text = `
New contact form submission from Toussaint IT System Development

Name: ${name || "-"}
Email: ${email || "-"}
Budget: ${budget || "-"}
Timeline: ${timeline || "-"}

Message:
${message || "-"}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: "Website Contact <contact@wow5050.org>", // wow5050.org is verified in Resend
      to: TO_EMAIL,
      reply_to: email || undefined,
      subject,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: false,
          error: "Resend error",
          details: error,
        })
      );
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true, data }));
  } catch (err) {
    console.error("API /api/contact failed:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: false,
        error: "Server error",
        details: err.message || String(err),
      })
    );
  }
};
