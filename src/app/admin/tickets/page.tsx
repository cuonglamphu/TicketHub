'use client';

import { useState, useEffect } from 'react';
import { CreateTicketDto, Ticket, Type } from '@/types/ticket';
import { Event as CustomEvent } from '@/types/event';
import { ticketService } from '@/services/ticketService';
import { eventService } from '@/services/eventService';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Plus, TicketIcon, Search, Grid, List, Tag, Users } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pixelBorder, pixelFont } from "@/lib/utils";
import { TicketForm } from '@/components/admin/TicketForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { Category } from '@/types/category';
import { categoryService } from '@/services/categoryService';
import { typeService } from '@/services/typeService';
import { Skeleton } from "@/components/ui/skeleton";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable: boolean;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

// Add TableSkeleton component
const TableSkeleton = () => (
  <div className="space-y-4">
    {/* Header skeleton */}
    <div className="flex gap-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-8 w-32" />
      ))}
    </div>
    
    {/* Rows skeleton */}
    {[1, 2, 3, 4, 5].map((row) => (
      <div key={row} className="flex items-center gap-4 p-4 bg-[#45a049] rounded-lg">
        {[1, 2, 3].map((col) => (
          <Skeleton key={col} className="h-6 w-32" />
        ))}
        {/* Action buttons skeleton */}
        <div className="ml-auto flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    ))}
  </div>
);

export default function TicketsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [Categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const stats = [
    { label: 'Total Revenue', value: '$50,000', trend: '+15%', icon: Tag },
    { label: 'Tickets Sold', value: '1,234', trend: '+8%', icon: Users },
    { label: 'Available Tickets', value: '2,766', trend: '-3%', icon: TicketIcon },
  ];
  const [eventNames, setEventNames] = useState<Record<number, string>>({});
  const [typeNames, setTypeNames] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Fetch all required data in parallel
      const [ticketsData, eventsData, categoriesData] = await Promise.all([
        ticketService.getAll(),
        eventService.getAll(),
        categoryService.getAll()
      ]);

      console.log('Tickets Data:', ticketsData);
      console.log('Events Data:', eventsData);
      console.log('Categories Data:', categoriesData);

      // Get unique event IDs and type IDs
      const uniqueEventIds = [...new Set(ticketsData.map(ticket => ticket.eveId))];
      const uniqueTypeIds = [...new Set(ticketsData.map(ticket => ticket.typeId))];

      // Fetch event names
      const eventPromises = uniqueEventIds.map(async (eveId) => {
        const event = await eventService.getById(eveId);
        return [eveId, event.eveName];
      });

      // Fetch type names
      const typePromises = uniqueTypeIds.map(async (typeId) => {
        const type = await typeService.getById(typeId);
        return [typeId, type.typeName];
      });

      const [eventResults, typeResults] = await Promise.all([
        Promise.all(eventPromises),
        Promise.all(typePromises)
      ]);

      setEventNames(Object.fromEntries(eventResults));
      setTypeNames(Object.fromEntries(typeResults));
      setTickets(ticketsData);
      setEvents(eventsData);
      setCategories(categoriesData as Category[]);

      console.log('Event Names:', Object.fromEntries(eventResults));
      console.log('Type Names:', Object.fromEntries(typeResults));
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: CreateTicketDto) => {
    try {
      if (editingTicket) {
        await ticketService.update(editingTicket.TicketId, formData);
      } else {
        await ticketService.create(formData);
      }
      fetchInitialData();
      setIsFormOpen(false);
      setEditingTicket(null);
      toast.success(editingTicket ? 'Ticket updated' : 'Ticket created');
    } catch (error) {
      console.error('Error submitting ticket:', error);
      toast.error('Failed to save ticket');
    }
  };

  const handleDelete = async (ticket: Ticket) => {
    try {
      console.log('Ticket ID:', ticket.ticketId);
      console.log('Deleting ticket with ID:', ticket.ticketId);
      await ticketService.delete(ticket.ticketId);
      fetchInitialData();
      toast.success('Ticket deleted');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Failed to delete ticket');
    }
  };


  const columns: Column<Ticket>[] = [
    { 
      key: 'eveId',
      label: 'Event', 
      sortable: true,
      render: (ticket) => {
        return eventNames[ticket.eveId] || 'Loading...';
      }
    },
    { 
      key: 'typeId',
      label: 'Type', 
      sortable: true,
      render: (ticket) => {
        return typeNames[ticket.typeId] || 'Loading...';
      }
    },
    { 
      key: 'ticketQty', 
      label: 'Total', 
      sortable: true,
      render: (ticket) => ticket.ticketQty?.toString() || '0'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <TicketIcon className="h-8 w-8 text-[#FFEB3B]" />
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
            {loading ? (
              <>
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[200px]" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4">
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable<Ticket>
              columns={columns}
              data={tickets}
              onEdit={(ticket) => {
                setEditingTicket(ticket);
                setIsFormOpen(true);
              }}
              onDelete={(ticket) => {
                handleDelete(ticket);
              }}
            />
          )}
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
          ticket={editingTicket}
          onSubmit={handleSubmit}
          events={events}
          categories={Categories}
        />
      )}
    </div>
  );
} 