"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StudySessionSkeleton } from "@/components/SkeletonComponents";
import {
  Bot,
  Send,
  MessageCircle,
  Lightbulb,
  BookOpen,
  Calculator,
  Code,
  FileText,
  Sparkles,
  Brain,
  Zap,
  Target
} from "lucide-react";

export default function AIAssistantPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
  }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help you with your academic questions! This is a prototype version. In the full version, I'll be able to help you with course materials, study strategies, problem-solving, and more. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    {
      id: "math-help",
      title: "Math Problem Solver",
      description: "Get step-by-step solutions",
      icon: Calculator,
      color: "bg-blue-500"
    },
    {
      id: "essay-help",
      title: "Essay Writing Assistant",
      description: "Improve your writing",
      icon: FileText,
      color: "bg-green-500"
    },
    {
      id: "code-help",
      title: "Coding Assistant",
      description: "Debug and explain code",
      icon: Code,
      color: "bg-purple-500"
    },
    {
      id: "study-tips",
      title: "Study Strategies",
      description: "Personalized study plans",
      icon: Target,
      color: "bg-orange-500"
    }
  ];

  if (isPending) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(true)} 
          title="AI Study Assistant"
          subtitle="Your intelligent companion for academic success"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">AI Study Assistant</h1>
                  <p className="text-gray-600">Your intelligent companion for academic success</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200">
                <Sparkles className="h-3 w-3 mr-1" />
                Prototype Version
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col pt-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b !py-5">
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                      <span>Chat with AI Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
                      {messages.length === 0 ? (
                        <div className="text-center text-gray-500 pt-4">
                          <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>Start a conversation with your AI study assistant!</p>
                          <p className="text-sm mt-2">Ask questions about your courses, get study tips, or request help with assignments.</p>
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                msg.isUser
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className={`text-xs mt-1 ${
                                msg.isUser ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {msg.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ask me anything about your studies..."
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!message.trim() || isTyping}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action) => {
                      const IconComponent = action.icon;
                      return (
                        <Button
                          key={action.id}
                          variant="outline"
                          className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${action.color}`}>
                              <IconComponent className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-sm">{action.title}</p>
                              <p className="text-xs text-gray-500">{action.description}</p>
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Features Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-500" />
                      <span>Coming Soon</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        <span>Course-specific help</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Lightbulb className="h-4 w-4" />
                        <span>Study strategy recommendations</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>Assignment assistance</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Target className="h-4 w-4" />
                        <span>Personalized learning paths</span>
                      </div>
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