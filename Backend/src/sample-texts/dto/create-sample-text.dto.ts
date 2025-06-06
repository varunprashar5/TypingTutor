import { IsString, IsBoolean, IsInt, IsIn, MinLength } from 'class-validator';

export class CreateSampleTextDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  @IsString()
  @IsIn(['home', 'upper', 'lower', 'all'])
  keyboardRow: 'home' | 'upper' | 'lower' | 'all';

  @IsBoolean()
  includesNumbers: boolean;

  @IsBoolean()
  includesSpecialChars: boolean;

  @IsInt()
  characterCount: number;

  @IsInt()
  wordCount: number;
}
