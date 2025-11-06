import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
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
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const firstMessage = '당신의 오늘은 안전하셨습니까?';
  const secondMessages = [
    '국민들의 안전하고 쾌적한',
    '아름다운 생활을 영위하는 나라건설',
    '사람과 사랑으로 융합된 성장의 발자국을 남기는 시설사업소가 되겠습니다'
  ];

  const scrollToNext = () => {
    const nextSection = document.getElementById('services');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

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

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* YouTube 배경 비디오 */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube-nocookie.com/embed/ZFqlZC77oQw?autoplay=1&mute=1&loop=1&playlist=ZFqlZC77oQw&controls=0&rel=0&modestbranding=1&playsinline=1&start=0&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&si=Ts-rGv1xDCn2hB4G"
              title="대한민국 상이군경회 시설사업소 배경 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setVideoError(true)}
              style={{
                pointerEvents: 'none',
              }}
            />
            {/* 비디오 위에 오버레이 - 텍스트 가독성을 위한 어두운 필터 */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
          </div>
        ) : (
          /* 대체 배경 - YouTube 로드 실패 시 */
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
        )}
      </div>

      {/* 텍스트 - 완전 정 중앙 배치 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full">
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

      {/* 우측 하단 텍스트 */}
      {showBottomText && (
        <div className="absolute bottom-8 right-8 z-20 text-right transition-opacity duration-1000 animate-fade-in">
          <p className="text-[16pt] text-white font-korean drop-shadow-lg">
            25.10.25 올림픽대교 전경
          </p>
          <p className="text-[10pt] text-white/80 font-korean drop-shadow-md mt-2">
            © 대한민국상이군경회시설사업소. All rights reserved.
          </p>
        </div>
      )}

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