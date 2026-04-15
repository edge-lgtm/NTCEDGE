import React from 'react';
import { useEvaluatorStore } from './store/useEvaluatorStore';
import { SidebarNav, EmptyState } from './components/Layout';
import { FeedPanel } from './components/FeedPanel';
import { BulkApplicationHeader } from './components/BulkApplicationHeader';
import { ApplicantsTable } from './components/ApplicantsTable';
import { SOAView } from './components/SOAView';
import { DecisionActionBar } from './components/DecisionActionBar';
import { ConfirmDecisionModal, SubmissionSuccessModal } from './components/Modals';

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
              {activeTab === 'details' && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                     <span className="font-bold">...</span>
                   </div>
                   <p className="font-bold text-sm uppercase tracking-widest">Application details preview coming soon</p>
                </div>
              )}
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
