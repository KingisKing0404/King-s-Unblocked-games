
import React from 'react';
import { Game } from '../types';
import { Link } from 'react-router-dom';
import { Star, PlayCircle, Users } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`/game/${game.id}`} className="group">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-indigo-500/50 transition-all duration-300">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-indigo-600 rounded-full p-4 shadow-xl shadow-indigo-500/40">
            <PlayCircle className="w-8 h-8 text-white fill-white/20" />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-slate-950/80 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-md border border-slate-700 text-indigo-400">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="mt-3 px-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
            <Star className="w-3 h-3 fill-amber-400" />
            {game.rating}
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {game.plays} plays
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
