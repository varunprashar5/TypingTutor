import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardQueryDto } from './dto/leaderboard-query.dto';
import {
  LeaderboardResponseDto,
  UserRankSummaryDto,
} from './dto/leaderboard-response.dto';

@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Get leaderboard' })
  @ApiResponse({
    status: 200,
    description: 'Returns leaderboard entries',
    type: LeaderboardResponseDto,
  })
  async getLeaderboard(
    @Query() query: LeaderboardQueryDto,
    @Request() req: any,
  ): Promise<LeaderboardResponseDto> {
    const currentUserId = req.user?.id;
    return this.leaderboardService.getLeaderboard(query, currentUserId);
  }

  @Get('user-summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user rank summary' })
  @ApiResponse({
    status: 200,
    description: 'Returns user rank summary',
    type: UserRankSummaryDto,
  })
  async getUserRankSummary(@Request() req: any): Promise<UserRankSummaryDto> {
    return this.leaderboardService.getUserRankSummary(req.user.id);
  }
}
