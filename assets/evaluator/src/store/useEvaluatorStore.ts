import { create } from 'zustand';
import { BulkApplication, Decision, SOASummary, ApplicantStatus } from '../types/evaluator';
import { mockBulkApplications } from '../data/mockData';

interface EvaluatorState {
  selectedBulkId: string | null;
  activeTab: 'bulk' | 'details' | 'soa';
  selectedApplicantIds: string[];
  selectedApplicantId: string | null;
  stagedDecisions: Record<string, Decision>;
  isConfirmModalOpen: boolean;
  isSuccessModalOpen: boolean;
  isDueDateModalOpen: boolean;
  feedTab: 'pending' | 'history';
  searchQuery: string;
  applicantSearchQuery: string;
  bulkApplications: BulkApplication[];
  currentPage: number;
  itemsPerPage: number;
  isSubmitting: boolean;
  isInitialLoading: boolean;
  dueDate: string | null;

  // Actions
  setSelectedBulkId: (id: string | null) => void;
  setSelectedApplicantId: (id: string | null) => void;
  setDueDate: (date: string | null) => void;
  setFeedTab: (tab: 'pending' | 'history') => void;
  setActiveTab: (tab: 'bulk' | 'details' | 'soa') => void;
  toggleApplicantSelection: (id: string) => void;
  setAllApplicantsSelection: (ids: string[], select: boolean) => void;
  stageDecision: (ids: string[], decision: Decision) => void;
  setConfirmModalOpen: (open: boolean) => void;
  setSuccessModalOpen: (open: boolean) => void;
  setDueDateModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setApplicantSearchQuery: (query: string) => void;
  submitDecisions: () => void;
  resetSelection: () => void;
  setCurrentPage: (page: number) => void;
}

export const useEvaluatorStore = create<EvaluatorState>((set) => ({
  selectedBulkId: null,
  activeTab: 'bulk',
  selectedApplicantIds: [],
  selectedApplicantId: null,
  stagedDecisions: {},
  isConfirmModalOpen: false,
  isSuccessModalOpen: false,
  isDueDateModalOpen: false,
  feedTab: 'pending',
  searchQuery: '',
  applicantSearchQuery: '',
  bulkApplications: mockBulkApplications,
  currentPage: 1,
  itemsPerPage: 5,
  isSubmitting: false,
  isInitialLoading: false,
  dueDate: '2024-12-31',

  setSelectedBulkId: (id) => {
    if (!id) {
      set({ selectedBulkId: null });
      return;
    }

    set({ isInitialLoading: true });

    // Simulate "government-grade" loading delay
    setTimeout(() => {
      set({
        selectedBulkId: id,
        selectedApplicantIds: [],
        selectedApplicantId: null,
        stagedDecisions: {},
        activeTab: 'bulk',
        currentPage: 1,
        applicantSearchQuery: '',
        isInitialLoading: false,
        dueDate: '2024-12-31'
      });
    }, 800);
  },
  setSelectedApplicantId: (id) => set({ selectedApplicantId: id }),
  setDueDate: (date) => set({ dueDate: date }),
  setFeedTab: (tab) => set({ feedTab: tab }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleApplicantSelection: (id) => set((state) => ({
    selectedApplicantIds: state.selectedApplicantIds.includes(id)
      ? state.selectedApplicantIds.filter(aid => aid !== id)
      : [...state.selectedApplicantIds, id]
  })),
  setAllApplicantsSelection: (ids, select) => set((state) => {
    if (select) {
      const newSelection = [...new Set([...state.selectedApplicantIds, ...ids])];
      return { selectedApplicantIds: newSelection };
    } else {
      const newSelection = state.selectedApplicantIds.filter(id => !ids.includes(id));
      return { selectedApplicantIds: newSelection };
    }
  }),
  stageDecision: (ids, decision) => set((state) => {
    const newDecisions = { ...state.stagedDecisions };
    ids.forEach(id => {
      newDecisions[id] = decision;
    });
    return {
      stagedDecisions: newDecisions,
      selectedApplicantIds: []
    };
  }),
  setConfirmModalOpen: (open) => set({ isConfirmModalOpen: open }),
  setSuccessModalOpen: (open) => set({ isSuccessModalOpen: open }),
  setDueDateModalOpen: (open) => set({ isDueDateModalOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setApplicantSearchQuery: (query) => set({ applicantSearchQuery: query, currentPage: 1 }),
  submitDecisions: async () => {
    const { selectedBulkId, stagedDecisions, bulkApplications } = useEvaluatorStore.getState();
    if (!selectedBulkId) return;

    set({ isSubmitting: true });

    // Simulate API delay for a "government-grade" system
    await new Promise(resolve => setTimeout(resolve, 1500));

    const updatedBulkApplications = bulkApplications.map(bulk => {
      if (bulk.id === selectedBulkId) {
        const updatedApplicants = bulk.applicants.map(app => {
          const decision = stagedDecisions[app.id];
          if (decision) {
            const formattedStatus = (decision.charAt(0).toUpperCase() + decision.slice(1)) as ApplicantStatus;
            return { ...app, status: formattedStatus };
          }
          return app;
        });

        // Transition to History if all applicants are processed
        const allProcessed = updatedApplicants.every(app => app.status !== 'Pending');

        return {
          ...bulk,
          applicants: updatedApplicants,
          status: (allProcessed ? 'History' : 'Pending') as 'Pending' | 'History'
        };
      }
      return bulk;
    });

    set({
      bulkApplications: updatedBulkApplications,
      isConfirmModalOpen: false,
      isSuccessModalOpen: true,
      isSubmitting: false
    });
  },
  resetSelection: () => set({
    selectedApplicantIds: [],
    stagedDecisions: {},
    isSuccessModalOpen: false,
    currentPage: 1,
    selectedBulkId: null // Force unselect after completion
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
