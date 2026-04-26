import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Student, ClassItem, Booking, ContactMessage, RegistrationForm } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  // ── Students ──────────────────────────────────────────────
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.base}/students`, { headers: this.authHeaders() });
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.base}/students/${id}`, { headers: this.authHeaders() });
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.base}/students`, student);
  }

  updateStudent(id: string, student: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.base}/students/${id}`, student, { headers: this.authHeaders() });
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/students/${id}`, { headers: this.authHeaders() });
  }

  // ── Classes ───────────────────────────────────────────────
  getClasses(): Observable<ClassItem[]> {
    return this.http.get<ClassItem[]>(`${this.base}/classes`);
  }

  getClass(id: string): Observable<ClassItem> {
    return this.http.get<ClassItem>(`${this.base}/classes/${id}`);
  }

  createClass(classItem: ClassItem): Observable<ClassItem> {
    return this.http.post<ClassItem>(`${this.base}/classes`, classItem, { headers: this.authHeaders() });
  }

  updateClass(id: string, classItem: Partial<ClassItem>): Observable<ClassItem> {
    return this.http.put<ClassItem>(`${this.base}/classes/${id}`, classItem, { headers: this.authHeaders() });
  }

  deleteClass(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/classes/${id}`, { headers: this.authHeaders() });
  }

  // ── Bookings ──────────────────────────────────────────────
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.base}/bookings`, { headers: this.authHeaders() });
  }

  getBooking(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.base}/bookings/${id}`);
  }

  createBooking(booking: { studentId: string; classId: string }): Observable<Booking> {
    return this.http.post<Booking>(`${this.base}/bookings`, booking);
  }

  updateBookingStatus(id: string, status: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.base}/bookings/${id}`, { status }, { headers: this.authHeaders() });
  }

  // ── Registration (combined student + booking) ─────────────
  register(data: RegistrationForm): Observable<{ student: Student; message: string }> {
    return this.http.post<{ student: Student; message: string }>(`${this.base}/register`, data);
  }

  // ── Contact ───────────────────────────────────────────────
  sendContact(msg: ContactMessage): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/contact`, msg);
  }
}
