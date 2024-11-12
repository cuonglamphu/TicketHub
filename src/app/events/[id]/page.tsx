'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Ticket, Share2, Heart } from 'lucide-react';
import { getStoredUser } from '@/utils/auth';
import { Modal } from "@/components/modals/Modal";
import SignInForm from '@/components/home/SignInForm';
import { TicketPurchaseModal } from "@/components/modals/TicketPurchaseModal";

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  mainImage: string;
  galleryImages: string[];
  organizer: {
    name: string;
    image: string;
    description: string;
  };
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Mock data 
    setEvent({
      id: resolvedParams.id,
      title: "Summer Music Festival 2024",
      description: "Join us for an unforgettable summer music festival featuring top artists from around the world. Experience amazing performances, great food, and incredible atmosphere! Join us for an unforgettable summer music festival featuring top artists from around the world. Experience amazing performances, great food, and incredible atmosphere!",
      date: "2024-07-15",
      time: "18:00",
      location: "Central Park, Ho Chi Minh City",
      price: 50,
      category: "Music",
      mainImage: "https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png",
      galleryImages: [
        "https://salt.tkbcdn.com/ts/ds/3d/42/7f/2a0ab3db23dffe7893188d2199b63b19.jpg",
        "https://salt.tkbcdn.com/ts/ds/de/fd/9b/8f4fd89066ec3447a0ddd21995e44bf2.png",
        "https://salt.tkbcdn.com/ts/ds/ab/c3/34/a0da8994fb4ab5117ae208039cd261ae.png"
      ],
      organizer: {
        name: "PixelTix Events",
        image: "https://salt.tkbcdn.com/ts/ds/7d/fc/85/481ef3de9970b4bf4abe2a23e32da2ba.png",
        description: "Leading event organizer with 10+ years of experience"
      }
    });
  }, [resolvedParams.id]);

  const handleBuyTickets = () => {
    const user = getStoredUser();
    if (!user) {
      setIsSignInOpen(true);
      return;
    }
    setIsTicketModalOpen(true);
  };

  if (!event) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          {/* Main Image with blur effect */}
<div className={`relative h-[400px] ${pixelBorder} overflow-hidden bg-black`}>
  {/* Background blurred image */}
  <div className="absolute inset-0 scale-110">
    <Image
      src={event.mainImage}
      alt={event.title}
      fill
      className="object-cover blur-sm opacity-50"
      priority
    />
  </div>
  
  {/* Main sharp image */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative w-full h-full">
      <Image
        src={event.mainImage}
        alt={event.title}
        fill
        className="object-contain"
        priority
      />
    </div>
  </div>
</div>

          {/* Event Info */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold text-[#FFEB3B]" style={pixelFont}>
                {event.title}
              </h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 ${pixelBorder} bg-white hover:bg-gray-100`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                </button>
                <button className={`p-2 ${pixelBorder} bg-white hover:bg-gray-100`}>
                  <Share2 className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-white" style={pixelFont}>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {event.time}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                ${event.price}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
            <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
              About This Event
            </h2>
            <p className="text-white" style={pixelFont}>{event.description}</p>
          </div>

          {/* Gallery */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
            <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
              Event Gallery
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {event.galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className={`relative h-32 ${pixelBorder} overflow-hidden cursor-pointer transform transition-transform hover:scale-105`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Buy Tickets Card */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder} sticky top-4`}>
            <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
              Get Your Tickets
            </h2>
            <p className="text-white mb-4" style={pixelFont}>
              Secure your spot at this amazing event!
            </p>
            <button
              onClick={handleBuyTickets}
              className={`w-full py-3 ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] flex items-center justify-center gap-2`}
              style={pixelFont}
            >
              <Ticket className="w-5 h-5" />
              Buy Tickets
            </button>
          </div>

          {/* Organizer Info */}
          <div className={`bg-[#4CAF50] p-6 ${pixelBorder}`}>
            <h2 className="text-2xl font-bold mb-4 text-[#FFEB3B]" style={pixelFont}>
              Event Organizer
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-[#FFEB3B]" style={pixelFont}>{event.organizer.name}</h3>
                <p className="text-white" style={pixelFont}>{event.organizer.description}</p>
              </div>    
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} title="Sign In">
        <SignInForm onClose={() => {
          setIsSignInOpen(false);
          window.location.reload();
        }} />
      </Modal>

      {event && (
        <TicketPurchaseModal
          isOpen={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          event={{
            id: Number(event.id),
            name: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            image: event.mainImage,
            price: event.price,
            description: event.description
          }}
        />
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage('')}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 