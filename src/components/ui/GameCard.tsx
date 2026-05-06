import React from 'react';
import { GameData } from '../../data/games';

interface GameCardProps {
  game: GameData;
}

export function GameCard({ game }: GameCardProps) {
  // We use the accent color mapping to simulate the different colorful artwork 
  // since we don't have the actual high-res images from the screenshot.
  const bgColorMap: Record<string, string> = {
    blue: "bg-[#1c3f60]", // Genshin-like
    purple: "bg-[#2d1b4e]", // Star Rail-like
    green: "bg-[#1b4332]", // ZZZ-like
    pink: "bg-[#5c2a41]", // Honkai 3rd-like
  };

  const bgClass = bgColorMap[game.accentColor] || "bg-gray-800";

  return (
    <div className="flex flex-col items-center gap-6 group cursor-pointer">
      {/* 
        The aspect ratio is exactly 1:1. 
        Corners are deeply rounded (almost 2rem or 32px).
      */}
      <div className={`relative w-full aspect-square max-w-[280px] rounded-[2.5rem] overflow-hidden ${bgClass} transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]`}>
        
        {/* Mockup for image */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${game.bgGradient} opacity-60`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-black text-white opacity-20">{game.title.charAt(0)}</span>
        </div>
        
        {/* Hover overlay brightness */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
      </div>
      
      {/* Title is below the card, centered */}
      <h3 className="text-2xl font-medium text-gray-200 group-hover:text-white transition-colors">
        {game.title}
      </h3>
    </div>
  );
}
