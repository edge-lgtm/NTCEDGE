import React, { useMemo } from 'react';
import { useEvaluatorStore, calculateSOA } from '../store/useEvaluatorStore';
import { SOACard } from './SOACard';

export const SOAView = () => {
  const { selectedApplicantIds, stagedDecisions, dueDate, setDueDateModalOpen } = useEvaluatorStore();

  const totalRelevantCount = useMemo(() => {
    const stagedIds = Object.keys(stagedDecisions);
    const combinedUniqueIds = new Set([...selectedApplicantIds, ...stagedIds]);
    return combinedUniqueIds.size;
  }, [selectedApplicantIds, stagedDecisions]);

  const soa = useMemo(() => calculateSOA(totalRelevantCount), [totalRelevantCount]);

  return (
    <div className="max-w-3xl mx-auto py-4">
      <SOACard
        soa={soa}
        totalRelevantCount={totalRelevantCount}
        dueDate={dueDate}
        onEditDueDate={() => setDueDateModalOpen(true)}
      />
    </div>
  );
};
