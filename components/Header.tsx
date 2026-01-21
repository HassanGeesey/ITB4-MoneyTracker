
import React from 'react';

interface HeaderProps {
  viewTitle: string;
}

const Header: React.FC<HeaderProps> = ({ viewTitle }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-4 border-b border-[#e8f0f2]">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-extrabold text-[#0f181a]">{viewTitle} Overview</h2>
        <div className="hidden md:flex items-center bg-[#f0f4f5] rounded-xl px-3 py-2 w-64 border border-transparent focus-within:border-primary/50 transition-all">
          <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-400" 
            placeholder="Search student or group..." 
            type="text" 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="size-10 flex items-center justify-center bg-white border border-[#e8f0f2] rounded-xl text-gray-500 hover:bg-primary/10 hover:text-primary transition-all">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-[#e8f0f2]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">Admin User</p>
            <p className="text-xs text-[#538893] mt-1">Batch Coordinator</p>
          </div>
          <div 
            className="size-10 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-sm" 
            style={{ backgroundImage: "url('https://picsum.photos/seed/admin/100')" }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
