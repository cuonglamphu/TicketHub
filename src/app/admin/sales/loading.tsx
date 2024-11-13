import { pixelBorder } from "@/lib/utils";

export default function SalesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Loading */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-[#4CAF50] rounded" />
          <div className="h-10 w-32 bg-[#4CAF50] rounded" />
        </div>
      </div>

      {/* Stats Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
            <div className="h-5 bg-[#388E3C] rounded w-2/3 mb-2" />
            <div className="h-8 bg-[#388E3C] rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Charts Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
            <div className="h-8 bg-[#388E3C] rounded w-1/4 mb-4" />
            <div className="h-64 bg-[#388E3C] rounded" />
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