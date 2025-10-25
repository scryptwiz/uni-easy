"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Filter, 
  Shield, 
  Building2,
  MoreVertical,
  Calendar,
  Users,
  TrendingUp,
  LogOut,
  Bell
} from "lucide-react";
import { listings, amenityIcons } from "@/lib/constants";

export default function AgentListingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock agent listings data - in real app, this would come from API
  const agentListings = useMemo(() => {
    const mockData = [
      { views: 234, inquiries: 12, daysAgo: 5, lastDaysAgo: 2 },
      { views: 456, inquiries: 8, daysAgo: 12, lastDaysAgo: 1 },
      { views: 123, inquiries: 3, daysAgo: 8, lastDaysAgo: 3 },
      { views: 789, inquiries: 15, daysAgo: 3, lastDaysAgo: 1 },
      { views: 345, inquiries: 7, daysAgo: 15, lastDaysAgo: 4 },
      { views: 567, inquiries: 9, daysAgo: 7, lastDaysAgo: 2 },
    ];
    
    const now = new Date();
    return listings.map((listing, index) => {
      const mock = mockData[index % mockData.length] || mockData[0];
      return {
        ...listing,
        id: `agent-${listing.id}`,
        status: index % 3 === 0 ? "published" : index % 3 === 1 ? "draft" : "pending",
        views: mock.views,
        inquiries: mock.inquiries,
        createdAt: new Date(now.getTime() - mock.daysAgo * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(now.getTime() - mock.lastDaysAgo * 24 * 60 * 60 * 1000),
      };
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Published";
      case "draft":
        return "Draft";
      case "pending":
        return "Pending Review";
      default:
        return status;
    }
  };

  const filteredListings = agentListings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === "all" || listing.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: string) => {
    console.log("Edit listing:", id);
    // Navigate to edit page
  };

  const handleDelete = (id: string) => {
    console.log("Delete listing:", id);
    // Show confirmation modal
  };

  const handleView = (id: string) => {
    console.log("View listing:", id);
    // Navigate to public view
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout");
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
              className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
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
                <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                <p className="text-gray-600">Manage your property listings</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-4"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/agent/create-listing">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Listing
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <main className="p-4 lg:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{agentListings.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {agentListings.filter(l => l.status === "published").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">
                  {agentListings.reduce((sum, l) => sum + l.views, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inquiries</p>
                <p className="text-2xl font-bold text-orange-600">
                  {agentListings.reduce((sum, l) => sum + l.inquiries, 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Filter className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Search & Filter</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setSortBy("");
              }}
              className="text-gray-600 hover:text-gray-900 border-gray-300"
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sort options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Quick Actions</label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden py-0">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl">🏠</div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className={getStatusColor(listing.status)}>
                      {getStatusLabel(listing.status)}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => handleView(listing.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => handleEdit(listing.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {listing.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{listing.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.amenities.slice(0, 3).map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Shield;
                      return (
                        <span
                          key={index}
                          className="flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                        >
                          <IconComponent className="h-3 w-3 mr-1" />
                          {amenity}
                        </span>
                      );
                    })}
                    {listing.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{listing.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          N{listing.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600">/year</span>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {listing.views} views
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {listing.inquiries} inquiries
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleView(listing.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleEdit(listing.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-32 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-3xl">🏠</div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {listing.name}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {listing.location}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(listing.status)}>
                            {getStatusLabel(listing.status)}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{listing.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {listing.views} views
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {listing.inquiries} inquiries
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Updated {listing.lastUpdated.toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <span className="text-xl font-bold text-blue-600">
                              N{listing.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-600">/year</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {listing.amenities.slice(0, 4).map((amenity, index) => {
                              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Shield;
                              return (
                                <span
                                  key={index}
                                  className="flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                >
                                  <IconComponent className="h-3 w-3 mr-1" />
                                  {amenity}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(listing.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(listing.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(listing.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter 
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first listing"
              }
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/agent/create-listing">
                <Plus className="h-4 w-4 mr-2" />
                Create New Listing
              </Link>
            </Button>
          </div>
        )}
        </main>
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
