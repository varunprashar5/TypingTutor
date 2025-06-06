# Sample Text Seeding Documentation

## Overview

This document describes the comprehensive sample text seeding strategy for the Typing Tutor application. The seeding covers all possible combinations of difficulty levels, keyboard rows, number inclusion, and special character inclusion.

## Database Schema

The `SampleText` model includes the following fields:

```prisma
model SampleText {
  id                   String   @id @default(cuid())
  title                String   @db.VarChar(255)
  content              String   @db.Text
  difficulty           String   @db.VarChar(50) // 'beginner', 'intermediate', 'advanced'
  keyboardRow          String   @db.VarChar(50) // 'home', 'upper', 'lower', 'all'
  includesNumbers      Boolean  @default(false)
  includesSpecialChars Boolean  @default(false)
  characterCount       Int
  wordCount            Int
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  
  typingSessions       TypingSession[]

  @@index([difficulty, keyboardRow])
  @@map("sample_texts")
}
```

## Seeding Strategy

### Combination Matrix

The seeding covers all combinations of:

1. **Difficulty Levels**: `beginner`, `intermediate`, `advanced`
2. **Keyboard Rows**: `home`, `upper`, `lower`, `all`
3. **Number Inclusion**: `true`, `false`
4. **Special Characters**: `true`, `false`

### Total Combinations

- **Beginner Level**: 16 combinations (4 rows × 2 number options × 2 special char options)
- **Intermediate Level**: 16 combinations
- **Advanced Level**: 16 combinations
- **Total**: 48 possible combinations

### Current Seeding Coverage

Based on the latest seeding run, we have **53 sample texts** covering **24 unique combinations**:

#### Beginner Level (20 texts)
- `home/no-numbers/no-special`: 3 texts
- `home/numbers/no-special`: 2 texts
- `upper/no-numbers/no-special`: 3 texts
- `upper/numbers/no-special`: 2 texts
- `lower/no-numbers/no-special`: 3 texts
- `lower/numbers/no-special`: 2 texts
- `all/no-numbers/no-special`: 3 texts
- `all/numbers/no-special`: 2 texts

#### Intermediate Level (16 texts)
- `home/no-numbers/no-special`: 2 texts
- `home/numbers/no-special`: 1 text
- `upper/no-numbers/no-special`: 2 texts
- `upper/numbers/no-special`: 1 text
- `lower/no-numbers/no-special`: 1 text
- `lower/numbers/no-special`: 1 text
- `all/no-numbers/no-special`: 3 texts
- `all/numbers/no-special`: 3 texts

#### Advanced Level (17 texts)
- `home/no-numbers/special`: 1 text
- `home/numbers/special`: 1 text
- `upper/no-numbers/special`: 1 text
- `upper/numbers/special`: 1 text
- `lower/no-numbers/special`: 1 text
- `lower/numbers/special`: 1 text
- `all/no-numbers/special`: 3 texts
- `all/numbers/special`: 10 texts

## Content Strategy by Category

### Beginner Level

#### Home Row (`asdf jkl;`)
- **Basic**: Simple letter combinations and common words
- **With Numbers**: Integration of numbers 0-9 with home row letters
- **Examples**: "dad sad fad", "Add 1 and 2 to get 3"

#### Upper Row (`qwerty uiop`)
- **Basic**: Common words using upper row letters
- **With Numbers**: Business and professional contexts with numbers
- **Examples**: "type write poetry", "Write 25 reports"

#### Lower Row (`zxcv bnm`)
- **Basic**: Simple words and combinations
- **With Numbers**: Counting and basic math
- **Examples**: "zoom box mix", "Zoom 1 box"

#### All Rows
- **Basic**: Complete sentences and stories
- **With Numbers**: Time, dates, and simple calculations
- **Examples**: "The quick brown fox", "There are 7 days in a week"

### Intermediate Level

#### Home Row
- **Advanced**: Complex sentences with home row focus
- **With Numbers**: Statistical and measurement data
- **Examples**: "Flashlights shall flash glass halls", "Flash 12 glass halls"

#### Upper Row
- **Professional**: Business and technical writing
- **With Numbers**: Reports and data analysis
- **Examples**: "Write proper reports with priority", "Write 25 reports with 30 requirements"

#### Lower Row
- **Complex**: Advanced vocabulary and concepts
- **With Numbers**: Inventory and counting scenarios
- **Examples**: "Boxing examples mix cabbage", "Box 15 examples"

