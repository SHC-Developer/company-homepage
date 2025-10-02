import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('services');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* YouTube 배경 비디오 */}
      <div className="youtube-container">
        <iframe
          className="youtube-background"
          src="https://www.youtube-nocookie.com/embed/Hv2G26LsIaE?autoplay=1&mute=1&loop=1&playlist=Hv2G26LsIaE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1"
          title="대한민국 상이군경회 시설사업소 배경 영상"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            pointerEvents: 'none',
          }}
        />
        
        {/* YouTube 브랜딩 숨기기 위한 상단 오버레이 */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none"></div>
        
        {/* 비디오 위에 오버레이 - 텍스트 가독성을 위한 어두운 필터 */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      {/* 텍스트 - 좌표로 직접 배치 */}
      <div className="absolute top-32 left-36 z-20">
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