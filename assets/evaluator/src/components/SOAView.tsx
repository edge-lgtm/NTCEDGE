import React from 'react';
import { useEvaluatorStore, calculateSOA } from '../store/useEvaluatorStore';
import { Calendar, Edit2, Info } from 'lucide-react';
import { numberToWords } from '../utils/numberToWords';

export const SOAView = () => {
  const { selectedApplicantIds } = useEvaluatorStore();
  const soa = calculateSOA(selectedApplicantIds.length);

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-[#1A0B4B] to-[#2D0C8A] p-8 text-white relative">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-1">Statement of Account</h3>
            <p className="text-purple-200/80 text-sm font-medium">Summary of fees for {selectedApplicantIds.length} selected applicants</p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Info size={120} />
          </div>
        </div>

        <div className="p-10">
          <div className="space-y-5">
            <FeeRow label="License Fee" value={soa.licenseFee} />
            <FeeRow label="Inspection Fee" value={soa.inspectionFee} />
            <FeeRow label="Documentary Stamp Tax" value={soa.docStampTax} />
            <FeeRow label="Surcharge" value={soa.surcharge} />

            <div className="pt-8 mt-8 border-t-2 border-dashed border-gray-100 flex justify-between items-end">
              <div>
                <span className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Payable Amount</span>
                <span className="text-3xl font-black text-[#2D0C8A]">PHP {soa.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Amount in Words</div>
                <div className="text-sm font-bold text-gray-900 italic">{numberToWords(soa.total)}</div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-[#F9F8FF] rounded-xl border border-purple-100 group">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#2D0C8A]" />
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Payment Due Date</span>
                </div>
                <button className="text-[#2D0C8A] p-1.5 hover:bg-white rounded-md transition-all shadow-sm opacity-0 group-hover:opacity-100">
                  <Edit2 size={14} />
                </button>
              </div>
              <div className="text-xl font-black text-gray-900">
                {soa.dueDate ? new Date(soa.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No due date set'}
              </div>
            </div>

            <div className="p-6 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-4 text-blue-700">
                <Info size={16} />
                <span className="text-[11px] font-black uppercase tracking-widest">Important Note</span>
              </div>
              <p className="text-xs text-blue-800 font-medium leading-relaxed">
                Fees are subject to recalculation upon submission. Please ensure all details are correct before finalizing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeeRow = ({ label, value }: { label: string, value: number }) => (
  <div className="flex justify-between items-center py-2 group">
    <span className="text-gray-500 font-bold text-sm group-hover:text-gray-700 transition-colors">{label}</span>
    <span className="font-black text-gray-900 tracking-tight">PHP {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
  </div>
);
