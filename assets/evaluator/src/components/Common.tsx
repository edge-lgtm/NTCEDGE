import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export const colors = {
  primary: '#2D0C8A',
  lightPrimary: '#E9E3FF',
  secondary: '#FFFFFF',
  default: '#565962',
  lightDefault: '#EFF0F6',
  lighterDefault: '#F7F7F7',
  success: '#31A24C',
  lightSuccess: '#EAF9DF',
  error: '#E53935',
  lightError: '#FFEBEE',
  warning: '#FFB020',
  disabled: '#D1D1D1',
  info: '#3BA4F7',
  lightInfo: '#DBEAFE',
  borderColor: '#D9DCE3',
  darkText: '#1E1E1E',
  mutedText: '#6B7280',
};

export const StatusBadge = ({ status, decision }: { status: string, decision?: string | null }) => {
  const currentStatus = (decision || status).toLowerCase();
  let bg = colors.lighterDefault;
  let text = colors.default;

  if (currentStatus === 'approved') {
    bg = colors.lightSuccess;
    text = colors.success;
  } else if (currentStatus === 'endorsed') {
    bg = colors.lightPrimary;
    text = colors.primary;
  } else if (currentStatus === 'declined') {
    bg = colors.lightError;
    text = colors.error;
  }

  return (
    <span
      className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block"
      style={{ backgroundColor: bg, color: text }}
    >
      {currentStatus}
    </span>
  );
};

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 relative z-10"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D0C8A]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const Checkbox = ({ checked, onChange, indeterminate }: { checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, indeterminate?: boolean }) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className="w-4 h-4 rounded border-gray-300 text-[#2D0C8A] focus:ring-[#2D0C8A] transition-all cursor-pointer"
      checked={checked}
      onChange={onChange}
    />
  );
};
