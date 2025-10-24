"use client";

import { Brain, Target, Users, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AboutSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} id="about" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl animate-fade-in-up ${isVisible ? 'animate' : ''}`}>
              The Problem We&apos;re Solving
            </h2>
            <p className={`mt-6 text-lg leading-8 text-gray-600 max-w-4xl mx-auto animate-fade-in-up animation-delay-200 ${isVisible ? 'animate' : ''}`}>
              Between poor campus information flow, insecurity, and limited access to student services, daily survival often overshadows learning at LAUTECH. Students shouldn&apos;t have to choose between finding safe housing and focusing on their studies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`text-center animate-fade-in-up animation-delay-300 hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate' : ''}`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-300">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Housing</h3>
              <p className="text-sm text-gray-600">Find safe, affordable accommodation with verified landlords</p>
            </div>
            
            <div className={`text-center animate-fade-in-up animation-delay-400 hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate' : ''}`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-300">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Health & Safety</h3>
              <p className="text-sm text-gray-600">Access to nutrition guidance and safety resources</p>
            </div>
            
            <div className={`text-center animate-fade-in-up animation-delay-500 hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate' : ''}`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 hover:bg-purple-200 transition-colors duration-300">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Services</h3>
              <p className="text-sm text-gray-600">Streamlined access to all campus resources and support</p>
            </div>
            
            <div className={`text-center animate-fade-in-up animation-delay-600 hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate' : ''}`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 transition-colors duration-300">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Focus</h3>
              <p className="text-sm text-gray-600">Let students focus on learning, not surviving</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
