import React from 'react';
import { Search } from 'lucide-react';
import { useEvaluatorStore } from '../store/useEvaluatorStore';
import { Checkbox } from './Common';
import { PaginationControl } from './PaginationControl';
import { ApplicantRow } from './ApplicantRow';

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
            {pagedApplicants.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-20 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                    <Search size={32} className="text-gray-200" />
                  </div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">No applicants found</h4>
                  <p className="text-xs text-gray-500 font-medium">No records match your search criteria.</p>
                </td>
              </tr>
            ) : pagedApplicants.map((applicant, index) => (
              <ApplicantRow
                key={applicant.id}
                applicant={applicant}
                index={index}
                isSelected={selectedApplicantIds.includes(applicant.id)}
                onToggleSelection={() => toggleApplicantSelection(applicant.id)}
                onViewDetails={() => setSelectedApplicantId(applicant.id)}
                stagedDecision={stagedDecisions[applicant.id]}
              />
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        selectedCount={selectedApplicantIds.length}
      />
    </section>
  );
};
