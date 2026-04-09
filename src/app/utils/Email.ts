import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
    const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
    const SMTP_USER = process.env.EMAIL_GMAIL_USER;
    const SMTP_PASS = process.env.EMAIL_GMAIL_PASS;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!SMTP_USER || !SMTP_PASS) {
      throw new Error("❌ Missing SMTP credentials in .env");
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"AskLocal" <${SMTP_USER}>`,
      to,
      subject,
      html,
      bcc: ADMIN_EMAIL && to !== ADMIN_EMAIL ? ADMIN_EMAIL : undefined,
    });

    console.log(` Email sent via SMTP to: ${to}`);
  } catch (error: any) {
    console.error("SMTP Email Error:", error.message || error);
  }
};