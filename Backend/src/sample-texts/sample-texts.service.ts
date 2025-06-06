import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSampleTextDto } from './dto/create-sample-text.dto';
import { FilterSampleTextDto } from './dto/filter-sample-text.dto';
import { SampleText } from '@prisma/client';

@Injectable()
export class SampleTextsService {
  constructor(private prisma: PrismaService) {}

  async create(createSampleTextDto: CreateSampleTextDto): Promise<SampleText> {
    const characterCount = createSampleTextDto.content.length;
    const wordCount = createSampleTextDto.content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    return this.prisma.sampleText.create({
      data: {
        ...createSampleTextDto,
        characterCount,
        wordCount,
      },
    });
  }

  async findAll(filter?: FilterSampleTextDto): Promise<SampleText[]> {
    const where: any = {};

    if (filter?.difficulty) {
      where.difficulty = filter.difficulty;
    }

    if (filter?.keyboardRow) {
      where.keyboardRow = filter.keyboardRow;
    }

    if (filter?.includesNumbers !== undefined) {
      where.includesNumbers = filter.includesNumbers;
    }

    if (filter?.includesSpecialChars !== undefined) {
      where.includesSpecialChars = filter.includesSpecialChars;
    }

    // Character count range filter
    if (filter?.minCharacters || filter?.maxCharacters) {
      where.characterCount = {};
      if (filter.minCharacters) {
        where.characterCount.gte = filter.minCharacters;
      }
      if (filter.maxCharacters) {
        where.characterCount.lte = filter.maxCharacters;
      }
    }

    // Word count range filter
    if (filter?.minWords || filter?.maxWords) {
      where.wordCount = {};
      if (filter.minWords) {
        where.wordCount.gte = filter.minWords;
      }
      if (filter.maxWords) {
        where.wordCount.lte = filter.maxWords;
      }
    }

    return this.prisma.sampleText.findMany({
      where,
      take: filter?.limit || 10,
      orderBy: [
        { difficulty: 'asc' },
        { keyboardRow: 'asc' },
        { includesNumbers: 'asc' },
        { includesSpecialChars: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findOne(id: string): Promise<SampleText | null> {
    return this.prisma.sampleText.findUnique({
      where: { id },
    });
  }

  async findRandom(filter?: FilterSampleTextDto): Promise<SampleText | null> {
    const where: any = {};

    if (filter?.difficulty) {
      where.difficulty = filter.difficulty;
    }

    if (filter?.keyboardRow) {
      where.keyboardRow = filter.keyboardRow;
    }

    if (filter?.includesNumbers !== undefined) {
      where.includesNumbers = filter.includesNumbers;
    }

    if (filter?.includesSpecialChars !== undefined) {
      where.includesSpecialChars = filter.includesSpecialChars;
    }

    // Character count range filter
    if (filter?.minCharacters || filter?.maxCharacters) {
      where.characterCount = {};
      if (filter.minCharacters) {
        where.characterCount.gte = filter.minCharacters;
      }
      if (filter.maxCharacters) {
        where.characterCount.lte = filter.maxCharacters;
      }
    }

    // Word count range filter
    if (filter?.minWords || filter?.maxWords) {
      where.wordCount = {};
      if (filter.minWords) {
        where.wordCount.gte = filter.minWords;
      }
      if (filter.maxWords) {
        where.wordCount.lte = filter.maxWords;
      }
    }

    // Get count of matching records
    const count = await this.prisma.sampleText.count({ where });

    if (count === 0) {
      return null;
    }

    // Generate random skip value
    const skip = Math.floor(Math.random() * count);

    // Get random record
    const result = await this.prisma.sampleText.findMany({
      where,
      skip,
      take: 1,
    });

    return result[0] || null;
  }

  async findByDifficultyAndRow(
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    keyboardRow: 'home' | 'upper' | 'lower' | 'all',
    includeNumbers = false,
    includeSpecialChars = false,
    limit = 5,
  ): Promise<SampleText[]> {
    return this.prisma.sampleText.findMany({
      where: {
        difficulty,
        keyboardRow,
        includesNumbers: includeNumbers,
        includesSpecialChars: includeSpecialChars,
      },
      take: limit,
      orderBy: { createdAt: 'asc' },
    });
  }

  async getStatistics(): Promise<{
    total: number;
    byDifficulty: Record<string, number>;
    byKeyboardRow: Record<string, number>;
    byCombination: Array<{
      difficulty: string;
      keyboardRow: string;
      includesNumbers: boolean;
      includesSpecialChars: boolean;
      count: number;
    }>;
  }> {
    const total = await this.prisma.sampleText.count();

    const byDifficulty = await this.prisma.sampleText.groupBy({
      by: ['difficulty'],
      _count: true,
    });

    const byKeyboardRow = await this.prisma.sampleText.groupBy({
      by: ['keyboardRow'],
      _count: true,
    });

    const byCombination = await this.prisma.sampleText.groupBy({
      by: [
        'difficulty',
        'keyboardRow',
        'includesNumbers',
        'includesSpecialChars',
      ],
      _count: true,
    });

    return {
      total,
      byDifficulty: byDifficulty.reduce(
        (acc, item) => {
          acc[item.difficulty] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      byKeyboardRow: byKeyboardRow.reduce(
        (acc, item) => {
          acc[item.keyboardRow] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      byCombination: byCombination.map((item) => ({
        difficulty: item.difficulty,
        keyboardRow: item.keyboardRow,
        includesNumbers: item.includesNumbers,
        includesSpecialChars: item.includesSpecialChars,
        count: item._count,
      })),
    };
  }

  async remove(id: string): Promise<void> {
    await this.prisma.sampleText.delete({
      where: { id },
    });
  }
}
