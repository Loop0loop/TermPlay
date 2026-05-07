import React from 'react';
import { useI18n } from '../../lib/i18n';
import { LatestReleaseButton } from '../ui/LatestReleaseButton';
import logoSrc from '../../logo.svg';

export function HeroSection() {
  const t = useI18n();

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-surface-hero">
      {/* Background Dim / Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-canvas via-surface-panel to-surface-canvas opacity-50"></div>

      {/* Vertical subtle lines (from screenshot 1) */}
      <div className="absolute inset-0 flex justify-between px-20 pointer-events-none opacity-10">
        <div className="w-px h-full bg-foreground"></div>
        <div className="w-px h-full bg-foreground"></div>
        <div className="w-px h-full bg-foreground"></div>
        <div className="w-px h-full bg-foreground"></div>
        <div className="w-px h-full bg-foreground"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-10">
        <div className="mb-4">
          <img src={logoSrc} alt="TermPlay Logo" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </div>

        <h1 className="text-6xl font-black tracking-widest text-foreground mb-4 italic font-sans text-shadow-sm">
          {t.brand.name}
        </h1>
        <p className="text-lg text-muted-foreground font-medium mb-10 tracking-wider">
          {t.hero.tagline}
        </p>

        <LatestReleaseButton className="shadow-brand-glow" />
      </div>

      {/* Bottom Large Text */}
      <div className="absolute bottom-16 left-12 opacity-10 pointer-events-none z-0">
        <h2 className="text-8xl leading-[0.85] font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-transparent hero-outline-text">
          {t.hero.backgroundTitle[0]}<br />
          {t.hero.backgroundTitle[1]}
        </h2>
      </div>

      {/* Bottom Right Small Text */}
      <div className="absolute bottom-20 right-16 flex flex-col items-end opacity-40 pointer-events-none">
        <div className="flex gap-2 mb-2">
          <div className="w-2 h-2 bg-foreground rounded-full"></div>
          <div className="w-2 h-2 bg-foreground rounded-full"></div>
        </div>
        <p className="text-sm tracking-brand-wide font-medium uppercase text-foreground">
          {t.hero.motto}
        </p>
      </div>

      {/* Bottom decorative shape */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-surface-canvas to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-24 bg-surface-canvas rounded-tl-full pointer-events-none"></div>
    </section>
  );
}
