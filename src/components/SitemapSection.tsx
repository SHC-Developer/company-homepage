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

export const SitemapSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const previousOverflowRef = useRef<{ body: string; html: string } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCentralShifted, setIsCentralShifted] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const ANIMATION_TOTAL_DURATION = 8200;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true);
          }
        });
      },
      {
        threshold: 0.3, // 섹션의 30%가 보이면 애니메이션 시작
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isAnimating]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (isAnimating) {
      timeoutId = setTimeout(() => {
        setIsCentralShifted(true);
      }, 6600);
    } else {
      setIsCentralShifted(false);
      setAnimationCompleted(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating || animationCompleted) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setAnimationCompleted(true);
    }, ANIMATION_TOTAL_DURATION);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [ANIMATION_TOTAL_DURATION, animationCompleted, isAnimating]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const body = document.body;
    const html = document.documentElement;

    if (!body || !html) {
      return;
    }

    if (isAnimating && !animationCompleted) {
      if (!previousOverflowRef.current) {
        previousOverflowRef.current = {
          body: body.style.overflow,
          html: html.style.overflow,
        };
      }

      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';

      const preventScroll = (event: Event) => {
        event.preventDefault();
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);

        if (previousOverflowRef.current) {
          body.style.overflow = previousOverflowRef.current.body;
          html.style.overflow = previousOverflowRef.current.html;
          previousOverflowRef.current = null;
        }
      };
    }

    if (previousOverflowRef.current) {
      body.style.overflow = previousOverflowRef.current.body;
      html.style.overflow = previousOverflowRef.current.html;
      previousOverflowRef.current = null;
    }

    return () => {
      if (previousOverflowRef.current) {
        body.style.overflow = previousOverflowRef.current.body;
        html.style.overflow = previousOverflowRef.current.html;
        previousOverflowRef.current = null;
      }
    };
  }, [animationCompleted, isAnimating]);

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
      label: '포트폴리오',
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
    <section ref={sectionRef} className="pt-32 pb-8 overflow-hidden min-h-[160vh] flex items-center" style={{ backgroundColor: '#1A1F24' }}>
      <style>{`
        .sitemap-animation {
          position: relative;
          width: min(1280px, 100%);
          height: clamp(520px, 65vw, 480px);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .central-circle-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.6s ease;
        }

        .central-circle-wrapper.shifted {
          transform: translateY(-240px);
        }

        .central-circle {
          position: relative;
          width: clamp(330px, 42vw, 420px);
          height: clamp(330px, 42vw, 420px);
          border-radius: 50%;
          background: #212844;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-align: center;
          box-shadow: 0 24px 48px rgba(33, 40, 68, 0.6);
          opacity: 1;
        }
        
        .central-circle.animate {
          animation: centralMorph 6.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .central-circle__name {
          font-size: clamp(2rem, 4vw, 2.7rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.5;
          opacity: 0;
          transform: translateY(12px);
          padding: 0 3rem;
        }
        


        .central-circle.animate .central-circle__name {
          animation: nameReveal 6.5s ease forwards;
        }

        .outer-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(160px, 24vw, 220px);
          height: clamp(160px, 24vw, 220px);
          border-radius: 50%;
          border: 2px solid rgba(96, 165, 250, 0.3);
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3), 0 0 30px rgba(59, 130, 246, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: clamp(1rem, 2.2vw, 1.3rem);
          color: #E2E8F0;
          font-weight: 500;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .outer-circle.animate.outer-circle--top {
          animation: orbitClockwise0 5.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .outer-circle.animate.outer-circle--left {
          animation: orbitClockwise120 5.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .outer-circle.animate.outer-circle--right {
          animation: orbitClockwise240 5.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes orbitClockwise0 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(-90deg) translateX(320px) rotate(90deg) scale(1);
          }
          1.8% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-90deg) translateX(320px) rotate(90deg) scale(1);
          }
          56.4% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-90deg) translateX(320px) rotate(90deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(270deg) translateX(0px) rotate(-270deg) scale(0.05);
          }
        }

        @keyframes orbitClockwise120 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(150deg) translateX(320px) rotate(-150deg) scale(1);
          }
          1.8% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(150deg) translateX(320px) rotate(-150deg) scale(1);
          }
          56.4% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(150deg) translateX(320px) rotate(-150deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(510deg) translateX(0px) rotate(-510deg) scale(0.05);
          }
        }

        @keyframes orbitClockwise240 {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(30deg) translateX(320px) rotate(-30deg) scale(1);
          }
          1.8% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(30deg) translateX(320px) rotate(-30deg) scale(1);
          }
          56.4% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(30deg) translateX(320px) rotate(-30deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(390deg) translateX(0px) rotate(-390deg) scale(0.05);
          }
        }

        @keyframes centralMorph {
          0%, 84.6% {
            opacity: 1;
            border-radius: 50%;
            width: clamp(330px, 42vw, 420px);
            height: clamp(330px, 42vw, 420px);
            transform: scale(1);
            background: #212844;
          }
          89.2% {
            transform: scale(1.44);
          }
          98.5% {
            transform: scale(1.33);
            border-radius: 64px;
            width: clamp(640px, 84vw, 840px);
            height: clamp(120px, 18vw, 160px);
            background: #212844;
          }
          100% {
            opacity: 1;
            transform: scale(1.33);
            border-radius: 64px;
            width: clamp(640px, 84vw, 840px);
            height: clamp(120px, 18vw, 160px);
            background: #212844;
            box-shadow: 0 24px 48px rgba(33, 40, 68, 0.8), 0 0 40px rgba(33, 40, 68, 0.4);
          }
        }

        @keyframes nameReveal {
          0%, 89.2% {
            opacity: 0;
            transform: translateY(12px);
          }
          95% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sitemap-grid {
          opacity: 0;
          transform: translateY(30px);
          transition: margin-top 0.6s ease;
        }

        .sitemap-grid.animate {
          animation: gridFadeIn 1.2s ease forwards;
          animation-delay: 6.7s;
        }

        .sitemap-grid.sitemap-grid--near {
          margin-top: -220px;
        }

        @keyframes gridFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center gap-12">
        <div id="sitemap-animation-container" className="sitemap-animation">
          <div className={`outer-circle outer-circle--top font-korean ${isAnimating ? 'animate' : ''}`}>
            토목
          </div>
          <div className={`outer-circle outer-circle--left font-korean ${isAnimating ? 'animate' : ''}`}>
            진단
          </div>
          <div className={`outer-circle outer-circle--right font-korean ${isAnimating ? 'animate' : ''}`}>
            설계
          </div>
          <div className={`central-circle-wrapper ${isCentralShifted ? 'shifted' : ''}`}>
            <div id="sitemap-central-circle" className={`central-circle ${isAnimating ? 'animate' : ''}`}>
              <span className="central-circle__name font-logo">
                대한민국상이군경회시설사업소
              </span>
            </div>
          </div>
        </div>

        {/* 카테고리 그리드 */}
        <div className={`sitemap-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 sm:gap-4 ${isAnimating ? 'animate' : ''} ${isCentralShifted ? 'sitemap-grid--near' : ''}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={category.onClick}
              className="flex flex-col items-center gap-6 p-8 rounded-lg transition-all duration-200 hover:bg-slate-800/50 hover:shadow-lg group"
            >
              {/* 아이콘 */}
              <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                {React.cloneElement(category.icon as React.ReactElement, { className: "w-16 h-16" })}
              </div>
              
              {/* 라벨 */}
              <span className="text-base sm:text-lg font-medium text-center font-korean text-gray-300 group-hover:text-white transition-colors">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
