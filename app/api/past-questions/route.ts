import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pastQuestions } from "@/lib/schema";
import { eq, like, or, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const course = searchParams.get("course");
    const type = searchParams.get("type");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Build conditions array
    const conditions = [];

    // Add search filters
    if (search) {
      const searchCondition = or(
        like(pastQuestions.title, `%${search}%`),
        like(pastQuestions.description, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    if (course && course !== "all") {
      conditions.push(eq(pastQuestions.courseId, course));
    }

    if (type && type !== "all") {
      // Note: The original table doesn't have a type field, so we'll skip this filter
      // conditions.push(eq(pastQuestions.type, type));
    }

    const query = db
      .select()
      .from(pastQuestions)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(pastQuestions.createdAt);

    const questions = await query;

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error fetching past questions:", error);
    return NextResponse.json({ error: "Failed to fetch past questions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      courseCode, 
      course, 
      year, 
      semester, 
      type, 
      difficulty, 
      pages, 
      description, 
      tags, 
      fileSize,
      uploadedBy 
    } = body;

    if (!title || !courseCode || !course || !year || !semester || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newQuestion = await db.insert(pastQuestions).values({
      id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      courseId: courseCode, // Map courseCode to courseId
      uploadedBy: uploadedBy || "Unknown",
      description: description || "",
      fileUrl: `https://example.com/${title.replace(/\s+/g, '-').toLowerCase()}.pdf`,
      fileSize: fileSize || "0 MB",
      academicSession: `${semester} ${year}`,
      year,
      downloads: 0,
      rating: "0.00",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, question: newQuestion });
  } catch (error) {
    console.error("Error creating past question:", error);
    return NextResponse.json({ error: "Failed to create past question" }, { status: 500 });
  }
}
