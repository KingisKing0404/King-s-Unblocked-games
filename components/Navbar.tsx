
import React from 'react';
import { Gamepad2, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white hidden sm:block">
            NOVA<span className="text-indigo-500">ARCADE</span>
          </span>
        </Link>

        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl leading-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
            placeholder="Search for your favorite game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            <Gamepad2 className="w-5 h-5" />
            Random Game
          </button>
          <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>
          <button className="bg-slate-900 text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-800 hover:bg-slate-800 transition-colors">
            Support
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
