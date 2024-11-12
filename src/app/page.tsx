'use client'

import { useState, } from 'react'
import { Navbar } from "@/components/layout/Navbar"
import { Modal } from "@/components/modals/Modal"
import { EventDetailsModal } from "@/components/modals/EventDetailsModal"
import { TicketPurchaseModal } from "@/components/modals/TicketPurchaseModal"
import { HotEventCarousel } from "@/components/home/HotEventCarousel"
import { hotEvents, recommendedEvents } from "@/data/mock"
import { RecommendedEvent } from "@/types/event"
import { SearchFilters } from '@/components/home/SearchFilters'
import { RecommendedEvents } from '@/components/home/RecommendedEvents'
import SignInForm from '@/components/home/SignInForm'
import SignUpForm from '@/components/home/SignUpForm'
import { getStoredUser } from '@/utils/auth'
import { CategoryNav } from '@/components/layout/CategoryNav'


export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<RecommendedEvent>()
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [isTicketPurchaseOpen, setIsTicketPurchaseOpen] = useState(false)

  const handleSearch = () => {
    // TODO: Implement search functionality using GET /api/Event/search
    console.log('Searching for:', { searchTerm, category, city, date })
  }

  const handleViewDetails = (event: RecommendedEvent) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  const handleBuyTickets = (event: RecommendedEvent) => {
    const user = getStoredUser()
    if (!user) {
      setIsSignInOpen(true)
      return
    }
    setSelectedEvent(event)
    setIsTicketPurchaseOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#8BC34A]">
      <Navbar onSignInClick={() => setIsSignInOpen(true)} onSignUpClick={() => setIsSignUpOpen(true)} onSignOutClick={() => {
        localStorage.removeItem('user');
        window.location.reload();
      }} />
      <CategoryNav />
      <main className="flex-grow">
        <HotEventCarousel events={hotEvents} onBuyTickets={handleBuyTickets}/>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-[#FFEB3B]">
            Find Your Next Event
          </h1>
          
          <SearchFilters
            searchTerm={searchTerm}
            category={category}
            city={city}
            date={date}
            onSearchTermChange={setSearchTerm}
            onCategoryChange={setCategory}
            onCityChange={setCity}
            onDateChange={setDate}
            onSearch={handleSearch}
          />

          <RecommendedEvents
            events={recommendedEvents}
            onViewDetails={handleViewDetails}
            onBuyTickets={handleBuyTickets}
          />
        </div>
      </main>

      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} title="Sign In">
        <SignInForm onClose={() => {
          setIsSignInOpen(false)
          window.location.reload()
        }} />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} title="Sign Up">
        <SignUpForm onClose={() => setIsSignUpOpen(false)} />
      </Modal>

      <EventDetailsModal
        event={selectedEvent}
        isOpen={isEventDetailsOpen}
        onClose={() => setIsEventDetailsOpen(false)}
      />

      <TicketPurchaseModal
        event={selectedEvent} 
        isOpen={isTicketPurchaseOpen}
        onClose={() => setIsTicketPurchaseOpen(false)}
      />
    </div>
  )
}