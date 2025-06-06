import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedLeaderboard() {
  try {
    console.log('Seeding leaderboard data...');

    // Get all users
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users`);

    // Get all typing sessions
    const sessions = await prisma.typingSession.findMany({
      where: {
        userId: {
          not: null,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log(`Found ${sessions.length} sessions`);

    // Group sessions by user and period
    const userSessionsByPeriod = new Map<string, Map<string, any[]>>();

    for (const session of sessions) {
      if (!session.userId) continue;

      if (!userSessionsByPeriod.has(session.userId)) {
        userSessionsByPeriod.set(session.userId, new Map());
      }

      const userPeriods = userSessionsByPeriod.get(session.userId)!;

      // Process for each period
      const periods = ['daily', 'weekly', 'monthly', 'all_time'];
      for (const period of periods) {
        const periodDate = getPeriodDate(period, session.createdAt);
        const key = `${period}-${periodDate.toISOString()}`;

        if (!userPeriods.has(key)) {
          userPeriods.set(key, []);
        }
        userPeriods.get(key)!.push(session);
      }
    }

    // Create leaderboard entries
    let entriesCreated = 0;
    for (const [userId, periodMap] of userSessionsByPeriod) {
      for (const [periodKey, sessions] of periodMap) {
        const [period, periodDateStr] = periodKey.split('-');
        const periodDate = new Date(periodDateStr);

        // Calculate best values
        const bestWpmSession = sessions.reduce((best, session) => 
          session.wpm > best.wpm ? session : best
        );
        const bestAccuracySession = sessions.reduce((best, session) => 
          session.accuracy > best.accuracy ? session : best
        );

        const overallScore = (bestWpmSession.wpm * 0.6) + (bestAccuracySession.accuracy * 0.4);

        // Check if entry already exists
        const existing = await prisma.leaderboardEntry.findFirst({
          where: {
            userId,
            period,
            periodDate,
          },
        });

        if (!existing) {
          await prisma.leaderboardEntry.create({
            data: {
              userId,
              period,
              periodDate,
              bestWpm: bestWpmSession.wpm,
              bestAccuracy: bestAccuracySession.accuracy,
              overallScore,
              sessionCount: sessions.length,
              bestWpmSessionId: bestWpmSession.id,
              bestAccuracySessionId: bestAccuracySession.id,
            },
          });
          entriesCreated++;
        }
      }
    }

    console.log(`Created ${entriesCreated} leaderboard entries`);
    console.log('Leaderboard seeding completed!');
  } catch (error) {
    console.error('Error seeding leaderboard:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function getPeriodDate(period: string, date: Date): Date {
  const d = new Date(date);

  switch (period) {
    case 'daily':
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());

    case 'weekly':
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay() + 1);
      return new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());

    case 'monthly':
      return new Date(d.getFullYear(), d.getMonth(), 1);

    case 'all_time':
      return new Date(2000, 0, 1);

    default:
      return d;
  }
}

seedLeaderboard().catch((e) => {
  console.error(e);
  process.exit(1);
});