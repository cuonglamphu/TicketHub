'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  formatter?: (value: T[keyof T]) => string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  itemsPerPage?: number;
}

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" };
const pixelButton = "border-2 border-black shadow-[2px_2px_0_0_#000000] active:shadow-[0_0_0_0_#000000] active:translate-y-[2px] active:translate-x-[2px]";

export function DataTable<T>({ 
  columns, 
  data, 
  onEdit, 
  onDelete,
  itemsPerPage = 10 
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{key: keyof T; direction: 'asc' | 'desc'} | null>(null);
  const [deleteItem, setDeleteItem] = useState<T | null>(null);

  // Updated sorting logic with type checking
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Type guard for sortable values
    if (
      (typeof aValue === 'string' || typeof aValue === 'number') &&
      (typeof bValue === 'string' || typeof bValue === 'number')
    ) {
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: keyof T) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  // Helper function to safely convert unknown values to string
  const formatCellContent = (value: T[keyof T]): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    return JSON.stringify(value);
  };

  return (
    <div className={`bg-[#4CAF50] rounded-xl ${pixelBorder} overflow-hidden`}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black hover:bg-transparent">
              {columns.map((column) => (
                <TableHead 
                  key={String(column.key)}
                  className={`
                    text-[#FFEB3B] font-bold py-4 px-6
                    ${column.sortable ? 'cursor-pointer hover:text-[#FDD835] transition-colors' : ''}
                  `}
                  style={pixelFont}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <span className="transition-transform duration-200">
                        {sortConfig?.key === column.key 
                          ? (sortConfig.direction === 'asc' ? '↑' : '↓')
                          : '↕'}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              <TableHead 
                className="text-[#FFEB3B] font-bold py-4 px-6" 
                style={pixelFont}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow 
                key={index}
                className="border-b border-black/20 hover:bg-[#388E3C] transition-colors"
              >
                {columns.map((column) => (
                  <TableCell 
                    key={String(column.key)}
                    className="text-white py-4 px-6"
                    style={pixelFont}
                  >
                    {column.render 
                      ? column.render(item)
                      : formatCellContent(item[column.key])
                    }
                  </TableCell>
                ))}
                <TableCell className="py-4 px-6">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => onEdit(item)}
                      className={`
                        bg-[#FFEB3B] hover:bg-[#FDD835] text-black transition-colors px-3 py-2
                        ${pixelButton}
                      `}
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      onClick={() => setDeleteItem(item)}
                      variant="destructive"
                      size="sm"
                      className={`
                        transition-colors px-3 py-2
                        ${pixelButton}
                      `}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-black/20">
        <div className="text-white flex items-center gap-2" style={pixelFont}>
          <span className="text-[#FFEB3B]">Page</span>
          <span className="px-2 py-1 bg-[#388E3C] rounded-md">
            {currentPage} of {totalPages}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-white/70" style={pixelFont}>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`
                bg-[#FFEB3B] hover:bg-[#FDD835] text-black transition-colors
                ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                ${pixelButton}
              `}
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`
                bg-[#FFEB3B] hover:bg-[#FDD835] text-black transition-colors
                ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
                ${pixelButton}
              `}
              size="sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => {
          if (deleteItem) {
            onDelete(deleteItem);
            setDeleteItem(null);
          }
        }}
      />
    </div>
  );
} 