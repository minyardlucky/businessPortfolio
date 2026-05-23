const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "minyardlucky@gmail.com",
      subject: "New Portfolio Contact Message",
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    return res.status(200).json({
      ok: true,
      id: result.id
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Email failed"
    });
  }
};