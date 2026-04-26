import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getDataSource } from '../data-source';
import { Booking } from '../entity/Booking';
import { Student } from '../entity/Student';
import { Class } from '../entity/Class';

async function getBookings(_req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const ds = await getDataSource();
    const bookings = await ds.getRepository(Booking).find({ order: { createdAt: 'DESC' } });
    return { status: 200, jsonBody: bookings };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to fetch bookings' } };
  }
}

async function getBookingById(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const ds = await getDataSource();
    const booking = await ds.getRepository(Booking).findOne({ where: { id } });
    if (!booking) return { status: 404, jsonBody: { error: 'Booking not found' } };
    return { status: 200, jsonBody: booking };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to fetch booking' } };
  }
}

async function createBooking(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await req.json() as { studentId: string; classId: string; notes?: string; classType?: string };
    if (!body.studentId || !body.classId) {
      return { status: 400, jsonBody: { error: 'studentId and classId are required' } };
    }
    const ds = await getDataSource();
    const student = await ds.getRepository(Student).findOne({ where: { id: body.studentId } });
    const cls     = await ds.getRepository(Class).findOne({ where: { id: body.classId } });
    if (!student) return { status: 404, jsonBody: { error: 'Student not found' } };
    if (!cls)     return { status: 404, jsonBody: { error: 'Class not found' } };

    const repo = ds.getRepository(Booking);
    const booking = repo.create({ student, classItem: cls, notes: body.notes, classType: body.classType });
    const saved = await repo.save(booking);
    return { status: 201, jsonBody: saved };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to create booking' } };
  }
}

async function updateBookingStatus(req: HttpRequest, _ctx: InvocationContext): Promise<HttpResponseInit> {
  const id = req.params['id'];
  try {
    const body = await req.json() as { status: string };
    const ds = await getDataSource();
    const repo = ds.getRepository(Booking);
    const booking = await repo.findOne({ where: { id } });
    if (!booking) return { status: 404, jsonBody: { error: 'Booking not found' } };
    booking.status = body.status as 'pending' | 'confirmed' | 'cancelled';
    const saved = await repo.save(booking);
    return { status: 200, jsonBody: saved };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Failed to update booking' } };
  }
}

app.http('getBookings', {
  methods: ['GET'], route: 'bookings', authLevel: 'anonymous', handler: getBookings
});
app.http('getBookingById', {
  methods: ['GET'], route: 'bookings/{id}', authLevel: 'anonymous', handler: getBookingById
});
app.http('createBooking', {
  methods: ['POST'], route: 'bookings', authLevel: 'anonymous', handler: createBooking
});
app.http('updateBookingStatus', {
  methods: ['PATCH'], route: 'bookings/{id}', authLevel: 'anonymous', handler: updateBookingStatus
});
