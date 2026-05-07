import React from 'react';
import './index.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { GameShowcaseSection } from './components/home/GameShowcaseSection';
import { PopularGamesSection } from './components/home/PopularGamesSection';

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-ring/30">
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
