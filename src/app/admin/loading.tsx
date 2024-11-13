import { pixelBorder } from "@/lib/utils";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
            <div className="h-5 bg-[#388E3C] rounded w-2/3 mb-2" />
            <div className="h-8 bg-[#388E3C] rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Chart Loading */}
      <div className={`p-6 ${pixelBorder} bg-[#4CAF50]`}>
        <div className="h-8 bg-[#388E3C] rounded w-1/4 mb-4" />
        <div className="h-64 bg-[#388E3C] rounded" />
      </div>
    </div>
  );
} 