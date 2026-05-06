import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TabId = 'bulk' | 'details' | 'soa';

interface BulkApplicationTabsProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export const BulkApplicationTabs = ({ activeTab, onTabChange }: BulkApplicationTabsProps) => {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'bulk', label: 'Bulk Application' },
    { id: 'details', label: 'Application Details' },
    { id: 'soa', label: 'SOA & Payment' }
  ];

  return (
    <div className="flex gap-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "pb-5 text-sm font-bold transition-all relative",
            activeTab === tab.id ? "text-[#2D0C8A]" : "text-gray-400 hover:text-gray-600"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2D0C8A] rounded-t-full"
            />
          )}
        </button>
      ))}
    </div>
  );
};
