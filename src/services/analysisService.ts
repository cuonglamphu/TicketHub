import { Statistics } from '@/types/statistics';

export const analysisService = {
  getAiSuggestions(stats: Statistics) {
    return [
      {
        category: 'Revenue Insights',
        suggestions: [
          `Monthly revenue: $${stats.monthly.amount.toLocaleString()}`,
          `Growth rate: ${stats.monthly.growthRate}% this month`,
          `Average revenue per event: $${(stats.monthly.amount / stats.monthly.eventCount).toLocaleString()}`
        ]
      },
      {
        category: 'Performance Metrics',
        suggestions: [
          `${stats.monthly.ticketsSold} tickets sold this month`,
          `${stats.monthly.eventCount} events hosted`,
          `${(stats.monthly.ticketsSold / stats.monthly.eventCount).toFixed(1)} tickets per event`
        ]
      },
      {
        category: 'Recommendations',
        suggestions: [
          stats.growthRate.currentRate < stats.growthRate.targetRate 
            ? 'Increase marketing for upcoming events' 
            : 'Maintain current marketing strategy',
          stats.yearEndTarget.amountNeeded > 0
            ? 'Consider price optimization strategies'
            : 'Focus on customer retention programs',
          stats.monthly.eventCount < 5
            ? 'Increase event frequency to boost revenue'
            : 'Optimize existing event performance'
        ]
      }
    ];
  },

  analyzeTarget(stats: Statistics, targetRevenue: number) {
    const monthlyGrowthNeeded = ((targetRevenue / stats.monthly.amount) - 1) * 100;
    const monthsToTarget = Math.ceil(Math.log(targetRevenue / stats.monthly.amount) / Math.log(1 + (stats.growthRate.currentRate / 100)));

    return `Revenue Growth Analysis:

• Current Performance:
  - Monthly Revenue: $${stats.monthly.amount.toLocaleString()}
  - Current Growth Rate: ${stats.growthRate.currentRate}%
  - Tickets Sold: ${stats.monthly.ticketsSold}

• Target Analysis:
  - Target Revenue: $${targetRevenue.toLocaleString()}
  - Required Growth: ${monthlyGrowthNeeded.toFixed(1)}%
  - Estimated Timeline: ${monthsToTarget} months

• Recommendations:
  ${monthlyGrowthNeeded > stats.growthRate.currentRate 
    ? `- Increase growth rate by ${(monthlyGrowthNeeded - stats.growthRate.currentRate).toFixed(1)}%`
    : '- Current growth rate is sufficient'}
  - ${stats.monthly.eventCount < 5 ? 'Add more events to accelerate growth' : 'Focus on optimizing existing events'}
  - ${stats.yearEndTarget.amountNeeded > 0 ? 'Review pricing strategy' : 'Maintain current pricing'}

• Risk Assessment:
  - Confidence Level: ${monthlyGrowthNeeded <= stats.growthRate.currentRate * 1.5 ? 'High' : 'Moderate'}
  - Key Dependencies: Event frequency, ticket pricing, marketing effectiveness`;
  }
};