import React from 'react';
import './index.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-ring/30">
      <Header />
      
      <main className="w-full">
        {/* Section 1: Hero */}
        <HeroSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
