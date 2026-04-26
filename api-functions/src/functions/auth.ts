import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

interface LoginPayload {
  username: string;
  password: string;
}

const ADMIN_USERNAME = process.env['ADMIN_USERNAME'];
const ADMIN_PASSWORD_HASH = process.env['ADMIN_PASSWORD_HASH'];

if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD_HASH environment variables must be set');
}

async function login(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await req.json() as LoginPayload;

    if (!body.username || !body.password) {
      return { status: 400, jsonBody: { error: 'username and password are required' } };
    }

    const isValidUser = body.username === ADMIN_USERNAME;
    const isValidPass = bcrypt.compareSync(body.password, ADMIN_PASSWORD_HASH!);

    if (!isValidUser || !isValidPass) {
      return { status: 401, jsonBody: { error: 'Invalid credentials' } };
    }

    const secret = process.env['JWT_SECRET'];
    if (!secret) {
      ctx.log('JWT_SECRET not configured');
      return { status: 500, jsonBody: { error: 'Server configuration error' } };
    }

    const token = jwt.sign(
      { username: body.username, role: 'admin' },
      secret,
      { expiresIn: '8h' }
    );

    return {
      status: 200,
      jsonBody: {
        token,
        user: { username: body.username, role: 'admin' }
      }
    };
  } catch (err) {
    ctx.log('Login error:', err);
    return { status: 500, jsonBody: { error: 'Login failed' } };
  }
}

app.http('login', {
  methods: ['POST'], route: 'auth/login', authLevel: 'anonymous', handler: login
});
