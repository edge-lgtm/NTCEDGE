import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle2, XCircle, ArrowRightCircle } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { colors } from './Common';

export const DecisionActionBar = () => {
  const {
    selectedApplicantIds,
    stagedDecisions,
    stageDecision,
    setConfirmModalOpen
  } = useEvaluatorStore();

  const stagedCount = Object.keys(stagedDecisions).length;
  if (selectedApplicantIds.length === 0 && stagedCount === 0) return null;

  const approvedCount = Object.values(stagedDecisions).filter(d => d === 'approved').length;
  const endorsedCount = Object.values(stagedDecisions).filter(d => d === 'endorsed').length;
  const declinedCount = Object.values(stagedDecisions).filter(d => d === 'declined').length;

  const hasSelection = selectedApplicantIds.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex justify-between items-center ring-1 ring-black/5">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center px-2">
              <span className="text-lg font-black text-gray-900 leading-none">{selectedApplicantIds.length}</span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Selected</span>
            </div>
            <div className="h-8 w-px bg-gray-100" />
            <div className="hidden lg:flex items-start gap-2 max-w-[200px]">
              <div className="mt-0.5 p-1 bg-blue-50 text-blue-600 rounded-md">
                <Info size={12} />
              </div>
              <p className="text-[10px] text-gray-500 font-bold leading-tight">
                Draft decisions until final confirmation.
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <ActionButton
              onClick={() => stageDecision(selectedApplicantIds, 'approved')}
              label="Approve"
              count={approvedCount}
              variant="success"
              icon={<CheckCircle2 size={14} />}
              disabled={!hasSelection}
            />
            <ActionButton
              onClick={() => stageDecision(selectedApplicantIds, 'endorsed')}
              label="Endorse"
              count={endorsedCount}
              variant="primary"
              icon={<ArrowRightCircle size={14} />}
              disabled={!hasSelection}
            />
            <ActionButton
              onClick={() => stageDecision(selectedApplicantIds, 'declined')}
              label="Decline"
              count={declinedCount}
              variant="error"
              icon={<XCircle size={14} />}
              disabled={!hasSelection}
            />
            <div className="w-px h-8 bg-gray-100 mx-1" />
            <button
              disabled={stagedCount === 0}
              onClick={() => setConfirmModalOpen(true)}
              className={`px-8 py-3 rounded-xl font-black text-xs transition-all shadow-xl transform active:scale-95 border-2 ${
                stagedCount > 0
                  ? "bg-[#2D0C8A] text-white border-[#2D0C8A] hover:bg-[#1A0B4B] hover:border-[#1A0B4B] shadow-purple-900/30"
                  : "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed shadow-none"
              }`}
            >
              Confirm {stagedCount > 0 ? `(${stagedCount})` : ''}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  count: number;
  variant: 'success' | 'primary' | 'error';
  icon: React.ReactNode;
  disabled?: boolean;
}

const ActionButton = ({ onClick, label, count, variant, icon, disabled }: ActionButtonProps) => {
  const styles = {
    success: { border: colors.success, text: '#FFFFFF', bg: colors.success },
    primary: { border: colors.primary, text: colors.primary, bg: '#FFFFFF' },
    error: { border: colors.error, text: colors.error, bg: '#FFFFFF' }
  };

  const currentStyle = styles[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 px-4 py-2 border-2 rounded-xl font-black text-[10px] transition-all transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:grayscale disabled:scale-100`}
      style={{
        borderColor: disabled ? colors.disabled : currentStyle.border,
        color: disabled ? colors.default : currentStyle.text,
        backgroundColor: disabled ? '#FFFFFF' : currentStyle.bg
      }}
    >
      {icon}
      <span>{label} {count > 0 ? `(${count})` : ''}</span>
    </button>
  );
};
