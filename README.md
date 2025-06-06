# Typing Tutor - Full Stack Application

A comprehensive React TypeScript typing tutor application with a NestJS backend, featuring practice modes, game modes, real-time statistics, and user authentication.

## 🚀 Project Overview

This is a full-stack typing tutor application designed to help users improve their typing speed and accuracy through engaging practice sessions and gamified experiences.

### Key Features

- **🎯 Practice Mode**: Traditional typing practice with real-time WPM and accuracy tracking
- **🎮 Game Mode**: Falling letters game with multiple difficulty levels and keyboard row selection
- **📊 Real-time Statistics**: Live tracking of WPM, accuracy, progress, and time
- **🔊 Audio Feedback**: Sound effects for typing, errors, and achievements
- **⌨️ Virtual Keyboard**: Visual keyboard with key press highlighting
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🔐 User Authentication**: Secure login/register system
- **💾 Session Persistence**: Backend API for storing typing sessions
- **♿ Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Technology Stack

### Frontend (React TypeScript)
- **React 19** - Modern React with hooks and concurrent features
- **TypeScript 5.8** - Strict type safety and modern language features
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router 7.6** - Client-side routing
- **Axios** - HTTP client for API communication

### Backend (NestJS)
- **NestJS 11** - Progressive Node.js framework
- **Prisma 6.8** - Next-generation ORM with type safety
- **MySQL** - Relational database
- **Passport JWT** - Authentication strategy
- **Swagger** - API documentation
- **bcrypt** - Password hashing

## 📁 Project Structure

```
claude 4/
├── react-query-app/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── typing-tutor/        # Main typing tutor components
│   │   │   │   ├── common/          # Shared UI components
│   │   │   │   ├── practice/        # Practice mode components
│   │   │   │   ├── game/            # Game mode components
│   │   │   │   ├── TypingTutor.tsx  # Main orchestrator component
│   │   │   │   └── GameModeSelector.tsx
│   │   │   ├── auth/                # Authentication components
│   │   │   └── ErrorBoundary.tsx    # Error handling
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── common/              # Shared hooks
│   │   │   ├── game/                # Game-specific hooks
│   │   │   └── practice/            # Practice-specific hooks
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── utils/                   # Utility functions
│   │   ├── constants/               # Application constants
│   │   └── contexts/                # React contexts
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
├── Backend/
│   └── typing-tutor-backend/        # NestJS backend API
│       ├── src/
│       │   ├── typing-sessions/     # Typing sessions module
│       │   ├── prisma/              # Prisma service
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── prisma/
│       │   └── schema.prisma        # Database schema
│       ├── package.json
│       └── tsconfig.json
└── Documentation files
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL Server** (v8.0 or higher)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd Backend/typing-tutor-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup MySQL database**:
   ```bash
   # Connect to MySQL as root
   mysql -u root -p
   
   # Create database and user
   CREATE DATABASE IF NOT EXISTS TypingTutor;
   CREATE USER IF NOT EXISTS 'vtnetzwelt'@'localhost' IDENTIFIED BY 'netzwelt';
   GRANT ALL PRIVILEGES ON TypingTutor.* TO 'vtnetzwelt'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **Setup Prisma and start server**:
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # Start development server
   npm run start:dev
   ```

   Backend will be available at `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd react-query-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

   Frontend will be available at `http://localhost:3000`

## 🎯 Core Components

### Main Application (`TypingTutor.tsx`)

The main orchestrator component that manages:
- Game mode switching (Practice/Game)
- State management through custom hooks
- Audio feedback system
- Keyboard shortcuts
- Timer and statistics tracking

### Practice Mode Components

#### `PracticeMode.tsx`
- Traditional typing practice interface
- Real-time WPM and accuracy display
- Progress tracking
- Word-by-word validation

#### `TextDisplay.tsx`
- Renders text to be typed
- Highlights current, completed, and error words
- Responsive word wrapping

#### `TypingInput.tsx`
- Main input field with auto-focus
- Disabled state when completed
- Visual cursor animation
- Restart functionality

### Game Mode Components

#### `GameMode.tsx`
- Falling letters game interface
- Multiple difficulty levels
- Lives and scoring system
- Keyboard row selection

#### `GameStartScreen.tsx`
- Level selection (1-10)
- Keyboard row configuration
- Game instructions

#### `GamePlayArea.tsx`
- Falling letters animation
- Real-time collision detection
- Visual effects and feedback

### Common Components

#### `Header.tsx`
- Real-time statistics display
- User authentication status
- Logout functionality

#### `MetricCard.tsx`
- Reusable metric display component
- Gradient styling
- Responsive design

#### `VirtualKeyboard.tsx`
- Visual keyboard representation
- Key press highlighting
- QWERTY layout

#### `ProgressBar.tsx`
- Visual progress indicator
- Completion percentage
- Word count display

## 🎮 Custom Hooks

### Core Hooks

