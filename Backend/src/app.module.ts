import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypingSessionsModule } from './typing-sessions/typing-sessions.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SampleTextsModule } from './sample-texts/sample-texts.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    // Configuration module for environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Prisma module for database access
    PrismaModule,

    // Feature modules
    TypingSessionsModule,

    AuthModule,

    SampleTextsModule,

    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
