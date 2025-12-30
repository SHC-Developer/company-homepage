
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Slide from './components/Slide';
import SitemapFooter from './components/SitemapFooter';
import { SLIDES } from './constants';

const MainLayout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = containerRef.current.scrollTop;
      const height = window.innerHeight;
      const index = Math.round(scrollY / height);
      
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeIndex]);

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Global Navigation (Logo Only for minimal look) */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto cursor-pointer" onClick={() => scrollToSection(0)}>
          <h1 className="text-white text-2xl font-serif-logo font-bold tracking-tighter">
            KRFA <span className="text-blue-500 font-light text-sm ml-2 tracking-widest uppercase">Facility</span>
          </h1>
        </div>
        
        {/* Minimal Hamburger (Decorative for this demo) */}
        <div className="pointer-events-auto">
            <button className="flex flex-col gap-1.5 items-end group">
                <div className="h-0.5 w-8 bg-white group-hover:w-10 transition-all"></div>
                <div className="h-0.5 w-6 bg-white transition-all"></div>
                <div className="h-0.5 w-4 bg-white group-hover:w-10 transition-all"></div>
            </button>
        </div>
      </header>

      {/* Side Indicator (Dots) */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        {[...SLIDES, { id: 'sitemap' }].map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`group relative flex items-center justify-end`}
          >
            <span className={`mr-4 text-[10px] text-white/40 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
              Section 0{i + 1}
            </span>
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-500 border border-white/40 ${i === activeIndex ? 'bg-blue-500 scale-150 border-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-transparent'}`}
            />
          </button>
        ))}
      </nav>

      {/* Main Content Container */}
      <div ref={containerRef} className="scroll-container w-full h-full">
        {SLIDES.map((slide, idx) => (
          <Slide key={slide.id} slide={slide} isActive={activeIndex === idx} />
        ))}
        <SitemapFooter isActive={activeIndex === SLIDES.length} />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        {/* Other routes can be added here, like /greeting or /portfolio */}
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
