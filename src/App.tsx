import React from 'react';
import './index.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { GameShowcaseSection } from './components/home/GameShowcaseSection';
import { PopularGamesSection } from './components/home/PopularGamesSection';

export function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-purple-900/50">
      <Header />
      
      <main className="w-full">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Interactive Game Showcase */}
        <GameShowcaseSection />
        
        {/* Section 3: Popular Games Grid */}
        <PopularGamesSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
