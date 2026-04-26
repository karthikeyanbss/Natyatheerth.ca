import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getDataSource } from '../data-source';
import { Student } from '../entity/Student';

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
