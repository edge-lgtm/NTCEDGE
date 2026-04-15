import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { StatusBadge, Checkbox } from './Common';

export const ApplicantsTable = () => {
  const {
    selectedBulkId,
    bulkApplications,
    selectedApplicantIds,
    toggleApplicantSelection,
    setAllApplicantsSelection,
    stagedDecisions,
    currentPage,
    setCurrentPage,
    itemsPerPage
  } = useEvaluatorStore();

  const bulkApp = bulkApplications.find(a => a.id === selectedBulkId);
  if (!bulkApp) return null;

  const totalItems = bulkApp.applicants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedApplicants = bulkApp.applicants.slice(startIndex, startIndex + itemsPerPage);

  const pagedIds = pagedApplicants.map(a => a.id);
  const isAllPagedSelected = pagedIds.every(id => selectedApplicantIds.includes(id));
  const isSomePagedSelected = pagedIds.some(id => selectedApplicantIds.includes(id)) && !isAllPagedSelected;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200">
              <th className="p-5 w-14">
                <Checkbox
                  checked={isAllPagedSelected}
                  onChange={(e) => setAllApplicantsSelection(pagedIds, e.target.checked)}
                  indeterminate={isSomePagedSelected}
                />
              </th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest">Name</th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest">Type</th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest">Submission</th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest">Status</th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pagedApplicants.map((applicant) => (
              <tr
                key={applicant.id}
                className={`transition-colors hover:bg-gray-50/50 ${selectedApplicantIds.includes(applicant.id) ? 'bg-[#F9F8FF]' : ''}`}
              >
                <td className="p-5">
                  <Checkbox
                    checked={selectedApplicantIds.includes(applicant.id)}
                    onChange={() => toggleApplicantSelection(applicant.id)}
                  />
                </td>
                <td className="p-5">
                  <div className="font-bold text-gray-900 text-sm">{applicant.name}</div>
                  <div className="text-[10px] text-gray-400 font-medium">REF: {applicant.id.toUpperCase()}</div>
                </td>
                <td className="p-5 text-sm font-medium text-gray-600">{applicant.applicationType}</td>
                <td className="p-5 text-sm font-medium text-gray-600">{applicant.submissionDate}</td>
                <td className="p-5">
                  <StatusBadge status={applicant.status} decision={stagedDecisions[applicant.id]} />
                </td>
                <td className="p-5 text-right">
                  <button className="text-[#2D0C8A] hover:bg-[#E9E3FF] px-3 py-1.5 rounded-lg font-bold text-xs transition-colors border border-transparent hover:border-purple-200">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="text-sm font-medium text-gray-500">
          Showing <span className="text-gray-900 font-bold">{startIndex + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="text-gray-900 font-bold">{totalItems}</span> applicants
        </div>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${currentPage === page ? 'bg-[#2D0C8A] text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
