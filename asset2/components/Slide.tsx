
import React, { useEffect, useRef, useState } from 'react';
import { SlideItem } from '../types';

interface SlideProps {
  slide: SlideItem;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ slide, isActive }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  const renderTitle = (text: string, highlightWords: string[]) => {
    // Replaced JSX.Element with React.ReactElement to fix namespace error
    let result: (string | React.ReactElement)[] = [text];
    
    highlightWords.forEach((word) => {
      // Replaced JSX.Element with React.ReactElement to fix namespace error
      const newResult: (string | React.ReactElement)[] = [];
      result.forEach((item) => {
        if (typeof item === 'string') {
          const parts = item.split(word);
          parts.forEach((part, i) => {
            newResult.push(part);
            if (i < parts.length - 1) {
              newResult.push(
                <span key={`${word}-${i}`} className="text-blue-500 font-bold">
                  {word}
                </span>
              );
            }
          });
        } else {
          newResult.push(item);
        }
      });
      result = newResult;
    });

    return <>{result}</>;
  };

  return (
    <div className="scroll-section w-full relative overflow-hidden bg-black">
      {/* Background Image with Zoom Effect */}
      <div 
        className={`absolute inset-0 transition-transform duration-[10000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
        style={{
          backgroundImage: `url(${slide.imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <div className={`transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm md:text-lg lg:text-xl font-light tracking-[0.3em] mb-4 uppercase text-blue-300">
            Professional Facility Management
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
            {renderTitle(slide.title, slide.highlightWords)}
          </h2>
          <div className="w-16 h-1 bg-white mx-auto mb-6 opacity-50" />
          <p className="text-lg md:text-xl lg:text-2xl font-light text-slate-200">
            {slide.subtitle}
          </p>
        </div>
      </div>
      
      {/* Slide Indicator Line (Bottom) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
         <span className="text-[10px] tracking-widest text-white/40 uppercase">Scroll</span>
         <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  );
};

export default Slide;
