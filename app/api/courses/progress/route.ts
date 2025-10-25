import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userCourses } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, progress, userId } = body;

    if (!courseId || progress === undefined || !userId) {
      return NextResponse.json({ error: "Course ID, progress, and user ID are required" }, { status: 400 });
    }

    // Validate progress is between 0 and 100
    const validProgress = Math.min(100, Math.max(0, parseInt(progress)));

    // Update the user's progress for the course
    const updatedEnrollment = await db
      .update(userCourses)
      .set({ 
        progress: validProgress
      })
      .where(
        and(
          eq(userCourses.courseId, courseId),
          eq(userCourses.userId, userId)
        )
      )
      .returning();

    if (updatedEnrollment.length === 0) {
      return NextResponse.json({ error: "Course enrollment not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      progress: validProgress,
      enrollment: updatedEnrollment[0]
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    return NextResponse.json({ error: "Failed to update course progress" }, { status: 500 });
  }
}
