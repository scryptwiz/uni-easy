import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { assignments, courses } from "@/lib/schema";
import { eq, and, gte } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    // Build conditions array
    const conditions = [];
    
    if (courseId) {
      conditions.push(eq(assignments.courseId, courseId));
    }

    const query = db
      .select({
        id: assignments.id,
        title: assignments.title,
        description: assignments.description,
        dueDate: assignments.dueDate,
        priority: assignments.priority,
        type: assignments.type,
        courseId: assignments.courseId,
        course: {
          code: courses.code,
          title: courses.title,
        }
      })
      .from(assignments)
      .innerJoin(courses, eq(assignments.courseId, courses.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const assignmentsData = await query;

    // Calculate days remaining for each assignment
    const assignmentsWithDaysRemaining = assignmentsData.map(assignment => {
      const dueDate = new Date(assignment.dueDate);
      const today = new Date();
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return {
        ...assignment,
        daysRemaining: Math.max(0, daysRemaining)
      };
    });

    return NextResponse.json({ assignments: assignmentsWithDaysRemaining });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, dueDate, priority, type, courseId } = body;

    if (!title || !dueDate || !courseId) {
      return NextResponse.json({ error: "Title, due date, and course ID are required" }, { status: 400 });
    }

    const newAssignment = await db.insert(assignments).values({
      id: `assignment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      description: description || "",
      dueDate: new Date(dueDate),
      priority: priority || "medium",
      type: type || "assignment",
      courseId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, assignment: newAssignment });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 });
  }
}
