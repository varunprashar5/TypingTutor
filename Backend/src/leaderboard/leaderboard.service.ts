import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  LeaderboardPeriod,
  LeaderboardCategory,
  LeaderboardQueryDto,
} from './dto/leaderboard-query.dto';
import {
  LeaderboardResponseDto,
  LeaderboardEntryDto,
  UserRankSummaryDto,
} from './dto/leaderboard-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(
    query: LeaderboardQueryDto,
    currentUserId?: string,
  ): Promise<LeaderboardResponseDto> {
    const { period, category, page, limit, search } = query;
    const skip = (page - 1) * limit;

    // Get the period date range
    const { startDate, endDate } = this.getPeriodDateRange(period);

    // Build where clause
    const whereClause: Prisma.LeaderboardEntryWhereInput = {
      period,
      periodDate: {
        gte: startDate,
        lte: endDate,
      },
      ...(search && {
        user: {
          username: {
            contains: search,
          },
        },
      }),
    };

    // Determine order by field based on category
    const orderByField = this.getOrderByField(category);

    // Get total count
    const totalUsers = await this.prisma.leaderboardEntry.count({
      where: whereClause,
    });

    // Get leaderboard entries
    const entries = await this.prisma.leaderboardEntry.findMany({
      where: whereClause,
      orderBy: {
        [orderByField]: 'desc',
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // Get all entries for ranking if current user is logged in
    let currentUserEntry: LeaderboardEntryDto | undefined;
    if (currentUserId) {
      const currentUserData = await this.prisma.leaderboardEntry.findFirst({
        where: {
          ...whereClause,
          userId: currentUserId,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      if (currentUserData) {
        // Get rank
        const betterCount = await this.prisma.leaderboardEntry.count({
          where: {
            ...whereClause,
            [orderByField]: {
              gt: currentUserData[orderByField],
            },
          },
        });

        currentUserEntry = {
          rank: betterCount + 1,
          userId: currentUserData.userId,
          username: currentUserData.user.username,
          score: this.getScoreByCategory(currentUserData, category),
          bestWpm: currentUserData.bestWpm,
          bestAccuracy: currentUserData.bestAccuracy,
          sessionCount: currentUserData.sessionCount,
          isCurrentUser: true,
        };
      }
    }

    // Transform entries with ranks
    const leaderboardEntries: LeaderboardEntryDto[] = entries.map(
      (entry, index) => ({
        rank: skip + index + 1,
        userId: entry.userId,
        username: entry.user.username,
        score: this.getScoreByCategory(entry, category),
        bestWpm: entry.bestWpm,
        bestAccuracy: entry.bestAccuracy,
        sessionCount: entry.sessionCount,
        isCurrentUser: entry.userId === currentUserId,
      }),
    );

    return {
      entries: leaderboardEntries,
      currentUserEntry:
        currentUserEntry &&
        !leaderboardEntries.find((e) => e.userId === currentUserId)
          ? currentUserEntry
          : undefined,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      period,
      category,
    };
  }

  async getUserRankSummary(userId: string): Promise<UserRankSummaryDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const categories: LeaderboardCategory[] = [
      LeaderboardCategory.OVERALL,
      LeaderboardCategory.SPEED,
      LeaderboardCategory.ACCURACY,
      LeaderboardCategory.ACTIVITY,
    ];

    const ranks = {} as {
      overall: { rank: number; score: number; percentile: number };
      speed: { rank: number; score: number; percentile: number };
      accuracy: { rank: number; score: number; percentile: number };
      activity: { rank: number; score: number; percentile: number };
    };

    for (const category of categories) {
      const orderByField = this.getOrderByField(category);
      const { startDate, endDate } = this.getPeriodDateRange(
        LeaderboardPeriod.ALL_TIME,
      );

      const userEntry = await this.prisma.leaderboardEntry.findFirst({
        where: {
          userId,
          period: LeaderboardPeriod.ALL_TIME,
          periodDate: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      if (userEntry) {
        const betterCount = await this.prisma.leaderboardEntry.count({
          where: {
            period: LeaderboardPeriod.ALL_TIME,
            periodDate: {
              gte: startDate,
              lte: endDate,
            },
            [orderByField]: {
              gt: userEntry[orderByField],
            },
          },
        });

        const totalCount = await this.prisma.leaderboardEntry.count({
          where: {
            period: LeaderboardPeriod.ALL_TIME,
            periodDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        });

        const rank = betterCount + 1;
        const percentile = ((totalCount - rank + 1) / totalCount) * 100;

        ranks[category] = {
          rank,
          score: this.getScoreByCategory(userEntry, category),
          percentile: Math.round(percentile),
        };
      } else {
        ranks[category] = {
          rank: 0,
          score: 0,
          percentile: 0,
        };
      }
    }

    return {
      userId: user.id,
      username: user.username,
      ranks,
    };
  }

  async updateLeaderboardEntry(
    userId: string,
    sessionId: string,
  ): Promise<void> {
    const session = await this.prisma.typingSession.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session || session.userId !== userId) {
      throw new Error('Session not found');
    }

    const periods = [
      LeaderboardPeriod.DAILY,
      LeaderboardPeriod.WEEKLY,
      LeaderboardPeriod.MONTHLY,
      LeaderboardPeriod.ALL_TIME,
    ];

    for (const period of periods) {
      const { startDate, endDate } = this.getPeriodDateRange(period);
      const periodDate = this.getPeriodDate(period, session.createdAt);

      // Get or create leaderboard entry
      let entry = await this.prisma.leaderboardEntry.findFirst({
        where: {
          userId,
          period,
          periodDate,
        },
      });

      if (!entry) {
        entry = await this.prisma.leaderboardEntry.create({
          data: {
            userId,
            period,
            periodDate,
            bestWpm: 0,
            bestAccuracy: 0,
            overallScore: 0,
            sessionCount: 0,
          },
        });
      }

      // Get all sessions for this period
      const sessions = await this.prisma.typingSession.findMany({
        where: {
          userId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: [{ wpm: 'desc' }, { accuracy: 'desc' }],
      });

      // Update entry with best values
      const bestWpmSession = sessions[0];
      const bestAccuracySession = sessions.sort(
        (a, b) => b.accuracy - a.accuracy,
      )[0];
      const sessionCount = sessions.length;

      // Calculate overall score (60% WPM, 40% accuracy)
      const overallScore =
        bestWpmSession.wpm * 0.6 + bestAccuracySession.accuracy * 0.4;

      await this.prisma.leaderboardEntry.update({
        where: { id: entry.id },
        data: {
          bestWpm: bestWpmSession.wpm,
          bestAccuracy: bestAccuracySession.accuracy,
          overallScore,
          sessionCount,
          bestWpmSessionId: bestWpmSession.id,
          bestAccuracySessionId: bestAccuracySession.id,
        },
      });
    }
  }

  private getPeriodDateRange(period: LeaderboardPeriod): {
    startDate: Date;
    endDate: Date;
  } {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
      case LeaderboardPeriod.DAILY:
        return {
          startDate: today,
          endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1),
        };

      case LeaderboardPeriod.WEEKLY: {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // Sunday
        weekEnd.setHours(23, 59, 59, 999);
        return { startDate: weekStart, endDate: weekEnd };
      }

      case LeaderboardPeriod.MONTHLY: {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        monthEnd.setHours(23, 59, 59, 999);
        return { startDate: monthStart, endDate: monthEnd };
      }

      case LeaderboardPeriod.ALL_TIME:
        return {
          startDate: new Date(2000, 0, 1),
          endDate: new Date(2100, 0, 1),
        };
    }
  }

  private getPeriodDate(period: LeaderboardPeriod, date: Date): Date {
    const d = new Date(date);

    switch (period) {
      case LeaderboardPeriod.DAILY:
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());

      case LeaderboardPeriod.WEEKLY: {
        const weekStart = new Date(d);
        weekStart.setDate(d.getDate() - d.getDay() + 1);
        return new Date(
          weekStart.getFullYear(),
          weekStart.getMonth(),
          weekStart.getDate(),
        );
      }

      case LeaderboardPeriod.MONTHLY:
        return new Date(d.getFullYear(), d.getMonth(), 1);

      case LeaderboardPeriod.ALL_TIME:
        return new Date(2000, 0, 1);
    }
  }

  private getOrderByField(category: LeaderboardCategory): string {
    switch (category) {
      case LeaderboardCategory.OVERALL:
        return 'overallScore';
      case LeaderboardCategory.SPEED:
        return 'bestWpm';
      case LeaderboardCategory.ACCURACY:
        return 'bestAccuracy';
      case LeaderboardCategory.ACTIVITY:
        return 'sessionCount';
    }
  }

  private getScoreByCategory(
    entry: { overallScore: number; bestWpm: number; bestAccuracy: number; sessionCount: number },
    category: LeaderboardCategory,
  ): number {
    switch (category) {
      case LeaderboardCategory.OVERALL:
        return Math.round(entry.overallScore);
      case LeaderboardCategory.SPEED:
        return entry.bestWpm;
      case LeaderboardCategory.ACCURACY:
        return Math.round(entry.bestAccuracy * 10) / 10;
      case LeaderboardCategory.ACTIVITY:
        return entry.sessionCount;
    }
  }
}
