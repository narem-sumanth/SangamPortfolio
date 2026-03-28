import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function getSmtpConfig() {
  const user = process.env.EMAIL_USER ?? process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS ?? process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Missing SMTP credentials");
  }

  return { user, pass };
}

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (
      typeof email !== "string" ||
      typeof message !== "string" ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { user, pass } = getSmtpConfig();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: [email.trim(),"sangampazare107@gmailcom"],
      replyTo: user,
      subject: "Thanks for reaching out",
      text: `Hi,\n\nThanks for contacting me through my portfolio.\n\nI received your message:\n${message.trim()}\n\nI'll get back to you soon.\n\nBest,\nSangam`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to send message" },
      { status: 500 }
    );
  }
}
