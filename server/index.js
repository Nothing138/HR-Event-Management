/**
 * server/index.js
 * ──────────────────────────────────────────────────────────────
 * Express backend for MH360 website.
 * Handles two email routes:
 *   POST /api/contact     – simple contact form
 *   POST /api/getstarted  – detailed Get Started enquiry form
 *
 * Setup:
 *   1. npm install express nodemailer cors dotenv
 *   2. Create a .env file (see .env.example)
 *   3. node server/index.js   (or use nodemon)
 * ──────────────────────────────────────────────────────────────
 */

require("dotenv").config();
const express    = require("express");
const nodemailer = require("nodemailer");
const cors       = require("cors");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Vite dev server
}));
app.use(express.json());

// ── Nodemailer transporter ────────────────────────────────────
// Using Gmail. For production, consider SendGrid or Brevo.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // Gmail App Password (NOT your real password)
  },
});

// Verify connection on startup
transporter.verify((err) => {
  if (err) {
    console.error("❌ Mail transporter error:", err.message);
  } else {
    console.log("✅ Mail transporter ready");
  }
});

// ── Helper: send mail ─────────────────────────────────────────
async function sendMail(options) {
  return transporter.sendMail({
    from: `"MH360 Website" <${process.env.EMAIL_USER}>`,
    to:   process.env.EMAIL_RECEIVER || "mh360syl@gmail.com",
    ...options,
  });
}

