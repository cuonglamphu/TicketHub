'use client';

import { useState, useEffect } from 'react';
import { Event, CreateEventDto } from '@/types/event';
import { eventService } from '@/services/eventService';
import { categoryService } from '@/services/categoryService';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Search } from 'lucide-react';
import { EventForm } from '@/components/admin/EventForm';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { pixelBorder, pixelFont } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  catId: number;
  catName: string;
}
interface Column<T> {
  key: keyof T;
  label: string;
  sortable: boolean;
  className?: string;
  render?: (item: T) => React.ReactNode;
}
const columns: Column<Event>[] = [
  { 
    key: 'eveName', 
    label: 'Event Name', 
    sortable: true,
    className: 'text-lg font-medium text-white'
  },
  { 
    key: 'eveTimestart', 
    label: 'Start Time', 
    sortable: true,
    className: 'text-base text-white',
    render: (event: Event) => new Date(event.eveTimestart).toLocaleString()
  },
  { 
    key: 'eveTimeend', 
    label: 'End Time', 
    sortable: true,
    className: 'text-base text-white',
    render: (event: Event) => new Date(event.eveTimeend).toLocaleString()
  },
  { 
    key: 'eveCity', 
    label: 'City', 
    sortable: true,
    className: 'text-base text-white'
  },
];


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ ,setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [eventsData, categoriesData] = await Promise.all([
        eventService.getAll(),
        categoryService.getAll()
      ]);
      setEvents(eventsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: CreateEventDto) => {
    try {
      if (editingEvent) {
        await eventService.update(editingEvent.eveId, formData);
      } else {
        await eventService.create(formData);
      }
      fetchInitialData();
      setIsFormOpen(false);
      setEditingEvent(undefined);
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  const handleDelete = async (event: Event) => {
    try {
      await eventService.delete(event.eveId);
      fetchInitialData();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eveName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.eveCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.catId.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-8 w-8 text-[#FFEB3B]" />
          <h1 className="text-3xl font-bold text-[#FFEB3B]" style={pixelFont}>
            Events Management
          </h1>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className={`${pixelBorder} bg-[#FFEB3B] hover:bg-[#FDD835] text-black`}
          style={pixelFont}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      {/* Filters */}
      <Card className={`p-4 ${pixelBorder} bg-[#4CAF50]`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${pixelBorder} bg-white`}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className={`w-[200px] ${pixelBorder} bg-[#FFEB3B]`}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.catId} value={category.catId.toString()}>
                  {category.catName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredEvents}
        onEdit={(event) => {
          setEditingEvent(event);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <EventForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(undefined);
        }}
        event={editingEvent}
        onSubmit={handleSubmit}
      />
    </div>
  );
} 