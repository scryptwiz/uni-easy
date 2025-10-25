import type { LucideIcon } from "lucide-react";
import { 
  BookOpen, 
  Calendar, 
  Brain, 
  GraduationCap, 
  Users, 
  Heart, 
  Shield, 
  Home,
  Clock,
  FileText,
  Download,
  Upload,
  MapPin,
  Bell,
  CheckCircle,
  AlertCircle,
  Star,
  Target,
  TrendingUp,
  Timer,
  BookMarked,
  ChevronDown,
  ChevronRight
} from "lucide-react";

export interface Course {
  id: number;
  code: string;
  title: string;
  progress: number;
  color: string;
  instructor: string;
  credits: number;
  semester: string;
}

export interface Deadline {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  daysRemaining: number;
  type: "assignment" | "exam" | "project" | "quiz";
  priority: "low" | "medium" | "high" | "urgent";
  icon: LucideIcon;
}

export interface Activity {
  id: number;
  type: "upload" | "reminder" | "achievement" | "deadline";
  title: string;
  description: string;
  timestamp: string;
  icon: LucideIcon;
  color: string;
}

export interface TimetableItem {
  id: number;
  time: string;
  course: string;
  code: string;
  venue: string;
  color: string;
}

export interface QuickAccessItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
  badge?: string;
  subItems?: SidebarItem[];
}

// Sidebar navigation items
export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    isActive: true
  },
  {
    id: "academics",
    label: "Academics",
    icon: GraduationCap,
    href: "/dashboard/academics",
    isActive: false,
    subItems: [
      {
        id: "study-hours",
        label: "Study Hours",
        icon: Timer,
        href: "/dashboard/academics/study-hours",
        isActive: false
      },
      {
        id: "resources",
        label: "Resources",
        icon: BookMarked,
        href: "/dashboard/academics/resources",
        isActive: false
      }
    ]
  },
  {
    id: "housing",
    label: "Housing",
    icon: Home,
    href: "/listings",
    isActive: false
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    href: "/security",
    isActive: false
  },
  {
    id: "health",
    label: "Health & Nutrition",
    icon: Heart,
    href: "/dashboard/health",
    isActive: false
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: Brain,
    href: "/dashboard/academics/ai-assistant",
    isActive: false,
    badge: "New"
  }
];

// Course data
export const courses: Course[] = [
  {
    id: 1,
    code: "CSE 501",
    title: "Computer Architecture",
    progress: 75,
    color: "bg-blue-500",
    instructor: "Dr. Johnson",
    credits: 3,
    semester: "Fall 2025"
  },
  {
    id: 2,
    code: "CPE 507",
    title: "Data Structures",
    progress: 50,
    color: "bg-green-500",
    instructor: "Prof. Smith",
    credits: 4,
    semester: "Fall 2025"
  },
  {
    id: 3,
    code: "GNS 202",
    title: "Use of English",
    progress: 25,
    color: "bg-purple-500",
    instructor: "Dr. Williams",
    credits: 2,
    semester: "Fall 2025"
  },
  {
    id: 4,
    code: "MTH 301",
    title: "Calculus III",
    progress: 90,
    color: "bg-orange-500",
    instructor: "Dr. Brown",
    credits: 3,
    semester: "Fall 2025"
  },
  {
    id: 5,
    code: "EEE 305",
    title: "Digital Electronics",
    progress: 60,
    color: "bg-red-500",
    instructor: "Prof. Davis",
    credits: 3,
    semester: "Fall 2025"
  }
];

// Upcoming deadlines
export const deadlines: Deadline[] = [
  {
    id: 1,
    title: "CPE 507 Assignment",
    course: "Data Structures",
    dueDate: "Oct 26, 2025",
    daysRemaining: 3,
    type: "assignment",
    priority: "high",
    icon: FileText
  },
  {
    id: 2,
    title: "CSE 501 Midterm Test",
    course: "Computer Architecture",
    dueDate: "Nov 2, 2025",
    daysRemaining: 10,
    type: "exam",
    priority: "medium",
    icon: BookOpen
  },
  {
    id: 3,
    title: "CPE 501 Lab Report",
    course: "Programming Lab",
    dueDate: "Nov 15, 2025",
    daysRemaining: 23,
    type: "project",
    priority: "low",
    icon: FileText
  },
  {
    id: 4,
    title: "MTH 301 Quiz",
    course: "Calculus III",
    dueDate: "Oct 30, 2025",
    daysRemaining: 7,
    type: "quiz",
    priority: "medium",
    icon: Target
  }
];

// Recent activities
export const activities: Activity[] = [
  {
    id: 1,
    type: "upload",
    title: "New past question uploaded",
    description: "CSE 501 - Computer Architecture past questions for 2024/2025 session",
    timestamp: "2 hours ago",
    icon: Upload,
    color: "text-blue-600"
  },
  {
    id: 2,
    type: "reminder",
    title: "AI assistant reminder",
    description: "CPE 507 Assignment due in 3 days. Don't forget to submit!",
    timestamp: "1 day ago",
    icon: Bell,
    color: "text-orange-600"
  },
  {
    id: 3,
    type: "achievement",
    title: "Course milestone reached",
    description: "Completed 75% of Computer Architecture course",
    timestamp: "2 days ago",
    icon: Star,
    color: "text-green-600"
  },
  {
    id: 4,
    type: "deadline",
    title: "New deadline added",
    description: "MTH 301 Quiz scheduled for October 30th",
    timestamp: "3 days ago",
    icon: AlertCircle,
    color: "text-red-600"
  }
];

// Today's timetable
export const timetable: TimetableItem[] = [
  {
    id: 1,
    time: "08:00 AM - 10:00 AM",
    course: "Artificial Intelligence",
    code: "CSE 401",
    venue: "CAD Lab",
    color: "bg-blue-500"
  },
  {
    id: 2,
    time: "11:00 AM - 01:00 PM",
    course: "Real Analysis",
    code: "MTH 303",
    venue: "250 LT",
    color: "bg-green-500"
  },
  {
    id: 3,
    time: "02:00 PM - 04:00 PM",
    course: "Digital Electronics",
    code: "EEE 305",
    venue: "EEE Auditorium",
    color: "bg-orange-500"
  }
];

// Quick access items
export const quickAccessItems: QuickAccessItem[] = [
  {
    id: 1,
    title: "Past Questions",
    description: "Access past exam questions",
    icon: FileText,
    color: "bg-blue-500",
    href: "/dashboard/past-questions"
  },
  {
    id: 2,
    title: "AI Study Assistant",
    description: "Get personalized study help",
    icon: Brain,
    color: "bg-purple-500",
    href: "/dashboard/ai-assistant"
  },
  {
    id: 3,
    title: "Tutorials",
    description: "Video tutorials and guides",
    icon: GraduationCap,
    color: "bg-green-500",
    href: "/dashboard/tutorials"
  }
];

// Helper functions
export const getPriorityColor = (priority: Deadline['priority']) => {
  switch (priority) {
    case "urgent":
      return "text-red-600 bg-red-50 border-red-200";
    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "low":
      return "text-green-600 bg-green-50 border-green-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export const getTypeColor = (type: Deadline['type']) => {
  switch (type) {
    case "assignment":
      return "text-blue-600";
    case "exam":
      return "text-red-600";
    case "project":
      return "text-purple-600";
    case "quiz":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};
