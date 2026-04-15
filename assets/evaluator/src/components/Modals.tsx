import React from 'react';
import { AlertCircle, Check, X, ShieldAlert } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { Modal } from './Common';

export const ConfirmDecisionModal = () => {
  const { isConfirmModalOpen, setConfirmModalOpen, submitDecisions } = useEvaluatorStore();

  return (
    <Modal
      isOpen={isConfirmModalOpen}
      onClose={() => setConfirmModalOpen(false)}
      title="Confirm Final Submission"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
           <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
             <ShieldAlert className="text-amber-500" size={48} />
           </div>
           <h4 className="text-xl font-black text-gray-900 mb-2">Are you sure?</h4>
           <p className="text-gray-500 font-medium">You are about to submit staged decisions. This action will finalize the evaluation and cannot be undone.</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-4">
          <AlertCircle className="text-gray-400 flex-shrink-0" size={20} />
          <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
            Applicants will be notified of these results immediately after submission.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setConfirmModalOpen(false)}
            className="flex-1 py-4 font-black text-gray-500 hover:text-gray-700 transition-colors bg-gray-50 hover:bg-gray-100 rounded-xl"
          >
            No, Review Again
          </button>
          <button
            onClick={submitDecisions}
            className="flex-1 py-4 bg-[#2D0C8A] text-white rounded-xl font-black shadow-xl shadow-purple-900/20 hover:bg-[#1A0B4B] transition-all transform active:scale-95"
          >
            Yes, Submit Now
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const SubmissionSuccessModal = () => {
  const { isSuccessModalOpen, resetSelection } = useEvaluatorStore();

  return (
    <Modal
      isOpen={isSuccessModalOpen}
      onClose={resetSelection}
      title="Submission Success"
    >
      <div className="text-center py-6">
        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg">
          <Check size={48} strokeWidth={3} />
        </div>
        <h4 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Decisions Finalized</h4>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-xs mx-auto">
          You have successfully submitted the decisions for the selected applicants. The records have been updated in the system.
        </p>
        <button
          onClick={resetSelection}
          className="w-full py-4 bg-[#2D0C8A] text-white rounded-xl font-black shadow-xl shadow-purple-900/20 hover:bg-[#1A0B4B] transition-all transform active:scale-95"
        >
          Return to Dashboard
        </button>
      </div>
    </Modal>
  );
};
