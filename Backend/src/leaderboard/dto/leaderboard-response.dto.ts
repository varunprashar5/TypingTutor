export class LeaderboardEntryDto {
  rank: number;
  userId: string;
  username: string;
  score: number;
  bestWpm: number;
  bestAccuracy: number;
  sessionCount: number;
  isCurrentUser: boolean;
}

export class UserRankSummaryDto {
  userId: string;
  username: string;
  ranks: {
    overall: { rank: number; score: number; percentile: number };
    speed: { rank: number; score: number; percentile: number };
    accuracy: { rank: number; score: number; percentile: number };
    activity: { rank: number; score: number; percentile: number };
  };
}

export class LeaderboardResponseDto {
  entries: LeaderboardEntryDto[];
  currentUserEntry?: LeaderboardEntryDto;
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  period: string;
  category: string;
}
