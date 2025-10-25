import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { studyGoals } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user's study goals
    const goals = await db
      .select()
      .from(studyGoals)
      .where(eq(studyGoals.userId, userId))
      .limit(1);

    if (goals.length === 0) {
      // Return default goals if none exist
      return NextResponse.json({ 
        goals: { 
          dailyHours: 4,
          weeklyHours: 20, 
          streakGoal: 30,
          currentStreak: 0
        } 
      });
    }

    return NextResponse.json({ goals: goals[0] });
  } catch (error) {
    console.error("Error fetching study goals:", error);
    return NextResponse.json({ error: "Failed to fetch study goals" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, dailyHours, weeklyHours, streakGoal } = body;

    if (!userId || !dailyHours || !weeklyHours || !streakGoal) {
      return NextResponse.json({ error: "User ID, daily hours, weekly hours, and streak goal are required" }, { status: 400 });
    }

    // Check if goals already exist for this user
    const existingGoals = await db
      .select()
      .from(studyGoals)
      .where(eq(studyGoals.userId, userId))
      .limit(1);

    let result;
    if (existingGoals.length > 0) {
      // Update existing goals
      result = await db
        .update(studyGoals)
        .set({ 
          dailyHours,
          weeklyHours,
          streakGoal,
          updatedAt: new Date()
        })
        .where(eq(studyGoals.userId, userId))
        .returning();
    } else {
      // Create new goals
      result = await db
        .insert(studyGoals)
        .values({
          id: `goals-${userId}-${Date.now()}`,
          userId,
          dailyHours,
          weeklyHours,
          streakGoal,
          currentStreak: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
    }

    return NextResponse.json({ goals: result[0] });
  } catch (error) {
    console.error("Error saving study goals:", error);
    return NextResponse.json({ error: "Failed to save study goals" }, { status: 500 });
  }
}
