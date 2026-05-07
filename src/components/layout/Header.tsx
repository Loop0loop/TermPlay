import React, { useEffect, useState } from 'react';
import { Home, Globe2, Link, MessageSquare, RefreshCw, Sparkles, X } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function Header() {
  const t = useI18n();
  const [isDockVisible, setIsDockVisible] = useState(true);
  const [areEffectsEnabled, setAreEffectsEnabled] = useState(true);
  const [isBrightMode, setIsBrightMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("termplay-effects-off", !areEffectsEnabled);
  }, [areEffectsEnabled]);

  useEffect(() => {
    document.documentElement.classList.toggle("termplay-bright", isBrightMode);
  }, [isBrightMode]);

  const navItems = [
    { label: t.nav.home, icon: Home, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: t.nav.network, icon: Globe2, onClick: () => setAreEffectsEnabled((value) => !value), active: areEffectsEnabled },
    { label: t.nav.link, icon: Link, onClick: () => navigator.clipboard?.writeText(location.href).catch(() => undefined), active: false },
    { label: t.nav.feedback, icon: MessageSquare, onClick: () => setIsBrightMode((value) => !value), active: isBrightMode },
  ];

  return (
    <>
      {/* Top Left Logo */}
      <header className="fixed top-0 left-0 w-full p-8 z-50 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="text-2xl font-black tracking-widest text-white drop-shadow-xl">
            {t.brand.name}
          </span>
        </div>
      </header>

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-24 flex-col items-center border-r border-border bg-surface-canvas/95 px-4 py-10 backdrop-blur-xl lg:flex">
        <div className="mb-14 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-violet-500 text-3xl font-black shadow-panel-glow">
          &gt;_
        </div>
        <div className="mt-auto flex flex-col gap-8 text-muted-foreground">
          <button className="transition hover:text-foreground" aria-label={t.nav.profile} title={t.nav.profile}>
            <Home size={24} />
          </button>
          <button className="transition hover:text-foreground" aria-label={t.nav.settings} title={t.nav.settings}>
            <RefreshCw size={24} />
          </button>
        </div>
      </aside>

      {isDockVisible ? (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-3 rounded-full border border-border bg-surface-panel/90 p-3 shadow-card-lifted backdrop-blur-xl md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:gap-4 md:rounded-4xl md:p-4">
          {navItems.map(({ label, icon: Icon, onClick, active }) => (
            <button
              key={label}
              onClick={onClick}
              className={`flex size-11 items-center justify-center rounded-full transition md:size-14 ${active ? "bg-primary text-primary-foreground" : "bg-surface-panel-muted text-muted-foreground hover:text-foreground"}`}
              aria-label={label}
              title={label}
            >
              <Icon size={24} />
            </button>
          ))}
          <button
            onClick={() => setIsDockVisible(false)}
            className="flex size-11 items-center justify-center rounded-full bg-surface-panel-muted text-muted-foreground transition hover:text-foreground md:size-14"
            aria-label={t.nav.close}
            title={t.nav.close}
          >
            <X size={24} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsDockVisible(true)}
          className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-surface-panel text-muted-foreground shadow-card-lifted transition hover:text-foreground md:bottom-auto md:right-6 md:top-1/2 md:size-14 md:-translate-y-1/2"
          aria-label={t.nav.appDrawer}
          title={t.nav.appDrawer}
        >
          <Sparkles size={24} />
        </button>
      )}
    </>
  );
}
