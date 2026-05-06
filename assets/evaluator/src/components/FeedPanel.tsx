import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FeedSearchBar } from './FeedSearchBar';
import { FeedTabs } from './FeedTabs';
import { ApplicationFeedCard } from './ApplicationFeedCard';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FeedPanel = () => {
  const { searchQuery, setSearchQuery, selectedBulkId, setSelectedBulkId, bulkApplications, feedTab, setFeedTab } = useEvaluatorStore();

  const filteredApps = bulkApplications.filter(app => {
    const matchesSearch = app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = app.status.toLowerCase() === feedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <aside className={cn(
      "w-[300px] flex-shrink-0 border-r border-gray-200 bg-white flex flex-col z-10 shadow-sm transition-all duration-300 md:relative absolute inset-y-0 left-20 md:left-0",
      selectedBulkId ? "hidden md:flex" : "flex"
    )} aria-label="Application Feed">
      <div className="p-6 border-b border-gray-100 bg-white">
        <h2 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Feed</h2>
        <FeedSearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <FeedTabs activeTab={feedTab} onTabChange={setFeedTab} />

      <div className="flex-1 overflow-y-auto custom-scrollbar" role="list">
        {filteredApps.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 text-center"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <Search size={24} className="text-gray-300" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No results found</p>
            <p className="text-[10px] text-gray-500 mt-1 font-medium">Try a different reference number</p>
          </motion.div>
        ) : filteredApps.map((app, index) => (
          <ApplicationFeedCard
            key={app.id}
            app={app}
            index={index}
            isSelected={selectedBulkId === app.id}
            onClick={() => setSelectedBulkId(app.id)}
          />
        ))}
      </div>
    </aside>
  );
};
