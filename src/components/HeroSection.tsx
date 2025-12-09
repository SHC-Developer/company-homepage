import React, { useState, useEffect, useRef } from 'react';
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

// 색상 보간을 위한 헬퍼
function hexToRgb(hex: string) {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function interpolateColor(fromHex: string, toHex: string, t: number) {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  const r = lerp(from.r, to.r, t);
  const g = lerp(from.g, to.g, t);
  const b = lerp(from.b, to.b, t);
  return `rgb(${r}, ${g}, ${b})`;
}

export const HeroSection = () => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showFirstMessage, setShowFirstMessage] = useState(true);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isFirstMessageVisible, setIsFirstMessageVisible] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);
  const [allSentencesComplete, setAllSentencesComplete] = useState(false);
  const [showSecondMessages, setShowSecondMessages] = useState(true);
  const [isCurrentSentenceVisible, setIsCurrentSentenceVisible] = useState(true);
  const [showBottomText, setShowBottomText] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 ~ 1
  const containerRef = useRef<HTMLDivElement>(null);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const firstMessage = '당신의 오늘은 안전하셨습니까?';
  const secondMessages = [
    '국민들의 안전하고 쾌적한',
    '아름다운 생활을 영위하는 나라건설',
    '사람과 사랑으로 융합된 성장의 발자국을 남기는 시설사업소가 되겠습니다'
  ];

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

  const categories: CategoryItem[] = [
    {
      id: 'ceo',
      label: 'CEO인사말',
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

  // 스크롤 진행도 계산
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const t = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      setScrollProgress(t);
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    requestAnimationFrame(handleScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // 페이지 로드 후 2초 대기 후 첫 번째 메시지 시작
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsPageReady(true);
    }, 2000);

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  // 첫 번째 메시지 타이핑
  useEffect(() => {
    if (!showFirstMessage || !isPageReady) return;

    const typeFirstMessage = () => {
      if (charIndexRef.current < firstMessage.length) {
        setDisplayText(firstMessage.slice(0, charIndexRef.current + 1));
        charIndexRef.current++;
        timeoutRef.current = setTimeout(typeFirstMessage, 100);
      } else {
        // 타이핑 완료 후 2초 대기
        timeoutRef.current = setTimeout(() => {
          setIsFirstMessageVisible(false);
          timeoutRef.current = setTimeout(() => {
            setShowFirstMessage(false);
            setDisplayText('');
            setCurrentSentenceIndex(0);
            charIndexRef.current = 0;
          }, 1000);
        }, 2000);
      }
    };

    typeFirstMessage();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showFirstMessage, isPageReady]);

  // 두 번째 메시지들 타이핑 (한 문단씩 출력 후 지우기)
  useEffect(() => {
    if (showFirstMessage || currentSentenceIndex >= secondMessages.length || currentSentenceIndex < 0) return;

    const typeSecondMessage = () => {
      const currentSentence = secondMessages[currentSentenceIndex];
      
      if (charIndexRef.current < currentSentence.length) {
        setDisplayText(currentSentence.slice(0, charIndexRef.current + 1));
        charIndexRef.current++;
        timeoutRef.current = setTimeout(typeSecondMessage, 100);
      } else {
        // 타이핑 완료 후 일정 시간 표시
        timeoutRef.current = setTimeout(() => {
          // 마지막 문장이 아니면 페이드아웃 후 다음 문장으로
          if (currentSentenceIndex < secondMessages.length - 1) {
            // 페이드아웃
            setIsCurrentSentenceVisible(false);
            timeoutRef.current = setTimeout(() => {
              // 페이드아웃 완료 후 다음 문장으로
              setDisplayText('');
              setCurrentSentenceIndex(prev => prev + 1);
              charIndexRef.current = 0;
              setIsCurrentSentenceVisible(true);
            }, 1000);
          } else {
            // 마지막 문장은 지우지 않고 유지
            setAllSentencesComplete(true);
            // 2초 표시 후 페이드아웃
            timeoutRef.current = setTimeout(() => {
              setShowSecondMessages(false);
              // 페이드아웃 후 하단 텍스트 표시
              timeoutRef.current = setTimeout(() => {
                setShowBottomText(true);
              }, 1000);
            }, 2000);
          }
        }, 1000);
      }
    };

    const startDelay = setTimeout(() => {
      typeSecondMessage();
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (startDelay) clearTimeout(startDelay);
    };
  }, [showFirstMessage, currentSentenceIndex]);

  // 스크롤 전환을 위한 계산
  // 아래에서 위로 가려지는 위치 (0 = 하단, 1 = 상단)
  const maskPosition = scrollProgress; // 0 ~ 1
  
  // 초기 텍스트는 스크롤 시작 시 빠르게 fade out
  const initialTextOpacity = Math.max(0, 1 - scrollProgress * 3);
  
  // 우측 하단 텍스트는 스크롤이 조금이라도 있으면 바로 fade out (최상단에서만 보임)
  const bottomRightTextOpacity = scrollProgress > 0 ? 0 : 1;
  
  // 배경색 불투명도가 빠르게 100%가 되도록 (0.5에서 100% 도달)
  const backgroundFullOpacityPoint = 0.5; // 배경색이 100%가 되는 시점 (더 빠르게)
  
  // 배경색 불투명도: 0.5에서 1.0이 되도록 조정 (더 빠른 증가)
  const overlayOpacity = Math.min(1, scrollProgress / backgroundFullOpacityPoint); // 0 ~ 0.5에서 0 ~ 1
  
  // 회사명과 사이트맵은 배경색이 100%가 된 직후(0.5)부터 나타남
  // 0.5 ~ 0.65 사이에서 빠르게 나타나도록 (콘텐츠가 나타나는 즉시 스크롤 종료)
  const contentStartPoint = backgroundFullOpacityPoint; // 0.5
  const contentEndPoint = 0.65; // 0.65에서 완전히 보이고 스크롤 종료
  
  const companyNameOpacity = scrollProgress >= contentStartPoint 
    ? Math.min(1, (scrollProgress - contentStartPoint) / (contentEndPoint - contentStartPoint))
    : 0; // 0.5 ~ 0.6에서 0 ~ 1
  
  // 카테고리 그리드는 회사명보다 약간 늦게 나타남
  const sitemapOpacity = scrollProgress >= contentStartPoint + 0.02
    ? Math.min(1, (scrollProgress - (contentStartPoint + 0.02)) / (contentEndPoint - contentStartPoint))
    : 0; // 0.52 ~ 0.6에서 0 ~ 1
    
  const sitemapTranslateY = (1 - sitemapOpacity) * 30; // 아래에서 위로 올라옴
  

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full"
      style={{ height: '200vh', backgroundColor: '#1e3f64' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
        `}</style>
        {/* 배경 비디오 (sticky로 고정) - 항상 보임 */}
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

        {/* 배경색 레이어 - 불투명도로 fade in */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: '#0C2B4B',
            opacity: overlayOpacity,
            transition: 'opacity 80ms linear',
            zIndex: 5,
          }}
        />

        {/* 배경 보케 효과 (분홍/보라 빛점들) */}
        <div
          className="absolute inset-0 z-6 pointer-events-none"
          style={{
            opacity: overlayOpacity * 0.6,
            transition: 'opacity 80ms linear',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '15%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '30%',
              right: '20%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
              filter: 'blur(50px)',
              animation: 'float 25s ease-in-out infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '25%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'float 18s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '35%',
              right: '15%',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
              filter: 'blur(55px)',
              animation: 'float 22s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* 미묘한 그리드 패턴 */}
        <div
          className="absolute inset-0 z-7 pointer-events-none"
          style={{
            opacity: overlayOpacity * 0.1,
            transition: 'opacity 80ms linear',
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* 회사명 텍스트를 위한 반투명 오버레이 레이어 (하단 부분) - 더 연하게 */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(12, 43, 75, 0.4) 0%, rgba(12, 43, 75, 0.3) ${Math.min(20, maskPosition * 100)}%, transparent ${Math.min(35, (maskPosition * 100) + 15)}%)`,
            transition: 'background 80ms linear',
          }}
        />

        {/* 초기 타이핑 텍스트 - 스크롤 시 fade out */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full"
          style={{
            opacity: initialTextOpacity,
            transition: 'opacity 100ms linear',
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative inline-block">
              {showFirstMessage ? (
                <div className={`transition-opacity duration-1000 ${isFirstMessageVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {displayText && (
                    <p className="text-[32pt] text-white font-korean leading-relaxed drop-shadow-2xl whitespace-nowrap">
                      {displayText}
                      <span className="animate-pulse">|</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className={`transition-opacity duration-1000 ${showSecondMessages && isCurrentSentenceVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {displayText && (
                    <p className={`${currentSentenceIndex === 2 ? 'text-[26pt]' : 'text-[32pt]'} text-white font-korean leading-relaxed drop-shadow-2xl ${currentSentenceIndex === 2 ? 'whitespace-nowrap' : ''}`}>
                      {displayText}
                      {!allSentencesComplete && <span className="animate-pulse">|</span>}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 회사명 텍스트와 카테고리 그리드 컨테이너 - 화면 상단 중앙에 배치 */}
        <div 
          className="absolute top-[20%] left-0 right-0 z-20 pointer-events-none"
          style={{
            opacity: Math.max(companyNameOpacity, sitemapOpacity),
            transition: 'opacity 80ms linear',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center" style={{ gap: '256px' }}>
            {/* 회사명 텍스트 - 디자인 효과 추가 */}
            <div 
              style={{
                opacity: companyNameOpacity,
                transform: `translateY(${(1 - companyNameOpacity) * 20}px)`,
                transition: 'opacity 80ms linear, transform 80ms linear',
                position: 'relative',
              }}
            >
              {/* 배경 글로우 효과 */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  opacity: companyNameOpacity,
                  zIndex: -1,
                  transition: 'opacity 80ms linear',
                }}
              />
              
              {/* 텍스트 - 메탈릭 3D 효과 */}
              <h1 
                className="font-logo text-center relative"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 40%, #94a3b8 60%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: `
                    0 2px 4px rgba(0, 0, 0, 0.3),
                    0 4px 8px rgba(0, 0, 0, 0.2),
                    0 0 30px rgba(255, 255, 255, 0.15),
                    0 0 60px rgba(59, 130, 246, 0.1)
                  `,
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))',
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
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                  opacity: companyNameOpacity * 0.8,
                  transition: 'opacity 80ms linear',
                }}
              />
            </div>

            {/* 카테고리 그리드 */}
            <div 
              className="w-full"
              style={{
                opacity: sitemapOpacity,
                transform: `translateY(${sitemapTranslateY}px)`,
                transition: 'opacity 80ms linear, transform 80ms linear',
                pointerEvents: sitemapOpacity > 0.5 ? 'auto' : 'none',
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 sm:gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={category.onClick}
                    className="flex flex-col items-center gap-6 p-8 rounded-xl transition-all duration-300 hover:bg-slate-800/60 hover:shadow-2xl group relative overflow-hidden"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {/* 호버 시 배경 글로우 */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                      }}
                    />
                    
                    {/* 아이콘 */}
                    <div 
                      className="text-gray-400 group-hover:text-blue-400 transition-all duration-300 relative z-10"
                      style={{
                        transform: 'translateY(0)',
                      }}
                    >
                      {React.cloneElement(category.icon as React.ReactElement, { 
                        className: "w-16 h-16 group-hover:scale-110 transition-transform duration-300" 
                      })}
                    </div>
                    
                    {/* 라벨 */}
                    <span className="text-base sm:text-lg font-medium text-center font-korean text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10">
                      {category.label}
                    </span>
                    
                    {/* 하단 액센트 라인 */}
                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-400 group-hover:w-3/4 transition-all duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 우측 하단 텍스트 - 스크롤 시 바로 fade out */}
        {showBottomText && (
          <div 
            className="absolute bottom-8 right-8 z-20 text-right pointer-events-none"
            style={{ 
              opacity: bottomRightTextOpacity,
              transition: 'opacity 300ms ease-in-out',
            }}
          >
            <p className="text-[16pt] text-white font-korean drop-shadow-lg">
              25.10.25 올림픽대교 전경
            </p>
            <p className="text-[10pt] text-white/80 font-korean drop-shadow-md mt-2">
              © 대한민국상이군경회시설사업소. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
