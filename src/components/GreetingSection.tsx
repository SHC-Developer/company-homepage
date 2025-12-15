import React, { useState, useEffect, useRef } from 'react';
import { HandHeart, Target, Award, TrendingUp, Globe, Users } from 'lucide-react';

export const GreetingSection = () => {
  const [videoError, setVideoError] = useState(false);
  const videoIframeRef = useRef<HTMLIFrameElement>(null);
  const videoPlayerRef = useRef<any>(null);
  const [showBottomText, setShowBottomText] = useState(true);
  const [visibleParagraphs, setVisibleParagraphs] = useState<boolean[]>([false, false, false, false, false, false]);
  const [visibleTitle, setVisibleTitle] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);
  const [visibleCEOMessage, setVisibleCEOMessage] = useState(false);
  const [visibleSubtitle, setVisibleSubtitle] = useState(false);
  const [visiblePhilosophyTitle, setVisiblePhilosophyTitle] = useState(false);
  const [visiblePhilosophyContent, setVisiblePhilosophyContent] = useState(false);
  const [visiblePhilosophyCards, setVisiblePhilosophyCards] = useState<boolean[]>([false, false, false, false]);
  const [visibleCoreValues, setVisibleCoreValues] = useState<boolean[]>([false, false, false, false, false]);
  const [visibleHistoryTitle, setVisibleHistoryTitle] = useState(false);
  const [visibleHistoryItems, setVisibleHistoryItems] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ceoMessageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const philosophyTitleRef = useRef<HTMLDivElement>(null);
  const philosophyContentRef = useRef<HTMLDivElement>(null);
  const philosophyCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coreValueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const historyTitleRef = useRef<HTMLDivElement>(null);
  const historyItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // YouTube IFrame API를 사용한 비디오 반복 재생 (모바일 대응)
  useEffect(() => {
    const initPlayer = () => {
      if (videoIframeRef.current && !videoPlayerRef.current && (window as any).YT && (window as any).YT.Player) {
        try {
          videoPlayerRef.current = new (window as any).YT.Player(videoIframeRef.current, {
            events: {
              onStateChange: (event: any) => {
                // 비디오가 끝났을 때 (state === 0) 다시 재생
                if (event.data === (window as any).YT.PlayerState.ENDED) {
                  videoPlayerRef.current?.playVideo();
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
      if (videoPlayerRef.current) {
        try {
          videoPlayerRef.current.destroy();
        } catch (e) {
          // 무시
        }
        videoPlayerRef.current = null;
      }
    };
  }, []);

  // COMPANY HISTORY: no range filtering, continuous timeline (latest first)

  // 인증서 목록 (특허증 제외)
  const certifications = [
    { name: '수익사업승인서', date: '2024-23호', path: 'certification/01.수익사업 승인서.jpg' },
    { name: '안전진단전문기관등록증', date: '2021.06.02.', path: 'certification/02.안전진단전문기관등록증.jpg' },
    { name: '엔지니어링사업자신고증', date: '2022.01.13.', path: 'certification/03.엔지니어링사업자신고증.jpg' },
    { name: '건설엔지니어링업등록증', date: '2021.11.15.', path: 'certification/04.건설엔지니어링업등록증.jpg' },
  ];

  // 보유기술 (특허) 목록
  const patents = [
    {
      division: '1',
      applicationDate: '2023.12.19.',
      applicationNo: '2023-0185643',
      name: '교량의 3차원 거동 측정 장치 및 이를 포함하는 시스템',
      registrationDate: '2024.04.01.',
      registrationNo: '10-2654625',
      performance2024: '안전진단 1건',
      performance2025: '정밀안전점검 1건(예정)'
    },
    {
      division: '2',
      applicationDate: '2023.12.19.',
      applicationNo: '2023-0185661',
      name: '교량의 3차원 거동 측정 방법',
      registrationDate: '2024.04.01.',
      registrationNo: '10-2654629',
      performance2024: '-',
      performance2025: '-'
    },
    {
      division: '3',
      applicationDate: '2023.12.19.',
      applicationNo: '2023-0185678',
      name: '교량의 3차원 거동 측정 시스템',
      registrationDate: '2024.04.01.',
      registrationNo: '10-2654632',
      performance2024: '-',
      performance2025: '-'
    }
  ];

  // 특허증 이미지 목록
  const patentImages = [
    { title: '특허증_제10-2654625호', description: '교량의 3차원 거동 측정 장치 및 이를 포함하는 시스템', path: 'certification/특허증_제10-2654625호_교량의 3차원 거동 측정 장치 및 이를 포함하는 시스템.jpg' },
    { title: '특허증_제10-2654629호', description: '교량의 3차원 거동 측정 방법', path: 'certification/특허증_제10-2654629호_교량의 3차원 거동 측정 방법.jpg' },
    { title: '특허증_제10-2654632호', description: '교량의 3차원 거동 측정 시스템', path: 'certification/특허증_제10-2654632호_교량의 3차원 거동 측정 시스템_.jpg' },
  ];

  useEffect(() => {
    const observers = paragraphRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleParagraphs(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        {
          threshold: 0.3, // 요소의 30%가 보일 때 트리거
          rootMargin: '0px 0px -100px 0px' // 아래에서 100px 위치에서 시작
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  // Title 애니메이션 감지
  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleTitle(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -250px 0px'
      }
    );

    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  // Image 애니메이션 감지
  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleImage(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -250px 0px'
      }
    );

    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, []);

  // CEO Message 애니메이션 감지
  useEffect(() => {
    if (!ceoMessageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleCEOMessage(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -250px 0px'
      }
    );

    observer.observe(ceoMessageRef.current);
    return () => observer.disconnect();
  }, []);

  // Subtitle 애니메이션 감지
  useEffect(() => {
    if (!subtitleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleSubtitle(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -250px 0px'
      }
    );

    observer.observe(subtitleRef.current);
    return () => observer.disconnect();
  }, []);

  // Philosophy Title 애니메이션 감지
  useEffect(() => {
    if (!philosophyTitleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisiblePhilosophyTitle(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -250px 0px'
      }
    );

    observer.observe(philosophyTitleRef.current);
    return () => observer.disconnect();
  }, []);

  // Philosophy Content 애니메이션 감지
  useEffect(() => {
    if (!philosophyContentRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisiblePhilosophyContent(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -250px 0px'
      }
    );

    observer.observe(philosophyContentRef.current);
    return () => observer.disconnect();
  }, []);

  // Philosophy Cards 애니메이션 감지
  useEffect(() => {
    const observers = philosophyCardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisiblePhilosophyCards(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -250px 0px'
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  // Core Values 애니메이션 감지
  useEffect(() => {
    const observers = coreValueRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleCoreValues(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -250px 0px'
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  // History Title 애니메이션 감지
  useEffect(() => {
    if (!historyTitleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleHistoryTitle(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -10px 0px'
      }
    );

    observer.observe(historyTitleRef.current);
    return () => observer.disconnect();
  }, []);

  // History Items 애니메이션 감지
  useEffect(() => {
    const observers = historyItemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleHistoryItems(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        {
          threshold: 0.5,
          rootMargin: '0px'
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <div className="w-full">
      {/* 영상 배경 섹션 */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        {/* YouTube 배경 비디오 */}
        <div className="absolute inset-0 z-0">
          {!videoError ? (
            <div className="relative w-full h-full">
              <iframe
                ref={videoIframeRef}
                id="greeting-video-iframe"
                className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2"
                src="https://www.youtube-nocookie.com/embed/ZTk_00Kto1o?autoplay=1&mute=1&loop=1&playlist=ZTk_00Kto1o&controls=0&rel=0&modestbranding=1&playsinline=1&start=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&enablejsapi=1"
                title="대한민국 상이군경회 시설사업소 배경 영상"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={() => setVideoError(true)}
                style={{
                  pointerEvents: 'none',
                }}
              />
              {/* 비디오 위에 오버레이 */}
              <div className="absolute inset-0 bg-black/10 z-10"></div>
            </div>
          ) : (
            /* 대체 배경 */
            <div 
              className="w-full h-full bg-gradient-to-br from-primary to-primary-hover"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(13, 42, 74, 0.8), rgba(30, 111, 217, 0.8))`,
              }}
            />
          )}
        </div>

        {/* 우측 하단 텍스트 */}
        {showBottomText && (
          <div className="absolute bottom-8 right-8 z-20 text-right">
            <p className="text-[16pt] text-white font-korean drop-shadow-lg">
              25.10.25 올림픽대교 전경
            </p>
            <p className="text-[10pt] text-white/80 font-korean drop-shadow-md mt-2">
              © 대한민국상이군경회시설사업소. All rights reserved.
            </p>
          </div>
        )}
      </section>

      {/* 경영이념 콘텐츠 섹션 (리디자인) */}
      <div className="relative min-h-screen py-20 bg-gradient-to-b from-slate-50 via-white to-white" id="management-philosophy">

        <div className="relative w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 상단 섹션 */}
          <div className="mb-14">
            <div 
              ref={philosophyTitleRef}
              className={`space-y-4 transition-all duration-1000 ${visiblePhilosophyTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            >
              <div className="flex justify-center">
                <span className="inline-block h-1.5 w-12 rounded-full bg-[#1e40af]" />
              </div>
              <h2 className="text-center font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.4] tracking-tight" style={{ paddingBottom: '0.3em', overflow: 'visible' }}>
                <span className="bg-gradient-to-r from-[#1D66B3] to-slate-900 bg-clip-text text-transparent" style={{ display: 'inline-block', lineHeight: '1.4' }}>
                  국가유공자의 높은 이상을 바탕으로,
                  <br className="hidden sm:block" />
                  공명정대하고 투명한 조직운영으로 국가 발전에 기여합니다.
                </span>
              </h2>
              <p className="text-center text-slate-600 text-base sm:text-lg">
                Veterans-first ethics. Transparent governance. Impact for national infrastructure.
              </p>
            </div>
          </div>

          {/* 주요 정보 카드 섹션 - 건설업계 톤다운 스타일 */}
          <div 
            ref={philosophyContentRef}
            className={`mb-20 transition-all duration-1000 ${visiblePhilosophyContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 국가 보훈의 이념 카드 */}
              <div 
                ref={el => philosophyCardRefs.current[1] = el}
                className={`rounded-xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-700 ${visiblePhilosophyCards[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#1e40af]/10 ring-1 ring-[#1e40af]/20 flex items-center justify-center font-bold" style={{ color: '#0B1C2B' }}>Ⅰ</div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0C2B4B' }}>국가 보훈의 이념</h3>
                    <p className="mt-2 leading-7 text-base" style={{ color: '#0C2B4B' }}>
                      대한민국의 오늘은 국가의 존립과 발전을 위해 공헌하거나 이를 위해 자신을 희생한 국가유공자의 공헌과 희생 위에 이룩되었습니다. 국가유공자의 공헌과 희생이 숭고한 애국정신의 귀감으로서 항구적으로 존중되도록 하며, 그에 상응하는 명예와 보상이 유지되도록 합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 단체설립근거 카드 */}
              <div 
                ref={el => philosophyCardRefs.current[2] = el}
                className={`rounded-xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-700 ${visiblePhilosophyCards[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-600/10 ring-1 ring-indigo-600/20 flex items-center justify-center font-bold" style={{ color: '#0B1C2B' }}>Ⅱ</div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0C2B4B' }}>단체설립근거</h3>
                    <p className="mt-2 leading-7 text-base" style={{ color: '#0C2B4B' }}>
                      『국가유공자 등 단체설립에 관한 법률』 제1조에 근거하여 설립되었으며, 국가유공자와 유족의 상부상조, 자활능력 배양, 민족정기 선양, 자유민주주의 수호 및 평화적 통일과 국제평화 유지에 이바지함을 목적으로 합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 가치 섹션 - 미니멀 기업형 카드 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1.5 w-12 rounded-full bg-[#1e40af]" />
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#1D66B3' }}>핵심 가치</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {/* 상부상조 카드 */}
              <div 
                ref={el => coreValueRefs.current[0] = el}
                className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-700 ${visibleCoreValues[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-slate-700">
                    <HandHeart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: '#0B1C2B' }}>상부상조</h3>
                    <p className="text-sm" style={{ color: '#0B1C2B' }}>서로 돕고 함께 성장</p>
                  </div>
                </div>
              </div>

              {/* 자활자립 카드 */}
              <div 
                ref={el => coreValueRefs.current[1] = el}
                className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-700 ${visibleCoreValues[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-slate-700">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: '#0B1C2B' }}>자활자립</h3>
                    <p className="text-sm" style={{ color: '#0B1C2B' }}>스스로 역량으로 자립</p>
                  </div>
                </div>
              </div>

              {/* 명예선양 카드 */}
              <div 
                ref={el => coreValueRefs.current[2] = el}
                className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-700 ${visibleCoreValues[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-slate-700">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: '#0B1C2B' }}>명예선양</h3>
                    <p className="text-sm" style={{ color: '#0B1C2B' }}>숭고한 희생을 기림</p>
                  </div>
                </div>
              </div>

              {/* 국가발전 카드 */}
              <div 
                ref={el => coreValueRefs.current[3] = el}
                className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-700 ${visibleCoreValues[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-slate-700">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: '#0B1C2B' }}>국가발전</h3>
                    <p className="text-sm" style={{ color: '#0B1C2B' }}>인프라 발전 기여</p>
                  </div>
                </div>
              </div>

              {/* 세계평화 카드 */}
              <div 
                ref={el => coreValueRefs.current[4] = el}
                className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-700 ${visibleCoreValues[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-50 ring-1 ring-slate-200 flex items-center justify-center text-slate-700">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: '#0B1C2B' }}>세계평화</h3>
                    <p className="text-sm" style={{ color: '#0B1C2B' }}>공동번영과 협력</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 인사말 콘텐츠 섹션 */}
      <div className="min-h-screen pt-10" id="ceo-message" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #F0F4F8 100%)' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 상단 섹션 */}
          <div className="mb-12">
            <div className="mb-4">
              <div 
                ref={titleRef}
                className={`space-y-2 transition-all duration-1000 ${visibleTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C2B] leading-tight tracking-tight">
                  大韓民國傷痍軍警會 시설사업소
                </h1>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B1C2B] leading-tight tracking-tight" style={{ letterSpacing: '0.04em' }}>
                  Engineering Safety. Inspiring Innovation.
                </h1>
              </div>
            </div>
            
            <div 
              ref={subtitleRef}
              className={`text-center text-[#000000] font-medium transition-all duration-1000 mt-12 ${visibleSubtitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
              style={{ fontSize: '16pt' }}
            >
              <p>기술혁신의 창의를 바탕으로, 보다 안전하고 편의로운 국가를 완성하다.</p>
            </div>
          </div>

          {/* 하단 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
            {/* 이미지 영역 - 제거됨 */}

            {/* 텍스트 영역 */}
            <div className="space-y-4 col-span-1 lg:col-span-2" style={{ marginLeft: '0' }}>
              <div className="max-w-none">
                <div 
                  ref={el => paragraphRefs.current[0] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#0C2B4B', marginBottom: '1.5rem', wordBreak: 'keep-all', textAlign: 'justify' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '17pt' }}>대한민국상이군경회</span>는 국가와 사회에 헌신 봉사하고 참여했던 국가유공자들의 높은 이상과 뜻을 한데 모아 국가유공자단체법에 의거하여 설립된 단체로 국가유공자와 그 유족이 상부상조하여 자활능력을 배양하고 순국선열과 호국전몰장병의 유지를 이어 민족정기를 선양하고 국민의 애국정신을 함양시키며 자유민주주의의 수호 및 조국의 평화적 통일과 국제평화의 유지에 이바지함을 목적으로 하는 단체입니다.

                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[1] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#0C2B4B', marginBottom: '1.5rem', wordBreak: 'keep-all', textAlign: 'justify' }}>
                  이러한 근간의 정신을 바탕으로 저희 <b>대한민국상이군경회</b>에서는 <b>『 국가유공자등단체설립에관한법률 』</b> 제7조의 2 및 <b>『 국가유공자단체의수익사업에관한규칙 』</b> 제5조의 규정에 의하여 국가보훈부의 승인을 받은 수익사업 중 토목 및 건축 등 건설기술용역을 <b>대한민국상이군경회시설사업소</b>를 설립하여 전문적으로 수행하게 되었습니다.
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[2] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#0C2B4B', marginBottom: '1.5rem', wordBreak: 'keep-all', textAlign: 'justify' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '17pt' }}>본 시설사업소</span>는 <b>『건설산업기본법』</b> <b>『엔지니어링산업진흥법』</b> <b>『건설기술진흥법』</b> <b>『시설물의 안전 및 유지관리에 관한 특별법』</b>에 근거하여 업면허를 보유하고 있으며, 각 분야별 다년간의 다양한 경험과 전문 기술력을 가진 기술인들로 구성하여 국가시설물의 설계단계부터 시공, 건설사업관리 및 유지관리차원의 안전진단 및 안전점검 업무에 이르기까지 어느 분야를 담당하여도 신뢰할 수 있는 성과를 제시할 수 있다고 자부하는 바입니다.
                  </p>
                </div>

                <div 
                  ref={el => paragraphRefs.current[3] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#0C2B4B', marginBottom: '1.5rem', wordBreak: 'keep-all', textAlign: 'justify' }}>
                  사람의 걸음에는 그 걸음마다 자국이 남게 마련입니다. 저희는 사람과 사랑으로 융합된 성장의 발자국을 남기려 합니다. 지금까지 국가를 위하여 헌신 봉사하였던 마음가짐을 그대로 이어 건설 분야의 기술용역사업 수행을 통하여 다시 한번 봉사하고자 하오니 많은 협조와 조언을 부탁드리며 저희 <b>대한민국상이군경회시설사업소</b>에 많은 일을 맡겨주실 것을 부탁말씀 드립니다.<br />
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[5] = el}
                  className={`transition-all duration-1000 mt-8 ${visibleParagraphs[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-xl sm:text-2xl font-semibold text-right" style={{ color: '#0B1C2B' }}>
                    대한민국상이군경회시설사업소장
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회사연혁 콘텐츠 섹션 */}
      <div className="min-h-screen pt-36" id="company-history" style={{ background: 'linear-gradient(to bottom, #F0F4F8 0%, #F7FBFF 100%)' }}>
        <div className="w-[65%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 헤더 */}
          <div className="mb-10">
            <div
              ref={historyTitleRef}
              className={`transition-all duration-1000 ${visibleHistoryTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            >
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                YEARLY <span style={{ color: '#1D66B3' }} className="font-black">GROWTH</span> HIGHLIGHTS
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                국가 인프라 발전에 기여해온 여정의 주요 순간들
              </p>
            </div>
          </div>


          {/* 리스트형 타임라인 */}
          <div className="space-y-24 relative">
          {/* 연결된 세로줄 */}
          <div className="hidden md:block absolute left-[304px] top-0 bottom-0 w-px bg-slate-300"></div>
            {/* 2026.01 */}
            <div
              id="history-2026"
              ref={el => historyItemRefs.current[11] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[11] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2026.01</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">초경량비행장치사용 사업자 등록</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2021.11 */}
            <div
              id="history-2021"
              ref={el => historyItemRefs.current[10] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[10] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2021.11</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">건설기술용역업 - 건설엔지니어링업 명칭 변경</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2017.03 */}
            <div
              id="history-2017"
              ref={el => historyItemRefs.current[9] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[9] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2017.03</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">기업부설연구소 등록 (시설사업소 휴먼테크연구부)</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2015.02 */}
            <div
              id="history-2015"
              ref={el => historyItemRefs.current[8] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[8] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2015.02</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">감리전문회사 - 건설기술용역업 명칭 변경</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2014.03 */}
            <div
              id="history-2014"
              ref={el => historyItemRefs.current[7] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2014.03</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">대한민국상이군경회시설사업소 소장 나경준 부임</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2012.05 */}
            <div
              id="history-2012"
              ref={el => historyItemRefs.current[6] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2012.05</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">엔지니어링사업자 신고</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2009.10 */}
            <div
              id="history-2009-10"
              ref={el => historyItemRefs.current[5] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2009.10</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">감리전문회사 등록</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2009.07 */}
            <div
              id="history-2009-07"
              ref={el => historyItemRefs.current[4] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2009.07</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">대한민국상이군경회 - 대한민국상이군경회시설사업소 법인 명칭 변경</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2003.06 */}
            <div
              id="history-2003-06"
              ref={el => historyItemRefs.current[3] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D66B3', width: '256px' }}>2003.06</h3>
              </div>
              <div className="relative md:pl-10">
                <ul>
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">안전진단전문기관 등록</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-lg text-gray-700">엔지니어링활동주체 신고</p>
                      <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2002.12 */}
            <div
              id="history-2002"
              ref={el => historyItemRefs.current[2] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 transition-all duration-700 ${visibleHistoryItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3
                  className="text-4xl sm:text-5xl font-extrabold"
                  style={{ color: '#0C2B4B', whiteSpace: 'nowrap', width: '256px' }}
                >
                  2002.12.03
                </h3>
              </div>
              <div className="relative md:pl-10">
                  <ul className="divide-y divide-slate-200">
                    <li className="group relative py-3 pl-6">
                      <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                      <div>
                        <p className="text-lg text-gray-700">대한민국상이군경회 시설물관리사업소 설립</p>
                        <div className="mt-2 border-b border-slate-300" style={{ width: 'calc(65vw - 200px)' }}></div>
                      </div>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 보유면허 및 기술 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" id="license" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#1D66B3] to-[#1D66B3] bg-clip-text text-transparent py-4 border-l-4 border-[#1D66B3] pl-6">국가승인서 및 등록증</h2>
          </div>

          {/* 인증서 갤러리 - 4개 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer group">
                <div 
                  className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}${cert.path}`)}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${cert.path}`}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="text-sm font-semibold">이미지 확대</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center w-full px-2">
                  <p className="text-base text-gray-700 font-korean break-words">{cert.name}</p>
                  <p className="text-sm text-gray-500 font-korean mt-1">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 보유기술 (특허) 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#1D66B3] to-[#1D66B3] bg-clip-text text-transparent py-4 border-l-4 border-[#1D66B3] pl-6">보유기술</h2>
          </div>

          {/* 특허증 갤러리 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {patentImages.map((patent, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer group">
                <div 
                  className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}${patent.path}`)}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${patent.path}`}
                    alt={patent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="text-sm font-semibold">이미지 확대</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center w-full px-2">
                  <p className="text-base text-gray-700 font-korean break-words">{patent.title}</p>
                  <p className="text-sm text-gray-500 font-korean mt-1 break-words">{patent.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* 모달 팝업 */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-lg overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors duration-200 shadow-lg"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 이미지 */}
              <img
                src={selectedImage || ''}
                alt="확대된 이미지"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

      {/* 조직구성 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" id="organization" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-1.5 w-12 rounded-full bg-[#1e40af]" />
            <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: '#1D66B3' }}>조직구성</h2>
          </div>

          <div className="w-full">
            <div className="rounded-2xl border border-border bg-white p-10 shadow-sm h-full flex flex-col">
              <div className="w-full flex justify-center items-center">
                <img
                  src={`${import.meta.env.BASE_URL}organization chart.png`}
                  alt="조직구성도"
                  className="w-full h-auto max-w-6xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오시는길 콘텐츠 섹션 */}
      <div className="min-h-screen pt-20 pb-16" id="directions" style={{ background: 'linear-gradient(to bottom, #F7FBFF 0%, #FFFFFF 100%)' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">오시는 길</h2>
            <p className="text-lg text-gray-600">대한민국상이군경회시설사업소의 위치를 확인하세요.</p>
          </div>

          {/* 메인 콘텐츠 - 좌우 레이아웃 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max lg:auto-rows-min">
            {/* 좌측: 지도 (2칸) */}
            <div className="lg:col-span-2 lg:row-span-3">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingBottom: '60%'
                }}>
                  <iframe 
                    src="https://naver.me/I55AanzX" 
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    title="회사 위치 - 네이버 지도"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* 우측: 정보 카드 (1칸) - 주소 정보 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">주소 정보</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">회사명</p>
                  <p className="text-sm font-semibold text-gray-900">대한민국상이군경회시설사업소</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">주소</p>
                  <p className="text-sm text-gray-900">경기도 성남시 분당구 판교역로 230 삼환하이펙스 B동 9층 907호</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">전화</p>
                  <p className="text-sm text-gray-900">02-572-6218</p>
                </div>
              </div>
            </div>

            {/* 우측: 정보 카드 (1칸) - 대중교통 안내 */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">대중교통 안내</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">지하철</p>
                  <p className="text-xs text-gray-700">
                    지도에서 확인되는 대중교통 정보를 참고하세요.
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">버스</p>
                  <p className="text-xs text-gray-700">
                    네이버 지도의 대중교통 탭에서 버스 노선을 확인할 수 있습니다.
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">자가용</p>
                  <p className="text-xs text-gray-700">
                    네이버 지도 앱에서 길찾기를 통해 최적의 경로를 확인하세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 우측: 지도 링크 버튼 */}
            <div>
              <a 
                href="https://naver.me/I55AanzX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center text-sm h-full flex items-center justify-center"
              >
                네이버 지도에서 더 자세히 보기
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};


