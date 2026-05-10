import React from 'react';
import { User, Bell, Search, Menu, LogOut, Settings, HelpCircle } from 'lucide-react';

export const TopHeader = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0 z-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-[#2D0C8A] tracking-tighter">NTC EDGE</span>
          <div className="h-4 w-px bg-gray-300 mx-2" />
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Evaluator Module</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 pr-6 border-r border-gray-100">
          <button className="text-gray-400 hover:text-[#2D0C8A] transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button className="text-gray-400 hover:text-[#2D0C8A] transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="text-gray-400 hover:text-[#2D0C8A] transition-colors">
            <Settings size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-black text-gray-900 leading-none">Senior Officer Reyes</div>
            <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Online
            </div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-[#2D0C8A] font-black border border-purple-200 shadow-sm cursor-pointer hover:shadow-md transition-all">
            SR
          </div>
          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" aria-label="Sign out">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
