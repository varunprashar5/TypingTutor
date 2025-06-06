Create a new Prisma migration for real-time typing race feature with these exact specifications:

  1. Race model:
     - id: String @id @default(cuid())
     - roomCode: String @unique @db.VarChar(6) // Alphanumeric, index for fast lookups
     - hostId: String // FK to User
     - sampleTextId: String // FK to SampleText
     - status: RaceStatus @default(WAITING) // enum: WAITING, STARTING, ACTIVE, COMPLETED
     - maxParticipants: Int @default(5)
     - createdAt: DateTime @default(now())
     - startedAt: DateTime?
     - completedAt: DateTime?

  2. RaceParticipant model:
     - id: String @id @default(cuid())
     - raceId: String // FK to Race
     - userId: String // FK to User
     - position: Float @default(0) // 0-100 percentage
     - currentWPM: Float @default(0)
     - accuracy: Float @default(100)
     - currentWordIndex: Int @default(0)
     - typedText: String @db.Text @default("")
     - errors: Int @default(0)
     - isActive: Boolean @default(true) // For disconnect handling
     - joinedAt: DateTime @default(now())
     - finishedAt: DateTime?
     - finalRank: Int?
     - totalTimeMs: Int? // Milliseconds to complete

  3. Relations:
     - Race has many RaceParticipant (cascade delete)
     - User has many RaceParticipant
     - SampleText has many Race

  4. Indexes for performance:
     @@index([roomCode, status]) on Race
     @@index([raceId, userId]) on RaceParticipant
     @@unique([raceId, userId]) on RaceParticipant // Prevent duplicate joins

  Generate the complete schema additions and create the migration. Ensure the SampleText reference validates that text has at least 300 words.