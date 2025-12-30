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
import { withBaseUrl } from '@/lib/utils';

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

export const SitemapSection = () => {
  const navigate = useNavigate();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sitemapRef = useRef<HTMLDivElement>(null);
  const companyNameRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sitemapVisible, setSitemapVisible] = useState(false);
  const isScrollingRef = useRef(false);
  const [showIndicator, setShowIndicator] = useState(false);

  // 이미지 경로 헬퍼 함수 (Portfolio.tsx와 동일한 패턴)
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

  // 섹션 시작 위치 계산을 위한 ref
  const sectionStartRef = useRef<HTMLDivElement>(null);

  // 스크롤 기반 activeIndex 업데이트
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionStartRef.current) return;
      
      const sectionTop = sectionStartRef.current.offsetTop;
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      const relativeScroll = scrollY - sectionTop;
      
      if (relativeScroll < 0) {
        setShowIndicator(false);
        return;
      }
      
      setShowIndicator(true);
      const index = Math.round(relativeScroll / height);
      
      if (index !== activeIndex && index >= 0 && index <= slides.length) {
        setActiveIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 체크

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, slides.length]);

  // 스크롤 스냅을 위한 wheel 이벤트 처리 (HeroSection 포함)
  useEffect(() => {
    if (!sectionStartRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;

      const heroSection = document.getElementById('hero-section');
      const sectionTop = sectionStartRef.current!.offsetTop;
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 0;
      const relativeScroll = scrollY - sectionTop;
      const deltaY = e.deltaY;
      
      // HeroSection에서 SitemapSection으로 넘어가는 경우
      if (heroSection && scrollY >= heroBottom - height && scrollY < sectionTop) {
        if (deltaY > 0) {
          // 아래로 스크롤 - SitemapSection 첫 페이지로
          e.preventDefault();
          isScrollingRef.current = true;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
          });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 600);
        } else if (deltaY < 0) {
          // 위로 스크롤 - HeroSection으로
          e.preventDefault();
          isScrollingRef.current = true;
          window.scrollTo({
            top: heroSection.offsetTop,
            behavior: 'smooth',
          });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 600);
        }
        return;
      }
      
      // SitemapSection 내부 스크롤
      if (relativeScroll < -50 || relativeScroll > slides.length * height + 50) {
        return;
      }

      const currentIndex = Math.round(relativeScroll / height);

      if (deltaY > 0 && currentIndex < slides.length) {
        // 아래로 스크롤
        e.preventDefault();
        isScrollingRef.current = true;
        window.scrollTo({
          top: sectionTop + (currentIndex + 1) * height,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      } else if (deltaY < 0 && currentIndex > 0) {
        // 위로 스크롤
        e.preventDefault();
        isScrollingRef.current = true;
        window.scrollTo({
          top: sectionTop + (currentIndex - 1) * height,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [slides.length]);

  const scrollToSection = (index: number) => {
    if (!sectionStartRef.current) return;
    const sectionTop = sectionStartRef.current.offsetTop;
    window.scrollTo({
      top: sectionTop + index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  // 사이트맵 섹션 visibility 관리
  useEffect(() => {
    if (activeIndex === slides.length) {
      setSitemapVisible(true);
    } else {
      setSitemapVisible(false);
    }
  }, [activeIndex, slides.length]);

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

    // 다섯 번째 슬라이드의 경우 줄바꿈 처리
    if (index === 4) {
      const finalResult: (string | JSX.Element)[] = [];
      result.forEach((item, i) => {
        if (typeof item === 'string' && item.includes('을 남기는')) {
          const parts = item.split('을 남기는');
          if (parts[0]) {
            finalResult.push(parts[0]);
          }
          finalResult.push('을 남기는');
          finalResult.push(<br key={`br-${i}`} />);
          if (parts[1]) {
            finalResult.push(parts[1]);
          }
        } else {
          finalResult.push(item);
        }
      });
      return <>{finalResult}</>;
    }

    return <>{result}</>;
  };

  const categories: CategoryItem[] = [
    {
      id: 'ceo',
      label: '인사말',
      icon: <Building2 className="w-8 h-8" />,
      onClick: () => handleCategoryClick('/greeting', 'management-philosophy'),
    },
    {
      id: 'vision',
      label: '비전 및 경영이념',
      icon: <Lightbulb className="w-8 h-8" />,
      onClick: () => handleCategoryClick('/greeting', 'management-philosophy'),
    },
    {
      id: 'history',
      label: '회사연혁',
      icon: <CheckSquare2 className="w-8 h-8" />,
      onClick: () => handleCategoryClick('/greeting', 'company-history'),
    },
    {
      id: 'license',
      label: '보유 면허 및 자격증',
      icon: <Shield className="w-8 h-8" />,
      onClick: () => handleCategoryClick('/greeting', 'license'),
    },
    {
      id: 'organization',
      label: '조직도',
      icon: <Users className="w-8 h-8" />,
      onClick: () => handleCategoryClick('/greeting', 'organization'),
    },
    {
      id: 'portfolio',
      label: '수행 실적',
      icon: <Search className="w-8 h-8" />,
      onClick: () => handleCategoryClick('/portfolio'),
    },
  ];

  // Slide 컴포넌트를 내부에 정의
  const SlideComponent: React.FC<{ slide: SlideItem; index: number; isActive: boolean }> = ({ slide, index, isActive }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (isActive) {
        const timer = setTimeout(() => setVisible(true), 200);
        return () => clearTimeout(timer);
      } else {
        setVisible(false);
      }
    }, [isActive]);

    return (
      <div
        ref={(el) => (slideRefs.current[index] = el)}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0"
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
            <h2 
              className="font-korean font-semibold leading-relaxed mb-6 drop-shadow-2xl"
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 45pt)',
              }}
            >
              {renderHighlightedText(slide.text, slide.highlightWords, index)}
            </h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="sitemap-section" className="bg-white relative" ref={sectionStartRef}>
      {/* Side Indicator (Dots) - SitemapSection 영역에 진입했을 때만 표시 */}
      {showIndicator && (
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        {[...slides, { id: 'sitemap' }].map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className="group relative flex items-center justify-end"
          >
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-500 border border-white/40 ${
                i === activeIndex 
                  ? 'bg-blue-500 scale-150 border-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]' 
                  : 'bg-transparent'
              }`}
            />
          </button>
        ))}
        </nav>
      )}

      <div className="flex flex-col">
        {slides.map((slide, index) => (
          <SlideComponent
            key={slide.id}
            slide={slide}
            index={index}
            isActive={activeIndex === index}
          />
        ))}

        {/* Sitemap Footer Section */}
        <div 
          ref={sitemapRef}
          className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
          style={{
            background: '#0B1C2B',
          }}
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-16 lg:gap-24">
            {/* Company Title */}
            <div 
              ref={companyNameRef}
              className={`text-center transition-all duration-1000 transform ${sitemapVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <h1 
                className="text-white font-light tracking-tighter mb-4 font-logo"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw + 0.5rem, 3.75rem)', // 모바일(480px) ~ 데스크톱 반응형
                }}
              >
                대한민국상이군경회<span className="font-light" style={{ color: '#2686EB' }}>시설사업소</span>
              </h1>
            </div>

            {/* Categories Grid (asset2 레이아웃) */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-b border-white/10">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={category.onClick}
                  className={`group relative flex flex-col items-center justify-center py-12 px-4 cursor-pointer hover:bg-white/5 transition-all duration-700 border-white/10 ${sitemapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${
                    // 모바일(2열): 홀수 번째(1, 3, 5)에만 border-r
                    // 태블릿(3열): 3의 배수가 아닐 때 border-r
                    // 데스크톱(6열): 6의 배수가 아닐 때 border-r
                    (index + 1) % 2 !== 0 ? 'border-r' : 
                    (index + 1) % 3 !== 0 ? 'md:border-r lg:border-r' :
                    (index + 1) % 6 !== 0 ? 'lg:border-r' : ''
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="text-white/60 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 mb-6">
                    {React.cloneElement(category.icon as React.ReactElement, { 
                      size: 40,
                      strokeWidth: 1.2,
                      className: "xl:w-[60px] xl:h-[60px]"
                    })}
                  </div>
                  <span className="text-white/80 group-hover:text-white text-center font-medium tracking-tight text-sm lg:text-base xl:text-xl xl:leading-7 font-korean">
                    {category.label}
                  </span>
                  
                  {/* Plus Sign Decoration */}
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 text-white/20 font-thin text-xl pointer-events-none">+</div>
                  <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 text-white/20 font-thin text-xl pointer-events-none">+</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}
          />
        </div>
      </div>
    </section>
  );
};