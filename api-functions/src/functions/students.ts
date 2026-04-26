import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getDataSource } from '../data-source';
import { Student } from '../entity/Student';

async function getStudents(_req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Student);
    const students = await repo.find({ order: { createdAt: 'DESC' } });
    return { status: 200, jsonBody: students };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to fetch students' } };
  }
}

async function getStudentById(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const ds = await getDataSource();
    const student = await ds.getRepository(Student).findOne({ where: { id } });
    if (!student) return { status: 404, jsonBody: { error: 'Student not found' } };
    return { status: 200, jsonBody: student };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to fetch student' } };
  }
}

async function createStudent(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await req.json() as Partial<Student>;
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return { status: 400, jsonBody: { error: 'firstName, lastName, email, and phone are required' } };
    }
    const ds = await getDataSource();
    const repo = ds.getRepository(Student);
    const student = repo.create(body);
    const saved = await repo.save(student);
    return { status: 201, jsonBody: saved };
  } catch (err: any) {
    if (err?.code === '23505') {
      return { status: 409, jsonBody: { error: 'A student with this email already exists' } };
    }
    return { status: 500, jsonBody: { error: 'Failed to create student' } };
  }
}

async function updateStudent(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const body = await req.json() as Partial<Student>;
    const ds = await getDataSource();
    const repo = ds.getRepository(Student);
    const student = await repo.findOne({ where: { id } });
    if (!student) return { status: 404, jsonBody: { error: 'Student not found' } };
    repo.merge(student, body);
    const saved = await repo.save(student);
    return { status: 200, jsonBody: saved };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to update student' } };
  }
}

async function deleteStudent(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const ds = await getDataSource();
    const result = await ds.getRepository(Student).delete(id);
    if (result.affected === 0) return { status: 404, jsonBody: { error: 'Student not found' } };
    return { status: 204 };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to delete student' } };
  }
}

app.http('getStudents', {
  methods: ['GET'], route: 'students', authLevel: 'anonymous', handler: getStudents
});
app.http('getStudentById', {
  methods: ['GET'], route: 'students/{id}', authLevel: 'anonymous', handler: getStudentById
});
app.http('createStudent', {
  methods: ['POST'], route: 'students', authLevel: 'anonymous', handler: createStudent
});
app.http('updateStudent', {
  methods: ['PUT'], route: 'students/{id}', authLevel: 'anonymous', handler: updateStudent
});
app.http('deleteStudent', {
  methods: ['DELETE'], route: 'students/{id}', authLevel: 'anonymous', handler: deleteStudent
});
