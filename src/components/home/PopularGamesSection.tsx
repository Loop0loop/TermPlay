import React from 'react';
import { gamesData } from '../../data/games';
import { ArrowUp, Cpu, TerminalSquare, Sparkles } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { gameThemeByAccent } from '../../lib/gameTheme';

export function PopularGamesSection() {
  const t = useI18n();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-32 lg:px-24">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0c] to-black" />
      <div className="termplay-raster-field absolute inset-0 opacity-10" />
      
      <div className="relative mx-auto max-w-screen-2xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">{t.popularGames.eyebrow}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-xl">{t.popularGames.title}</h2>
            <p className="mt-6 text-lg text-white/50 font-medium leading-relaxed max-w-xl">{t.popularGames.description}</p>
          </div>

          {/* Stats / Metrics Area */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            {t.popularGames.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="text-4xl md:text-5xl font-black text-white">{metric.value}</span>
                <span className="text-sm font-bold uppercase tracking-widest text-white/40 mt-1">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Grid layout for games */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gamesData.map((game, index) => {
            const copy = t.games[game.copyKey];
            const theme = gameThemeByAccent[game.accentColor];

            return (
              <article
                key={game.id}
                className="group relative overflow-hidden rounded-3xl bg-[#111] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Background Glow Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="flex flex-col h-full relative z-10 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-auto pb-12">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 group-hover:text-white transition-colors`}>
                      {index === 0 ? <TerminalSquare size={24} /> : <Cpu size={24} />}
                    </div>
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-white/50">{copy.shortDesc}</span>
                  </div>

                  <div>
                    <h3 className="text-4xl md:text-5xl font-black italic text-white mb-4 drop-shadow-lg group-hover:scale-105 origin-left transition-transform duration-500">{copy.title}</h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md group-hover:text-white/70 transition-colors">
                      {copy.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10">
                    <span className="text-sm font-bold text-white/40 uppercase tracking-wider">{copy.updateTitle}</span>
                    <span className="text-sm font-black text-blue-400">{game.issueDate}</span>
                  </div>
                </div>

                {/* Decorative background letter */}
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none select-none">
                  <span className="text-[16rem] font-black italic">{game.marker}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Floating Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black shadow-xl opacity-80 hover:opacity-100"
        aria-label={t.popularGames.scrollTop}
        title={t.popularGames.scrollTop}
      >
        <ArrowUp size={24} />
      </button>
    </section>
  );
}
