import React from 'react';
import { gamesData } from '../../data/games';
import { GameCard } from '../ui/GameCard';
import { ChevronUp } from 'lucide-react';

export function PopularGamesSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-32 bg-[#141414] px-16">
      <div className="max-w-[1400px] mx-auto relative">
        <h2 className="text-[2.5rem] font-bold mb-20 text-gray-200 tracking-tight">인기 게임 마음껏 즐기기</h2>
        
        {/* Adjusted grid to perfectly center the 4 items with equal spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gamesData.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
      
      {/* Scroll to top button - Right side floating */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-20 right-16 w-16 h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-3xl transition-all"
        aria-label="Scroll to top"
      >
        <ChevronUp size={32} className="text-gray-300" />
      </button>
    </section>
  );
}
