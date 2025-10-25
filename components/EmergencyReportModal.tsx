"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  X,
  AlertTriangle,
  Shield,
  Heart,
  Flame,
  MapPin,
  Send,
  CheckCircle,
  Info
} from "lucide-react";

interface EmergencyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type EmergencyType = "medical" | "security" | "fire" | "other";

const emergencyTypes = [
  {
    id: "medical" as EmergencyType,
    label: "Medical Emergency",
    description: "Injury, illness, or health crisis",
    icon: Heart,
    color: "bg-red-500 hover:bg-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700"
  },
  {
    id: "security" as EmergencyType,
    label: "Security Threat",
    description: "Suspicious activity, violence, or danger",
    icon: Shield,
    color: "bg-orange-500 hover:bg-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700"
  },
  {
    id: "fire" as EmergencyType,
    label: "Fire Emergency",
    description: "Fire, smoke, or evacuation needed",
    icon: Flame,
    color: "bg-red-600 hover:bg-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700"
  },
  {
    id: "other" as EmergencyType,
    label: "Other Emergency",
    description: "Power outage, flooding, or other crisis",
    icon: AlertTriangle,
    color: "bg-purple-500 hover:bg-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700"
  }
];

const urgencyLevels = [
  { level: "low", label: "Low", description: "Non-urgent, can wait", color: "bg-green-100 text-green-800" },
  { level: "medium", label: "Medium", description: "Important, needs attention", color: "bg-yellow-100 text-yellow-800" },
  { level: "high", label: "High", description: "Urgent, immediate response", color: "bg-orange-100 text-orange-800" },
  { level: "critical", label: "Critical", description: "Life-threatening emergency", color: "bg-red-100 text-red-800" }
];

export function EmergencyReportModal({ isOpen, onClose, user }: EmergencyReportModalProps) {
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [urgency, setUrgency] = useState<string>("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType || !description.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call with user information
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Emergency Report:", { 
      selectedType, 
      urgency, 
      description, 
      location,
      userId: user.id,
      userName: user.name,
      userEmail: user.email
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setSelectedType(null);
    setUrgency("");
    setDescription("");
    setLocation("");
    setIsSubmitted(false);
    onClose();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        () => {
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Location not supported");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="relative shadow-2xl">
          <CardContent className="p-0">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 rounded-t-lg z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <AlertTriangle className="h-7 w-7 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Emergency Reporting</h2>
                    <p className="text-gray-600">Get immediate assistance when you need it most</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {!isSubmitted ? (
                <>
                  {/* Emergency Type Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      What type of emergency is this?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {emergencyTypes.map((type) => {
                        const IconComponent = type.icon;
                        const isSelected = selectedType === type.id;
                        return (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                              isSelected
                                ? `${type.bgColor} ${type.borderColor} border-2 shadow-xl`
                                : "hover:shadow-lg border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedType(type.id)}
                          >
                            <CardContent className="p-5">
                              <div className="flex items-center space-x-4">
                                <div className={`p-4 rounded-xl transition-colors ${
                                  isSelected ? type.bgColor : "bg-gray-100 group-hover:bg-gray-200"
                                }`}>
                                  <IconComponent className={`h-7 w-7 ${
                                    isSelected ? type.textColor : "text-gray-600"
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <h4 className={`text-lg font-bold ${
                                    isSelected ? type.textColor : "text-gray-900"
                                  }`}>
                                    {type.label}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                                </div>
                                {isSelected && (
                                  <div className="p-2 bg-green-100 rounded-full">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Urgency Level */}
                  {selectedType && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        How urgent is this emergency?
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {urgencyLevels.map((level) => (
                          <Button
                            key={level.level}
                            variant={urgency === level.level ? "default" : "outline"}
                            className={`${
                              urgency === level.level
                                ? level.color
                                : "hover:bg-gray-50"
                            } text-sm`}
                            onClick={() => setUrgency(level.level)}
                          >
                            {level.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {selectedType && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Describe the emergency
                      </h3>
                      <Textarea
                        placeholder="Please provide as much detail as possible about what's happening, where it's occurring, and any immediate dangers..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-32 text-base"
                      />
                    </div>
                  )}

                  {/* Location */}
                  {selectedType && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Location Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            onClick={getCurrentLocation}
                            className="flex items-center space-x-2"
                          >
                            <MapPin className="h-4 w-4" />
                            <span>Get My Location</span>
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Enter specific location details (building, room, landmark, etc.)"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="min-h-20"
                        />
                      </div>
                    </div>
                  )}

                  {/* Safety Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Important Safety Information:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Your location will be shared immediately for your safety</li>
                          <li>• Emergency services will be notified automatically</li>
                          <li>• Stay calm and follow instructions from responders</li>
                          <li>• If it&apos;s a life-threatening emergency, call 199 immediately</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedType || !description.trim() || isSubmitting}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Report Emergency
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Emergency Reported Successfully
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your emergency report has been submitted. Emergency services have been notified and will respond as soon as possible.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-green-800 mb-2">What happens next:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Emergency services have been alerted</li>
                      <li>• Your location has been shared with responders</li>
                      <li>• You may receive a call to confirm details</li>
                      <li>• Stay in a safe location until help arrives</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
