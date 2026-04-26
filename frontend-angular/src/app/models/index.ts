export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  mode: 'in_person' | 'online';
  createdAt?: string;
}

export interface ClassItem {
  id?: string;
  name: string;
  description: string;
  level: string;
  mode: 'in_person' | 'online' | 'both';
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled?: number;
}

export interface Booking {
  id?: string;
  studentId: string;
  classId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  student?: Student;
  classItem?: ClassItem;
  createdAt?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  mode: 'in_person' | 'online';
  classType: 'group' | 'private';
  level: string;
  preferredDay: string;
  preferredTime: string;
  notes?: string;
}
