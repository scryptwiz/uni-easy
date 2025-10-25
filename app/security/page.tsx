"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/auth-client";
import {
  Shield,
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  Eye,
  Lock,
  Mail,
  Users,
  Wifi,
  ChevronRight,
  Bell,
  CheckCircle,
  XCircle,
  Info,
  AlertCircle,
  Zap,
  Droplets,
  Wrench,
  Globe
} from "lucide-react";
import {
  securityAlerts,
  securityTips,
  emergencyContacts,
  getActiveAlerts,
  getTipsByCategory,
  getPrimaryContacts,
  getSecondaryContacts,
  SecurityAlert,
  SecurityTip,
  EmergencyContact
} from "@/lib/securityConstants";
import { Navbar } from "@/components/Navbar";
import { EmergencyReportModal } from "@/components/EmergencyReportModal";

export default function SecurityPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const activeAlerts = getActiveAlerts();
  const primaryContacts = getPrimaryContacts();
  const secondaryContacts = getSecondaryContacts();

  const getSeverityIcon = (severity: SecurityAlert['severity']) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "medium":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "low":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: SecurityAlert['severity']) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 border-red-200 text-red-800";
      case "high":
        return "bg-orange-50 border-orange-200 text-orange-800";
      case "medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "low":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getTypeIcon = (type: SecurityAlert['type']) => {
    switch (type) {
      case "power":
        return <Zap className="h-4 w-4" />;
      case "security":
        return <Shield className="h-4 w-4" />;
      case "weather":
        return <Droplets className="h-4 w-4" />;
      case "maintenance":
        return <Wrench className="h-4 w-4" />;
      case "general":
        return <Globe className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const filteredTips = selectedCategory === "all" 
    ? securityTips 
    : getTipsByCategory(selectedCategory as any);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const categories = [
    { value: "all", label: "All Tips", icon: Shield },
    { value: "personal", label: "Personal Safety", icon: Users },
    { value: "digital", label: "Digital Security", icon: Wifi },
    { value: "campus", label: "Campus Safety", icon: MapPin },
    { value: "emergency", label: "Emergency Prep", icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Hi {session.user.name} 👋, here's your Campus Overview</h1>
              <p className="text-xl text-gray-600">Stay informed and safe with UniEase Security</p>
            </div>
          </div>
        </div>

        {/* Safety Alerts - Only show if there are active alerts */}
        {activeAlerts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Bell className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Safety Alerts</h2>
                <Badge variant="destructive" className="ml-2">
                  {activeAlerts.length} Active
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {getSeverityIcon(alert.severity)}
                          <h3 className="text-lg font-bold">{alert.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {alert.severity}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{alert.timestamp}</span>
                          </div>
                          {alert.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{alert.location}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(alert.type)}
                            <span className="capitalize">{alert.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="ml-4 flex-shrink-0"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Security Tips & Resources */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Security Tips & Resources</h2>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTips.map((tip) => {
              const IconComponent = tip.icon;
              return (
                <Card key={tip.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {tip.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {tip.description}
                        </p>
                        <Badge variant="secondary" className="mt-3 capitalize">
                          {tip.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Report Incident Button */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
              onClick={() => setShowReportModal(true)}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Report an Incident
            </Button>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-red-100 rounded-xl">
              <Phone className="h-7 w-7 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Emergency Contacts</h2>
              <p className="text-gray-600 mt-1">Quick access to essential services</p>
            </div>
          </div>

          {/* Primary Emergency Contacts - Large Cards */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Critical Emergency</h3>
              </div>
              <div className="flex-1 h-px bg-gray-200 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {primaryContacts.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <Card key={contact.id} className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                            <IconComponent className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{contact.name}</h4>
                            <p className="text-sm text-gray-600">{contact.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 border border-red-100">
                          <div className="text-2xl font-mono font-bold text-red-600 text-center">
                            {contact.phone}
                          </div>
                        </div>
                        
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          onClick={() => handleCall(contact.phone)}
                        >
                          <Phone className="h-5 w-5 mr-2" />
                          Call Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Secondary Contacts - Compact Grid */}
          <div>
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Additional Services</h3>
              </div>
              <div className="flex-1 h-px bg-gray-200 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {secondaryContacts.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <Card key={contact.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{contact.name}</h4>
                          <p className="text-xs text-gray-600 truncate">{contact.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-mono text-gray-700 bg-gray-50 rounded px-2 py-1 text-center">
                          {contact.phone}
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                          onClick={() => handleCall(contact.phone)}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Emergency Instructions */}
          <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Emergency Instructions</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• <strong>In case of emergency:</strong> Call the primary contacts first</p>
                  <p>• <strong>For non-emergency issues:</strong> Use additional services</p>
                  <p>• <strong>Always provide:</strong> Your location, nature of emergency, and your contact details</p>
                  <p>• <strong>Stay calm</strong> and follow instructions from emergency responders</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

          {/* Emergency Report Modal */}
          <EmergencyReportModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            user={session.user}
          />
    </div>
  );
}
