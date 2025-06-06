import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
  LeaderboardResponse,
  UserRankSummary,
  LeaderboardFilters,
  LeaderboardPeriod,
  LeaderboardCategory,
} from '../types/leaderboard';

export const useLeaderboard = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<LeaderboardFilters>({
    period: LeaderboardPeriod.DAILY,
    category: LeaderboardCategory.OVERALL,
    page: 1,
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null);
  const [userSummary, setUserSummary] = useState<UserRankSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        period: filters.period,
        category: filters.category,
        page: filters.page.toString(),
        limit: '20',
        ...(filters.search && { search: filters.search }),
      });

      const response = await axios.get<LeaderboardResponse>(
        `/leaderboard?${params}`
      );
      setLeaderboard(response.data);
    } catch (err) {
      setError('Failed to fetch leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchUserSummary = useCallback(async () => {
    if (!user) return;

    try {
      const response = await axios.get<UserRankSummary>('/leaderboard/user-summary');
      setUserSummary(response.data);
    } catch (err) {
      console.error('Error fetching user summary:', err);
    }
  }, [user]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    fetchUserSummary();
  }, [fetchUserSummary]);

  const updateFilters = useCallback((newFilters: Partial<LeaderboardFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.period !== prev.period || newFilters.category !== prev.category ? 1 : newFilters.page || prev.page,
    }));
  }, []);

  const refresh = useCallback(() => {
    fetchLeaderboard();
    if (user) fetchUserSummary();
  }, [fetchLeaderboard, fetchUserSummary, user]);

  return {
    leaderboard,
    userSummary,
    filters,
    loading,
    error,
    updateFilters,
    refresh,
  };
};