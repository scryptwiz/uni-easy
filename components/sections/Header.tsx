"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">UniEase</span>
        </Link>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About Us
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Features
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
