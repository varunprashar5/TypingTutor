import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryTypingSessionDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    description: 'Filter by session type',
    example: 'practice',
    enum: ['practice', 'test', 'game'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['practice', 'test', 'game'])
  sessionType?: string;

  @ApiProperty({
    description: 'Filter by difficulty',
    example: 'intermediate',
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced', 'expert'])
  difficulty?: string;
}
