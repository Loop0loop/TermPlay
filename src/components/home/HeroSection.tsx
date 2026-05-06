import React from 'react';

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Background Dim / Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#222] to-[#111] opacity-50"></div>
      
      {/* Vertical subtle lines (from screenshot 1) */}
      <div className="absolute inset-0 flex justify-between px-20 pointer-events-none opacity-10">
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-10">
        {/* Fake icon for Hoyoplay Logo */}
        <div className="w-16 h-16 bg-white rounded-[20px] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
           <div className="w-8 h-8 rounded-full border-4 border-black relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
           </div>
        </div>

        <h1 className="text-6xl font-black tracking-widest text-white mb-4 italic font-sans" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          HOYOPLAY
        </h1>
        <p className="text-lg text-gray-300 font-medium mb-10 tracking-wider">
          손끝에서 시작되는 무한한 세계로의 여정
        </p>

        <button className="bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-800 px-12 py-3 rounded-lg text-lg font-bold transition-all shadow-lg border border-white/20">
          기대해 주세요
        </button>
      </div>
      
      {/* Bottom Large Text */}
      <div className="absolute bottom-16 left-12 opacity-10 pointer-events-none z-0">
        <h2 className="text-[6rem] leading-[0.85] font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
          CONNECT TO<br />
          THE INFINITE WORLD
        </h2>
      </div>

      {/* Bottom Right Small Text */}
      <div className="absolute bottom-20 right-16 flex flex-col items-end opacity-40 pointer-events-none">
        <div className="flex gap-2 mb-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <p className="text-sm tracking-[0.4em] font-medium uppercase text-white">
          Tech Otakus Save The World
        </p>
      </div>

      {/* Bottom decorative shape */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-24 bg-[#0a0a0a] rounded-tl-[100px] pointer-events-none"></div>
    </section>
  );
}
