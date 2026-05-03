import React from 'react';
import { AlertCircle, Check, X, ShieldAlert, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { Modal, StatusBadge } from './Common';

export const ApplicantDetailsModal = () => {
  const { selectedApplicantId, selectedBulkId, bulkApplications, setSelectedApplicantId } = useEvaluatorStore();

  const bulkApp = bulkApplications.find(a => a.id === selectedBulkId);
  const applicant = bulkApp?.applicants.find(a => a.id === selectedApplicantId);

  if (!applicant) return null;

  return (
    <Modal
      isOpen={!!selectedApplicantId}
      onClose={() => setSelectedApplicantId(null)}
      title="Applicant Profile"
    >
      <div className="space-y-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-black text-2xl">
            {applicant.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-xl font-black text-gray-900">{applicant.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={applicant.status} />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">REF: {applicant.id.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InfoBlock icon={<Mail size={14} />} label="Email Address" value="j.delacruz@example.com" />
          <InfoBlock icon={<Phone size={14} />} label="Phone Number" value="+63 917 123 4567" />
          <InfoBlock icon={<MapPin size={14} />} label="Location" value="Quezon City, NCR" />
          <InfoBlock icon={<FileText size={14} />} label="Application Type" value={applicant.applicationType} />
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Submitted Documents</h5>
          <div className="space-y-3">
            <DocumentItem name="Valid ID.pdf" size="1.2 MB" />
            <DocumentItem name="Training Certificate.pdf" size="2.4 MB" />
            <DocumentItem name="Exam Result.pdf" size="0.8 MB" />
          </div>
        </div>

        <button
          onClick={() => setSelectedApplicantId(null)}
          className="w-full py-4 bg-gray-50 text-gray-500 rounded-xl font-black hover:bg-gray-100 transition-all"
        >
          Close Preview
        </button>
      </div>
    </Modal>
  );
};

const InfoBlock = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div>
    <div className="flex items-center gap-1.5 mb-1.5 text-gray-400">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-sm font-bold text-gray-900">{value}</div>
  </div>
);

const DocumentItem = ({ name, size }: { name: string, size: string }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 group hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer">
    <div className="flex items-center gap-3">
      <FileText size={16} className="text-gray-400 group-hover:text-purple-600" />
      <span className="text-xs font-bold text-gray-700">{name}</span>
    </div>
    <span className="text-[10px] font-medium text-gray-400">{size}</span>
  </div>
);

export const ConfirmDecisionModal = () => {
  const { isConfirmModalOpen, setConfirmModalOpen, submitDecisions, isSubmitting } = useEvaluatorStore();

  return (
    <Modal
      isOpen={isConfirmModalOpen}
      onClose={() => !isSubmitting && setConfirmModalOpen(false)}
      title="Are you sure you want to submit the decisions for the selected applications?"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
           <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
             <ShieldAlert className="text-amber-500" size={48} />
           </div>
           <p className="text-gray-700 font-bold leading-relaxed">This action will finalize the evaluation and cannot be undone.</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-4">
          <AlertCircle className="text-gray-400 flex-shrink-0" size={20} />
          <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
            Applicants will be notified of these results immediately after submission.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            disabled={isSubmitting}
            onClick={() => setConfirmModalOpen(false)}
            className="flex-1 py-4 font-black text-gray-500 hover:text-gray-700 transition-colors bg-gray-50 hover:bg-gray-100 rounded-xl disabled:opacity-50"
          >
            No, Review Again
          </button>
          <button
            disabled={isSubmitting}
            onClick={submitDecisions}
            className="flex-1 py-4 bg-[#2D0C8A] text-white rounded-xl font-black shadow-xl shadow-purple-900/20 hover:bg-[#1A0B4B] transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              'Yes, Submit Now'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const SubmissionSuccessModal = () => {
  const { isSuccessModalOpen, resetSelection, stagedDecisions } = useEvaluatorStore();
  const count = Object.keys(stagedDecisions).length;

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
        <p className="text-gray-900 font-bold mb-10 leading-relaxed max-w-xs mx-auto">
          You have successfully submitted the decisions for the selected applications.
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

export const EditDueDateModal = () => {
  const { isDueDateModalOpen, setDueDateModalOpen, dueDate, setDueDate } = useEvaluatorStore();
  const [tempDate, setTempDate] = React.useState(dueDate || '');

  React.useEffect(() => {
    if (isDueDateModalOpen) setTempDate(dueDate || '');
  }, [isDueDateModalOpen, dueDate]);

  const handleSave = () => {
    setDueDate(tempDate);
    setDueDateModalOpen(false);
  };

  return (
    <Modal
      isOpen={isDueDateModalOpen}
      onClose={() => setDueDateModalOpen(false)}
      title="Set Payment Due Date"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="due-date" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Due Date</label>
          <input
            id="due-date"
            type="date"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D0C8A]/20 focus:border-[#2D0C8A] font-bold text-gray-900"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setDueDateModalOpen(false)}
            className="flex-1 py-4 font-black text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 bg-[#2D0C8A] text-white rounded-xl font-black shadow-xl shadow-purple-900/20 hover:bg-[#1A0B4B] transition-all transform active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};
