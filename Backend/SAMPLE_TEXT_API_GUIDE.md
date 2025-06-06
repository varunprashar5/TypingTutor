# Sample Text API Guide

## Overview

This guide provides comprehensive documentation for the Sample Text API endpoints in the Typing Tutor application. The API supports filtering by difficulty, keyboard row, number inclusion, special character inclusion, and various other criteria.

## Base URL

```
http://localhost:3001/sample-texts
```

## Endpoints

### 1. Get All Sample Texts

**GET** `/sample-texts`

Retrieve sample texts with optional filtering.

#### Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `difficulty` | string | No | Filter by difficulty level | `beginner`, `intermediate`, `advanced` |
| `keyboardRow` | string | No | Filter by keyboard row focus | `home`, `upper`, `lower`, `all` |
| `includesNumbers` | boolean | No | Filter by number inclusion | `true`, `false` |
| `includesSpecialChars` | boolean | No | Filter by special character inclusion | `true`, `false` |
| `limit` | number | No | Maximum results (1-50) | `10` |
| `minCharacters` | number | No | Minimum character count | `50` |
| `maxCharacters` | number | No | Maximum character count | `200` |
| `minWords` | number | No | Minimum word count | `10` |
| `maxWords` | number | No | Maximum word count | `30` |

#### Example Requests

```bash
# Get beginner level texts for home row
curl "http://localhost:3001/sample-texts?difficulty=beginner&keyboardRow=home"

# Get advanced texts with special characters
curl "http://localhost:3001/sample-texts?difficulty=advanced&includesSpecialChars=true"

# Get texts with 50-100 characters
curl "http://localhost:3001/sample-texts?minCharacters=50&maxCharacters=100"
```

#### Response

```json
[
  {
    "id": "clx1234567890",
    "title": "Home Row Basics",
    "content": "dad sad fad lad had gad add ask...",
    "difficulty": "beginner",
    "keyboardRow": "home",
    "includesNumbers": false,
    "includesSpecialChars": false,
    "characterCount": 95,
    "wordCount": 20,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. Get Random Sample Text

**GET** `/sample-texts/random`

Retrieve a random sample text with optional filtering.

#### Query Parameters

Same as the "Get All Sample Texts" endpoint (except `limit`).

#### Example Requests

```bash
# Get random beginner text
curl "http://localhost:3001/sample-texts/random?difficulty=beginner"

# Get random text with numbers
curl "http://localhost:3001/sample-texts/random?includesNumbers=true"
```

#### Response

Returns a single sample text object (same structure as above) or `null` if no matching texts found.

### 3. Get Sample Text Statistics

**GET** `/sample-texts/statistics`

Retrieve statistics about the sample text collection.

#### Example Request

```bash
curl "http://localhost:3001/sample-texts/statistics"
```

#### Response

```json
{
  "total": 53,
  "byDifficulty": {
    "beginner": 20,
    "intermediate": 16,
    "advanced": 17
  },
  "byKeyboardRow": {
    "home": 8,
    "upper": 8,
    "lower": 8,
    "all": 29
  },
  "byCombination": [
    {
      "difficulty": "beginner",
      "keyboardRow": "home",
      "includesNumbers": false,
      "includesSpecialChars": false,
      "count": 3
    }
  ]
}
```

### 4. Get Sample Texts by Combination

**GET** `/sample-texts/by-combination/:difficulty/:keyboardRow`

Retrieve sample texts for a specific difficulty and keyboard row combination.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `difficulty` | string | Yes | Difficulty level |
| `keyboardRow` | string | Yes | Keyboard row focus |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `includeNumbers` | boolean | No | Include texts with numbers |
| `includeSpecialChars` | boolean | No | Include texts with special characters |
| `limit` | number | No | Maximum results (default: 5) |

#### Example Requests

```bash
# Get beginner home row texts
curl "http://localhost:3001/sample-texts/by-combination/beginner/home"

