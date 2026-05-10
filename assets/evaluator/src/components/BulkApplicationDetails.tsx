import React from 'react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { FileText, Calendar, User, Tag, Info } from 'lucide-react';

export const BulkApplicationDetails = () => {
  const { selectedBulkId, bulkApplications } = useEvaluatorStore();
  const bulkApp = bulkApplications.find(a => a.id === selectedBulkId);

  if (!bulkApp) return null;

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30">
          <h3 className="text-lg font-black text-gray-900">Bulk Application Overview</h3>
          <p className="text-sm text-gray-500 font-medium">Review the technical specifications and metadata for this batch.</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <DetailItem
                icon={<FileText size={18} className="text-purple-600" />}
                label="Reference Number"
                value={bulkApp.referenceNumber}
              />
              <DetailItem
                icon={<Tag size={18} className="text-purple-600" />}
                label="Application Title"
                value={bulkApp.title}
              />
              <DetailItem
                icon={<Calendar size={18} className="text-purple-600" />}
                label="Batch Created"
                value={new Date(bulkApp.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              />
            </div>

            <div className="space-y-6">
              <DetailItem
                icon={<User size={18} className="text-purple-600" />}
                label="Assigned Evaluator"
                value={bulkApp.assignedTo}
              />
              <DetailItem
                icon={<Info size={18} className="text-purple-600" />}
                label="Applicants Count"
                value={`${bulkApp.applicantsCount} Total`}
              />
              <DetailItem
                icon={<FileText size={18} className="text-purple-600" />}
                label="Category"
                value={bulkApp.category}
              />
            </div>
          </div>

          <div className="mt-12 p-6 bg-[#F9F8FF] rounded-xl border border-purple-100">
            <h4 className="text-xs font-black text-purple-900 uppercase tracking-widest mb-3">Batch Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              This batch consists of individual applications for Radio Operator Certificates in the National Capital Region.
              The technical requirements include valid training certificates and passing scores from the recent NTC exams held in July 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
    </div>
  </div>
);
