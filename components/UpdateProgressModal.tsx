"use client";

import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Slider, SliderTrack, SliderRange, SliderThumb } from "@/components/ui/slider";
import { TrendingUp, Plus } from "lucide-react";

interface UpdateProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedProgress: number) => void;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  currentProgress: number;
  userId: string;
}

export function UpdateProgressModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  courseId, 
  courseCode, 
  courseTitle, 
  currentProgress,
  userId
}: UpdateProgressModalProps) {
  const [progress, setProgress] = useState([currentProgress]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/courses/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          progress: progress[0], // Get the first value from the array
          userId
        }),
      });

      if (response.ok) {
        onSuccess(progress[0]);
        onClose();
      } else {
        console.error('Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setProgress(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Update Progress</DialogTitle>
          </div>
          <DialogDescription>
            Update your progress for {courseCode} - {courseTitle}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Current Progress
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {progress[0]}%
                </span>
              </div>
              <Progress value={progress[0]} className="w-full h-3 mb-6" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-4 block">
                Drag to set your progress (0-100%)
              </label>
              <div className="px-4 py-2">
                <Slider
                  value={progress}
                  onValueChange={handleSliderChange}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                >
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Update Progress</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
