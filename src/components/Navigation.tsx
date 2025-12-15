import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo2 from '@/assets/logo2.png';
import logo3 from '@/assets/logo3.png';

interface MenuStructure {
  [key: string]: string[];
}

const menuStructure = {
  '회사소개': ['인사말', '회사연혁', '보유면허 및 기술', '조직구성', '오시는길'],
  '관계법령': [],
  '분야별 수행실적': ['안전진단', '설계', '건설사업관리'],
  '자료실': ['채용공고']
};

interface NavigationProps {
  variant?: 'default' | 'legal';
  forceLightTheme?: boolean;
  autoHideOnMount?: boolean;
}

export const Navigation = ({ variant = 'default', forceLightTheme = false, autoHideOnMount = false }: NavigationProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedMenus, setMobileExpandedMenus] = useState<string[]>([]);
  const [isOverLightBackground, setIsOverLightBackground] = useState(forceLightTheme);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const toggleMobileMenu = (menu: string) => {
    setMobileExpandedMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    );
  };

  const handlePhilosophyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/greeting') {
      // 이미 greeting 페이지에 있으면 스크롤만
      const element = document.getElementById('management-philosophy');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // URL에 해시 추가
        window.history.pushState(null, '', '#management-philosophy');
      }
    } else {
      // 다른 페이지에서 클릭하면 greeting 페이지로 이동 후 스크롤
      navigate('/greeting#management-philosophy');
      setTimeout(() => {
        const element = document.getElementById('management-philosophy');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleHistoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/greeting') {
      // 이미 greeting 페이지에 있으면 스크롤만
      const element = document.getElementById('company-history');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // URL에 해시 추가
        window.history.pushState(null, '', '#company-history');
      }
    } else {
      // 다른 페이지에서 클릭하면 greeting 페이지로 이동 후 스크롤
      navigate('/greeting#company-history');
      setTimeout(() => {
        const element = document.getElementById('company-history');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/greeting') {
      // 이미 greeting 페이지에 있으면 스크롤만
      const element = document.getElementById('directions');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // URL에 해시 추가
        window.history.pushState(null, '', '#directions');
      }
    } else {
      // 다른 페이지에서 클릭하면 greeting 페이지로 이동 후 스크롤
      navigate('/greeting#directions');
      setTimeout(() => {
        const element = document.getElementById('directions');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleLicenseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/greeting') {
      // 이미 greeting 페이지에 있으면 스크롤만
      const element = document.getElementById('license');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // URL에 해시 추가
        window.history.pushState(null, '', '#license');
      }
    } else {
      // 다른 페이지에서 클릭하면 greeting 페이지로 이동 후 스크롤
      navigate('/greeting#license');
      setTimeout(() => {
        const element = document.getElementById('license');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleOrganizationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/greeting') {
      const element = document.getElementById('organization');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#organization');
      }
    } else {
      navigate('/greeting#organization');
      setTimeout(() => {
        const element = document.getElementById('organization');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleCompanyIntroClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/greeting') {
      // 이미 greeting 페이지에 있으면 스크롤만
      const element = document.getElementById('management-philosophy');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // URL에 해시 추가
        window.history.pushState(null, '', '#management-philosophy');
      }
    } else {
      // 다른 페이지에서 클릭하면 greeting 페이지로 이동 후 스크롤
      navigate('/greeting#management-philosophy');
      setTimeout(() => {
        const element = document.getElementById('management-philosophy');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/portfolio');
    window.scrollTo(0, 0);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handlePortfolioBridgeTunnelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/portfolio') {
      const element = document.getElementById('portfolio-safety-bridge-tunnel');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#portfolio-safety-bridge-tunnel');
      }
    } else {
      navigate('/portfolio#portfolio-safety-bridge-tunnel');
      setTimeout(() => {
        const element = document.getElementById('portfolio-safety-bridge-tunnel');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handlePortfolioDesignClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/portfolio') {
      const element = document.getElementById('portfolio-design');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#portfolio-design');
      }
    } else {
      navigate('/portfolio#portfolio-design');
      setTimeout(() => {
        const element = document.getElementById('portfolio-design');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handlePortfolioSupervisionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/portfolio') {
      const element = document.getElementById('portfolio-supervision');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#portfolio-supervision');
      }
    } else {
      navigate('/portfolio#portfolio-supervision');
      setTimeout(() => {
        const element = document.getElementById('portfolio-supervision');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleRecruitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/recruit');
    window.scrollTo(0, 0);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleLegalBasisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/legal-basis');
    window.scrollTo(0, 0);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  // 클릭 외부 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC 키 감지
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 스크롤 감지로 배경 감지
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // forceLightTheme이 true면 항상 밝은 배경으로 설정
      if (forceLightTheme) {
        setIsOverLightBackground(true);
      } else {
        // 히어로 섹션 높이를 기준으로 밝은 배경 위에 있는지 확인
        // 히어로 섹션은 보통 100vh이므로, 그 이후부터는 밝은 배경으로 간주
        const heroSectionHeight = window.innerHeight;
        setIsOverLightBackground(currentScrollY > heroSectionHeight * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceLightTheme]);

  // forceLightTheme prop이 변경될 때 상태 업데이트
  useEffect(() => {
    if (forceLightTheme) {
      setIsOverLightBackground(true);
    }
  }, [forceLightTheme]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      location.pathname === '/greeting'
        ? (isOverLightBackground ? 'bg-white' : 'bg-transparent')
        : isOverLightBackground ? 'bg-white' : 'bg-transparent'
    }`} ref={menuRef}>
      {/* 
        반응형 가이드라인:
        1. 모바일 우선 접근법: 기본 스타일은 모바일용, 큰 화면용은 sm:, md:, lg: 등으로 확장
        2. Tailwind 브레이크포인트: sm(640px), md(768px), lg(1024px), xl(1280px)
        3. 모바일에서 네비게이션 바 높이 최소화: h-14 (56px)로 설정하여 한눈에 들어오도록
        4. 로고와 텍스트 크기 조정: 모바일에서 작게, 데스크톱에서 크게
        5. 패딩 최적화: 모바일에서 px-2 (8px), 큰 화면에서 px-4, px-6 등으로 증가
      */}
      <div className="w-[95%] sm:w-[90%] md:w-[85%] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-0">
        {/* 
          네비게이션 바 높이 조정:
          - 모바일: h-14 (56px) - 한눈에 들어오는 최적 높이
          - 태블릿: sm:h-20 (80px)
          - 데스크톱: md:h-28 (112px), lg:h-[120px]
          - items-center로 모든 요소를 수직 중앙 정렬
        */}
        <div className={`flex justify-between items-center h-14 sm:h-20 md:h-28 lg:h-[120px] ${variant === 'legal' ? 'nav-legal' : 'nav-bottom-line'} ${
          isOverLightBackground ? 'nav-light-theme' : ''
        }`}>
          {/* 로고와 회사명 */}
          {/* 
            모바일 최적화:
            - 컨테이너 높이를 네비게이션 바 높이와 동일하게 설정하여 텍스트 상자 크기 조절
            - 로고 크기: h-10 w-10 (40px) - 모바일에서 적절한 크기
            - 간격: gap-2 (8px) - 모바일에서 공간 절약
            - 회사명 텍스트: text-[10px] (10px) - 모바일에서 작게, 전체 회사명 표시
            - flex items-center로 로고와 텍스트를 컨테이너 내부에서 수직 중앙 정렬
            - 텍스트의 line-height를 1로 설정하여 정확한 중앙 정렬
            - 데스크톱에서는 기존 크기 유지
          */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 h-full">
            <img 
              src={
                isOverLightBackground
                  ? logo3
                  : (location.pathname === '/' || location.pathname === '/greeting' ? logo2 : logo3)
              } 
              alt="회사 로고" 
              className="h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20 flex-shrink-0 object-contain"
            />
            <Link 
              to="/" 
              onClick={() => window.scrollTo(0, 0)} 
              className={`h-full flex items-center text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold font-logo transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis leading-none ${
                location.pathname === '/greeting'
                  ? (isOverLightBackground
                      ? 'text-[#0B1C2B] hover:text-[#0B1C2B]/80'
                      : 'text-white hover:text-white/80 drop-shadow-lg')
                  : isOverLightBackground 
                    ? 'text-[#0B1C2B] hover:text-[#0B1C2B]/80' 
                    : 'text-white hover:text-white/80 drop-shadow-lg'
              }`}
            >
              {/* 모바일에서도 전체 회사명 표시, 글자 크기만 줄임 */}
              대한민국상이군경회시설사업소
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden lg:flex items-center space-x-8">
            {Object.keys(menuStructure).map((menu) => (
              <div
                key={menu}
                className="relative"
                onMouseEnter={() => handleMenuEnter(menu)}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`px-4 py-2 text-xl font-normal rounded-lg transition-all duration-200 font-korean ${
                    location.pathname === '/greeting'
                      ? (isOverLightBackground
                          ? `drop-shadow-none ${activeMenu === menu 
                              ? 'bg-gray-200 text-[#0B1C2B]' 
                              : 'text-[#0B1C2B] hover:text-[#0B1C2B]/80 hover:bg-gray-100'
                            }`
                          : `drop-shadow-md ${activeMenu === menu 
                              ? 'bg-white/20 text-white' 
                              : 'text-white hover:text-white/80 hover:bg-white/10'
                            }`)
                      : isOverLightBackground 
                        ? `drop-shadow-none ${activeMenu === menu 
                            ? 'bg-gray-200 text-[#0B1C2B]' 
                            : 'text-[#0B1C2B] hover:text-[#0B1C2B]/80 hover:bg-gray-100'
                          }`
                        : `drop-shadow-md ${activeMenu === menu 
                            ? 'bg-white/20 text-white' 
                            : 'text-white hover:text-white/80 hover:bg-white/10'
                          }`
                  }`}
                  onClick={
                    menu === '회사소개'
                      ? handleCompanyIntroClick
                      : menu === '분야별 수행실적'
                        ? handlePortfolioClick
                        : menu === '관계법령'
                          ? handleLegalBasisClick
                          : menu === '자료실'
                            ? handleRecruitClick
                            : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={activeMenu === menu}
                >
                  {menu}
                </button>

                {/* 드롭다운 메뉴 - 흰색 라인 아래로 위치 */}
                {activeMenu === menu && menuStructure[menu].length > 0 && (
                  <div className={`absolute top-full left-0 mt-3 w-48 rounded-lg shadow-lg nav-slide-down open ${
                    location.pathname === '/greeting'
                      ? (isOverLightBackground
                          ? 'bg-white border border-gray-200'
                          : 'bg-slate-800 border border-slate-700')
                      : isOverLightBackground 
                        ? 'bg-white border border-gray-200' 
                        : 'bg-slate-800 border border-slate-700'
                  }`}>
                    {menuStructure[menu].map((subMenu) => (
                      subMenu === '수의계약근거' ? (
                        <Link
                          key={subMenu}
                          to="/legal-basis"
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </Link>
                      ) : subMenu === '채용공고' ? (
                        <Link
                          key={subMenu}
                          to="/recruit"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setActiveMenu(null);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </Link>
                      ) : subMenu === '인사말' ? (
                        <a
                          key={subMenu}
                          href="#ceo-message"
                          onClick={(e) => {
                            e.preventDefault();
                            if (location.pathname === '/greeting') {
                              const element = document.getElementById('ceo-message');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                window.history.pushState(null, '', '#ceo-message');
                              }
                            } else {
                              navigate('/greeting#ceo-message');
                              setTimeout(() => {
                                const element = document.getElementById('ceo-message');
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 300);
                            }
                            setActiveMenu(null);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : subMenu === '회사연혁' ? (
                        <a
                          key={subMenu}
                          href="/greeting#company-history"
                          onClick={handleHistoryClick}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : subMenu === '보유면허 및 기술' ? (
                        <a
                          key={subMenu}
                          href="#"
                          onClick={handleLicenseClick}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : subMenu === '오시는길' ? (
                        <a
                          key={subMenu}
                          href="#"
                          onClick={handleDirectionsClick}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : subMenu === '조직구성' ? (
                        <a
                          key={subMenu}
                          href="#"
                          onClick={handleOrganizationClick}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : subMenu === '안전진단' ? (
                        <a
                          key={subMenu}
                          href="/portfolio#portfolio-safety-bridge-tunnel"
                          onClick={handlePortfolioBridgeTunnelClick}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : subMenu === '설계' ? (
                        <a
                          key={subMenu}
                          href="/portfolio#portfolio-design"
                          onClick={handlePortfolioDesignClick}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : subMenu === '건설사업관리' ? (
                        <a
                          key={subMenu}
                          href="/portfolio#portfolio-supervision"
                          onClick={handlePortfolioSupervisionClick}
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </a>
                      ) : (
                        <Link
                          key={subMenu}
                          to="/portfolio"
                          className={`block px-4 py-2 text-lg hover:underline transition-all duration-200 font-korean ${
                            location.pathname === '/greeting'
                              ? (isOverLightBackground
                                  ? 'text-gray-700 hover:text-black'
                                  : 'text-gray-300 hover:text-white')
                              : isOverLightBackground 
                                ? 'text-gray-700 hover:text-black' 
                                : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {subMenu}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 모바일 햄버거 버튼 */}
          {/* 
            모바일 버튼 최적화:
            - 컨테이너 높이를 네비게이션 바 높이와 동일하게 설정하여 버튼 상자 크기 조절
            - 터치 친화적 크기: 최소 44x44px (p-2.5로 약 40px, 충분함)
            - 아이콘 크기: 모바일에서 h-6 w-6 (24px) 유지
            - h-full flex items-center로 버튼 컨테이너를 네비게이션 바 높이에 맞추고 수직 중앙 정렬
            - 버튼 내부에서도 flex items-center justify-center로 SVG 아이콘을 수직 중앙 정렬
          */}
          <div className="lg:hidden flex items-center h-full">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`h-full flex items-center justify-center px-2.5 transition-colors duration-300 rounded-lg hover:bg-opacity-10 hover:bg-current ${
                isOverLightBackground 
                  ? 'text-[#0B1C2B] hover:text-[#0B1C2B]/80' 
                  : 'text-white hover:text-white/80 drop-shadow-md'
              }`}
              aria-label="메뉴 열기"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {/* 
          모바일 메뉴 최적화:
          1. 최대 높이 설정: max-h-[calc(100vh-4rem)] - 화면 높이에서 네비게이션 바 높이를 뺀 값
          2. 스크롤 가능: overflow-y-auto로 내용이 많을 때 스크롤 가능
          3. 애니메이션: slide-down 효과로 부드러운 전환
          4. 패딩 조정: 모바일에서 px-3 py-3으로 공간 효율적
        */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden backdrop-blur-sm border-t overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${
            location.pathname === '/greeting'
              ? (isOverLightBackground
                  ? 'bg-white/95 border-gray-200'
                  : 'bg-black/80 border-white')
              : isOverLightBackground 
                ? 'bg-white/95 border-gray-200' 
                : 'bg-black/80 border-white'
          }`}>
            <div className="px-3 py-3 sm:px-4 sm:py-4 space-y-2">
              {Object.keys(menuStructure).map((menu) => (
                <div key={menu}>
                  {/* 
                    모바일 메뉴 버튼 최적화:
                    - 터치 친화적: py-3 (12px 상하 패딩)로 충분한 클릭 영역 확보
                    - 텍스트 크기: text-base (16px) - 모바일에서 읽기 좋은 크기
                    - 패딩: px-3 (12px 좌우) - 모바일에서 공간 효율적
                  */}
                  <button
                    onClick={() => {
                      if (menu === '분야별 수행실적') {
                        handlePortfolioClick({} as React.MouseEvent);
                      } else if (menu === '관계법령') {
                        handleLegalBasisClick({} as React.MouseEvent);
                      } else if (menu === '자료실') {
                        handleRecruitClick({} as React.MouseEvent);
                      } else {
                        toggleMobileMenu(menu);
                      }
                    }}
                    className={`w-full text-left px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-lg font-medium rounded-lg flex justify-between items-center font-korean transition-colors duration-200 active:scale-[0.98] ${
                      location.pathname === '/greeting'
                        ? (isOverLightBackground
                            ? 'text-[#0B1C2B] hover:bg-gray-100 active:bg-gray-200'
                            : 'text-white hover:bg-white/20 active:bg-white/30')
                        : isOverLightBackground 
                          ? 'text-[#0B1C2B] hover:bg-gray-100 active:bg-gray-200' 
                          : 'text-white hover:bg-white/20 active:bg-white/30'
                    }`}
                  >
                    <span className="flex-1">{menu}</span>
                    {menu !== '분야별 수행실적' && menu !== '관계법령' && (
                      <span className={`ml-2 text-sm transition-transform duration-200 flex-shrink-0 ${mobileExpandedMenus.includes(menu) ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    )}
                  </button>
                  
                  {/* 
                    서브메뉴 최적화:
                    - 들여쓰기: ml-3 (12px) - 모바일에서 적절한 계층 표현
                    - 간격: space-y-1 (4px) - 메뉴 항목 간 적절한 간격
                    - 패딩: px-3 py-2 - 터치 친화적 크기
                  */}
                  {mobileExpandedMenus.includes(menu) && (
                    <div className="ml-3 sm:ml-4 mt-1 space-y-1">
                      {/* 
                        서브메뉴 링크 최적화:
                        - 텍스트 크기: text-sm (14px) - 모바일에서 적절한 크기
                        - 패딩: px-3 py-2.5 - 터치 친화적 크기
                        - active 상태 추가: 터치 피드백 개선
                      */}
                      {menuStructure[menu].map((subMenu) => (
                        subMenu === '수의계약근거' ? (
                          <Link
                            key={subMenu}
                            to="/legal-basis"
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </Link>
                        ) : subMenu === '채용공고' ? (
                          <Link
                            key={subMenu}
                            to="/recruit"
                            onClick={() => {
                              window.scrollTo(0, 0);
                              setActiveMenu(null);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </Link>
                        ) : subMenu === '인사말' ? (
                          <a
                            key={subMenu}
                            href="#ceo-message"
                            onClick={(e) => {
                              e.preventDefault();
                              if (location.pathname === '/greeting') {
                                const element = document.getElementById('ceo-message');
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  window.history.pushState(null, '', '#ceo-message');
                                }
                              } else {
                                navigate('/greeting#ceo-message');
                                setTimeout(() => {
                                  const element = document.getElementById('ceo-message');
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }, 300);
                              }
                              setActiveMenu(null);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : subMenu === '회사연혁' ? (
                          <a
                            key={subMenu}
                            href="/greeting#company-history"
                            onClick={handleHistoryClick}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : subMenu === '보유면허 및 기술' ? (
                          <a
                            key={subMenu}
                            href="#"
                            onClick={handleLicenseClick}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : subMenu === '오시는길' ? (
                          <a
                            key={subMenu}
                            href="#"
                            onClick={handleDirectionsClick}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : subMenu === '조직구성' ? (
                          <a
                            key={subMenu}
                            href="#"
                            onClick={handleOrganizationClick}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : subMenu === '안전진단' ? (
                          <a
                            key={subMenu}
                            href="/portfolio#portfolio-safety-bridge-tunnel"
                            onClick={handlePortfolioBridgeTunnelClick}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : subMenu === '설계' ? (
                          <a
                            key={subMenu}
                            href="/portfolio#portfolio-design"
                            onClick={handlePortfolioDesignClick}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : subMenu === '건설사업관리' ? (
                          <a
                            key={subMenu}
                            href="/portfolio#portfolio-supervision"
                            onClick={handlePortfolioSupervisionClick}
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </a>
                        ) : (
                          <Link
                            key={subMenu}
                            to="/portfolio"
                            className={`block px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-lg hover:underline active:bg-opacity-20 active:bg-current rounded transition-all duration-200 font-korean ${
                              location.pathname === '/greeting'
                                ? (isOverLightBackground
                                    ? 'text-gray-700 hover:text-black'
                                    : 'text-gray-300 hover:text-white')
                                : isOverLightBackground 
                                  ? 'text-gray-700 hover:text-black' 
                                  : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            {subMenu}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};