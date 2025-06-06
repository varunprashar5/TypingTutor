<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Typing Tutor Backend API

A NestJS backend API for the React TypeScript Typing Tutor application using Prisma ORM with MySQL.

## Features

- **Typing Sessions Management**: CRUD operations for typing practice sessions
- **Statistics Tracking**: Calculate and retrieve typing performance metrics
- **MySQL Database**: Production-ready relational database
- **Prisma ORM**: Type-safe database access with auto-generated client
- **API Documentation**: Swagger/OpenAPI documentation
- **Validation**: Request validation with class-validator
- **CORS Support**: Configured for frontend communication

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm
- MySQL Server (v8.0 or higher)

### Database Setup

The application is configured to use the following MySQL database:

- **Host**: localhost
- **Port**: 3306
- **Username**: vtnetzwelt
- **Password**: netzwelt
- **Database**: TypingTutor

1. **Ensure MySQL is running**:
   ```bash
   # macOS with Homebrew
   brew services start mysql
   
   # Ubuntu/Debian
   sudo systemctl start mysql
   
   # Windows - Start MySQL service
   ```

2. **Create Database and User** (if not already exists):
   ```bash
   # Connect to MySQL as root
   mysql -u root -p
   
   # Run the setup script
   source scripts/setup-db.sql
   
   # Or manually:
   CREATE DATABASE IF NOT EXISTS TypingTutor;
   CREATE USER IF NOT EXISTS 'vtnetzwelt'@'localhost' IDENTIFIED BY 'netzwelt';
   GRANT ALL PRIVILEGES ON TypingTutor.* TO 'vtnetzwelt'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema (creates tables)
npm run db:push

# Start the development server
npm run start:dev
```

The API will be available at `http://localhost:3001`

### API Documentation

Once the server is running, visit `http://localhost:3001/api` to view the interactive Swagger documentation.

## Environment Variables

The application uses the following environment configuration (`.env`):

```env
NODE_ENV=development
PORT=3001

# Database Configuration
DATABASE_URL="mysql://vtnetzwelt:netzwelt@localhost:3306/TypingTutor"

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Database Management

### Prisma Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database (development)
npm run db:push

# Create and run migrations (production)
npm run db:migrate

# View database in Prisma Studio
npm run db:studio

# Reset database (development only)
npm run db:reset
```

## API Endpoints

### Typing Sessions

- `POST /typing-sessions` - Create a new typing session
- `GET /typing-sessions` - Get all typing sessions
- `GET /typing-sessions/stats` - Get typing statistics
- `GET /typing-sessions/:id` - Get a specific typing session
- `PATCH /typing-sessions/:id` - Update a typing session
- `DELETE /typing-sessions/:id` - Delete a typing session

### Example Request Body

```json
{
  "text": "The quick brown fox jumps over the lazy dog",
  "userInput": "The quick brown fox jumps over the lazy dog",
  "wpm": 45,
  "accuracy": 95.5,
  "duration": 60,
  "totalCharacters": 100,
  "correctCharacters": 95,
  "incorrectCharacters": 5,
  "sessionType": "practice",
  "difficulty": "medium"
}
```

## Development

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Format code
npm run format

# Lint code
npm run lint
```

## Project Structure

```
src/
├── prisma/                  # Prisma service and module
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── typing-sessions/         # Typing sessions module
│   ├── dto/                # Data Transfer Objects
│   ├── typing-sessions.controller.ts
│   ├── typing-sessions.service.ts
│   └── typing-sessions.module.ts
├── app.controller.ts       # Main app controller
├── app.module.ts          # Main app module
├── app.service.ts         # Main app service
└── main.ts                # Application entry point

prisma/
└── schema.prisma          # Database schema definition

scripts/
└── setup-db.sql          # Database setup script
```

## Technologies Used

- **NestJS**: Progressive Node.js framework
- **Prisma**: Next-generation ORM for TypeScript
- **MySQL**: Relational database management system
- **Swagger**: API documentation
- **class-validator**: Request validation
- **class-transformer**: Object transformation

## Database Schema

The application uses a single `TypingSession` model with the following fields:

- `id`: Unique identifier (CUID)
- `text`: Original text for typing practice
- `userInput`: User's typed input
- `wpm`: Words per minute
- `accuracy`: Accuracy percentage
- `duration`: Session duration in seconds
- `totalCharacters`: Total character count
- `correctCharacters`: Correct character count
- `incorrectCharacters`: Incorrect character count
- `sessionType`: Type of session (practice, test, game)
- `difficulty`: Difficulty level (easy, medium, hard)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Database Connection Details

The application connects to MySQL using the following configuration:

```javascript
// Prisma equivalent of your Sequelize config
{
  provider: "mysql",
  host: "localhost",
  port: 3306,
  username: "vtnetzwelt",
  password: "netzwelt",
  database: "TypingTutor"
}
```

This is configured in Prisma as:
```
DATABASE_URL="mysql://vtnetzwelt:netzwelt@localhost:3306/TypingTutor"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run `npm run db:generate` if schema changes were made
6. Submit a pull request

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
