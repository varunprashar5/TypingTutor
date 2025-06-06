import { ApiProperty } from '@nestjs/swagger';

export class TypingSessionResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the typing session',
    example: 'clh7x8y9z0000abcdefghijkl',
  })
  id: string;

  @ApiProperty({
    description: 'The text that was typed',
    example: 'The quick brown fox jumps over the lazy dog',
  })
  text: string;

  @ApiProperty({
    description: 'The user input text',
    example: 'The quick brown fox jumps over the lazy dog',
  })
  userInput: string;

  @ApiProperty({
    description: 'Words per minute',
    example: 45,
  })
  wpm: number;

  @ApiProperty({
    description: 'Accuracy percentage',
    example: 95.5,
  })
  accuracy: number;

  @ApiProperty({
    description: 'Duration in seconds',
    example: 60,
  })
  duration: number;

  @ApiProperty({
    description: 'Total number of characters',
    example: 100,
  })
  totalCharacters: number;

  @ApiProperty({
    description: 'Number of correct characters',
    example: 95,
  })
  correctCharacters: number;

  @ApiProperty({
    description: 'Number of incorrect characters',
    example: 5,
  })
  incorrectCharacters: number;

  @ApiProperty({
    description: 'Type of typing session',
    example: 'practice',
    nullable: true,
  })
  sessionType: string | null;

  @ApiProperty({
    description: 'Difficulty level',
    example: 'medium',
    nullable: true,
  })
  difficulty: string | null;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-12-01T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-12-01T10:00:00.000Z',
  })
  updatedAt: Date;
}
