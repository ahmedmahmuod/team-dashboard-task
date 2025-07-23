export interface AnalyticsData {
  trends: TrendData[];
}

export interface TrendData {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
}


export interface ChartData {
  labels: string[];
  datasets: TrendData[];
}