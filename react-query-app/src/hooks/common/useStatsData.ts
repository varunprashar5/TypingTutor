import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { format, subDays, parseISO } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import type {
  StatsData,
  ChartDatasets,
  TimeRange,
  UseStatsDataReturn,
  StatsTrend,
} from '../../types/stats';
import type { TypingSession } from '../../types/api';

const TIME_RANGE_DAYS: Record<TimeRange, number | null> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  '1y': 365,
  'all': null,
};

export const useStatsData = (): UseStatsDataReturn => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const { isAuthenticated } = useAuth();

  const fetchStatsData = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch all sessions (no date filtering on backend)
      const sessionsResponse = await axios.get<TypingSession[]>('/typing-sessions', {
        params: { limit: 1000 },
        withCredentials: true,
      });

      let allSessions: TypingSession[] = [];
      
      // Handle both array and paginated response formats
      if (Array.isArray(sessionsResponse.data)) {
        allSessions = sessionsResponse.data;
      } else if (sessionsResponse.data && 'sessions' in sessionsResponse.data) {
        allSessions = (sessionsResponse.data as any).sessions;
      }

      // Filter sessions by time range on frontend
      const days = TIME_RANGE_DAYS[timeRange];
      let filteredSessions = allSessions;
      
      if (days !== null) {
        const fromDate = subDays(new Date(), days);
        filteredSessions = allSessions.filter(session => {
          const sessionDate = parseISO(session.createdAt);
          return sessionDate >= fromDate;
        });
      }

      // Process filtered sessions to create stats
      const processedStats = processSessionsIntoStats(filteredSessions);
      setStats(processedStats);
    } catch (err: any) {
      console.error('Error fetching stats data:', err);
      setError(new Error(err.response?.data?.message || 'Failed to fetch statistics'));
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, timeRange]);

  useEffect(() => {
    fetchStatsData();
  }, [fetchStatsData]);

  // Process sessions into statistics
  const processSessionsIntoStats = (sessions: TypingSession[]): StatsData => {
    if (sessions.length === 0) {
      return {
        overview: {
          totalSessions: 0,
          totalTimeSpent: 0,
          averageWPM: 0,
          averageAccuracy: 0,
          bestWPM: 0,
          bestAccuracy: 0,
        },
        trends: {
          wpmTrend: [],
          accuracyTrend: [],
        },
        breakdown: {
          bySessionType: {},
          byDifficulty: {},
        },
      };
    }

    // Calculate overview stats
    const totalSessions = sessions.length;
    const totalTimeSpent = sessions.reduce((sum, s) => sum + s.duration, 0);
    const averageWPM = sessions.reduce((sum, s) => sum + s.wpm, 0) / totalSessions;
    const averageAccuracy = sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions;
    const bestWPM = Math.max(...sessions.map(s => s.wpm));
    const bestAccuracy = Math.max(...sessions.map(s => s.accuracy));

    // Calculate trends (group by day)
    const trendsByDay = sessions.reduce((acc, session) => {
      const day = format(parseISO(session.createdAt), 'yyyy-MM-dd');
      if (!acc[day]) {
        acc[day] = { wpmSum: 0, accuracySum: 0, count: 0 };
      }
      acc[day].wpmSum += session.wpm;
      acc[day].accuracySum += session.accuracy;
      acc[day].count += 1;
      return acc;
    }, {} as Record<string, { wpmSum: number; accuracySum: number; count: number }>);

    const sortedDays = Object.keys(trendsByDay).sort();
    const wpmTrend: StatsTrend[] = sortedDays.map(day => {
      const dayData = trendsByDay[day];
      return {
        date: day,
        value: dayData ? Math.round(dayData.wpmSum / dayData.count) : 0,
      };
    });
    const accuracyTrend: StatsTrend[] = sortedDays.map(day => {
      const dayData = trendsByDay[day];
      return {
        date: day,
        value: dayData ? Math.round(dayData.accuracySum / dayData.count * 100) / 100 : 0,
      };
    });

    // Calculate breakdown by session type
    const bySessionType = sessions.reduce((acc, session) => {
      const type = session.sessionType;
      if (!acc[type]) {
        acc[type] = { count: 0, wpmSum: 0, accuracySum: 0, timeSum: 0 };
      }
      acc[type].count += 1;
      acc[type].wpmSum += session.wpm;
      acc[type].accuracySum += session.accuracy;
      acc[type].timeSum += session.duration;
      return acc;
    }, {} as Record<string, { count: number; wpmSum: number; accuracySum: number; timeSum: number }>);

    const sessionTypeBreakdown = Object.entries(bySessionType).reduce((acc, [type, data]) => {
      acc[type] = {
        count: data.count,
        averageWPM: Math.round(data.wpmSum / data.count),
        averageAccuracy: Math.round(data.accuracySum / data.count * 100) / 100,
        totalTime: data.timeSum,
      };
      return acc;
    }, {} as Record<string, any>);

    // Calculate breakdown by difficulty
    const byDifficulty = sessions.reduce((acc, session) => {
      const difficulty = session.difficulty || 'unknown';
      if (!acc[difficulty]) {
        acc[difficulty] = { count: 0, wpmSum: 0, accuracySum: 0, timeSum: 0 };
      }
      acc[difficulty].count += 1;
      acc[difficulty].wpmSum += session.wpm;
      acc[difficulty].accuracySum += session.accuracy;
      acc[difficulty].timeSum += session.duration;
      return acc;
    }, {} as Record<string, { count: number; wpmSum: number; accuracySum: number; timeSum: number }>);

    const difficultyBreakdown = Object.entries(byDifficulty).reduce((acc, [difficulty, data]) => {
      acc[difficulty] = {
        count: data.count,
        averageWPM: Math.round(data.wpmSum / data.count),
        averageAccuracy: Math.round(data.accuracySum / data.count * 100) / 100,
        totalTime: data.timeSum,
      };
      return acc;
    }, {} as Record<string, any>);

    return {
      overview: {
        totalSessions,
        totalTimeSpent,
        averageWPM: Math.round(averageWPM),
        averageAccuracy: Math.round(averageAccuracy * 100) / 100,
        bestWPM,
        bestAccuracy: Math.round(bestAccuracy * 100) / 100,
      },
      trends: {
        wpmTrend,
        accuracyTrend,
      },
      breakdown: {
        bySessionType: sessionTypeBreakdown,
        byDifficulty: difficultyBreakdown,
      },
    };
  };

  // Convert stats to chart data format
  const chartData = useMemo<ChartDatasets | null>(() => {
    if (!stats) return null;

    // WPM trend chart
    const wpmChart = {
      labels: stats.trends.wpmTrend.map(t => format(parseISO(t.date), 'MMM d')),
      datasets: [{
        label: 'Words Per Minute',
        data: stats.trends.wpmTrend.map(t => t.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      }],
    };

    // Accuracy trend chart
    const accuracyChart = {
      labels: stats.trends.accuracyTrend.map(t => format(parseISO(t.date), 'MMM d')),
      datasets: [{
        label: 'Accuracy %',
        data: stats.trends.accuracyTrend.map(t => t.value),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
        fill: true,
      }],
    };

    // Session type breakdown chart
    const sessionTypes = Object.keys(stats.breakdown.bySessionType);
    const sessionTypeChart = {
      labels: sessionTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1)),
      datasets: [{
        label: 'Sessions by Type',
        data: sessionTypes.map(type => {
          const typeData = stats.breakdown.bySessionType[type];
          return typeData ? typeData.count : 0;
        }),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(99, 102, 241)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 2,
      }],
    };

    // Difficulty breakdown chart
    const difficulties = Object.keys(stats.breakdown.byDifficulty);
    const difficultyChart = {
      labels: difficulties.map(d => d.charAt(0).toUpperCase() + d.slice(1)),
      datasets: [{
        label: 'Average WPM by Difficulty',
        data: difficulties.map(d => {
          const diffData = stats.breakdown.byDifficulty[d];
          return diffData ? diffData.averageWPM : 0;
        }),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
      }],
    };

    return {
      wpmChart,
      accuracyChart,
      sessionTypeChart,
      difficultyChart,
    };
  }, [stats]);

  return {
    stats,
    chartData,
    loading,
    error,
    timeRange,
    setTimeRange,
    refetch: fetchStatsData,
  };
};