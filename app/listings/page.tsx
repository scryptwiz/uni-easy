"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Heart, Filter, Shield, GraduationCap } from "lucide-react";
import { listings, amenityIcons, priceRanges, roomTypes, amenityFilters, sortOptions } from "@/lib/constants";
import { Navbar } from "@/components/Navbar";

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = !selectedPrice || 
      (selectedPrice === "low" && listing.price <= 100000) ||
      (selectedPrice === "medium" && listing.price > 100000 && listing.price <= 200000) ||
      (selectedPrice === "high" && listing.price > 200000);
    const matchesType = !selectedType || listing.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesSearch && matchesPrice && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find your ideal home away from home
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Effortlessly search and discover the perfect student accommodation
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for hostels, areas, or landmarks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Filter & Sort</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedPrice("");
                  setSelectedType("");
                  setSelectedAmenities("");
                  setSortBy("");
                  setSearchTerm("");
                }}
                className="text-gray-600 hover:text-gray-900 border-gray-300"
              >
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800 text-left">Price Range</label>
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800 text-left">Room Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800 text-left">Amenities</label>
                <Select value={selectedAmenities} onValueChange={setSelectedAmenities}>
                  <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Select amenities" />
                  </SelectTrigger>
                  <SelectContent>
                    {amenityFilters.map((amenity) => (
                      <SelectItem key={amenity.value} value={amenity.value}>
                        {amenity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800 text-left">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Sort options" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.slice(0, 3).map((listing) => (
              <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden p-0">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl">🏠</div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(listing.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                  {!listing.available && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Unavailable
                    </div>
                  )}
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
                    {listing.amenities.map((amenity, index) => {
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
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        N{listing.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">/year</span>
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!listing.available}
                      asChild
                    >
                      {listing.available ? (
                        <Link href={`/property/${listing.id}`}>View Details</Link>
                      ) : (
                        <span>Unavailable</span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Listings Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden p-0">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl">🏠</div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(listing.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                  {!listing.available && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Unavailable
                    </div>
                  )}
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
                    {listing.amenities.map((amenity, index) => {
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
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        N{listing.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">/year</span>
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!listing.available}
                      asChild
                    >
                      {listing.available ? (
                        <Link href={`/property/${listing.id}`}>View Details</Link>
                      ) : (
                        <span>Unavailable</span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">UniEase</span>
              <span className="text-sm text-gray-600">Simplifying student life</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">About Us</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
              <a href="#" className="hover:text-gray-900 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
