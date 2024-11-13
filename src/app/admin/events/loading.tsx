import { pixelBorder } from "@/lib/utils";

export default function EventsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Loading */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-[#4CAF50] rounded" />
          <div className="h-10 w-32 bg-[#4CAF50] rounded" />
        </div>
        <div className="h-10 w-32 bg-[#4CAF50] rounded" />
      </div>

      {/* Event Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`bg-[#4CAF50] rounded-lg overflow-hidden ${pixelBorder}`}>
            <div className="h-48 bg-[#388E3C] animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-[#388E3C] rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-[#388E3C] rounded w-1/2" />
                <div className="h-4 bg-[#388E3C] rounded w-2/3" />
                <div className="h-4 bg-[#388E3C] rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Loading */}
      <div className={`bg-[#4CAF50] rounded-lg ${pixelBorder} p-4`}>
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-[#388E3C] rounded" />
            ))}
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4">
              {[...Array(6)].map((_, j) => (
                <div key={j} className="h-6 bg-[#388E3C] rounded" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 