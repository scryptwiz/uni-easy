"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Download,
  Filter,
  BookOpen,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Clock
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

const pastQuestions = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    code: "CSE 201",
    academicYear: "2022/2023 Academic Session",
    downloads: 245,
    rating: 4.8,
    fileSize: "2.3 MB",
    uploadedBy: "Dr. Johnson",
    uploadedAt: "2 days ago",
    tags: ["Programming", "Algorithms", "Data Structures"]
  },
  {
    id: 2,
    title: "Calculus I",
    code: "MTH 101",
    academicYear: "2021/2022 Academic Session",
    downloads: 189,
    rating: 4.6,
    fileSize: "1.8 MB",
    uploadedBy: "Prof. Smith",
    uploadedAt: "1 week ago",
    tags: ["Mathematics", "Calculus", "Derivatives"]
  },
  {
    id: 3,
    title: "Introduction to Sociology",
    code: "SOC 101",
    academicYear: "2020/2021 Academic Session",
    downloads: 156,
    rating: 4.4,
    fileSize: "1.2 MB",
    uploadedBy: "Dr. Williams",
    uploadedAt: "2 weeks ago",
    tags: ["Social Sciences", "Society", "Culture"]
  },
  {
    id: 4,
    title: "Organic Chemistry",
    code: "CHM 201",
    academicYear: "2022/2023 Academic Session",
    downloads: 312,
    rating: 4.9,
    fileSize: "3.1 MB",
    uploadedBy: "Prof. Davis",
    uploadedAt: "3 days ago",
    tags: ["Chemistry", "Organic", "Reactions"]
  },
  {
    id: 5,
    title: "Human Anatomy",
    code: "ANA 201",
    academicYear: "2021/2022 Academic Session",
    downloads: 278,
    rating: 4.7,
    fileSize: "4.2 MB",
    uploadedBy: "Dr. Brown",
    uploadedAt: "5 days ago",
    tags: ["Biology", "Anatomy", "Medical"]
  },
  {
    id: 6,
    title: "History of Nigeria",
    code: "HIS 102",
    academicYear: "2020/2021 Academic Session",
    downloads: 134,
    rating: 4.3,
    fileSize: "1.5 MB",
    uploadedBy: "Prof. Wilson",
    uploadedAt: "1 month ago",
    tags: ["History", "Nigeria", "Politics"]
  }
];

const faculties = [
  "All Faculties",
  "Faculty of Engineering",
  "Faculty of Sciences",
  "Faculty of Social Sciences",
  "Faculty of Arts",
  "Faculty of Medicine"
];

const departments = [
  "All Departments",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Sociology",
  "History"
];

const levels = [
  "All Levels",
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level"
];

const academicYears = [
  "All Years",
  "2025/2026",
  "2024/2025",
  "2022/2023",
  "2021/2022",
  "2020/2021"
];

export default function PastQuestionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("most-recent");

  const filteredQuestions = pastQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
          title="Past Questions"
          subtitle="Access past exam questions and study materials"
        />

        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Ace Your Exams
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your Past Questions Hub
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for a course code or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Faculty</label>
                    <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {faculties.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>
                            {faculty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {academicYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-gray-700">Sort by:</span>
                    <div className="flex space-x-2">
                      {[
                        { value: "most-recent", label: "Most Recent" },
                        { value: "oldest", label: "Oldest" },
                        { value: "alphabetical", label: "Alphabetical" }
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant={sortBy === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {question.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {question.code}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.academicYear}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600">
                          {question.rating}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{question.downloads} downloads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{question.uploadedAt}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {question.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {question.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{question.tags.length - 2} more
                          </Badge>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{question.fileSize}</span>
                        <span>by {question.uploadedBy}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex space-x-1">
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    size="sm"
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
