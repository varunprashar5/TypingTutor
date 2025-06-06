import {
  IsString,
  IsOptional,
  MaxLength,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @ApiPropertyOptional({
    description: 'User bio or description',
    example: 'Passionate about improving my typing skills!',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'URL to user avatar image',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.avatarUrl && o.avatarUrl.trim() !== '')
  @IsUrl()
  avatarUrl?: string;
}
