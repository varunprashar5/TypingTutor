import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { SampleTextsService } from './sample-texts.service';
import { CreateSampleTextDto } from './dto/create-sample-text.dto';
import { FilterSampleTextDto } from './dto/filter-sample-text.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('sample-texts')
@Controller('sample-texts')
export class SampleTextsController {
  constructor(private readonly sampleTextsService: SampleTextsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new sample text (admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Sample text created successfully.',
  })
  create(@Body() createSampleTextDto: CreateSampleTextDto) {
    return this.sampleTextsService.create(createSampleTextDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sample texts with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Return all sample texts matching the filters.',
  })
  @ApiQuery({
    name: 'difficulty',
    required: false,
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  @ApiQuery({
    name: 'keyboardRow',
    required: false,
    enum: ['home', 'upper', 'lower', 'all'],
  })
  @ApiQuery({ name: 'includesNumbers', required: false, type: Boolean })
  @ApiQuery({ name: 'includesSpecialChars', required: false, type: Boolean })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of results (1-50)',
  })
  @ApiQuery({ name: 'minCharacters', required: false, type: Number })
  @ApiQuery({ name: 'maxCharacters', required: false, type: Number })
  @ApiQuery({ name: 'minWords', required: false, type: Number })
  @ApiQuery({ name: 'maxWords', required: false, type: Number })
  findAll(@Query() filter: FilterSampleTextDto) {
    return this.sampleTextsService.findAll(filter);
  }

  @Get('random')
  @ApiOperation({ summary: 'Get a random sample text with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Return a random sample text matching the filters.',
  })
  @ApiQuery({
    name: 'difficulty',
    required: false,
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  @ApiQuery({
    name: 'keyboardRow',
    required: false,
    enum: ['home', 'upper', 'lower', 'all'],
  })
  @ApiQuery({ name: 'includesNumbers', required: false, type: Boolean })
  @ApiQuery({ name: 'includesSpecialChars', required: false, type: Boolean })
  @ApiQuery({ name: 'minCharacters', required: false, type: Number })
  @ApiQuery({ name: 'maxCharacters', required: false, type: Number })
  @ApiQuery({ name: 'minWords', required: false, type: Number })
  @ApiQuery({ name: 'maxWords', required: false, type: Number })
  findRandom(@Query() filter: FilterSampleTextDto) {
    return this.sampleTextsService.findRandom(filter);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get statistics about sample texts' })
  @ApiResponse({
    status: 200,
    description:
      'Return statistics about sample texts including counts by difficulty, keyboard row, and combinations.',
  })
  getStatistics() {
    return this.sampleTextsService.getStatistics();
  }

  @Get('by-combination/:difficulty/:keyboardRow')
  @ApiOperation({
    summary:
      'Get sample texts by specific difficulty and keyboard row combination',
  })
  @ApiResponse({
    status: 200,
    description: 'Return sample texts for the specified combination.',
  })
  @ApiQuery({
    name: 'includeNumbers',
    required: false,
    type: Boolean,
    description: 'Include texts with numbers',
  })
  @ApiQuery({
    name: 'includeSpecialChars',
    required: false,
    type: Boolean,
    description: 'Include texts with special characters',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of results',
  })
  findByDifficultyAndRow(
    @Param('difficulty') difficulty: 'beginner' | 'intermediate' | 'advanced',
    @Param('keyboardRow') keyboardRow: 'home' | 'upper' | 'lower' | 'all',
    @Query('includeNumbers') includeNumbers?: boolean,
    @Query('includeSpecialChars') includeSpecialChars?: boolean,
    @Query('limit') limit?: number,
  ) {
    return this.sampleTextsService.findByDifficultyAndRow(
      difficulty,
      keyboardRow,
      includeNumbers || false,
      includeSpecialChars || false,
      limit || 5,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sample text by id' })
  @ApiResponse({ status: 200, description: 'Return the sample text.' })
  @ApiResponse({ status: 404, description: 'Sample text not found.' })
  findOne(@Param('id') id: string) {
    return this.sampleTextsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a sample text (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Sample text deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Sample text not found.' })
  remove(@Param('id') id: string) {
    return this.sampleTextsService.remove(id);
  }
}
