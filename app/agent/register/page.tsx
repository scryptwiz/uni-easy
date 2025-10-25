"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Building2, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AgentRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      router.push("/agent/kyc");
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isPasswordValid = formData.password.length >= 8;
  const isPasswordMatch = formData.password === formData.confirmPassword;
  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.phone && formData.company && isPasswordValid && 
                     isPasswordMatch && formData.agreeToTerms && formData.agreeToPrivacy;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Back to Main Site */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Main Site</span>
        </Link>
      </div>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">UniEase</h1>
              <p className="text-sm text-gray-600">Agent Portal</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join as an Agent</h2>
          <p className="text-gray-600">Create your agent account to start listing properties</p>
        </div>

        {/* Registration Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Agent Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company/Organization *
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="text-xs text-gray-600">
                      {isPasswordValid ? (
                        <span className="text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Password is strong
                        </span>
                      ) : (
                        <span className="text-red-600">Password must be at least 8 characters</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div className="text-xs text-gray-600">
                      {isPasswordMatch ? (
                        <span className="text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Passwords match
                        </span>
                      ) : (
                        <span className="text-red-600">Passwords do not match</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked: boolean) => handleInputChange("agreeToTerms", checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked: boolean) => handleInputChange("agreeToPrivacy", checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="privacy" className="text-sm text-gray-600">
                    I consent to receive marketing communications from UniEase
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={loading || !isFormValid}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Agent Account"
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an agent account?{" "}
                  <Link 
                    href="/agent/login" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-green-900">Verification Required</h3>
              <p className="text-xs text-green-700 mt-1">
                After registration, you&apos;ll need to complete KYC verification to start listing properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
