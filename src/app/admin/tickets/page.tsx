'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Plus, Ticket, Search, Grid, List, Tag, Users } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pixelBorder, pixelFont } from "@/lib/utils";
import { TicketForm } from '@/components/admin/TicketForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Ticket {
  id: number;
  eventId: number;
  eventName: string;
  type: string;
  price: string;
  available: number;
  sold: number;
  revenue: string;
  category: string;
}

const sampleTickets: Ticket[] = [
  {
    id: 1,
    eventId: 1,
    eventName: 'Summer Music Festival',
    type: 'VIP',
    price: '$100',
    available: 500,
    sold: 200,
    revenue: '$20,000',
    category: 'Music'
  },
  // Add more sample tickets...
];

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

const columns: Column<Ticket>[] = [
  { key: 'eventName', label: 'Event', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'available', label: 'Available', sortable: true },
  { key: 'sold', label: 'Sold', sortable: true },
  { key: 'revenue', label: 'Revenue', sortable: true },
];

// Add events data
const availableEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    category: "Music",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park",
    price: 50,
    image: "https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png"
  },
  // Add more events as needed...
];

export default function TicketsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = [
    { label: 'Total Revenue', value: '$50,000', trend: '+15%', icon: Tag },
    { label: 'Tickets Sold', value: '1,234', trend: '+8%', icon: Users },
    { label: 'Available Tickets', value: '2,766', trend: '-3%', icon: Ticket },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Ticket className="h-8 w-8 text-[#FFEB3B]" />
          <h1 className="text-3xl font-bold text-[#FFEB3B]" style={pixelFont}>
            Tickets Management
          </h1>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className={`${pixelBorder} bg-[#FFEB3B] hover:bg-[#FDD835] text-black`}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className={`p-6 ${pixelBorder} bg-[#4CAF50] hover:translate-y-[-4px] transition-transform duration-200`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-[#45a049] rounded-lg">
                <stat.icon className="h-6 w-6 text-[#FFEB3B]" />
              </div>
              <span className={`text-sm px-2 py-1 rounded ${stat.trend.startsWith('+') ? 'bg-[#45a049] text-[#FFEB3B]' : 'bg-red-500/20 text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-lg font-medium text-[#FFEB3B] mt-4" style={pixelFont}>
              {stat.label}
            </h3>
            <p className="text-3xl font-bold text-white mt-1" style={pixelFont}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Filters and Table Section */}
      <Card className={`${pixelBorder} bg-[#4CAF50] overflow-hidden`}>
        {/* Filters Bar */}
        <div className="p-4 border-b border-[#45a049] bg-[#45a049]">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${pixelBorder} bg-white`}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className={`w-[200px] ${pixelBorder} bg-white`}>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Regular">Regular</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className={`${pixelBorder} ${viewMode === 'grid' ? 'bg-[#FFEB3B] text-black' : 'bg-white'}`}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className={`${pixelBorder} ${viewMode === 'list' ? 'bg-[#FFEB3B] text-black' : 'bg-white'}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4">
          <DataTable<Ticket>
            columns={columns}
            data={sampleTickets}
            onEdit={(ticket) => {
              setEditingTicket(ticket);
              setIsFormOpen(true);
            }}
            onDelete={(ticket) => {
              console.log('Delete ticket:', ticket);
            }}
          />
        </div>
      </Card>

      {/* Ticket Form Modal */}
      {isFormOpen && (
        <TicketForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTicket(null);
          }}
          ticket={editingTicket || undefined}
          availableEvents={availableEvents}
        />
      )}
    </div>
  );
} 