'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { 
  Plus, Calendar, Search, 
  ArrowUpDown, Tag, MapPin, Users 
} from 'lucide-react';
import { EventForm } from '@/components/admin/EventForm';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
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

interface Event {
  id: number;
  eventName: string;
  date: string;
  location: string;
  category: string;
  price: string;
  ticketsAvailable: number;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  soldTickets: number;
  revenue: string;
  totalExpenses: number;
  venueId: number;
  catId: number;
  startTime: string;
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };

const sampleEvents: Event[] = [
  {
    id: 1,
    eventName: 'Summer Music Festival',
    date: '2024-07-15',
    location: 'Central Park',
    category: 'Music',
    price: '$50',
    ticketsAvailable: 1000,
    soldTickets: 250,
    revenue: '$12,500',
    status: 'upcoming',
    image: 'https://images.tkbcdn.com/2/1560/600/Upload/eventcover/2024/03/22/26A990.jpg',
    totalExpenses: 5000,
    venueId: 1,
    catId: 1,
    startTime: '2024-07-15T18:00:00'
  },
  // Add more events...
];

const stats = [
  { label: 'Total Events', value: '24', trend: '+12%', icon: Calendar },
  { label: 'Upcoming Events', value: '15', trend: '+5%', icon: ArrowUpDown },
  { label: 'Categories', value: '8', trend: '0%', icon: Tag },
  { label: 'Total Capacity', value: '15.5K', trend: '+8%', icon: Users },
];

type Column<T> = {
  key: keyof T;
  label: string;
  sortable: boolean;
};

const columns: Column<Event>[] = [
  { key: 'eventName' as keyof Event, label: 'Title', sortable: true },
  { key: 'date' as keyof Event, label: 'Date', sortable: true },
  { key: 'location' as keyof Event, label: 'Location', sortable: true },
  { key: 'category' as keyof Event, label: 'Category', sortable: true },
  { key: 'price' as keyof Event, label: 'Price', sortable: true },
  { key: 'ticketsAvailable' as keyof Event, label: 'Tickets', sortable: true },
];

export default function EventsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-[#FFEB3B]" />
            <h1 className="text-3xl font-bold text-[#FFEB3B]" style={pixelFont}>
              Events
            </h1>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className={`${pixelBorder} bg-[#FFEB3B] hover:bg-[#FDD835]`}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card 
              key={stat.label} 
              className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform`}
            >
              <div className="flex justify-between items-start">
                <stat.icon className="h-6 w-6 text-[#FFEB3B]" />
                <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-[#FFEB3B]' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-lg font-medium text-[#FFEB3B] mt-2" style={pixelFont}>
                {stat.label}
              </h3>
              <p className="text-3xl font-bold text-white mt-1" style={pixelFont}>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Controls */}
      <Card className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${pixelBorder} bg-white pl-10`}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className={`w-[180px] ${pixelBorder} bg-[#FFEB3B]`}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className={`w-[180px] ${pixelBorder} bg-[#FFEB3B]`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Content */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className={`${pixelBorder} bg-[#FFEB3B]`}>
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEvents.map((event) => (
              <Card 
                key={event.id} 
                className={`overflow-hidden ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform`}
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.eventName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      event.status === 'upcoming' ? 'bg-[#FFEB3B] text-black' :
                      event.status === 'ongoing' ? 'bg-green-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#FFEB3B] mb-4" style={pixelFont}>
                    {event.eventName}
                  </h3>
                  <div className="space-y-3 text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#FFEB3B]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#FFEB3B]" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#FFEB3B]" />
                      <span>{event.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#FFEB3B]" />
                      <span>{event.soldTickets}/{event.ticketsAvailable} tickets</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#FFEB3B]">{event.price}</span>
                    <Button
                      onClick={() => {
                        setEditingEvent(event);
                        setIsFormOpen(true);
                      }}
                      className="bg-[#FFEB3B] text-black hover:bg-[#FDD835]"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <DataTable
            columns={columns}
            data={sampleEvents}
            onEdit={(event) => {
              setEditingEvent(event);
              setIsFormOpen(true);
            }}
            onDelete={(event) => {
              console.log('Delete event:', event);
            }}
          />
        </TabsContent>
      </Tabs>

      <EventForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(undefined);
        }}
        event={editingEvent}
      />
    </div>
  );
} 