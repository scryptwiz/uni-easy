"use client";

import { useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Brain,
  GraduationCap,
  Home,
  Clock,
  FileText,
  Star,
  Target,
  ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    activeCourses: 0,
    assignmentsDue: 0,
    studyHours: 0,
    todayStudyHours: 0,
    studySessionsCount: 0,
    achievements: 0
  });
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const fetchStats = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/dashboard/stats?userId=${session.user.id}`);
      const data = await response.json();
      setStats({
        activeCourses: data.activeCourses || 0,
        assignmentsDue: data.assignmentsDue || 0,
        studyHours: data.studyHours || 0,
        todayStudyHours: data.todayStudyHours || 0,
        studySessionsCount: data.studySessionsCount || 0,
        achievements: data.achievements || 0
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (session) {
      fetchStats();
    }
  }, [session, isPending, router, fetchStats]);

  // Listen for custom events to refresh stats
  useEffect(() => {
    const handleRefreshStats = () => {
      if (session?.user?.id) {
        fetchStats();
      }
    };

    const handleOptimisticCourseAdd = () => {
      // Optimistically increment active courses
      setStats(prev => ({
        ...prev,
        activeCourses: prev.activeCourses + 1
      }));
    };

    const handleOptimisticProgressUpdate = () => {
      // Progress updates don't change the count, but we can refresh stats
      if (session?.user?.id) {
        fetchStats();
      }
    };

    window.addEventListener('refreshDashboardStats', handleRefreshStats);
    window.addEventListener('optimisticCourseAdd', handleOptimisticCourseAdd);
    window.addEventListener('optimisticProgressUpdate', handleOptimisticProgressUpdate);
    
    return () => {
      window.removeEventListener('refreshDashboardStats', handleRefreshStats);
      window.removeEventListener('optimisticCourseAdd', handleOptimisticCourseAdd);
      window.removeEventListener('optimisticProgressUpdate', handleOptimisticProgressUpdate);
    };
  }, [session?.user?.id, fetchStats]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          title="Dashboard"
          subtitle="Welcome back to your academic hub"
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {session.user.name}! 👋
                </h2>
                <p className="text-blue-100 text-lg">
                  Here&apos;s your academic overview for today.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Active Courses</p>
                          <p className="text-3xl font-bold text-gray-900">{stats.activeCourses}</p>
                          <p className="text-xs text-green-600 font-medium">Currently enrolled</p>
                        </div>
                    <div className="p-3 bg-blue-100 rounded-2xl">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Assignments Due</p>
                          <p className="text-3xl font-bold text-gray-900">{stats.assignmentsDue}</p>
                          <p className="text-xs text-red-600 font-medium">Due this week</p>
                        </div>
                    <div className="p-3 bg-green-100 rounded-2xl">
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Study Hours</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.studyHours}</p>
                      <p className="text-xs text-purple-600 font-medium">This week</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-2xl">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Achievements</p>
                          <p className="text-3xl font-bold text-gray-900">{stats.achievements}</p>
                          <p className="text-xs text-orange-600 font-medium">Keep it up!</p>
                        </div>
                    <div className="p-3 bg-orange-100 rounded-2xl">
                      <Star className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Quick Access</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-lg hover:border-blue-300 transition-all duration-200 border-gray-200"
                      onClick={() => router.push("/dashboard/academics/past-questions")}
                    >
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-sm">Past Questions</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-lg hover:border-purple-300 transition-all duration-200 border-gray-200"
                      onClick={() => router.push("/dashboard/academics/ai-assistant")}
                    >
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Brain className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-semibold text-sm">AI Assistant</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-lg hover:border-green-300 transition-all duration-200 border-gray-200"
                      onClick={() => router.push("/dashboard/academics/tutorials")}
                    >
                      <div className="p-2 bg-green-50 rounded-lg">
                        <BookOpen className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-semibold text-sm">Tutorials</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-lg hover:border-orange-300 transition-all duration-200 border-gray-200"
                      onClick={() => router.push("/listings")}
                    >
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Home className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="font-semibold text-sm">Housing</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Today&apos;s Schedule</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-4 h-16 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-900">08:00 AM - 10:00 AM</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base">CSE 401 - AI</h3>
                        <p className="text-sm text-blue-700">CAD Lab</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="w-4 h-16 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-900">11:00 AM - 01:00 PM</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base">MTH 303 - Real Analysis</h3>
                        <p className="text-sm text-green-700">250 LT</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full mt-4 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                      onClick={() => router.push("/dashboard/academics")}
                    >
                      View Full Schedule
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
