import {
  IsOptional,
  IsString,
  IsIn,
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterSampleTextDto {
  @ApiPropertyOptional({
    description: 'Difficulty level of the sample text',
    enum: ['beginner', 'intermediate', 'advanced'],
    example: 'beginner',
  })
  @IsOptional()
  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  difficulty?: 'beginner' | 'intermediate' | 'advanced';

  @ApiPropertyOptional({
    description: 'Keyboard row focus for the sample text',
    enum: ['home', 'upper', 'lower', 'all'],
    example: 'home',
  })
  @IsOptional()
  @IsString()
  @IsIn(['home', 'upper', 'lower', 'all'])
  keyboardRow?: 'home' | 'upper' | 'lower' | 'all';

  @ApiPropertyOptional({
    description: 'Whether the text should include numbers',
    example: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  includesNumbers?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the text should include special characters',
    example: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  includesSpecialChars?: boolean;

  @ApiPropertyOptional({
    description: 'Maximum number of texts to return',
    minimum: 1,
    maximum: 50,
    default: 10,
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Minimum character count for the text',
    minimum: 1,
    example: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  minCharacters?: number;

  @ApiPropertyOptional({
    description: 'Maximum character count for the text',
    minimum: 1,
    example: 200,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxCharacters?: number;

  @ApiPropertyOptional({
    description: 'Minimum word count for the text',
    minimum: 1,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  minWords?: number;

  @ApiPropertyOptional({
    description: 'Maximum word count for the text',
    minimum: 1,
    example: 30,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxWords?: number;
}