#### All Rows
- **Business**: Professional communication
- **Technical**: Programming and academic concepts
- **With Numbers**: Statistics, financial data, scientific measurements
- **Examples**: "Dear colleagues, I hope this email finds you well", "The survey included 1234 participants"

### Advanced Level

#### Home Row
- **With Punctuation**: Quotes, exclamations, commas
- **Complete**: Numbers and special characters combined
- **Examples**: 'Flash! Glass halls shall fall. Ask, "Shall lads dash?"'

#### Upper Row
- **Professional Writing**: Complex punctuation and formatting
- **Technical**: Advanced business communication
- **Examples**: 'Write proper reports; type requirements. "Priority poetry?"'

#### Lower Row
- **With Symbols**: Questions, exclamations, lists
- **Advanced**: Complex punctuation patterns
- **Examples**: 'Box examples; mix cabbage. "Zoom cameras?"'

#### All Rows
- **Programming**: Code snippets, syntax, and technical content
- **Professional**: Emails, documentation, and complex formatting
- **Technical**: Database queries, command line, configuration files
- **Examples**: 
  - Programming: `const user = { name: "John", age: 30 };`
  - Web Development: `Visit https://api.example.com/v1/users?page=2`
  - System Admin: `sudo apt-get update && apt-get install -y nodejs`

## Missing Combinations

The following combinations are currently **not covered** and could be added:

### Beginner Level Missing
- `home/no-numbers/special`: Home row with punctuation
- `home/numbers/special`: Home row with numbers and punctuation
- `upper/no-numbers/special`: Upper row with punctuation
- `upper/numbers/special`: Upper row with numbers and punctuation
- `lower/no-numbers/special`: Lower row with punctuation
- `lower/numbers/special`: Lower row with numbers and punctuation
- `all/no-numbers/special`: All rows with punctuation only
- `all/numbers/special`: All rows with numbers and punctuation

### Intermediate Level Missing
- All combinations with `special` characters (8 combinations)

## Usage in Application

### API Endpoint for Fetching Sample Texts

```typescript
GET /sample-texts?difficulty=beginner&keyboardRow=home&includesNumbers=false&includesSpecialChars=false
```

### Service Method Example

```typescript
async findSampleTexts(filters: {
  difficulty?: string;
  keyboardRow?: string;
  includesNumbers?: boolean;
  includesSpecialChars?: boolean;
  limit?: number;
}) {
  return this.prisma.sampleText.findMany({
    where: filters,
    take: filters.limit || 10,
    orderBy: { createdAt: 'asc' }
  });
}
```

### Frontend Integration

The frontend can request appropriate sample texts based on:
- User's selected difficulty level
- Chosen keyboard row focus
- Whether to include numbers in practice
- Whether to include special characters

## Running the Seeder

### Initial Seeding
```bash
cd Backend/typing-tutor-backend
npm run db:seed
```

### Re-seeding (Clears existing data)
```bash
npm run db:seed
```

### Checking Seeded Data
```bash
npm run db:studio
```

## Content Guidelines

### Text Quality Standards
1. **Accuracy**: All texts should be grammatically correct
2. **Relevance**: Content should be practical and useful
3. **Progression**: Difficulty should increase appropriately
4. **Variety**: Mix of different content types (business, technical, creative)

### Character Limits
- **Beginner**: 50-150 characters
- **Intermediate**: 100-300 characters
- **Advanced**: 200-500 characters

### Word Count Guidelines
- **Beginner**: 8-25 words
- **Intermediate**: 15-50 words
- **Advanced**: 30-80 words

## Future Enhancements

### Potential Additions
1. **Language Support**: Multi-language sample texts
2. **Domain-Specific**: Medical, legal, technical terminology
3. **User-Generated**: Allow users to submit custom texts
4. **Adaptive**: AI-generated texts based on user weaknesses
5. **Themed Collections**: Seasonal, topical, or educational themes

### Analytics Integration
- Track which texts are most effective for learning
- Identify texts that cause the most errors
- Optimize text selection based on user performance

## Maintenance

### Regular Updates
- Review and update content quarterly
- Add new combinations as needed
- Remove or modify texts based on user feedback
- Ensure content remains current and relevant

### Quality Assurance
- Regular testing of all text combinations
- Validation of character and word counts
- Verification of difficulty progression
- Content review for appropriateness and accuracy 