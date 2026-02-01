
import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GAMES_DATA } from '../constants';
import { ChevronLeft, Maximize2, RotateCcw, ThumbsUp, MessageSquare, Share2, Star } from 'lucide-react';

const GameView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES_DATA.find((g) => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-3xl font-bold mb-4">Game Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 px-6 py-2 rounded-lg font-bold"
        >
          Back to Arcade
        </button>
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    
    if (iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-semibold"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Gallery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Game Player */}
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-slate-800">
            <div className="aspect-video w-full bg-black relative">
              <iframe
                ref={iframeRef}
                src={game.iframeUrl}
                className="w-full h-full border-none"
                title={game.title}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups"
              ></iframe>
            </div>
            
            {/* Player Controls */}
            <div className="bg-slate-900/90 backdrop-blur-md px-6 py-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg">{game.title}</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{game.category}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={reloadGame}
                  className="p-3 bg-slate-800 text-slate-300 hover:text-white rounded-xl hover:bg-slate-700 transition-all"
                  title="Reload Game"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all flex items-center gap-2 font-bold"
                >
                  <Maximize2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">About the Game</h3>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors font-bold text-sm">
                  <ThumbsUp className="w-4 h-4" /> 12K
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors font-bold text-sm">
                  <MessageSquare className="w-4 h-4" /> 42
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors font-bold text-sm">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg">
              {game.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Plays</p>
                <p className="text-white font-bold">{game.plays}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Rating</p>
                <p className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" /> {game.rating}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Released</p>
                <p className="text-white font-bold">Oct 2023</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Type</p>
                <p className="text-white font-bold">Web Browser</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Related Games */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            More for You
          </h4>
          <div className="space-y-4">
            {GAMES_DATA.filter(g => g.id !== id).slice(0, 5).map((relatedGame) => (
              <Link key={relatedGame.id} to={`/game/${relatedGame.id}`} className="flex gap-4 group">
                <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                  <img src={relatedGame.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-slate-200 font-bold text-sm truncate group-hover:text-indigo-400 transition-colors">{relatedGame.title}</p>
                  <p className="text-slate-500 text-xs">{relatedGame.category}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs text-amber-500 font-bold">{relatedGame.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
