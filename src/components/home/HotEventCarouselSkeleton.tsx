import { Skeleton } from "@/components/ui/skeleton"

export function HotEventCarouselSkeleton() {
    return (
        <div className="relative w-full max-w-[1400px] mx-auto px-4 my-8">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden
                          shadow-[0_0_20px_rgba(0,0,0,0.3)] bg-black/5">
                <div className="flex h-full relative">
                    {/* Image Skeleton */}
                    <div className="w-full h-full relative">
                        <Skeleton className="w-full h-full" />
                        
                        {/* Content Skeleton */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            {/* Category Skeleton */}
                            <div className="mb-4">
                                <Skeleton className="w-24 h-8 rounded-full" />
                            </div>

                            {/* Title Skeleton */}
                            <Skeleton className="w-3/4 h-12 mb-4" />
                            
                            {/* Description Skeleton */}
                            <Skeleton className="w-2/3 h-6 mb-2" />
                            <Skeleton className="w-1/2 h-6 mb-6" />

                            {/* Date and Button Skeleton */}
                            <div className="flex items-center gap-6">
                                <Skeleton className="w-40 h-8" />
                                <Skeleton className="w-32 h-8" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons Skeleton */}
                <Skeleton className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full" />
                <Skeleton className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full" />

                {/* Dots Indicator Skeleton */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                    {[1, 2, 3].map((_, index) => (
                        <Skeleton key={index} className="w-2 h-2 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    )
}