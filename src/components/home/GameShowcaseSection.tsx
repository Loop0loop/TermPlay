import React, { useState } from 'react';
import { gamesData } from '../../data/games';
import type { GameData } from '../../data/games';
import { BookOpen, Box, Library, Rocket, ChevronRight, Play } from 'lucide-react';
import { gameThemeByAccent } from '../../lib/gameTheme';
import { useI18n } from '../../lib/i18n';
import { LatestReleaseButton } from '../ui/LatestReleaseButton';

export function GameShowcaseSection() {
  const t = useI18n();
  const [activeGame, setActiveGame] = useState<GameData>(gamesData[0]);
  const activeGameCopy = t.games[activeGame.copyKey];
  const activeTheme = gameThemeByAccent[activeGame.accentColor];

  const actionItems = [
    { label: t.showcase.actions.launcher, icon: Rocket },
    { label: t.showcase.actions.library, icon: Library },
    { label: t.showcase.actions.assets, icon: Box },
    { label: t.showcase.actions.guide, icon: BookOpen },
  ];

  return (
    <section className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-black lg:pl-24">
      {/* Dynamic Backgrounds */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.showcase} via-black to-black transition-colors duration-1000 ease-out`} />
      <div className="termplay-raster-field absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      {activeGame.id === "mienjine" ? (
        <div className="termplay-character-silhouette transition-opacity duration-1000 ease-in-out" />
      ) : null}

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        {/* Left Content Area: Title & Navigation */}
        <div className="flex flex-col gap-10 flex-1">
          {/* Game Selection Toggle */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-md w-fit">
            {gamesData.map((game) => {
              const isActive = activeGame.id === game.id;
              const gameCopy = t.games[game.copyKey];
              return (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game)}
                  className={`flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    isActive 
                      ? "bg-white text-black shadow-lg scale-105" 
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="mr-2 text-xl italic">{game.marker}</span>
                  <span>{gameCopy.title}</span>
                </button>
              );
            })}
          </div>

          <div>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-2xl">
              {activeGameCopy.title}
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-bold uppercase tracking-widest backdrop-blur-md">
                {t.showcase.edition}
              </span>
              <span className="text-white/60 font-medium">v1.2.0 • {activeGame.issueDate}</span>
            </div>
          </div>

          {/* Quick Actions (Replacing the big grid) */}
          <div className="flex flex-wrap gap-4 mt-4">
            {actionItems.map(({ label, icon: Icon }) => (
              <button 
                key={label} 
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/40 border border-white/10 text-white/80 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md group"
              >
                <Icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
                <span className="font-semibold text-sm tracking-wide">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area: Download & Play */}
        <div className="flex flex-col items-start lg:items-end gap-6 w-full lg:w-auto">
          {/* Info Card */}
          <div className="w-full lg:w-96 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="flex gap-6 border-b border-white/10 px-6 pt-5">
              {t.showcase.tabs.map((tab, index) => (
                <button key={tab} className={`pb-4 text-sm font-bold tracking-wide transition-colors relative ${index === 0 ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                  {tab}
                  {index === 0 && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-t-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
                </button>
              ))}
            </div>
            <div className="px-6 py-5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
              <span className="font-medium text-white/90 group-hover:text-white truncate pr-4">{activeGameCopy.updateTitle}</span>
              <ChevronRight size={18} className="text-white/40 group-hover:text-white/80" />
            </div>
          </div>

          {/* Play Button Area */}
          <div className="w-full lg:w-96 flex flex-col gap-4">
            <div className="flex justify-between items-center px-4">
              <span className="text-white/60 text-sm font-medium tracking-wide">{t.showcase.updateAvailable}</span>
              <span className="text-blue-400 text-sm font-mono font-bold">{t.showcase.updateSize}</span>
            </div>
            
            {/* The actual play/download button */}
            <div className="w-full relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <LatestReleaseButton 
                compact 
                className="w-full h-20 text-2xl rounded-3xl bg-white text-black hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 relative z-10" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
