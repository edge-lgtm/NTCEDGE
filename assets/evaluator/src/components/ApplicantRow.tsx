import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge, Checkbox } from './Common';
import { Applicant, Decision } from '../types/evaluator';

interface ApplicantRowProps {
  applicant: Applicant;
  index: number;
  isSelected: boolean;
  onToggleSelection: () => void;
  onViewDetails: () => void;
  stagedDecision: Decision;
}

export const ApplicantRow = ({
  applicant,
  index,
  isSelected,
  onToggleSelection,
  onViewDetails,
  stagedDecision
}: ApplicantRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className={`transition-all duration-200 hover:bg-gray-50/50 ${isSelected ? 'bg-[#F9F8FF] ring-2 ring-purple-600/10 z-10' : ''}`}
    >
      <td className="p-5 relative">
        {isSelected && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D0C8A] z-20" />
        )}
        <Checkbox
          checked={isSelected}
          onChange={onToggleSelection}
        />
      </td>
      <td className="p-5">
        <div className="font-bold text-gray-900 text-sm">{applicant.name}</div>
        <div className="text-[10px] text-gray-400 font-medium">REF: {applicant.id.toUpperCase()}</div>
      </td>
      <td className="p-5">
        <StatusBadge status={applicant.status} decision={stagedDecision} />
      </td>
      <td className="p-5 text-right">
        <button
          onClick={onViewDetails}
          className="text-[#2D0C8A] hover:bg-[#E9E3FF] px-3 py-1.5 rounded-lg font-bold text-xs transition-colors border border-transparent hover:border-purple-200"
        >
          View Details
        </button>
      </td>
    </motion.tr>
  );
};
