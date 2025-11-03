import React, { useState, useEffect, useRef } from 'react';
import { HandHeart, Target, Award, TrendingUp, Globe } from 'lucide-react';

export const GreetingSection = () => {
  const [videoError, setVideoError] = useState(false);
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
  const [visibleHistoryItems, setVisibleHistoryItems] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false, false]);
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
  const [focusedHistoryIndex, setFocusedHistoryIndex] = useState<number | null>(null);

  // 인증서 목록 (특허증 제외)
  const certifications = [
    { name: '건설기술용역업등록증', path: 'certification/건설기술용역업등록증.jpg' },
    { name: '사업자등록증', path: 'certification/사업자등록증.jpg' },
    { name: '수익사업승인서', path: 'certification/수익사업승인서.jpg' },
    { name: '안전진단전문기관등록증', path: 'certification/안전진단전문기관등록증.jpg' },
    { name: '엔지니어링사업자신고증_1', path: 'certification/엔지니어링사업자신고증_1.jpg' },
    { name: '엔지니어링사업자신고증_2', path: 'certification/엔지니어링사업자신고증_2.jpg' },
    { name: '중소기업확인서', path: 'certification/중소기업확인서.jpg' },
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
    { name: '특허증_제10-2654625호_교량의 3차원 거동 측정 장치 및 이를 포함하는 시스템', path: 'certification/특허증_제10-2654625호_교량의 3차원 거동 측정 장치 및 이를 포함하는 시스템.jpg' },
    { name: '특허증_제10-2654629호_교량의 3차원 거동 측정 방법', path: 'certification/특허증_제10-2654629호_교량의 3차원 거동 측정 방법.jpg' },
    { name: '특허증_제10-2654632호_교량의 3차원 거동 측정 시스템', path: 'certification/특허증_제10-2654632호_교량의 3차원 거동 측정 시스템_.jpg' },
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

    // 스크롤 이벤트로 포커스 아이템 추적
    const handleScroll = () => {
      const screenCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;

      historyItemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - screenCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      // 150px 이내의 아이템만 포커스
      if (closestDistance < 150) {
        setFocusedHistoryIndex(closestIndex);
      } else {
        setFocusedHistoryIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
      window.removeEventListener('scroll', handleScroll);
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
                className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2"
                src="https://www.youtube-nocookie.com/embed/mc51O-lceUc?autoplay=1&mute=1&loop=1&playlist=mc51O-lceUc&controls=0&rel=0&modestbranding=1&playsinline=1&start=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1"
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
              <div className="absolute inset-0 bg-black/30 z-10"></div>
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
              © 대한민국 상이군경회 시설사업소. All rights reserved.
            </p>
          </div>
        )}
      </section>

      {/* 경영이념 콘텐츠 섹션 */}
      <div className="min-h-screen pt-10" id="management-philosophy" style={{ backgroundColor: '#F8F8FF' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 상단 섹션 */}
          <div className="mb-16">
            <div className="mb-6">
              <div 
                ref={philosophyTitleRef}
                className={`space-y-10 transition-all duration-1000 ${visiblePhilosophyTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <p className="text-2xl sm:text-3xl text-gray-600 mt-4 font-bold" style={{ paddingLeft: '17%' }}>
                  국가와 사회에 헌신한 국가유공자의 높은 이상과 뜻을 모아
                </p>
                <p className="text-2xl sm:text-3xl text-gray-600 font-bold" style={{ paddingLeft: '37%' }}>
                  공명정대하고 투명한 조직운영으로 국가 발전에 기여합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 주요 정보 카드 섹션 */}
          <div 
            ref={philosophyContentRef}
            className={`mb-20 transition-all duration-1000 ${visiblePhilosophyContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 국가 보훈의 이념 카드 */}
              <div 
                ref={el => philosophyCardRefs.current[1] = el}
                className={`bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-500 transition-all duration-1000 hover:shadow-lg hover:scale-105 ${visiblePhilosophyCards[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  국가 보훈의 이념
                </h3>
                <p className="leading-relaxed text-gray-700 text-base">
                  대한민국의 오늘은 국가의 존립과 발전을 위해 공헌하거나 이를 위해 자신을 희생한 국가유공자의 공헌과 희생 위에 이룩되었으므로 이러한 국가유공자의 공헌과 희생의 정도에 대응하여 국가 유공자와 그 유족의 영예로운 생활이 유지-보장될 수 있도록 실질적인 보상을 행하고 국가유공자의 공헌과 희생이 우리와 우리의 후손들에게 숭고한 애국정신의 귀감으로서 항구적으로 존중되도록 함으로써 이를 통해 국민들의 애국심을 고취하고 공동체의식을 함양하는데 있음.
                </p>
              </div>

              {/* 단체설립근거 카드 */}
              <div 
                ref={el => philosophyCardRefs.current[2] = el}
                className={`bg-white rounded-xl shadow-md p-8 border-l-4 border-indigo-500 transition-all duration-1000 hover:shadow-lg hover:scale-105 ${visiblePhilosophyCards[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                  단체설립근거
                </h3>
                <p className="leading-relaxed text-gray-700 text-base">
                  대한민국상이군경회의 단체설립 근거는 『국가유공자 등 단체설립에 관한법률』에 있으며 법 제1조(목적) : 『이 법은 대한민국상이군경회·대한민국전몰군경유족회·대한민국전몰군경미망인회·광복회·4.19민주혁명회·4.19혁명희생자유족회·4.19혁명공로자회·재일학도의용군동지회 및 대한민국무공수훈자회를 설립함으로써 국가유공자와 그 유족이 상부상조하여 자활능력을 배양하고 순국선열과 호국전몰장병의 유지를 이어 민족정기를 선양하고 국민의 애국정신을 함양시키며 자유민주주의의 수호 및 조국의 평화적 통일과 국제평화의 유지에 이바지함을 목적으로 한다』고 되어 있음
                </p>
              </div>
            </div>
          </div>

          {/* 핵심 가치 섹션 - 개선 버전 */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">핵심 가치</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#1e40af] to-blue-500 mx-auto mb-12 rounded-full"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* 상부상조 카드 */}
              <div 
                ref={el => coreValueRefs.current[0] = el}
                className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleCoreValues[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md group-hover:scale-110 transition-transform duration-500">
                    <HandHeart className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">상부상조</h3>
                  <p className="text-gray-500 mb-3 text-sm font-medium">相扶相助</p>
                  <p className="text-gray-600 text-sm leading-relaxed">형제애로 서로를 돕고 함께 성장한다</p>
                  <div className="mt-4 w-10 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* 자활자립 카드 */}
              <div 
                ref={el => coreValueRefs.current[1] = el}
                className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleCoreValues[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">자활자립</h3>
                  <p className="text-gray-500 mb-3 text-sm font-medium">自活自立</p>
                  <p className="text-gray-600 text-sm leading-relaxed">스스로의 역량으로 재활과 자립을 이룬다</p>
                  <div className="mt-4 w-10 h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* 명예선양 카드 */}
              <div 
                ref={el => coreValueRefs.current[2] = el}
                className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleCoreValues[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-md group-hover:scale-110 transition-transform duration-500">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">명예선양</h3>
                  <p className="text-gray-500 mb-3 text-sm font-medium">名譽宣揚</p>
                  <p className="text-gray-600 text-sm leading-relaxed">국가유공자의 숭고한 희생을 기리고 본받는다</p>
                  <div className="mt-4 w-10 h-1 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* 국가발전 카드 */}
              <div 
                ref={el => coreValueRefs.current[3] = el}
                className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleCoreValues[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">국가발전</h3>
                  <p className="text-gray-500 mb-3 text-sm font-medium">國家發展</p>
                  <p className="text-gray-600 text-sm leading-relaxed">국가 발전과 국민 통합에 기여한다</p>
                  <div className="mt-4 w-10 h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* 세계평화 카드 */}
              <div 
                ref={el => coreValueRefs.current[4] = el}
                className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleCoreValues[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md group-hover:scale-110 transition-transform duration-500">
                    <Globe className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">세계평화</h3>
                  <p className="text-gray-500 mb-3 text-sm font-medium">世界平和</p>
                  <p className="text-gray-600 text-sm leading-relaxed">인류 공동번영과 평화를 위해 협력한다</p>
                  <div className="mt-4 w-10 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 인사말 콘텐츠 섹션 */}
      <div className="min-h-screen pt-10" id="ceo-message" style={{ backgroundColor: '#FFFEFC' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 상단 섹션 */}
          <div className="mb-12">
            <div 
              ref={ceoMessageRef}
              className={`text-sm font-medium text-[#1e40af] mb-3 tracking-wider transition-all duration-1000 ${visibleCEOMessage ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            >
              CEO'S MESSAGE
            </div>
            
            <div className="mb-4">
              <div 
                ref={titleRef}
                className={`space-y-2 transition-all duration-1000 ${visibleTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000000] leading-tight tracking-tight">
                  大韓民國傷痍軍警會
                </h1>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000] leading-tight tracking-tight">
                  Engineering Safety. Inspiring Innovation.
                </h1>
              </div>
            </div>
            
            <div 
              ref={subtitleRef}
              className={`space-y-2 text- sm:text-base text-[#000000] font-medium transition-all duration-1000 ${visibleSubtitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
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
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#27292B', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '17pt' }}>대한민국상이군경회</span>는 국가와 사회에 헌신 봉사하고 참여했던 국가유공자들의 높은 이상과 뜻을 한데 모아 국가유공자단체법에 의거하여 설립된 단체로 공명정대하고 투명한 조직운영과 회원 상호간의 상부상조 및 유대관계를 기본으로 하고 있으며, 국가유공자와 그 유족이 상부상조하여 자활능력을 배양하고 순국선열과 호국전몰장병의 유지를 이어 민족정기를 선양하고 국민의 애국정신을 함양시키며 자유민주주의의 수호 및 조국의 평화적 통일과 국제평화의 유지에 이바지함을 목적으로 하는 단체입니다.

                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[1] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#27292B', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
                  이러한 근간의 정신을 바탕으로 저희 <b>대한민국상이군경회</b>에서는 <b>『 국가유공자등단체설립에관한법률 』</b> 제7조의 2 및 <b>『 국가유공자단체의수익사업에관한규칙 』</b> 제5조의 규정에 의하여 국가보훈처장의 승인을 받아 시행하던 수익사업 중 시설물유지관리 및 토목 건축설계 등에 대하여 집중적으로 기술용역사업을 확대 시행하게 되었습니다.
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[2] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#27292B', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '17pt' }}>본 시설사업소</span>는 <b>『엔지니어링산업진흥법』</b> <b>『건설산업기본법』</b> <b>『건설기술진흥법』</b> <b>『시설물의 안전 및 유지관리에 관한 특별법』</b>에 근거하여 업면허를 보유하고 있으며, 각 분야별 다년간의 다양한 경험과 전문 기술력을 가진 기술자들로 구성되어 국가시설물의 설계단계부터 시공, 감리 및 유지관리차원의 안전진단 업무에 이르기까지 어느 분야를 담당하여도 신뢰할 수 있는 성과를 제시할 수 있다고 자부하는 바입니다. 
                  </p>
                </div>

                <div 
                  ref={el => paragraphRefs.current[3] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#27292B', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
                  사람의 걸음에는 그 걸음마다 자국이 남게 마련입니다. 저희는 사람과 사랑으로 융합된 성장의 발자국을 남기려 합니다. <b>토목 및 건축시설물</b>의 <b><span style={{ color: '#3B2FFF' }}>설계용역</span></b> 및 <b><span style={{ color: '#3B2FFF' }}>정밀안전진단용역</span></b>, 그리고 각종 <b><span style={{ color: '#3B2FFF' }}>감리용역</span></b>분야에 그 동안의 지식과 경험을 토대로 성실하고 최선을 다해 한 걸음씩 성장하여 전문인의 자세로 자리매김 할 것입니다.
                  </p>
                </div>

                <div 
                  ref={el => paragraphRefs.current[4] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-lg sm:text-xl" style={{ color: '#27292B', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
                  지금까지 국가를 위하여 헌신 봉사하였던 마음가짐을 그대로 이어 건설 분야의 기술용역사업 수행을 통하여 다시 한번 봉사하고자 하오니 많은 협조와 조언을 부탁드리며 저희 <b>대한민국상이군경회시설사업소</b>에 많은 일을 맡겨주실 것을 삼가 부탁말씀 드립니다.<br />감사합니다.
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[5] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-xl sm:text-2xl font-semibold text-right" style={{ color: '#27292B' }}>
                    대한민국상이군경회시설사업소장
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회사연혁 콘텐츠 섹션 */}
      <div className="min-h-screen pt-48" id="company-history" style={{ backgroundColor: '#F0F4F8' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 상단 제목 섹션 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 좌측 제목 */}
              <div 
                ref={historyTitleRef}
                className={`transition-all duration-1000 ${visibleHistoryTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
              >
                <h1 className="text-7xl sm:text-7xl font-bold text-gray-900 leading-tight mb-6">
                  YEARLY
                  <br />
                  <span style={{ color: '#3B2FFF' }} className="font-black">GROWTH</span>
                  <br />
                  HIGHLIGHTS
                </h1>
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <p>대한민국상이군경회 시설사업소의</p>
                  <p>역사와 발전 과정을 소개합니다.</p>
                  <p>기술혁신과 국가 발전을 위한</p>
                  <p>저희의 지속적인 노력을 확인하세요.</p>
                </div>
              </div>

              {/* 우측 타임라인 */}
              <div className="lg:col-span-2">
                <div className="relative">
                  {/* 타임라인 세로줄 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-[#3B2FFF] to-blue-400"></div>

                  {/* 타임라인 아이템들 */}
                  <div className="space-y-36">
                    {/* 1951년 - 좌측 */}
                    <div 
                      ref={el => historyItemRefs.current[0] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16 text-right">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-right ${focusedHistoryIndex === 0 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>1951년</h3>
                          <p className={`transition-all duration-500 origin-right ${focusedHistoryIndex === 0 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>부산에서 사단법인 대한상이군경회 설립</p>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[0] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[0] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16"></div>
                      </div>
                    </div>

                    {/* 1953년 - 우측 */}
                    <div 
                      ref={el => historyItemRefs.current[1] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[1] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16"></div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[1] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[1] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-left ${focusedHistoryIndex === 1 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>1953년</h3>
                          <p className={`transition-all duration-500 origin-left ${focusedHistoryIndex === 1 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>서울환도 후 이승만대통령 총재 / 사단법인 대한상이용사회</p>
                        </div>
                      </div>
                    </div>

                    {/* 1988년 - 좌측 */}
                    <div 
                      ref={el => historyItemRefs.current[2] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16 text-right">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-right ${focusedHistoryIndex === 2 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>1988년</h3>
                          <p className={`transition-all duration-500 origin-right ${focusedHistoryIndex === 2 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>국가유공자등단체설립에관한법률 대한민국상이군경회 개칭</p>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[2] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[2] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16"></div>
                      </div>
                    </div>

                    {/* 2002년 - 우측 */}
                    <div 
                      ref={el => historyItemRefs.current[3] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[3] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16"></div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[3] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[3] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-left ${focusedHistoryIndex === 3 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2002년</h3>
                          <p className={`transition-all duration-500 origin-left ${focusedHistoryIndex === 3 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>대한민국상이군경회 시설관리사업`소 설립 / 소장 김양명</p>
                        </div>
                      </div>
                    </div>

                    {/* 2003년 - 좌측 */}
                    <div 
                      ref={el => historyItemRefs.current[4] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[4] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16 text-right">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-right ${focusedHistoryIndex === 4 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2003년</h3>
                          <p className={`transition-all duration-500 origin-right ${focusedHistoryIndex === 4 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>총괄본부장 나경준 / 기술인력 수급 및 면허신청</p>
                          <p className={`mt-2 transition-all duration-500 origin-right ${focusedHistoryIndex === 4 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>안전진단전문기관 등록 / 엔지니어링활동주체 등록</p>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[4] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[4] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16"></div>
                      </div>
                    </div>

                    {/* 2004년 - 우측 */}
                    <div 
                      ref={el => historyItemRefs.current[5] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[5] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16"></div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[5] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[5] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-left ${focusedHistoryIndex === 5 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2004년</h3>
                          <p className={`transition-all duration-500 origin-left ${focusedHistoryIndex === 5 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>건축분야 진단면허 추가등록</p>
                        </div>
                      </div>
                    </div>

                    {/* 2005년 - 좌측 */}
                    <div 
                      ref={el => historyItemRefs.current[6] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[6] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16 text-right">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-right ${focusedHistoryIndex === 6 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2005년</h3>
                          <p className={`transition-all duration-500 origin-right ${focusedHistoryIndex === 6 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>엔지니어링활동주체등록사항 5개 분야 등록완료</p>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[6] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[6] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16"></div>
                      </div>
                    </div>

                    {/* 2007년 - 우측 */}
                    <div 
                      ref={el => historyItemRefs.current[7] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[7] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16"></div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[7] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[7] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-left ${focusedHistoryIndex === 7 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2007년</h3>
                          <p className={`transition-all duration-500 origin-left ${focusedHistoryIndex === 7 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>대한민국상이군경회 시설사업소 명칭 변경</p>
                        </div>
                      </div>
                    </div>

                    {/* 2009년 - 좌측 */}
                    <div 
                      ref={el => historyItemRefs.current[8] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[8] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16 text-right">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-right ${focusedHistoryIndex === 8 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2009년</h3>
                          <p className={`transition-all duration-500 origin-right ${focusedHistoryIndex === 8 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>감리전문회사(종합) 등록</p>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[8] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[8] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16"></div>
                      </div>
                    </div>

                    {/* 2015년 - 우측 */}
                    <div 
                      ref={el => historyItemRefs.current[9] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[9] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16"></div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[9] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[9] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-left ${focusedHistoryIndex === 9 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2015년</h3>
                          <p className={`transition-all duration-500 origin-left ${focusedHistoryIndex === 9 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>건설기술용역업(설계·사업관리)일반 등록</p>
                        </div>
                      </div>
                    </div>

                    {/* 2021년 - 좌측 */}
                    <div 
                      ref={el => historyItemRefs.current[10] = el}
                      className={`relative transition-all duration-1000 ${visibleHistoryItems[10] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    >
                      <div className="flex items-center">
                        <div className="w-1/2 pr-16 text-right">
                          <h3 className={`font-bold mb-2 transition-all duration-500 origin-right ${focusedHistoryIndex === 10 ? 'text-3xl scale-150 text-[#3B2FFF]' : 'text-2xl scale-100 text-[#504EFF]'}`}>2021년</h3>
                          <p className={`transition-all duration-500 origin-right ${focusedHistoryIndex === 10 ? 'scale-150 text-[#3B2FFF]' : 'scale-100 text-gray-700'}`}>유을상 회장님 취임</p>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${visibleHistoryItems[10] ? 'bg-[#3B2FFF] border-[#3B2FFF] shadow-lg shadow-[#3B2FFF]/50' : 'bg-white'}`}>
                          <span className={`text-sm font-bold transition-colors duration-500 ${visibleHistoryItems[10] ? 'text-white' : 'text-gray-400'}`}>●</span>
                        </div>
                        <div className="w-1/2 pl-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 보유면허 및 기술 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" id="license" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent py-4 border-l-4 border-blue-600 pl-6">국가승인서 및 등록증</h2>
          </div>

          {/* 인증서 갤러리 - 4+3 그리드 */}
          <div className="space-y-8">
            {/* 첫 번째 줄 - 4개 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.slice(0, 4).map((cert, index) => (
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <p className="text-sm font-semibold">이미지 확대</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-base text-gray-700 font-korean break-words w-full px-2">{cert.name}</p>
                </div>
              ))}
            </div>

            {/* 두 번째 줄 - 3개 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.slice(4, 7).map((cert, index) => (
                <div key={index + 4} className="flex flex-col items-center cursor-pointer group">
                  <div 
                    className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}${cert.path}`)}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${cert.path}`}
                      alt={cert.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <p className="text-sm font-semibold">이미지 확대</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-base text-gray-700 font-korean break-words w-full px-2">{cert.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 보유기술 (특허) 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent py-4 border-l-4 border-blue-600 pl-6">보유기술</h2>
          </div>

          {/* 특허증 갤러리 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patentImages.map((patent, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer group">
                <div 
                  className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedImage(`${import.meta.env.BASE_URL}${patent.path}`)}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${patent.path}`}
                    alt={patent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="text-sm font-semibold">이미지 확대</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-base text-gray-700 font-korean break-words w-full px-2">{patent.name}</p>
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
                src={selectedImage}
                alt="확대된 이미지"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

      {/* 오시는길 콘텐츠 섹션 */}
      <div className="min-h-screen pt-20 pb-16" id="directions" style={{ backgroundColor: '#FFFEF5' }}>
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
