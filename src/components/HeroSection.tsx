import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('services');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 배경 이미지 - 임시로 비디오 대신 사용 */}
      <div className="absolute inset-0 z-0">
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
      </div>

      {/* 텍스트 - 좌표로 직접 배치 */}
      <div className="absolute top-32 left-36 z-10">
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        aria-label="다음 섹션으로 스크롤"
      >
        <ChevronDown className="h-8 w-8" />
      </button>

    </section>
  );
};