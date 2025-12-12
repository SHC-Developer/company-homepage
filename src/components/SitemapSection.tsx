import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Lightbulb, 
  CheckSquare2, 
  Shield, 
  Users, 
  Search, 
  MapPin 
} from 'lucide-react';

interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface SlideItem {
  id: string;
  text: string;
  align: 'left' | 'right';
  imageSrc: string;
}

export const SitemapSection = () => {
  const navigate = useNavigate();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sitemapRef = useRef<HTMLDivElement>(null);
  const [sitemapOpacity, setSitemapOpacity] = useState(0);

  // 이미지 경로 헬퍼 함수 (Portfolio.tsx와 동일한 패턴)
  const getImagePath = (filename: string) => {
    const baseUrl = import.meta.env.BASE_URL;
    const path = `${baseUrl}portfolio/${filename}`;
    return path;
  };

  const slides: SlideItem[] = [
    {
      id: 'slide-1',
      text: '당신의 오늘은 안전하셨습니까?',
      align: 'right',
      imageSrc: getImagePath('performance1.JPG'),
    },
    {
      id: 'slide-2',
      text: '국민들의 안전하고 쾌적한',
      align: 'left',
      imageSrc: getImagePath('performance3.JPG'),
    },
    {
      id: 'slide-3',
      text: '아름다운 생활을 영위하는 나라건설',
      align: 'right',
      imageSrc: getImagePath('performance5.jpg'),
    },
    {
      id: 'slide-4',
      text: '사람과 사랑으로 융합된',
      align: 'left',
      imageSrc: getImagePath('performance8.jpg'),
    },
    {
      id: 'slide-5',
      text: '성장의 발자국을 남기는 시설사업소가 되겠습니다.',
      align: 'right',
      imageSrc: getImagePath('performance12.jpg'),
    },
  ];

  const [opacities, setOpacities] = useState<number[]>(
    () => slides.map((_, idx) => (idx === 0 ? 1 : 0))
  );

  useEffect(() => {
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      (entries) => {
        setOpacities((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (Number.isFinite(idx)) {
              next[idx] = Math.max(0, Math.min(1, entry.intersectionRatio));
            }
          });
          return next;
        });
      },
      { threshold: thresholds }
    );

    slideRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [slides.length]);

  // 사이트맵 섹션 fade in 효과
  useEffect(() => {
    const handleScroll = () => {
      if (!sitemapRef.current) return;

      const rect = sitemapRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 요소가 화면 상단에서 50% 위치에 도달했을 때 (더 앞당김)
      const triggerPoint = windowHeight * 0.75;
      const elementTop = rect.top;
      
      // 요소가 화면 상단에서 50% 지점 이하로 들어오면 fade in
      if (elementTop <= triggerPoint) {
        const opacity = Math.min(1, Math.max(0, 1 - (elementTop - triggerPoint + 200) / 300));
        setSitemapOpacity(opacity);
      } else {
        setSitemapOpacity(0);
      }
      
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 체크

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const renderHighlightedText = (text: string, index: number) => {
    const highlightWords: { [key: number]: string[] } = {
      0: ['오늘'],
      1: ['안전', '쾌적'],
      2: ['나라건설'],
      3: ['사람', '사랑'],
      4: ['성장', '시설사업소'],
    };

    const words = highlightWords[index] || [];
    if (words.length === 0) {
      return <>{text}</>;
    }

    // 모든 강조 단어를 한 번에 처리
    let result: (string | JSX.Element)[] = [];
    let remainingText = text;
    
    words.forEach((word, wordIndex) => {
      const parts = remainingText.split(word);
      if (parts.length > 1) {
        // 첫 번째 부분 추가
        if (parts[0]) {
          result.push(parts[0]);
        }
        // 강조된 단어 추가
        result.push(
          <span key={`${index}-${wordIndex}`} style={{ fontSize: '48pt', color: '#1D66B3' }}>
            {word}
          </span>
        );
        // 나머지 텍스트
        remainingText = parts.slice(1).join(word);
      }
    });
    
    // 마지막 남은 텍스트 추가
    if (remainingText) {
      result.push(remainingText);
    }

    // 다섯 번째 슬라이드의 경우 줄바꿈 처리
    if (index === 4) {
      // "을 남기는" 부분을 찾아서 뒤에 줄바꿈 삽입
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
    {
      id: 'directions',
      label: '오시는 길',
      icon: <MapPin className="w-8 h-8" />,
      onClick: () => handleCategoryClick('/greeting', 'directions'),
    },
  ];

  return (
    <section className="bg-white">
      <div className="flex flex-col">
        {slides.map((slide, index) => {
          const opacity = Math.max(0, Math.min(1, opacities[index] ?? 0));
          const imageOnRight = slide.align === 'right';

          return (
            <div
              key={slide.id}
              ref={(el) => (slideRefs.current[index] = el)}
              data-index={index}
              className={`relative h-[750px] flex items-center justify-center overflow-hidden ${index === 0 ? 'mt-[150px]' : ''}`}
            >
              <div className="absolute inset-0 bg-white" />

              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex items-center"
                style={{
                  width: '85%',
                }}
              >
                <div className="w-full flex items-center" style={{ height: '100%' }}>
                  {/* 이미지가 오른쪽일 때: 왼쪽에 텍스트, 오른쪽에 이미지 */}
                  {imageOnRight ? (
                    <>
                      {/* 왼쪽 영역 - 텍스트 중앙 정렬 */}
                      <div className="flex-1 flex items-center justify-center" style={{ paddingRight: '2%' }}>
                        <p
                          className={`font-korean font-semibold leading-relaxed transition-[opacity,transform] duration-500 ${index === 4 ? 'text-left' : 'text-center'}`}
                          style={{
                            opacity,
                            transform: `translateY(${(1 - opacity) * 12}px)`,
                            color: '#0C2B4B',
                            fontSize: '34pt',
                          }}
                        >
                          {renderHighlightedText(slide.text, index)}
                        </p>
                      </div>
                      {/* 오른쪽 영역 - 이미지 */}
                      <div className="flex-shrink-0 flex justify-end">
                        <div 
                          className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-100 bg-white/60 backdrop-blur transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                          style={{
                            width: '100%',
                            minWidth: '480px',
                            maxWidth: '60vw',
                          }}
                        >
                          <div className="w-full h-full">
                            <img
                              src={slide.imageSrc}
                              alt="포트폴리오 이미지"
                              className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                              style={{ minHeight: '320px', maxHeight: '600px' }}
                              onError={(e) => {
                                const t = e.currentTarget as HTMLImageElement;
                                const attempt = parseInt(t.dataset.attempt || '0', 10);
                                const filename = slide.imageSrc.split('/').pop() || '';
                                const baseName = filename.replace(/\.(jpg|JPG)$/i, '');
                                // 대소문자 변형 시도
                                const attempts = [
                                  getImagePath(filename),
                                  getImagePath(`${baseName}.jpg`),
                                  getImagePath(`${baseName}.JPG`),
                                ];
                                if (attempt < attempts.length - 1) {
                                  t.src = attempts[attempt + 1];
                                  t.dataset.attempt = String(attempt + 1);
                                } else {
                                  t.onerror = null;
                                  t.style.display = 'none';
                                }
                              }}
                              data-attempt="0"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 왼쪽 영역 - 이미지 */}
                      <div className="flex-shrink-0 flex justify-start">
                        <div 
                          className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-100 bg-white/60 backdrop-blur transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                          style={{
                            width: '100%',
                            minWidth: '240px',
                            maxWidth: '40vw',
                          }}
                        >
                          <div className="w-full h-full">
                            <img
                              src={slide.imageSrc}
                              alt="포트폴리오 이미지"
                              className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                              style={{ minHeight: '320px', maxHeight: '600px' }}
                              onError={(e) => {
                                const t = e.currentTarget as HTMLImageElement;
                                const attempt = parseInt(t.dataset.attempt || '0', 10);
                                const filename = slide.imageSrc.split('/').pop() || '';
                                const baseName = filename.replace(/\.(jpg|JPG)$/i, '');
                                // 대소문자 변형 시도
                                const attempts = [
                                  getImagePath(filename),
                                  getImagePath(`${baseName}.jpg`),
                                  getImagePath(`${baseName}.JPG`),
                                ];
                                if (attempt < attempts.length - 1) {
                                  t.src = attempts[attempt + 1];
                                  t.dataset.attempt = String(attempt + 1);
                                } else {
                                  t.onerror = null;
                                  t.style.display = 'none';
                                }
                              }}
                              data-attempt="0"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />
                        </div>
                      </div>
                      {/* 오른쪽 영역 - 텍스트 중앙 정렬 */}
                      <div className="flex-1 flex items-center justify-center" style={{ paddingLeft: '2%' }}>
                        <p
                          className="font-korean font-semibold leading-relaxed transition-[opacity,transform] duration-500 text-center"
                          style={{
                            opacity,
                            transform: `translateY(${(1 - opacity) * 12}px)`,
                            color: '#0C2B4B',
                            fontSize: '34pt',
                          }}
                        >
                          {renderHighlightedText(slide.text, index)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div 
          ref={sitemapRef}
          className="min-h-[1200px] flex items-center pt-20 pb-12 transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #0B1C2B 100%)',
            opacity: sitemapOpacity,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center gap-32">
            {/* 회사명 텍스트 */}
            <div className="relative">
              {/* 배경 글로우 효과 */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  zIndex: -1,
                }}
              />
              
              {/* 텍스트 */}
              <h1 
                className="font-logo text-center relative"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  color: '#0C2B4B',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                대한민국상이군경회시설사업소
              </h1>
              
              {/* 하단 장식선 */}
              <div
                style={{
                  width: '60%',
                  height: '2px',
                  margin: '16px auto 0',
                  background: 'linear-gradient(90deg, transparent, rgba(30, 63, 100, 0.5), transparent)',
                }}
              />
            </div>

            {/* 카테고리 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 sm:gap-4 w-full">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={category.onClick}
                  className="flex flex-col items-center gap-6 p-8 rounded-xl transition-all duration-300 hover:bg-slate-100 hover:shadow-2xl group relative overflow-hidden"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {/* 호버 시 배경 글로우 */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                    }}
                  />
                  
                  {/* 아이콘 */}
                  <div 
                    className="text-gray-600 group-hover:text-[#1A3152] transition-all duration-300 relative z-10"
                  >
                    {React.cloneElement(category.icon as React.ReactElement, { 
                      className: "w-16 h-16 group-hover:scale-110 transition-transform duration-300",
                      strokeWidth: (category.icon as React.ReactElement).props.strokeWidth || 1
                    })}
                  </div>
                  
                  {/* 라벨 */}
                  <span className="text-base sm:text-lg font-medium text-center font-korean text-gray-700 group-hover:text-[#1A3152] transition-colors duration-300 relative z-10">
                    {category.label}
                  </span>
                  
                  {/* 하단 액센트 라인 */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#1A3152] group-hover:w-3/4 transition-all duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
