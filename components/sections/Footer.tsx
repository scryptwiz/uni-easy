"use client";

import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">UniEase</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
            <a 
              href="#" 
              className="hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-gray-500">
              © 2025 UniEase. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
