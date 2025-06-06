Complete Technical Implementation Plan with Detailed Prompts
Phase 1: Database Schema & Infrastructure Setup
Todo 1.1: Database Schema Implementation
Prompt:
"I need to implement Prisma database schema for a real-time typing race feature. Create the migration with these models:

1. Race table with:
   - Unique 6-character roomCode for sharing
   - Host user reference
   - Sample text reference (300+ words)
   - Status enum: WAITING, STARTING, ACTIVE, COMPLETED
   - Max 5 participants
   - Timestamps for race lifecycle

2. RaceParticipant table with:
   - Position tracking (0-100% completion)
   - Real-time WPM and accuracy
   - Current word index for progress tracking
   - Typed text storage for validation
   - Final rank and total time in milliseconds

Add proper indexes for:
- Quick room code lookups
- Efficient position queries for real-time updates
- Race status filtering

Include cascade delete for participants when race is deleted. Add relations to existing User and SampleText models."

Phase 2: Backend WebSocket Infrastructure
Todo 2.1: Socket.IO Integration with JWT Authentication
Prompt:
"Implement Socket.IO integration in NestJS with JWT authentication middleware:

1. Install dependencies:
   - @nestjs/websockets
   - @nestjs/platform-socket.io
   - socket.io

2. Create WebSocket JWT authentication:
   - Extract JWT from handshake auth
   - Validate token using existing auth service
   - Attach user data to socket
   - Handle authentication failures

3. Configure CORS for WebSocket:
   - Allow localhost:3000 and localhost:5173
   - Enable credentials

4. Create socket exception filter for proper error handling

Provide complete implementation with:
- Custom WsAuthGuard extending from JWT strategy
- Socket authentication middleware
- Proper TypeScript types for authenticated sockets
- Error handling for invalid tokens"
Todo 2.2: Socket Room Lifecycle Management
Prompt:
"Implement comprehensive Socket.IO room management to prevent memory leaks:

1. Room naming convention:
   - Use format: 'race:{roomCode}' for race rooms
   - Separate 'race-lobby:{roomCode}' for waiting phase

2. Memory leak prevention:
   - Track socket-to-race mapping in memory
   - Clean up abandoned rooms after 30 minutes
   - Remove disconnected sockets from tracking
   - Implement room participant count validation

3. Connection state tracking:
   Map<socketId, {
     userId: string,
     raceId: string,
     roomCode: string,
     connectionTime: Date,
     lastActivity: Date
   }>

4. Graceful cleanup on:
   - Socket disconnect
   - Race completion
   - Server shutdown
   - Memory pressure

Include WeakMap for automatic garbage collection where applicable. Create a RoomManager service to handle all room operations."
Todo 2.3: Race Module Architecture
Prompt:
"Create a complete NestJS Race module with proper separation of concerns:

1. Module structure:
   - race.module.ts with all providers and imports
   - race.controller.ts for REST endpoints
   - race.service.ts for business logic
   - race.gateway.ts for WebSocket handling
   - dto/ folder with validation classes
   - types/ folder with interfaces

2. REST Endpoints needed:
   - POST /races/create - Create new race with text selection
   - GET /races/:roomCode - Get race details for joining
   - GET /races/history - Paginated user race history
   - GET /races/:id/results - Get detailed race results

3. DTOs with validation:
   - CreateRaceDto (sampleTextId)
   - JoinRaceDto (roomCode)
   - UpdateProgressDto (position, wpm, accuracy, typedText)

Include proper error handling, input validation, and user authorization checks."

Phase 3: Text Processing & Validation
Todo 3.1: Text Synchronization System
Prompt:
"Implement robust text synchronization and validation system:

1. Text preprocessing:
   - Normalize whitespace (single spaces only)
   - Remove special characters if needed
   - Split into words array for indexing
   - Calculate total character count
   - Generate character position map

2. Progress validation algorithm:
   - Character-by-character comparison
   - Handle backspace/corrections
   - Track error positions
   - Prevent copy-paste cheating
   - Validate sequential progress

