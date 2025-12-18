import React, { useState, useEffect, useRef } from 'react';
import { setupLoopingVideo } from '@/lib/utils';

export const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 로컬 비디오 반복 재생
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    return setupLoopingVideo(video, {
      onEndedPlayError: (e) => {
        console.error('비디오 재생 실패:', e);
        setVideoError(true);
      },
      onLoadError: () => {
        console.error('비디오 로드 실패');
        setVideoError(true);
      },
      onAutoplayError: (e) => {
        console.error('비디오 자동 재생 실패:', e);
        // 자동 재생이 실패해도 에러로 처리하지 않음 (브라우저 정책)
      },
    });
  }, []);

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
            <video
              ref={videoRef}
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
              src={`${import.meta.env.BASE_URL}video/Main1.mp4`}
              autoPlay
              muted
              playsInline
              loop={false}
              style={{
                pointerEvents: 'none',
              }}
            />
            {/* 비디오 위에 오버레이 */}
            <div className="absolute inset-0 bg-black/10 z-10"></div>
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
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 text-right pointer-events-none px-4"
      >
        <p className="text-[10pt] sm:text-[16pt] text-white font-korean drop-shadow-lg">
          25.10.25 올림픽대교 전경
        </p>
        <p className="text-[7pt] sm:text-[10pt] text-white/80 font-korean drop-shadow-md mt-2">
          © 대한민국상이군경회시설사업소. All rights reserved.
        </p>
      </div>
    </section>
  );
};