// ── Route: POST /api/contact ──────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B2B6B; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #fff; margin: 0; font-size: 20px;">📩 New Contact Form Submission</h2>
        <p style="color: #a8b4d8; margin: 6px 0 0; font-size: 13px;">Via MH360 Website — Contact Section</p>
      </div>
      <div style="background: #f9faff; padding: 28px 32px; border: 1px solid #e0e4f0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 0; color: #7b88b8; width: 130px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-weight: 600; color: #1a1a2e;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #7b88b8;">Email</td>
              <td style="padding: 8px 0; color: #1a1a2e;"><a href="mailto:${email}" style="color:#C0392B">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #7b88b8;">Phone</td>
              <td style="padding: 8px 0; color: #1a1a2e;">${phone || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #7b88b8;">Service</td>
              <td style="padding: 8px 0; color: #1a1a2e;">${service || "Not specified"}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e0e4f0; margin: 20px 0;" />
        <h4 style="color: #1B2B6B; margin: 0 0 10px;">Message</h4>
        <p style="color: #3a4265; line-height: 1.7; white-space: pre-line;">${message}</p>
      </div>
      <div style="background: #1B2B6B; padding: 16px 32px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #7b88b8; font-size: 12px; margin: 0;">MH360 · Marketing & Human Resources Solutions · Sylhet, Bangladesh</p>
      </div>
    </div>
  `;

  try {
    await sendMail({
      subject: `📩 Contact Form: ${name} — ${service || "General Inquiry"}`,
      html,
      replyTo: email,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from:    `"MH360" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: "We received your message — MH360",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="background: #1B2B6B; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0;">Thank you, ${name}!</h2>
          </div>
          <div style="background: #f9faff; padding: 28px 32px; border: 1px solid #e0e4f0; border-top: none; line-height: 1.75; color: #3a4265;">
            <p>We've received your message and our team will get back to you within <strong>one business day</strong>.</p>
            <p style="margin-top: 16px;">In the meantime, feel free to call us at <strong>01711086055</strong> or email directly at <a href="mailto:mh360syl@gmail.com" style="color:#C0392B">mh360syl@gmail.com</a>.</p>
            <p style="margin-top: 24px; font-style: italic; color: #1B2B6B;">"Contact us today to grow smarter, faster & stronger."</p>
            <p style="color: #7b88b8; font-size: 13px; margin-top: 4px;">— MH360 Team, Sylhet</p>
          </div>
          <div style="background: #1B2B6B; padding: 14px 32px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #7b88b8; font-size: 12px; margin: 0;">MH360 · One Agency · 360° Solution</p>
          </div>
        </div>
      `,
    });

    res.json({ message: "Email sent successfully." });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// ── Route: POST /api/getstarted ───────────────────────────────
app.post("/api/getstarted", async (req, res) => {
  const {
    name, email, phone, company, position,
    services, budget, timeline, message,
    hearFrom, website,
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const servicesList = Array.isArray(services) ? services.join(", ") : services;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1B2B6B, #0f1a45); padding: 28px 36px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #fff; margin: 0; font-size: 22px;">🚀 New Get Started Enquiry</h2>
        <p style="color: #a8b4d8; margin: 8px 0 0; font-size: 13px;">Via MH360 Website — Get Started Modal</p>
      </div>

      <div style="background: #f9faff; padding: 28px 36px; border: 1px solid #e0e4f0; border-top: none;">

        <!-- Contact Info -->
        <h3 style="color: #1B2B6B; font-size: 15px; margin: 0 0 14px; text-transform: uppercase; letter-spacing: .06em;">Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14.5px; margin-bottom: 24px;">
          <tr><td style="padding:7px 0;color:#7b88b8;width:130px">Name</td>        <td style="padding:7px 0;font-weight:600;color:#1a1a2e">${name}</td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Email</td>       <td style="padding:7px 0"><a href="mailto:${email}" style="color:#C0392B">${email}</a></td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Phone</td>       <td style="padding:7px 0;color:#1a1a2e">${phone}</td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Company</td>     <td style="padding:7px 0;color:#1a1a2e">${company || "—"}</td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Position</td>    <td style="padding:7px 0;color:#1a1a2e">${position || "—"}</td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Website</td>     <td style="padding:7px 0;color:#1a1a2e">${website || "—"}</td></tr>
        </table>

        <hr style="border:none;border-top:1px solid #e0e4f0;margin:0 0 24px"/>

        <!-- Project Details -->
        <h3 style="color: #1B2B6B; font-size: 15px; margin: 0 0 14px; text-transform: uppercase; letter-spacing: .06em;">Project Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14.5px; margin-bottom: 24px;">
          <tr><td style="padding:7px 0;color:#7b88b8;width:130px;vertical-align:top">Services</td>
              <td style="padding:7px 0;color:#1a1a2e">${servicesList || "—"}</td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Budget</td>      <td style="padding:7px 0;color:#1a1a2e;font-weight:600">${budget || "—"}</td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Timeline</td>    <td style="padding:7px 0;color:#1a1a2e">${timeline || "—"}</td></tr>
          <tr><td style="padding:7px 0;color:#7b88b8">Heard from</td>  <td style="padding:7px 0;color:#1a1a2e">${hearFrom || "—"}</td></tr>
        </table>

        <hr style="border:none;border-top:1px solid #e0e4f0;margin:0 0 20px"/>

        <h3 style="color: #1B2B6B; font-size: 15px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: .06em;">Project Message</h3>
        <p style="color:#3a4265;line-height:1.75;white-space:pre-line;">${message}</p>
      </div>

      <div style="background:#1B2B6B;padding:16px 36px;border-radius:0 0 8px 8px;text-align:center;">
        <p style="color:#7b88b8;font-size:12px;margin:0;">MH360 · Marketing & Human Resources Solutions · Sylhet, Bangladesh</p>
      </div>
    </div>
  `;

  try {
    await sendMail({
      subject: `🚀 Get Started Enquiry: ${name}${company ? ` — ${company}` : ""}`,
      html,
      replyTo: email,
    });

    // Auto-reply
    await transporter.sendMail({
      from:    `"MH360" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: "Your MH360 Enquiry Has Been Received!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg,#1B2B6B,#0f1a45); padding: 28px 36px; border-radius: 8px 8px 0 0;">
            <h2 style="color:#fff;margin:0;">We're On It, ${name}! 🚀</h2>
          </div>
          <div style="background:#f9faff;padding:28px 36px;border:1px solid #e0e4f0;border-top:none;line-height:1.78;color:#3a4265;">
            <p>Thank you for reaching out to MH360. We've received your detailed enquiry and are reviewing the best way to support your goals.</p>
            <p style="margin-top:14px;">A member of our team will contact you within <strong>one business day</strong> at <a href="mailto:${email}" style="color:#C0392B">${email}</a> or <strong>${phone}</strong>.</p>
            <div style="background:#F4F6FB;border-left:4px solid #C0392B;padding:14px 18px;margin:24px 0;border-radius:0 8px 8px 0;">
              <p style="font-style:italic;color:#1B2B6B;margin:0;">"Contact us today to grow smarter, faster & stronger."</p>
              <p style="color:#7b88b8;font-size:12.5px;margin:4px 0 0">— MH360 Team, Sylhet</p>
            </div>
            <p>📞 <strong>01711086055</strong><br/>✉️ <a href="mailto:mh360syl@gmail.com" style="color:#C0392B">mh360syl@gmail.com</a></p>
          </div>
          <div style="background:#1B2B6B;padding:14px 36px;border-radius:0 0 8px 8px;text-align:center;">
            <p style="color:#7b88b8;font-size:12px;margin:0;">MH360 · One Agency · 360° Solution</p>
          </div>
        </div>
      `,
    });

    res.json({ message: "Enquiry submitted and email sent." });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// ── Health check ──────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ status: "ok", service: "MH360 API" }));

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 MH360 API server running on http://localhost:${PORT}`);
  console.log(`   POST /api/contact    – Contact form emails`);
  console.log(`   POST /api/getstarted – Get Started form emails\n`);
});