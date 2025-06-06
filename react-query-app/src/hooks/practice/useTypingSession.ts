import { useState, useCallback } from 'react';
import axios from 'axios';
import { TypingStats } from '../../types';

interface SaveSessionData {
  text: string;
  userInput: string;
  stats: TypingStats;
  sampleTextId?: string | null;
  difficulty?: string | undefined;
}

export const useTypingSession = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const saveSession = useCallback(async (data: SaveSessionData) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const sessionData = {
        text: data.text,
        userInput: data.userInput,
        wpm: data.stats.wpm,
        accuracy: data.stats.accuracy,
        duration: Math.round(data.stats.time / 1000), // Convert milliseconds to seconds
        totalCharacters: data.stats.totalKeyPresses,
        correctCharacters: data.stats.correctKeyPresses,
        incorrectCharacters: data.stats.totalKeyPresses - data.stats.correctKeyPresses,
        sessionType: 'practice',
        difficulty: data.difficulty,
        sampleTextId: data.sampleTextId,
      };

      await axios.post('/typing-sessions', sessionData);
      return true;
    } catch (error: any) {
      setSaveError(error.response?.data?.message || 'Failed to save typing session');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    saveSession,
    isSaving,
    saveError,
  };
};