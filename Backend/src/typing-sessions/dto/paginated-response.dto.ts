import { ApiProperty } from '@nestjs/swagger';
import { TypingSessionResponseDto } from './typing-session-response.dto';

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;
}

export class PaginatedTypingSessionsDto {
  @ApiProperty({
    description: 'List of typing sessions',
    type: [TypingSessionResponseDto],
  })
  sessions: TypingSessionResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  pagination: PaginationMetaDto;
}
