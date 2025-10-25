import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { studySessions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get user's study sessions
    const sessions = await db
      .select()
      .from(studySessions)
      .where(eq(studySessions.userId, userId))
      .orderBy(studySessions.createdAt);

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching study sessions:", error);
    return NextResponse.json({ error: "Failed to fetch study sessions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, courseId, subject, duration, notes } = body;

    if (!userId || !courseId || !subject) {
      return NextResponse.json({ error: "User ID, course ID, and subject are required" }, { status: 400 });
    }

    const newSession = await db.insert(studySessions).values({
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      courseId,
      topic: subject, // Map subject to topic
      duration: duration || 0,
      notes: notes || "",
      createdAt: new Date(),
    }).returning();

    return NextResponse.json({ success: true, session: newSession[0] });
  } catch (error) {
    console.error("Error creating study session:", error);
    return NextResponse.json({ error: "Failed to create study session" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, duration, notes } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const updatedSession = await db
      .update(studySessions)
      .set({ 
        duration: duration || 0,
        notes: notes || ""
      })
      .where(eq(studySessions.id, sessionId))
      .returning();

    if (updatedSession.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, session: updatedSession[0] });
  } catch (error) {
    console.error("Error updating study session:", error);
    return NextResponse.json({ error: "Failed to update study session" }, { status: 500 });
  }
}
