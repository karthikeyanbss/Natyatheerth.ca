import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Student } from './entity/Student';
import { Class } from './entity/Class';
import { Booking } from './entity/Booking';
import { Payment } from './entity/Payment';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host:     process.env['POSTGRES_HOST'] ?? 'localhost',
  port:     parseInt(process.env['POSTGRES_PORT'] ?? '5432', 10),
  username: process.env['POSTGRES_USER'] ?? 'postgres',
  password: process.env['POSTGRES_PASSWORD'] ?? '',
  database: process.env['POSTGRES_DB'] ?? 'natyatheerth',
  synchronize: process.env['NODE_ENV'] !== 'production',
  logging:     process.env['NODE_ENV'] !== 'production',
  entities:    [Student, Class, Booking, Payment],
  migrations:  ['src/migrations/*.ts'],
  ssl: process.env['POSTGRES_SSL'] === 'true' ? { rejectUnauthorized: false } : false
});

let initialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (!initialized) {
    await AppDataSource.initialize();
    try {
      await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    } catch (err) {
      // The uuid-ossp extension may already exist or the user may lack SUPERUSER privileges.
      // In production, ensure the extension is created by a superuser before running migrations.
      console.warn('Could not create uuid-ossp extension:', err);
    }
    initialized = true;
  }
  return AppDataSource;
}
