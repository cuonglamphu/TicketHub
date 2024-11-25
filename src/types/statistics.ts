export interface Statistics {
    today: {
      amount: number;
      growthRate: number;
      ticketsSold: number;
      eventCount: number;
    };
    weekly: {
      amount: number;
      growthRate: number;
      ticketsSold: number;
      eventCount: number;
    };
    monthly: {
      amount: number;
      growthRate: number;
      ticketsSold: number;
      eventCount: number;
    };
    predictedNextMonth: {
      amount: number;
      growthRate: number;
      ticketsSold: number;
      eventCount: number;
    };
    quarterForecast: {
      targetAmount: number;
      currentProgress: number;
      progressPercentage: number;
      amountNeeded: number;
      growthRate: number;
      note: string;
    };
    yearEndTarget: {
      targetAmount: number;
      currentProgress: number;
      progressPercentage: number;
      amountNeeded: number;
      growthRate: number;
      note: string;
    };
    growthRate: {
      currentRate: number;
      targetRate: number;
      progress: number;
      status: string;
      change: number;
    };
  }
  