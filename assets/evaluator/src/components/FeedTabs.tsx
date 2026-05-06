import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FeedTabsProps {
  activeTab: 'pending' | 'history';
  onTabChange: (tab: 'pending' | 'history') => void;
}

export const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
  return (
    <div className="flex border-b border-gray-100 bg-gray-50/50 p-1 mx-4 my-2 rounded-lg" role="tablist" aria-label="Filter applications by status">
      <button
        role="tab"
        aria-selected={activeTab === 'pending'}
        onClick={() => onTabChange('pending')}
        className={cn(
          "flex-1 py-2 text-xs font-bold transition-all rounded-md",
          activeTab === 'pending' ? "text-[#2D0C8A] bg-white shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-700"
        )}
      >
        Pending
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'history'}
        onClick={() => onTabChange('history')}
        className={cn(
          "flex-1 py-2 text-xs font-bold transition-all rounded-md",
          activeTab === 'history' ? "text-[#2D0C8A] bg-white shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-700"
        )}
      >
        History
      </button>
    </div>
  );
};
