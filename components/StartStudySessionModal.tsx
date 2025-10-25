"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timer, Plus, BookOpen, Play } from "lucide-react";

interface Course {
  id: string;
  code: string;
  title: string;
}

interface StartStudySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (sessionData: { courseId: string; topic: string; notes?: string }) => void;
  courses: Course[];
  loading?: boolean;
}

export function StartStudySessionModal({ 
  isOpen, 
  onClose, 
  onStart, 
  courses, 
  loading = false 
}: StartStudySessionModalProps) {
  const [formData, setFormData] = useState({
    courseId: "",
    topic: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.courseId && formData.topic) {
      onStart({
        courseId: formData.courseId,
        topic: formData.topic,
        notes: formData.notes || undefined
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        courseId: "",
        topic: "",
        notes: ""
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-full">
              <Timer className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Start Study Session</DialogTitle>
          </div>
          <DialogDescription>
            Begin a new study session to track your learning progress.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Course</label>
            <Select 
              value={formData.courseId} 
              onValueChange={(value) => handleChange('courseId', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.code} - {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Study Topic</label>
            <Input
              placeholder="e.g., Neural Networks, Calculus Problems"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
            <Textarea
              placeholder="Add any notes about what you plan to study..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.courseId || !formData.topic}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Starting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Start Session</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
