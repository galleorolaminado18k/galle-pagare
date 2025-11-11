import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { pdfBase64, filename, toEmails = [], metadata } = req.body || {};
    if (!pdfBase64 || !filename) return res.status(400).json({ error: "Missing pdfBase64/filename" });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fallback = process.env.TO_EMAIL || "galleaprobaciones@gmail.com";
    const to = (Array.isArray(toEmails) && toEmails.length ? toEmails : [fallback]).filter(Boolean);

    const monto = metadata?.monto ? Number(metadata.monto).toLocaleString('es-CO') : '';
    const subject = `Pagaré firmado ${metadata?.numeroPagare || ""} — ${metadata?.deudor || ""} — COP $${monto}`;

    const metaJson = Buffer.from(JSON.stringify(metadata || {}, null, 2)).toString('base64');

    await resend.emails.send({
      from: "Galle 18K <onboarding@resend.dev>",
      to,
      subject,
      text: "Adjuntamos el pagaré firmado en PDF y metadatos (JSON).",
      headers: { "X-Pagare-Numero": String(metadata?.numeroPagare || ''), "X-Pagare-Monto": String(metadata?.monto || '') },
      attachments: [
        { filename, content: pdfBase64, contentType: "application/pdf" },
        { filename: (metadata?.numeroPagare || 'metadata') + ".json", content: metaJson, contentType: "application/json" }
      ],
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "send-failed" });
  }
}