import React, { useState, useEffect, useRef } from 'react';

export const GreetingSection = () => {
  const [videoError, setVideoError] = useState(false);
  const [showBottomText, setShowBottomText] = useState(true);
  const [visibleParagraphs, setVisibleParagraphs] = useState<boolean[]>([false, false, false, false]);
  const [visibleTitle, setVisibleTitle] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);
  const [visibleCEOMessage, setVisibleCEOMessage] = useState(false);
  const [visibleSubtitle, setVisibleSubtitle] = useState(false);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ceoMessageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

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
          rootMargin: '0px 0px -250px 0px' // 아래에서 33px 위에서 시작 (기존 100px에서 1/3 축소)
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

      {/* 인사말 콘텐츠 섹션 */}
      <div className="min-h-screen bg-white pt-10" id="ceo-message">
        <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                  大韓民國 傷痍軍警會
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* 이미지 영역 */}
            <div 
              ref={imageRef}
              className={`relative transition-all duration-1000 ${visibleImage ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-green-400 to-blue-500 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/profile.jpg" 
                  alt="시설사업소 소장님 사진" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 텍스트 영역 */}
            <div className="space-y-4">
              <div className="max-w-none">
                <div 
                  ref={el => paragraphRefs.current[0] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#27292B', marginBottom: '2.0rem' }}>
                  본 시설사업소는 『국가유공자단체설립에관한법률』『건설산업기본법』『건설기술진흥법』『시설물의 안전 및 유지관리에 관한 특별법』에 근거하여 업면허를 보유하고 있으며, 각 분야별 다년간의 다양한 경험과 전문 기술력을 가진 기술자들로 구성되어 국가시설물의 설계단계부터 시공, 감리 및 유지관리차원의 안전진단 업무에 이르기까지 어느 분야를 담당하여도 신뢰할 수 있는 성과를 제시할 수 있다고 자부하는 바입니다. 
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[1] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#27292B', marginBottom: '2.0rem' }}>
                  사람의 걸음에는 그 걸음마다 자국이 남게 마련입니다. 저희는 사람과 사랑으로 융합된 성장의 발자국을 남기려 합니다. 토목 및 건축시설물의 설계용역 및 정밀안전진단용역, 그리고 각종 감리용역분야에 그 동안의 지식과 경험을 토대로 성실하고 최선을 다해 한걸음씩 성장하여 전문인의 자세로 자리매김 할 것입니다.
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[2] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#27292B', marginBottom: '2.0rem' }}>
                  지금까지 국가를 위하여 헌신 봉사하였던 마음가짐을 그대로 이어 건설 분야의 기술용역사업 수행을 통하여 다시 한번 봉사하고자 하오니 많은 협조와 조언을 부탁드리며 저희 대한민국상이군경회 시설사업소에 많은 일을 맡겨주실 것을 삼가 부탁말씀 드립니다.<br />감사합니다.
                  </p>
                </div>
                
                <div 
                  ref={el => paragraphRefs.current[3] = el}
                  className={`transition-all duration-1000 ${visibleParagraphs[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="leading-relaxed text-base sm:text-lg font-semibold" style={{ color: '#27292B' }}>
                    대한민국 상이군경회 시설사업소장
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
