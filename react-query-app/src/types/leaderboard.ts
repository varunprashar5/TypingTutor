export enum LeaderboardPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ALL_TIME = 'all_time',
}

export enum LeaderboardCategory {
  OVERALL = 'overall',
  SPEED = 'speed',
  ACCURACY = 'accuracy',
  ACTIVITY = 'activity',
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  bestWpm: number;
  bestAccuracy: number;
  sessionCount: number;
  isCurrentUser: boolean;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  currentUserEntry?: LeaderboardEntry;
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  period: string;
  category: string;
}

export interface UserRankSummary {
  userId: string;
  username: string;
  ranks: {
    overall: RankInfo;
    speed: RankInfo;
    accuracy: RankInfo;
    activity: RankInfo;
  };
}

export interface RankInfo {
  rank: number;
  score: number;
  percentile: number;
}

export interface LeaderboardFilters {
  period: LeaderboardPeriod;
  category: LeaderboardCategory;
  page: number;
  search?: string;
}