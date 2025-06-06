import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { TypingSessionsService } from './typing-sessions.service';
import { CreateTypingSessionDto } from './dto/create-typing-session.dto';
import { UpdateTypingSessionDto } from './dto/update-typing-session.dto';
import { TypingSessionResponseDto } from './dto/typing-session-response.dto';
import { QueryTypingSessionDto } from './dto/query-typing-session.dto';
import { PaginatedTypingSessionsDto } from './dto/paginated-response.dto';
import { TypingStatsResponseDto } from './dto/typing-stats-response.dto';
import { TypingSession } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('typing-sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('typing-sessions')
export class TypingSessionsController {
  constructor(private readonly typingSessionsService: TypingSessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new typing session' })
  @ApiResponse({
    status: 201,
    description: 'The typing session has been successfully created.',
    type: TypingSessionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createTypingSessionDto: CreateTypingSessionDto,
    @Request() req: any,
  ): Promise<TypingSession> {
    return this.typingSessionsService.create(
      createTypingSessionDto,
      req.user.id,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get paginated typing sessions for the authenticated user',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'sessionType',
    required: false,
    enum: ['practice', 'test', 'game'],
  })
  @ApiQuery({
    name: 'difficulty',
    required: false,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
  })
  @ApiResponse({
    status: 200,
    description: 'Return paginated typing sessions.',
    type: PaginatedTypingSessionsDto,
  })
  findAll(
    @Query() query: QueryTypingSessionDto,
    @Request() req: any,
  ): Promise<PaginatedTypingSessionsDto> {
    console.log('Controller received query params:', query);
    return this.typingSessionsService.findAll(query, req.user.id);
  }

  @Get('test')
  @ApiOperation({ summary: 'Test endpoint to verify updates' })
  testEndpoint(): any {
    return {
      message: 'Backend updated successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get typing statistics for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Return typing statistics.',
    type: TypingStatsResponseDto,
  })
  getStats(@Request() req: any): Promise<TypingStatsResponseDto> {
    return this.typingSessionsService.getStats(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a typing session by id' })
  @ApiParam({ name: 'id', description: 'Typing session ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the typing session.',
    type: TypingSessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Typing session not found.' })
  findOne(@Param('id') id: string): Promise<TypingSession> {
    return this.typingSessionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a typing session' })
  @ApiParam({ name: 'id', description: 'Typing session ID' })
  @ApiResponse({
    status: 200,
    description: 'The typing session has been successfully updated.',
    type: TypingSessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Typing session not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTypingSessionDto: UpdateTypingSessionDto,
  ): Promise<TypingSession> {
    return this.typingSessionsService.update(id, updateTypingSessionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a typing session' })
  @ApiParam({ name: 'id', description: 'Typing session ID' })
  @ApiResponse({
    status: 204,
    description: 'The typing session has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Typing session not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.typingSessionsService.remove(id);
  }
}
