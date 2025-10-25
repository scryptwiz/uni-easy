-- Drop all tables in the correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS "notifications" CASCADE;
DROP TABLE IF EXISTS "study_sessions" CASCADE;
DROP TABLE IF EXISTS "past_questions" CASCADE;
DROP TABLE IF EXISTS "assignments" CASCADE;
DROP TABLE IF EXISTS "user_courses" CASCADE;
DROP TABLE IF EXISTS "emergency_reports" CASCADE;
DROP TABLE IF EXISTS "properties" CASCADE;
DROP TABLE IF EXISTS "security_alerts" CASCADE;
DROP TABLE IF EXISTS "accounts" CASCADE;
DROP TABLE IF EXISTS "sessions" CASCADE;
DROP TABLE IF EXISTS "verifications" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
