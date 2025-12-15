import React, { useState, useEffect, useRef } from 'react';

export const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (iframeRef.current && !playerRef.current && (window as any).YT && (window as any).YT.Player) {
        try {
          playerRef.current = new (window as any).YT.Player(iframeRef.current, {
            events: {
              onStateChange: (event: any) => {
                // 비디오가 끝났을 때 (state === 0) 다시 재생
                if (event.data === (window as any).YT.PlayerState.ENDED) {
                  playerRef.current?.playVideo();
                }
              },
              onError: () => {
                setVideoError(true);
              }
            }
          });
        } catch (e) {
          console.error('YouTube Player 초기화 실패:', e);
        }
      }
    };

    // YouTube IFrame API가 이미 로드되어 있는 경우
    if ((window as any).YT && (window as any).YT.Player) {
      // 약간의 지연을 두고 초기화 (iframe이 DOM에 완전히 추가된 후)
      setTimeout(initPlayer, 100);
    } else {
      // YouTube IFrame API 로드
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // 전역 콜백에 추가 (기존 콜백 유지)
      const originalCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (originalCallback) originalCallback();
        setTimeout(initPlayer, 100);
      };

      // 이미 로드 중이었을 수 있으므로 확인
      const checkInterval = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) {
          clearInterval(checkInterval);
          setTimeout(initPlayer, 100);
        }
      }, 100);

      setTimeout(() => clearInterval(checkInterval), 10000); // 10초 후 타임아웃
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // 무시
        }
        playerRef.current = null;
      }
    };
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
            <iframe
              ref={iframeRef}
              id="hero-video-iframe"
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube-nocookie.com/embed/2mi94NnUWSs?autoplay=1&mute=1&loop=1&playlist=2mi94NnUWSs&controls=0&rel=0&modestbranding=1&playsinline=1&start=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&enablejsapi=1"
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
