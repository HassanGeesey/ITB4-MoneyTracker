
import React, { useState } from 'react';
import { Student, Payment, PaymentStatus } from '../types';

interface StudentsViewProps {
  students: Student[];
  payments: Payment[];
}

const StudentsView: React.FC<StudentsViewProps> = ({ students, payments }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStudentStatus = (studentId: string) => {
    const studentPayments = payments.filter(p => p.studentId === studentId && p.status === PaymentStatus.PAID);
    return studentPayments.length > 0 ? 'PAID' : 'NOT PAID';
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#0f181a]">Class Directory</h3>
          <p className="text-secondary text-sm">Managing {students.length} students across all groups</p>
        </div>
        <div className="flex-1 sm:w-80 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
          <input 
            type="text" 
            placeholder="Find a student..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#d1e2e5] rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => {
          const status = getStudentStatus(student.id);
          const isPaid = status === 'PAID';

          return (
            <div key={student.id} className="bg-white p-4 rounded-2xl border border-[#d1e2e5] shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full overflow-hidden border-2 border-primary/10">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0f181a] group-hover:text-primary transition-colors">{student.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-gray-100 px-2 py-0.5 rounded-full text-secondary">GROUP {student.group}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="material-symbols-outlined text-gray-300 hover:text-primary transition-colors">arrow_forward</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentsView;
