import React from 'react';
import { Search } from 'lucide-react';

interface FeedSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const FeedSearchBar = ({ value, onChange }: FeedSearchBarProps) => {
  return (
    <div className="relative group" role="search">
      <label htmlFor="feed-search" className="sr-only">Search Reference Number or Title</label>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D0C8A] transition-colors" size={18} />
      <input
        id="feed-search"
        type="text"
        placeholder="Search Reference..."
        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D0C8A]/20 focus:border-[#2D0C8A] transition-all text-sm font-medium"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
