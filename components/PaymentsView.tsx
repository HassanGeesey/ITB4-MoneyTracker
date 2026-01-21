
import React, { useState } from 'react';
import { Payment, PaymentStatus } from '../types';
import { INITIAL_STUDENTS } from '../mockData';

interface PaymentsViewProps {
  payments: Payment[];
  onAddPayment: () => void;
}

const PaymentsView: React.FC<PaymentsViewProps> = ({ payments, onAddPayment }) => {
  const [filter, setFilter] = useState<string>('');

  const filteredPayments = payments.filter(p => 
    p.studentName.toLowerCase().includes(filter.toLowerCase()) || 
    p.group.toLowerCase().includes(filter.toLowerCase())
  );

  // Helper to get student avatar
  const getAvatar = (studentId: string) => {
    return INITIAL_STUDENTS.find(s => s.id === studentId)?.avatar || 
           `https://api.dicebear.com/7.x/initials/svg?seed=${studentId}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#0f181a]">Payment Records</h3>
          <p className="text-secondary text-sm">A complete history of all class contributions</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-64 relative">
             <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
             <input 
              type="text" 
              placeholder="Search record..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#d1e2e5] rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
             />
          </div>
          <button 
            onClick={onAddPayment}
            className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span> Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#d1e2e5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-secondary text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Group</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8f0f2]">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">#{p.id.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                          <img src={getAvatar(p.studentId)} alt={p.studentName} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-bold text-[#0f181a]">{p.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">Group {p.group}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#0f181a]">${p.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{p.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide inline-block min-w-[80px] text-center ${
                        p.status === PaymentStatus.PAID ? 'bg-green-100 text-green-600' :
                        p.status === PaymentStatus.PENDING ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="material-symbols-outlined text-gray-300 hover:text-primary transition-colors">
                        edit_note
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 italic">
                    No payment records found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
