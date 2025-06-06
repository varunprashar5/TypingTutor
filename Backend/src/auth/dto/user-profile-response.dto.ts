export class UserStatsDto {
  totalSessions: number;
  totalPracticeTime: number; // in seconds
  averageWPM: number;
  bestWPM: number;
  averageAccuracy: number;
  totalWordsTyped: number;
  currentStreak: number; // days
  longestStreak: number; // days
}

export class UserProfileResponseDto {
  id: string;
  username: string;
  email: string;
  fullName: string | null;
  bio: string | null;
  avatarUrl: string | null;

  // Settings
  experienceLevel: string;
  preferredDifficulty: string;
  preferredKeyboardRow: string;
  soundEnabled: boolean;
  keyboardLayout: string;
  targetWPM: number;
  dailyGoalMinutes: number;
  theme: string;

  // Stats
  stats: UserStatsDto;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
