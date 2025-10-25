import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { studySessions } from "@/lib/schema";
import { eq, gte, and, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get this week's date range
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    // Get this month's date range
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Today's study time
    const todayStats = await db
      .select({
        totalMinutes: sql<number>`COALESCE(SUM(${studySessions.duration}), 0)`,
        sessionCount: sql<number>`COUNT(*)`
      })
      .from(studySessions)
      .where(
        and(
          eq(studySessions.userId, userId),
          gte(studySessions.createdAt, today),
          sql`${studySessions.createdAt} < ${tomorrow}`
        )
      );

    // This week's study time
    const weekStats = await db
      .select({
        totalMinutes: sql<number>`COALESCE(SUM(${studySessions.duration}), 0)`,
        sessionCount: sql<number>`COUNT(*)`
      })
      .from(studySessions)
      .where(
        and(
          eq(studySessions.userId, userId),
          gte(studySessions.createdAt, startOfWeek),
          sql`${studySessions.createdAt} < ${endOfWeek}`
        )
      );

    // This month's study time
    const monthStats = await db
      .select({
        totalMinutes: sql<number>`COALESCE(SUM(${studySessions.duration}), 0)`,
        sessionCount: sql<number>`COUNT(*)`
      })
      .from(studySessions)
      .where(
        and(
          eq(studySessions.userId, userId),
          gte(studySessions.createdAt, startOfMonth),
          sql`${studySessions.createdAt} < ${endOfMonth}`
        )
      );

    // Recent sessions (last 7 days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const recentSessions = await db
      .select({
        id: studySessions.id,
        topic: studySessions.topic,
        duration: studySessions.duration,
        createdAt: studySessions.createdAt
      })
      .from(studySessions)
      .where(
        and(
          eq(studySessions.userId, userId),
          gte(studySessions.createdAt, sevenDaysAgo)
        )
      )
      .orderBy(sql`${studySessions.createdAt} DESC`)
      .limit(10);

    // Calculate streak (consecutive days with study sessions)
    const streakQuery = await db
      .select({
        studyDate: sql<string>`DATE(${studySessions.createdAt}) as study_date`
      })
      .from(studySessions)
      .where(eq(studySessions.userId, userId))
      .groupBy(sql`DATE(${studySessions.createdAt})`)
      .orderBy(sql`DATE(${studySessions.createdAt}) DESC`);

    // Calculate streak
    let streak = 0;
    const todayStr = today.toISOString().split('T')[0];
    let currentDate = new Date(today);
    
    for (const session of streakQuery) {
      const sessionDate = new Date(session.studyDate).toISOString().split('T')[0];
      const expectedDate = currentDate.toISOString().split('T')[0];
      
      if (sessionDate === expectedDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (sessionDate < expectedDate) {
        break;
      }
    }

    const stats = {
      today: {
        totalMinutes: todayStats[0]?.totalMinutes || 0,
        sessionCount: todayStats[0]?.sessionCount || 0,
        hours: Math.round((todayStats[0]?.totalMinutes || 0) / 60 * 10) / 10
      },
      week: {
        totalMinutes: weekStats[0]?.totalMinutes || 0,
        sessionCount: weekStats[0]?.sessionCount || 0,
        hours: Math.round((weekStats[0]?.totalMinutes || 0) / 60 * 10) / 10
      },
      month: {
        totalMinutes: monthStats[0]?.totalMinutes || 0,
        sessionCount: monthStats[0]?.sessionCount || 0,
        hours: Math.round((monthStats[0]?.totalMinutes || 0) / 60 * 10) / 10
      },
      streak,
      recentSessions: recentSessions.map(session => ({
        id: session.id,
        topic: session.topic,
        duration: session.duration,
        hours: Math.round(session.duration / 60 * 10) / 10,
        createdAt: session.createdAt
      }))
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching study hours stats:", error);
    return NextResponse.json({ error: "Failed to fetch study hours stats" }, { status: 500 });
  }
}
