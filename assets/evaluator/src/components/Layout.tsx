import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Video, FileText, Search, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SidebarNav = () => {
  return (
    <nav className="w-16 md:w-20 bg-[#1A0B4B] flex flex-col items-center py-6 md:py-8 gap-6 md:gap-8 flex-shrink-0 z-20 transition-all duration-300" aria-label="Main Navigation">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg ring-4 ring-purple-500/20" aria-hidden="true">E</div>
      <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8">
        <NavItem icon={<LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />} label="Activities" active />
        <NavItem icon={<MessageSquare className="w-5 h-5 md:w-6 md:h-6" />} label="Chat" />
        <NavItem icon={<Video className="w-5 h-5 md:w-6 md:h-6" />} label="Meet" />
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={cn(
    "p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-200 group relative flex flex-col items-center gap-1",
    active ? "bg-white/15 text-white" : "text-purple-300 hover:text-white hover:bg-white/10"
  )}>
    {icon}
    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-tighter opacity-70 group-hover:opacity-100 scale-90 md:scale-100">{label}</span>
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 md:h-6 bg-purple-400 rounded-r-full" />}
  </div>
);
