"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Get user initials from name
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">UniEase</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/listings"
            className={`text-sm font-medium transition-colors ${
              isActive("/listings")
                ? "text-blue-600 hover:text-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Housing
          </Link>
              <Link
                href="/security"
                className={`text-sm font-medium ${
                  isActive("/security") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Security
              </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isPending ? (
            // Loading state
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ) : session ? (
            // Logged in state - User profile
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-transparent"
              asChild
            >
              <Link href="/dashboard">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {session.user.name ? getUserInitials(session.user.name) : "U"}
                  </span>
                </div>
              </Link>
            </Button>
          ) : (
            // Not logged in state - Login/Signup buttons
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
