"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Timer,
  Play,
  Square,
  Zap,
  Target,
  Clock,
  BookOpen,
  BarChart3,
  Calendar
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StartStudySessionModal } from "@/components/StartStudySessionModal";
import { StudyGoalsModal } from "@/components/StudyGoalsModal";

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
  // const [sessions, setSessions] = useState<StudySession[]>([]); // Removed unused state
  const [stats, setStats] = useState<StudyStats>({
    today: { totalMinutes: 0, sessionCount: 0, hours: 0 },
    week: { totalMinutes: 0, sessionCount: 0, hours: 0 },
    month: { totalMinutes: 0, sessionCount: 0, hours: 0 },
    streak: 0,
    recentSessions: []
  });
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStartSessionModal, setShowStartSessionModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [courses, setCourses] = useState<Array<{ id: string; code: string; title: string }>>([]);
  const [goals, setGoals] = useState({
    dailyHours: 4,
    weeklyHours: 20,
    streakGoal: 30,
    currentStreak: 0
  });
  const [savingGoals, setSavingGoals] = useState(false);
  const [startingSession, setStartingSession] = useState(false);
  const [stoppingSession, setStoppingSession] = useState(false);
  const [timer, setTimer] = useState({
    isRunning: false,
    startTime: null as Date | null,
    elapsed: 0
  });
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

  const fetchUserCourses = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      const response = await fetch(`/api/courses/user?userId=${session.user.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setCourses(data.courses.map((course: { courseId: string; course: { code: string; title: string } }) => ({
          id: course.courseId,
          code: course.course.code,
          title: course.course.title
        })));
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  }, [session?.user?.id]);

  const fetchStudyGoals = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      const response = await fetch(`/api/study-goals?userId=${session.user.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setGoals(data.goals);
      }
    } catch (error) {
      console.error("Error fetching study goals:", error);
    }
  }, [session?.user?.id]);

  const saveStudyGoals = async (goalsData: { dailyHours: number; weeklyHours: number; streakGoal: number }) => {
    if (!session?.user?.id) return;
    
    try {
      setSavingGoals(true);
      const response = await fetch('/api/study-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          dailyHours: goalsData.dailyHours,
          weeklyHours: goalsData.weeklyHours,
          streakGoal: goalsData.streakGoal
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGoals(data.goals);
        setShowGoalsModal(false);
      } else {
        const errorData = await response.json();
        console.error("Error saving study goals:", errorData);
        alert(`Failed to save goals: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error saving study goals:", error);
      alert("Failed to save goals. Please try again.");
    } finally {
      setSavingGoals(false);
    }
  };

  const startStudySession = async (sessionData: { courseId: string; topic: string; notes?: string }) => {
    if (!session?.user?.id || startingSession) return;
    
    try {
      setStartingSession(true);
      const response = await fetch('/api/study-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          courseId: sessionData.courseId,
          subject: sessionData.topic,
          duration: 0,
          notes: sessionData.notes || ""
        }),
      });

      if (response.ok) {
        const newSession = await response.json();
        const selectedCourse = courses.find(c => c.id === sessionData.courseId);
        
        setCurrentSession({
          id: newSession.session.id,
          courseId: sessionData.courseId,
          courseName: selectedCourse?.title || "Unknown Course",
          duration: 0,
          startTime: new Date(),
          isActive: true,
          subject: sessionData.topic,
          color: "bg-blue-500"
        });
        
        setTimer({
          isRunning: true,
          startTime: new Date(),
          elapsed: 0
        });
        
        setShowStartSessionModal(false);
      } else {
        const errorData = await response.json();
        console.error("Error starting study session:", errorData);
        alert(`Failed to start session: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error starting study session:", error);
      alert("Failed to start session. Please try again.");
    } finally {
      setStartingSession(false);
    }
  };

  const stopStudySession = async () => {
    if (!currentSession || !session?.user?.id || stoppingSession) return;
    
    try {
      setStoppingSession(true);
      const duration = Math.floor((Date.now() - timer.startTime!.getTime()) / 60000); // Convert to minutes
      
      console.log("Stopping session with data:", {
        sessionId: currentSession.id,
        duration: duration,
        notes: currentSession.subject
      });
      
      const response = await fetch('/api/study-sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: currentSession.id,
          duration: duration,
          notes: currentSession.subject
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Session stopped successfully:", data);
        
        if (data.success && data.session) {
          setCurrentSession(null);
          setTimer({
            isRunning: false,
            startTime: null,
            elapsed: 0
          });
          
          // Refresh stats
          fetchStudyStats();
        } else {
          console.error("Session update failed - no session returned:", data);
          alert("Failed to stop session - session not found or updated");
        }
      } else {
        const errorData = await response.json();
        console.error("Error stopping session:", errorData);
        alert(`Failed to stop session: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error stopping study session:", error);
      alert("Failed to stop session. Please try again.");
    } finally {
      setStoppingSession(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStudyStats();
      fetchUserCourses();
      fetchStudyGoals();
    }
  }, [session, fetchStudyStats, fetchUserCourses, fetchStudyGoals]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer.isRunning && timer.startTime) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          elapsed: Math.floor((Date.now() - prev.startTime!.getTime()) / 1000)
        }));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning, timer.startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Removed unused mockSessions data


  const fetchStudyData = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setLoading(true);
      // Fetch study sessions (currently not used in UI)
      // const sessionsResponse = await fetch(`/api/study-sessions?userId=${session.user.id}`);
      // const sessionsData = await sessionsResponse.json();
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
                              {formatTime(timer.elapsed)}
                            </div>
                            <div className="text-sm text-gray-500">elapsed</div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button 
                            onClick={stopStudySession}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={stoppingSession}
                          >
                            {stoppingSession ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Stopping...</span>
                              </div>
                            ) : (
                              <>
                                <Square className="h-4 w-4 mr-2" />
                                Stop Session
                              </>
                            )}
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
                      <Button 
                        onClick={() => setShowStartSessionModal(true)}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={startingSession}
                      >
                        {startingSession ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Starting...</span>
                          </div>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Study Session
                          </>
                        )}
                      </Button>
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
                  <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="space-y-3 pr-2">
                      {stats.recentSessions.length > 0 ? (
                        stats.recentSessions.slice(0, 10).map((session) => (
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Study Goals */}
            <div className="mt-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="h-5 w-5 text-purple-600" />
                      </div>
                      <span>Study Goals</span>
                    </CardTitle>
                    <Button 
                      onClick={() => setShowGoalsModal(true)}
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      disabled={savingGoals}
                    >
                      {savingGoals ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                          <span>Saving...</span>
                        </div>
                      ) : (
                        <>
                          <Target className="h-4 w-4 mr-2" />
                          Set Goals
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Daily Goal</h3>
                        <span className="text-2xl font-bold text-green-600">{goals.dailyHours}h</span>
                      </div>
                      <Progress value={Math.min((stats.today.hours / goals.dailyHours) * 100, 100)} className="w-full h-3 mb-2" />
                      <p className="text-sm text-gray-600">{stats.today.hours.toFixed(1)}h of {goals.dailyHours}h completed</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Weekly Goal</h3>
                        <span className="text-2xl font-bold text-blue-600">{goals.weeklyHours}h</span>
                      </div>
                      <Progress value={Math.min((stats.week.hours / goals.weeklyHours) * 100, 100)} className="w-full h-3 mb-2" />
                      <p className="text-sm text-gray-600">{stats.week.hours.toFixed(1)}h of {goals.weeklyHours}h completed</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Streak Goal</h3>
                        <span className="text-2xl font-bold text-purple-600">{goals.streakGoal} days</span>
                      </div>
                      <Progress value={Math.min((stats.streak / goals.streakGoal) * 100, 100)} className="w-full h-3 mb-2" />
                      <p className="text-sm text-gray-600">{stats.streak} of {goals.streakGoal} days completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Start Study Session Modal */}
      <StartStudySessionModal
        isOpen={showStartSessionModal}
        onClose={() => setShowStartSessionModal(false)}
        onStart={startStudySession}
        courses={courses}
        loading={startingSession}
      />

      {/* Study Goals Modal */}
      <StudyGoalsModal
        isOpen={showGoalsModal}
        onClose={() => setShowGoalsModal(false)}
        onSave={saveStudyGoals}
        currentGoals={goals}
        loading={savingGoals}
      />
    </div>
  );
}
