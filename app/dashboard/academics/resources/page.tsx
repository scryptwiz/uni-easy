"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookMarked,
  Download,
  Brain,
  Lightbulb,
  FileText,
  BookOpen,
  Target,
  Search,
  Filter,
  Star,
  Clock,
  Timer,
  User,
  Calendar,
  Eye,
  MessageSquare,
  Zap,
  ChevronRight
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

interface PastQuestion {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  year: string;
  semester: string;
  type: "midterm" | "final" | "quiz" | "assignment";
  difficulty: "easy" | "medium" | "hard";
  pages: number;
  downloads: number;
  rating: number;
  uploadedBy: string;
  uploadedAt: Date;
  fileSize: string;
  description: string;
  tags: string[];
}

interface AIQuestion {
  id: string;
  question: string;
  answer: string;
  course: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  timestamp: Date;
  isBookmarked: boolean;
}

export default function ResourcesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pastQuestions, setPastQuestions] = useState<PastQuestion[]>([]);
  const [aiQuestions, setAiQuestions] = useState<AIQuestion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<PastQuestion | null>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const fetchResourcesData = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setLoading(true);
      // Fetch past questions from API
      const pastQuestionsResponse = await fetch(`/api/past-questions?userId=${session.user.id}`);
      if (pastQuestionsResponse.ok) {
        const pastQuestionsData = await pastQuestionsResponse.json();
        setPastQuestions(pastQuestionsData.questions || []);
      } else {
        console.log('No past questions found, using empty array');
        setPastQuestions([]);
      }
      
      // Fetch AI questions from API
      const aiQuestionsResponse = await fetch(`/api/ai-questions?userId=${session.user.id}`);
      if (aiQuestionsResponse.ok) {
        const aiQuestionsData = await aiQuestionsResponse.json();
        setAiQuestions(aiQuestionsData.questions || []);
      } else {
        console.log('No AI questions found, using empty array');
        setAiQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching resources data:", error);
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
      fetchResourcesData();
    }
  }, [session, fetchResourcesData]);

  const handlePreviewQuestion = (question: PastQuestion) => {
    setSelectedQuestion(question);
    setShowPreviewModal(true);
  };

  const filteredPastQuestions = pastQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (question.tags && question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCourse = selectedCourse === "all" || question.courseCode === selectedCourse;
    const matchesType = selectedType === "all" || question.type === selectedType;
    return matchesSearch && matchesCourse && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "final": return <Target className="h-4 w-4" />;
      case "midterm": return <BookOpen className="h-4 w-4" />;
      case "quiz": return <FileText className="h-4 w-4" />;
      case "assignment": return <BookMarked className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading study resources...</p>
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
          title="Study Resources"
          subtitle="Access past questions, AI assistance, and study materials"
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  Study Resources, {session.user.name}! 📚
                </h2>
                <p className="text-purple-100 text-lg">
                  Access past questions, get AI help, and enhance your learning.
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search past questions, courses, or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Courses</option>
                    <option value="CSE 401">CSE 401 - AI</option>
                    <option value="MTH 303">MTH 303 - Real Analysis</option>
                    <option value="PHY 201">PHY 201 - Physics II</option>
                    <option value="CSE 501">CSE 501 - Computer Architecture</option>
                    <option value="CSE 301">CSE 301 - Data Structures</option>
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="final">Final Exams</option>
                    <option value="midterm">Midterms</option>
                    <option value="quiz">Quizzes</option>
                    <option value="assignment">Assignments</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Past Questions */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <span>Past Questions</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {filteredPastQuestions.length} available
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPastQuestions.map((question) => (
                        <div
                          key={question.id}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200 border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="p-2 bg-white rounded-lg">
                                  {getTypeIcon(question.type)}
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 text-lg">
                                    {question.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {question.courseCode} - {question.course}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-3">
                                {question.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {question.tags && question.tags.length > 0 ? (
                                  question.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    General
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-medium">{question.rating}</span>
                              </div>
                              <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                                {question.difficulty}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                {question.downloads} downloads
                              </span>
                              <span className="flex items-center">
                                <FileText className="h-4 w-4 mr-1" />
                                {question.pages} pages
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {question.uploadedAt ? question.uploadedAt.toLocaleDateString() : 'Unknown date'}
                              </span>
                            </div>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePreviewQuestion(question)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                              </Button>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Assistant & Quick Tools */}
              <div className="space-y-6">
                {/* AI Study Assistant */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Brain className="h-5 w-5 text-blue-600" />
                      </div>
                      <span>AI Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Lightbulb className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">Ask AI</h3>
                            <p className="text-sm text-gray-600">Get instant help with your studies</p>
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Start Conversation
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Recent Questions</h4>
                        {aiQuestions.map((question) => (
                          <div
                            key={question.id}
                            className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                {question.question}
                              </p>
                              {question.isBookmarked && (
                                <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 ml-2" />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{question.course}</span>
                              <span>{question.timestamp ? question.timestamp.toLocaleTimeString() : 'Unknown time'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Study Tools */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Zap className="h-5 w-5 text-green-600" />
                      </div>
                      <span>Study Tools</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <Target className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-gray-900">Flashcards</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Create and study flashcards</p>
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          Create Deck
                        </Button>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-gray-900">Study Notes</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Organize your study materials</p>
                        <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                          Add Notes
                        </Button>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <Timer className="h-5 w-5 text-orange-600" />
                          <span className="font-medium text-gray-900">Study Timer</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Pomodoro technique timer</p>
                        <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                          Start Timer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedQuestion?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedQuestion?.courseCode} - {selectedQuestion?.course}
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuestion && (
            <div className="space-y-6">
              {/* Question Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg">
                      {getTypeIcon(selectedQuestion.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {selectedQuestion.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedQuestion.courseCode} - {selectedQuestion.course}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{selectedQuestion.rating}</span>
                    </div>
                    <Badge className={`text-xs ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                      {selectedQuestion.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-4">
                  {selectedQuestion.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedQuestion.tags && selectedQuestion.tags.length > 0 ? (
                    selectedQuestion.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      General
                    </Badge>
                  )}
                </div>
                
                {/* Question Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {selectedQuestion.downloads} downloads
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {selectedQuestion.pages} pages
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedQuestion.uploadedAt ? selectedQuestion.uploadedAt.toLocaleDateString() : 'Unknown date'}
                  </div>
                </div>
              </div>
              
              {/* Question Content Preview */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Question Preview</h4>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    This is a preview of the past question content. The full question paper would be displayed here 
                    with all the questions, diagrams, and answer spaces. This gives you a comprehensive view of 
                    what to expect from this particular exam paper.
                  </p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This is a sample preview. The actual question paper would contain 
                      the complete set of questions from the {selectedQuestion.year} {selectedQuestion.semester} 
                      {selectedQuestion.type} examination.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreviewModal(false)}
                >
                  Close
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Paper
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
