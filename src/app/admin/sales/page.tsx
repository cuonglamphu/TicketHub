'use client';

import { useState } from 'react';
import { pixelBorder, pixelFont } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { 
  DollarSign, TrendingUp, BrainCircuit
  ,
  TrendingDown, 
   Download
} from 'lucide-react';
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

export default function SalesPage() {
  const [dateRange, setDateRange] = useState('week');
  const [targetRevenue, setTargetRevenue] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stats = [
    { label: 'Today Sales', value: '$1,234', trend: '+12%' },
    { label: 'Weekly Sales', value: '$8,456', trend: '+8%' },
    { label: 'Monthly Sales', value: '$32,789', trend: '+15%' },
    { label: 'Predicted Next Month', value: '$35,500', trend: '+8%' },
  ];

  const predictions = [
    { 
      label: 'Q2 2024 Forecast', 
      value: '$120,000', 
      confidence: '85%',
      trend: '+12%',
      details: 'Based on current growth rate',
      status: 'positive'
    },
    { 
      label: 'Year-End Target', 
      value: '$500,000', 
      progress: '45%',
      trend: '+8%',
      details: 'Need $275,000 more to reach goal',
      status: 'warning'
    },
    { 
      label: 'Growth Rate', 
      value: '+15%', 
      progress: '45%',
      trend: '+3%',
      details: 'Exceeding quarterly projection',
      status: 'positive'
    },
  ];


  const aiSuggestions = [
    {
      category: 'Pricing Strategy',
      suggestions: [
        'Implement dynamic pricing for weekend events',
        'Bundle deals for group purchases',
        'Early bird discounts showing good results'
      ]
    },
    {
      category: 'Risk Management',
      suggestions: [
        'Monitor 3 events with declining sales',
        'Review pricing for Tech workshops',
        'Consider rescheduling low-performing events'
      ]
    },
    {
      category: 'Growth Opportunities',
      suggestions: [
        'Expand music festival capacity',
        'Add more weekend events',
        'Launch corporate packages'
      ]
    }
  ];

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Based on current trends and your target of $${targetRevenue}:
      1. Increase ticket prices by 10% for premium events
      2. Focus marketing on weekends (highest conversion rate)
      3. Consider bundle deals for group purchases
      4. Optimize pricing for off-peak events`);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleExportData = () => {
    // Implement CSV export functionality
    console.log('Exporting data...');
  };


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
            onClick={handleExportData}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card 
                key={stat.label} 
                className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform cursor-pointer`}
              >
                <h3 className="text-lg font-medium text-[#FFEB3B]" style={pixelFont}>
                  {stat.label}
                </h3>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-3xl font-bold text-white" style={pixelFont}>
                    {stat.value}
                  </p>
                  <span className="text-[#FFEB3B]">{stat.trend}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predictions.map((pred) => (
              <Card 
                key={pred.label} 
                className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform`}
              >
                <h3 className="text-lg font-medium text-[#FFEB3B]" style={pixelFont}>
                  {pred.label}
                </h3>
                <div className="mt-2">
                  <div className="flex justify-between items-baseline">
                    <p className="text-3xl font-bold text-white" style={pixelFont}>
                      {pred.value}
                    </p>
                    <span className="text-[#FFEB3B]">
                      {pred.confidence || pred.progress || pred.status}
                    </span>
                  </div>
                  {pred.progress && (
                    <Progress value={parseInt(pred.progress)} className="mt-2" />
                  )}
                  <p className="text-sm text-[#E8F5E9] mt-2">{pred.details}</p>
                  <div className="flex items-center mt-2">
                    {pred.trend.startsWith('+') ? (
                      <TrendingUp className="h-4 w-4 text-[#FFEB3B] mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={pred.trend.startsWith('+') ? 'text-[#FFEB3B]' : 'text-red-500'}>
                      {pred.trend}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="h-6 w-6 text-[#FFEB3B]" />
              <h2 className="text-xl font-bold text-[#FFEB3B]" style={pixelFont}>
                AI Revenue Advisor
              </h2>
            </div>
            <div className="flex gap-4 mb-4">
              <Input
                type="number"
                placeholder="Enter target revenue"
                value={targetRevenue}
                onChange={(e) => setTargetRevenue(e.target.value)}
                className="bg-white"
              />
              <Button
                onClick={handleAiAnalysis}
                className={`${pixelBorder} bg-[#FFEB3B] hover:bg-[#FDD835]`}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Get AI Insights'}
              </Button>
            </div>
            {aiResponse && (
              <div className="bg-white p-4 rounded-lg whitespace-pre-line">
                {aiResponse}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {aiSuggestions.map((section) => (
                <div key={section.category} className="bg-[#388E3C] p-4 rounded-lg">
                  <h4 className="text-[#FFEB3B] font-medium mb-2" style={pixelFont}>
                    {section.category}
                  </h4>
                  <ul className="space-y-2 text-white">
                    {section.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FFEB3B]">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 