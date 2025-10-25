"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Send,
  Download,
  FileText,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  MessageCircle,
  Zap
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

const studyTopics = [
  {
    id: 1,
    title: "Newton's Laws of Motion",
    subject: "Physics 101",
    difficulty: "Intermediate",
    timeEstimate: "15 min",
    progress: 75,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    subject: "CSE 201",
    difficulty: "Advanced",
    timeEstimate: "25 min",
    progress: 60,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Organic Chemistry Reactions",
    subject: "CHM 201",
    difficulty: "Hard",
    timeEstimate: "20 min",
    progress: 40,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Calculus Derivatives",
    subject: "MTH 101",
    difficulty: "Intermediate",
    timeEstimate: "18 min",
    progress: 90,
    color: "bg-orange-500"
  }
];

const recentSessions = [
  {
    id: 1,
    topic: "Newton's Laws of Motion",
    duration: "15 min",
    score: 85,
    completedAt: "2 hours ago",
    subject: "Physics 101"
  },
  {
    id: 2,
    topic: "Data Structures",
    duration: "22 min",
    score: 78,
    completedAt: "1 day ago",
    subject: "CSE 201"
  },
  {
    id: 3,
    topic: "Organic Chemistry",
    duration: "18 min",
    score: 92,
    completedAt: "2 days ago",
    subject: "CHM 201"
  }
];

const aiFeatures = [
  {
    title: "Personalized Study Plans",
    description: "AI creates custom study schedules based on your learning patterns",
    icon: Target,
    color: "bg-blue-500"
  },
  {
    title: "Smart Question Generation",
    description: "Generate practice questions tailored to your course material",
    icon: Lightbulb,
    color: "bg-green-500"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning progress with detailed analytics",
    icon: TrendingUp,
    color: "bg-purple-500"
  },
  {
    title: "Instant Explanations",
    description: "Get detailed explanations for complex topics instantly",
    icon: MessageCircle,
    color: "bg-orange-500"
  }
];

export default function AIAssistantPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(studyTopics[0]);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "user",
      message: "Can you explain the first law in simpler terms?",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "ai",
      message: "Of course! Think of it like this: if you slide a book across a table, it eventually stops because of friction, which is an external force. But if you were in space and pushed the same book, it would keep going forever in a straight line at the same speed because there's no friction or air to slow it down. That's the law of inertia in action!",
      timestamp: "2 hours ago"
    }
  ]);

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    const newMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: question,
      timestamp: "Just now"
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    setQuestion("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "ai" as const,
        message: "That's a great question! Let me break that down for you in a way that's easy to understand...",
        timestamp: "Just now"
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          title="AI Study Assistant"
          subtitle="Your personalized learning companion powered by AI"
        />

        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AI Study Assistant
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized help with your studies using advanced AI
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Study Topics */}
              <div className="space-y-6">
                {/* Current Topic */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span>Current Topic</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <h3 className="font-bold text-gray-900 mb-2">{currentTopic.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{currentTopic.subject}</p>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">
                            {currentTopic.difficulty}
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{currentTopic.timeEstimate}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${currentTopic.color}`}
                            style={{ width: `${currentTopic.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{currentTopic.progress}% Complete</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          View Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span>Study Topics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {studyTopics.map((topic) => (
                        <div
                          key={topic.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                            currentTopic.id === topic.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setCurrentTopic(topic)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm">{topic.title}</h4>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">{topic.progress}%</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{topic.subject}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {topic.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">{topic.timeEstimate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Chat Interface */}
              <div className="lg:col-span-2 space-y-6">
                {/* AI Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${feature.color} text-white`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                                {feature.title}
                              </h3>
                              <p className="text-xs text-gray-600">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Chat Interface */}
                <Card className="h-96">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      <span>Ask AI Assistant</span>
                      <Badge variant="secondary" className="ml-auto">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Powered
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-full flex flex-col">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {chatHistory.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input Area */}
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Ask a follow-up question to deepen your understanding..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="flex-1 min-h-12 resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendQuestion();
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendQuestion}
                        disabled={!question.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Recent Study Sessions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentSessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {session.topic}
                            </h4>
                            <p className="text-xs text-gray-600">{session.subject}</p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{session.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{session.score}%</span>
                            </div>
                            <span className="text-xs">{session.completedAt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
