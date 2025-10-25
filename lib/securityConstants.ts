import { Shield, Lock, Eye, Mail, Users, Phone, MapPin, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SecurityAlert {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  isActive: boolean;
  location?: string;
  type: "power" | "security" | "weather" | "maintenance" | "general";
}

export interface SecurityTip {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  category: "personal" | "digital" | "campus" | "emergency";
}

export interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  description: string;
  icon: LucideIcon;
  isPrimary: boolean;
}

// Security Alerts - Dynamic data (will come from backend)
export const securityAlerts: SecurityAlert[] = [
  {
    id: 1,
    title: "Campus-wide power outage",
    description: "There is a campus-wide power outage affecting all buildings. Please stay in your dorms and avoid unnecessary movement. Emergency generators are running in critical areas.",
    timestamp: "2 hours ago",
    severity: "high", 
    isActive: true,
    location: "All Campus Areas",
    type: "power"
  },
  {
    id: 2,
    title: "Suspicious activity reported near Library",
    description: "Avoid the area if possible. Campus security has been notified and is investigating. Report any additional suspicious behavior immediately.",
    timestamp: "5 hours ago",
    severity: "medium",
    isActive: true,
    location: "Library Area",
    type: "security"
  },
  {
    id: 3,
    title: "Maintenance work on Block A",
    description: "Scheduled maintenance work on Block A water system. Water supply may be intermittent. Alternative water stations available at Block B and C.",
    timestamp: "1 day ago",
    severity: "low",
    isActive: true,
    location: "Block A",
    type: "maintenance"
  }
];

// Security Tips - Static educational content
export const securityTips: SecurityTip[] = [
  {
    id: 1,
    icon: Lock,
    title: "Always Lock Your Dorm",
    description: "It's a simple step that significantly increases your safety. Double-check locks before leaving and never prop doors open.",
    category: "personal"
  },
  {
    id: 2,
    icon: Eye,
    title: "Be Aware of Your Surroundings",
    description: "Avoid distractions like your phone when walking alone at night. Stay alert and trust your instincts.",
    category: "personal"
  },
  {
    id: 3,
    icon: Mail,
    title: "Identify Phishing Scams",
    description: "Learn how to spot and report suspicious emails and messages. Never share personal information via email.",
    category: "digital"
  },
  {
    id: 4,
    icon: Users,
    title: "Use the Buddy System",
    description: "Travel with friends, especially after dark. There's safety in numbers and it's more fun too.",
    category: "personal"
  },
  {
    id: 5,
    icon: Shield,
    title: "Report Suspicious Activity",
    description: "If you see something, say something. Report any suspicious behavior to campus security immediately.",
    category: "campus"
  },
  {
    id: 6,
    icon: Wifi,
    title: "Secure Your Digital Life",
    description: "Use strong passwords, enable two-factor authentication, and be cautious with public Wi-Fi networks.",
    category: "digital"
  },
  {
    id: 7,
    icon: MapPin,
    title: "Know Emergency Exits",
    description: "Familiarize yourself with emergency exits in all buildings you frequent. Plan your escape routes.",
    category: "emergency"
  },
  {
    id: 8,
    icon: Phone,
    title: "Keep Emergency Numbers Handy",
    description: "Save emergency contacts in your phone and keep a physical list as backup. Quick access saves lives.",
    category: "emergency"
  }
];

// Emergency Contacts - Static data
export const emergencyContacts: EmergencyContact[] = [
  {
    id: 1,
    name: "Campus Security",
    phone: "+234 812 345 6789",
    description: "24/7 campus security hotline",
    icon: Shield,
    isPrimary: true
  },
  {
    id: 2,
    name: "Local Police",
    phone: "+234 803 456 7890",
    description: "Ogbomoso Police Station",
    icon: Phone,
    isPrimary: false
  },
  {
    id: 3,
    name: "Ambulance",
    phone: "199",
    description: "Emergency medical services",
    icon: Phone,
    isPrimary: false
  },
  {
    id: 4,
    name: "Fire Service",
    phone: "199",
    description: "Fire and rescue services",
    icon: Phone,
    isPrimary: false
  },
  {
    id: 5,
    name: "Student Affairs",
    phone: "+234 815 234 5678",
    description: "Student support and guidance",
    icon: Users,
    isPrimary: false
  },
  {
    id: 6,
    name: "Health Center",
    phone: "+234 807 123 4567",
    description: "Campus medical services",
    icon: Phone,
    isPrimary: false
  }
];

// Helper functions
export const getActiveAlerts = () => securityAlerts.filter(alert => alert.isActive);

export const getAlertsBySeverity = (severity: SecurityAlert['severity']) => 
  securityAlerts.filter(alert => alert.severity === severity && alert.isActive);

export const getTipsByCategory = (category: SecurityTip['category']) => 
  securityTips.filter(tip => tip.category === category);

export const getPrimaryContacts = () => 
  emergencyContacts.filter(contact => contact.isPrimary);

export const getSecondaryContacts = () => 
  emergencyContacts.filter(contact => !contact.isPrimary);
