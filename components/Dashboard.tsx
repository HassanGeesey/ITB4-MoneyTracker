
import React from 'react';
import { DashboardStats, PaymentStatus } from '../types';
import { INITIAL_STUDENTS } from '../mockData';

interface DashboardProps {
  stats: DashboardStats;
  onAddPayment: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onAddPayment }) => {
  const collectionPercent = (stats.totalCollected / stats.targetAmount) * 100;
  const studentPercent = (stats.studentsPaid / stats.totalStudents) * 100;

  // Helper to get student avatar
  const getAvatar = (studentId: string) => {
    return INITIAL_STUDENTS.find(s => s.id === studentId)?.avatar || 
           `https://api.dicebear.com/7.x/initials/svg?seed=${studentId}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-2 -top-2 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-8xl text-primary">account_balance_wallet</span>
          </div>
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider">Total Collected</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-black text-slate-900">${stats.totalCollected.toLocaleString()}</h3>
            <span className="text-green-600 text-xs font-bold flex items-center">
              <span className="material-symbols-outlined text-xs">trending_up</span> 12%
            </span>
          </div>
          <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${collectionPercent}%` }}></div>
          </div>
          <p className="text-xs text-secondary mt-3">Target: ${stats.targetAmount.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-2 -top-2 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-8xl text-primary">groups_3</span>
          </div>
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider">Students Paid</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-black text-slate-900">{stats.studentsPaid}/{stats.totalStudents}</h3>
            <span className="text-green-600 text-xs font-bold flex items-center">
              <span className="material-symbols-outlined text-xs">done_all</span> +4
            </span>
          </div>
          <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${studentPercent}%` }}></div>
          </div>
          <p className="text-xs text-secondary mt-3">{Math.round(studentPercent)}% of class completed</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-2 -top-2 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-8xl text-primary">pending_actions</span>
          </div>
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider">Remaining Balance</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-black text-slate-900">${stats.remainingBalance.toLocaleString()}</h3>
            <span className="text-red-600 text-xs font-bold flex items-center">
              <span className="material-symbols-outlined text-xs">schedule</span> Urgent
            </span>
          </div>
          <button className="mt-4 px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all w-full flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">mail</span>
            Send Reminders
          </button>
        </div>
      </div>

      {/* Group Contributions Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">hub</span> Group Contributions
          </h4>
          <button className="text-sm font-bold text-primary hover:underline">View All Groups</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {stats.groupStats.map((group) => (
            <div key={group.name} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 bg-white hover:border-primary/40 transition-all cursor-pointer group shadow-sm hover:shadow-md">
              <div className="size-8 rounded-full bg-primary/5 flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="text-xs font-bold">{group.name}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Group {group.name}</p>
              <p className="text-sm font-extrabold text-slate-900">${group.totalPaid}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h4 className="text-lg font-bold text-slate-900">Recent Transactions</h4>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-secondary border border-slate-200 hover:bg-slate-100">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
            </button>
            <button 
              onClick={onAddPayment}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">add</span> Add Payment
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-secondary text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Group</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full overflow-hidden border border-slate-100">
                        <img src={getAvatar(tx.studentId)} alt={tx.studentName} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">{tx.studentName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">Group {tx.group}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">${tx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide inline-block min-w-[80px] ${
                      tx.status === PaymentStatus.PAID ? 'bg-green-100 text-green-600' :
                      tx.status === PaymentStatus.PENDING ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="material-symbols-outlined text-slate-300 hover:text-primary transition-colors cursor-pointer">more_vert</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 flex items-center justify-center border-t border-slate-100">
          <button className="text-xs font-bold text-secondary hover:text-primary flex items-center gap-1">
            Load More Transactions <span className="material-symbols-outlined text-xs">expand_more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
