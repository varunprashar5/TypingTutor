import { Module, forwardRef } from '@nestjs/common';
import { TypingSessionsController } from './typing-sessions.controller';
import { TypingSessionsService } from './typing-sessions.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';

@Module({
  imports: [PrismaModule, forwardRef(() => LeaderboardModule)],
  controllers: [TypingSessionsController],
  providers: [TypingSessionsService],
  exports: [TypingSessionsService],
})
export class TypingSessionsModule {}
