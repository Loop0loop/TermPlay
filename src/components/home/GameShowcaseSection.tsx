import React, { useState } from 'react';
import { gamesData } from '../../data/games';
import type { GameData } from '../../data/games';
import { Play, Menu } from 'lucide-react';

export function GameShowcaseSection() {
  const [activeGame, setActiveGame] = useState<GameData>(gamesData[0]);

  // Color mappings for active state
  const bgGradientMap: Record<string, string> = {
    blue: "from-[#001f3f]",
    purple: "from-[#2b003f]",
    green: "from-[#002f15]",
    pink: "from-[#3f001f]",
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center">
      {/* Dynamic Background */}
      <div 
        key={activeGame.id}
        className={`absolute inset-0 bg-gradient-to-r ${bgGradientMap[activeGame.accentColor]} to-gray-900 transition-opacity duration-700 ease-in-out`}
      >
        {/* Placeholder for character art */}
        <div className="absolute right-0 top-0 w-3/4 h-full bg-gradient-to-l from-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-12">
        
        {/* Floating Sidebar (Tilted / Perspective view effect in CSS or just straight) */}
        {/* In the image, the sidebar is a rounded dark glass box with a bright cyan border around the whole thing or active item */}
        <div className="absolute left-[30%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 w-20 py-6 bg-[#1a1a1a]/80 backdrop-blur-lg rounded-[2rem] border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] z-20 transform -skew-x-6 origin-center">
          <div className="transform skew-x-6 flex flex-col gap-3">
            {gamesData.map((game) => {
              const isActive = activeGame.id === game.id;
              return (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game)}
                  className={`relative w-14 h-14 rounded-[1.25rem] overflow-hidden transition-all duration-300 flex items-center justify-center text-xl font-bold bg-gray-800
                    ${isActive 
                      ? `scale-110 shadow-lg` 
                      : 'opacity-50 hover:opacity-100 hover:scale-105'
                    }
                  `}
                >
                   <span className="text-white opacity-80">{game.title.charAt(0)}</span>
                </button>
              );
            })}
            
            <div className="w-8 h-[1px] bg-gray-600 my-2 mx-auto"></div>
            
            {/* App Drawer Icon */}
            <button className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto bg-white/5 hover:bg-white/10 transition-colors">
              <span className="grid grid-cols-2 gap-[2px] w-5 h-5">
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
                <div className="bg-gray-400 rounded-sm"></div>
              </span>
            </button>
          </div>
        </div>

        {/* Central Text - Game Title */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <h2 className="text-6xl font-black text-white italic drop-shadow-2xl opacity-90 tracking-widest">
              {activeGame.title}
            </h2>
        </div>

        {/* Info Links (Center bottom) */}
        <div className="absolute bottom-32 left-[45%] flex gap-8 text-sm font-medium text-gray-300">
          <div className="flex justify-between w-40 hover:text-white cursor-pointer group">
            <span>공지사항</span> <span className="text-gray-600 group-hover:text-gray-400">05/23</span>
          </div>
          <div className="flex justify-between w-40 hover:text-white cursor-pointer group">
            <span>소식</span> <span className="text-gray-600 group-hover:text-gray-400">05/23</span>
          </div>
        </div>

        {/* Bottom Left Button (게임 실행) */}
        <div className="absolute bottom-16 left-12 flex items-center gap-4">
          <button className="group relative flex items-center gap-4 bg-[#eebd44] text-black px-10 py-4 rounded-full text-lg font-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(238,189,68,0.3)]">
            <Play className="fill-black" size={20} />
            게임 실행
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors">
             <Menu size={20} className="text-white" />
          </button>
        </div>

        {/* Bottom Right Info */}
        <div className="absolute bottom-16 right-16 flex flex-col items-end text-right">
          <div className="mb-4">
            <h3 className="text-xl font-light text-white tracking-[0.2em] opacity-90 mb-1">HoYoverse</h3>
            <h2 className="text-[3.5rem] leading-[1.1] font-bold text-white tracking-tighter">통합형<br/><span className="text-3xl font-medium opacity-80 tracking-normal">게임 플랫폼</span></h2>
          </div>
          <p className="text-sm text-gray-400 max-w-sm mt-6 leading-relaxed font-light">
            PC 클라이언트를 지원하는 HoYoverse의 모든 게임이 한데 모였다<br/>
            반복되는 번거로운 작업은 안녕! 한 번의 설치로 쾌적한 플레이 가능!
          </p>
        </div>

      </div>
    </section>
  );
}
