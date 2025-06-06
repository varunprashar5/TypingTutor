import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTypingSessionDto } from './dto/create-typing-session.dto';
import { UpdateTypingSessionDto } from './dto/update-typing-session.dto';
import { QueryTypingSessionDto } from './dto/query-typing-session.dto';
import { PaginatedTypingSessionsDto } from './dto/paginated-response.dto';
import { TypingStatsResponseDto } from './dto/typing-stats-response.dto';
import { TypingSession, Prisma } from '@prisma/client';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Injectable()
export class TypingSessionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => LeaderboardService))
    private readonly leaderboardService: LeaderboardService,
  ) {}

  async create(
    createTypingSessionDto: CreateTypingSessionDto,
    userId: string,
  ): Promise<TypingSession> {
    const session = await this.prisma.typingSession.create({
      data: {
        ...createTypingSessionDto,
        userId,
      },
    });

    // Update leaderboard entries asynchronously
    if (userId) {
      this.leaderboardService
        .updateLeaderboardEntry(userId, session.id)
        .catch((err) => {
          console.error('Failed to update leaderboard entry:', err);
        });
    }

    return session;
  }

  async findAll(
    query: QueryTypingSessionDto,
    userId: string,
  ): Promise<PaginatedTypingSessionsDto> {
    console.log('TypingSessionsService.findAll called with:', {
      query,
      userId,
    });
    const { page = 1, limit = 10, sessionType, difficulty } = query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.TypingSessionWhereInput = {
      userId,
      ...(sessionType && { sessionType }),
      ...(difficulty && { difficulty }),
    };

    // Get total count
    const total = await this.prisma.typingSession.count({ where });

    // Get paginated results
    const sessions = await this.prisma.typingSession.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalPages = Math.ceil(total / limit);

    const result = {
      sessions,
      pagination: {
        total,
        currentPage: page,
        totalPages,
        limit,
      },
    };

    console.log('TypingSessionsService.findAll returning:', {
      sessionsCount: sessions.length,
      pagination: result.pagination,
    });

    return result;
  }

  async findOne(id: string): Promise<TypingSession> {
    const typingSession = await this.prisma.typingSession.findUnique({
      where: { id },
    });

    if (!typingSession) {
      throw new NotFoundException(`Typing session with ID ${id} not found`);
    }

    return typingSession;
  }

  async update(
    id: string,
    updateTypingSessionDto: UpdateTypingSessionDto,
  ): Promise<TypingSession> {
    try {
      return await this.prisma.typingSession.update({
        where: { id },
        data: updateTypingSessionDto,
      });
    } catch {
      throw new NotFoundException(`Typing session with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.typingSession.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Typing session with ID ${id} not found`);
    }
  }

  async getStats(userId: string): Promise<TypingStatsResponseDto> {
    const sessions = await this.prisma.typingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        averageWpm: 0,
        averageAccuracy: 0,
        bestWpm: 0,
        totalPracticeTime: 0,
        streakDays: 0,
      };
    }

    // Calculate basic stats
    const totalWpm = sessions.reduce((sum, session) => sum + session.wpm, 0);
    const totalAccuracy = sessions.reduce(
      (sum, session) => sum + session.accuracy,
      0,
    );
    const totalPracticeTime = sessions.reduce(
      (sum, session) => sum + session.duration,
      0,
    );
    const bestWpm = Math.max(...sessions.map((session) => session.wpm));

    // Calculate streak days
    const streakDays = this.calculateStreakDays(sessions);

    return {
      totalSessions: sessions.length,
      averageWpm: Math.round(totalWpm / sessions.length),
      averageAccuracy:
        Math.round((totalAccuracy / sessions.length) * 100) / 100,
      bestWpm,
      totalPracticeTime,
      streakDays,
    };
  }

  private calculateStreakDays(sessions: TypingSession[]): number {
    if (sessions.length === 0) return 0;

    // Sort sessions by date (most recent first)
    const sortedSessions = [...sessions].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    // Get unique dates (ignoring time)
    const uniqueDates = new Set<string>();
    sortedSessions.forEach((session) => {
      const dateStr = session.createdAt.toISOString().split('T')[0];
      uniqueDates.add(dateStr);
    });

    // Convert to sorted array of dates
    const dates = Array.from(uniqueDates).sort().reverse();

    // Check if most recent session is today or yesterday
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];

    if (dates[0] !== today && dates[0] !== yesterday) {
      return 0; // Streak is broken
    }

    // Count consecutive days
    let streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const previousDate = new Date(dates[i - 1]);
      const diffTime = previousDate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
      } else {
        break; // Streak is broken
      }
    }

    return streak;
  }
}
