import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "minyardlucky@gmail.com",
      subject: "New Portfolio Contact Message",
      reply_to: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    });

    return res.status(200).json({
      ok: true,
      id: result.id
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Failed to send email"
    });
  }
}