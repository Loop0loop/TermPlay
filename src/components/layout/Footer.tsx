import React from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function Footer() {
  const t = useI18n();

  return (
    <footer className="bg-surface-canvas py-16 px-16 text-center text-muted-foreground text-xs relative border-t border-border">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto relative">
        <div className="flex justify-center gap-6 mb-6 font-bold text-white tracking-widest text-xs uppercase">
          <a href="#" className="hover:text-foreground transition-colors">{t.footer.links.about}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t.footer.links.privacy}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t.footer.links.terms}</a>
        </div>
        
        <div className="mb-4">
          <span className="text-3xl font-black tracking-widest text-white">
            {t.brand.name}
          </span>
        </div>
        
        <p className="font-medium tracking-wide">{t.footer.copyright}</p>
        
        {/* Globe icon on the far right */}
        <button
          className="absolute right-0 bottom-0 text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-2 rounded-full border border-border bg-surface-panel-muted"
          aria-label={t.footer.language}
          title={t.footer.language}
        >
          <Globe size={20} />
        </button>
      </div>
    </footer>
  );
}
