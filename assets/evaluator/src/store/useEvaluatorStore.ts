import { create } from 'zustand';
import { BulkApplication, Decision, SOASummary } from '../types/evaluator';
import { mockBulkApplications } from '../data/mockData';

interface EvaluatorState {
  selectedBulkId: string | null;
  activeTab: 'bulk' | 'details' | 'soa';
  selectedApplicantIds: string[];
  stagedDecisions: Record<string, Decision>;
  isConfirmModalOpen: boolean;
  isSuccessModalOpen: boolean;
  searchQuery: string;
  bulkApplications: BulkApplication[];
  currentPage: number;
  itemsPerPage: number;

  // Actions
  setSelectedBulkId: (id: string | null) => void;
  setActiveTab: (tab: 'bulk' | 'details' | 'soa') => void;
  toggleApplicantSelection: (id: string) => void;
  setAllApplicantsSelection: (ids: string[], select: boolean) => void;
  stageDecision: (ids: string[], decision: Decision) => void;
  setConfirmModalOpen: (open: boolean) => void;
  setSuccessModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  submitDecisions: () => void;
  resetSelection: () => void;
  setCurrentPage: (page: number) => void;
}

export const useEvaluatorStore = create<EvaluatorState>((set) => ({
  selectedBulkId: null,
  activeTab: 'bulk',
  selectedApplicantIds: [],
  stagedDecisions: {},
  isConfirmModalOpen: false,
  isSuccessModalOpen: false,
  searchQuery: '',
  bulkApplications: mockBulkApplications,
  currentPage: 1,
  itemsPerPage: 5,

  setSelectedBulkId: (id) => set({
    selectedBulkId: id,
    selectedApplicantIds: [],
    stagedDecisions: {},
    activeTab: 'bulk',
    currentPage: 1
  }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleApplicantSelection: (id) => set((state) => ({
    selectedApplicantIds: state.selectedApplicantIds.includes(id)
      ? state.selectedApplicantIds.filter(aid => aid !== id)
      : [...state.selectedApplicantIds, id]
  })),
  setAllApplicantsSelection: (ids, select) => set({
    selectedApplicantIds: select ? ids : []
  }),
  stageDecision: (ids, decision) => set((state) => {
    const newDecisions = { ...state.stagedDecisions };
    ids.forEach(id => {
      newDecisions[id] = decision;
    });
    return { stagedDecisions: newDecisions };
  }),
  setConfirmModalOpen: (open) => set({ isConfirmModalOpen: open }),
  setSuccessModalOpen: (open) => set({ isSuccessModalOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  submitDecisions: () => set((state) => {
    const updatedBulkApplications = state.bulkApplications.map(bulk => {
      if (bulk.id === state.selectedBulkId) {
        return {
          ...bulk,
          applicants: bulk.applicants.map(app => {
            const decision = state.stagedDecisions[app.id];
            if (decision) {
              const formattedStatus = decision.charAt(0).toUpperCase() + decision.slice(1) as any;
              return { ...app, status: formattedStatus };
            }
            return app;
          })
        };
      }
      return bulk;
    });
    return {
      bulkApplications: updatedBulkApplications,
      isConfirmModalOpen: false,
      isSuccessModalOpen: true
    };
  }),
  resetSelection: () => set({
    selectedApplicantIds: [],
    stagedDecisions: {},
    isSuccessModalOpen: false,
    currentPage: 1
  }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export const calculateSOA = (selectedCount: number): SOASummary => {
  if (selectedCount === 0) {
    return {
      licenseFee: 0,
      inspectionFee: 0,
      docStampTax: 0,
      surcharge: 0,
      total: 0,
      dueDate: null,
    };
  }
  // Simplified calculation logic for "government-grade" feel
  const licenseFee = selectedCount * 550.00;
  const inspectionFee = selectedCount * 250.00;
  const docStampTax = 30.00; // Fixed per batch or per application? Usually per application or batch.
  const surcharge = 0.00;

  return {
    licenseFee,
    inspectionFee,
    docStampTax,
    surcharge,
    total: licenseFee + inspectionFee + docStampTax + surcharge,
    dueDate: '2024-12-31',
  };
};
