import { BulkApplication, Applicant } from '../types/evaluator';

const generateApplicants = (count: number, startIndex: number): Applicant[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `app-${startIndex + i}`,
    name: `APPLICANT ${startIndex + i} - ${['JUAN DELA CRUZ', 'MARIA CLARA', 'JOSE RIZAL', 'ANDRES BONIFACIO', 'EMILIO AGUINALDO', 'APOLINARIO MABINI', 'MELCHORA AQUINO', 'GABRIELA SILANG'][i % 8]}`,
    status: 'Pending',
    applicationType: i % 3 === 0 ? 'New' : 'Renewal',
    submissionDate: `2024-08-${String(10 + (i % 20)).padStart(2, '0')}`,
  }));
};

export const mockBulkApplications: BulkApplication[] = [
  {
    id: 'bulk-1',
    referenceNumber: 'BULK-2024-001',
    title: 'NCR Radio Operators Batch A',
    applicantsCount: 25,
    status: 'Pending',
    applicants: generateApplicants(25, 1),
  },
  {
    id: 'bulk-2',
    referenceNumber: 'BULK-2024-002',
    title: 'Region III Equipment Batch',
    applicantsCount: 8,
    status: 'Pending',
    applicants: generateApplicants(8, 26),
  },
  {
    id: 'bulk-3',
    referenceNumber: 'BULK-2024-003',
    title: 'Mobile Service Providers Q3',
    applicantsCount: 12,
    status: 'Pending',
    applicants: generateApplicants(12, 34),
  },
];
