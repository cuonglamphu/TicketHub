import { Statistics } from '@/types/statistics';

export const statisticsService = {
  async getStatistics(): Promise<Statistics> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Statistics`);
      if (!response.ok) throw new Error('Failed to fetch statistics');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch statistics data');
    }
  },

  calculatePredictions(stats: Statistics) {
    const quarterProgress = this.calculateProgress(stats.quarterForecast);
    const yearProgress = this.calculateProgress(stats.yearEndTarget);
    const growthStatus = this.analyzeGrowthRate(stats.growthRate);

    return [
      { 
        label: 'Quarter Forecast', 
        value: `$${stats.quarterForecast.currentProgress.toLocaleString()}`,
        progress: quarterProgress.progressPercentage,
        trend: `${this.formatTrend(stats.quarterForecast.growthRate)}`,
        details: this.generateForecastDetails(stats.quarterForecast),
        status: quarterProgress.status
      },
      { 
        label: 'Year-End Target', 
        value: `$${stats.yearEndTarget.currentProgress.toLocaleString()}`,
        progress: yearProgress.progressPercentage,
        trend: `${this.formatTrend(stats.yearEndTarget.growthRate)}`,
        details: this.generateForecastDetails(stats.yearEndTarget),
        status: yearProgress.status
      },
      { 
        label: 'Growth Rate', 
        value: `${stats.growthRate.currentRate.toFixed(1)}%`,
        progress: growthStatus.progressPercentage,
        trend: `${this.formatTrend(stats.growthRate.change)}`,
        details: growthStatus.message,
        status: growthStatus.status
      }
    ];
  },

   calculateProgress(forecast: any) {
    const percentage = (forecast.currentProgress / forecast.targetAmount) * 100;
    return {
      progressPercentage: Math.min(percentage, 100).toFixed(1),
      status: this.determineStatus(percentage)
    };
  },

   analyzeGrowthRate(growth: any) {
    const percentage = (growth.currentRate / growth.targetRate) * 100;
    return {
      progressPercentage: Math.min(percentage, 100).toFixed(1),
      status: this.determineStatus(percentage),
      message: this.generateGrowthMessage(growth)
    };
  },

   determineStatus(percentage: number): string {
    if (percentage >= 100) return 'positive';
    if (percentage >= 75) return 'warning';
    return 'negative';
  },

   formatTrend(value: number): string {
    return value >= 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`;
  },

   generateForecastDetails(forecast: any): string {
    const remaining = forecast.targetAmount - forecast.currentProgress;
    const timeLeft = this.calculateTimeLeft(forecast.endDate);
    
    if (remaining <= 0) {
      return `Target achieved! Exceeding by $${Math.abs(remaining).toLocaleString()}`;
    }

    return `$${remaining.toLocaleString()} needed in ${timeLeft}`;
  },

   generateGrowthMessage(growth: any): string {
    const diff = growth.currentRate - growth.targetRate;
    if (diff >= 0) {
      return `Exceeding target by ${diff.toFixed(1)}%`;
    }
    return `${Math.abs(diff).toFixed(1)}% below target rate`;
  },

  calculateTimeLeft(endDate: string): string {
    const end = new Date(endDate);
    const now = new Date();
    const days = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (days > 30) {
      const months = Math.ceil(days / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    }
    return `${days} day${days > 1 ? 's' : ''}`;
  }
};