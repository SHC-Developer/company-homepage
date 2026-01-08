import React, { useState, useEffect, useRef } from 'react';
import { HandHeart, Target, Award, TrendingUp, Globe } from 'lucide-react';
import { setupLoopingVideo } from '@/lib/utils';
import { motion } from 'framer-motion';
import { OrganizationChartV4 } from '@/components/OrganizationChartV4';

export const GreetingSection = () => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBottomText, setShowBottomText] = useState(true);
  const [visibleParagraphs, setVisibleParagraphs] = useState<boolean[]>([false, false, false, false, false, false]);
  const [visibleTitle, setVisibleTitle] = useState(false);
  const [visibleSubtitle, setVisibleSubtitle] = useState(false);
  const [visiblePhilosophyTitle, setVisiblePhilosophyTitle] = useState(false);
  const [visiblePhilosophyContent, setVisiblePhilosophyContent] = useState(false);
  const [visiblePhilosophyCards, setVisiblePhilosophyCards] = useState<boolean[]>([false, false, false, false]);
  const [visibleCoreValues, setVisibleCoreValues] = useState<boolean[]>([false, false, false, false, false]);
  const [visibleHistoryTitle, setVisibleHistoryTitle] = useState(false);
  const [visibleHistoryItems, setVisibleHistoryItems] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const philosophyTitleRef = useRef<HTMLDivElement>(null);
  const philosophyContentRef = useRef<HTMLDivElement>(null);
  const philosophyCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coreValueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const historyTitleRef = useRef<HTMLDivElement>(null);
  const historyItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const licenseCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleLicenseCards, setVisibleLicenseCards] = useState<boolean[]>(Array(7).fill(false));

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

  // COMPANY HISTORY: no range filtering, continuous timeline (latest first)

  const observeSingle = <T extends Element>(
    ref: React.RefObject<T>,
    onChange: (isVisible: boolean) => void,
    options: IntersectionObserverInit
  ) => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      onChange(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  };

  const observeMany = <T extends Element>(
    refs: React.MutableRefObject<(T | null)[]>,
    onChangeAtIndex: (index: number, isVisible: boolean) => void,
    options: IntersectionObserverInit
  ) => {
    const observers = refs.current.map((node, index) => {
      if (!node) return null;

      const observer = new IntersectionObserver(([entry]) => {
        onChangeAtIndex(index, entry.isIntersecting);
      }, options);

      observer.observe(node);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  };

  const approvalAndCertificates = [
    {
      title: '수익사업 승인서',
      badge: 'APPROVAL',
      items: [
        { label: '등록번호', value: '제2024-23호' },
        { label: '등록일자', value: '2024년 11월 28일' },
        {
          label: '승인내용',
          value:
            '용역사업',
        },
      ],
    },
    {
      title: '안전진단전문기관등록증',
      badge: 'CERTIFICATE',
      items: [
        { label: '등록번호', value: '제 서울-11호' },
        { label: '등록일자', value: '2003년 06월 10일' },
        { label: '등록분야', value: '교량 및 터널, 수리시설, 건축' },
      ],
    },
    {
      title: '엔지니어링사업자 신고증',
      badge: 'CERTIFICATE',
      items: [
        { label: '등록번호', value: '제E-9-1673호' },
        { label: '등록일자', value: '2003년 06월 11일' },
        { label: '등록분야', value: '건설 등 1개 부문, 구조 등 4개 분야' },
      ],
    },
    {
      title: '건설엔지니어링업 등록증',
      badge: 'CERTIFICATE',
      items: [
        { label: '등록번호', value: '서울-2-134호' },
        { label: '등록일자', value: '2015년 02월 12일' },
        { label: '등록분야', value: '설계•사업관리' },
      ],
    },
  ] as const;

  const patentsTextOnly = [
    {
      title: '특허 제10-2654625호',
      badge: 'PATENT',
      items: [
        { label: '출원일', value: '2023년 12월 19일' },
        { label: '등록일', value: '2024년 04월 01일' },
        { label: '발명 명칭', value: '교량의 3차원 거동 측정 장치 및 이를 포함하는 시스템' },
      ],
    },
    {
      title: '특허 제10-2654629호',
      badge: 'PATENT',
      items: [
        { label: '출원일', value: '2023년 12월 19일' },
        { label: '등록일', value: '2024년 04월 01일' },
        { label: '발명 명칭', value: '교량의 3차원 거동 측정 방법' },
      ],
    },
    {
      title: '특허 제10-2654632호',
      badge: 'PATENT',
      items: [
        { label: '출원일', value: '2023년 12월 19일' },
        { label: '등록일', value: '2024년 04월 01일' },
        { label: '발명 명칭', value: '교량의 3차원 거동 측정 시스템' },
      ],
    },
  ] as const;

  useEffect(() => {
    return observeMany(
      paragraphRefs,
      (index, isVisible) => {
        setVisibleParagraphs((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.1, // 요소의 10%가 보일 때 트리거
        rootMargin: '0px 0px 50px 0px', // 뷰포트 하단보다 50px 아래에서 시작
      }
    );
  }, []);

  // Title 애니메이션 감지
  useEffect(() => {
    return observeSingle(titleRef, setVisibleTitle, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });
  }, []);

  // Subtitle 애니메이션 감지
  useEffect(() => {
    return observeSingle(subtitleRef, setVisibleSubtitle, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });
  }, []);

  // Philosophy Title 애니메이션 감지
  useEffect(() => {
    return observeSingle(philosophyTitleRef, setVisiblePhilosophyTitle, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });
  }, []);

  // Philosophy Content 애니메이션 감지
  useEffect(() => {
    return observeSingle(philosophyContentRef, setVisiblePhilosophyContent, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });
  }, []);

  // Philosophy Cards 애니메이션 감지
  useEffect(() => {
    return observeMany(
      philosophyCardRefs,
      (index, isVisible) => {
        setVisiblePhilosophyCards((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
  }, []);

  // Core Values 애니메이션 감지
  useEffect(() => {
    return observeMany(
      coreValueRefs,
      (index, isVisible) => {
        setVisibleCoreValues((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
  }, []);

  // History Title 애니메이션 감지
  useEffect(() => {
    return observeSingle(historyTitleRef, setVisibleHistoryTitle, {
      threshold: 0.1,
      rootMargin: '0px 0px 50px 0px',
    });
  }, []);

  // History Items 애니메이션 감지
  useEffect(() => {
    return observeMany(
      historyItemRefs,
      (index, isVisible) => {
        setVisibleHistoryItems((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px 100px 0px',
      }
    );
  }, []);

  // License/Patent Cards 애니메이션 감지
  useEffect(() => {
    return observeMany(
      licenseCardRefs,
      (index, isVisible) => {
        setVisibleLicenseCards((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px 80px 0px',
      }
    );
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* 영상 배경 섹션 */}
      <section className="relative w-full overflow-hidden h-[100svh] md:h-screen">
        {/* 로컬 배경 비디오 */}
        <div className="absolute inset-0 z-0">
          {!videoError ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
                src={`${import.meta.env.BASE_URL}video/Main2.mp4`}
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
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 text-right">
            <div className="inline-block">
            <p className="text-sm sm:text-base md:text-[16pt] text-white font-korean drop-shadow-lg">
              25.10.25 올림픽대교 전경
            </p>
            <p className="text-xs sm:text-sm md:text-[10pt] text-white/80 font-korean drop-shadow-md mt-1.5 md:mt-2">
              © 대한민국상이군경회시설사업소. All rights reserved.
            </p>
            </div>
          </div>
        )}
      </section>

      {/* 경영이념 콘텐츠 섹션 (리디자인) */}
      <div className="relative min-h-screen py-20 bg-gradient-to-b from-slate-50 via-white to-white" id="management-philosophy">

        <div className="relative mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 상단 섹션 */}
          <div className="mb-14">
            <div 
              ref={philosophyTitleRef}
              className={`space-y-4 transition-all duration-1000 ${visiblePhilosophyTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            >
              <div className="flex justify-center">
                <span className="inline-block h-1.5 w-12 rounded-full bg-[#1e40af]" />
              </div>
              <h2
                className="text-left xl:text-center font-extrabold text-[clamp(1.25rem,4vw,3rem)] leading-[1.35] tracking-tight"
                style={{ paddingBottom: '0.3em', overflow: 'visible' }}
              >
                <span className="bg-gradient-to-r from-[#1D66B3] to-slate-900 bg-clip-text text-transparent" style={{ display: 'inline-block', lineHeight: '1.4' }}>
                  <span className="block break-keep xl:whitespace-nowrap">국가유공자의 높은 이상을 바탕으로,</span>
                  <span className="block break-keep xl:whitespace-nowrap">공명정대하고 투명한 조직운영으로 국가 발전에 기여합니다.</span>
                </span>
              </h2>
              <p className="text-left xl:text-center text-slate-600 text-[clamp(0.875rem,1.8vw,1.125rem)]">
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
                    <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold" style={{ color: '#0C2B4B' }}>국가 보훈의 이념</h3>
                    <p className="mt-2 leading-7 text-[clamp(0.875rem,1.8vw,1rem)]" style={{ color: '#0C2B4B' }}>
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
                    <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold" style={{ color: '#0C2B4B' }}>단체설립근거</h3>
                    <p className="mt-2 leading-7 text-[clamp(0.875rem,1.8vw,1rem)]" style={{ color: '#0C2B4B' }}>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#1D66B3' }}>핵심 가치</h2>
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
                    <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold" style={{ color: '#0B1C2B' }}>상부상조</h3>
                    <p className="text-[clamp(0.75rem,1.5vw,0.875rem)]" style={{ color: '#0B1C2B' }}>서로 돕고 함께 성장</p>
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
                    <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold" style={{ color: '#0B1C2B' }}>자활자립</h3>
                    <p className="text-[clamp(0.75rem,1.5vw,0.875rem)]" style={{ color: '#0B1C2B' }}>스스로 역량으로 자립</p>
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
                    <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold" style={{ color: '#0B1C2B' }}>명예선양</h3>
                    <p className="text-[clamp(0.75rem,1.5vw,0.875rem)]" style={{ color: '#0B1C2B' }}>숭고한 희생을 기림</p>
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
                    <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold" style={{ color: '#0B1C2B' }}>국가발전</h3>
                    <p className="text-[clamp(0.75rem,1.5vw,0.875rem)]" style={{ color: '#0B1C2B' }}>인프라 발전 기여</p>
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
                    <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold" style={{ color: '#0B1C2B' }}>세계평화</h3>
                    <p className="text-[clamp(0.75rem,1.5vw,0.875rem)]" style={{ color: '#0B1C2B' }}>공동번영과 협력</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 인사말 콘텐츠 섹션 */}
      <div className="min-h-screen pt-10" id="ceo-message" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #F0F4F8 100%)' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 상단 섹션 */}
          <div className="mb-12">
            <div className="mb-4">
              <div 
                ref={titleRef}
                className={`space-y-2 transition-all duration-1000 ${visibleTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
              >
                <h1 className="text-[clamp(1.35rem,5vw,2.2rem)] sm:text-4xl lg:text-5xl font-bold text-[#0B1C2B] leading-tight tracking-tight whitespace-nowrap">
                  大韓民國傷痍軍警會 시설사업소
                </h1>
                <h1 className="text-[clamp(0.85rem,3.4vw,1.35rem)] sm:text-2xl lg:text-3xl font-bold text-[#0B1C2B] leading-tight tracking-tight whitespace-nowrap" style={{ letterSpacing: '0.04em' }}>
                  Engineering Safety. Inspiring Innovation.
                </h1>
              </div>
            </div>
            
            <div 
              ref={subtitleRef}
              className={`text-center text-[#000000] font-medium transition-all duration-1000 mt-12 ${visibleSubtitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            >
              <p className="text-[clamp(0.85rem,3.1vw,1.25rem)] sm:text-lg md:text-xl leading-snug">
                <span className="block sm:inline">기술혁신의 창의를 바탕으로,</span>
                <span className="block sm:inline sm:ml-1">보다 안전하고 편의로운 국가를 완성하다.</span>
              </p>
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
                  <p className="mb-6 leading-relaxed text-base sm:text-lg md:text-xl text-[#0C2B4B] break-words lg:break-keep text-left lg:text-justify">
                  <span className="font-bold text-lg sm:text-xl md:text-[17pt]">대한민국상이군경회</span>는 국가와 사회에 헌신 봉사하고 참여했던 국가유공자들의 높은 이상과 뜻을 한데 모아 국가유공자단체법에 의거하여 설립된 단체로 국가유공자와 그 유족이 상부상조하여 자활능력을 배양하고 순국선열과 호국전몰장병의 유지를 이어 민족정기를 선양하고 국민의 애국정신을 함양시키며 자유민주주의의 수호 및 조국의 평화적 통일과 국제평화의 유지에 이바지함을 목적으로 하는 단체입니다.

                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[1] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="mb-6 leading-relaxed text-base sm:text-lg md:text-xl text-[#0C2B4B] break-words lg:break-keep text-left lg:text-justify">
                  이러한 근간의 정신을 바탕으로 저희 <b>대한민국상이군경회</b>에서는 <b>『 국가유공자등단체설립에관한법률 』</b> 제7조의 2 및 <b>『 국가유공자단체의수익사업에관한규칙 』</b> 제5조의 규정에 의하여 국가보훈부의 승인을 받은 수익사업 중 토목 및 건축 등 건설기술용역을 <b>대한민국상이군경회시설사업소</b>를 설립하여 전문적으로 수행하게 되었습니다.
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[2] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="mb-6 leading-relaxed text-base sm:text-lg md:text-xl text-[#0C2B4B] break-words lg:break-keep text-left lg:text-justify">
                  <span className="font-bold text-lg sm:text-xl md:text-[17pt]">본 시설사업소</span>는 <b>『건설산업기본법』</b> <b>『엔지니어링산업진흥법』</b> <b>『건설기술진흥법』</b> <b>『시설물의 안전 및 유지관리에 관한 특별법』</b>에 근거하여 업면허를 보유하고 있으며, 각 분야별 다년간의 다양한 경험과 전문 기술력을 가진 기술인들로 구성하여 국가시설물의 설계단계부터 시공, 건설사업관리 및 유지관리차원의 안전진단 및 안전점검 업무에 이르기까지 어느 분야를 담당하여도 신뢰할 수 있는 성과를 제시할 수 있다고 자부하는 바입니다.
                  </p>
                </div>

                <div 
                  ref={el => paragraphRefs.current[3] = el} 
                  className={`transition-all duration-1000 ${visibleParagraphs[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="mb-6 leading-relaxed text-base sm:text-lg md:text-xl text-[#0C2B4B] break-words lg:break-keep text-left lg:text-justify">
                  사람의 걸음에는 그 걸음마다 자국이 남게 마련입니다. 저희는 사람과 사랑으로 융합된 성장의 발자국을 남기려 합니다. 지금까지 국가를 위하여 헌신 봉사하였던 마음가짐을 그대로 이어 건설 분야의 기술용역사업 수행을 통하여 다시 한번 봉사하고자 하오니 많은 협조와 조언을 부탁드리며 저희 <b>대한민국상이군경회시설사업소</b>에 많은 일을 맡겨주실 것을 부탁말씀 드립니다.<br />
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[5] = el}
                  className={`transition-all duration-1000 mt-8 ${visibleParagraphs[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl md:text-2xl font-semibold text-right text-[#0B1C2B]">
                    대한민국상이군경회시설사업소장
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회사연혁 콘텐츠 섹션 */}
      <div className="min-h-screen pt-20 md:pt-36" id="company-history" style={{ background: 'linear-gradient(to bottom, #F0F4F8 0%, #F7FBFF 100%)' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 헤더 */}
          <div
            ref={historyTitleRef}
            className={`transition-all duration-1000 ${visibleHistoryTitle ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-2 md:-translate-x-12 md:translate-y-0'}`}
          >
            {/* Mobile header (이미지 스타일) */}
            <div className="md:hidden">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-slate-500">
                <span className="inline-block h-3 w-3 rounded-full border-2 border-[#1D66B3] bg-white" />
                <span>HISTORY</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0B1C2B]">연혁</h2>
              <div className="mt-5 border-b border-slate-300" />
            </div>

            {/* Desktop header (기존) */}
            <div className="hidden md:block mb-10">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                YEARLY <span style={{ color: '#1D66B3' }} className="font-black">GROWTH</span> HIGHLIGHTS
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                국가 인프라 발전에 기여해온 여정의 주요 순간들
              </p>
            </div>
          </div>


          {/* 리스트형 타임라인 */}
          <div className="relative divide-y divide-slate-300 md:divide-y-0 md:space-y-24">
            {/* 연결된 세로줄 (PC 전용) */}
            <div className="hidden md:block absolute left-[304px] top-0 bottom-0 w-px bg-slate-300"></div>
            {/* 2026.01 */}
            <div
              id="history-2026"
              ref={el => historyItemRefs.current[11] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[11] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2026.01</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">초경량비행장치사용 사업자 등록</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2021.11 */}
            <div
              id="history-2021"
              ref={el => historyItemRefs.current[10] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[10] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2021.11</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">건설기술용역업 - 건설엔지니어링업 명칭 변경</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2017.03 */}
            <div
              id="history-2017"
              ref={el => historyItemRefs.current[9] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[9] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2017.03</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">기업부설연구소 등록 (시설사업소 휴먼테크연구부)</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2015.02 */}
            <div
              id="history-2015"
              ref={el => historyItemRefs.current[8] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[8] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2015.02</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">감리전문회사 - 건설기술용역업 명칭 변경</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2014.03 */}
            <div
              id="history-2014"
              ref={el => historyItemRefs.current[7] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2014.03</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">대한민국상이군경회시설사업소 소장 나경준 부임</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2012.05 */}
            <div
              id="history-2012"
              ref={el => historyItemRefs.current[6] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2012.05</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">엔지니어링사업자 신고</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2009.10 */}
            <div
              id="history-2009-10"
              ref={el => historyItemRefs.current[5] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2009.10</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">감리전문회사 등록</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2009.07 */}
            <div
              id="history-2009-07"
              ref={el => historyItemRefs.current[4] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2009.07</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">대한민국상이군경회 - 대한민국상이군경회시설사업소 법인 명칭 변경</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2003.06 */}
            <div
              id="history-2003-06"
              ref={el => historyItemRefs.current[3] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2003.06</h3>
              </div>
              <div className="relative md:pl-10">
                <ul>
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">안전진단전문기관 등록</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">엔지니어링활동주체 신고</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2002.12 */}
            <div
              id="history-2002"
              ref={el => historyItemRefs.current[2] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3
                  className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:whitespace-nowrap md:w-[256px]"
                  style={{ color: '#0C2B4B' }}
                >
                  2002.12.03
                </h3>
              </div>
              <div className="relative md:pl-10">
                  <ul className="divide-y divide-slate-200">
                    <li className="group relative py-3 pl-6">
                      <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                      <div>
                        <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">대한민국상이군경회 시설물관리사업소 설립</p>
                        <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
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
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#1D66B3] to-[#1D66B3] bg-clip-text text-transparent py-4 border-l-4 border-[#1D66B3] pl-6">국가승인서 및 등록증</h2>
          </div>

          {/* 텍스트 카드 (4개) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {approvalAndCertificates.map((card, index) => (
              <motion.div
                key={card.title}
                ref={(el) => {
                  licenseCardRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={visibleLicenseCards[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="px-5 pt-5 pb-4 border-b border-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.75rem] tracking-[0.22em] font-semibold text-slate-500">
                      {card.badge}
                    </p>
                    <span className="h-1.5 w-10 rounded-full bg-[#0C2B4B]/90" />
                  </div>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#0B1C2B] break-keep">
                    {card.title}
                  </h3>
                </div>
                <div className="px-5 py-5">
                  <dl className="space-y-3">
                    {card.items.map((it) => (
                      <div key={it.label} className="grid grid-cols-[92px_1fr] gap-3">
                        <dt className="text-sm font-semibold text-slate-600">{it.label}</dt>
                        <dd className="text-sm text-[#0C2B4B] leading-6 break-keep">{it.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 보유기술 (특허) 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#1D66B3] to-[#1D66B3] bg-clip-text text-transparent py-4 border-l-4 border-[#1D66B3] pl-6">보유기술</h2>
          </div>

          {/* 텍스트 카드 (3개) */}
          {/* md(768px)에서는 3열이 너무 좁아 텍스트가 과도하게 줄바꿈되므로 2열로 표시, lg부터 3열 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {patentsTextOnly.map((card, idx) => {
              const index = approvalAndCertificates.length + idx;
              return (
                <motion.div
                  key={card.title}
                  ref={(el) => {
                    licenseCardRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={visibleLicenseCards[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                  className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="px-5 pt-5 pb-4 border-b border-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.75rem] tracking-[0.22em] font-semibold text-slate-500">
                        {card.badge}
                      </p>
                      <span className="h-1.5 w-10 rounded-full bg-[#1D66B3]/90" />
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#0B1C2B] break-keep">
                      {card.title}
                    </h3>
                  </div>
                  <div className="px-5 py-5">
                    <dl className="space-y-3">
                      {card.items.map((it) => (
                        <div key={it.label} className="grid grid-cols-[72px_1fr] gap-3">
                          <dt className="text-sm font-semibold text-slate-600">{it.label}</dt>
                          <dd className="min-w-0 text-sm text-[#0C2B4B] leading-6 break-keep">{it.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 조직도 (v4 코드 반영: 기존 폰트/컬러 토큰 사용) */}
      <div className="pt-20 pb-16" id="organization-chart" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-1.5 w-12 rounded-full bg-[#1e40af]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#1D66B3' }}>
              조직구성
            </h2>
          </div>

          <div className="w-full">
            <div className="rounded-2xl border border-border bg-white p-4 sm:p-8 lg:p-10 shadow-sm">
              <OrganizationChartV4 />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

