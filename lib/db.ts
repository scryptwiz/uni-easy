import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, sessions, accounts, verifications, properties, securityAlerts, emergencyReports, courses, userCourses, assignments, pastQuestions, studySessions, notifications } from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { 
  schema: { users, sessions, accounts, verifications, properties, securityAlerts, emergencyReports, courses, userCourses, assignments, pastQuestions, studySessions, notifications }
});
