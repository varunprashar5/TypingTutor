export interface StatsOverview {
  totalSessions: number;
  totalTimeSpent: number;
  averageWPM: number;
  averageAccuracy: number;
  bestWPM: number;
  bestAccuracy: number;
}

export interface StatsTrend {
  date: string;
  value: number;
}

export interface StatsTrends {
  wpmTrend: StatsTrend[];
  accuracyTrend: StatsTrend[];
}

export interface SessionTypeBreakdown {
  count: number;
  averageWPM: number;
  averageAccuracy: number;
  totalTime: number;
}

export interface StatsBreakdown {
  bySessionType: Record<string, SessionTypeBreakdown>;
  byDifficulty: Record<string, SessionTypeBreakdown>;
}

export interface StatsData {
  overview: StatsOverview;
  trends: StatsTrends;
  breakdown: StatsBreakdown;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string | string[];
  backgroundColor: string | string[];
  tension?: number;
  fill?: boolean;
  borderWidth?: number;
}

export interface ChartDatasets {
  wpmChart: {
    labels: string[];
    datasets: ChartDataset[];
  };
  accuracyChart: {
    labels: string[];
    datasets: ChartDataset[];
  };
  sessionTypeChart: {
    labels: string[];
    datasets: ChartDataset[];
  };
  difficultyChart: {
    labels: string[];
    datasets: ChartDataset[];
  };
}

export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

export interface UseStatsDataReturn {
  stats: StatsData | null;
  chartData: ChartDatasets | null;
  loading: boolean;
  error: Error | null;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  refetch: () => void;
}