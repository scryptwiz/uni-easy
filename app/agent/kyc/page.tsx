"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Shield, 
  Camera, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  MapPin,
  Plus,
  TrendingUp,
  LogOut,
  Users,
  Bell,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default function AgentKYCPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    
    // Identity Verification
    idType: "",
    idNumber: "",
    
    // Address Verification
    address: "",
    
    // Live Photo
    livePhoto: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const steps = [
    { id: 1, title: "Personal & Contact Details", icon: User },
    { id: 2, title: "Identity Verification", icon: FileText },
    { id: 3, title: "Proof of Address", icon: MapPin },
    { id: 4, title: "Live Photo Verification", icon: Camera }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };


  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate verification process
    setTimeout(() => {
      setLoading(false);
      router.push("/agent/dashboard");
    }, 3000);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout");
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.dateOfBirth && formData.phoneNumber && formData.email;
      case 2:
        return formData.idType && formData.idNumber;
      case 3:
        return formData.address;
      case 4:
        return formData.livePhoto;
      default:
        return false;
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">UniEase</h1>
              <p className="text-xs text-gray-600">Agent Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              href="/agent/dashboard" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/agent/listings" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Building2 className="h-5 w-5" />
              <span>Hostel Listings</span>
            </Link>
            <Link 
              href="/agent/create-listing" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Listing</span>
            </Link>
            <Link 
              href="/agent/kyc" 
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
            >
              <Shield className="h-5 w-5" />
              <span>KYC Verification</span>
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
                <p className="text-sm text-gray-600">Step {currentStep} of 4 - {steps[currentStep - 1].title}</p>
              </div>
            </div>
            <Link 
              href="/agent/login" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {/* Progress Header */}
          <div className="text-center mb-8">
            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">
                  Step {currentStep} of 4
                </span>
                <span className="text-sm font-medium text-blue-600">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3 mb-3" />
              <p className="text-sm font-medium text-gray-800">
                {steps[currentStep - 1].title}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Steps Sidebar */}
            <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900">Verification Steps</CardTitle>
                <p className="text-sm text-gray-600">Follow these steps to complete verification</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {steps.map((step) => {
                  const IconComponent = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? "bg-blue-50 border-2 border-blue-200 shadow-sm" 
                          : isCompleted 
                            ? "bg-green-50 border-2 border-green-200 shadow-sm"
                            : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div className={`p-3 rounded-full ${
                        isActive 
                          ? "bg-blue-100 text-blue-600" 
                          : isCompleted 
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <IconComponent className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${
                          isActive ? "text-blue-900" : isCompleted ? "text-green-900" : "text-gray-700"
                        }`}>
                          {step.title}
                        </p>
                        <p className={`text-xs mt-1 ${
                          isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                        }`}>
                          {isActive ? "Current step" : isCompleted ? "Completed" : "Upcoming"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

            {/* Main Form */}
            <div className="lg:col-span-3">
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal & Contact Details</h2>
                      <p className="text-gray-600">Tell us about yourself to get started</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                          Date of Birth *
                        </Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                          Phone Number *
                        </Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="agent@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Identity Verification */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h2>
                      <p className="text-gray-600">Enter your identity information for verification</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          ID Type *
                        </Label>
                        <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nin">National Identification Number (NIN)</SelectItem>
                            <SelectItem value="passport">International Passport</SelectItem>
                            <SelectItem value="drivers">Driver&apos;s License</SelectItem>
                            <SelectItem value="voters">Voter&apos;s Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idNumber" className="text-sm font-medium text-gray-700">
                          ID Number *
                        </Label>
                        <Input
                          id="idNumber"
                          type="text"
                          placeholder="Enter your ID number"
                          value={formData.idNumber}
                          onChange={(e) => handleInputChange("idNumber", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* Step 3: Proof of Address */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                        <MapPin className="h-8 w-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Proof of Address</h2>
                      <p className="text-gray-600">Verify your current address</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Current Address *
                      </Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Enter your full address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="h-12"
                      />
                    </div>

                  </div>
                )}

                {/* Step 4: Live Photo Verification */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                        <Camera className="h-8 w-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Photo Verification</h2>
                      <p className="text-gray-600">Take a clear selfie for verification</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-80 h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        {formData.livePhoto ? (
                          <div className="text-center">
                            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                              <Camera className="h-12 w-12 text-gray-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 mb-4">Live photo will appear here</p>
                            <input
                              type="file"
                              accept="image/*"
                              capture="user"
                              onChange={(e) => e.target.files?.[0] && handleFileUpload("livePhoto", e.target.files[0])}
                              className="hidden"
                              id="livePhoto"
                            />
                            <label htmlFor="livePhoto" className="cursor-pointer">
                              <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                                <Camera className="h-4 w-4 mr-2" />
                                Take Selfie
                              </Button>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Please position your face within the frame and take a clear selfie
                      </p>
                      {formData.livePhoto && (
                        <p className="text-sm text-green-600">
                          ✓ Live photo captured successfully
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="px-8"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid(currentStep)}
                      className="px-8"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isStepValid(currentStep) || loading}
                      className="px-8 bg-green-600 hover:bg-green-700"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Submit for Verification
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900">Secure Verification Process</h3>
                <p className="text-xs text-blue-700 mt-1">
                  All your documents are encrypted and stored securely. We use industry-standard security measures to protect your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
