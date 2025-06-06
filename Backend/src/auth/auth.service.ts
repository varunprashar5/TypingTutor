import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import {
  UserProfileResponseDto,
  UserStatsDto,
} from './dto/user-profile-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // Generate JWT token
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Find user by username or email
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email: username }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async validateUser(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async validateGoogleUser(googleUser: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  }) {
    // Check if user already exists with this Google ID
    let user = await this.prisma.user.findUnique({
      where: { googleId: googleUser.googleId },
      select: {
        id: true,
        username: true,
        email: true,
        googleId: true,
      },
    });

    if (!user) {
      // Check if user exists with this email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (existingUser) {
        // Link Google account to existing user
        user = await this.prisma.user.update({
          where: { email: googleUser.email },
          data: {
            googleId: googleUser.googleId,
            avatarUrl: googleUser.picture,
            fullName: `${googleUser.firstName} ${googleUser.lastName}`,
          },
          select: {
            id: true,
            username: true,
            email: true,
            googleId: true,
          },
        });
      } else {
        // Create new user
        const username = await this.generateUniqueUsername(googleUser.email);
        user = await this.prisma.user.create({
          data: {
            username,
            email: googleUser.email,
            googleId: googleUser.googleId,
            fullName: `${googleUser.firstName} ${googleUser.lastName}`,
            avatarUrl: googleUser.picture,
            // No password needed for Google OAuth users
          },
          select: {
            id: true,
            username: true,
            email: true,
            googleId: true,
          },
        });
      }
    }

    // Generate JWT token
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  private async generateUniqueUsername(email: string): Promise<string> {
    const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    let username = baseUsername;
    let counter = 1;

    while (await this.prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  }

  async getUserProfile(userId: string): Promise<UserProfileResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        typingSessions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Calculate user statistics
    const stats = await this.calculateUserStats(userId);

    // Remove password from response
    const { password, typingSessions, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      stats,
    } as UserProfileResponseDto;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateProfileDto,
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        bio: true,
        avatarUrl: true,
      },
    });

    return user;
  }

  async getUserSettings(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        experienceLevel: true,
        preferredDifficulty: true,
        preferredKeyboardRow: true,
        soundEnabled: true,
        keyboardLayout: true,
        targetWPM: true,
        dailyGoalMinutes: true,
        theme: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async updateSettings(userId: string, updateSettingsDto: UpdateSettingsDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateSettingsDto,
      select: {
        experienceLevel: true,
        preferredDifficulty: true,
        preferredKeyboardRow: true,
        soundEnabled: true,
        keyboardLayout: true,
        targetWPM: true,
        dailyGoalMinutes: true,
        theme: true,
      },
    });

    return user;
  }

  private async calculateUserStats(userId: string): Promise<UserStatsDto> {
    const sessions = await this.prisma.typingSession.findMany({
      where: { userId },
    });

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalPracticeTime: 0,
        averageWPM: 0,
        bestWPM: 0,
        averageAccuracy: 0,
        totalWordsTyped: 0,
        currentStreak: 0,
        longestStreak: 0,
      };
    }

    const totalSessions = sessions.length;
    const totalPracticeTime = sessions.reduce(
      (sum, session) => sum + session.duration,
      0,
    );
    const totalWPM = sessions.reduce((sum, session) => sum + session.wpm, 0);
    const averageWPM = Math.round(totalWPM / totalSessions);
    const bestWPM = Math.max(...sessions.map((session) => session.wpm));
    const totalAccuracy = sessions.reduce(
      (sum, session) => sum + session.accuracy,
      0,
    );
    const averageAccuracy =
      Math.round((totalAccuracy / totalSessions) * 100) / 100;
    const totalWordsTyped = sessions.reduce(
      (sum, session) => sum + session.totalCharacters,
      0,
    );

    // Calculate streaks (simplified - just consecutive days)
    const currentStreak = await this.calculateCurrentStreak(userId);
    const longestStreak = await this.calculateLongestStreak(userId);

    return {
      totalSessions,
      totalPracticeTime,
      averageWPM,
      bestWPM,
      averageAccuracy,
      totalWordsTyped,
      currentStreak,
      longestStreak,
    };
  }

  private async calculateCurrentStreak(userId: string): Promise<number> {
    // Get sessions ordered by date
    const sessions = await this.prisma.typingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    });

    if (sessions.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if there's a session today
    const lastSession = new Date(sessions[0].createdAt);
    lastSession.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (today.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysDiff > 1) return 0; // Streak broken

    // Count consecutive days
    for (let i = 1; i < sessions.length; i++) {
      const currentDate = new Date(sessions[i - 1].createdAt);
      const previousDate = new Date(sessions[i].createdAt);
      currentDate.setHours(0, 0, 0, 0);
      previousDate.setHours(0, 0, 0, 0);

      const diff = Math.floor(
        (currentDate.getTime() - previousDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        break;
      }
    }

    return streak;
  }

  private async calculateLongestStreak(userId: string): Promise<number> {
    const sessions = await this.prisma.typingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: { createdAt: true },
    });

    if (sessions.length === 0) return 0;

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sessions.length; i++) {
      const previousDate = new Date(sessions[i - 1].createdAt);
      const currentDate = new Date(sessions[i].createdAt);
      previousDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      const diff = Math.floor(
        (currentDate.getTime() - previousDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (diff === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (diff > 1) {
        currentStreak = 1;
      }
    }

    return maxStreak;
  }
}
