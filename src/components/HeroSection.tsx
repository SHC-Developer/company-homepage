import React, { useState } from 'react';

export const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#1e3f64' }}
    >
      {/* 배경 비디오 */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube-nocookie.com/embed/2mi94NnUWSs?autoplay=1&mute=1&loop=1&playlist=2mi94NnUWSs&controls=0&rel=0&modestbranding=1&playsinline=1&start=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1"
              title="대한민국 상이군경회 시설사업소 배경 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setVideoError(true)}
              style={{ pointerEvents: 'none' }}
            />
          </div>
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br from-primary to-primary-hover"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(13, 42, 74, 0.8), rgba(30, 111, 217, 0.8))`,
            }}
          />
        )}
      </div>

      {/* 우측 하단 텍스트 - 고정 표시 */}
      <div 
        className="absolute bottom-8 right-8 z-20 text-right pointer-events-none"
      >
        <p className="text-[16pt] text-white font-korean drop-shadow-lg">
          25.10.25 올림픽대교 전경
        </p>
        <p className="text-[10pt] text-white/80 font-korean drop-shadow-md mt-2">
          © 대한민국상이군경회시설사업소. All rights reserved.
        </p>
      </div>
    </section>
  );
};