# Get advanced texts with special characters
curl "http://localhost:3001/sample-texts/by-combination/advanced/all?includeSpecialChars=true"
```

### 5. Get Sample Text by ID

**GET** `/sample-texts/:id`

Retrieve a specific sample text by its ID.

#### Example Request

```bash
curl "http://localhost:3001/sample-texts/clx1234567890"
```

### 6. Create Sample Text (Admin Only)

**POST** `/sample-texts`

Create a new sample text. Requires authentication.

#### Headers

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

#### Request Body

```json
{
  "title": "New Sample Text",
  "content": "This is a new sample text for typing practice.",
  "difficulty": "beginner",
  "keyboardRow": "all",
  "includesNumbers": false,
  "includesSpecialChars": false,
  "characterCount": 52,
  "wordCount": 10
}
```

### 7. Delete Sample Text (Admin Only)

**DELETE** `/sample-texts/:id`

Delete a sample text by ID. Requires authentication.

#### Headers

```
Authorization: Bearer <jwt-token>
```

## Sample Text Categories

### Difficulty Levels

#### Beginner
- Simple words and sentences
- Basic letter combinations
- Common vocabulary
- Character count: 50-150
- Word count: 8-25

#### Intermediate
- Professional communication
- Technical concepts
- Complex sentences
- Character count: 100-300
- Word count: 15-50

#### Advanced
- Programming code
- Special characters and punctuation
- Complex formatting
- Character count: 200-500
- Word count: 30-80

### Keyboard Row Focus

#### Home Row (`asdf jkl;`)
- Focuses on middle row keys
- Basic finger positioning
- Foundation typing skills

#### Upper Row (`qwerty uiop`)
- Upper keyboard keys
- Common words and business terms
- Professional vocabulary

#### Lower Row (`zxcv bnm`)
- Bottom row keys
- Less common letter combinations
- Advanced finger dexterity

#### All Rows
- Complete keyboard usage
- Real-world text examples
- Comprehensive practice

### Content Types

#### Numbers
- Includes digits 0-9
- Mathematical expressions
- Dates and statistics
- Financial data

#### Special Characters
- Punctuation marks
- Programming symbols
- Email addresses and URLs
- Complex formatting

## Current Database Coverage

The database contains **53 sample texts** covering **24 unique combinations**:

### Beginner Level (20 texts)
- Home row: 5 texts (3 basic + 2 with numbers)
- Upper row: 5 texts (3 basic + 2 with numbers)
- Lower row: 5 texts (3 basic + 2 with numbers)
- All rows: 5 texts (3 basic + 2 with numbers)

### Intermediate Level (16 texts)
- Home row: 3 texts (2 basic + 1 with numbers)
- Upper row: 3 texts (2 basic + 1 with numbers)
- Lower row: 2 texts (1 basic + 1 with numbers)
- All rows: 6 texts (3 basic + 3 with numbers)

### Advanced Level (17 texts)
- Home row: 2 texts (1 basic + 1 complete)
- Upper row: 2 texts (1 basic + 1 complete)
- Lower row: 2 texts (1 basic + 1 complete)
- All rows: 13 texts (3 basic + 10 complete)

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "message": ["property limit should not exist"],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 404 Not Found
```json
{
  "message": "Sample text not found",
  "error": "Not Found",
  "statusCode": 404
}
```

#### 401 Unauthorized
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

## Usage Examples

### Frontend Integration

```typescript
// Fetch beginner texts for home row practice
const beginnerHomeTexts = await fetch(
  '/api/sample-texts?difficulty=beginner&keyboardRow=home&includesNumbers=false'
).then(res => res.json());

// Get random advanced text with special characters
const randomAdvancedText = await fetch(
  '/api/sample-texts/random?difficulty=advanced&includesSpecialChars=true'
).then(res => res.json());

// Get statistics for dashboard
const stats = await fetch('/api/sample-texts/statistics')
  .then(res => res.json());
```

### Practice Session Selection

```typescript
// Progressive difficulty selection
const getNextPracticeText = async (userLevel: string, currentRow: string) => {
  const response = await fetch(
    `/api/sample-texts/random?difficulty=${userLevel}&keyboardRow=${currentRow}`
  );
  return response.json();
};

// Adaptive content based on user performance
const getAdaptiveText = async (userStats: UserStats) => {
  const filters = {
    difficulty: userStats.averageWPM > 40 ? 'advanced' : 'intermediate',
    includesNumbers: userStats.numberAccuracy > 0.8,
    includesSpecialChars: userStats.symbolAccuracy > 0.7,
    minCharacters: Math.max(50, userStats.averageWPM * 2),
    maxCharacters: Math.min(300, userStats.averageWPM * 5)
  };
  
  const queryString = new URLSearchParams(filters).toString();
  const response = await fetch(`/api/sample-texts/random?${queryString}`);
  return response.json();
};
```

## Performance Considerations

- Use appropriate `limit` values to avoid large responses
- Leverage the random endpoint for varied practice sessions
- Cache statistics data as it changes infrequently
- Use specific filters to reduce database query complexity

## Future Enhancements

- User-generated content support
- Multilingual sample texts
- Themed collections (programming, literature, business)
- Difficulty scoring based on character complexity
- Real-time content adaptation based on typing patterns 