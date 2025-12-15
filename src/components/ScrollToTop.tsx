import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="hidden md:block fixed bottom-8 right-8 bg-green-800 hover:bg-green-900 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 z-40"
          aria-label="페이지 상단으로 이동"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};
