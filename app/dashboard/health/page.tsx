"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Apple,
  Coffee,
  Droplets,
  Clock,
  Target,
  Zap,
  Brain,
  Activity,
  Utensils,
  Leaf,
  Fish,
  Egg,
  Carrot,
  Banana,
  Milk,
  AlertTriangle,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react";

export default function HealthPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const nutritionTips = [
    {
      id: 1,
      title: "Start Your Day with Protein",
      description: "Eating protein at breakfast helps maintain stable blood sugar levels and keeps you full longer.",
      category: "breakfast",
      icon: Egg,
      color: "bg-orange-500",
      benefits: ["Sustained energy", "Better focus", "Reduced cravings"],
      tip: "Try eggs, Greek yogurt, or protein smoothies for breakfast."
    },
    {
      id: 2,
      title: "Stay Hydrated Throughout the Day",
      description: "Proper hydration is essential for brain function, energy levels, and overall health.",
      category: "hydration",
      icon: Droplets,
      color: "bg-blue-500",
      benefits: ["Better concentration", "Improved mood", "Enhanced performance"],
      tip: "Aim for 8-10 glasses of water daily. Add lemon or cucumber for flavor."
    },
    {
      id: 3,
      title: "Include Omega-3 Rich Foods",
      description: "Omega-3 fatty acids support brain health and can improve cognitive function.",
      category: "brain-health",
      icon: Fish,
      color: "bg-indigo-500",
      benefits: ["Better memory", "Reduced inflammation", "Heart health"],
      tip: "Eat fatty fish like salmon, walnuts, or chia seeds regularly."
    },
    {
      id: 4,
      title: "Eat the Rainbow",
      description: "Different colored fruits and vegetables provide various vitamins and antioxidants.",
      category: "general",
      icon: Carrot,
      color: "bg-green-500",
      benefits: ["Immune support", "Antioxidants", "Digestive health"],
      tip: "Include at least 5 different colored fruits and vegetables daily."
    },
    {
      id: 5,
      title: "Choose Complex Carbohydrates",
      description: "Complex carbs provide sustained energy and help maintain stable blood sugar.",
      category: "energy",
      icon: Banana,
      color: "bg-yellow-500",
      benefits: ["Sustained energy", "Better focus", "Digestive health"],
      tip: "Opt for whole grains, oats, quinoa, and sweet potatoes."
    },
    {
      id: 6,
      title: "Don't Skip Meals",
      description: "Regular meals help maintain energy levels and prevent overeating later.",
      category: "general",
      icon: Clock,
      color: "bg-purple-500",
      benefits: ["Stable energy", "Better metabolism", "Mood stability"],
      tip: "Eat every 3-4 hours to maintain steady blood sugar levels."
    },
    {
      id: 7,
      title: "Include Healthy Fats",
      description: "Healthy fats are essential for brain function and nutrient absorption.",
      category: "brain-health",
      icon: Leaf,
      color: "bg-emerald-500",
      benefits: ["Brain health", "Nutrient absorption", "Hormone production"],
      tip: "Add avocados, nuts, seeds, and olive oil to your meals."
    },
    {
      id: 8,
      title: "Limit Processed Foods",
      description: "Minimize processed foods to reduce inflammation and improve overall health.",
      category: "general",
      icon: AlertTriangle,
      color: "bg-red-500",
      benefits: ["Reduced inflammation", "Better digestion", "More nutrients"],
      tip: "Focus on whole, unprocessed foods as much as possible."
    }
  ];

  const categories = [
    { id: "all", label: "All Tips", icon: Star },
    { id: "breakfast", label: "Breakfast", icon: Coffee },
    { id: "hydration", label: "Hydration", icon: Droplets },
    { id: "brain-health", label: "Brain Health", icon: Brain },
    { id: "energy", label: "Energy", icon: Zap },
    { id: "general", label: "General", icon: Heart }
  ];

  const filteredTips = selectedCategory === "all" 
    ? nutritionTips 
    : nutritionTips.filter(tip => tip.category === selectedCategory);

  const dailyGoals = [
    { id: "water", label: "Water Intake", current: 6, target: 8, unit: "glasses", icon: Droplets, color: "bg-blue-500" },
    { id: "fruits", label: "Fruits & Veggies", current: 4, target: 5, unit: "servings", icon: Apple, color: "bg-green-500" },
    { id: "protein", label: "Protein", current: 2, target: 3, unit: "meals", icon: Egg, color: "bg-orange-500" },
    { id: "exercise", label: "Exercise", current: 30, target: 60, unit: "minutes", icon: Activity, color: "bg-purple-500" }
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
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
      <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(true)} 
          title="Health & Nutrition"
          subtitle="Fuel your body and mind for academic success"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Health & Nutrition</h1>
                  <p className="text-gray-600">Fuel your body and mind for academic success</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200">
                <Leaf className="h-3 w-3 mr-1" />
                Prototype Version
              </Badge>
            </div>

            {/* Daily Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {dailyGoals.map((goal, index) => {
                const IconComponent = goal.icon;
                const progress = (goal.current / goal.target) * 100;
                return (
                  <Card 
                    key={goal.id} 
                    className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-md hover:shadow-lg bg-gradient-to-br from-white to-gray-50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${goal.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {goal.current}/{goal.target}
                          </span>
                          <p className="text-xs text-gray-500 font-medium">{goal.unit}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors duration-300">
                          {goal.label}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Progress</span>
                          <span className="font-semibold">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-3 rounded-full transition-all duration-1000 ease-out ${goal.color} group-hover:shadow-lg`}
                            style={{ 
                              width: `${Math.min(progress, 100)}%`,
                              animation: `slideIn 1s ease-out ${index * 0.2}s both`
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span>Categories</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category, index) => {
                      const IconComponent = category.icon;
                      const isSelected = selectedCategory === category.id;
                      return (
                        <Button
                          key={category.id}
                          variant="ghost"
                          className={`w-full justify-start group transition-all duration-300 transform hover:scale-105 ${
                            isSelected 
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl" 
                              : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-600"
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <IconComponent className={`h-4 w-4 mr-3 transition-all duration-300 ${
                            isSelected 
                              ? "text-white group-hover:scale-110" 
                              : "text-gray-500 group-hover:text-blue-500 group-hover:scale-110"
                          }`} />
                          <span className="font-medium">{category.label}</span>
                          {isSelected && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Nutrition Tips */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Nutrition Tips</h2>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {filteredTips.length} tips
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTips.map((tip, index) => {
                      const IconComponent = tip.icon;
                      return (
                        <Card 
                          key={tip.id} 
                          className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer border-0 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50 overflow-hidden !p-0"
                          style={{ 
                            animationDelay: `${index * 100}ms`,
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                          }}
                        >
                          <CardContent className="p-0">
                            {/* Header with gradient background */}
                            <div className={`p-6 ${tip.color} bg-gradient-to-r ${tip.color} to-opacity-80`}>
                              <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-xl bg-white bg-opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                  <IconComponent className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-white text-lg group-hover:text-yellow-200 transition-colors duration-300">
                                    {tip.title}
                                  </h3>
                                  <p className="text-white text-opacity-90 text-sm mt-1">
                                    {tip.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Content area */}
                            <div className="p-6">
                              <div className="mb-6">
                                <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                                  Benefits:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {tip.benefits.map((benefit, benefitIndex) => (
                                    <Badge 
                                      key={benefitIndex} 
                                      className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200 hover:scale-105 transition-transform duration-200 cursor-default"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      {benefit}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200 group-hover:shadow-md transition-all duration-300">
                                <div className="flex items-start space-x-3">
                                  <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                                    <Utensils className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-700 font-semibold group-hover:text-gray-900 transition-colors duration-300">
                                      💡 Pro Tip:
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-300">
                                      {tip.tip}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Button className="group h-auto !p-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl bg-white bg-opacity-20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-white text-lg group-hover:text-yellow-200 transition-colors duration-300">Meal Planner</p>
                          <p className="text-sm text-white text-opacity-90 group-hover:text-opacity-100 transition-all duration-300">Plan your weekly meals</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button className="group h-auto !p-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl bg-white bg-opacity-20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-white text-lg group-hover:text-yellow-200 transition-colors duration-300">Nutrition Coach</p>
                          <p className="text-sm text-white text-opacity-90 group-hover:text-opacity-100 transition-all duration-300">Get personalized advice</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button className="group h-auto !p-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl bg-white bg-opacity-20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-white text-lg group-hover:text-yellow-200 transition-colors duration-300">Progress Tracker</p>
                          <p className="text-sm text-white text-opacity-90 group-hover:text-opacity-100 transition-all duration-300">Monitor your health goals</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
