import React from 'react';
import { Search, Clock, ChevronRight } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    <div className="w-85 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col z-10 shadow-sm">
      <div className="p-6 border-b border-gray-100 bg-white">
        <h2 className="text-xl font-extrabold text-gray-900 mb-5 tracking-tight">Feed</h2>
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D0C8A] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search Reference..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D0C8A]/20 focus:border-[#2D0C8A] transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b border-gray-100 bg-gray-50/50 p-1 mx-4 my-2 rounded-lg">
        <button
          onClick={() => setFeedTab('pending')}
          className={cn(
            "flex-1 py-2 text-xs font-bold transition-all rounded-md",
            feedTab === 'pending' ? "text-[#2D0C8A] bg-white shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-700"
          )}
        >
          Pending
        </button>
        <button
          onClick={() => setFeedTab('history')}
          className={cn(
            "flex-1 py-2 text-xs font-bold transition-all rounded-md",
            feedTab === 'history' ? "text-[#2D0C8A] bg-white shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-700"
          )}
        >
          History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedBulkId(app.id)}
            className={cn(
              "w-full p-5 border-b border-gray-50 text-left transition-all relative group",
              selectedBulkId === app.id ? "bg-[#F5F3FF]" : "hover:bg-gray-50"
            )}
          >
            {selectedBulkId === app.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D0C8A]" />}
            <div className="flex justify-between items-start mb-2">
              <span className={cn(
                "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border",
                selectedBulkId === app.id ? "bg-[#2D0C8A] text-white border-[#2D0C8A]" : "bg-purple-50 text-[#2D0C8A] border-purple-100"
              )}>
                {app.referenceNumber}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">2h ago</span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-2 leading-tight group-hover:text-[#2D0C8A] transition-colors">{app.title}</h3>
            <div className="flex items-center justify-between">
               <div className="flex items-center text-[11px] font-medium text-gray-500">
                <Clock size={12} className="mr-1.5 text-gray-400" />
                <span>{app.applicantsCount} Applicants</span>
              </div>
              <ChevronRight size={14} className={cn("text-gray-300 transition-transform", selectedBulkId === app.id && "translate-x-1 text-[#2D0C8A]")} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
