import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import * as nodemailer from 'nodemailer';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendContact(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await req.json() as ContactPayload;

    if (!body.name || !body.email || !body.subject || !body.message) {
      return { status: 400, jsonBody: { error: 'name, email, subject, and message are required' } };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return { status: 400, jsonBody: { error: 'Invalid email address' } };
    }

    const transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port: parseInt(process.env['SMTP_PORT'] ?? '587', 10),
      secure: false,
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS']
      }
    });

    const adminEmail = process.env['ADMIN_EMAIL'] ?? 'sruthi@natyatheerth.com';
    const fromEmail  = process.env['EMAIL_FROM']  ?? 'noreply@natyatheerth.com';

    await transporter.sendMail({
      from: fromEmail,
      to:   adminEmail,
      replyTo: body.email,
      subject: `[Natya Theerth] Contact: ${escapeHtml(body.subject)}`,
      html: `
        <h2>New Contact Message – Natya Theerth</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${escapeHtml(body.name)}</td></tr>
          <tr><td><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td></tr>
          ${body.phone ? `<tr><td><strong>Phone:</strong></td><td>${escapeHtml(body.phone)}</td></tr>` : ''}
          <tr><td><strong>Subject:</strong></td><td>${escapeHtml(body.subject)}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${escapeHtml(body.message).replace(/\n/g, '<br>')}</td></tr>
        </table>
      `
    });

    // Send auto-reply to sender
    await transporter.sendMail({
      from: fromEmail,
      to:   body.email,
      subject: 'Thank you for contacting Natya Theerth Kalai Koodam',
      html: `
        <h2>Thank you, ${escapeHtml(body.name)}!</h2>
        <p>We have received your message and will get back to you within 24–48 hours.</p>
        <p>If your enquiry is urgent, please call us at <strong>+1 902-441-8675</strong>.</p>
        <br>
        <p>Warm regards,<br>Natya Theerth Kalai Koodam</p>
      `
    });

    ctx.log(`Contact form submitted by ${body.email}`);
    return { status: 200, jsonBody: { message: 'Message sent successfully' } };
  } catch (err) {
    ctx.log('Contact send error:', err);
    return { status: 500, jsonBody: { error: 'Failed to send message. Please email sruthi@natyatheerth.com directly.' } };
  }
}

app.http('sendContact', {
  methods: ['POST'], route: 'contact', authLevel: 'anonymous', handler: sendContact
});
