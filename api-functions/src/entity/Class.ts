import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { Booking } from './Booking';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  level!: string;

  @Column({ default: 'in_person' })
  mode!: string;

  @Column({ name: 'day_of_week' })
  dayOfWeek!: string;

  @Column({ name: 'start_time' })
  startTime!: string;

  @Column({ name: 'end_time', nullable: true })
  endTime?: string;

  @Column({ default: 12 })
  capacity!: number;

  @OneToMany(() => Booking, booking => booking.classItem)
  bookings?: Booking[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
