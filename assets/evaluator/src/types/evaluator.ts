export type Decision = 'approved' | 'endorsed' | 'declined' | null;

export type ApplicantStatus = 'Pending' | 'Approved' | 'Endorsed' | 'Declined';

export interface Applicant {
  id: string;
  name: string;
  status: ApplicantStatus;
  applicationType: string;
  submissionDate: string;
  email: string;
  phone: string;
  location: string;
}

export interface BulkApplication {
  id: string;
  referenceNumber: string;
  title: string;
  applicantsCount: number;
  applicants: Applicant[];
  status: 'Pending' | 'History';
}

export interface SOASummary {
  licenseFee: number;
  inspectionFee: number;
  docStampTax: number;
  surcharge: number;
  total: number;
  dueDate: string | null;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
