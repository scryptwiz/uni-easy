"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Target, Calendar, Zap } from "lucide-react";

interface StudyGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goals: { dailyHours: number; weeklyHours: number; streakGoal: number }) => void;
  currentGoals?: { dailyHours: number; weeklyHours: number; streakGoal: number };
  loading?: boolean;
}

export function StudyGoalsModal({ 
  isOpen, 
  onClose, 
  onSave, 
  currentGoals,
  loading = false 
}: StudyGoalsModalProps) {
  const [formData, setFormData] = useState({
    dailyHours: currentGoals?.dailyHours || 4,
    weeklyHours: currentGoals?.weeklyHours || 20,
    streakGoal: currentGoals?.streakGoal || 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  // Update form data when currentGoals change
  useEffect(() => {
    if (currentGoals) {
      setFormData({
        dailyHours: currentGoals.dailyHours,
        weeklyHours: currentGoals.weeklyHours,
        streakGoal: currentGoals.streakGoal
      });
    }
  }, [currentGoals]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl">Set Study Goals</DialogTitle>
          </div>
          <DialogDescription>
            Set your weekly study hours and streak goals to stay motivated.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4" />
                <span>Daily Study Hours</span>
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="24"
                  value={formData.dailyHours}
                  onChange={(e) => handleChange('dailyHours', e.target.value)}
                  className="pr-8"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  hours
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 2-6 hours per day
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4" />
                <span>Weekly Study Hours</span>
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.weeklyHours}
                  onChange={(e) => handleChange('weeklyHours', e.target.value)}
                  className="pr-8"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  hours
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 15-25 hours per week
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4" />
                <span>Streak Goal (Days)</span>
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={formData.streakGoal}
                  onChange={(e) => handleChange('streakGoal', e.target.value)}
                  className="pr-8"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  days
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                How many consecutive days do you want to study?
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || formData.dailyHours < 1 || formData.weeklyHours < 1 || formData.streakGoal < 1}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Save Goals</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
