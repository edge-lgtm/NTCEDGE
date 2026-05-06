import React from 'react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { BulkApplicationTabs } from './BulkApplicationTabs';

export const BulkApplicationHeader = () => {
  const { selectedBulkId, bulkApplications, activeTab, setActiveTab } = useEvaluatorStore();
  const bulkApp = bulkApplications.find(a => a.id === selectedBulkId);

  if (!bulkApp) return null;

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-10 pt-8 z-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1A0B4B] via-[#2D0C8A] to-[#3BA4F7]" />
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{bulkApp.title}</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <span className="text-sm">Bulk Batch Processing</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm">Evaluation Workflow</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[11px] font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100 uppercase tracking-widest">{bulkApp.referenceNumber}</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-md">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Applicants:</span>
            <span className="text-sm font-black text-[#2D0C8A]">{bulkApp.applicantsCount}</span>
          </div>
        </div>
      </div>

      <BulkApplicationTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};
