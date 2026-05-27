import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getDataSource } from '../data-source';
import { Student } from '../entity/Student';
import * as nodemailer from 'nodemailer';

interface RegistrationPayload {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  mode: string;
  classType: string;
  level: string;
  preferredDay: string;
  preferredTime: string;
  notes?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendRegistrationEmails(body: RegistrationPayload, ctx: InvocationContext): Promise<void> {
  const smtpHost = process.env['SMTP_HOST'];
  const smtpUser = process.env['SMTP_USER'];
  const smtpPass = process.env['SMTP_PASS'];

  if (!smtpHost || !smtpUser || !smtpPass) {
    ctx.warn('SMTP is not fully configured. Skipping registration email delivery.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(process.env['SMTP_PORT'] ?? '587', 10),
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const adminEmail = process.env['ADMIN_EMAIL'] ?? 'sruthi@natyatheerth.com';
  const fromEmail = process.env['EMAIL_FROM'] ?? 'noreply@natyatheerth.com';

  await transporter.sendMail({
    from: fromEmail,
    to: adminEmail,
    replyTo: body.email,
    subject: `[Natya Theerth] New Registration: ${escapeHtml(body.firstName)} ${escapeHtml(body.lastName)}`,
    html: `
      <h2>New Registration – Natya Theerth</h2>
      <table>
        <tr><td><strong>Name:</strong></td><td>${escapeHtml(body.firstName)} ${escapeHtml(body.lastName)}</td></tr>
        <tr><td><strong>Age:</strong></td><td>${escapeHtml(String(body.age ?? ''))}</td></tr>
        <tr><td><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td></tr>
        <tr><td><strong>Phone:</strong></td><td>${escapeHtml(body.phone)}</td></tr>
        <tr><td><strong>Location:</strong></td><td>${escapeHtml(body.address)}</td></tr>
        <tr><td><strong>Mode:</strong></td><td>${escapeHtml(body.mode)}</td></tr>
        <tr><td><strong>Class Type:</strong></td><td>${escapeHtml(body.classType)}</td></tr>
        <tr><td><strong>Level:</strong></td><td>${escapeHtml(body.level)}</td></tr>
        <tr><td><strong>Preferred Day:</strong></td><td>${escapeHtml(body.preferredDay)}</td></tr>
        <tr><td><strong>Preferred Time:</strong></td><td>${escapeHtml(body.preferredTime)}</td></tr>
        <tr><td><strong>Notes:</strong></td><td>${escapeHtml(body.notes ?? '').replace(/\n/g, '<br>') || 'N/A'}</td></tr>
      </table>
    `
  });

  await transporter.sendMail({
    from: fromEmail,
    to: body.email,
    subject: 'Thank you for registering with Natya Theerth Kalai Koodam',
    html: `
      <h2>Welcome, ${escapeHtml(body.firstName)}!</h2>
      <p>Thank you for registering with Natya Theerth Kalai Koodam.</p>
      <p>We have received your registration details and Guru Sruthi will contact you within 48 hours.</p>
      <p>If you have urgent questions, call <strong>+1 902-441-8675</strong>.</p>
      <br>
      <p>Warm regards,<br>Natya Theerth Kalai Koodam</p>
    `
  });
}

async function register(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await req.json() as RegistrationPayload;

    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return { status: 400, jsonBody: { error: 'firstName, lastName, email, and phone are required' } };
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(Student);

    const existing = await repo.findOne({ where: { email: body.email } });
    if (existing) {
      return { status: 409, jsonBody: { error: 'A student with this email already exists', studentId: existing.id } };
    }

    const student = repo.create({
      firstName: body.firstName,
      lastName:  body.lastName,
      age:       body.age,
      email:     body.email,
      phone:     body.phone,
      address:   body.address,
      mode:      body.mode
    });

    const saved = await repo.save(student);

    try {
      await sendRegistrationEmails(body, ctx);
    } catch (mailErr) {
      ctx.log('Registration email send error:', mailErr);
    }

    ctx.log(`New registration: ${body.email}`);

    return {
      status: 201,
      jsonBody: {
        student: saved,
        message: `Welcome, ${body.firstName}! Registration received. Guru Sruthi will be in touch within 48 hours.`
      }
    };
  } catch (err) {
    ctx.log('Registration error:', err);
    return { status: 500, jsonBody: { error: 'Registration failed. Please try again.' } };
  }
}

app.http('register', {
  methods: ['POST'], route: 'register', authLevel: 'anonymous', handler: register
});
