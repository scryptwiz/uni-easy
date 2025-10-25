"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Clock,
  Star,
  Users,
  BookOpen,
  Video,
  FileText,
  Download,
  ChevronRight,
  Search,
  Filter,
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

const tutorials = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the fundamentals of programming with Python",
    instructor: "Dr. Sarah Johnson",
    duration: "2h 30m",
    level: "Beginner",
    rating: 4.8,
    students: 1250,
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    category: "Programming",
    tags: ["Python", "Basics", "Programming"],
    isCompleted: false,
    progress: 0
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "Master essential data structures and algorithmic thinking",
    instructor: "Prof. Michael Chen",
    duration: "4h 15m",
    level: "Intermediate",
    rating: 4.9,
    students: 890,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    category: "Computer Science",
    tags: ["Algorithms", "Data Structures", "C++"],
    isCompleted: true,
    progress: 100
  },
  {
    id: 3,
    title: "Calculus Fundamentals",
    description: "Understanding derivatives, integrals, and limits",
    instructor: "Dr. Emily Rodriguez",
    duration: "3h 45m",
    level: "Intermediate",
    rating: 4.7,
    students: 2100,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    category: "Mathematics",
    tags: ["Calculus", "Math", "Derivatives"],
    isCompleted: false,
    progress: 65
  },
  {
    id: 4,
    title: "Organic Chemistry Basics",
    description: "Introduction to organic compounds and reactions",
    instructor: "Prof. David Kim",
    duration: "2h 50m",
    level: "Advanced",
    rating: 4.6,
    students: 750,
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    category: "Chemistry",
    tags: ["Chemistry", "Organic", "Reactions"],
    isCompleted: false,
    progress: 30
  },
  {
    id: 5,
    title: "Digital Electronics",
    description: "Logic gates, circuits, and digital systems",
    instructor: "Dr. Lisa Wang",
    duration: "3h 20m",
    level: "Intermediate",
    rating: 4.8,
    students: 1100,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    category: "Engineering",
    tags: ["Electronics", "Circuits", "Digital"],
    isCompleted: false,
    progress: 0
  },
  {
    id: 6,
    title: "Human Anatomy & Physiology",
    description: "Comprehensive study of human body systems",
    instructor: "Dr. Robert Taylor",
    duration: "5h 10m",
    level: "Advanced",
    rating: 4.9,
    students: 1800,
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    category: "Biology",
    tags: ["Anatomy", "Physiology", "Medical"],
    isCompleted: true,
    progress: 100
  }
];

const categories = [
  "All Categories",
  "Programming",
  "Computer Science",
  "Mathematics",
  "Chemistry",
  "Engineering",
  "Biology",
  "Physics"
];

const levels = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced"
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Most Recent" },
  { value: "rating", label: "Highest Rated" },
  { value: "duration", label: "Duration" }
];

export default function TutorialsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || tutorial.category === selectedCategory;
    const matchesLevel = !selectedLevel || tutorial.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
          title="Tutorials"
          subtitle="Video tutorials and learning resources"
        />

        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Video Tutorials
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Learn from expert instructors with comprehensive video courses
              </p>

              {/* Search and Filters */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search tutorials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl"
                  />
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-6xl">🎥</div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="bg-white text-black hover:bg-gray-100">
                        <Play className="h-5 w-5 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={getLevelColor(tutorial.level)}>
                        {tutorial.level}
                      </Badge>
                    </div>
                    {tutorial.isCompleted && (
                      <div className="absolute top-3 left-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {/* Title and Instructor */}
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{tutorial.description}</p>
                        <p className="text-xs text-gray-500">by {tutorial.instructor}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{tutorial.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{tutorial.students}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {tutorial.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{tutorial.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${tutorial.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {tutorial.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {tutorial.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tutorial.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          {tutorial.isCompleted ? (
                            <>
                              <Award className="h-4 w-4 mr-2" />
                              Completed
                            </>
                          ) : tutorial.progress > 0 ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Featured This Week
                </h2>
                <p className="text-gray-600">
                  Don't miss these trending tutorials
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tutorials.slice(0, 3).map((tutorial) => (
                  <div key={tutorial.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {tutorial.title}
                        </h3>
                        <p className="text-xs text-gray-600">{tutorial.instructor}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
