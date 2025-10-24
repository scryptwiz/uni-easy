"use client";

import { Button } from "@/components/ui/button";
import { Home, Shield, Heart, BookOpen, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Background Illustration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:block absolute top-20 left-10 animate-pulse">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Home className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
          </div>
        </div>
        <div className="hidden sm:block absolute top-40 right-20 animate-bounce delay-1000">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
          </div>
        </div>
        <div className="hidden sm:block absolute bottom-40 left-20 animate-pulse delay-500">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-red-600" />
          </div>
        </div>
        <div className="hidden sm:block absolute bottom-20 right-10 animate-bounce delay-700">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
          </div>
        </div>
        <div className="hidden sm:block absolute top-60 left-1/3 animate-pulse delay-300">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
          </div>
        </div>
        
        {/* Decorative Circles - Smaller on mobile */}
        <div className="absolute top-10 right-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-10 sm:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-purple-200 rounded-full opacity-10 sm:opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 sm:w-20 sm:h-20 bg-green-200 rounded-full opacity-10 sm:opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
              🎓 Reimagining Student Life at LAUTECH
            </span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            From Survival to
            <span className="block text-blue-600">Thriving</span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto px-2">
            Over 70% of LAUTECH students struggle with housing, health, and safety challenges.
          </p>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto px-2">
            <span className="font-semibold text-gray-800">UniEase</span> connects housing, health, safety, and academics into one smart, student-centered ecosystem.
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl sm:max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">70%</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Housing Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-red-600">1 in 3</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Health & Nutrition Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">100%</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Student-Focused Solution</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

