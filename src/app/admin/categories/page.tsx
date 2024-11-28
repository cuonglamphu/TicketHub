'use client';

import { useState, useEffect } from 'react';
import { pixelBorder, pixelFont } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { 
  Plus, Folder, BarChart2, 
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
import { Category, CategoryFormData } from '@/types/category';
import { categoryService } from '@/services/categoryService';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data as Category[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (formData: CategoryFormData) => {
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.catId, formData);
      } else {
        await categoryService.create(formData);
      }
      fetchCategories();
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  const getStats = (categories: Category[]) => [
    { 
      label: 'Total Categories', 
      value: categories.length.toString(), 
      icon: Folder 
    },
    { 
      label: 'Active Events', 
      value: categories.reduce((sum, cat) => sum + cat.eventCount, 0).toString(), 
      icon: Calendar 
    },
    { 
      label: 'Upcoming Events', 
      value: categories.reduce((sum, cat) => sum + cat.upcomingEventCount, 0).toString(), 
      icon: Calendar 
    },
    { 
      label: 'Total Revenue', 
      value: `${new Intl.NumberFormat().format(
        categories.reduce((sum, cat) => sum + cat.totalRevenue, 0)
      )}đ`, 
      icon: BarChart2 
    },
  ];

  const stats = getStats(categories);

  const getFilteredCategories = () => {
    return categories
      .filter(category => {
        if (searchTerm && !category.catName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        if (filterStatus !== 'all') {
          const isActive = category.eventCount > 0;
          if (filterStatus === 'active' && !isActive) return false;
          if (filterStatus === 'inactive' && isActive) return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.catName.localeCompare(b.catName);
          case 'eventCount':
            return b.eventCount - a.eventCount;
          case 'revenue':
            return b.totalRevenue - a.totalRevenue;
          default:
            return 0;
        }
      });
  };

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
        {getFilteredCategories().map((category) => (
          <Card 
            key={category.catId}
            className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-[#FFEB3B]" style={pixelFont}>
                {category.catName}
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
                <span>{category.eventCount}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Upcoming:</span>
                <span>{category.upcomingEventCount}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Revenue:</span>
                <span className="flex items-center gap-2">
                  {new Intl.NumberFormat().format(category.totalRevenue)}đ
                </span>
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
        onSubmit={handleSubmit}
      />
    </div>
  );
} 