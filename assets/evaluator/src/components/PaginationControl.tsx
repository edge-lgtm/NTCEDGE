import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  selectedCount: number;
}

export const PaginationControl = ({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  onPageChange,
  selectedCount
}: PaginationControlProps) => {
  return (
    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="text-sm font-medium text-gray-500">
        Showing <span className="text-gray-900 font-bold">{totalItems === 0 ? 0 : startIndex + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="text-gray-900 font-bold">{totalItems}</span> applicants
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {selectedCount > 0 && (
          <div className="text-[10px] font-black text-[#2D0C8A] bg-purple-50 px-3 py-2 rounded-lg border border-purple-100 uppercase tracking-widest">
            {selectedCount} selected
          </div>
        )}
        <div className="hidden md:block h-8 w-px bg-gray-100" />
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${currentPage === page ? 'bg-[#2D0C8A] text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
