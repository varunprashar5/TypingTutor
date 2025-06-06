import { Module } from '@nestjs/common';
import { SampleTextsController } from './sample-texts.controller';
import { SampleTextsService } from './sample-texts.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SampleTextsController],
  providers: [SampleTextsService],
  exports: [SampleTextsService],
})
export class SampleTextsModule {}
