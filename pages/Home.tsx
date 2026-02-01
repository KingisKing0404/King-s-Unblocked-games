
import React, { useState, useMemo } from 'react';
import { GAMES_DATA, CATEGORIES } from '../constants';
import GameCard from '../components/GameCard';
import { Category } from '../types';
import { Flame, Sparkles, TrendingUp } from 'lucide-react';

interface HomeProps {
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-8">
      {/* Hero Section */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[400px]">
            <img 
              src="https://picsum.photos/seed/arcade-hero/1200/600" 
              className="w-full h-full object-cover opacity-40"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-center px-8 sm:px-16">
              <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wider text-sm mb-4">
                <Sparkles className="w-5 h-5" />
                NEW RELEASES
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight max-w-2xl">
                Level Up Your <span className="text-indigo-500">Gaming</span> Experience.
              </h1>
              <p className="text-slate-400 text-lg mb-8 max-w-lg hidden sm:block">
                Explore a vast collection of unblocked games. No downloads, no lag, just pure arcade fun right in your browser.
              </p>
              <div className="flex gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105">
                  Play Popular
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Bar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Game Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {selectedCategory === 'All' ? (
             <>
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-black text-white">Trending Games</h2>
             </>
          ) : (
            <h2 className="text-2xl font-black text-white">{selectedCategory} Games</h2>
          )}
        </div>
        <span className="text-slate-500 text-sm font-medium">
          {filteredGames.length} Results
        </span>
      </div>

      {/* Game Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flame className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-300 mb-2">No games found</h3>
          <p className="text-slate-500">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
