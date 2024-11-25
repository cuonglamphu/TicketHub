'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Navbar } from "@/components/layout/Navbar"
import { Modal } from "@/components/modals/Modal"
import { EventDetailsModal } from "@/components/modals/EventDetailsModal"
import { TicketPurchaseModal } from "@/components/modals/TicketPurchaseModal"
import { HotEventCarousel } from "@/components/home/HotEventCarousel"
import { eventService } from '@/services/eventService'
import { SearchFilters } from '@/components/home/SearchFilters'
import { RecommendedEvents } from '@/components/home/RecommendedEvents'
import SignInForm from '@/components/home/SignInForm'
import SignUpForm from '@/components/home/SignUpForm'
import { getStoredUser } from '@/utils/auth'
import { CategoryNav } from '@/components/layout/CategoryNav'
import { RecommendedEvent } from '@/types/event'
import { Category } from '@/types/category'
import { categoryService } from '@/services/categoryService'
import { useRouter } from 'next/navigation'
import { HotEventCarouselSkeleton } from "@/components/home/HotEventCarouselSkeleton"
import Image from 'next/image'

interface City {
  id: string;
  name: string;
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<RecommendedEvent>()
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [isTicketPurchaseOpen, setIsTicketPurchaseOpen] = useState(false)
  const [hotEventsList, setHotEventsList] = useState<RecommendedEvent[]>([])
  const [recommendedEventsList, setRecommendedEventsList] = useState([])
  const [categories, setCategories] = useState<Category[]>([])
  const [cities, setCities] = useState<City[]>([])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const user = getStoredUser()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true)
        const [hotEventsData, categoriesData, recommendedEventsData] = await Promise.all([
          eventService.getHotEvents(),
          categoryService.getAll(),
          eventService.getRecommendedEvents(user?.userId || 0)
        ])

        if (Array.isArray(hotEventsData)) {
          const mappedEvents = hotEventsData.map(event => ({
            eveId: event.eveId,
            eveName: event.eveName,
            eveDesc: event.eveDesc,
            eveTimestart: event.eveTimestart,
            eveCity: event.eveCity,
            eveThumb: event.eveThumb || '/default-image.jpg',
            tickets: event.tickets || [],
            category: event.category,
          }))
          console.log('Mapped events:', mappedEvents)
          setHotEventsList(mappedEvents as never[])
        }

        if (Array.isArray(categoriesData)) {
          const mappedCategories = categoriesData.map(cat => ({
            catId: cat.catId,
            catName: cat.catName,
            catDesc: cat.catDesc || '',
            catSlug: cat.catSlug || '',
            eventCount: 0,
            upcomingEventCount: 0,
            totalRevenue: 0,
          }))
          setCategories(mappedCategories)
        }

        if (Array.isArray(recommendedEventsData)) {
          const mappedRecommended = recommendedEventsData.map(event => ({
            eveId: event.eveId,
            eveName: event.eveName,
            eveDesc: event.eveDesc,
            eveTimestart: event.eveTimestart,
            eveCity: event.eveCity,
            eveThumb: event.eveThumb || '/default-image.jpg',
            tickets: event.tickets || [],
            category: event.category,
          }))
          setRecommendedEventsList(mappedRecommended as never[])
        }
      } catch (error) {
        console.error('Error fetching initial data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  useEffect(() => {
    console.log('Current hotEventsList:', hotEventsList);
  }, [hotEventsList]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    // Kiểm tra search rỗng
    const isEmptySearch = !searchTerm?.trim() && 
                         !categoryId && 
                         !city?.trim() && 
                         !date?.trim();

    if (isEmptySearch) {
      setError('Please enter at least one search criteria');
      setIsLoading(false);
      return;
    }

    try {
      const searchParams = {
        keyword: searchTerm?.trim() || undefined,    
        catId: categoryId || undefined,              
        city: city?.trim() || undefined,
        startDate: date?.trim() || undefined, 
      };

      const results = await eventService.searchEvents(searchParams);
      
      if (Array.isArray(results) && results.length === 0) {
        setError('No events found matching your search criteria.');
        setRecommendedEventsList([]);
        return;
      }

      setRecommendedEventsList(results);
      setError(null);
    } catch (error) {
      console.error('Search error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid search parameters')) {
          setError('Please check your search criteria and try again.');
        } else if (error.message.includes('Server error')) {
          setError('Server is experiencing issues. Please try again later.');
        } else {
          setError(error.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (event: RecommendedEvent) => {
    router.push(`/events/${event.eveId}`)
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

  const handleSignInClose = () => {
    setIsSignInOpen(false)
    router.refresh()
  }

  const handleCategoryChange = (value: string) => {
    const numValue = value ? parseInt(value, 10) : undefined;
    setCategoryId(numValue);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#8BC34A]">
      <Navbar onSignInClick={() => setIsSignInOpen(true)} onSignUpClick={() => setIsSignUpOpen(true)} onSignOutClick={() => {
        localStorage.removeItem('user');
        window.location.reload();
      }} />
      <CategoryNav />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-[#558B2F] to-[#8BC34A] py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-white font-pixel animate-fade-in">
              Welcome to TicketHub
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-[#F1F8E9] mb-6 md:mb-8 max-w-xl md:max-w-2xl mx-auto font-pixel">
              Discover amazing events happening around you. From concerts to workshops, 
              find and book tickets for the experiences that matter most.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <button 
                onClick={() => setIsSignUpOpen(true)}
                className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-[#FFEB3B] text-[#558B2F] font-bold rounded-lg 
                         shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] 
                         transform hover:translate-x-[2px] hover:translate-y-[2px] 
                         hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
                         transition-all duration-200 font-pixel text-sm md:text-base"
              >
                Get Started
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('search-section');
                  const headerOffset = 100;
                  const elementPosition = element?.getBoundingClientRect().top ?? 0;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }}
                className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-white text-white 
                         font-bold rounded-lg hover:bg-white/10 transition-colors 
                         duration-200 font-pixel text-sm md:text-base"
              >
                Browse Events
              </button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          {isLoading ? (
            <HotEventCarouselSkeleton />
          ) : (
            <HotEventCarousel events={hotEventsList}/>
          )}
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          <h1 id="search-section" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center text-[#FFEB3B]">
            Find Your Next Event
          </h1>
          
          <SearchFilters
            searchTerm={searchTerm}
            category={categoryId?.toString() || ''}
            city={city}
            date={date}
            categories={categories}
            cities={cities}
            onSearchTermChange={setSearchTerm}
            onCategoryChange={handleCategoryChange}
            onCityChange={setCity}
            onDateChange={setDate}
            onSearch={handleSearch}
          />

          {error && (
            <div className="mx-auto max-w-xl md:max-w-2xl mt-4 md:mt-6 mb-4">
              <div className="border-4 border-[#8BC34A] bg-[#F1F8E9] p-3 md:p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(139,195,74,1)] 
                            transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(139,195,74,1)]
                            transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className="pixel-art-warning text-[#8BC34A] text-xl md:text-2xl">
                    ⚠️
                  </div>
                  <div className="flex-1">
                    <p className="font-pixel text-[#558B2F] text-sm md:text-lg">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && recommendedEventsList.length === 0 && (
            <div className="mx-auto max-w-xl md:max-w-2xl mt-4 md:mt-6 mb-4">
              <div className="border-4 border-[#8BC34A] bg-[#F1F8E9] p-3 md:p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(139,195,74,1)]
                            transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(139,195,74,1)]
                            transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className="pixel-art-info text-[#8BC34A] text-xl md:text-2xl">
                    ℹ️
                  </div>
                  <div className="flex-1">
                    <p className="font-pixel text-[#558B2F] text-sm md:text-lg">
                      No events found. Try different search criteria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mx-auto max-w-xl md:max-w-2xl mt-4 md:mt-6 mb-4">
              <div className="border-4 border-[#8BC34A] bg-[#F1F8E9] p-3 md:p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(139,195,74,1)]
                            animate-pulse">
                <div className="flex items-center justify-center space-x-3">
                  <div className="pixel-art-loading text-[#8BC34A] text-xl md:text-2xl">
                    🔄
                  </div>
                  <p className="font-pixel text-[#558B2F] text-sm md:text-lg">
                    Searching for events...
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 md:mt-8">
            <RecommendedEvents
              events={recommendedEventsList}
              onViewDetails={handleViewDetails}
              onBuyTickets={handleBuyTickets}
            />
            
            <div className="flex justify-center mt-8 md:mt-12">
              <button
                onClick={() => router.push('/events')}
                className="group relative px-8 py-3 bg-[#FFEB3B] text-[#558B2F] font-bold rounded-none 
                          border-4 border-black font-pixel
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                          hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                          active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]
                          transform 
                          hover:translate-x-[2px] hover:translate-y-[2px]
                          active:translate-x-[4px] active:translate-y-[4px]
                          transition-all duration-75"
              >
                <div className="relative flex items-center justify-center gap-2 z-10">
                  <span className="text-sm md:text-base uppercase tracking-wide">View All Events</span>
                  <div className="group-hover:translate-x-[2px] transition-transform duration-75">
                    <div className="w-5 h-5 relative">
                      <div className="absolute top-1/2 left-0 w-3 h-[2px] bg-black"></div>
                      <div className="absolute top-[4px] right-[2px] w-[2px] h-[2px] bg-black"></div>
                      <div className="absolute top-[6px] right-[4px] w-[2px] h-[2px] bg-black"></div>
                      <div className="absolute top-[8px] right-[6px] w-[2px] h-[2px] bg-black"></div>
                      <div className="absolute bottom-[4px] right-[2px] w-[2px] h-[2px] bg-black"></div>
                      <div className="absolute bottom-[6px] right-[4px] w-[2px] h-[2px] bg-black"></div>
                      <div className="absolute bottom-[8px] right-[6px] w-[2px] h-[2px] bg-black"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-white/30 pointer-events-none"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-black"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-black"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-black"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-black"></div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} title="Sign In">
        <SignInForm onClose={handleSignInClose} />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} title="Sign Up">
        <SignUpForm onClose={() => setIsSignUpOpen(false)} />
      </Modal>

      <EventDetailsModal
        key={selectedEvent?.eveId}
        event={selectedEvent}
        isOpen={isEventDetailsOpen}
        onClose={() => setIsEventDetailsOpen(false)}
      />
      <TicketPurchaseModal
        key={selectedEvent?.eveId}
        ticketTypes={selectedEvent?.tickets || []}
        event={selectedEvent} 
        isOpen={isTicketPurchaseOpen}
        onClose={() => setIsTicketPurchaseOpen(false)}
      />

      <div className="mt-16 md:mt-24">
        <div className="bg-gradient-to-b from-[#8BC34A] to-[#558B2F] py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-10">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="w-full h-full bg-white/20 animate-pulse" 
                   style={{ animationDelay: `${i * 0.1}s` }}/>
            ))}
          </div>
          
          <div className="absolute left-0 top-0 w-24 h-24 opacity-50">
            
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-24 opacity-50 transform rotate-180">
          </div>

          <div className="container mx-auto px-4 relative">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white font-pixel mb-8 md:mb-12
                           animate-glow">
              Why Choose EventHub?
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6">
                <div className="animate-bounce">⚡</div>
              </div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "🎫", title: "Easy Booking", desc: "Book tickets in seconds with our simple and secure checkout process" },
                { icon: "🎮", title: "Best Events", desc: "Curated selection of the hottest events in your area" },
                { icon: "💫", title: "Exclusive Deals", desc: "Get access to special offers and early bird tickets" }
              ].map((feature, index) => (
                <div key={index} 
                     className="group bg-white/10 backdrop-blur-sm p-6 rounded-none border-4 border-black 
                              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                              hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                              transform hover:translate-x-[2px] hover:translate-y-[2px]
                              transition-all duration-75 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white"/>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-white"/>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"/>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-white"/>
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent 
                                opacity-0 group-hover:opacity-100 animate-scan"/>
                  
                  <div className="pixel-art-icon text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white font-pixel mb-2">{feature.title}</h3>
                  <p className="text-[#F1F8E9] font-pixel text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#F1F8E9] py-12 md:py-16 relative">
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px'
            }}/>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="relative inline-block">
                <div className="pixel-art-envelope text-4xl mb-6 animate-bounce">✉️</div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#558B2F] font-pixel mb-4
                           animate-glow">
                Stay Updated!
              </h2>
              <p className="text-[#558B2F] font-pixel mb-8">
                Subscribe to our newsletter for exclusive event updates and special offers
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="px-4 py-3 border-4 border-black rounded-none font-pixel
                             focus:outline-none focus:ring-2 focus:ring-[#8BC34A]
                             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                             relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                                animate-scan-fast opacity-50"/>
                </div>
                <button 
                  className="group px-6 py-3 bg-[#FFEB3B] text-[#558B2F] font-bold rounded-none 
                           border-4 border-black font-pixel relative overflow-hidden
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                           hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                           transform hover:translate-x-[2px] hover:translate-y-[2px]
                           transition-all duration-75"
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                                translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-300"/>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#558B2F] to-[#8BC34A] py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-2 opacity-10">
            {[...Array(72)].map((_, i) => (
              <div key={i} className="bg-white/20 animate-pulse" 
                   style={{ animationDelay: `${i * 0.05}s` }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4CAF50] text-white relative overflow-hidden">

        {/* Footer Content */}
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 relative">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">About TicketHub</h3>
              <p className="font-pixel text-base md:text-lg text-white/90">
                Your ultimate destination for discovering and booking amazing events. Join us in creating unforgettable experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['Events', 'Categories', 'Venues', 'Blog'].map((link) => (
                  <li key={link}>
                    <button className="font-pixel text-base md:text-lg text-white/90 hover:text-[#FFEB3B] transition-colors duration-200
                                     flex items-center gap-2 group">
                      <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all text-xl">
                        ▶
                      </span>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'FAQs', 'Terms of Service'].map((link) => (
                  <li key={link}>
                    <button className="font-pixel text-base md:text-lg text-white/90 hover:text-[#FFEB3B] transition-colors duration-200
                                     flex items-center gap-2 group">
                      <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all text-xl">
                        ▶
                      </span>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-pixel text-[#FFEB3B] mb-4">Connect</h3>
              <div className="flex gap-4">
                {[
                  { icon: "👾", label: "Discord" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "📘", label: "Facebook" }
                ].map((social) => (
                  <button
                    key={social.label}
                    className="w-12 h-12 bg-[#FFEB3B] rounded-none border-4 border-black 
                             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                             hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                             transform hover:translate-x-[2px] hover:translate-y-[2px]
                             transition-all duration-75
                             flex items-center justify-center
                             group relative"
                    aria-label={social.label}
                  >
                    <span className="text-2xl group-hover:animate-bounce text-black">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute left-0 w-full h-[4px] bg-black"></div>
          </div>

          {/* Bottom Section */}
          <div className="py-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🎮</span>
                <span className="font-pixel text-[#FFEB3B] text-2xl md:text-3xl">TicketHub</span>
              </div>
              
              <p className="font-pixel text-base md:text-lg text-white/90 text-center md:text-right">
                © 2024 TicketHub. All rights reserved. 
                <span className="inline-block animate-pulse mx-2">|</span> 
                Made with <span className="text-[#F44336] text-xl">♥</span> by TicketHub Team
              </p>
            </div>
          </div>
        </div>

        {/* Pixel Art Border Top */}
        <div className="absolute top-0 left-0 w-full h-[4px] border-t-4 border-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-[4px] border-b-4 border-black"></div>
      </footer>
    </div>
  )
}