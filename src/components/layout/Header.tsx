import React from 'react';
import { Sparkles, Moon, X, RefreshCw } from 'lucide-react';

export function Header() {
  return (
    <>
      {/* Top Left Logo */}
      <header className="absolute top-0 left-0 w-full p-8 z-50 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="text-2xl font-black tracking-widest text-white">
            HOYO<span className="font-light">VERSE</span>
          </span>
        </div>
      </header>

      {/* Right side floating vertical navigation */}
      <div className="fixed right-8 top-1/4 flex flex-col gap-6 z-50">
        <button className="text-gray-500 hover:text-white transition-colors">
          <Sparkles size={24} />
        </button>
        <button className="text-gray-500 hover:text-white transition-colors">
          <Moon size={24} />
        </button>
        <button className="text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <button className="text-gray-500 hover:text-white transition-colors">
          <RefreshCw size={24} />
        </button>
      </div>
    </>
  );
}
