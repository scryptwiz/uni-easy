"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Share2,
  MapPin,
  Wifi,
  Zap,
  Droplets,
  Shield,
  ChefHat,
  Car,
  Star,
  Phone,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { listings } from "@/lib/constants";
import { Navbar } from "@/components/Navbar";

export default function PropertyDetailsPage() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const property = useMemo(() => {
    const id = parseInt(params.id as string);
    return listings.find((listing) => listing.id === id) || null;
  }, [params.id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  const images = [
    { type: "video", alt: "Property tour" },
    { type: "image", alt: "Property exterior" },
    { type: "image", alt: "Bedroom" },
    { type: "image", alt: "Common area" },
    { type: "image", alt: "Kitchen" },
  ];

  const amenities = [
    { icon: Wifi, name: "Free Wi-Fi", description: "High-speed internet" },
    { icon: Zap, name: "24/7 Power", description: "Uninterrupted electricity" },
    {
      icon: Droplets,
      name: "Running Water",
      description: "Clean water supply",
    },
    { icon: Shield, name: "Security", description: "24/7 security" },
    { icon: ChefHat, name: "Kitchenette", description: "Shared kitchen" },
    { icon: Car, name: "Parking Space", description: "Secure parking" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-blue-600">
              Search Results
            </Link>
            <span>/</span>
            <span className="text-gray-900">{property.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
                  {images[currentImageIndex].type === "video" ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <button className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-8xl">🏠</div>
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      {image.type === "video" ? (
                        <div className="relative">
                          <div className="text-lg">🏠</div>
                          <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="text-lg">🏠</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Title and Description */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {property.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        isFavorite
                          ? "text-red-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{property.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-5 w-5" />
                  <span>{property.location}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                A brief paragraph highlighting the key features and benefits of
                the hostel. Located just a stone&apos;s throw from campus, this
                hostel offers a perfect blend of comfort, convenience, and
                community for discerning students.
              </p>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <amenity.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {amenity.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Location</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Rent</span>
                  <span className="text-2xl font-bold text-blue-600">
                    N{property.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Plan</span>
                  <span className="font-medium">2 Installments</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Additional Fees</span>
                  <span className="font-medium">N15,000</span>
                </div>
                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Contact Agent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Agent Card */}
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Property Agent
                </h3>
                <p className="text-xs text-gray-600">Get in touch with our expert</p>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-gray-900">John Doe</h4>
                  <p className="text-xs text-blue-600 font-medium">Senior Property Agent</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-700 bg-white rounded-lg p-2">
                  <Phone className="h-3 w-3 text-blue-600" />
                  <span className="text-sm font-medium">+234 812 345 6789</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-2">
                    Call Now
                  </Button>
                  <Button variant="outline" className="text-xs py-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
