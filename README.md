# UniEase - Student Housing & Academic Management Platform

A comprehensive platform that connects students with housing options while providing academic management tools and resources.

## 🚀 Features

### 🏠 **Student Housing Platform**
- **Property Listings**: Browse available hostels and apartments
- **Detailed Property Pages**: View amenities, pricing, and location details
- **Search & Filter**: Find properties by location, price, and amenities
- **Property Management**: Agents can create and manage listings

### 👨‍💼 **Agent Portal**
- **Dashboard**: Overview of listings, inquiries, and performance metrics
- **Listing Management**: Create, edit, and manage property listings
- **KYC Verification**: Simple verification process for agents
- **Inquiry Management**: Track and respond to student inquiries

### 🎓 **Academic Management**
- **Study Tracking**: Track study hours and set goals
- **Course Management**: Add and manage academic courses
- **Assignment Tracking**: Keep track of assignments and deadlines
- **AI Study Assistant**: Get help with academic questions
- **Past Questions**: Access previous exam questions and resources
- **Progress Monitoring**: Visual progress tracking for courses

### 🏥 **Health & Wellness**
- **Nutrition Tips**: Daily nutrition guidance and tips
- **Health Goals**: Set and track wellness objectives
- **Activity Tracking**: Monitor daily activities and habits

### 🔒 **Security Features**
- **Emergency Reporting**: Report security incidents
- **Safety Tips**: Security guidelines and best practices
- **Emergency Contacts**: Quick access to emergency services

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: BetterAuth
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
uni-easy/
├── app/                          # Next.js App Router
│   ├── agent/                    # Agent Portal
│   │   ├── dashboard/           # Agent dashboard
│   │   ├── listings/            # Property listings management
│   │   ├── create-listing/      # Create new property
│   │   ├── kyc/                 # Agent verification
│   │   ├── login/               # Agent login
│   │   └── register/            # Agent registration
│   ├── dashboard/               # Student dashboard
│   │   ├── academics/           # Academic management
│   │   │   ├── study-hours/     # Study tracking
│   │   │   ├── resources/       # Past questions & AI
│   │   │   └── ai-assistant/    # AI study helper
│   │   └── health/              # Health & nutrition
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication
│   │   ├── courses/             # Course management
│   │   ├── study-sessions/      # Study tracking
│   │   └── dashboard/           # Dashboard data
│   ├── listings/                # Property listings
│   ├── property/[id]/           # Property details
│   ├── security/                # Security features
│   ├── login/                   # Student login
│   └── signup/                  # Student registration
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── Navbar.tsx              # Main navigation
│   └── DashboardSidebar.tsx    # Dashboard sidebar
├── lib/                         # Utilities and configuration
│   ├── db.ts                   # Database connection
│   ├── schema.ts               # Database schema
│   ├── utils.ts                # Utility functions
│   └── constants.ts            # App constants
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uni-easy
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your database URL and other required environment variables.

4. **Set up the database**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Pages

### Student Features
- **Landing Page** (`/`) - Main homepage with property listings
- **Dashboard** (`/dashboard`) - Academic and study management
- **Study Hours** (`/dashboard/academics/study-hours`) - Track study sessions
- **Resources** (`/dashboard/academics/resources`) - Past questions and AI help
- **Health** (`/dashboard/health`) - Nutrition and wellness tips
- **Security** (`/security`) - Emergency reporting and safety tips

### Agent Features
- **Agent Login** (`/agent/login`) - Agent authentication
- **Agent Dashboard** (`/agent/dashboard`) - Property management overview
- **Create Listing** (`/agent/create-listing`) - Add new properties
- **Manage Listings** (`/agent/listings`) - Edit and manage properties
- **KYC Verification** (`/agent/kyc`) - Agent verification process

## 🔧 Development

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations

### Database Schema
The application uses a comprehensive database schema including:
- **Users** - Student and agent accounts
- **Properties** - Housing listings
- **Courses** - Academic courses
- **Study Sessions** - Study tracking data
- **Assignments** - Academic assignments
- **Security Alerts** - Emergency reports

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**UniEase** - Making student life easier, one feature at a time! 🎓✨