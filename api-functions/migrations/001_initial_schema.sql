-- Natya Theerth Kalai Koodam – Initial Schema
-- Run this against your PostgreSQL database
-- Note: gen_random_uuid() is built-in from PostgreSQL 13+ (no extension needed)

CREATE TABLE IF NOT EXISTS students (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  age         INTEGER NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  phone       VARCHAR(50) NOT NULL,
  address     TEXT,
  mode        VARCHAR(20) DEFAULT 'in_person',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  level       VARCHAR(100) NOT NULL,
  mode        VARCHAR(20) DEFAULT 'in_person',
  day_of_week VARCHAR(20) NOT NULL,
  start_time  VARCHAR(20) NOT NULL,
  end_time    VARCHAR(20),
  capacity    INTEGER DEFAULT 12,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id   UUID NOT NULL REFERENCES classes(id)  ON DELETE CASCADE,
  status     VARCHAR(20) DEFAULT 'pending',
  class_type VARCHAR(20),
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id   UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount       DECIMAL(10,2) NOT NULL,
  currency     VARCHAR(3) DEFAULT 'CAD',
  status       VARCHAR(20) DEFAULT 'pending',
  provider     VARCHAR(50),
  provider_ref VARCHAR(255),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Seed sample classes
INSERT INTO classes (name, description, level, mode, day_of_week, start_time, end_time, capacity) VALUES
  ('Beginner Group',        'Foundation adavus and postures for new students',      'Beginner',            'in_person', 'Saturday',  '10:00 AM', '11:30 AM', 12),
  ('Elementary Group',      'Alarippu, Jatiswaram and Abhinaya introduction',       'Elementary',          'in_person', 'Saturday',  '12:00 PM', '1:30 PM',  10),
  ('Intermediate/Advanced', 'Varnam, Padam and full margam preparation',            'Intermediate/Advanced','in_person','Sunday',    '10:00 AM', '12:00 PM',  8),
  ('Children (5-8 yrs)',    'Fun introduction to classical dance for young children','Beginner',            'in_person', 'Sunday',    '2:00 PM',  '3:00 PM',  10),
  ('Women Group Class',     'Dedicated group class for women of all levels',        'All Levels',          'in_person', 'Wednesday', '7:00 PM',  '8:30 PM',  12),
  ('Private/Online',        'One-on-one classes — flexible scheduling',             'All Levels',          'both',      'Flexible',  'By Appointment', '',  1)
ON CONFLICT DO NOTHING;
