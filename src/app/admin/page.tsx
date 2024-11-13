'use client';

import { useState } from 'react';
import { pixelBorder, pixelFont } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit,
  Target,
  Award,
  TrendingDown
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [targetRevenue, setTargetRevenue] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stats = [
    { 
      name: 'Total Sales', 
      value: '$12,345',
      trend: '+12.5%',
      icon: DollarSign,
      isPositive: true,
      details: 'Up from last month'
    },
    { 
      name: 'Active Events', 
      value: '23',
      trend: '+5%',
      icon: Calendar,
      isPositive: true,
      details: '15 upcoming'
    },
    { 
      name: 'Total Users', 
      value: '1,234',
      trend: '-2.3%',
      icon: Users,
      isPositive: false,
      details: 'Needs attention'
    },
    { 
      name: 'Tickets Sold', 
      value: '5,678',
      trend: '+8.7%',
      icon: TrendingUp,
      isPositive: true,
      details: '500 this week'
    },
  ];

  const performanceMetrics = [
    { label: 'Best Selling Event', value: 'Summer Festival', icon: Award },
    { label: 'Peak Sales Time', value: '6:00 PM - 8:00 PM', icon: Target },
    { label: 'Lowest Performing', value: 'Tech Workshop', icon: TrendingDown },
  ];

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiResponse(`Based on current trends and your target of $${targetRevenue}:
      1. Increase marketing for Tech Workshop events
      2. Consider dynamic pricing during peak hours (6-8 PM)
      3. Focus on user retention strategies
      4. Launch promotional campaign for new users`);
      setIsAnalyzing(false);
    }, 2000);
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 40000],
        backgroundColor: '#FDD835',
        borderColor: '#F57F17',
        borderWidth: 2,
      },
      {
        label: 'Tickets',
        data: [150, 220, 180, 280, 250, 330, 450],
        backgroundColor: '#81C784',
        borderColor: '#2E7D32',
        borderWidth: 2,
        yAxisID: 'tickets',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#FFFFFF',
          font: {
            family: "'Pixelify Sans', sans-serif",
          }
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#FFFFFF',
          font: {
            family: "'Pixelify Sans', sans-serif",
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        }
      },
      x: {
        ticks: {
          color: '#FFFFFF',
          font: {
            family: "'Pixelify Sans', sans-serif",
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#FFFFFF',
          font: {
            family: "'Pixelify Sans', sans-serif",
          }
        }
      },
    },
    cutout: '70%',
    radius: '90%'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FFEB3B]" style={pixelFont}>
          Dashboard Overview
        </h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className={`w-[180px] ${pixelBorder} bg-[#FFEB3B]`}>
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.name} 
            className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-[#FFEB3B]" style={pixelFont}>
                  {stat.name}
                </h3>
                <p className="text-3xl font-bold text-white mt-2" style={pixelFont}>
                  {stat.value}
                </p>
                <p className="text-sm text-[#E8F5E9] mt-1">{stat.details}</p>
              </div>
              <stat.icon className="h-6 w-6 text-[#FFEB3B]" />
            </div>
            <div className="flex items-center mt-4">
              {stat.isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-[#FFEB3B] mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={stat.isPositive ? 'text-[#FFEB3B]' : 'text-red-500'}>
                {stat.trend}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="h-6 w-6 text-[#FFEB3B]" />
          <h2 className="text-xl font-bold text-[#FFEB3B]" style={pixelFont}>
            AI Business Advisor
          </h2>
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            type="number"
            placeholder="Enter revenue target"
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
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label} className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
            <div className="flex items-center gap-2">
              <metric.icon className="h-5 w-5 text-[#FFEB3B]" />
              <h3 className="text-lg font-medium text-[#FFEB3B]" style={pixelFont}>
                {metric.label}
              </h3>
            </div>
            <p className="text-xl font-bold text-white mt-2" style={pixelFont}>
              {metric.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
          <h2 className="text-xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
            Revenue & Tickets Overview
          </h2>
          <Bar data={chartData} options={chartOptions} />
        </Card>

        <Card className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
          <h2 className="text-xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
            Category Distribution
          </h2>
          <Doughnut data={chartData} options={doughnutOptions} />
        </Card>
      </div>
    </div>
  );
}