import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiQuestions } from "@/lib/schema";
import { eq, like, or, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const course = searchParams.get("course");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Build conditions array
    const conditions = [eq(aiQuestions.userId, userId)];

    // Add search filters
    if (search) {
      const searchCondition = or(
        like(aiQuestions.question, `%${search}%`),
        like(aiQuestions.answer, `%${search}%`),
        like(aiQuestions.category, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    if (course && course !== "all") {
      conditions.push(eq(aiQuestions.course, course));
    }

    const query = db.select().from(aiQuestions).where(and(...conditions));

    const questions = await query.orderBy(aiQuestions.createdAt);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error fetching AI questions:", error);
    return NextResponse.json({ error: "Failed to fetch AI questions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId, 
      question, 
      answer, 
      course, 
      difficulty, 
      category, 
      isBookmarked 
    } = body;

    if (!userId || !question || !answer || !course) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newQuestion = await db.insert(aiQuestions).values({
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      question,
      answer,
      course,
      difficulty: difficulty || "medium",
      category: category || "General",
      isBookmarked: isBookmarked || false,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, question: newQuestion });
  } catch (error) {
    console.error("Error creating AI question:", error);
    return NextResponse.json({ error: "Failed to create AI question" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, isBookmarked } = body;

    if (!questionId) {
      return NextResponse.json({ error: "Question ID is required" }, { status: 400 });
    }

    const updatedQuestion = await db
      .update(aiQuestions)
      .set({ 
        isBookmarked: isBookmarked || false,
        updatedAt: new Date()
      })
      .where(eq(aiQuestions.id, questionId))
      .returning();

    return NextResponse.json({ success: true, question: updatedQuestion[0] });
  } catch (error) {
    console.error("Error updating AI question:", error);
    return NextResponse.json({ error: "Failed to update AI question" }, { status: 500 });
  }
}
