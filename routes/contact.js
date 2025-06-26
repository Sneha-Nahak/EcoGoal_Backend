require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Email to yourself
    await transporter.sendMail({
      from: `"EcoGoals Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `📬 Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Confirmation to user
    await transporter.sendMail({
      from: `"EcoGoals Team" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Thanks for contacting EcoGoals!`,
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! We’ve received your message and will reply soon.</p>
        <blockquote style="background:#f0fdf4; padding:1rem; border-left:4px solid #38a169;">
          ${message}
        </blockquote>
        <p style="margin-top:1rem;">– The EcoGoals Team 💚</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;