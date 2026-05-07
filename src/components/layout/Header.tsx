import React, { useEffect, useState } from 'react';
import { Home, Globe2, Link, Moon, RefreshCw, Sparkles, X, Sun } from 'lucide-react';
import { type Locale, useI18n } from '../../lib/i18n';
import logoSrc from '../../logo.svg';

type ThemePreference = "system" | "dark" | "light";

const languageOptions: { locale: Locale; label: string; shortLabel: string }[] = [
  { locale: "ko", label: "한국어", shortLabel: "KO" },
  { locale: "en", label: "English", shortLabel: "EN" },
  { locale: "ja", label: "日本語", shortLabel: "JA" },
];
const fallbackLanguage = languageOptions[0]!;

function getSystemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function Header() {
  const t = useI18n();
  const [isDockVisible, setIsDockVisible] = useState(true);
  const [areEffectsEnabled, setAreEffectsEnabled] = useState(true);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark);
  const isDarkMode = themePreference === "system" ? systemPrefersDark : themePreference === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("termplay-effects-off", !areEffectsEnabled);
  }, [areEffectsEnabled]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle("light", !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => setSystemPrefersDark(media.matches);

    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);

    return () => media.removeEventListener("change", updateSystemTheme);
  }, []);

  const currentLanguage = languageOptions.find(({ locale }) => locale === t._currentLocale) ?? fallbackLanguage;

  const homeNavItem = {
    label: t.nav.home,
    icon: Home,
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    active: false,
  };
  const navItems = [
    { label: t.nav.theme, icon: isDarkMode ? Sun : Moon, onClick: () => setThemePreference(isDarkMode ? "light" : "dark"), active: themePreference !== "system" },
    { label: t.nav.link, icon: Link, onClick: () => window.open('https://github.com/ummsehun/termplay', '_blank'), active: false },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-8 lg:pl-32 z-50 pointer-events-none flex justify-between items-center">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="text-2xl font-black tracking-widest text-foreground drop-shadow-xl">
            {t.brand.name}
          </span>
        </div>
      </header>

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-24 flex-col items-center border-r border-border bg-surface-canvas/95 px-4 py-10 backdrop-blur-xl lg:flex">
        <div className="mb-14 flex items-center justify-center">
          <img src={logoSrc} alt="TermPlay Logo" className="w-14 h-14 object-contain" />
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
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full border border-border bg-surface-panel/90 p-2 shadow-card-lifted backdrop-blur-xl md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:gap-3 md:rounded-3xl md:p-3">
          <button
            onClick={homeNavItem.onClick}
            className={`flex size-9 items-center justify-center rounded-full transition md:size-10 ${homeNavItem.active ? "bg-primary text-primary-foreground" : "bg-surface-panel-muted text-muted-foreground hover:text-foreground"}`}
            aria-label={homeNavItem.label}
            title={homeNavItem.label}
          >
            <homeNavItem.icon size={18} />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen((value) => !value)}
              className={`flex size-9 items-center justify-center rounded-full transition md:size-10 ${isLanguageOpen ? "bg-primary text-primary-foreground" : "bg-surface-panel-muted text-muted-foreground hover:text-foreground"}`}
              aria-label={t.nav.network}
              aria-expanded={isLanguageOpen}
              title={t.nav.network}
            >
              <Globe2 size={18} />
            </button>

            {isLanguageOpen ? (
              <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-1 rounded-2xl border border-border bg-surface-canvas/95 p-2 shadow-card-lifted backdrop-blur-xl md:bottom-auto md:left-auto md:right-12 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:flex-col">
                {languageOptions.map(({ locale, label, shortLabel }) => {
                  const isCurrent = currentLanguage.locale === locale;

                  return (
                    <button
                      key={locale}
                      onClick={() => {
                        t._switchLanguage(locale);
                        setIsLanguageOpen(false);
                      }}
                      className={`min-w-12 rounded-full px-3 py-2 text-xs font-bold transition ${isCurrent ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface-panel-muted hover:text-foreground"}`}
                      aria-label={label}
                      title={label}
                    >
                      {shortLabel}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          {navItems.map(({ label, icon: Icon, onClick, active }) => (
            <button
              key={label}
              onClick={onClick}
              className={`flex size-9 items-center justify-center rounded-full transition md:size-10 ${active ? "bg-primary text-primary-foreground" : "bg-surface-panel-muted text-muted-foreground hover:text-foreground"}`}
              aria-label={label}
              title={label}
            >
              <Icon size={18} />
            </button>
          ))}
          <button
            onClick={() => setIsDockVisible(false)}
            className="flex size-9 items-center justify-center rounded-full bg-surface-panel-muted text-muted-foreground transition hover:text-foreground md:size-10"
            aria-label={t.nav.close}
            title={t.nav.close}
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsDockVisible(true)}
          className="fixed bottom-5 right-5 z-50 flex size-10 items-center justify-center rounded-full border border-border bg-surface-panel text-muted-foreground shadow-card-lifted transition hover:text-foreground md:bottom-auto md:right-6 md:top-1/2 md:size-12 md:-translate-y-1/2"
          aria-label={t.nav.appDrawer}
          title={t.nav.appDrawer}
        >
          <Sparkles size={20} />
        </button>
      )}
    </>
  );
}
