import React from 'react';
import { gamesData } from '../../data/games';
import { ArrowUp, Cpu, TerminalSquare } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { gameThemeByAccent } from '../../lib/gameTheme';

export function PopularGamesSection() {
  const t = useI18n();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-surface-section px-6 py-28 pb-56 lg:pl-36 lg:pr-16">
      <div className="termplay-raster-field absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="sticky top-28">
          <p className="mb-4 font-mono text-sm font-black uppercase tracking-brand-wide text-blue-300">{t.popularGames.eyebrow}</p>
          <h2 className="text-5xl font-black tracking-tight text-gray-100 md:text-7xl">{t.popularGames.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.popularGames.description}</p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {t.popularGames.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-border bg-surface-panel/70 p-5 backdrop-blur">
                <p className="font-mono text-3xl font-black text-foreground">{metric.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {gamesData.map((game, index) => {
            const copy = t.games[game.copyKey];
            const theme = gameThemeByAccent[game.accentColor];

            return (
              <article
                key={game.id}
                className="group grid overflow-hidden rounded-4xl border border-border bg-surface-panel/75 shadow-card-lifted backdrop-blur-xl md:grid-cols-[15rem_1fr]"
              >
                <div className={`relative min-h-56 ${theme.card}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-70`} />
                  <div className="termplay-raster-field absolute inset-0 opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-black italic text-white/25">{game.marker}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8 p-8">
                  <div>
                    <div className="mb-5 flex items-center gap-3 text-muted-foreground">
                      {index === 0 ? <TerminalSquare size={22} /> : <Cpu size={22} />}
                      <span className="font-mono text-sm font-black uppercase tracking-widest">{copy.shortDesc}</span>
                    </div>
                    <h3 className="text-5xl font-black italic text-foreground">{copy.title}</h3>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{copy.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-5">
                    <span className="font-mono text-sm font-bold text-muted-foreground">{copy.updateTitle}</span>
                    <span className="font-mono text-sm font-black text-blue-300">{game.issueDate}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute bottom-24 right-6 flex size-14 items-center justify-center rounded-2xl border border-border bg-surface-panel-muted backdrop-blur-sm transition-all hover:bg-white/20 md:right-16 md:size-16"
        aria-label={t.popularGames.scrollTop}
        title={t.popularGames.scrollTop}
      >
        <ArrowUp size={28} className="text-gray-300" />
      </button>
    </section>
  );
}
