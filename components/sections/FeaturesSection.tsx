"use client";

import { Clock, Lightbulb, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Clock,
    title: "Safe Housing Finder",
    description: "Find verified, safe, and affordable accommodation near campus with real student reviews and safety ratings."
  },
  {
    icon: Lightbulb,
    title: "Health & Nutrition Hub",
    description: "Access to affordable meal plans, health resources, and nutrition guidance to support your academic performance."
  },
  {
    icon: Users,
    title: "Student Support Network",
    description: "Connect with peer mentors, access emergency services, and get help when you need it most."
  }
];

export function FeaturesSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} id="features" className="bg-white py-24 lg:py-32">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className={`text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up ${isVisible ? 'animate' : ''}`}>
            Our Solution
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 ${isVisible ? 'animate' : ''}`}>
            We&apos;re building a comprehensive ecosystem that addresses the real challenges LAUTECH students face every day.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          {features.map((feature, index) => (
            <div key={index} className={`text-center group animate-fade-in-up animation-delay-${500 + (index * 100)} hover:scale-105 transition-all duration-300 ${isVisible ? 'animate' : ''}`}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className={`bg-gray-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 animate-fade-in-up animation-delay-800 ${isVisible ? 'animate' : ''}`}>
          <div className="text-center max-w-3xl mx-auto">
            <h3 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in-up animation-delay-900 ${isVisible ? 'animate' : ''}`}>
              Why This Matters
            </h3>
            <p className={`text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-12 animate-fade-in-up animation-delay-1000 ${isVisible ? 'animate' : ''}`}>
              When students don&apos;t have to worry about basic survival needs, they can focus on what really matters: 
              learning, growing, and building their future.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className={`text-center animate-fade-in-up animation-delay-1100 hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate' : ''}`}>
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2 sm:mb-3">24/7</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Support Available</div>
              </div>
              <div className={`text-center animate-fade-in-up animation-delay-1200 hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate' : ''}`}>
                <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2 sm:mb-3">100%</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Student-Focused</div>
              </div>
              <div className={`text-center animate-fade-in-up animation-delay-1300 hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate' : ''}`}>
                <div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-2 sm:mb-3">1</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Unified Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
