import React, { useState } from 'react';
import { gamesData } from '../../data/games';
import type { GameData } from '../../data/games';
import { BookOpen, Box, Library, Menu, Rocket } from 'lucide-react';
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
    <section className="relative min-h-screen overflow-hidden bg-surface-canvas lg:pl-24">
      <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.showcase} via-surface-canvas to-surface-section transition-colors duration-500`} />
      <div className="termplay-raster-field absolute inset-0 opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-canvas via-transparent to-surface-canvas/20" />
      {activeGame.id === "mienjine" ? <div className="termplay-character-silhouette" /> : null}

      <div className="relative z-10 grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 px-6 pb-32 pt-32 md:px-14 lg:px-20 lg:pb-24">
        <div className="flex items-start justify-between gap-6">
          <div className="ml-0 md:ml-6">
            <h2 className="text-6xl font-black italic tracking-tight text-white drop-shadow-xl md:text-8xl">
              {activeGameCopy.title}
            </h2>
            <span className="mt-5 inline-flex rounded-md bg-blue-500 px-4 py-1 text-lg font-black text-white shadow-panel-glow">
              {t.showcase.edition}
            </span>
          </div>

          <div className="hidden gap-4 rounded-4xl border border-border bg-surface-panel/80 p-4 shadow-card-lifted backdrop-blur-lg lg:flex">
            {["G", "M"].map((label, index) => (
              <span key={label} className={`size-3 rounded-full ${index === 0 ? "bg-blue-400" : "bg-muted-foreground"}`} />
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex w-20 flex-col items-center gap-4 rounded-4xl border border-border bg-surface-panel/70 py-5 shadow-panel-glow backdrop-blur-xl lg:-ml-3">
            {gamesData.map((game) => {
              const isActive = activeGame.id === game.id;
              const gameCopy = t.games[game.copyKey];
              return (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game)}
                  className={`relative flex size-14 items-center justify-center rounded-2xl text-2xl font-black transition ${isActive ? "bg-surface-panel-muted text-white ring-2 ring-blue-400" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label={gameCopy.title}
                  title={gameCopy.title}
                >
                  {game.marker}
                  {isActive ? <span className="absolute -right-1 -top-1 size-3 rounded-full bg-brand-primary" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(20rem,42rem)_1fr] lg:items-end">
          <div className="space-y-5">
            <div className="rounded-3xl border border-border bg-surface-panel/90 shadow-card-lifted backdrop-blur-xl">
              <div className="flex gap-8 border-b border-border px-7 pt-6 text-xl font-black text-muted-foreground">
                {t.showcase.tabs.map((tab, index) => (
                  <button key={tab} className={`pb-5 ${index === 0 ? "border-b-4 border-blue-400 text-foreground" : "hover:text-foreground"}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between px-7 py-6 text-lg font-bold text-foreground">
                <span>{activeGameCopy.updateTitle}</span>
                <span className="text-muted-foreground">{activeGame.issueDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 rounded-3xl border border-border bg-surface-panel/90 p-5 shadow-card-lifted backdrop-blur-xl">
              {actionItems.map(({ label, icon: Icon }) => (
                <button key={label} className="flex flex-col items-center gap-3 rounded-2xl text-muted-foreground transition hover:text-foreground">
                  <span className="flex size-16 items-center justify-center rounded-2xl border border-border bg-surface-panel-muted">
                    <Icon size={28} />
                  </span>
                  <span className="text-sm font-black">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-5 lg:items-end">
            <div className="rounded-full bg-surface-canvas/90 px-8 py-4 text-center shadow-card-lifted ring-1 ring-border lg:text-left">
              <p className="text-lg font-black">{t.showcase.updateAvailable}</p>
              <p className="font-mono text-xl font-black text-muted-foreground">{t.showcase.updateSize}</p>
            </div>
            <div className="flex w-full max-w-xl overflow-hidden rounded-3xl shadow-brand-glow">
              <LatestReleaseButton compact className="min-h-24 flex-1 rounded-none text-4xl" />
              <button className="flex w-24 items-center justify-center border-l border-black/20 bg-brand-primary text-brand-primary-foreground" aria-label={t.nav.appDrawer} title={t.nav.appDrawer}>
                <Menu size={36} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
