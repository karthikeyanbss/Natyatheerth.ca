import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getDataSource } from '../data-source';
import { Class } from '../entity/Class';

async function getClasses(_req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const ds = await getDataSource();
    const classes = await ds.getRepository(Class).find({ order: { dayOfWeek: 'ASC' } });
    return { status: 200, jsonBody: classes };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to fetch classes' } };
  }
}

async function getClassById(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const ds = await getDataSource();
    const cls = await ds.getRepository(Class).findOne({ where: { id } });
    if (!cls) return { status: 404, jsonBody: { error: 'Class not found' } };
    return { status: 200, jsonBody: cls };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to fetch class' } };
  }
}

async function createClass(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await req.json() as Partial<Class>;
    if (!body.name || !body.level || !body.dayOfWeek || !body.startTime) {
      return { status: 400, jsonBody: { error: 'name, level, dayOfWeek, and startTime are required' } };
    }
    const ds = await getDataSource();
    const repo = ds.getRepository(Class);
    const cls = repo.create(body);
    const saved = await repo.save(cls);
    return { status: 201, jsonBody: saved };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to create class' } };
  }
}

async function updateClass(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const body = await req.json() as Partial<Class>;
    const ds = await getDataSource();
    const repo = ds.getRepository(Class);
    const cls = await repo.findOne({ where: { id } });
    if (!cls) return { status: 404, jsonBody: { error: 'Class not found' } };
    repo.merge(cls, body);
    const saved = await repo.save(cls);
    return { status: 200, jsonBody: saved };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to update class' } };
  }
}

async function deleteClass(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const ds = await getDataSource();
    const result = await ds.getRepository(Class).delete(id);
    if (result.affected === 0) return { status: 404, jsonBody: { error: 'Class not found' } };
    return { status: 204 };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to delete class' } };
  }
}

app.http('getClasses', {
  methods: ['GET'], route: 'classes', authLevel: 'anonymous', handler: getClasses
});
app.http('getClassById', {
  methods: ['GET'], route: 'classes/{id}', authLevel: 'anonymous', handler: getClassById
});
app.http('createClass', {
  methods: ['POST'], route: 'classes', authLevel: 'anonymous', handler: createClass
});
app.http('updateClass', {
  methods: ['PUT'], route: 'classes/{id}', authLevel: 'anonymous', handler: updateClass
});
app.http('deleteClass', {
  methods: ['DELETE'], route: 'classes/{id}', authLevel: 'anonymous', handler: deleteClass
});
