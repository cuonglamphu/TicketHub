import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Constants
const PIXEL_BORDER = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const PIXEL_FONT = { fontFamily: "'Pixelify Sans', sans-serif" }

// Data
const CATEGORIES = [
    { value: 'music', label: 'Music' },
    { value: 'gaming', label: 'Gaming' },
  { value: 'art', label: 'Art' },
  { value: 'technology', label: 'Technology' },
]

const CITIES = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'london', label: 'London' },
]

// Types
interface SearchFiltersProps {
  searchTerm: string
  category: string
  city: string
  date: string
  onSearchTermChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onCityChange: (value: string) => void
  onDateChange: (value: string) => void
  onSearch: () => void
}

export function SearchFilters({
  searchTerm,
  category,
  city,
  date,
  onSearchTermChange,
  onCategoryChange,
  onCityChange,
  onDateChange,
  onSearch
}: SearchFiltersProps) {
  return (
    <div className={`
      bg-gradient-to-r from-[#43A047] to-[#4CAF50]
      p-8 rounded-xl mb-8 
      ${PIXEL_BORDER}
      transition-all duration-300 hover:shadow-[6px_6px_0_0_#000000]
    `}>
      <div className="flex flex-wrap gap-6 mb-6">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className={`
            flex-grow min-w-[250px]
            bg-white/90 backdrop-blur-sm
            text-black placeholder-gray-600
            text-lg py-6
            transition-all duration-300
            hover:bg-white focus:bg-white
            ${PIXEL_BORDER}
            text-xl
          `}
          style={PIXEL_FONT}
        />

        {/* Category Select */}
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger 
            className={`
              min-w-[180px] h-[52px]
              bg-white/90 backdrop-blur-sm
              text-black 
              transition-all duration-300
              hover:bg-white
              ${PIXEL_BORDER}
              text-xl
            `} 
            style={PIXEL_FONT}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-md">
            {CATEGORIES.map(({ value, label }) => (
              <SelectItem 
                key={value} 
                value={value}
                className="hover:bg-gray-100 cursor-pointer text-xl"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City Select */}
        <Select value={city} onValueChange={onCityChange}>
          <SelectTrigger 
            className={`
              min-w-[180px] h-[52px]
              bg-white/90 backdrop-blur-sm
              text-black
              transition-all duration-300
              hover:bg-white
              ${PIXEL_BORDER}
              text-xl
            `} 
            style={PIXEL_FONT}
          >
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-md">
            {CITIES.map(({ value, label }) => (
              <SelectItem 
                key={value} 
                value={value}
                className="hover:bg-gray-100 cursor-pointer text-xl"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Input */}
        <Input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className={`
            min-w-[180px] h-[52px]
            bg-white/90 backdrop-blur-sm
            text-black
            transition-all duration-300
            hover:bg-white focus:bg-white
            ${PIXEL_BORDER}
            text-xl
          `}
          style={PIXEL_FONT}
        />
      </div>

      {/* Search Button */}
      <Button 
        onClick={onSearch} 
        className={`
          w-full h-[52px]
          bg-gradient-to-r from-[#FFD600] to-[#FFEB3B]
          text-black text-lg font-bold
          transition-all duration-300
          hover:from-[#FDD835] hover:to-[#FFD600]
          hover:shadow-[6px_6px_0_0_#000000]
          active:translate-y-1
          ${PIXEL_BORDER}
          text-xl
        `} 
        style={PIXEL_FONT}
      >
        <Search className="mr-3 h-5 w-5 text-xl" /> 
        Search Events
      </Button>
    </div>
  )
} 