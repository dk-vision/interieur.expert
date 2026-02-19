import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // bv. mail.combell.com
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true", // true voor port 465
  auth: {
    user: process.env.SMTP_USER,     // bv. studio@interieur.expert
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht." },
        { status: 400 }
      );
    }

    const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contactformulier</title>
</head>
<body style="margin:0;padding:0;background-color:#F6F4F1;font-family:system-ui,-apple-system,sans-serif;color:#2A2A2A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F6F4F1;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#0000ff;">
                interieur.expert
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#ffffff;border:1px solid rgba(42,42,42,0.1);padding:40px;">

              <p style="margin:0 0 24px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#0000ff;">
                Nieuw bericht via het contactformulier
              </p>

              <h1 style="margin:0 0 32px 0;font-size:24px;font-weight:600;line-height:1.3;color:#2A2A2A;">
                ${subject}
              </h1>

              <!-- Meta -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border-top:1px solid rgba(42,42,42,0.1);">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(42,42,42,0.07);">
                    <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#2A2A2A;opacity:0.45;">Naam</span><br/>
                    <span style="font-size:15px;color:#2A2A2A;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(42,42,42,0.07);">
                    <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#2A2A2A;opacity:0.45;">E-mail</span><br/>
                    <a href="mailto:${email}" style="font-size:15px;color:#0000ff;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#2A2A2A;opacity:0.45;">Bericht</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#2A2A2A;white-space:pre-line;">${message}</p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;padding-top:32px;border-top:1px solid rgba(42,42,42,0.1);">
                <tr>
                  <td>
                    <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background-color:#2A2A2A;color:#F6F4F1;font-size:13px;font-weight:500;text-decoration:none;">
                      Beantwoord ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">
              <p style="margin:0;font-size:11px;color:#2A2A2A;opacity:0.4;line-height:1.6;">
                Dit bericht werd verstuurd via het contactformulier op <a href="https://interieur.expert" style="color:#2A2A2A;">interieur.expert</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"interieur.expert" <${process.env.SMTP_USER}>`,
      to: "studio@interieur.expert",
      replyTo: `"${name}" <${email}>`,
      subject: `Contactformulier: ${subject}`,
      text: `Naam: ${name}\nE-mail: ${email}\nOnderwerp: ${subject}\n\n${message}`,
      html,
    });

    // Add to Campaign Monitor with segment Bron=Contact (best-effort, don't fail on error)
    try {
      const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
      const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;
      if (apiKey && listId) {
        const token = Buffer.from(`${apiKey}:x`).toString("base64");
        await fetch(
          `https://api.createsend.com/api/v3.3/subscribers/${listId}.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              EmailAddress: email,
              Name: name,
              Resubscribe: true,
              ConsentToTrack: "Yes",
              CustomFields: [
                { Key: "Bron", Value: "Contact" },
              ],
            }),
          }
        );
      }
    } catch (cmErr) {
      console.warn("Campaign Monitor (contact) fout:", cmErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Verzenden mislukt. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}
