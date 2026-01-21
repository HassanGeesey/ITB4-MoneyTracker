
import React, { useState, useMemo } from 'react';
import { Student, Payment, PaymentStatus } from '../types';

interface AddPaymentModalProps {
  students: Student[];
  onClose: () => void;
  onSave: (payment: Omit<Payment, 'id'>) => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ students, onClose, onSave }) => {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState('25.00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.PAID);

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(search.toLowerCase()) || 
      s.group.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5); // Show top 5 matches
  }, [students, search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    onSave({
      studentId: student.id,
      studentName: student.name,
      group: student.group,
      amount: parseFloat(amount),
      date,
      status
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[#e8f0f2] flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#0f181a]">Add New Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="relative">
            <label className="block text-xs font-bold text-secondary uppercase mb-1">Student</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
              <input 
                type="text" 
                placeholder="Search by name or group..."
                className="w-full pl-9 pr-4 py-2 bg-[#f0f4f5] border-none rounded-xl focus:ring-2 focus:ring-primary text-sm mb-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {filteredStudents.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedStudentId(s.id);
                    setSearch(s.name);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex justify-between items-center ${
                    selectedStudentId === s.id ? 'bg-primary text-white font-bold' : 'bg-gray-50 text-secondary hover:bg-gray-100'
                  }`}
                >
                  <span>{s.name} (Group {s.group})</span>
                  {selectedStudentId === s.id && <span className="material-symbols-outlined text-sm">check</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Amount ($)</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full bg-[#f0f4f5] border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Date</label>
              <input 
                required
                type="date" 
                className="w-full bg-[#f0f4f5] border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase mb-1">Status</label>
            <div className="flex gap-2">
              {Object.values(PaymentStatus).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wide border-2 transition-all ${
                    status === s 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-white border-[#e8f0f2] text-secondary hover:border-primary/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={!selectedStudentId}
              className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all ${
                selectedStudentId 
                  ? 'bg-primary text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;
