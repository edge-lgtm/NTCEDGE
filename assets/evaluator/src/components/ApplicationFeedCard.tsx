import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BulkApplication } from '../types/evaluator';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ApplicationFeedCardProps {
  app: BulkApplication;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export const ApplicationFeedCard = ({ app, index, isSelected, onClick }: ApplicationFeedCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      role="listitem"
      aria-current={isSelected}
      onClick={onClick}
      className={cn(
        "w-full p-5 border-b border-gray-50 text-left transition-all relative group outline-none focus:bg-gray-50",
        isSelected ? "bg-[#F5F3FF]" : "hover:bg-gray-50"
      )}
    >
      {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D0C8A]" />}
      <div className="flex justify-between items-start mb-2">
        <span className={cn(
          "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border",
          isSelected ? "bg-[#2D0C8A] text-white border-[#2D0C8A]" : "bg-purple-50 text-[#2D0C8A] border-purple-100"
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
        <ChevronRight size={14} className={cn("text-gray-300 transition-transform", isSelected && "translate-x-1 text-[#2D0C8A]")} />
      </div>
    </motion.button>
  );
};