3. Data structure:
   interface ProcessedText {
     originalText: string,
     words: string[],
     characterMap: Map<number, {char: string, wordIndex: number}>,
     totalChars: number,
     checkpoints: number[] // Every 10% progress
   }

4. Sync strategy:
   - Send only typed length, not full text
   - Validate on server against expected
   - Return error positions for highlighting
   - Calculate accurate WPM based on correct characters only

Create a TextProcessor service to handle all text operations."

Phase 4: Real-time WebSocket Implementation
Todo 4.1: Race Gateway Core Events
Prompt:
"Implement the RaceGateway class with these WebSocket events:

Server Events (listening):
1. 'join-race': { roomCode: string }
   - Validate room exists and not started
   - Add user to race participants
   - Join socket room
   - Broadcast updated participant list

2. 'leave-race': { raceId: string }
   - Remove from participants if not started
   - Leave socket room
   - Handle host leaving

3. 'start-race': { raceId: string }
   - Verify user is host
   - Update status to STARTING
   - Emit 3-second countdown
   - Change to ACTIVE after countdown

4. 'update-progress': { 
     raceId: string, 
     position: number, 
     wpm: number, 
     accuracy: number,
     currentWordIndex: number,
     typedText: string 
   }
   - Validate progress data
   - Update database
   - Broadcast to room (throttled to 100ms)

5. 'finish-race': { raceId: string, finalStats: {...} }
   - Calculate final rank
   - Update participant record
   - Check if all finished
   - Emit final results

Client Events (emitting):
- 'race-joined': Full race data with participants
- 'participant-updated': Participant joined/left
- 'countdown': { count: number }
- 'race-started': { startTime: Date }
- 'positions-update': All participants' positions
- 'race-completed': Final results

Include proper error handling, room management, and memory cleanup."
Todo 4.2: Race Service Business Logic with Transactions
Prompt:
"Implement RaceService with transaction support for data consistency:

1. createRace(hostUserId: string, sampleTextId: string)
   - Generate unique 6-char alphanumeric roomCode
   - Validate text exists and is 300+ words
   - Use transaction to create race and add host as participant
   - Return race details

2. joinRace(roomCode: string, userId: string)
   - Use transaction with row locking:
     await prisma.$transaction(async (tx) => {
       const race = await tx.race.findUnique({
         where: { roomCode },
         include: { _count: { select: { participants: true } } }
       });
       // Validate and add participant
     });
   - Check max participants not exceeded
   - Prevent duplicate joins

3. startRace(raceId: string, hostUserId: string)
   - Transaction to update race status and all participants
   - Set startedAt timestamp atomically
   - Ensure ACID compliance

4. completeRace(raceId: string, userId: string)
   - Calculate final statistics in transaction
   - Assign ranks based on completion order
   - Handle concurrent finishes with proper locking
   - Update race status if all complete

5. updateParticipantProgress(
     raceId: string, 
     userId: string, 
     progressData: UpdateProgressDto
   )
   - Use optimistic locking for performance
   - Validate progress is sequential
   - Update metrics atomically

Include deadlock prevention strategies and proper isolation levels."

Phase 5: Error Handling & Recovery
Todo 5.1: Comprehensive Error Management System
Prompt:
"Implement robust error handling across the race system:

1. Custom error classes:
   export class RaceFullError extends Error {
     constructor(public roomCode: string) {
       super(`Race ${roomCode} is full`);
     }
   }
   
   - RaceAlreadyStartedError
   - InvalidProgressError
   - RaceNotFoundError
   - UnauthorizedHostError
   - RateLimitError

2. Gateway error handling:
   @UseFilters(new WsExceptionFilter())
   class RaceGateway {
     @SubscribeMessage('join-race')
     async handleJoinRace(@MessageBody() data, @ConnectedSocket() socket) {
       try {
         // Logic
       } catch (error) {
         if (error instanceof RaceFullError) {
           socket.emit('race-error', {
             code: 'RACE_FULL',
             message: error.message,
             suggestions: ['Create new race', 'Try another code']
           });
         }
       }
     }
   }

