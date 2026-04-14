import React from 'react';
import { useEvaluatorStore, calculateSOA } from './store/useEvaluatorStore';
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  Search,
  Filter,
  ChevronRight,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  Clock,
  Check,
  X,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Colors from Design System
const colors = {
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
  border: '#D9DCE3',
  darkText: '#1E1E1E',
  mutedText: '#6B7280',
};

// --- Components ---

const StatusBadge = ({ status, decision }: { status: string, decision?: string | null }) => {
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
      className="px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
      style={{ backgroundColor: bg, color: text }}
    >
      {currentStatus}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// --- Screen Components ---

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-12">
    <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center mb-8">
      <FileText size={80} className="text-gray-300" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">No application selected</h2>
    <p className="text-gray-500 max-w-md">Please select an application from the feed panel to view details and perform evaluations.</p>
  </div>
);

const FeedPanel = () => {
  const { searchQuery, setSearchQuery, selectedBulkId, setSelectedBulkId, bulkApplications } = useEvaluatorStore();

  const filteredApps = bulkApplications.filter(app =>
    app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Feed</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Reference..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex border-b border-gray-200">
        <button className="flex-1 py-3 text-sm font-semibold text-purple-700 border-b-2 border-purple-700">Pending</button>
        <button className="flex-1 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700">History</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedBulkId(app.id)}
            className={cn(
              "w-full p-4 border-b border-gray-100 text-left transition-colors",
              selectedBulkId === app.id ? "bg-purple-50" : "hover:bg-gray-50"
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded uppercase">{app.referenceNumber}</span>
              <span className="text-xs text-gray-400">2h ago</span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{app.title}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span>{app.applicantsCount} Applicants</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const BulkApplicationView = () => {
  const {
    selectedBulkId,
    bulkApplications,
    activeTab,
    setActiveTab,
    selectedApplicantIds,
    toggleApplicantSelection,
    setAllApplicantsSelection,
    stagedDecisions,
    stageDecision,
    setConfirmModalOpen
  } = useEvaluatorStore();

  const bulkApp = bulkApplications.find(a => a.id === selectedBulkId);
  if (!bulkApp) return <EmptyState />;

  const allIds = bulkApp.applicants.map(a => a.id);
  const isAllSelected = selectedApplicantIds.length === bulkApp.applicants.length && bulkApp.applicants.length > 0;

  const stagedCount = Object.keys(stagedDecisions).length;
  const approvedCount = Object.values(stagedDecisions).filter(d => d === 'approved').length;
  const endorsedCount = Object.values(stagedDecisions).filter(d => d === 'endorsed').length;
  const declinedCount = Object.values(stagedDecisions).filter(d => d === 'declined').length;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 pt-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{bulkApp.title}</h1>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{bulkApp.referenceNumber}</span>
            </div>
            <p className="text-gray-500">{bulkApp.applicantsCount} Total Applicants</p>
          </div>
          <div className="flex gap-2">
            {/* Action buttons could go here */}
          </div>
        </div>

        <div className="flex gap-8">
          {['bulk', 'details', 'soa'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "pb-4 text-sm font-semibold transition-colors relative",
                activeTab === tab ? "text-purple-800" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab === 'bulk' && 'Bulk Application'}
              {tab === 'details' && 'Application Details'}
              {tab === 'soa' && 'SOA & Payment'}
              {activeTab === tab && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-800" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'bulk' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 w-12">
                    <input
                      type="checkbox"
                      className="rounded text-purple-600 focus:ring-purple-500"
                      checked={isAllSelected}
                      onChange={(e) => setAllApplicantsSelection(allIds, e.target.checked)}
                    />
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Preview Application</th>
                </tr>
              </thead>
              <tbody>
                {bulkApp.applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="rounded text-purple-600 focus:ring-purple-500"
                        checked={selectedApplicantIds.includes(applicant.id)}
                        onChange={() => toggleApplicantSelection(applicant.id)}
                      />
                    </td>
                    <td className="p-4 font-semibold text-gray-900">{applicant.name}</td>
                    <td className="p-4">
                      <StatusBadge status={applicant.status} decision={stagedDecisions[applicant.id]} />
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-purple-600 hover:text-purple-800 font-semibold text-sm">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'soa' && <SOAView selectedCount={selectedApplicantIds.length} />}
      </div>

      {/* Decision Bar */}
      <AnimatePresence>
        {selectedApplicantIds.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-between items-center px-8"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-700">{selectedApplicantIds.length} selected</span>
              <div className="h-4 w-px bg-gray-300" />
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Info size={14} />
                SOA will be recalculated for the current selection.
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => stageDecision(selectedApplicantIds, 'approved')}
                className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-green-600 text-green-600 rounded font-bold hover:bg-green-50 transition-colors text-sm"
              >
                Approve {approvedCount > 0 && `(${approvedCount})`}
              </button>
              <button
                onClick={() => stageDecision(selectedApplicantIds, 'endorsed')}
                className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-purple-800 text-purple-800 rounded font-bold hover:bg-purple-50 transition-colors text-sm"
              >
                Endorse {endorsedCount > 0 && `(${endorsedCount})`}
              </button>
              <button
                onClick={() => stageDecision(selectedApplicantIds, 'declined')}
                className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-red-600 text-red-600 rounded font-bold hover:bg-red-50 transition-colors text-sm"
              >
                Decline {declinedCount > 0 && `(${declinedCount})`}
              </button>
              <button
                disabled={stagedCount === 0}
                onClick={() => setConfirmModalOpen(true)}
                className="flex items-center gap-2 px-8 py-2 bg-purple-900 text-white rounded font-bold hover:bg-purple-950 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SOAView = ({ selectedCount }: { selectedCount: number }) => {
  const soa = calculateSOA(selectedCount);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 text-white">
          <h3 className="text-lg font-bold">Statement of Account</h3>
          <p className="text-purple-200 text-sm">Summary of fees for selected applicants</p>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">License Fee</span>
              <span className="font-bold text-gray-900">PHP {soa.licenseFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Inspection Fee</span>
              <span className="font-bold text-gray-900">PHP {soa.inspectionFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Documentary Stamp Tax</span>
              <span className="font-bold text-gray-900">PHP {soa.docStampTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Surcharge</span>
              <span className="font-bold text-gray-900">PHP {soa.surcharge.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-4 mt-4">
              <span className="text-xl font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-black text-purple-900">PHP {soa.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Due Date</span>
              <button className="text-purple-700 text-xs font-bold hover:underline">Edit</button>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {soa.dueDate ? new Date(soa.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No due date set'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EvaluatorApp = () => {
  const {
    isConfirmModalOpen,
    setConfirmModalOpen,
    isSuccessModalOpen,
    submitDecisions,
    resetSelection
  } = useEvaluatorStore();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar Nav Rail */}
      <div className="w-20 bg-[#1A0B4B] flex flex-col items-center py-8 gap-8 flex-shrink-0">
        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">E</div>
        <div className="flex flex-col gap-6 mt-8">
          <div className="p-3 bg-purple-800/50 rounded-lg text-white cursor-pointer"><LayoutDashboard size={24} /></div>
          <div className="p-3 text-purple-300 hover:text-white transition-colors cursor-pointer"><MessageSquare size={24} /></div>
          <div className="p-3 text-purple-300 hover:text-white transition-colors cursor-pointer"><Video size={24} /></div>
        </div>
      </div>

      <FeedPanel />

      <BulkApplicationView />

      {/* Confirm Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Submission"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Are you sure you want to submit the decisions for the selected applications?</p>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex gap-3">
            <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
            <p className="text-sm text-amber-800">This action will finalize the evaluation and cannot be undone.</p>
          </div>
          <div className="flex gap-3 justify-end mt-8">
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="px-6 py-2 font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              No
            </button>
            <button
              onClick={submitDecisions}
              className="px-8 py-2 bg-purple-900 text-white rounded font-bold hover:bg-purple-950 transition-colors"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={resetSelection}
        title="Success"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} strokeWidth={3} />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Decisions Submitted</h4>
          <p className="text-gray-500 mb-8">You have successfully submitted the decisions for the selected applications.</p>
          <button
            onClick={resetSelection}
            className="w-full py-3 bg-purple-900 text-white rounded font-bold hover:bg-purple-950 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
