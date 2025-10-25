import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courses, userCourses } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get user's enrolled courses with progress
    const userCoursesData = await db
      .select({
        courseId: userCourses.courseId,
        progress: userCourses.progress,
        enrolledAt: userCourses.enrolledAt,
        course: {
          id: courses.id,
          code: courses.code,
          title: courses.title,
          instructor: courses.instructor,
          credits: courses.credits,
          semester: courses.semester,
          description: courses.description,
          createdAt: courses.createdAt,
        }
      })
      .from(userCourses)
      .innerJoin(courses, eq(userCourses.courseId, courses.id))
      .where(eq(userCourses.userId, userId));

    return NextResponse.json({ courses: userCoursesData });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, code, title, instructor, credits, semester, description } = body;

    if (!userId || !code || !title || !instructor || !credits || !semester) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // First create the course
    const newCourse = await db.insert(courses).values({
      id: code.toLowerCase().replace(/\s+/g, '-'),
      code,
      title,
      instructor,
      credits: parseInt(credits),
      semester,
      description: description || "",
      createdAt: new Date(),
    });

    // Then enroll the user in the course
    const newEnrollment = await db.insert(userCourses).values({
      id: `enrollment-${userId}-${code.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      userId,
      courseId: code.toLowerCase().replace(/\s+/g, '-'),
      progress: 0,
      enrolledAt: new Date(),
    });

    return NextResponse.json({ success: true, course: newCourse, enrollment: newEnrollment });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
