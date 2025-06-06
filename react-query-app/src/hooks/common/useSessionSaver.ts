import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import type { SessionDTO, TypingSession, UseSessionSaverReturn } from '../../types/api';

/**
 * Hook to save typing sessions to the backend
 * @returns Object with saveSession function and status indicators
 */
export const useSessionSaver = (): UseSessionSaverReturn => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastSavedSession, setLastSavedSession] = useState<TypingSession | null>(null);
  const { isAuthenticated } = useAuth();

  const saveSession = useCallback(async (sessionData: SessionDTO): Promise<void> => {
    // Only save if user is authenticated
    if (!isAuthenticated) {
      console.log('User not authenticated, skipping session save');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await axios.post<TypingSession>('/typing-sessions', sessionData);
      setLastSavedSession(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to save typing session';
      
      const error = new Error(errorMessage);
      setError(error);
      console.error('Error saving typing session:', err);
      
      // Don't throw the error - let the component handle it gracefully
    } finally {
      setSaving(false);
    }
  }, [isAuthenticated]);

  return {
    saveSession,
    saving,
    error,
    lastSavedSession,
  };
};