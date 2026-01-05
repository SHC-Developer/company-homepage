import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Lightbulb, 
  CheckSquare2, 
  Shield, 
  Users, 
  Search
} from 'lucide-react';
import { withBaseUrl, setupLoopingVideo } from '@/lib/utils';

interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface SlideItem {
  id: string;
  text: string;
  imageSrc: string;
  highlightWords: string[];
}

const HIGHLIGHT_WORDS: Record<number, string[]> = {
  0: ['오늘'],
  1: ['안전', '쾌적'],
  2: ['나라건설'],
  3: ['사람', '사랑'],
  4: ['성장', '시설사업소'],
};

export const LandingSections = () => {
  const navigate = useNavigate();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sitemapRef = useRef<HTMLDivElement>(null);
  const companyNameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0); // 0 is Hero, 1-5 are Slides, 6 is Sitemap
  const activeIndexRef = useRef(0);
  const viewportHeightRef = useRef<number>(window.visualViewport?.height ?? window.innerHeight);
  const [sitemapVisible, setSitemapVisible] = useState(false);
  const isScrollingRef = useRef(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartYRef = useRef(0);
  const touchCurrentYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const touchActiveRef = useRef(false);
  const touchMovedRef = useRef(false);
  const gestureStartIndexRef = useRef(0);

  // 모바일 감지 및 viewport 높이 동적 계산
  useEffect(() => {
    const checkMobile = () => {
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(touchCapable || window.innerWidth <= 768);
    };

    const getViewportHeight = () => Math.round(window.visualViewport?.height ?? window.innerHeight);

    const setVH = () => {
      const height = getViewportHeight();
      viewportHeightRef.current = height;
      const vh = height * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // 스냅 구간(마지막 섹션 제외)에서 viewport 높이 변화로 어긋나면 현재 섹션 top으로 재정렬
      if (
        activeIndexRef.current !== totalSections - 1 &&
        !touchActiveRef.current &&
        !isScrollingRef.current
      ) {
        const targetTop = activeIndexRef.current * height;
        if (Math.abs(window.scrollY - targetTop) > 1) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: targetTop, behavior: 'auto' });
          });
        }
      }
    };

    const handleResize = () => {
      checkMobile();
      setVH();
    };

    checkMobile();
    setVH();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', setVH);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', handleResize);
    vv?.addEventListener('scroll', setVH);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', setVH);
      vv?.removeEventListener('resize', handleResize);
      vv?.removeEventListener('scroll', setVH);
    };
  }, []);

  // 이미지 경로 헬퍼 함수
  const getImagePath = useCallback((filename: string) => {
    return withBaseUrl(`portfolio/${filename}`);
  }, []);

  const slides: SlideItem[] = useMemo(
    () => [
      {
        id: 'slide-1',
        text: '당신의 오늘은 안전하셨습니까?',
        imageSrc: getImagePath('performance1.JPG'),
        highlightWords: HIGHLIGHT_WORDS[0],
      },
      {
        id: 'slide-2',
        text: '국민들의 안전하고 쾌적한',
        imageSrc: getImagePath('performance3.JPG'),
        highlightWords: HIGHLIGHT_WORDS[1],
      },
      {
        id: 'slide-3',
        text: '아름다운 생활을 영위하는 나라건설',
        imageSrc: getImagePath('performance5.jpg'),
        highlightWords: HIGHLIGHT_WORDS[2],
      },
      {
        id: 'slide-4',
        text: '사람과 사랑으로 융합된',
        imageSrc: getImagePath('performance8.jpg'),
        highlightWords: HIGHLIGHT_WORDS[3],
      },
      {
        id: 'slide-5',
        text: '성장의 발자국을 남기는 시설사업소가 되겠습니다.',
        imageSrc: getImagePath('performance12.jpg'),
        highlightWords: HIGHLIGHT_WORDS[4],
      },
    ],
    [getImagePath]
  );

  // 각 슬라이드(Hero 포함)의 애니메이션 완료 상태 추적
  // 0: Hero (항상 true 또는 즉시 true), 1-5: Slides, 6: Sitemap
  const totalSections = slides.length + 2; // Hero + Slides + Sitemap
  const animationCompletedRef = useRef<boolean[]>(new Array(totalSections).fill(false));
  
  // Hero는 항상 완료된 것으로 간주
  useEffect(() => {
    animationCompletedRef.current[0] = true;
    animationCompletedRef.current[totalSections - 1] = true;
  }, [totalSections]);

  const handleAnimationComplete = useCallback((index: number) => {
    animationCompletedRef.current[index] = true;
  }, []);

  const handleAnimationReset = useCallback((index: number) => {
    animationCompletedRef.current[index] = false;
  }, []);

  const performScroll = useCallback((targetIndex: number) => {
    const height = viewportHeightRef.current;
    isScrollingRef.current = true;
    window.scrollTo({
      top: targetIndex * height,
      behavior: 'smooth',
    });
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }, []);

  // 비디오 설정 (Hero Section용)
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
      },
    });
  }, []);

  // 스크롤 기반 activeIndex 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = viewportHeightRef.current;
      const index = Math.round(scrollY / height);
      
      if (index !== activeIndex && index >= 0 && index < totalSections) {
        setActiveIndex(index);
      }
      
      // 인디케이터 표시 여부 (데스크톱에서만, Hero 이후부터 표시)
      // 모든 버전에서 표시 (Hero 이후부터 표시)
      setShowIndicator(index > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, totalSections, isMobile]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // 스크롤 스냅을 위한 wheel 이벤트 처리 (데스크톱만)
  useEffect(() => {
    // 모바일에서는 스크롤 스냅 비활성화
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;
      const height = viewportHeightRef.current;
      const deltaY = e.deltaY;
      const currentIndex = Math.round(scrollY / height);

      // 마지막 페이지에서 아래로 스크롤할 때는 차단하지 않음
      if (currentIndex === totalSections - 1 && deltaY > 0) {
        return;
      }

      // 섹션 범위 내에 있으면 기본 스크롤 차단
      if (scrollY <= (totalSections - 1) * height + 50) {
        e.preventDefault();
      }

      if (isScrollingRef.current) return;

      // 애니메이션 완료 체크 (Slides 1-5인 경우)
      if (currentIndex >= 1 && currentIndex <= slides.length) {
        if (!animationCompletedRef.current[currentIndex]) {
          return;
        }
      }

      if (deltaY > 0 && currentIndex < totalSections - 1) {
        // 아래로 이동
        performScroll(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // 위로 이동
        performScroll(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile, slides.length, totalSections, performScroll]);

  // 터치(모바일) 스크롤 스냅 처리
  useEffect(() => {
    if (!isMobile) return;

    const target = containerRef.current;
    if (!target) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (isScrollingRef.current) return;
      touchActiveRef.current = true;
      touchMovedRef.current = false;
      touchStartYRef.current = e.touches[0].clientY;
      touchCurrentYRef.current = e.touches[0].clientY;
      touchStartTimeRef.current = Date.now();
      gestureStartIndexRef.current = activeIndexRef.current;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchActiveRef.current) return;
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }
      touchCurrentYRef.current = e.touches[0].clientY;
      const diffY = touchStartYRef.current - touchCurrentYRef.current;
      const startIndex = gestureStartIndexRef.current;

      if (Math.abs(diffY) > 2) {
        touchMovedRef.current = true;
        e.preventDefault(); // 브라우저 기본 스크롤/관성 차단
      }
    };

    const handleTouchEnd = () => {
      if (!touchActiveRef.current) return;

      const diffY = touchStartYRef.current - touchCurrentYRef.current;
      touchActiveRef.current = false;

      const currentIndex = activeIndexRef.current;
      const distanceThreshold = 30; // 30px만 움직여도 다음 페이지로

      const canMoveNext = currentIndex < totalSections - 1;
      const canMovePrev = currentIndex > 0;

      if (currentIndex >= 1 && currentIndex <= slides.length) {
        if (!animationCompletedRef.current[currentIndex]) {
          return;
        }
      }

      if (isScrollingRef.current) return;

      if (touchMovedRef.current && diffY > distanceThreshold && canMoveNext) {
        performScroll(currentIndex + 1);
      } else if (touchMovedRef.current && diffY < -distanceThreshold && canMovePrev) {
        performScroll(currentIndex - 1);
      } else {
        // 임계값 미만이면 현재 섹션에 고정(스냅)
        performScroll(currentIndex);
      }
    };

    const handleTouchCancel = () => {
      touchActiveRef.current = false;
      touchMovedRef.current = false;
    };

    target.addEventListener('touchstart', handleTouchStart, { passive: false });
    target.addEventListener('touchmove', handleTouchMove, { passive: false });
    target.addEventListener('touchend', handleTouchEnd, { passive: false });
    target.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      target.removeEventListener('touchstart', handleTouchStart);
      target.removeEventListener('touchmove', handleTouchMove);
      target.removeEventListener('touchend', handleTouchEnd);
      target.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [isMobile, slides.length, totalSections, performScroll]);

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * viewportHeightRef.current,
      behavior: 'smooth',
    });
  };

  // 사이트맵 섹션 visibility 관리
  useEffect(() => {
    // 터치/PC 모두: 마지막 섹션에서만 표시 (스냅 UX에 맞춤)
    setSitemapVisible(activeIndex === totalSections - 1);
  }, [activeIndex, totalSections]);

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

  const renderHighlightedText = (text: string, highlightWords: string[], index: number) => {
    if (highlightWords.length === 0) {
      return <>{text}</>;
    }

    let result: (string | JSX.Element)[] = [];
    let remainingText = text;
    
    highlightWords.forEach((word, wordIndex) => {
      const parts = remainingText.split(word);
      if (parts.length > 1) {
        if (parts[0]) {
          result.push(parts[0]);
        }
        result.push(
          <span key={`${index}-${wordIndex}`} style={{ fontSize: 'clamp(1.5rem, 3vw + 0.75rem, 60pt)', color: '#2686EB' }}>
            {word}
          </span>
        );
        remainingText = parts.slice(1).join(word);
      }
    });
    
    if (remainingText) {
      result.push(remainingText);
    }

    if (index === 4) {
      const finalResult: (string | JSX.Element)[] = [];
      result.forEach((item, i) => {
        if (typeof item === 'string' && item.includes('을 남기는')) {
          const parts = item.split('을 남기는');
          if (parts[0]) finalResult.push(parts[0]);
          finalResult.push('을 남기는');
          finalResult.push(<br key={`br-${i}`} />);
          if (parts[1]) finalResult.push(parts[1]);
        } else {
          finalResult.push(item);
        }
      });
      return <>{finalResult}</>;
    }

    return <>{result}</>;
  };

  const categories: CategoryItem[] = [
    { id: 'ceo', label: '인사말', icon: <Building2 className="w-8 h-8" />, onClick: () => handleCategoryClick('/greeting', 'management-philosophy') },
    { id: 'vision', label: '비전 및 경영이념', icon: <Lightbulb className="w-8 h-8" />, onClick: () => handleCategoryClick('/greeting', 'management-philosophy') },
    { id: 'history', label: '회사연혁', icon: <CheckSquare2 className="w-8 h-8" />, onClick: () => handleCategoryClick('/greeting', 'company-history') },
    { id: 'license', label: '보유 면허 및 자격증', icon: <Shield className="w-8 h-8" />, onClick: () => handleCategoryClick('/greeting', 'license') },
    { id: 'organization', label: '조직도', icon: <Users className="w-8 h-8" />, onClick: () => handleCategoryClick('/greeting', 'organization') },
    { id: 'portfolio', label: '수행 실적', icon: <Search className="w-8 h-8" />, onClick: () => handleCategoryClick('/portfolio') },
  ];

  const SlideComponent: React.FC<{ 
    slide: SlideItem; 
    index: number; 
    isActive: boolean; 
    onAnimationComplete: () => void;
    onAnimationReset: () => void;
    isMobile: boolean;
  }> = ({ slide, index, isActive, onAnimationComplete, onAnimationReset, isMobile }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      // 터치/PC 모두 동일한 애니메이션/잠금 동작 (완료 후에만 다음 섹션 이동 가능)
      if (isActive) {
        setVisible(true);
        const timer = setTimeout(() => {
          onAnimationComplete();
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setVisible(false);
        onAnimationReset();
      }
    }, [isActive, onAnimationComplete, onAnimationReset]);

    return (
      <div className="relative w-full overflow-hidden bg-black" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${slide.imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <div className={`transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-korean font-semibold leading-relaxed mb-6 drop-shadow-2xl" style={{ color: '#ffffff', fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 45pt)' }}>
              {renderHighlightedText(slide.text, slide.highlightWords, index)}
            </h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        // PC 이하(터치 디바이스)에서는 자유 스크롤 제거: 항상 스냅만 동작
        touchAction: isMobile ? 'none' : 'auto',
        overscrollBehavior: isMobile ? 'none' : 'auto',
      }}
    >
      {/* Side Indicator */}
      {showIndicator && (
        <nav
          className="fixed right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 sm:gap-5 lg:gap-6 pr-[env(safe-area-inset-right)]"
          style={{ touchAction: 'manipulation' }}
          aria-label="페이지 이동"
        >
          {Array.from({ length: totalSections }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToSection(i)}
              className="group relative flex items-center justify-end p-2 sm:p-1.5"
              aria-label={`${i + 1}번째 섹션으로 이동`}
            >
              <div
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-2 lg:h-2 rounded-full transition-all duration-500 border border-white/40 ${
                  i === activeIndex
                    ? 'bg-blue-500 scale-150 border-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                    : 'bg-transparent'
                }`}
              />
            </button>
          ))}
        </nav>
      )}

      {/* 1. Hero Section (Index 0) */}
      <section id="hero-section" className="relative w-full overflow-hidden" style={{ backgroundColor: '#1e3f64', height: 'calc(var(--vh, 1vh) * 100)' }}>
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
                style={{ pointerEvents: 'none' }}
              />
              <div className="absolute inset-0 bg-black/10 z-10"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-hover" style={{ backgroundImage: `linear-gradient(135deg, rgba(13, 42, 74, 0.8), rgba(30, 111, 217, 0.8))` }} />
          )}
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 text-right pointer-events-none px-4">
          <p className="text-[10pt] sm:text-[16pt] text-white font-korean drop-shadow-lg">25.10.25 올림픽대교 전경</p>
          <p className="text-[7pt] sm:text-[10pt] text-white/80 font-korean drop-shadow-md mt-2">© 대한민국상이군경회시설사업소. All rights reserved.</p>
        </div>
      </section>

      {/* 2. Slides (Index 1-5) and Sitemap Footer (Index 6) */}
      <div id="sitemap-section" className="flex flex-col">
        {slides.map((slide, index) => (
          <SlideComponent
            key={slide.id}
            slide={slide}
            index={index}
            isActive={activeIndex === index + 1}
            onAnimationComplete={() => handleAnimationComplete(index + 1)}
            onAnimationReset={() => handleAnimationReset(index + 1)}
            isMobile={isMobile}
          />
        ))}

        {/* 3. Sitemap Footer Section (Index 6) */}
        <div 
          ref={sitemapRef}
          className="relative w-full flex flex-col justify-center items-center overflow-hidden"
          style={{ background: '#0B1C2B', height: 'calc(var(--vh, 1vh) * 100)' }}
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 lg:gap-12">
            <div
              ref={companyNameRef}
              className={`hidden lg:block text-center transition-all duration-1000 transform ${
                sitemapVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <h1 className="text-white font-light tracking-tighter mb-2 font-logo" style={{ fontSize: 'clamp(1.25rem, 3vw + 0.5rem, 3.75rem)' }}>
                대한민국상이군경회<span className="font-light" style={{ color: '#2686EB' }}>시설사업소</span>
              </h1>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-b border-white/10">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={category.onClick}
                  className={`group relative flex flex-col items-center justify-center py-12 px-4 cursor-pointer hover:bg-white/5 transition-all duration-700 border-white/10 ${sitemapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
                    (index + 1) % 2 !== 0 ? 'border-r' : (index + 1) % 3 !== 0 ? 'md:border-r lg:border-r' : (index + 1) % 6 !== 0 ? 'lg:border-r' : ''
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-white/60 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 mb-6">
                    {React.cloneElement(category.icon as React.ReactElement, { size: 40, strokeWidth: 1.2, className: "xl:w-[60px] xl:h-[60px]" })}
                  </div>
                  <span className="text-white/80 group-hover:text-white text-center font-medium tracking-tight text-sm lg:text-base xl:text-xl xl:leading-7 font-korean">
                    {category.label}
                  </span>
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 text-white/20 font-thin text-xl pointer-events-none">+</div>
                  <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-white/20 font-thin text-xl pointer-events-none">+</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        </div>
      </div>
    </div>
  );
};

