'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { pixelBorder, pixelFont } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { 
  DollarSign, TrendingUp, BrainCircuit, TrendingDown, Download 
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Sale } from '@/types/sale';
import { Statistics } from '@/types/statistics';  
import { saleService } from '@/services/saleService';
import { statisticsService } from '@/services/statisticsService';
import { analysisService } from '@/services/analysisService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);


interface Column<T> {
  key: keyof T;
  label: string;
  sortable: boolean;
  render?: (item: T) => React.ReactNode;
}

interface Prediction {
  label: string;
  value: string;
  progress: string;
  trend: string;
  details: string;
  status: string;
}

interface AiSuggestion {
  category: string;
  suggestions: string[];
}

interface SalesMetric {
  label: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  status: 'positive' | 'negative' | 'neutral';
  subText: string;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('week');
  const [targetRevenue, setTargetRevenue] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [salesData, statsData] = await Promise.all([
        saleService.getAll(),
        statisticsService.getStatistics()
      ]);

      setSales(salesData);
      setStats(statsData);
      setPredictions(statisticsService.calculatePredictions(statsData));
      setAiSuggestions(analysisService.getAiSuggestions(statsData));
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAiAnalysis = async () => {
    if (!targetRevenue || !stats) {
      toast.error('Please enter a target revenue');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = analysisService.analyzeTarget(stats, parseFloat(targetRevenue));
      setAiResponse(analysis);
    } catch (error) {
      toast.error('Failed to analyze data');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const columns: Column<Sale>[] = [
    { 
      key: 'saleId',
      label: 'Sale ID',
      sortable: true 
    },
    { 
      key: 'userName',
      label: 'Customer',
      sortable: true 
    },
    { 
      key: 'saleDate',
      label: 'Date',
      sortable: true,
      render: (sale: Sale) => new Date(sale.saleDate).toLocaleDateString()
    },
    { 
      key: 'saleTotal',
      label: 'Total',
      sortable: true,
      render: (sale: Sale) => `$${sale.saleTotal.toLocaleString()}`
    },
    {
      key: 'purchases',
      label: 'Items',
      sortable: false,
      render: (sale: Sale) => sale.purchases.length
    }
  ];

  const calculateSalesMetrics = (stats: Statistics): SalesMetric[] => {
    return [
      {
        label: 'Today Sales',
        value: `$${stats.today.amount.toLocaleString()}`,
        trend: stats.today.growthRate,
        icon: <DollarSign className="h-6 w-6" />,
        status: stats.today.growthRate >= 0 ? 'positive' : 'negative',
        subText: `${stats.today.ticketsSold} tickets sold today`
      },
      {
        label: 'Weekly Revenue',
        value: `$${stats.weekly.amount.toLocaleString()}`,
        trend: stats.weekly.growthRate,
        icon: <TrendingUp className="h-6 w-6" />,
        status: stats.weekly.growthRate >= 0 ? 'positive' : 'negative',
        subText: `${stats.weekly.eventCount} events this week`
      },
      {
        label: 'Monthly Growth',
        value: `$${stats.monthly.amount.toLocaleString()}`,
        trend: stats.monthly.growthRate,
        icon: <BrainCircuit className="h-6 w-6" />,
        status: stats.monthly.growthRate >= 0 ? 'positive' : 'negative',
        subText: `${stats.monthly.eventCount} total events`
      },
      {
        label: 'Ticket Sales',
        value: stats.monthly.ticketsSold.toString(),
        trend: ((stats.monthly.ticketsSold - stats.weekly.ticketsSold) / stats.weekly.ticketsSold) * 100,
        icon: <TrendingDown className="h-6 w-6" />,
        status: 'neutral',
        subText: `${(stats.monthly.ticketsSold / stats.monthly.eventCount).toFixed(0)} avg per event`
      }
    ];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Marketing':
        return <TrendingUp className="h-24 w-24 text-[#FFEB3B]" />;
      case 'Operations':
        return <BrainCircuit className="h-24 w-24 text-[#FFEB3B]" />;
      case 'Finance':
        return <DollarSign className="h-24 w-24 text-[#FFEB3B]" />;
      default:
        return null;
    }
  };

  const parseAiResponse = (response: string) => {
    const sections = response.split('\n\n');
    return sections.map(section => {
      const [title, ...items] = section.split('\n');
      return {
        title: title.replace(/^[0-9]+\./, ''),
        items: items.map(item => item.replace(/^• /, ''))
      };
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DollarSign className="h-8 w-8 text-[#FFEB3B]" />
          <h1 className="text-3xl font-bold text-[#FFEB3B]" style={pixelFont}>
            Sales Analytics
          </h1>
        </div>
        <div className="flex gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className={`w-[180px] ${pixelBorder} bg-[#FFEB3B]`}>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            className={`${pixelBorder} bg-[#FFEB3B]`}
            onClick={() => console.log('Exporting...')}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`${pixelBorder} bg-[#4CAF50] p-1`}>
          <TabsTrigger 
            value="overview"
            className="text-[#FFEB3B] data-[state=active]:bg-[#388E3C]"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="predictions"
            className="text-[#FFEB3B] data-[state=active]:bg-[#388E3C]"
          >
            Predictions
          </TabsTrigger>
          <TabsTrigger 
            value="analysis"
            className="text-[#FFEB3B] data-[state=active]:bg-[#388E3C]"
          >
            AI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats && calculateSalesMetrics(stats).map((metric) => (
              <Card 
                key={metric.label} 
                className={`group relative overflow-hidden ${pixelBorder} bg-gradient-to-br from-[#4CAF50] to-[#388E3C] hover:from-[#388E3C] hover:to-[#2E7D32] transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Large Icon Watermark */}
                <div className="absolute -right-4 -top-4 opacity-10 transform rotate-12 group-hover:rotate-0 transition-all duration-500">
                  {React.cloneElement(metric.icon as React.ReactElement, {
                    className: "w-24 h-24"
                  })}
                </div>

                <div className="p-6 relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                      {React.cloneElement(metric.icon as React.ReactElement, {
                        className: `h-5 w-5 ${
                          metric.status === 'positive' ? 'text-[#A5D6A7]' : 
                          metric.status === 'negative' ? 'text-[#FFCDD2]' : 
                          'text-[#FFE082]'
                        }`
                      })}
                    </div>
                    <h3 className="text-lg font-medium text-[#E8F5E9]" style={pixelFont}>
                      {metric.label}
                    </h3>
                  </div>

                  {/* Value and Subtext */}
                  <div className="mb-4">
                    <h4 className="text-3xl font-bold text-white tracking-tight" style={pixelFont}>
                      {metric.value}
                    </h4>
                    <p className="text-sm text-[#C8E6C9] mt-1.5">{metric.subText}</p>
                  </div>

                  {/* Trend Indicator */}
                  <div className="flex items-center gap-2">
                    <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1 ${
                      metric.status === 'positive' ? 'bg-[#1B5E20] text-[#A5D6A7]' : 
                      metric.status === 'negative' ? 'bg-[#B71C1C] text-[#FFCDD2]' : 
                      'bg-[#F57F17] text-[#FFE082]'
                    }`}>
                      {metric.trend >= 0 ? '↑' : '↓'} {Math.abs(metric.trend).toFixed(1)}%
                    </div>
                    <span className="text-[#E8F5E9] text-xs">vs previous</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className={`${pixelBorder} bg-[#4CAF50] p-4`}>
            <DataTable<Sale>
              columns={columns}
              data={sales}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predictions.map((prediction) => (
              <Card 
                key={prediction.label} 
                className={`p-6 ${pixelBorder} bg-[#4CAF50]`}
              >
                <h3 className="text-lg font-medium text-[#FFEB3B]" style={pixelFont}>
                  {prediction.label}
                </h3>
                <p className="text-3xl font-bold text-white mt-2" style={pixelFont}>
                  {prediction.value}
                </p>
                <div className="mt-4">
                  <Progress value={parseInt(prediction.progress)} />
                </div>
                <p className="text-sm text-[#A5D6A7] mt-2">
                  {prediction.details}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiSuggestions.map((category) => (
                <Card 
                  key={category.category} 
                  className={`relative overflow-hidden ${pixelBorder} bg-gradient-to-br from-[#4CAF50] to-[#388E3C] hover:from-[#388E3C] hover:to-[#2E7D32] transition-all duration-300`}
                >
                  {/* Category Icon Background */}
                  <div className="absolute -right-6 -top-6 opacity-5">
                    <div className="w-24 h-24">
                      {getCategoryIcon(category.category)}
                    </div>
                  </div>

                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-medium text-[#FFEB3B] mb-4" style={pixelFont}>
                      {category.category}
                    </h3>
                    <ul className="space-y-3">
                      {category.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-[#E8F5E9]">
                          <span className="text-[#FFEB3B] mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

            <Card className={`${pixelBorder} bg-gradient-to-br from-[#4CAF50] to-[#388E3C] p-6`}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-[#FFEB3B] mb-4" style={pixelFont}>
                    Revenue Target Analysis
                  </h3>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      placeholder="Enter target revenue"
                      value={targetRevenue}
                      onChange={(e) => setTargetRevenue(e.target.value)}
                      className={`${pixelBorder} bg-white/90 backdrop-blur-sm`}
                    />
                    <Button
                      onClick={() => handleAiAnalysis()}
                      disabled={isAnalyzing}
                      className={`${pixelBorder} bg-[#FFEB3B] hover:bg-[#FDD835] text-black min-w-[120px]`}
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                          Analyzing...
                        </div>
                      ) : (
                        'Analyze'
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {aiResponse && (
                <div className="mt-6 p-4 bg-[#1B5E20] rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {parseAiResponse(aiResponse).map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-[#FFEB3B] font-medium" style={pixelFont}>
                          {section.title}
                        </h4>
                        <ul className="space-y-1">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="text-[#E8F5E9] text-sm flex items-start gap-2">
                              <span className="text-[#FFEB3B] mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 