# Database Management Guide

This guide explains how to manage your database schema and migrations for the UniEase project.

## 🚀 Quick Start

### Complete Database Setup
```bash
npm run db:setup
```
This will:
1. Drop all existing tables
2. Recreate them with the correct schema
3. Add all foreign key constraints
4. Seed the database with sample data

### Individual Commands

#### Reset Database (Drops and Recreates All Tables)
```bash
npm run db:reset
```

#### Seed Database (Add Sample Data)
```bash
npm run db:seed
```

#### Ensure All Tables Exist
```bash
npm run db:ensure
```

#### Seed Resources Data (AI Questions & Past Questions)
```bash
npm run db:seed-resources
```

#### Quick Fix (Create Missing Tables)
```bash
npm run db:fix
```

#### Generate Migration Files (Drizzle)
```bash
npm run db:generate
```

#### Apply Migrations (Drizzle)
```bash
npm run db:migrate
```

#### Open Database Studio
```bash
npm run db:studio
```

## 📊 Database Schema

### Core Tables
- **users** - User accounts and profiles
- **accounts** - OAuth account connections
- **sessions** - User authentication sessions
- **verifications** - Email verification tokens

### Academic Tables
- **courses** - Course catalog
- **user_courses** - User course enrollments
- **assignments** - Course assignments
- **study_sessions** - Study session tracking
- **study_goals** - User study goals and targets
- **past_questions** - Past exam questions
- **ai_questions** - AI-generated questions
- **notifications** - User notifications

### Other Tables
- **properties** - Housing listings
- **security_alerts** - Security notifications
- **emergency_reports** - Emergency incident reports

## 🔧 Troubleshooting

### Migration Issues
If you encounter migration conflicts:

1. **Reset the entire database:**
   ```bash
   npm run db:reset
   ```

2. **Or manually drop problematic tables:**
   ```sql
   DROP TABLE IF EXISTS table_name CASCADE;
   ```

### Schema Changes
When you modify the schema in `lib/schema.ts`:

1. Generate new migration:
   ```bash
   npm run db:generate
   ```

2. Apply migration:
   ```bash
   npm run db:migrate
   ```

3. If conflicts occur, reset and reseed:
   ```bash
   npm run db:setup
   ```

## 🎯 Study Goals Feature

The study goals feature includes:
- **Daily Hours Goal** - Target hours per day
- **Weekly Hours Goal** - Target hours per week  
- **Streak Goal** - Target consecutive study days
- **Current Streak** - Actual consecutive study days

### API Endpoints
- `GET /api/study-goals?userId={id}` - Fetch user goals
- `POST /api/study-goals` - Create/update goals

### Database Fields
```sql
study_goals:
- id (text, primary key)
- user_id (text, foreign key to users)
- daily_hours (integer, default 4)
- weekly_hours (integer, default 20)
- streak_goal (integer, default 30)
- current_streak (integer, default 0)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔄 Automation

### Development Workflow
1. Make schema changes in `lib/schema.ts`
2. Run `npm run db:setup` to reset and apply changes
3. Test your changes
4. Commit schema changes

### Production Deployment
1. Generate migration: `npm run db:generate`
2. Review migration files in `drizzle/` folder
3. Apply migration: `npm run db:migrate`

## 📝 Notes

- Always backup your data before running `db:reset`
- The reset script drops ALL tables and recreates them
- Sample data is included for development and testing
- Foreign key constraints are automatically added
- All timestamps use `DEFAULT now()` for automatic updates
