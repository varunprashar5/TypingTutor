import { ApiProperty } from '@nestjs/swagger';

export class TypingStatsResponseDto {
  @ApiProperty({
    description: 'Total number of typing sessions',
    example: 42,
  })
  totalSessions: number;

  @ApiProperty({
    description: 'Average words per minute across all sessions',
    example: 65.5,
  })
  averageWpm: number;

  @ApiProperty({
    description: 'Average accuracy percentage across all sessions',
    example: 92.3,
  })
  averageAccuracy: number;

  @ApiProperty({
    description: 'Best words per minute achieved',
    example: 85,
  })
  bestWpm: number;

  @ApiProperty({
    description: 'Total practice time in seconds',
    example: 3600,
  })
  totalPracticeTime: number;

  @ApiProperty({
    description: 'Number of consecutive days with typing sessions',
    example: 7,
  })
  streakDays: number;
}
