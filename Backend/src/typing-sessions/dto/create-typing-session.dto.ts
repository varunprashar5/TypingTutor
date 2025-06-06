import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsIn,
} from 'class-validator';

export class CreateTypingSessionDto {
  @ApiProperty({
    description: 'The text that was typed',
    example: 'The quick brown fox jumps over the lazy dog',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The user input text',
    example: 'The quick brown fox jumps over the lazy dog',
  })
  @IsString()
  userInput: string;

  @ApiProperty({
    description: 'Words per minute',
    example: 45,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  wpm: number;

  @ApiProperty({
    description: 'Accuracy percentage',
    example: 95.5,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  accuracy: number;

  @ApiProperty({
    description: 'Duration in seconds',
    example: 60,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({
    description: 'Total number of characters',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  totalCharacters: number;

  @ApiProperty({
    description: 'Number of correct characters',
    example: 95,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  correctCharacters: number;

  @ApiProperty({
    description: 'Number of incorrect characters',
    example: 5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  incorrectCharacters: number;

  @ApiProperty({
    description: 'Type of typing session',
    example: 'practice',
    enum: ['practice', 'test', 'game'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['practice', 'test', 'game'])
  sessionType?: string;

  @ApiProperty({
    description: 'Difficulty level',
    example: 'intermediate',
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced', 'expert'])
  difficulty?: string;

  @ApiProperty({
    description: 'ID of the sample text used',
    example: 'clxyz123abc',
    required: false,
  })
  @IsOptional()
  @IsString()
  sampleTextId?: string;
}
