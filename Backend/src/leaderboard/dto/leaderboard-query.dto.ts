import { IsEnum, IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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

export class LeaderboardQueryDto {
  @IsEnum(LeaderboardPeriod)
  period: LeaderboardPeriod = LeaderboardPeriod.DAILY;

  @IsEnum(LeaderboardCategory)
  category: LeaderboardCategory = LeaderboardCategory.OVERALL;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;

  @IsOptional()
  @IsString()
  search?: string;
}
