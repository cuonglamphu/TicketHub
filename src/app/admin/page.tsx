'use client';

import { useState, useEffect } from 'react';
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
import { saleService } from '@/services/saleService';
import { userService } from '@/services/userService';
import { Sale } from '@/types/sale';
import { User } from '@/types/user';

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
  const [sales, setSales] = useState<Sale[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesData, usersData] = await Promise.all([
          saleService.getAll(),
          userService.getAll()
        ]);
        setSales(salesData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const calculateStats = () => {
    const totalSales = sales.reduce((sum, sale) => sum + sale.saleTotal, 0);
    const totalTickets = users.reduce((sum, user) => sum + user.totalTickets, 0);
    const fraudUsers = users.filter(user => user.fraud === true).length;

    return [
      { 
        name: 'Total Sales', 
        value: `${totalSales.toLocaleString()}đ`,
        trend: '+12.5%',
        icon: DollarSign,
        isPositive: true,
        details: 'Up from last month'
      },
      { 
        name: 'Active Events', 
        value: sales.length.toString(),
        trend: '+5%',
        icon: Calendar,
        isPositive: true,
        details: '15 upcoming'
      },
      { 
        name: 'Total Users', 
        value: users.length.toString(),
        trend: '-2.3%',
        icon: Users,
        isPositive: false,
        details: `Including ${fraudUsers} fraud users`
      },
      { 
        name: 'Tickets Sold', 
        value: totalTickets.toString(),
        trend: '+8.7%',
        icon: TrendingUp,
        isPositive: true,
        details: '500 this week'
      },
    ];
  };

  const stats = calculateStats();

  const calculatePerformanceMetrics = () => {
    // Group sales by event and calculate total revenue per event
    const eventPerformance = sales.reduce((acc, sale) => {
      sale.purchases.forEach(purchase => {
        const eventName = purchase.eventName;
        acc[eventName] = (acc[eventName] || 0) + purchase.price;
      });
      return acc;
    }, {} as Record<string, number>);

    // Find best and worst performing events
    const events = Object.entries(eventPerformance);
    const bestEvent = events.length ? 
      events.reduce((a, b) => a[1] > b[1] ? a : b)[0] : 
      'No events';
    const worstEvent = events.length ? 
      events.reduce((a, b) => a[1] < b[1] ? a : b)[0] : 
      'No events';

    // Calculate peak sales time (assuming saleDate includes time)
    const hourCounts = sales.reduce((acc, sale) => {
      const hour = new Date(sale.saleDate).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const peakHour = Object.entries(hourCounts).length ?
      Number(Object.entries(hourCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]) :
      0;

    return [
      { 
        label: 'Best Selling Event', 
        value: bestEvent, 
        icon: Award 
      },
      { 
        label: 'Peak Sales Time', 
        value: `${peakHour}:00 - ${peakHour + 2}:00`, 
        icon: Target 
      },
      { 
        label: 'Lowest Performing', 
        value: worstEvent, 
        icon: TrendingDown 
      },
    ];
  };

  const performanceMetrics = calculatePerformanceMetrics();

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiResponse(`Based on current trends and your target of ${targetRevenue}đ:
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