'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const categories = [
  { id: 1, name: 'Nhạc sống', slug: 'music' },
  { id: 2, name: 'Sân khấu & Nghệ thuật', slug: 'arts' },
  { id: 3, name: 'Thể Thao', slug: 'sports' },
  { id: 4, name: 'Khác', slug: 'others' }
];

const pixelBorder = "border-b-[4px] border-[#FFEB3B]";

export function CategoryNav() {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const hasOverflow = container.scrollWidth > container.clientWidth;
      setShowArrows(hasOverflow);
      
      if (hasOverflow) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || !showArrows) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  return (
    <nav className="bg-black text-white relative">
      <div className="container mx-auto relative">
        {showArrows && showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1 md:hidden"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide"
        >
          <ul className="flex space-x-8 px-4 py-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link 
                  href={`/categories/${category.slug}`}
                  className={`block whitespace-nowrap text-lg hover:text-[#FFEB3B] transition-colors
                    ${pathname === `/categories/${category.slug}` ? 
                      `text-[#FFEB3B] ${pixelBorder}` : ''}`}
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {showArrows && showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1 md:hidden"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        )}
      </div>
    </nav>
  );
} 