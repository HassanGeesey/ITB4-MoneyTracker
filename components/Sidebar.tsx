
import React from 'react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'payments', icon: 'receipt_long', label: 'Payments' },
    { id: 'groups', icon: 'group', label: 'Groups' },
    { id: 'students', icon: 'school', label: 'Students' },
    { id: 'reports', icon: 'analytics', label: 'Reports' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#e8f0f2] flex flex-col flex-shrink-0 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined">payments</span>
        </div>
        <div>
          <h1 className="text-[#0f181a] text-base font-bold leading-none">IT Batch 4</h1>
          <p className="text-[#538893] text-xs font-medium mt-1">Money Tracker</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'sidebar-active text-white' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#e8f0f2]">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
