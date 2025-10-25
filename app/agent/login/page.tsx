"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Eye, EyeOff, Building2, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AgentLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      router.push("/agent/dashboard");
    }, 1500);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">UniEase</h1>
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4 mr-1" />
                Agent Portal
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Agent Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agent@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked: boolean) => handleInputChange("rememberMe", checked)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link 
                  href="/agent/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an agent account?{" "}
                  <Link 
                    href="/agent/register" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Secure Agent Portal</h3>
              <p className="text-xs text-blue-700 mt-1">
                Your account is protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
