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
import { Category } from '@/types/category'

// Constants
const PIXEL_BORDER = "border-[3px] border-black shadow-[3px_3px_0_0_#000000]"
const COMMON_INPUT_STYLES = `
  bg-white/95 backdrop-blur-sm
  text-black placeholder-gray-500
  transition-all duration-200
  hover:bg-white focus:bg-white
  hover:shadow-[4px_4px_0_0_#000000]
  ${PIXEL_BORDER}
  text-lg
`

// Data
const CITIES = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'london', label: 'London' },
]

// Types
interface City {
  id: string;
  name: string;
}

interface SearchFiltersProps {
  searchTerm: string
  category: string
  city: string
  date: string
  categories: Category[]
  cities: City[]
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
  categories,
  cities,
  onSearchTermChange,
  onCategoryChange,
  onCityChange,
  onDateChange,
  onSearch
}: SearchFiltersProps) {
  return (
    <div className={`
      bg-gradient-to-br from-[#43A047] via-[#4CAF50] to-[#66BB6A]
      p-6 rounded-2xl mb-8 
      ${PIXEL_BORDER}
      transition-all duration-300 
      hover:shadow-[4px_4px_0_0_#000000]
      hover:translate-y-[-2px]
    `}>
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm ?? ''}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className={`
            flex-grow min-w-[250px]
            py-5
            ${COMMON_INPUT_STYLES}
          `}
        />

        {/* Category Select */}
        <Select value={category.toString()} onValueChange={onCategoryChange}>
          <SelectTrigger 
            className={`
              min-w-[180px] h-[48px]
              ${COMMON_INPUT_STYLES}
            `}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-md rounded-lg border-2 border-black">
            {categories.map((cat) => (
              <SelectItem key={cat.catId} value={cat.catId.toString()}>
                {cat.catName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City Input */}
        <Input
          type="text"
          placeholder="Enter city..."
          value={city ?? ''}
          onChange={(e) => onCityChange(e.target.value)}
          className={`
            min-w-[180px] h-[48px]
            ${COMMON_INPUT_STYLES}
          `}
        />

        {/* Date Input */}
        <Input
          type="date"
          value={date ?? ''}
          placeholder='dd/mm/yyyy'
          onChange={(e) => onDateChange(e.target.value)}
          className={`
            min-w-[180px] h-[48px]
            ${COMMON_INPUT_STYLES}
          `}
        />
      </div>

      {/* Search Button */}
      <Button 
        onClick={onSearch} 
        className={`
          w-full h-[48px]
          bg-gradient-to-r from-[#FFD600] via-[#FFEB3B] to-[#FFF176]
          text-black font-bold
          transition-all duration-200
          hover:from-[#FDD835] hover:via-[#FFD600] hover:to-[#FFE082]
          hover:shadow-[4px_4px_0_0_#000000]
          hover:translate-y-[-2px]
          active:translate-y-[1px]
          ${PIXEL_BORDER}
          text-lg
        `} 
      >
        <Search className="mr-2 h-5 w-5" /> 
        Search Events
      </Button>
    </div>
  )
} 