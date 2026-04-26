import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { Student } from './Student';
import { Class } from './Class';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Student, student => student.bookings, { eager: true })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(() => Class, cls => cls.bookings, { eager: true })
  @JoinColumn({ name: 'class_id' })
  classItem!: Class;

  @Column({ default: 'pending' })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @Column({ name: 'class_type', nullable: true })
  classType?: string;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
