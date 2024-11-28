import { useState, useEffect, useCallback } from "react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RecommendedEvent } from "@/types/event"
import { HotEventCarouselSkeleton } from "./HotEventCarouselSkeleton"

export function HotEventCarousel({ events }: { events: RecommendedEvent[] }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const router = useRouter()
    
    const changeSlide = useCallback((direction: 'next' | 'prev' | number) => {
        if (isAnimating) return
        setIsAnimating(true)
        
        if (typeof direction === 'number') {
            setCurrentSlide(direction)
        } else {
            setCurrentSlide(prev => {
                if (direction === 'next') {
                    return (prev + 1) % events.length
                }
                return (prev - 1 + events.length) % events.length
            })
        }
        
        setTimeout(() => setIsAnimating(false), 500)
    }, [isAnimating, events.length])

    // Auto-slide effect
    useEffect(() => {
        if (!isPaused && events.length > 1) {
            const timer = setInterval(() => {
                changeSlide('next')
            }, 5000)

            return () => clearInterval(timer)
        }
    }, [isPaused, changeSlide, events.length])

    if (!events || events.length === 0) {
        return <HotEventCarouselSkeleton />
    }

    const currentEvent = events[currentSlide]

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation()
        changeSlide('next')
    }

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation()
        changeSlide('prev')
    }

    const navigateToDetail = () => {
        router.push(`/events/${currentEvent.eveId}`)
    }

    return (
        <div className="relative w-full max-w-[1400px] mx-auto px-4 my-8">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden
                          shadow-[0_0_20px_rgba(0,0,0,0.3)]
                          transform transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                 onMouseEnter={() => setIsPaused(true)}
                 onMouseLeave={() => setIsPaused(false)}>
                {/* Main Content Container */}
                <div className="flex h-full cursor-pointer relative" 
                     onClick={navigateToDetail}>
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] to-[#45a049] opacity-75" />

                    {/* Image Section */}
                    <div className="w-full h-full relative overflow-hidden group">
                        <Image
                            src={currentEvent.eveThumb || '/default-image.jpg'}
                            alt={currentEvent.eveName}
                            fill
                            className={`object-cover transform transition-all duration-700 ease-out
                                    group-hover:scale-110 ${isAnimating ? 'animate-slideChange' : ''}`}
                            priority
                            quality={100}
                        />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-500
                                      group-hover:translate-y-[-10px]">
                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                <div className={`h-full bg-[#FFEB3B] transition-all duration-300
                                              ${isPaused ? 'w-0' : 'animate-progress'}`} />
                            </div>

                            <div className="mb-4">
                                <span className="px-4 py-2 bg-[#FFEB3B] text-black rounded-full text-sm font-bold
                                               transform transition-all duration-300 hover:scale-105">
                                    {currentEvent.category?.catName || 'Event'}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4
                                         transform transition-all duration-300"
                                style={{ fontFamily: "'Pixelify Sans', sans-serif" }}>
                                {currentEvent.eveName}
                            </h2>
                            
                            <p className="text-lg text-gray-200 mb-6 max-w-2xl
                                        transform transition-all duration-300">
                                {currentEvent.eveDesc}
                            </p>

                            <div className="flex items-center gap-6">
                                <div className="text-[#FFEB3B] text-xl"
                                     style={{ fontFamily: "'Press Start 2P', cursive" }}>
                                    {new Date(currentEvent.eveTimestart).toLocaleDateString()}
                                </div>
                                
                                <div className="group/btn inline-flex items-center gap-2 
                                              text-[#FFEB3B] font-bold cursor-pointer">
                                    <span className="transform transition-all duration-300 
                                                   group-hover/btn:translate-x-2">
                                        View Details
                                    </span>
                                    <span className="transform transition-all duration-300 
                                                   group-hover/btn:translate-x-4">
                                        →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className="absolute left-4 top-1/2 -translate-y-1/2 
                             bg-[#FFEB3B] text-black p-3 rounded-full
                             transform transition-all duration-300
                             hover:scale-110 hover:bg-white
                             opacity-0 hover:opacity-100
                             disabled:opacity-50 disabled:cursor-not-allowed
                             z-20"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className="absolute right-4 top-1/2 -translate-y-1/2 
                             bg-[#FFEB3B] text-black p-3 rounded-full
                             transform transition-all duration-300
                             hover:scale-110 hover:bg-white
                             opacity-0 hover:opacity-100
                             disabled:opacity-50 disabled:cursor-not-allowed
                             z-20"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            disabled={isAnimating}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (!isAnimating) {
                                    setIsAnimating(true)
                                    setCurrentSlide(index)
                                    setTimeout(() => setIsAnimating(false), 500)
                                }
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 
                                ${currentSlide === index 
                                    ? 'w-8 bg-[#FFEB3B]' 
                                    : 'bg-white/50 hover:bg-white'}
                                ${isAnimating ? 'cursor-not-allowed' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}