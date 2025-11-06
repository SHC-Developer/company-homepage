import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface MenuStructure {
  [key: string]: string[];
}

const menuStructure = {
  '회사소개': ['인사말', '회사연혁', '보유면허 및 기술', '조직구성', '오시는길'],
  '관계법령': ['수의계약근거'],
  '분야별 수행실적': ['안전진단', '엔지니어링', '설계/사업관리'],
  '자료실': ['채용공고', '이력서 양식', '개인기록카드 양식']
};

interface NavigationProps {
  variant?: 'default' | 'legal';
  forceLightTheme?: boolean;
}

export const Navigation = ({ variant = 'default', forceLightTheme = false }: NavigationProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedMenus, setMobileExpandedMenus] = useState<string[]>([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  // 스크롤 감지로 네비게이션 숨기기/보이기 및 배경 감지
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
      
      // 스크롤이 맨 위에 있거나 매우 적을 때는 항상 보이기
      if (currentScrollY < 10) {
        setIsNavVisible(true);
      } else {
        // 스크롤 방향에 따라 네비게이션 숨기기/보이기
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // 아래로 스크롤하고 100px 이상일 때 숨기기
          setIsNavVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // 위로 스크롤할 때 보이기
          setIsNavVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, forceLightTheme]);

  // forceLightTheme prop이 변경될 때 상태 업데이트
  useEffect(() => {
    if (forceLightTheme) {
      setIsOverLightBackground(true);
    }
  }, [forceLightTheme]);

  return (
    <nav className={`fixed -top-4 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isNavVisible ? 'translate-y-0' : '-translate-y-full'} ${
      location.pathname === '/greeting'
        ? (isOverLightBackground ? 'bg-white' : 'bg-transparent')
        : isOverLightBackground ? 'bg-white' : 'bg-transparent'
    }`} ref={menuRef}>
      <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 pt-0">
        <div className={`flex justify-between items-end h-20 sm:h-28 md:h-[120px] pb-1 ${variant === 'legal' ? 'nav-legal' : 'nav-bottom-line'} ${
          isOverLightBackground ? 'nav-light-theme' : ''
        }`}>
          {/* 로고와 회사명 */}
          <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
            <img 
              src={
                location.pathname === '/greeting' && isOverLightBackground
                  ? `${import.meta.env.BASE_URL}logo3.png`
                  : isOverLightBackground 
                    ? `${import.meta.env.BASE_URL}logo3.png` 
                    : (location.pathname === '/' || location.pathname === '/greeting' ? `${import.meta.env.BASE_URL}logo2.png` : `${import.meta.env.BASE_URL}logo3.png`)
              } 
              alt="회사 로고" 
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            />
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className={`text-xl sm:text-3xl md:text-4xl font-medium font-logo transition-colors duration-300 ${
              location.pathname === '/greeting'
                ? (isOverLightBackground
                    ? 'text-[#2C3E5E] hover:text-[#2C3E5E]/80'
                    : 'text-white hover:text-white/80 drop-shadow-lg')
                : isOverLightBackground 
                  ? 'text-[#2C3E5E] hover:text-[#2C3E5E]/80' 
                  : 'text-white hover:text-white/80 drop-shadow-lg'
            }`}>
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
                              ? 'bg-gray-200 text-black' 
                              : 'text-black hover:text-black/80 hover:bg-gray-100'
                            }`
                          : `drop-shadow-md ${activeMenu === menu 
                              ? 'bg-white/20 text-white' 
                              : 'text-white hover:text-white/80 hover:bg-white/10'
                            }`)
                      : isOverLightBackground 
                        ? `drop-shadow-none ${activeMenu === menu 
                            ? 'bg-gray-200 text-black' 
                            : 'text-black hover:text-black/80 hover:bg-gray-100'
                          }`
                        : `drop-shadow-md ${activeMenu === menu 
                            ? 'bg-white/20 text-white' 
                            : 'text-white hover:text-white/80 hover:bg-white/10'
                          }`
                  }`}
                  onClick={menu === '회사소개' ? handleCompanyIntroClick : menu === '분야별 수행실적' ? handlePortfolioClick : menu === '관계법령' ? handleLegalBasisClick : undefined}
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
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${
                isOverLightBackground 
                  ? 'text-black hover:text-black/80' 
                  : 'text-white hover:text-white/80 drop-shadow-md'
              }`}
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden backdrop-blur-sm border-t ${
            location.pathname === '/greeting'
              ? (isOverLightBackground
                  ? 'bg-white/95 border-gray-200'
                  : 'bg-black/80 border-white')
              : isOverLightBackground 
                ? 'bg-white/95 border-gray-200' 
                : 'bg-black/80 border-white'
          }`}>
            <div className="px-4 py-4 space-y-2">
              {Object.keys(menuStructure).map((menu) => (
                <div key={menu}>
                  <button
                    onClick={() => {
                      if (menu === '분야별 수행실적') {
                        handlePortfolioClick({} as React.MouseEvent);
                      } else if (menu === '관계법령') {
                        handleLegalBasisClick({} as React.MouseEvent);
                      } else {
                        toggleMobileMenu(menu);
                      }
                    }}
                    className={`w-full text-left px-4 py-2 text-lg font-medium rounded-lg flex justify-between items-center font-korean transition-colors duration-200 ${
                      location.pathname === '/greeting'
                        ? (isOverLightBackground
                            ? 'text-black hover:bg-gray-100'
                            : 'text-white hover:bg-white/20')
                        : isOverLightBackground 
                          ? 'text-black hover:bg-gray-100' 
                          : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {menu}
                    {menu !== '분야별 수행실적' && menu !== '관계법령' && (
                      <span className={`ml-2 transition-transform ${mobileExpandedMenus.includes(menu) ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    )}
                  </button>
                  
                  {mobileExpandedMenus.includes(menu) && (
                    <div className="ml-4 mt-1 space-y-1">
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
          </div>
        )}
      </div>
    </nav>
  );
};