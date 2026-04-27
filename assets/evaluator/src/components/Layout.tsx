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

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-12 bg-gray-50/50 overflow-hidden relative">
    {/* Decorative background elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-3xl -z-10" />
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl -z-10" />

    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="w-64 h-64 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-purple-900/5 border border-gray-100 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-48 h-48 bg-gray-50 rounded-2xl flex items-center justify-center relative">
          <FileText size={80} className="text-gray-200" />
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-8 text-purple-300"
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.div
            animate={{
              x: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 text-blue-300"
          >
            <Search size={20} />
          </motion.div>
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">No application selected</h2>
      <p className="text-gray-500 max-w-md leading-relaxed font-medium">
        Please select a bulk application from the feed panel on the left to view applicants and perform evaluation actions.
      </p>
      <div className="mt-8 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </motion.div>
  </div>
);
