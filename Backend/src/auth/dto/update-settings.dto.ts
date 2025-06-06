import {
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiPropertyOptional({
    description: 'User experience level',
    example: 'intermediate',
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  experienceLevel?: string;

  @ApiPropertyOptional({
    description: 'Preferred difficulty for practice sessions',
    example: 'intermediate',
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  preferredDifficulty?: string;

  @ApiPropertyOptional({
    description: 'Preferred keyboard row focus',
    example: 'all',
    enum: ['home', 'upper', 'lower', 'all'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['home', 'upper', 'lower', 'all'])
  preferredKeyboardRow?: string;

  @ApiPropertyOptional({
    description: 'Whether sound effects are enabled',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  soundEnabled?: boolean;

  @ApiPropertyOptional({
    description: 'Keyboard layout preference',
    example: 'qwerty',
    enum: ['qwerty', 'dvorak', 'colemak'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['qwerty', 'dvorak', 'colemak'])
  keyboardLayout?: string;

  @ApiPropertyOptional({
    description: 'Target words per minute goal',
    example: 60,
    minimum: 10,
    maximum: 200,
  })
  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(200)
  targetWPM?: number;

  @ApiPropertyOptional({
    description: 'Daily practice goal in minutes',
    example: 30,
    minimum: 5,
    maximum: 120,
  })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  dailyGoalMinutes?: number;

  @ApiPropertyOptional({
    description: 'Theme preference',
    example: 'dark',
    enum: ['light', 'dark', 'auto'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['light', 'dark', 'auto'])
  theme?: string;
}
