-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(100) NULL,
    `bio` TEXT NULL,
    `avatarUrl` VARCHAR(500) NULL,
    `experienceLevel` VARCHAR(50) NOT NULL DEFAULT 'beginner',
    `preferredDifficulty` VARCHAR(50) NOT NULL DEFAULT 'beginner',
    `preferredKeyboardRow` VARCHAR(50) NOT NULL DEFAULT 'all',
    `soundEnabled` BOOLEAN NOT NULL DEFAULT true,
    `keyboardLayout` VARCHAR(50) NOT NULL DEFAULT 'qwerty',
    `targetWPM` INTEGER NOT NULL DEFAULT 40,
    `dailyGoalMinutes` INTEGER NOT NULL DEFAULT 15,
    `theme` VARCHAR(50) NOT NULL DEFAULT 'light',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sample_texts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `difficulty` VARCHAR(50) NOT NULL,
    `keyboardRow` VARCHAR(50) NOT NULL,
    `includesNumbers` BOOLEAN NOT NULL DEFAULT false,
    `includesSpecialChars` BOOLEAN NOT NULL DEFAULT false,
    `characterCount` INTEGER NOT NULL,
    `wordCount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `sample_texts_difficulty_keyboardRow_idx`(`difficulty`, `keyboardRow`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typing_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `userInput` TEXT NOT NULL,
    `wpm` INTEGER NOT NULL,
    `accuracy` DOUBLE NOT NULL,
    `duration` INTEGER NOT NULL,
    `totalCharacters` INTEGER NOT NULL,
    `correctCharacters` INTEGER NOT NULL,
    `incorrectCharacters` INTEGER NOT NULL,
    `sessionType` VARCHAR(50) NULL,
    `difficulty` VARCHAR(50) NULL,
    `userId` VARCHAR(191) NULL,
    `sampleTextId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `typing_sessions_userId_createdAt_idx`(`userId`, `createdAt`),
    INDEX `typing_sessions_wpm_idx`(`wpm`),
    INDEX `typing_sessions_accuracy_idx`(`accuracy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leaderboard_entries` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `period` VARCHAR(50) NOT NULL,
    `periodDate` DATETIME(3) NOT NULL,
    `bestWpm` INTEGER NOT NULL DEFAULT 0,
    `bestAccuracy` DOUBLE NOT NULL DEFAULT 0,
    `overallScore` DOUBLE NOT NULL DEFAULT 0,
    `sessionCount` INTEGER NOT NULL DEFAULT 0,
    `bestWpmSessionId` VARCHAR(191) NULL,
    `bestAccuracySessionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `leaderboard_entries_period_periodDate_overallScore_idx`(`period`, `periodDate`, `overallScore`),
    INDEX `leaderboard_entries_period_periodDate_bestWpm_idx`(`period`, `periodDate`, `bestWpm`),
    INDEX `leaderboard_entries_period_periodDate_bestAccuracy_idx`(`period`, `periodDate`, `bestAccuracy`),
    INDEX `leaderboard_entries_period_periodDate_sessionCount_idx`(`period`, `periodDate`, `sessionCount`),
    UNIQUE INDEX `leaderboard_entries_userId_period_periodDate_key`(`userId`, `period`, `periodDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `typing_sessions` ADD CONSTRAINT `typing_sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `typing_sessions` ADD CONSTRAINT `typing_sessions_sampleTextId_fkey` FOREIGN KEY (`sampleTextId`) REFERENCES `sample_texts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leaderboard_entries` ADD CONSTRAINT `leaderboard_entries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
