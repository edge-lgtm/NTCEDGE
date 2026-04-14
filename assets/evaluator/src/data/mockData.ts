import { BulkApplication } from '../types/evaluator';

export const mockBulkApplications: BulkApplication[] = [
  {
    id: 'bulk-1',
    referenceNumber: 'BULK-2024-001',
    title: 'NCR Radio Operators Batch A',
    applicantsCount: 5,
    status: 'Pending',
    applicants: [
      { id: 'app-1', name: 'JUAN DELA CRUZ', status: 'Pending', applicationType: 'New', submissionDate: '2024-08-10' },
      { id: 'app-2', name: 'MARIA CLARA', status: 'Pending', applicationType: 'Renewal', submissionDate: '2024-08-11' },
      { id: 'app-3', name: 'JOSE RIZAL', status: 'Pending', applicationType: 'New', submissionDate: '2024-08-12' },
      { id: 'app-4', name: 'ANDRES BONIFACIO', status: 'Pending', applicationType: 'Renewal', submissionDate: '2024-08-13' },
      { id: 'app-5', name: 'EMILIO AGUINALDO', status: 'Pending', applicationType: 'New', submissionDate: '2024-08-14' },
    ],
  },
  {
    id: 'bulk-2',
    referenceNumber: 'BULK-2024-002',
    title: 'Region III Equipment Batch',
    applicantsCount: 3,
    status: 'Pending',
    applicants: [
      { id: 'app-6', name: 'APOLINARIO MABINI', status: 'Pending', applicationType: 'New', submissionDate: '2024-08-15' },
      { id: 'app-7', name: 'MELCHORA AQUINO', status: 'Pending', applicationType: 'Renewal', submissionDate: '2024-08-16' },
      { id: 'app-8', name: 'GABRIELA SILANG', status: 'Pending', applicationType: 'New', submissionDate: '2024-08-17' },
    ],
  },
];