3. Client error recovery:
   - Automatic reconnection with exponential backoff
   - State restoration from localStorage
   - Graceful degradation UI
   - User-friendly error messages

4. Circuit breaker pattern:
   - Track failure rates per operation
   - Temporary disable features if error rate > 10%
   - Implement health check endpoints
   - Fallback to read-only mode

Create centralized error handler with proper logging and monitoring."

Phase 6: Frontend Implementation
Todo 6.1: Socket Context with Error Recovery
Prompt:
"Create React Socket.IO integration with comprehensive error handling:

1. Socket Context Provider with reconnection:
   const SocketProvider = ({ children }) => {
     const [socket, setSocket] = useState<Socket | null>(null);
     const [connectionState, setConnectionState] = useState
       'connecting' | 'connected' | 'disconnected' | 'error'
     >('connecting');
     
     // Exponential backoff for reconnection
     const reconnectAttempt = useRef(0);
     const reconnectDelay = Math.min(1000 * Math.pow(2, reconnectAttempt.current), 30000);
   };

2. useRaceSocket hook with error handling:
   - Connection lifecycle management
   - Automatic cleanup on unmount
   - Error state management
   - Retry logic for failed operations

3. TypeScript interfaces:
   interface RaceError {
     code: string;
     message: string;
     suggestions?: string[];
     retryable: boolean;
   }

4. Recovery strategies:
   - Queue events during disconnection
   - Replay queued events on reconnection
   - Show connection status UI
   - Fallback to polling if WebSocket fails

Include proper error boundaries and user feedback."
Todo 6.2: Real-time Position Interpolation System
Prompt:
"Implement smooth car position animation with interpolation:

1. Position interpolation engine:
   class PositionInterpolator {
     private targetPositions = new Map<string, number>();
     private currentPositions = new Map<string, number>();
     private velocities = new Map<string, number>();
     private lastUpdateTime = Date.now();
     
     updatePosition(userId: string, targetPos: number) {
       const currentPos = this.currentPositions.get(userId) || 0;
       const velocity = (targetPos - currentPos) / 100; // ms
       this.velocities.set(userId, velocity);
       this.targetPositions.set(userId, targetPos);
     }
     
     animate(deltaTime: number) {
       this.currentPositions.forEach((pos, userId) => {
         const target = this.targetPositions.get(userId) || pos;
         const velocity = this.velocities.get(userId) || 0;
         
         // Smooth interpolation with easing
         const newPos = pos + (velocity * deltaTime * 0.1);
         const easedPos = this.easeOutCubic(pos, target, 0.15);
         
         this.currentPositions.set(userId, Math.min(easedPos, target));
       });
     }
   }

2. React component with RAF:
   useAnimationFrame((deltaTime) => {
     interpolator.animate(deltaTime);
     setCarPositions(new Map(interpolator.getCurrentPositions()));
   });

3. Visual states:
   - Typing: smooth forward movement
   - Paused: gradual deceleration
   - Error: shake animation
   - Finished: celebration animation

4. Performance optimizations:
   - Use CSS transforms only
   - will-change: transform
   - GPU acceleration
   - Batch DOM updates

Include different car colors and highlight current user."
Todo 6.3: Race Components with State Management
Prompt:
"Create complete race component system:

1. RaceTrack visualization:
   - SVG-based track with lanes
   - Car components with smooth transitions
   - Progress markers every 25%
   - Real-time position updates
   - Name labels following cars

2. RaceTyping component with validation:
   const RaceTyping = () => {
     const [typedText, setTypedText] = useState('');
     const [currentWordIndex, setCurrentWordIndex] = useState(0);
     const [errors, setErrors] = useState<Set<number>>(new Set());
     
     const handleKeyPress = (e: KeyboardEvent) => {
       // Character-by-character validation
       // Update position calculation
       // Emit progress updates (throttled)
     };
   };

3. Race state management:
   interface RaceState {
     status: 'waiting' | 'starting' | 'active' | 'completed';
     countdown: number;
     participants: Map<string, Participant>;
     myProgress: Progress;
     raceText: ProcessedText;
   }

