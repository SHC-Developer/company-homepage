
import React, { useEffect, useState, useRef } from 'react';
import { CATEGORIES } from '../constants';
import { useNavigate } from 'react-router-dom';

interface SitemapFooterProps {
  isActive: boolean;
}

const SitemapFooter: React.FC<SitemapFooterProps> = ({ isActive }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  const handleCategoryClick = (path: string, hash?: string) => {
    if (hash) {
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      navigate(path);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="scroll-section w-full flex flex-col justify-center items-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #111827 0%, #030712 100%)',
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-16 lg:gap-24">
        {/* Company Title */}
        <div className={`text-center transition-all duration-1000 transform ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-4">
            대한민국상이군경회 <span className="font-bold text-blue-500">시설사업소</span>
          </h1>
          <div className="h-px w-24 bg-blue-500/50 mx-auto" />
        </div>

        {/* Categories Grid (Vertical Layout inspired by etracon) */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-b border-white/10">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.path, category.hash)}
              className={`group relative flex flex-col items-center justify-center py-12 px-4 cursor-pointer hover:bg-white/5 transition-all duration-700 delay-[${index * 100}ms] border-r border-white/10 last:border-r-0 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="text-white/60 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 mb-6">
                {React.cloneElement(category.icon as React.ReactElement, { 
                  size: 40,
                  strokeWidth: 1.2
                })}
              </div>
              <span className="text-white/80 group-hover:text-white text-center font-medium tracking-tight text-sm lg:text-base">
                {category.label}
              </span>
              
              {/* Plus Sign Decoration */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 text-white/20 font-thin text-xl pointer-events-none">+</div>
              <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-white/20 font-thin text-xl pointer-events-none">+</div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className={`text-center text-white/30 text-xs md:text-sm transition-opacity duration-1000 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p>© 2025 대한민국상이군경회 시설사업소. All Rights Reserved.</p>
          <p className="mt-2">서울특별시 강동구 성내로 65</p>
        </div>
      </div>
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  );
};

export default SitemapFooter;
