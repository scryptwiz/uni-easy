import { Wifi, Zap, Car, Shield, Users, MapPin } from "lucide-react";

export const listings = [
  {
    id: 1,
    name: "Prestige Hostel",
    price: 150000,
    image: "/api/placeholder/400/300",
    amenities: ["Ensuite", "Wi-Fi", "24/7 Power"],
    rating: 4.8,
    location: "Near Campus",
    type: "Hostel",
    available: true
  },
  {
    id: 2,
    name: "Scholars Lodge",
    price: 120000,
    image: "/api/placeholder/400/300",
    amenities: ["Ensuite", "Wi-Fi", "Solar Power"],
    rating: 4.6,
    location: "5 min from Campus",
    type: "Hostel",
    available: true
  },
  {
    id: 3,
    name: "Campus View",
    price: 180000,
    image: "/api/placeholder/400/300",
    amenities: ["Balcony", "Wi-Fi", "24/7 Power"],
    rating: 4.9,
    location: "Campus View",
    type: "Apartment",
    available: true
  },
  {
    id: 4,
    name: "Harmony Hostel",
    price: 50000,
    image: "/api/placeholder/400/300",
    amenities: ["Shared", "No Wi-Fi", "24/7 Power"],
    rating: 4.2,
    location: "10 min from Campus",
    type: "Hostel",
    available: true
  },
  {
    id: 5,
    name: "Royal Suites",
    price: 250000,
    image: "/api/placeholder/400/300",
    amenities: ["Ensuite", "Wi-Fi", "AC"],
    rating: 4.7,
    location: "Premium Location",
    type: "Apartment",
    available: false
  },
  {
    id: 6,
    name: "Elite Apartments",
    price: 200000,
    image: "/api/placeholder/400/300",
    amenities: ["Kitchenette", "Wi-Fi", "24/7 Power"],
    rating: 4.5,
    location: "Near Campus",
    type: "Apartment",
    available: true
  }
];

export const amenityIcons = {
  "Wi-Fi": Wifi,
  "24/7 Power": Zap,
  "Solar Power": Zap,
  "AC": Car,
  "Ensuite": Shield,
  "Shared": Users,
  "Balcony": MapPin,
  "Kitchenette": Shield,
  "No Wi-Fi": Wifi
};

export const priceRanges = [
  { value: "low", label: "Under N100,000", max: 100000 },
  { value: "medium", label: "N100,000 - N200,000", min: 100000, max: 200000 },
  { value: "high", label: "Above N200,000", min: 200000 }
];

export const roomTypes = [
  { value: "hostel", label: "Hostel" },
  { value: "apartment", label: "Apartment" }
];

export const amenityFilters = [
  { value: "wifi", label: "Wi-Fi" },
  { value: "power", label: "24/7 Power" },
  { value: "ac", label: "Air Conditioning" }
];

export const sortOptions = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" }
];
