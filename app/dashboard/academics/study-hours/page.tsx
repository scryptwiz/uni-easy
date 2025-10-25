"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Timer,
  Play,
  Pause,
  Square,
  Zap,
  Target,
  Clock,
  BookOpen,
  Brain,
  TrendingUp,
  Calendar,
  BarChart3
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

interface StudySession {
  id: string;
  courseId: string;
  courseName: string;
  duration: number; // in minutes
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  subject: string;
  color: string;
}

interface StudyStats {
  today: {
    totalMinutes: number;
    sessionCount: number;
    hours: number;
  };
  week: {
    totalMinutes: number;
    sessionCount: number;
    hours: number;
  };
  month: {
    totalMinutes: number;
    sessionCount: number;
    hours: number;
  };
  streak: number;
  recentSessions: Array<{
    id: string;
    topic: string;
    duration: number;
    hours: number;
    createdAt: Date;
  }>;
}

export default function StudyHoursPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [stats, setStats] = useState<StudyStats>({
    today: { totalMinutes: 0, sessionCount: 0, hours: 0 },
    week: { totalMinutes: 0, sessionCount: 0, hours: 0 },
    month: { totalMinutes: 0, sessionCount: 0, hours: 0 },
    streak: 0,
    recentSessions: []
  });
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const fetchStudyStats = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      const response = await fetch(`/api/study-hours/stats?userId=${session.user.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching study stats:", error);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session) {
      fetchStudyStats();
    }
  }, [session, fetchStudyStats]);

  // Mock data for now
  const mockSessions: StudySession[] = [
    {
      id: "1",
      courseId: "cse-401",
      courseName: "Artificial Intelligence",
      duration: 90,
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 30 * 60 * 1000),
      isActive: false,
      subject: "Machine Learning",
      color: "bg-blue-500"
    },
    {
      id: "2",
      courseId: "mth-303",
      courseName: "Real Analysis",
      duration: 75,
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      isActive: false,
      subject: "Calculus",
      color: "bg-green-500"
    },
    {
      id: "3",
      courseId: "phy-201",
      courseName: "Physics II",
      duration: 120,
      startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isActive: false,
      subject: "Electromagnetism",
      color: "bg-purple-500"
    },
    {
      id: "4",
      courseId: "cse-401",
      courseName: "Artificial Intelligence",
      duration: 45,
      startTime: new Date(),
      isActive: true,
      subject: "Neural Networks",
      color: "bg-blue-500"
    }
  ];


  const fetchStudyData = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setLoading(true);
      // Fetch study sessions
      const sessionsResponse = await fetch(`/api/study-sessions?userId=${session.user.id}`);
      const sessionsData = await sessionsResponse.json();
      
      if (sessionsResponse.ok) {
        setSessions(sessionsData.sessions || []);
      }
    } catch (error) {
      console.error("Error fetching study data:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchStudyData();
    }
  }, [session, fetchStudyData]);

  const startSession = (courseId: string, courseName: string, subject: string, color: string) => {
    const newSession: StudySession = {
      id: `session-${Date.now()}`,
      courseId,
      courseName,
      duration: 0,
      startTime: new Date(),
      isActive: true,
      subject,
      color
    };
    
    setCurrentSession(newSession);
    setSessions(prev => [newSession, ...prev]);
  };

  const stopSession = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        isActive: false,
        endTime: new Date(),
        duration: Math.floor((Date.now() - currentSession.startTime.getTime()) / (1000 * 60))
      };
      
      setSessions(prev => prev.map(session => 
        session.id === currentSession.id ? updatedSession : session
      ));
      setCurrentSession(null);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTimeElapsed = (startTime: Date) => {
    return Math.floor((Date.now() - startTime.getTime()) / (1000 * 60));
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study data...</p>
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
          title="Study Hours"
          subtitle="Track your study sessions and focus time"
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  Focus Mode, {session.user.name}! 🎯
                </h2>
                <p className="text-green-100 text-lg">
                  Track your study sessions and build productive habits.
                </p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.today.hours}h</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.week.hours}h</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Streak</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.streak} days</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Zap className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sessions</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.week.sessionCount}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Session */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Timer className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Current Session</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentSession ? (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{currentSession.courseName}</h3>
                            <p className="text-sm text-gray-600">{currentSession.subject}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-green-600">
                              {formatDuration(getTimeElapsed(currentSession.startTime))}
                            </div>
                            <div className="text-sm text-gray-500">elapsed</div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button 
                            onClick={stopSession}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Square className="h-4 w-4 mr-2" />
                            Stop Session
                          </Button>
                          <Button variant="outline">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                        <Play className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Session</h3>
                      <p className="text-gray-500 mb-6">Start a new study session to begin tracking your focus time.</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={() => startSession("cse-401", "AI", "Machine Learning", "bg-blue-500")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          AI Study
                        </Button>
                        <Button 
                          onClick={() => startSession("mth-303", "Math", "Calculus", "bg-green-500")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Math Study
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Sessions */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Recent Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.recentSessions.length > 0 ? (
                      stats.recentSessions.slice(0, 5).map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-4 h-12 rounded-full bg-blue-500"></div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-base">
                                {session.topic}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {new Date(session.createdAt).toLocaleDateString()} at {new Date(session.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {formatDuration(session.duration)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No recent study sessions</p>
                        <p className="text-sm text-gray-400">Start your first session to see it here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Study Goals */}
            <div className="mt-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <span>Study Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Daily Goal</h3>
                        <span className="text-2xl font-bold text-green-600">4h</span>
                      </div>
                      <Progress value={62.5} className="w-full h-3 mb-2" />
                      <p className="text-sm text-gray-600">2.5h of 4h completed</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Weekly Goal</h3>
                        <span className="text-2xl font-bold text-blue-600">25h</span>
                      </div>
                      <Progress value={74} className="w-full h-3 mb-2" />
                      <p className="text-sm text-gray-600">18.5h of 25h completed</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Streak Goal</h3>
                        <span className="text-2xl font-bold text-purple-600">30 days</span>
                      </div>
                      <Progress value={23.3} className="w-full h-3 mb-2" />
                      <p className="text-sm text-gray-600">7 of 30 days completed</p>
                    </div>
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
