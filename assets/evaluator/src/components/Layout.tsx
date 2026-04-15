import React from 'react';
import { LayoutDashboard, MessageSquare, Video, FileText } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SidebarNav = () => {
  return (
    <div className="w-20 bg-[#1A0B4B] flex flex-col items-center py-8 gap-8 flex-shrink-0 z-20">
      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-purple-500/20">E</div>
      <div className="flex flex-col gap-4 mt-8">
        <NavItem icon={<LayoutDashboard size={24} />} active />
        <NavItem icon={<MessageSquare size={24} />} />
        <NavItem icon={<Video size={24} />} />
      </div>
    </div>
  );
};

const NavItem = ({ icon, active }: { icon: React.ReactNode, active?: boolean }) => (
  <div className={cn(
    "p-3 rounded-xl cursor-pointer transition-all duration-200 group relative",
    active ? "bg-white/15 text-white" : "text-purple-300 hover:text-white hover:bg-white/10"
  )}>
    {icon}
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-400 rounded-r-full" />}
  </div>
);

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-12 bg-gray-50/50">
    <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-10 shadow-sm border border-gray-100">
      <div className="w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center">
        <FileText size={80} className="text-gray-200" />
      </div>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-3">No application selected</h2>
    <p className="text-gray-500 max-w-md leading-relaxed">
      Please select a bulk application from the feed panel on the left to view applicants and perform evaluation actions.
    </p>
  </div>
);
