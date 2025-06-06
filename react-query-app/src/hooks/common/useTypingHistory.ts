import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import type { 
  TypingSession, 
  SessionStats, 
  SessionFilters, 
  UseTypingHistoryReturn
} from '../../types/api';

/**
 * Hook to fetch and manage typing session history
 * @returns Object with sessions, stats, pagination, and filtering functionality
 */
export const useTypingHistory = (): UseTypingHistoryReturn => {
  const [sessions, setSessions] = useState<TypingSession[]>([]);
  const [stats, setStats] = useState<SessionStats>({
    totalSessions: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    bestWpm: 0,
    totalPracticeTime: 0,
    streakDays: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<SessionFilters>({});
  const { isAuthenticated } = useAuth();

  // Fetch sessions with pagination and filters
  const fetchSessions = useCallback(async () => {
    console.log('useTypingHistory: isAuthenticated =', isAuthenticated);
    if (!isAuthenticated) {
      console.log('User not authenticated, skipping fetch');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params: any = {
        page,
        limit: 10,
      };

      if (filters.sessionType) {
        params.sessionType = filters.sessionType;
      }
      if (filters.difficulty) {
        params.difficulty = filters.difficulty;
      }
      if (filters.dateFrom) {
        params.dateFrom = filters.dateFrom.toISOString();
      }
      if (filters.dateTo) {
        params.dateTo = filters.dateTo.toISOString();
      }

      // Fetch sessions - backend now returns paginated response
      console.log('Fetching typing sessions with params:', params);
      const limit = params.limit || 10;
      const sessionsResponse = await axios.get<{
        sessions: TypingSession[];
        pagination: {
          total: number;
          currentPage: number;
          totalPages: number;
          limit: number;
        };
      }>('/typing-sessions', { 
        params,
        withCredentials: true 
      });
      
      console.log('Sessions response:', sessionsResponse.data);
      console.log('Response type:', typeof sessionsResponse.data);
      console.log('Is array?', Array.isArray(sessionsResponse.data));
      console.log('Has sessions property?', sessionsResponse.data && 'sessions' in sessionsResponse.data);
      
      // Handle both old array format and new paginated format
      if (Array.isArray(sessionsResponse.data)) {
        // Backend is returning old array format
        console.warn('Backend returning array format, expecting paginated format');
        const allSessions = sessionsResponse.data as TypingSession[];
        
        // Simulate pagination on frontend
        const startIndex = (page - 1) * limit;
        const paginatedSessions = allSessions.slice(startIndex, startIndex + limit);
        
        setSessions(paginatedSessions);
        setTotalPages(Math.ceil(allSessions.length / limit));
      } else if (sessionsResponse.data && Array.isArray(sessionsResponse.data.sessions)) {
        // New paginated format
        setSessions(sessionsResponse.data.sessions);
        
        // Check if pagination exists, otherwise use defaults
        if (sessionsResponse.data.pagination && typeof sessionsResponse.data.pagination.totalPages === 'number') {
          setTotalPages(sessionsResponse.data.pagination.totalPages);
        } else {
          // Fallback: calculate pages based on sessions length
          const estimatedPages = Math.max(1, Math.ceil(sessionsResponse.data.sessions.length / 10));
          setTotalPages(estimatedPages);
          console.warn('Pagination data missing, using estimated pages:', estimatedPages);
        }
      } else {
        // Handle unexpected structure
        console.error('Unexpected API response structure:', sessionsResponse.data);
        setSessions([]);
        setTotalPages(1);
      }

      // Fetch statistics - handle gracefully if endpoint doesn't exist
      try {
        const statsResponse = await axios.get<{
          totalSessions: number;
          averageWpm: number;
          averageAccuracy: number;
          bestWpm: number;
          totalPracticeTime: number;
          streakDays: number;
        }>('/typing-sessions/stats', { withCredentials: true });
        
        if (statsResponse.data) {
          // Backend now provides all stats including totalPracticeTime and streakDays
          setStats({
            totalSessions: statsResponse.data.totalSessions || 0,
            averageWpm: Math.round(statsResponse.data.averageWpm || 0),
            averageAccuracy: Math.round(statsResponse.data.averageAccuracy || 0),
            bestWpm: statsResponse.data.bestWpm || 0,
            totalPracticeTime: statsResponse.data.totalPracticeTime || 0,
            streakDays: statsResponse.data.streakDays || 0,
          });
        }
      } catch (statsErr) {
        // If stats endpoint doesn't exist, use default values
        console.log('Stats endpoint not available, using default values');
        const totalSessions = Array.isArray(sessionsResponse.data) 
          ? sessionsResponse.data.length 
          : (sessionsResponse.data?.pagination?.total || sessions.length || 0);
        setStats({
          totalSessions,
          averageWpm: 0,
          averageAccuracy: 0,
          bestWpm: 0,
          totalPracticeTime: 0,
          streakDays: 0,
        });
      }
    } catch (err: any) {
      let errorMessage = 'Failed to fetch typing history';
      
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        errorMessage = 'Backend server is not running. Please start the backend server.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
      } else if (err.response?.status === 404) {
        errorMessage = 'Typing sessions endpoint not found.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      const error = new Error(errorMessage);
      setError(error);
      console.error('Error fetching typing history:', err);
      
      // Set empty data as fallback
      setSessions([]);
      setTotalPages(1);
      setStats({
        totalSessions: 0,
        averageWpm: 0,
        averageAccuracy: 0,
        bestWpm: 0,
        totalPracticeTime: 0,
        streakDays: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, page, filters]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Update filters and reset to page 1
  const updateFilters = useCallback((newFilters: SessionFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  return {
    sessions,
    stats,
    loading,
    error,
    page,
    totalPages,
    filters,
    setPage,
    setFilters: updateFilters,
    refetch: fetchSessions,
  };
};