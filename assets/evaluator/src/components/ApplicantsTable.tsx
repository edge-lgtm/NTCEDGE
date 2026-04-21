import React from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { StatusBadge, Checkbox } from './Common';

export const ApplicantsTable = () => {
  const {
    selectedBulkId,
    bulkApplications,
    selectedApplicantIds,
    setSelectedApplicantId,
    toggleApplicantSelection,
    setAllApplicantsSelection,
    stagedDecisions,
    applicantSearchQuery,
    setApplicantSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage
  } = useEvaluatorStore();

  const bulkApp = bulkApplications.find(a => a.id === selectedBulkId);
  if (!bulkApp) return null;

  const filteredApplicants = bulkApp.applicants.filter(a =>
    a.name.toLowerCase().includes(applicantSearchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(applicantSearchQuery.toLowerCase())
  );

  const totalItems = filteredApplicants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedApplicants = filteredApplicants.slice(startIndex, startIndex + itemsPerPage);

  const pagedIds = pagedApplicants.map(a => a.id);
  const isAllPagedSelected = pagedIds.every(id => selectedApplicantIds.includes(id));
  const isSomePagedSelected = pagedIds.some(id => selectedApplicantIds.includes(id)) && !isAllPagedSelected;

  return (
    <section className="flex flex-col h-full" aria-label="Applicants List">
      <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full max-sm:max-w-xs max-w-sm" role="search">
          <label htmlFor="applicant-search" className="sr-only">Search applicants by name or ID</label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            id="applicant-search"
            type="text"
            placeholder="Search applicants..."
            className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D0C8A]/20 focus:border-[#2D0C8A] transition-all text-sm font-medium"
            value={applicantSearchQuery}
            onChange={(e) => setApplicantSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {totalItems} Applicants Found
          </div>
          <div className="text-[10px] font-bold text-[#2D0C8A] mt-1 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 uppercase tracking-wider">
            Selection triggers SOA recalculation
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-[#F7F7F7] to-white border-b border-gray-200">
              <th className="p-5 w-14">
                <Checkbox
                  checked={isAllPagedSelected}
                  onChange={(e) => setAllApplicantsSelection(pagedIds, e.target.checked)}
                  indeterminate={isSomePagedSelected}
                />
              </th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest">Name</th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest">Status</th>
              <th className="p-5 text-[11px] font-black text-gray-500 uppercase tracking-widest text-right">Preview Application</th>
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
                <td className="p-5">
                  <StatusBadge status={applicant.status} decision={stagedDecisions[applicant.id]} />
                </td>
                <td className="p-5 text-right">
                  <button
                    onClick={() => setSelectedApplicantId(applicant.id)}
                    className="text-[#2D0C8A] hover:bg-[#E9E3FF] px-3 py-1.5 rounded-lg font-bold text-xs transition-colors border border-transparent hover:border-purple-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination & Selected Count */}
      <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="text-sm font-medium text-gray-500">
          Showing <span className="text-gray-900 font-bold">{startIndex + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="text-gray-900 font-bold">{totalItems}</span> applicants
        </div>
        <div className="flex items-center gap-6">
          {selectedApplicantIds.length > 0 && (
            <div className="text-[10px] font-black text-[#2D0C8A] bg-purple-50 px-3 py-2 rounded-lg border border-purple-100 uppercase tracking-widest">
              {selectedApplicantIds.length} selected
            </div>
          )}
          <div className="h-8 w-px bg-gray-100" />
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
    </section>
  );
};
