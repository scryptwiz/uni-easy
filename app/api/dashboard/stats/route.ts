import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userCourses, assignments, courses, studySessions } from "@/lib/schema";
import { eq, and, gte, lte, count, sum } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get active courses count
    const activeCoursesResult = await db
      .select({ count: count() })
      .from(userCourses)
      .where(eq(userCourses.userId, userId));

    const activeCourses = activeCoursesResult[0]?.count || 0;

    // Get assignments due this week
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    const assignmentsDueResult = await db
      .select({ count: count() })
      .from(assignments)
      .innerJoin(userCourses, eq(assignments.courseId, userCourses.courseId))
      .where(
        and(
          eq(userCourses.userId, userId),
          gte(assignments.dueDate, new Date()),
          lte(assignments.dueDate, oneWeekFromNow)
        )
      );

    const assignmentsDue = assignmentsDueResult[0]?.count || 0;

    // Get study hours this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const studyHoursResult = await db
      .select({ totalHours: sum(studySessions.duration) })
      .from(studySessions)
      .where(
        and(
          eq(studySessions.userId, userId),
          gte(studySessions.createdAt, oneWeekAgo)
        )
      );

    const studyHours = studyHoursResult[0]?.totalHours || 0;

    // Get achievements count (placeholder - you can implement this based on your logic)
    const achievements = 8; // This could be calculated based on completed courses, study streaks, etc.

    return NextResponse.json({
      activeCourses,
      assignmentsDue,
      studyHours: Math.round((studyHours as number) / 60), // Convert minutes to hours
      achievements
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
