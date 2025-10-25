import { pgTable, text, timestamp, uuid, integer, boolean, decimal, jsonb, real } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  image: text("image"),
  emailVerified: text("email_verified"),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
  studentId: text("student_id"),
  department: text("department"),
  level: text("level"),
  phone: text("phone"),
});

// Sessions table
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: text("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

// Accounts table (for OAuth)
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: text("access_token_expires_at"),
  refreshTokenExpiresAt: text("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Verification table
export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").default("now()").notNull(),
  updatedAt: text("updated_at").default("now()").notNull(),
});

// Properties table
export const properties = pgTable("properties", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  price: integer("price").notNull(),
  type: text("type").notNull(),
  amenities: jsonb("amenities").$type<string[]>(),
  images: jsonb("images").$type<string[]>(),
  available: boolean("available").default(true),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  agentId: text("agent_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Security alerts table
export const securityAlerts = pgTable("security_alerts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull().$type<"low" | "medium" | "high" | "critical">(),
  type: text("type").notNull().$type<"power" | "security" | "weather" | "maintenance" | "general">(),
  location: text("location"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Emergency reports table
export const emergencyReports = pgTable("emergency_reports", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull().$type<"medical" | "security" | "fire" | "other">(),
  urgency: text("urgency").notNull().$type<"low" | "medium" | "high" | "critical">(),
  description: text("description").notNull(),
  location: text("location"),
  status: text("status").default("pending").$type<"pending" | "in_progress" | "resolved">(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Courses table
export const courses = pgTable("courses", {
  id: text("id").primaryKey(),
  code: text("code").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  credits: integer("credits").notNull(),
  semester: text("semester").notNull(),
  instructor: text("instructor").notNull(),
  color: text("color").default("blue"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User courses table (enrollment)
export const userCourses = pgTable("user_courses", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  progress: integer("progress").default(0),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
});

// Assignments table
export const assignments = pgTable("assignments", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  type: text("type").notNull().$type<"assignment" | "exam" | "project" | "quiz">(),
  priority: text("priority").default("medium").$type<"low" | "medium" | "high" | "urgent">(),
  points: integer("points"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Notifications table
export const notifications = pgTable("notifications", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().$type<"info" | "warning" | "error" | "success">(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Original Past questions table (existing structure)
export const pastQuestions = pgTable("past_questions", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  uploadedBy: text("uploaded_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"),
  academicSession: text("academic_session").notNull(),
  year: text("year").notNull(),
  downloads: integer("downloads").default(0),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Original Study sessions table (existing structure)
export const studySessions = pgTable("study_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  duration: integer("duration").notNull(), // in minutes
  topic: text("topic"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI Questions table (new feature)
export const aiQuestions = pgTable("ai_questions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  course: text("course").notNull(),
  difficulty: text("difficulty").default("medium").$type<"easy" | "medium" | "hard">(),
  category: text("category").default("General"),
  isBookmarked: boolean("is_bookmarked").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});