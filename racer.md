## 🏁 Real-Time Typing Speed Racing Game Implementation

### **Project Analysis Summary**
Your current stack:
- **Backend**: NestJS with Prisma ORM, MySQL database, JWT authentication
- **Frontend**: React with TypeScript, React Router, Axios for API calls
- **Current Features**: User authentication, typing sessions, leaderboards, sample texts

### **Implementation Todos & Prompt**

---

## **Phase 1: Database Schema & Backend Foundation**

### **Todo 1: Extend Database Schema**
Add these new models to your `Backend/prisma/schema.prisma`:

```prisma
model Race {
  id                String   @id @default(cuid())
  roomCode          String   @unique @db.VarChar(10) // Short unique code for sharing
  hostUserId        String
  sampleTextId      String
  status            String   @default("waiting") @db.VarChar(20) // waiting, active, finished
  maxParticipants   Int      @default(10)
  startedAt         DateTime?
  finishedAt        DateTime?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  host              User         @relation("HostedRaces", fields: [hostUserId], references: [id])
  sampleText        SampleText   @relation(fields: [sampleTextId], references: [id])
  participants      RaceParticipant[]
  
  @@index([roomCode])
  @@index([status, createdAt])
  @@map("races")
}

model RaceParticipant {
  id                String   @id @default(cuid())
  raceId            String
  userId            String
  joinedAt          DateTime @default(now())
  startedTypingAt   DateTime?
  finishedAt        DateTime?
  currentProgress   Float    @default(0) // 0-100 percentage
  wpm               Int?
  accuracy          Float?
  finalPosition     Int?
  userInput         String?  @db.Text
  
  race              Race     @relation(fields: [raceId], references: [id], onDelete: Cascade)
  user              User     @relation(fields: [userId], references: [id])
  
  @@unique([raceId, userId])
  @@index([raceId, currentProgress])
  @@map("race_participants")
}

// Add to User model
model User {
  // ... existing fields ...
  hostedRaces       Race[]            @relation("HostedRaces")
  raceParticipations RaceParticipant[]
}

// Add to SampleText model  
model SampleText {
  // ... existing fields ...
  races             Race[]
}
```

### **Todo 2: Install WebSocket Dependencies**
```bash
# Backend
cd Backend
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

# Frontend  
cd react-query-app
npm install socket.io-client
```

---

## **Phase 2: Backend WebSocket Implementation**

### **Todo 3: Create Race Module & WebSocket Gateway**

**Create `Backend/src/race/race.module.ts`:**
```typescript
import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { RaceGateway } from './race.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RaceController],
  providers: [RaceService, RaceGateway],
  exports: [RaceService],
})
export class RaceModule {}
```

### **Todo 4: Implement Race WebSocket Gateway**

**Create `Backend/src/race/race.gateway.ts`:**
```typescript
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RaceService } from './race.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  },
})
export class RaceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly raceService: RaceService) {}

  // Handle connection, disconnection, join room, leave room, typing progress, race start, race finish
  // Real-time position updates, participant updates
}
```

### **Todo 5: Implement Race Service & Controller**

**Key methods needed:**
- `createRace(hostUserId, sampleTextId)` - Create new race with unique room code
- `joinRace(roomCode, userId)` - Add participant to race
- `startRace(raceId)` - Begin the race for all participants  
- `updateProgress(raceId, userId, progress, wpm, accuracy)` - Real-time progress updates
- `finishRace(raceId, userId, finalStats)` - Complete race for participant
- `getRaceHistory(userId)` - Get user's race history
- `getRaceDetails(raceId)` - Get race results and stats

---

## **Phase 3: Frontend Implementation**

### **Todo 6: Create Race Components Structure**
```
react-query-app/src/components/race/
├── RaceCreator.tsx          # Create new race
├── RaceJoiner.tsx           # Join race by room code  
├── RaceLobby.tsx            # Waiting room before race starts
├── RaceGame.tsx             # Main racing interface
├── RaceProgress.tsx         # Real-time progress visualization
├── RaceResults.tsx          # Final results and stats
├── RaceHistory.tsx          # User's race history
└── CarIcon.tsx              # Animated car component
```

### **Todo 7: Implement WebSocket Hook**

**Create `react-query-app/src/hooks/useRaceSocket.ts`:**
```typescript
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useRaceSocket = (token: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Connection management, event listeners, cleanup
  // Methods: joinRace, leaveRace, updateProgress, startRace
};
```

### **Todo 8: Create Race Game Interface**

**Key features for `RaceGame.tsx`:**
- Text display with highlighting for current word
- Real-time typing input with validation
- Progress bars for all participants
- Animated car icons showing relative positions
- Live WPM and accuracy calculations
- Timer and race status indicators

---

## **Phase 4: Real-Time Features**

### **Todo 9: Implement Progress Visualization**
- Horizontal race track with percentage-based positioning
- Car icons that move smoothly as users type
- Color-coded progress bars (self vs others)
- Real-time WPM display for each participant
- Position indicators (1st, 2nd, 3rd, etc.)

### **Todo 10: Race State Management**
- Race status: `waiting` → `active` → `finished`
- Participant management (join/leave)
- Progress synchronization across all clients
- Automatic race start when host initiates
- Handle disconnections gracefully

---

## **Phase 5: Advanced Features**

### **Todo 11: Race Results & Statistics**
- Final leaderboard with detailed stats
- Individual performance metrics
- Race replay functionality
- Export results feature
- Social sharing capabilities

### **Todo 12: Race History & Analytics**
- Personal race history dashboard
- Performance trends over time
- Best times and achievements
- Comparison with previous races
- Statistics visualization with charts

---

## **Technical Implementation Notes**

### **WebSocket Events Structure:**
```typescript
// Client → Server
'join-race': { roomCode: string }
'leave-race': { raceId: string }
'typing-progress': { raceId: string, progress: number, wpm: number, accuracy: number }
'start-race': { raceId: string }
'finish-race': { raceId: string, finalStats: object }

// Server → Client  
'race-joined': { race: Race, participants: RaceParticipant[] }
'participant-joined': { participant: RaceParticipant }
'participant-left': { participantId: string }
'race-started': { startTime: Date }
'progress-update': { participantId: string, progress: number, wpm: number }
'race-finished': { results: RaceResult[] }
'error': { message: string }
```

### **Security Considerations:**
- Validate room codes and user permissions
- Rate limiting for progress updates
- Prevent cheating with server-side validation
- Secure WebSocket connections with JWT
- Handle malicious input and edge cases

### **Performance Optimizations:**
- Throttle progress updates (max 10/second)
- Use Redis for race state caching
- Implement connection pooling
- Optimize database queries with proper indexing
- Use WebSocket rooms for efficient broadcasting

---

## **Recommended Implementation Order:**

1. **Database Schema** → **Race Service** → **WebSocket Gateway**
2. **Basic Race Creation/Joining** → **Real-time Progress** → **Race Results**  
3. **Frontend Components** → **WebSocket Integration** → **UI Polish**
4. **Testing & Bug Fixes** → **Performance Optimization** → **Advanced Features**

This comprehensive approach will give you a fully functional real-time typing race game with all the features you specified. Each todo can be implemented incrementally, allowing you to test and iterate as you build.