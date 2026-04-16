import React from 'react';
import { useEvaluatorStore } from './store/useEvaluatorStore';
import { SidebarNav, EmptyState } from './components/Layout';
import { FeedPanel } from './components/FeedPanel';
import { BulkApplicationHeader } from './components/BulkApplicationHeader';
import { ApplicantsTable } from './components/ApplicantsTable';
import { BulkApplicationDetails } from './components/BulkApplicationDetails';
import { SOAView } from './components/SOAView';
import { DecisionActionBar } from './components/DecisionActionBar';
import { ConfirmDecisionModal, SubmissionSuccessModal, ApplicantDetailsModal } from './components/Modals';

export const EvaluatorApp = () => {
  const { selectedBulkId, activeTab } = useEvaluatorStore();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
      {/* 1. Left Vertical Navigation Rail */}
      <SidebarNav />

      {/* 2. Feed Panel beside it */}
      <FeedPanel />

      {/* 3. Main Content Area on the right */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {selectedBulkId ? (
          <>
            {/* Header with Tabs */}
            <BulkApplicationHeader />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar pb-32">
              {activeTab === 'bulk' && <ApplicantsTable />}
              {activeTab === 'details' && <BulkApplicationDetails />}
              {activeTab === 'soa' && <SOAView />}
            </div>

            {/* Float Action Bar (appears when selection exists) */}
            <div className="fixed bottom-6 right-6 left-[340px] z-40 pointer-events-none">
              <div className="pointer-events-auto">
                <DecisionActionBar />
              </div>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </main>

      {/* Global Modals */}
      <ConfirmDecisionModal />
      <SubmissionSuccessModal />
      <ApplicantDetailsModal />

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D9DCE3;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #C4C7CF;
        }
      `}} />
    </div>
  );
};