#### `useTypingLogic`
- Word management and validation
- Input processing and error tracking
- Completion detection
- Statistics calculation

#### `useTimer`
- Elapsed time tracking
- Start/stop/reset functionality
- Performance optimization

#### `useAudio`
- Sound effect management
- Mute/unmute functionality
- Audio context handling

#### `useKeyboardTracking`
- Physical key press detection
- Virtual keyboard highlighting
- Key state management

### Game-Specific Hooks

#### `useGameLogic`
- Game state management
- Score and lives tracking
- Level progression
- High score persistence

#### `useGameAnimation`
- Falling letters animation
- Collision detection
- Visual effects timing

#### `useGameSpawning`
- Letter generation logic
- Difficulty-based spawning
- Keyboard row filtering

## 🎨 Styling and Design

### Tailwind CSS Configuration

The project uses a comprehensive Tailwind setup with:
- Custom gradient classes for metric cards
- Responsive breakpoints
- Animation utilities
- Backdrop blur effects

### Design System

- **Colors**: Blue/indigo primary palette with semantic colors
- **Typography**: System font stack with careful sizing
- **Spacing**: Consistent 4px grid system
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions and micro-interactions

### Responsive Design

- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly interactions**
- **Optimized modal experiences**

## 🔧 API Documentation

### Backend Endpoints

#### Typing Sessions
- `POST /typing-sessions` - Create new session
- `GET /typing-sessions` - Get all sessions
- `GET /typing-sessions/stats` - Get statistics
- `GET /typing-sessions/:id` - Get specific session
- `PATCH /typing-sessions/:id` - Update session
- `DELETE /typing-sessions/:id` - Delete session

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

### Database Schema

```prisma
model TypingSession {
  id                   String   @id @default(cuid())
  text                 String
  userInput            String
  wpm                  Float
  accuracy             Float
  duration             Int
  totalCharacters      Int
  correctCharacters    Int
  incorrectCharacters  Int
  sessionType          String
  difficulty           String
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}
```

## ⌨️ Keyboard Shortcuts

### Global Shortcuts
- `Ctrl+R` - Restart current session
- `F1` - Focus input field
- `Esc` - Return to main menu (in game mode)

### Game Mode Shortcuts
- `Space` - Pause/unpause game
- `Enter` - Start new game
- `1-9` - Quick level selection

### Completion Shortcuts
- `Space` or `Enter` - Restart after completion

## 🧪 Testing

### Frontend Testing
```bash
cd react-query-app
npm test                 # Run unit tests
npm test -- --watch     # Run in watch mode
npm test -- --coverage  # Run with coverage
```

### Backend Testing
```bash
cd Backend/typing-tutor-backend
npm test                 # Run unit tests
npm run test:watch       # Run in watch mode
npm run test:e2e         # Run end-to-end tests
npm run test:cov         # Run with coverage
```

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

#### Database Connection Issues
```bash
# Check MySQL status
brew services list | grep mysql  # macOS
sudo systemctl status mysql      # Linux

# Reset database
cd Backend/typing-tutor-backend
npm run db:reset
```

#### Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Restart TypeScript server in Cursor
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd react-query-app
npm run build           # Create production build
```

### Backend Deployment
```bash
cd Backend/typing-tutor-backend
npm run build           # Compile TypeScript
npm run start:prod      # Start production server
```

### Environment Variables

#### Frontend (`.env`)
```env
REACT_APP_API_URL=http://localhost:3001
```

#### Backend (`.env`)
```env
NODE_ENV=production
PORT=3001
DATABASE_URL="mysql://username:password@localhost:3306/TypingTutor"
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - class-validator for request validation
- **CORS Configuration** - Proper cross-origin resource sharing
- **SQL Injection Protection** - Prisma ORM prevents SQL injection

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and live regions
- **Focus Management** - Proper focus trapping and restoration
- **Color Contrast** - WCAG compliant color combinations
- **Semantic HTML** - Proper heading structure and landmarks

## 📊 Performance Optimizations

### Frontend
- **React.memo** - Component memoization
- **useMemo/useCallback** - Hook optimization
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Optimized assets

### Backend
- **Database Indexing** - Optimized queries
- **Connection Pooling** - Efficient database connections
- **Caching** - Response caching where appropriate

## 🐛 Troubleshooting

### Common Issues

#### Frontend won't start
```bash
# Check if dependencies are installed
npm install

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Backend database connection issues
```bash
# Verify MySQL is running
brew services start mysql  # macOS
sudo systemctl start mysql # Linux

# Check database credentials in .env file
# Regenerate Prisma client
npm run db:generate
```

#### TypeScript errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
npm update @types/react @types/node
```

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use conventional commit messages
- Add tests for new features
- Update documentation
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- NestJS team for the progressive Node.js framework
- Tailwind CSS team for the utility-first CSS framework
- Prisma team for the next-generation ORM

---

**Happy typing! 🎉** 