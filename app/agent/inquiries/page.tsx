"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  MessageSquare, 
  TrendingUp, 
  LogOut, 
  Users, 
  Bell, 
  MoreVertical,
  Plus,
  Search,
  Filter,
  Eye,
  Reply,
  Phone,
  Mail,
  Calendar,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function InquiriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout");
  };

  // Mock inquiries data
  const inquiries = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      property: "Modern Student Hostel - Lagos",
      message: "Hi, I'm interested in the shared room. Is it still available?",
      status: "new",
      date: "2024-01-15",
      time: "2:30 PM",
      priority: "high"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 987-6543",
      property: "Campus View Apartments",
      message: "Could you provide more details about the amenities?",
      status: "in_progress",
      date: "2024-01-14",
      time: "10:15 AM",
      priority: "medium"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 (555) 456-7890",
      property: "Downtown Student Housing",
      message: "What's the lease duration for the single room?",
      status: "resolved",
      date: "2024-01-13",
      time: "4:45 PM",
      priority: "low"
    },
    {
      id: 4,
      name: "David Kim",
      email: "d.kim@email.com",
      phone: "+1 (555) 321-0987",
      property: "Green Valley Hostel",
      message: "I'd like to schedule a viewing for this weekend.",
      status: "new",
      date: "2024-01-12",
      time: "9:20 AM",
      priority: "high"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.t@email.com",
      phone: "+1 (555) 654-3210",
      property: "University Heights",
      message: "Are pets allowed in the property?",
      status: "in_progress",
      date: "2024-01-11",
      time: "3:10 PM",
      priority: "medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">UniEase</h1>
              <p className="text-xs text-gray-600">Agent Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              href="/agent/dashboard" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/agent/listings" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Building2 className="h-5 w-5" />
              <span>Hostel Listings</span>
            </Link>
            <Link 
              href="/agent/inquiries" 
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Inquiries</span>
            </Link>
            <Link 
              href="/agent/create-listing" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Listing</span>
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
                <p className="text-gray-600">Manage customer inquiries and messages</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="px-4">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Inquiry
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {/* Search and Filter Bar */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                    <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {inquiries.filter(i => i.status === "new").length}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {inquiries.filter(i => i.status === "in_progress").length}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-2xl">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">
                      {inquiries.filter(i => i.status === "resolved").length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-2xl">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-lg font-semibold text-blue-600">
                            {inquiry.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                          <p className="text-sm text-gray-600">{inquiry.property}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(inquiry.priority)}>
                            {inquiry.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{inquiry.message}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{inquiry.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{inquiry.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{inquiry.date} at {inquiry.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInquiries.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
