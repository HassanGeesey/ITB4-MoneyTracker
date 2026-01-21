
import React from 'react';
import { GroupStats } from '../types';

interface GroupsViewProps {
  stats: GroupStats[];
  totalCollection: number;
}

const GroupsView: React.FC<GroupsViewProps> = ({ stats, totalCollection }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((group) => {
          const progress = (group.totalPaid / group.target) * 100;
          const isCompleted = progress >= 100;

          return (
            <div 
              key={group.name} 
              className={`bg-white p-8 rounded-2xl border border-[#d1e2e5] shadow-sm hover:shadow-xl transition-all duration-300 relative group border-t-4 ${
                isCompleted ? 'border-t-[#078834]' : 'border-t-primary'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xl font-extrabold text-[#0f181a]">Group {group.name}</h4>
                    {isCompleted && (
                      <span className="material-symbols-outlined text-[#078834] text-lg font-variation-fill">check_circle</span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F8FB] text-primary text-xs font-bold rounded-full">
                    <span className="material-symbols-outlined text-sm">school</span>
                    {group.studentCount} Students
                  </span>
                </div>
                <button className="text-[#d1e2e5] hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-end justify-between mb-2">
                  <span className="text-secondary text-sm font-medium">Contribution</span>
                  <div className="text-right">
                    <span className={`text-2xl font-black ${isCompleted ? 'text-[#078834]' : 'text-primary'}`}>
                      ${group.totalPaid}
                    </span>
                    <span className="text-secondary text-sm font-medium"> / ${group.target}</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-[#f0f4f5] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-[#078834]' : 'bg-primary'}`} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="mt-3 flex justify-between">
                  <p className={`text-xs font-bold uppercase ${isCompleted ? 'text-[#078834]' : 'text-secondary'}`}>
                    {Math.round(progress)}% {isCompleted ? 'Completed' : 'Progress'}
                  </p>
                  <p className="text-secondary text-xs font-medium">
                    {isCompleted ? 'All Paid' : `Remaining: $${group.target - group.totalPaid}`}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#f0f4f5] flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 bg-cover shadow-sm"
                      style={{ backgroundImage: `url('https://picsum.photos/seed/group${group.name}${i}/100')` }}
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    +{group.studentCount - 3}
                  </div>
                </div>
                <button className={`text-sm font-bold hover:underline flex items-center gap-1 ${isCompleted ? 'text-[#078834]' : 'text-primary'}`}>
                  {isCompleted ? 'Summary' : 'Details'} <span className="material-symbols-outlined text-sm">{isCompleted ? 'analytics' : 'arrow_forward'}</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Add Group Placeholder */}
        <div className="border-2 border-dashed border-[#d1e2e5] p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4 hover:bg-white transition-all cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <div>
            <h4 className="font-bold text-[#0f181a] mb-1">Add New Group</h4>
            <p className="text-xs text-secondary">Create a new batch for upcoming collection events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsView;
