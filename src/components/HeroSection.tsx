import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);

  const scrollToNext = () => {
    const nextSection = document.getElementById('services');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* YouTube 배경 비디오 */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube-nocookie.com/embed/GMc61qGjRHo?autoplay=1&mute=1&loop=1&playlist=GMc61qGjRHo&controls=0&rel=0&modestbranding=1&playsinline=1&start=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&si=Ts-rGv1xDCn2hB4G"
              title="대한민국 상이군경회 시설사업소 배경 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setVideoError(true)}
              style={{
                pointerEvents: 'none',
              }}
            />
            {/* 비디오 위에 오버레이 - 텍스트 가독성을 위한 어두운 필터 */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
          </div>
        ) : (
          /* 대체 배경 - YouTube 로드 실패 시 */
          <div 
            className="w-full h-full bg-gradient-to-br from-primary to-primary-hover"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(13, 42, 74, 0.8), rgba(30, 111, 217, 0.8))`,
            }}
          >
            {/* 패턴 오버레이 */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 텍스트 - 네비게이션 바의 최좌측에 맞춰서 배치 */}
      <div className="absolute top-44 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-text-slide-down">
            <p className="text-base text-gray-100 font-korean mb-2 leading-relaxed drop-shadow-lg">
              국민들의 안전하고 쾌적한,
            </p>
          </div>

          <div className="hero-text-slide-down">
            <p className="text-base text-gray-100 font-korean mb-2 leading-relaxed drop-shadow-lg">
              아름다운 생활을 영위하는 나라건설
            </p>
          </div>

          <div className="hero-text-slide-down">
            <p className="text-sm text-gray-200 font-korean leading-relaxed drop-shadow-lg">
              사람과 사랑으로 융합된 성장의 발자국을 남기는 시설사업소가 되겠습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce z-20"
        aria-label="다음 섹션으로 스크롤"
      >
        <ChevronDown className="h-8 w-8" />
      </button>

    </section>
  );
};