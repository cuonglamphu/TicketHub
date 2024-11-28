'use client';

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pixelBorder, pixelFont } from "@/lib/utils";
import { CreateTicketDto, TicketFormProps, Type } from '@/types/ticket';
import { typeService } from '@/services/typeService';
import { ticketService } from '@/services/ticketService';
import { toast } from 'react-hot-toast';
import { Skeleton } from "@/components/ui/skeleton";


export function TicketForm({ isOpen, onClose, ticket, events, categories }: TicketFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [, setSelectedType] = useState<Type | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ticketQty, setTicketQty] = useState<number>(0);
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [, setTypes] = useState<Type[]>([]);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [, setUsedTypeIds] = useState<number[]>([]);
  const [typeName, setTypeName] = useState('');
  const [typeDesc, setTypeDesc] = useState('');
  const [isEditingType, setIsEditingType] = useState(true);
  const [typeNameError, setTypeNameError] = useState<string>('');
  const [, setSelectedTypeId] = useState<number | null>(null);

  // Add useEffect to initialize form data when editing
  useEffect(() => {
    const initializeForm = async () => {
      setIsFormLoading(true);
      try {
        if (ticket) {
          const eventCategory = events?.find(e => e.eveId === ticket.eveId)?.category?.catId?.toString();
          setSelectedCategory(eventCategory || '');
          setSelectedEvent(ticket.eveId?.toString() || '');
          setSelectedType(ticket.type as Type || null);
          setSelectedTypeId(ticket.typeId || null);
          setTicketQty(ticket.ticketQty || 0);
          setTicketPrice(ticket.ticketPrice || 0);

          if (ticket.eveId) {
            const response = await typeService.getByEventId(ticket.eveId);
            setTypes(response as Type[] || []);
          }
        } else if (selectedEvent) {
          const tickets = await ticketService.getByEventId(parseInt(selectedEvent));
          const usedIds = tickets.map(t => t.type?.typeId).filter(id => id !== undefined) as number[];
          setUsedTypeIds(usedIds);
        }
      } catch (error) {
        console.error('Error initializing form:', error);
        toast.error('Failed to load ticket data');
      } finally {
        setIsFormLoading(false);
      }
    };

    initializeForm();
  }, [ticket, events, selectedEvent]);

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    if (!selectedCategory || !events) return [];
    return events.filter(event => 
      event?.category?.catId?.toString() === selectedCategory
    );
  }, [selectedCategory, events]);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedEvent('');
    setSelectedType(null);
    setTypes([]);
  };

  // Handle event change
  const handleEventChange = async (value: string) => {
    try {
      setIsLoading(true);
      setSelectedEvent(value);
      setSelectedType(null);
      setTypeName('');
      setTypeDesc('');
      setIsEditingType(true);
      
      if (value) {
        const eventId = parseInt(value);
        const response = await typeService.getByEventId(eventId);
        setTypes(response as Type[] || []);
      } else {
        setTypes([]);
      }
    } catch (error) {
      console.error('Error fetching types:', error);
      toast.error('Failed to load ticket types');
      setTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle edit mode for type
  const handleToggleTypeEdit = async () => {
    if (!isEditingType) {
      setTypeNameError('');
      setIsEditingType(true);
    } else {
      if (!typeName.trim() || !typeDesc.trim()) {
        toast.error('Please fill in all type fields');
        return;
      }

      try {
        const existingTypes = await typeService.getByEventId(parseInt(selectedEvent));
        const isDuplicate = existingTypes.some(
          (t: Type) => t.typeName.toLowerCase() === typeName.trim().toLowerCase()
        );

        if (isDuplicate) {
          setTypeNameError('This type name already exists');
          return; // Don't disable editing mode if there's an error
        }

        setTypeNameError('');
        setIsEditingType(false);
      } catch (error) {
        console.error('Error checking type name:', error);
        toast.error('Failed to validate type name');
      }
    }
  };

  // Modified submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEvent || ticketQty <= 0 || ticketPrice <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let finalTypeId: number;

      if (ticket) {
        // Use existing typeId when editing
        finalTypeId = ticket.typeId!;
      } else {
        // Create new type when adding
        if (isEditingType) {
          // Validate type first
          const existingTypes = await typeService.getByEventId(parseInt(selectedEvent));
          const isDuplicate = existingTypes.some(
            (t: Type) => t.typeName.toLowerCase() === typeName.trim().toLowerCase()
          );

          if (isDuplicate) {
            setTypeNameError('This type name already exists');
            return;
          }

          if (!typeName.trim() || !typeDesc.trim()) {
            toast.error('Please fill in all type fields');
            return;
          }

          // Create new type
          const typeData = {
            typeName: typeName.trim(),
            typeDesc: typeDesc.trim(),
            eventId: parseInt(selectedEvent)
          };

          const newType = await typeService.create(typeData);
          if (!newType || !newType.typeId) {
            toast.error('Failed to create type');
            return;
          }
          finalTypeId = newType.typeId;
        } else {
          toast.error('Please complete type creation');
          return;
        }
      }

      // Create/Update ticket
      const ticketData: CreateTicketDto = {
        EveId: parseInt(selectedEvent),
        TicketQty: ticketQty,
        TicketPrice: ticketPrice,
        TypeId: finalTypeId
      };

      if (ticket?.ticketId) {
        await ticketService.update(ticket.ticketId, ticketData);
        toast.success('Ticket updated successfully');
      } else {
        await ticketService.create(ticketData);
        toast.success('Ticket created successfully');
      }
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    }
  };

  // Loading placeholder component
  const FormSkeleton = () => (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-4 w-20 mb-2" /> {/* Label skeleton */}
        <Skeleton className="h-10 w-full" /> {/* Select skeleton */}
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex justify-end gap-4">
        <Skeleton className="h-10 w-24" /> {/* Button skeleton */}
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`${pixelBorder} bg-[#4CAF50] text-white`}>
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#FFEB3B]" style={pixelFont}>
              {ticket ? 'Edit Ticket' : 'Create New Ticket'}
            </DialogTitle>
          </DialogHeader>

          {isFormLoading ? (
            <FormSkeleton />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection - disabled in edit mode */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={handleCategoryChange}
                  disabled={!!ticket} // Disable in edit mode
                >
                  <SelectTrigger className={`${pixelBorder} bg-white text-black ${ticket ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {categories?.map((category) => (
                      <SelectItem 
                        key={category.catId?.toString() || ''} 
                        value={category.catId?.toString() || ''}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {category.catName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Event Selection - disabled in edit mode */}
              <div>
                <Label htmlFor="event">Event</Label>
                <Select 
                  value={selectedEvent} 
                  onValueChange={handleEventChange}
                  disabled={!!ticket || !selectedCategory || isLoading}
                >
                  <SelectTrigger 
                    className={`${pixelBorder} bg-white text-black ${
                      (!selectedCategory || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <SelectValue placeholder={
                      isLoading 
                        ? "Loading..." 
                        : !selectedCategory 
                        ? "Select a category first" 
                        : "Select event"
                    } />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {filteredEvents.map((event) => (
                      <SelectItem 
                        key={event.eveId?.toString() || ''} 
                        value={event.eveId?.toString() || ''}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {event.eveName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Modified Type Creation/Display Section */}
              {!ticket && (
                <div className="space-y-4">
                  <div className={`${pixelBorder} bg-white text-black rounded p-4 space-y-4`}>
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-bold">Ticket Type</Label>
                      {selectedEvent && (
                        <Button
                          type="button"
                          onClick={handleToggleTypeEdit}
                          className={`${pixelBorder} ${
                            !isEditingType 
                              ? 'bg-[#FFEB3B] text-black'
                              : 'bg-[#4CAF50] text-white'
                          } px-4`}
                        >
                          {isEditingType ? 'Save Type' : 'Edit Type'}
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Type Name</Label>
                      <div className="space-y-1">
                        <Input 
                          value={typeName}
                          onChange={(e) => {
                            setTypeName(e.target.value);
                            setTypeNameError('');
                          }}
                          className={`${pixelBorder} 
                            ${!selectedEvent || !isEditingType ? 'bg-gray-100' : 'bg-white'}
                            ${typeNameError ? 'border-red-500 focus:border-red-500' : ''}
                          `}
                          disabled={!selectedEvent || !isEditingType}
                          required
                          placeholder={!selectedEvent ? "Select an event first" : "Enter type name"}
                        />
                        {typeNameError && (
                          <div className="text-red-500 text-sm font-medium px-1">
                            {typeNameError}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Type Description</Label>
                      <Input 
                        value={typeDesc}
                        onChange={(e) => setTypeDesc(e.target.value)}
                        className={`${pixelBorder} ${!selectedEvent || !isEditingType ? 'bg-gray-100' : 'bg-white'}`}
                        disabled={!selectedEvent || !isEditingType}
                        required
                        placeholder={!selectedEvent ? "Select an event first" : "Enter type description"}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Show selected type in edit mode */}
              {ticket && ticket.type && (
                <div className={`${pixelBorder} bg-white text-black rounded p-4`}>
                  <Label className="text-lg font-bold">Selected Ticket Type</Label> 
                  <div className="mt-2 p-3 bg-gray-50 rounded">
                    <p className="font-medium text-lg">{ticket.type.typeName}</p>
                  </div>
                </div>
              )}

              {/* Ticket Details Section */}
              <div className={`${pixelBorder} bg-white text-black rounded p-4 space-y-4`}>
                <Label className="text-lg font-bold">Ticket Details</Label>
                
                <div>
                  <Label>Price</Label>
                  <Input 
                    type="number"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                    className={`${pixelBorder}`}
                    required
                    min="0"
                  />
                </div>

                <div>
                  <Label>Quantity</Label>
                  <Input 
                    type="number"
                    value={ticketQty}
                    onChange={(e) => setTicketQty(Number(e.target.value))}
                    className={`${pixelBorder}`}
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Submit buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className={`${pixelBorder} bg-white text-black hover:bg-gray-100`}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!selectedEvent || ticketQty <= 0 || ticketPrice <= 0 || (!ticket && (!typeName || !typeDesc))}
                  className={`${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835]`}
                >
                  {ticket ? 'Update Ticket' : 'Create Ticket'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 