// API-related type definitions for typing sessions

export interface SessionDTO {
  text: string;
  userInput: string;
  wpm: number;
  accuracy: number;
  duration: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  sessionType: 'practice' | 'game';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface TypingSession {
  id: string;
  userId: string;
  text: string;
  userInput: string;
  wpm: number;
  accuracy: number;
  duration: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  sessionType: 'practice' | 'game';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  createdAt: string;
  updatedAt: string;
}

export interface SessionStats {
  totalSessions: number;
  averageWpm: number;
  averageAccuracy: number;
  bestWpm: number;
  totalPracticeTime: number;
  streakDays: number;
}

export interface SessionFilters {
  sessionType?: 'practice' | 'game';
  difficulty?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SessionsResponse extends PaginatedResponse<TypingSession> {}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

// Hook return types
export interface UseSessionSaverReturn {
  saveSession: (sessionData: SessionDTO) => Promise<void>;
  saving: boolean;
  error: Error | null;
  lastSavedSession: TypingSession | null;
}

export interface UseTypingHistoryReturn {
  sessions: TypingSession[];
  stats: SessionStats;
  loading: boolean;
  error: Error | null;
  page: number;
  totalPages: number;
  filters: SessionFilters;
  setPage: (page: number) => void;
  setFilters: (filters: SessionFilters) => void;
  refetch: () => void;
}