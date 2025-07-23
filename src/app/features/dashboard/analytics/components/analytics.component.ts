import { MetricItem } from './../models/primeng_charts.interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    ChartModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsDashboardComponent  {
  /** Indicates if the data is currently being loaded. */
  isLoading: boolean = false;

  /** Data for key performance indicators (metrics). */
  keyMetrics: MetricItem[] = [
    {
      label: 'Total Revenue',
      value: '$2.4M',
      icon: 'pi pi-dollar',
      type: 'revenue',
      trend: 12.5
    },
    {
      label: 'Active Projects',
      value: 47,
      icon: 'pi pi-briefcase',
      type: 'projects',
      trend: 8.2
    },
    {
      label: 'Team Members',
      value: 156,
      icon: 'pi pi-users',
      type: 'users',
      trend: -2.1
    },
    {
      label: 'Growth Rate',
      value: '94.2%',
      icon: 'pi pi-chart-line',
      type: 'growth',
      trend: 5.8
    }
  ];

  /** Data for the revenue line chart. */
  revenueChartData: any = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Revenue',
        data: [180, 220, 195, 280, 240, 320, 290, 380],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Target',
        data: [200, 230, 210, 260, 250, 300, 280, 350],
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        fill: false,
        tension: 0.4,
        borderDash: [5, 5],
        pointBackgroundColor: '#ec4899',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  /** Options for the revenue line chart. */
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
            weight: '600'
          }
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        titleFont: {
          weight: '600'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      y: {
        grid: {
          color: '#f3f4f6',
          lineWidth: 1
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            weight: '500'
          },
          callback: function(value: any) {
            return '$' + value + 'K';
          }
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  /** Data for the team performance radar chart. */
  performanceRadarData: any = {
    labels: ['Performance', 'Quality', 'Innovation', 'Collaboration', 'Growth', 'Efficiency'],
    datasets: [
      {
        label: 'Current Quarter',
        data: [85, 92, 78, 88, 76, 90],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 5
      },
      {
        label: 'Previous Quarter',
        data: [78, 85, 72, 82, 71, 85],
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        pointBackgroundColor: '#ec4899',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 5
      }
    ]
  };

  /** Options for the team performance radar chart. */
  radarChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f3f4f6'
        },
        angleLines: {
          color: '#e5e7eb'
        },
        pointLabels: {
          color: '#6b7280',
          font: {
            size: 11,
            weight: '600'
          }
        },
        ticks: {
          display: false
        }
      }
    }
  };

  /** Data for the project distribution doughnut chart. */
  projectDistributionData: any = {
    labels: ['Completed', 'In Progress', 'Planning', 'On Hold', 'Review'],
    datasets: [
      {
        data: [28, 35, 15, 12, 10],
        backgroundColor: [
          '#10b981',
          '#6366f1',
          '#f59e0b',
          '#ef4444',
          '#ec4899'
        ],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff'
      }
    ]
  };

  /** Options for the project distribution doughnut chart. */
  doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
            weight: '600'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    }
  };

  trackByMetric(index: number, metric: MetricItem): string {
    return metric.label;
  }

  getTrendClass(trend: number): string {
    if (trend > 0) return 'trend-positive';
    if (trend < 0) return 'trend-negative';
    return 'trend-neutral';
  }

  getTrendIcon(trend: number): string {
    if (trend > 0) return 'pi pi-arrow-up';
    if (trend < 0) return 'pi pi-arrow-down';
    return 'pi pi-minus';
  }

  getProgressWidth(value: string | number): number {
    if (typeof value === 'string') {
      const numMatch = value.toString().match(/[\d.]+/);
      // For values like '$2.4M', assume max is $10M for 100%. For percentages, it's already %
      return numMatch ? Math.min(parseFloat(numMatch[0]) * (value.includes('%') ? 1 : 10), 100) : 50;
    }
    return Math.min(value, 100);
  }
}