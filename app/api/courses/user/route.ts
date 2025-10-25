import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userCourses, courses } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user's enrolled courses with course details
    const userCoursesData = await db
      .select({
        id: userCourses.id,
        courseId: userCourses.courseId,
        progress: userCourses.progress,
        enrolledAt: userCourses.enrolledAt,
        course: {
          id: courses.id,
          code: courses.code,
          title: courses.title,
          credits: courses.credits,
          instructor: courses.instructor
        }
      })
      .from(userCourses)
      .innerJoin(courses, eq(userCourses.courseId, courses.id))
      .where(eq(userCourses.userId, userId))
      .orderBy(courses.code);

    return NextResponse.json({ courses: userCoursesData });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return NextResponse.json({ error: "Failed to fetch user courses" }, { status: 500 });
  }
}
