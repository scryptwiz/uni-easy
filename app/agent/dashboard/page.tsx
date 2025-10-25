"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Plus, 
  Eye, 
  Edit, 
  Bell, 
  LogOut, 
  Users, 
  TrendingUp,
  MapPin,
  Star,
  MoreVertical,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AgentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Mock data
  const stats = {
    totalListings: 5,
    newInquiries: 3,
    totalViews: 1247,
    rating: 4.8
  };

  const listings = [
    {
      id: 1,
      name: "Prestige Hostel",
      location: "Under G",
      price: "₦150,000/yr",
      status: "Active",
      views: 234,
      inquiries: 12,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Peace Villa",
      location: "Stadium",
      price: "₦120,000/yr",
      status: "Active",
      views: 189,
      inquiries: 8,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Royal Suites",
      location: "Adenike",
      price: "₦180,000/yr",
      status: "Draft",
      views: 67,
      inquiries: 3,
      image: "/api/placeholder/300/200"
    }
  ];

  const inquiries = [
    {
      id: 1,
      name: "John Doe",
      message: "Inquired about Prestige Hostel",
      time: "2 hours ago",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      message: "Interested in Peace Villa",
      time: "4 hours ago",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Mike Johnson",
      message: "Asked about Royal Suites availability",
      time: "1 day ago",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const handleLogout = () => {
    router.push("/agent/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              <p className="text-xs text-gray-600">Agent Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              href="/agent/dashboard" 
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
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
                <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-gray-600">Here&apos;s what&apos;s happening with your listings today</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Agent Dashboard</p>
                <p className="text-sm font-medium text-gray-900">Agent Name</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Total Listings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
                    <p className="text-xs text-gray-500 mt-1">Active properties</p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded-2xl shadow-sm">
                    <Building2 className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">New Inquiries</p>
                    <p className="text-3xl font-bold text-green-600">{stats.newInquiries}</p>
                    <p className="text-xs text-gray-500 mt-1">This week</p>
                  </div>
                  <div className="p-4 bg-green-100 rounded-2xl shadow-sm">
                    <Bell className="h-7 w-7 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">All time</p>
                  </div>
                  <div className="p-4 bg-purple-100 rounded-2xl shadow-sm">
                    <Eye className="h-7 w-7 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Rating</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-gray-900">{stats.rating}</p>
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Based on reviews</p>
                  </div>
                  <div className="p-4 bg-yellow-100 rounded-2xl shadow-sm">
                    <Star className="h-7 w-7 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Actions</h2>
                <p className="text-gray-600">Manage your listings and track performance</p>
              </div>
              <Button 
                onClick={() => router.push("/agent/create-listing")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 text-base font-semibold"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Listing
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200" onClick={() => router.push("/agent/listings")}>
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Manage Listings</h3>
                  <p className="text-gray-600 text-sm mb-4">View, edit, and manage all your property listings</p>
                  <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span className="text-sm">View Listings</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200" onClick={() => router.push("/agent/listings")}>
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">Manage Listings</h3>
                  <p className="text-gray-600 text-sm mb-4">Edit and manage your property listings</p>
                  <div className="flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700">
                    <span className="text-sm">Manage Properties</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hostel Listings */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Recent Listings</CardTitle>
                <p className="text-sm text-gray-600">Your latest property listings</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                          <Building2 className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{listing.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{listing.location}</span>
                          </div>
                          <p className="text-sm font-semibold text-blue-600">{listing.price}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>{listing.views} views</span>
                            <span>{listing.inquiries} inquiries</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(listing.status)} font-medium`}>
                          {listing.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-green-50 hover:border-green-200">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={() => router.push("/agent/listings")} className="px-6">
                    View All Listings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Inquiries */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Recent Inquiries</CardTitle>
                <p className="text-sm text-gray-600">Latest messages from potential tenants</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-sm">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{inquiry.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{inquiry.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{inquiry.time}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-blue-600 hover:bg-blue-50 hover:border-blue-200">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={() => router.push("/agent/listings")} className="px-6">
                    View All Listings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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
