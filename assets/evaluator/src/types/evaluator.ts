export type Decision = 'approved' | 'endorsed' | 'declined' | null;

export interface Applicant {
  id: string;
  name: string;
  status: 'Pending' | 'Approved' | 'Endorsed' | 'Declined';
  applicationType: string;
  submissionDate: string;
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
