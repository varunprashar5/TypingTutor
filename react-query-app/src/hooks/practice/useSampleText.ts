import { useState } from 'react';
import axios from 'axios';
import { Difficulty, KeyboardRow } from '../../components/typing-tutor/practice/DifficultySelector';

interface SampleText {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  keyboardRow: string;
  includesNumbers: boolean;
  includesSpecialChars: boolean;
  characterCount: number;
  wordCount: number;
}

export const useSampleText = () => {
  const [sampleText, setSampleText] = useState<SampleText | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSampleText = async (difficulty: Difficulty, keyboardRow: KeyboardRow) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('/sample-texts/random', {
        params: {
          difficulty,
          keyboardRow,
        },
      });

      if (response.data && typeof response.data === 'object' && 'id' in response.data) {
        setSampleText(response.data as SampleText);
      } else {
        setError('No sample text found for the selected criteria');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch sample text');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSampleText = () => {
    setSampleText(null);
  };

  return {
    sampleText,
    isLoading,
    error,
    fetchSampleText,
    clearSampleText,
  };
};