import React from 'react';
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black py-16 px-16 text-center text-gray-500 text-xs relative border-t border-white/5">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto relative">
        <div className="flex justify-center gap-6 mb-6 font-bold text-white tracking-widest text-[10px] uppercase">
          <a href="#" className="hover:text-gray-300 transition-colors">About Us</a>
          <a href="#" className="hover:text-gray-300 transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-gray-300 transition-colors">이용약관</a>
        </div>
        
        <div className="mb-4">
          <span className="text-3xl font-black tracking-widest text-white">
            HOYO<span className="font-light">VERSE</span>
          </span>
        </div>
        
        <p className="font-medium tracking-wide">Copyright © COGNOSPHERE. All Rights Reserved.</p>
        
        {/* Globe icon on the far right */}
        <div className="absolute right-0 bottom-0 text-gray-500 hover:text-white cursor-pointer transition-colors p-2 rounded-full border border-gray-800 bg-gray-900/50">
          <Globe size={20} />
        </div>
      </div>
    </footer>
  );
}
