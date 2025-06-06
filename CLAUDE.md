# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Development Rules

### 1. Code Quality Standards
- **ALWAYS** follow React best practices (hooks rules, component composition, proper state management)
- **ALWAYS** follow NestJS best practices (dependency injection, DTOs, proper decorators)
- **NEVER** generate code with TypeScript errors - verify all types are correct before implementation
- **ALWAYS** ensure strict TypeScript compliance with the tsconfig settings
- **Note**: Backend uses relaxed TypeScript settings (no strict mode), Frontend uses strict mode

### 2. Development Environment
- **NEVER** attempt to restart the development servers
- Both React (port 3000) and NestJS (port 3001) servers are **ALWAYS** running in watch mode
- Changes are automatically detected and reloaded
- Focus on code generation, not server management

### 3. TypeScript Requirements
- Verify all imports are used and correctly typed
- Ensure all function parameters and return types are properly typed
- Check that all API responses match their expected interfaces
- Use proper type guards when handling dynamic data
- Never use `any` type unless absolutely necessary with proper justification

## Project Overview

This is a full-stack typing tutor application with a React frontend and NestJS backend, featuring practice modes, competitive gaming, and performance tracking.

## Common Development Commands

### Backend (typing-tutor-backend)
```bash
cd Backend/typing-tutor-backend

# Development
npm run start:dev     # Start dev server with hot reload (port 3001)
npm run start:debug   # Start in debug mode with watch
npm run build         # Build production code
npm run start:prod    # Start production server

# Code Quality
npm run lint          # Run ESLint with auto-fix
npm run format        # Format code with Prettier

# Testing
npm run test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Generate coverage report
npm run test:debug    # Debug tests
npm run test:e2e      # Run e2e tests

# Database
npm run db:generate   # Generate Prisma client
npm run db:push       # Push Prisma schema to database
npm run db:migrate    # Run database migrations
npm run db:reset      # Reset database
npm run db:seed       # Seed database with sample data
npm run db:studio     # Open Prisma Studio GUI
```

### Frontend (react-query-app)
```bash
cd react-query-app

# Development
npm start            # Start dev server (port 3000)
npm run dev          # Alias for start
npm run build        # Create production build
npm test             # Run tests
```

### E2E Testing (e2e-tests)
```bash
cd e2e-tests

# Setup
npm install
npx playwright install

# Running tests
npm test                 # Run all tests
npm run test:headed      # Run with browser visible
npm run test:ui          # Interactive UI mode
npm run test:debug       # Debug mode
npm run test:auth        # Run auth tests only
npm run test:smoke       # Run smoke tests only
npm run test:regression  # Run full regression suite

# Specific test file
npx playwright test tests/auth/registration.spec.ts
npx playwright test -g "Valid Registration"  # Run test by name

# Reports
npm run report          # Show HTML report
```

## Architecture

### Backend
- **Framework**: NestJS with TypeScript and Express
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **API**: RESTful with Swagger documentation at `/api`
- **Port**: 3001 (configured to avoid React default)
- **CORS**: Enabled for localhost:3000 and 5173
- **Validation**: class-validator with DTOs

### Frontend
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with dynamic class safelist for gradients
- **State**: Local state management with custom hooks and Context API for auth
- **API Client**: Axios for HTTP requests
- **Routing**: React Router v6
- **Build Tool**: Create React App

### E2E Testing
- **Framework**: Playwright with TypeScript
- **Pattern**: Page Object Model (POM)
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Reports**: HTML, JSON, JUnit formats
- **Tags**: @smoke, @regression, @security, @edge-case

### Data Flow
1. Frontend components use custom hooks for typing logic and state management
2. API calls go through Axios to the NestJS backend
3. Backend validates with DTOs and class-validator
4. Prisma handles database operations with MySQL
5. Responses are transformed with DTOs before sending
6. JWT tokens handle authentication state

### Key Modules
- **Backend Modules**:
  - `auth`: User authentication and profile management
  - `typing-sessions`: Session CRUD operations and statistics
  - `sample-texts`: Text content management for practice
  - `leaderboard`: Competitive rankings and statistics
  - `prisma`: Database connection and ORM service

- **Frontend Features**:
  - `practice`: Traditional typing practice with difficulty levels
  - `game`: Competitive typing game mode
  - `leaderboard`: Rankings and user statistics
  - `auth`: Login, registration, and protected routes
  - `common`: Shared UI components and utilities

## Database Schema

The application uses a multi-table relational database:

### Tables
- **User**: Authentication, profile, and settings
- **SampleText**: Practice content with difficulty levels
- **TypingSession**: Performance tracking (WPM, accuracy, duration)
- **LeaderboardEntry**: Aggregated competitive statistics

### Database Credentials
- User: `vtnetzwelt`
- Password: `netzwelt`
- Database: `typing_tutor`

## Environment Setup

Backend requires a `.env` file with:
```
DATABASE_URL="mysql://vtnetzwelt:netzwelt@localhost:3306/typing_tutor"
JWT_SECRET="your-secret-key"
```

E2E tests require a `.env` file (copy from `.env.example`):
```
BASE_URL=http://localhost:3000
API_URL=http://localhost:3001
```

## API Documentation

Swagger documentation is available at `http://localhost:3001/api` when the backend is running.

## Testing Approach

### Backend Testing
- Unit tests with Jest
- E2E tests for API endpoints
- Test database for isolation
- Coverage reports available

### Frontend Testing
- Jest with React Testing Library
- Component and hook testing
- Snapshot testing for UI consistency

### E2E Testing
- Playwright for browser automation
- Page Object Model for maintainability
- Parallel execution support
- Visual regression testing capabilities
- Test data generators for unique test data

## TypeScript Configuration

### Backend (Relaxed)
- No strict mode
- Allow implicit any
- Skip library checks

### Frontend (Strict)
- Full strict mode enabled
- No implicit any
- Strict null checks
- All strict flags enabled

## Key Dependencies

### Backend
- NestJS v10
- Prisma v6
- Passport for auth
- class-validator/class-transformer
- bcrypt for password hashing

### Frontend
- React 19
- TypeScript 5
- Tailwind CSS 3
- Axios for API calls
- React Router v6

### E2E Testing
- Playwright v1.40
- TypeScript v5
- Faker for test data
- Allure for reporting

## Keyboard Shortcuts

### Global
- `Ctrl+R` - Restart current session
- `F1` - Focus input field
- `Esc` - Return to main menu (in game mode)

### Game Mode
- `Space` - Pause/unpause game
- `Enter` - Start new game
- `1-9` - Quick level selection

## High-Level Architecture

### Authentication Flow
1. User registers/logs in via frontend forms
2. Frontend sends credentials to `/auth/register` or `/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Axios interceptor adds token to all requests
6. Protected routes check token validity

### Typing Session Flow
1. User starts practice/game session
2. Frontend tracks all metrics locally
3. On completion, session data sent to backend
4. Backend validates and stores in database
5. Statistics calculated and returned
6. Leaderboard updated if applicable

### Real-time Features
- Virtual keyboard updates use React state
- Game animations use requestAnimationFrame
- Statistics calculate on every keystroke
- Audio feedback triggers immediately

## Performance Considerations

### Frontend
- Components memoized with React.memo where beneficial
- Custom hooks use useMemo/useCallback
- Virtual keyboard uses CSS transforms for performance
- Game mode uses Canvas for rendering when needed

### Backend
- Database queries optimized with Prisma
- Pagination implemented for large datasets
- Caching strategy for leaderboard data
- Connection pooling for database