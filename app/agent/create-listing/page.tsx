"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  MapPin, 
  DollarSign,
  Wifi,
  Droplets,
  Zap,
  Home,
  Shirt,
  Shield,
  Sofa,
  Building,
  CheckCircle,
  Star,
  Plus,
  MessageSquare,
  TrendingUp,
  LogOut,
  Users,
  Bell,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default function CreateListingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    hostelName: "",
    address: "",
    hostelType: "",
    description: "",
    
    // Step 2: Location
    city: "",
    state: "",
    zipCode: "",
    nearbyLandmarks: "",
    
    // Step 3: Pricing & Amenities
    singleRoomPrice: "",
    sharedRoomPrice: "",
    amenities: [] as string[],
    
    // Step 4: Media (using dummy images)
    images: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300", 
      "/api/placeholder/400/300"
    ]
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const steps = [
    { id: 1, title: "Basic Information", icon: Building2 },
    { id: 2, title: "Location Details", icon: MapPin },
    { id: 3, title: "Pricing & Amenities", icon: DollarSign },
    { id: 4, title: "Media & Preview", icon: Upload }
  ];

  const amenities = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "water", label: "Water", icon: Droplets },
    { id: "electricity", label: "Electricity", icon: Zap },
    { id: "kitchen", label: "Kitchen", icon: Home },
    { id: "laundry", label: "Laundry", icon: Shirt },
    { id: "security", label: "Security", icon: Shield },
    { id: "furnished", label: "Furnished", icon: Sofa },
    { id: "balcony", label: "Balcony", icon: Building }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
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
    // Simulate listing creation
    setTimeout(() => {
      setLoading(false);
      router.push("/agent/dashboard");
    }, 2000);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout");
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.hostelName && formData.address && formData.hostelType && formData.description;
      case 2:
        return formData.city && formData.state && formData.zipCode;
      case 3:
        return formData.singleRoomPrice && formData.sharedRoomPrice && formData.amenities.length > 0;
      case 4:
        return true; // Media step is always valid with dummy images
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
              href="/agent/inquiries" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Inquiries</span>
            </Link>
            <Link 
              href="/agent/create-listing" 
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Listing</span>
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
                <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
                <p className="text-gray-600">Let&apos;s start with the basics. You can save your progress and come back at any time.</p>
              </div>
            </div>
            <Link 
              href="/agent/dashboard" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>

        <div className="p-4 lg:p-8">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Hostel Listing</h1>
          <p className="text-gray-600 mb-6">Let&apos;s start with the basics. You can save your progress and come back at any time.</p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of 4
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-2">
            <Card className="sticky top-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Listing Steps</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Follow these steps to create your listing</p>
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
                        <p className={`text-base font-semibold ${
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
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                      <p className="text-gray-600">Tell us about your hostel</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hostelName" className="text-sm font-medium text-gray-700">
                          Hostel Name *
                        </Label>
                        <Input
                          id="hostelName"
                          type="text"
                          placeholder="e.g., Harmony Hostel"
                          value={formData.hostelName}
                          onChange={(e) => handleInputChange("hostelName", e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                          Hostel Address *
                        </Label>
                        <Input
                          id="address"
                          type="text"
                          placeholder="Enter the full street address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Hostel Type *
                        </Label>
                        <Select value={formData.hostelType} onValueChange={(value) => handleInputChange("hostelType", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select hostel type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male-only">Male-only</SelectItem>
                            <SelectItem value="female-only">Female-only</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                            <SelectItem value="family">Family</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                          General Description *
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the hostel, its amenities, and what makes it special"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
                      <p className="text-gray-600">Help students find your hostel easily</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                          City *
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="e.g., Lagos"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                          State *
                        </Label>
                        <Input
                          id="state"
                          type="text"
                          placeholder="e.g., Lagos State"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        type="text"
                        placeholder="e.g., 100001"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nearbyLandmarks" className="text-sm font-medium text-gray-700">
                        Nearby Landmarks
                      </Label>
                      <Input
                        id="nearbyLandmarks"
                        type="text"
                        placeholder="e.g., Near University of Lagos, Close to Shoprite"
                        value={formData.nearbyLandmarks}
                        onChange={(e) => handleInputChange("nearbyLandmarks", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Pricing & Amenities */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900">Pricing & Amenities</h2>
                      <p className="text-gray-600">Set your prices and select available amenities</p>
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Set Your Prices</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="singleRoomPrice" className="text-sm font-medium text-gray-700">
                            Single Room Price (₦) *
                          </Label>
                          <Input
                            id="singleRoomPrice"
                            type="number"
                            placeholder="e.g., 50000"
                            value={formData.singleRoomPrice}
                            onChange={(e) => handleInputChange("singleRoomPrice", e.target.value)}
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sharedRoomPrice" className="text-sm font-medium text-gray-700">
                            Shared Room Price (₦) *
                          </Label>
                          <Input
                            id="sharedRoomPrice"
                            type="number"
                            placeholder="e.g., 30000"
                            value={formData.sharedRoomPrice}
                            onChange={(e) => handleInputChange("sharedRoomPrice", e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Select Available Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {amenities.map((amenity) => {
                          const IconComponent = amenity.icon;
                          const isSelected = formData.amenities.includes(amenity.id);
                          
                          return (
                            <div
                              key={amenity.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all  ${
                                isSelected 
                                  ? "border-blue-500 bg-blue-50" 
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => handleAmenityToggle(amenity.id)}
                            >
                              <div className="text-center">
                                <div className={`p-3 rounded-full mx-auto mb-2 flex items-center justify-center ${
                                  isSelected ? "bg-blue-100" : "bg-gray-100"
                                }`}>
                                  <IconComponent className={`h-6 w-6 ${
                                    isSelected ? "text-blue-600" : "text-gray-600"
                                  }`} />
                                </div>
                                <p className={`text-sm font-medium ${
                                  isSelected ? "text-blue-900" : "text-gray-700"
                                }`}>
                                  {amenity.label}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Media & Preview */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900">Media & Preview</h2>
                      <p className="text-gray-600">Review your listing before publishing</p>
                    </div>

                    {/* Media Upload Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Upload Hostel Media</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">Drag & drop files here</p>
                        <p className="text-sm text-gray-500 mb-4">You can upload up to 10 images and 2 videos</p>
                        <Button variant="outline">
                          Browse Files
                        </Button>
                      </div>
                      
                      {/* Dummy Images */}
                      <div className="grid grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Listing Preview */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Review Your Listing</h3>
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{formData.hostelName || "Comfortable Student Lodge"}</h4>
                              <p className="text-gray-600">{formData.address || "Under G, Ogbomosho"}</p>
                            </div>
                            
                            <p className="text-gray-700">
                              {formData.description || "A serene and secure hostel perfect for students looking for a conducive environment for learning. Close to campus and major amenities."}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Single Room</p>
                                <p className="text-lg font-semibold text-gray-900">
                                  ₦{formData.singleRoomPrice || "50,000"} / year
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Shared Room</p>
                                <p className="text-lg font-semibold text-gray-900">
                                  ₦{formData.sharedRoomPrice || "30,000"} / year
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-2">Selected Amenities:</p>
                              <div className="flex flex-wrap gap-2">
                                {formData.amenities.map((amenityId) => {
                                  const amenity = amenities.find(a => a.id === amenityId);
                                  return amenity ? (
                                    <div key={amenityId} className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                      <amenity.icon className="h-3 w-3" />
                                      <span>{amenity.label}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-8"
                    >
                      Save as Draft
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
                        disabled={loading}
                        className="px-8 bg-green-600 hover:bg-green-700"
                      >
                        {loading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Publishing...</span>
                          </div>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Publish Listing
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
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