4. Component hierarchy:
   - RacePage (route container)
     - RaceLobby (waiting room)
     - RaceCountdown (3-2-1 overlay)
     - RaceContainer (active race)
       - RaceTrack
       - RaceTyping
       - RaceStats
     - RaceResults (final screen)

Use Context API or Zustand for state management."

Phase 7: Session Persistence & Reconnection
Todo 7.1: Reconnection Strategy Implementation
Prompt:
"Implement session persistence and reconnection without encryption:

1. Client session storage:
   interface RaceSession {
     raceId: string;
     roomCode: string;
     userId: string;
     lastPosition: number;
     typedText: string;
     currentWordIndex: number;
     lastUpdateTime: number;
   }
   
   // Save to localStorage
   const saveSession = (session: RaceSession) => {
     localStorage.setItem('activeRace', JSON.stringify(session));
   };

2. Reconnection protocol:
   socket.on('connect', async () => {
     const savedSession = localStorage.getItem('activeRace');
     if (savedSession) {
       const session = JSON.parse(savedSession);
       
       // Validate session age (< 30 seconds)
       if (Date.now() - session.lastUpdateTime < 30000) {
         socket.emit('reconnect-race', {
           raceId: session.raceId,
           lastPosition: session.lastPosition,
           typedText: session.typedText
         });
       }
     }
   });

3. Server-side validation:
   - Verify race still active
   - Check position continuity
   - Validate time gap
   - Restore participant state
   - Broadcast reconnection to others

4. Grace period handling:
   - Mark participant as 'disconnected' not removed
   - Hold position for 30 seconds
   - Show reconnecting status to others
   - Resume from last valid position

Clear session on race completion or manual leave."

Phase 8: Race History Implementation
Todo 8.1: Race History Feature
Prompt:
"Implement complete race history functionality:

1. Backend endpoint with pagination:
   GET /races/history?page=1&limit=10
   
   async getRaceHistory(userId: string, page: number, limit: number) {
     return prisma.race.findMany({
       where: {
         participants: {
           some: { userId }
         }
       },
       include: {
         participants: {
           include: { user: true },
           orderBy: { finalRank: 'asc' }
         },
         sampleText: true
       },
       orderBy: { completedAt: 'desc' },
       skip: (page - 1) * limit,
       take: limit
     });
   }

2. RaceHistory component:
   - Table view with key metrics
   - Your stats: WPM, accuracy, rank, time
   - Winner information
   - Date and duration
   - Click for detailed view

3. RaceDetail modal:
   - Complete participant leaderboard
   - Your detailed performance metrics
   - Text preview (first 100 chars)
   - Comparative stats (your WPM vs winner)
   - Duration and exact timestamp

4. Summary statistics:
   - Total races participated
   - Average WPM across all races
   - Best WPM achieved
   - Win rate percentage
   - Most recent race highlight

Keep the UI clean and focused on essential metrics."

Phase 9: Testing & Production Readiness
Todo 9.1: Comprehensive Testing Strategy
Prompt:
"Implement full testing coverage for the race system:

1. Unit tests for services:
   describe('RaceService', () => {
     it('should create race with unique room code', async () => {
       // Test unique code generation
       // Test collision handling
     });
     
     it('should handle concurrent joins with transaction', async () => {
       // Test race capacity limits
       // Test duplicate join prevention
     });
   });

2. WebSocket integration tests:
   describe('RaceGateway', () => {
     let app: INestApplication;
     let ioClient: Socket;
     
     it('should handle complete race flow', async () => {
       // Connect with auth
       // Create race
       // Join race
       // Start race
       // Update progress
       // Complete race
     });
   });

3. Frontend component tests:
   - Test position interpolation accuracy
   - Test reconnection scenarios
   - Test error state handling
   - Test race state transitions

4. E2E race simulation:
   - Multiple users joining
   - Simultaneous typing
   - Network disruption
   - Race completion

5. Load testing configuration:
   - 20 concurrent races
   - 5 users per race
   - 1000 position updates/second
   - Measure latency and throughput

Include performance benchmarks and acceptance criteria."