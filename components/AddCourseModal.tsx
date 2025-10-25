"use client";

import { useState } from "react";
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
import { BookOpen, Plus } from "lucide-react";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export function AddCourseModal({ isOpen, onClose, onSuccess, userId }: AddCourseModalProps) {
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    instructor: "",
    credits: "",
    semester: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          courseId: formData.code.toLowerCase().replace(/\s+/g, '-'),
          code: formData.code,
          title: formData.title,
          instructor: formData.instructor,
          credits: parseInt(formData.credits),
          semester: formData.semester,
          description: formData.description
        }),
      });

      if (response.ok) {
        const result = await response.json();
        onSuccess();
        onClose();
        setFormData({
          code: "",
          title: "",
          instructor: "",
          credits: "",
          semester: "",
          description: ""
        });
      } else {
        console.error('Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl">Add New Course</DialogTitle>
          </div>
          <DialogDescription>
            Add a new course to your academic profile.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Course Code</label>
              <Input
                placeholder="e.g., CSE 401"
                value={formData.code}
                onChange={(e) => handleChange('code', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Credits</label>
              <Input
                type="number"
                placeholder="3"
                value={formData.credits}
                onChange={(e) => handleChange('credits', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Course Title</label>
            <Input
              placeholder="e.g., Artificial Intelligence"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Instructor</label>
            <Input
              placeholder="e.g., Dr. Smith"
              value={formData.instructor}
              onChange={(e) => handleChange('instructor', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Semester</label>
            <Select value={formData.semester} onValueChange={(value) => handleChange('semester', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                <SelectItem value="Summer 2026">Summer 2026</SelectItem>
                <SelectItem value="Fall 2026">Fall 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description (Optional)</label>
            <Textarea
              placeholder="Course description..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Course</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
