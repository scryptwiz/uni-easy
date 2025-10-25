"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  FileText,
  Bell,
  CheckCircle,
  AlertCircle,
  Target,
  Plus,
  Brain,
  Download,
  Play,
  Timer,
  Zap,
  BookMarked,
  Lightbulb
} from "lucide-react";
import {
  getPriorityColor,
  getTypeColor
} from "@/lib/dashboardConstants";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AddCourseModal } from "@/components/AddCourseModal";
import { AddAssignmentModal } from "@/components/AddAssignmentModal";
import { UpdateProgressModal } from "@/components/UpdateProgressModal";

interface Course {
  id: string;
  code: string;
  title: string;
  progress: number;
  color: string;
  instructor: string;
  credits: number;
  semester: string;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  daysRemaining: number;
  type: "assignment" | "exam" | "project" | "quiz";
  priority: "low" | "medium" | "high" | "urgent";
  icon: any;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  color: string;
  icon: any;
}

export default function AcademicsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showUpdateProgressModal, setShowUpdateProgressModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const fetchAcademicData = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setLoading(true);
      
      // Fetch courses from database
      const coursesResponse = await fetch(`/api/courses?userId=${session.user.id}`);
      const coursesData = await coursesResponse.json();
      
      // Fetch assignments from database
      const assignmentsResponse = await fetch(`/api/assignments?userId=${session.user.id}`);
      const assignmentsData = await assignmentsResponse.json();
      
      // Fetch notifications from database
      const notificationsResponse = await fetch(`/api/notifications?userId=${session.user.id}`);
      const notificationsData = await notificationsResponse.json();

      // Transform courses data to include colors and progress
      const transformedCourses = coursesData.courses?.map((course: any, index: number) => ({
        id: course.courseId,
        code: course.course.code,
        title: course.course.title,
        progress: course.progress || 0,
        color: ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"][index % 5],
        instructor: course.course.instructor,
        credits: course.course.credits,
        semester: course.course.semester
      })) || [];

      // Transform assignments data
      const transformedAssignments = assignmentsData.assignments?.map((assignment: any) => ({
        id: assignment.id,
        title: assignment.title,
        course: assignment.course.code,
        dueDate: new Date(assignment.dueDate).toLocaleDateString(),
        daysRemaining: assignment.daysRemaining,
        type: assignment.type,
        priority: assignment.priority,
        icon: assignment.type === 'project' ? FileText : 
              assignment.type === 'exam' ? BookOpen :
              assignment.type === 'quiz' ? Target : FileText
      })) || [];

      // Transform notifications data
      const transformedNotifications = notificationsData.notifications?.map((notification: any) => ({
        id: notification.id,
        type: notification.type,
        title: notification.title,
        description: notification.message,
        timestamp: new Date(notification.createdAt).toLocaleString(),
        color: notification.type === 'deadline' ? 'text-red-500' : 
               notification.type === 'achievement' ? 'text-green-500' :
               notification.type === 'reminder' ? 'text-blue-500' : 'text-gray-500',
        icon: notification.type === 'deadline' ? AlertCircle :
              notification.type === 'achievement' ? CheckCircle :
              notification.type === 'reminder' ? Bell : Bell
      })) || [];

      setCourses(transformedCourses);
      setAssignments(transformedAssignments);
      setNotifications(transformedNotifications);
    } catch (error) {
      console.error("Error fetching academic data:", error);
      // Fallback to empty arrays if API fails
      setCourses([]);
      setAssignments([]);
      setNotifications([]);
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
      fetchAcademicData();
    }
  }, [session, fetchAcademicData]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleAddCourseSuccess = () => {
    // Update dashboard stats optimistically
    window.dispatchEvent(new CustomEvent('optimisticCourseAdd'));
    
    // Fetch fresh data in background
    fetchAcademicData();
  };

  const handleAddAssignmentSuccess = (newAssignment: any) => {
    // Optimistic update - add assignment immediately to UI
    const optimisticAssignment = {
      id: newAssignment.id,
      title: newAssignment.title,
      course: newAssignment.course?.code || "Unknown Course",
      dueDate: new Date(newAssignment.dueDate).toLocaleDateString(),
      daysRemaining: Math.max(0, Math.ceil((new Date(newAssignment.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))),
      type: newAssignment.type,
      priority: newAssignment.priority,
      icon: newAssignment.type === 'project' ? FileText :
            newAssignment.type === 'exam' ? BookOpen :
            newAssignment.type === 'quiz' ? Target : FileText
    };
    
    setAssignments(prev => [...prev, optimisticAssignment]);
    
    // Fetch fresh data in background
    fetchAcademicData();
  };

  const handleUpdateProgress = (course: Course) => {
    setSelectedCourse(course);
    setShowUpdateProgressModal(true);
  };

  const handleUpdateProgressSuccess = (updatedProgress: number) => {
    // Optimistic update - update course progress immediately
    setCourses(prev => prev.map(course => 
      course.id === selectedCourse?.id 
        ? { ...course, progress: updatedProgress }
        : course
    ));
    
    // Update dashboard stats optimistically
    window.dispatchEvent(new CustomEvent('optimisticProgressUpdate'));
    
    // Fetch fresh data in background
    fetchAcademicData();
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your academic data...</p>
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
          title="Academics"
          subtitle="Track your academic progress and stay organized"
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
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

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
                  <p className="text-gray-600">Manage your academic life with these quick tools</p>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setShowAddCourseModal(true)}
                  className="group cursor-pointer bg-white rounded-xl p-6 border-2 border-transparent hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">
                        Add New Course
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Enroll in a new course and track your progress
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setShowAddAssignmentModal(true)}
                  className="group cursor-pointer bg-white rounded-xl p-6 border-2 border-transparent hover:border-red-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                      <FileText className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-red-700 transition-colors">
                        Add Assignment
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Create assignments and track important deadlines
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Courses */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>My Courses</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {courses.length > 0 ? (
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-4 h-16 rounded-full ${course.color}`}></div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {course.code}
                              </h3>
                              <p className="text-sm text-gray-700 font-medium">{course.title}</p>
                              <p className="text-xs text-gray-500">{course.instructor}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {course.credits} credits
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {course.semester}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 mb-2">
                              {course.progress}%
                            </div>
                            <Progress value={course.progress} className="w-32 h-3 mb-2" />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateProgress(course)}
                              className="text-xs hover:bg-blue-50 hover:border-blue-300"
                            >
                              Update Progress
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                        <BookOpen className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                      <p className="text-gray-500 mb-6">Start by adding your first course to track your academic progress.</p>
                      <Button 
                        onClick={() => setShowAddCourseModal(true)}
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Course
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {assignments.length > 0 ? (
                    <div className="space-y-3">
                      {assignments.map((assignment) => {
                        const IconComponent = assignment.icon;
                        return (
                          <div
                            key={assignment.id}
                            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:shadow-md transition-all duration-200 border border-red-200"
                          >
                            <div className={`p-3 rounded-xl ${getPriorityColor(assignment.priority)}`}>
                              <IconComponent className={`h-5 w-5 ${getTypeColor(assignment.type)}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-bold text-gray-900 text-base">
                                  {assignment.title}
                                </h3>
                                {getPriorityIcon(assignment.priority)}
                              </div>
                              <p className="text-sm text-gray-700 font-medium">{assignment.course}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-600 font-medium">
                                  Due: {assignment.dueDate}
                                </span>
                                <Badge 
                                  variant={assignment.priority === 'urgent' ? 'destructive' : 'outline'} 
                                  className="text-xs"
                                >
                                  {assignment.daysRemaining} days
                                </Badge>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                        <AlertCircle className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assignments Yet</h3>
                      <p className="text-gray-500 mb-6">Add your first assignment to start tracking deadlines.</p>
                      <Button 
                        onClick={() => setShowAddAssignmentModal(true)}
                        variant="outline"
                        className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Assignment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Study Hours & Resources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Study Hours */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Timer className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Study Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Today's Study Time */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Today's Focus</h3>
                          <p className="text-sm text-gray-600">Track your study progress</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">2.5h</div>
                          <div className="text-sm text-gray-500">of 4h goal</div>
                        </div>
                      </div>
                      <Progress value={62.5} className="w-full h-3 mb-4" />
                      <div className="flex items-center justify-between">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => router.push('/dashboard/academics/study-hours')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Session
                        </Button>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                            3 day streak
                          </span>
                          <span className="flex items-center">
                            <Target className="h-4 w-4 mr-1 text-blue-500" />
                            12h this week
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Study Sessions */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Recent Sessions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">Mathematics</span>
                          </div>
                          <div className="text-sm text-gray-600">1h 30m</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium">Physics</span>
                          </div>
                          <div className="text-sm text-gray-600">1h 15m</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm font-medium">Computer Science</span>
                          </div>
                          <div className="text-sm text-gray-600">45m</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BookMarked className="h-5 w-5 text-purple-600" />
                    </div>
                    <span>Study Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Past Questions */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <FileText className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">Past Questions</h3>
                            <p className="text-sm text-gray-600">Access previous exam papers</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-purple-200 text-purple-700 hover:bg-purple-50"
                          onClick={() => router.push('/dashboard/academics/resources')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Browse
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white rounded-lg p-2 text-center">
                          <div className="font-bold text-purple-600">24</div>
                          <div className="text-gray-500">Available</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center">
                          <div className="font-bold text-green-600">8</div>
                          <div className="text-gray-500">Downloaded</div>
                        </div>
                      </div>
                    </div>

                    {/* AI Study Assistant */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Brain className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">AI Study Assistant</h3>
                            <p className="text-sm text-gray-600">Get personalized help</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => router.push('/dashboard/academics/resources')}
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Ask AI
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg p-3 text-sm">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">Quick Questions</span>
                          </div>
                          <p className="text-gray-600">Get instant answers to your study questions</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-sm">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">Study Plans</span>
                          </div>
                          <p className="text-gray-600">Personalized study schedules and tips</p>
                        </div>
                      </div>
                    </div>

                    {/* Study Tools */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="h-4 w-4 text-orange-600" />
                          <span className="font-medium text-sm">Flashcards</span>
                        </div>
                        <p className="text-xs text-gray-600">Create and study flashcards</p>
                      </div>
                      <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-3 border border-teal-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="h-4 w-4 text-teal-600" />
                          <span className="font-medium text-sm">Notes</span>
                        </div>
                        <p className="text-xs text-gray-600">Organize your study notes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Bell className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {notifications.length > 0 ? (
                    <div className="space-y-4">
                      {notifications.map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className="flex items-start space-x-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-200 border border-green-200"
                          >
                            <div className={`p-2 rounded-lg bg-white ${notification.color}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-sm">
                                {notification.title}
                              </h3>
                              <p className="text-sm text-gray-700 mt-1">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-2 font-medium">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                        <Bell className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Activity</h3>
                      <p className="text-gray-500">Your academic activity will appear here as you use the platform.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AddCourseModal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        onSuccess={handleAddCourseSuccess}
        userId={session?.user?.id || ""}
      />
      
      <AddAssignmentModal
        isOpen={showAddAssignmentModal}
        onClose={() => setShowAddAssignmentModal(false)}
        onSuccess={handleAddAssignmentSuccess}
        courses={courses.map(course => ({ id: course.id, code: course.code, title: course.title }))}
      />
      
      {selectedCourse && (
        <UpdateProgressModal
          isOpen={showUpdateProgressModal}
          onClose={() => {
            setShowUpdateProgressModal(false);
            setSelectedCourse(null);
          }}
          onSuccess={handleUpdateProgressSuccess}
          courseId={selectedCourse.id}
          courseCode={selectedCourse.code}
          courseTitle={selectedCourse.title}
          currentProgress={selectedCourse.progress}
          userId={session?.user?.id || ""}
        />
      )}
    </div>
  );
}
