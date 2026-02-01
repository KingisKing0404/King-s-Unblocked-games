
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameView from './pages/GameView';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-indigo-500/30">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/game/:id" element={<GameView />} />
          </Routes>
        </main>

        <footer className="bg-slate-950 border-t border-slate-800 py-12 px-8 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <span className="text-xl font-extrabold tracking-tight text-white">
                NOVA<span className="text-indigo-500">ARCADE</span>
              </span>
              <p className="text-slate-500 text-sm mt-2">
                The ultimate destination for unblocked web games.
              </p>
            </div>
            
            <div className="flex gap-12 text-slate-400 text-sm font-semibold">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="text-slate-600 text-sm">
              &copy; {new Date().getFullYear()} Nova Arcade Studio. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
