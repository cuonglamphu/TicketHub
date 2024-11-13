'use client';

import { useState } from 'react';
import { pixelBorder, pixelFont } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { 
  Plus, Folder, Tag, BarChart2, 
  Calendar, Search, Settings2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryForm } from '@/components/admin/CategoryForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: number;
  name: string;
  slug: string;
  eventCount: number;
  activeEvents: number;
  upcomingEvents: number;
  revenue: string;
  trend: string;
  popularTags: string[];
  status: string;
}

const categories = [
  { 
    id: 1, 
    name: 'Music', 
    slug: 'music', 
    eventCount: 15,
    activeEvents: 8,
    upcomingEvents: 7,
    revenue: '$12,345',
    trend: '+15%',
    popularTags: ['concert', 'live', 'band'],
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Sports', 
    slug: 'sports', 
    eventCount: 10,
    activeEvents: 5,
    upcomingEvents: 5,
    revenue: '$8,790',
    trend: '+8%',
    popularTags: ['tournament', 'match', 'league'],
    status: 'active'
  },
  // Add more categories with detailed data
];

export default function CategoriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = [
    { label: 'Total Categories', value: '8', icon: Folder },
    { label: 'Active Events', value: '45', icon: Calendar },
    { label: 'Popular Tags', value: '24', icon: Tag },
    { label: 'Avg. Revenue', value: '$9,876', icon: BarChart2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Folder className="h-8 w-8 text-[#FFEB3B]" />
          <h1 className="text-3xl font-bold text-[#FFEB3B]" style={pixelFont}>
            Categories
          </h1>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className={`${pixelBorder} bg-[#FFEB3B] hover:bg-[#FDD835]`}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform`}
          >
            <div className="flex items-center gap-2">
              <stat.icon className="h-5 w-5 text-[#FFEB3B]" />
              <h3 className="text-lg font-medium text-[#FFEB3B]" style={pixelFont}>
                {stat.label}
              </h3>
            </div>
            <p className="text-2xl font-bold text-white mt-2" style={pixelFont}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${pixelBorder} bg-white pl-10`}
          />
        </div>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className={`w-[180px] ${pixelBorder} bg-[#FFEB3B]`}>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="eventCount">Event Count</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className={`w-[180px] ${pixelBorder} bg-[#FFEB3B]`}>
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-[#FFEB3B]" style={pixelFont}>
                {category.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditingCategory(category);
                  setIsFormOpen(true);
                }}
              >
                <Settings2 className="h-5 w-5 text-[#FFEB3B]" />
              </Button>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-white">
                <span>Active Events:</span>
                <span>{category.activeEvents}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Upcoming:</span>
                <span>{category.upcomingEvents}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Revenue:</span>
                <span className="flex items-center gap-2">
                  {category.revenue}
                  <span className="text-[#FFEB3B]">{category.trend}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {category.popularTags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-[#388E3C] text-white rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCategory(undefined);
        }}
        category={editingCategory}
      />
    </div>
  );
} 