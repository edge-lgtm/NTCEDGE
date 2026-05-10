import { BulkApplication, Applicant } from '../types/evaluator';

const generateApplicants = (count: number, startIndex: number): Applicant[] => {
  const names = ['JUAN DELA CRUZ', 'MARIA CLARA', 'JOSE RIZAL', 'ANDRES BONIFACIO', 'EMILIO AGUINALDO', 'APOLINARIO MABINI', 'MELCHORA AQUINO', 'GABRIELA SILANG'];
  const locations = ['Quezon City, NCR', 'Manila, NCR', 'Cebu City, Region VII', 'Davao City, Region XI', 'Baguio City, CAR', 'Iloilo City, Region VI'];

  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length];
    const emailName = name.toLowerCase().replace(/\s+/g, '.');

    return {
      id: `app-${startIndex + i}`,
      name: `APPLICANT ${startIndex + i} - ${name}`,
      status: 'Pending',
      applicationType: i % 3 === 0 ? 'New' : 'Renewal',
      submissionDate: `2024-08-${String(10 + (i % 20)).padStart(2, '0')}`,
      email: `${emailName}${startIndex + i}@example.com`,
      phone: `+63 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      location: locations[i % locations.length],
    };
  });
};

export const mockBulkApplications: BulkApplication[] = [
  {
    id: 'bulk-1',
    referenceNumber: 'BULK-2024-001',
    title: 'NCR Radio Operators Batch A',
    applicantsCount: 25,
    status: 'Pending',
    applicants: generateApplicants(25, 1),
    createdAt: '2024-08-24',
    assignedTo: 'Senior Officer Reyes',
    category: 'Radio Operator Licenses',
  },
  {
    id: 'bulk-2',
    referenceNumber: 'BULK-2024-002',
    title: 'Region III Equipment Batch',
    applicantsCount: 8,
    status: 'Pending',
    applicants: generateApplicants(8, 26),
    createdAt: '2024-08-25',
    assignedTo: 'Senior Officer Reyes',
    category: 'Equipment Registration',
  },
  {
    id: 'bulk-3',
    referenceNumber: 'BULK-2024-003',
    title: 'Mobile Service Providers Q3',
    applicantsCount: 12,
    status: 'Pending',
    applicants: generateApplicants(12, 34),
    createdAt: '2024-08-26',
    assignedTo: 'Senior Officer Reyes',
    category: 'Service Providers',
  },
];
