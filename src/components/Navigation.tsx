import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuStructure {
  [key: string]: {
    [key: string]: string[];
  };
}

const menuStructure: MenuStructure = {
  '회사소개': {
    '인사말': ['시업소장 인사말'],
    '경영이념': ['본회'],
    '회사연혁': ['사업소 홈페이지'],
    '보유면허': ['사업소 홈페이지'],
    '보유기술': ['특허/활용실적'],
    '조직구성': [],
    '오시는길': []
  },
  '관계법령': {
    '수의계약근거': []
  },
  '사업분야': {
    '진단': [],
    '설계': [],
    '감리': []
  },
  '수행실적': {
    '진단': ['교량 및 터널', '수리'],
    '설계': [],
    '감리': []
  },
  '자료실': {
    '채용공고': ['토목안전진단 신입/경력 기술자 채용(상시)'],
    '이력서 양식': [],
    '개인기록카드 양식': []
  }
};

interface NavigationProps {
  variant?: 'default' | 'legal';
}

export const Navigation = ({ variant = 'default' }: NavigationProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedMenus, setMobileExpandedMenus] = useState<string[]>([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMenuEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
    setActiveSubMenu(null);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
    }, 150);
  };

  const handleSubMenuEnter = (subMenu: string) => {
    setActiveSubMenu(subMenu);
  };

  const toggleMobileMenu = (menu: string) => {
    setMobileExpandedMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    );
  };

  // 클릭 외부 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setActiveSubMenu(null);
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
        setActiveSubMenu(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 스크롤 감지로 네비게이션 숨기기/보이기
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
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
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300 ease-in-out ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`} ref={menuRef}>
      <div className="max-w-7xl mx-auto px-0 sm:px-2 lg:px-4">
        <div className={`flex justify-between items-end h-16 pb-2 ${variant === 'legal' ? 'nav-legal' : 'nav-bottom-line'}`}>
          {/* 회사명만 표시 */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg sm:text-xl font-bold text-white font-logo hover:text-white/80 transition-colors duration-300 drop-shadow-lg">
              대한민국 상이군경회 시설사업소
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
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-korean drop-shadow-md
                    ${activeMenu === menu 
                      ? 'bg-white/20 text-white' 
                      : 'text-white hover:text-white/80 hover:bg-white/10'
                    }`}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === menu}
                >
                  {menu}
                  <ChevronDown className="inline ml-1 h-4 w-4" />
                </button>

                {/* 2단계 서브메뉴 */}
                {activeMenu === menu && Object.keys(menuStructure[menu]).length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg nav-slide-down open">
                    {Object.keys(menuStructure[menu]).map((subMenu) => (
                      <div
                        key={subMenu}
                        className="relative"
                        onMouseEnter={() => handleSubMenuEnter(subMenu)}
                      >
                        {subMenu === '수의계약근거' ? (
                          <>
                            <Link
                              to="/legal-basis"
                              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:underline transition-all duration-200 font-korean"
                            >
                              {subMenu}
                              {menuStructure[menu][subMenu].length > 0 && (
                                <ChevronDown className="inline ml-1 h-3 w-3 rotate-[-90deg]" />
                              )}
                            </Link>
                          </>
                        ) : (
                          <>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:underline transition-all duration-200 font-korean"
                            >
                              {subMenu}
                              {menuStructure[menu][subMenu].length > 0 && (
                                <ChevronDown className="inline ml-1 h-3 w-3 rotate-[-90deg]" />
                              )}
                            </a>
                          </>
                        )}

                        {/* 3단계 서브-서브메뉴 */}
                        {activeSubMenu === subMenu && menuStructure[menu][subMenu].length > 0 && (
                          <div className="absolute top-0 left-full ml-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg nav-slide-right open">
                            {menuStructure[menu][subMenu].map((subSubMenu) => (
                              <a
                                key={subSubMenu}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:underline transition-all duration-200 font-korean"
                              >
                                {subSubMenu}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
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
              className="p-2 text-white hover:text-white/80 drop-shadow-md"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/80 backdrop-blur-sm border-t border-white">
            <div className="px-4 py-4 space-y-2">
              {Object.keys(menuStructure).map((menu) => (
                <div key={menu}>
                  <button
                    onClick={() => toggleMobileMenu(menu)}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-white/20 rounded-lg flex justify-between items-center font-korean"
                  >
                    {menu}
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      mobileExpandedMenus.includes(menu) ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {mobileExpandedMenus.includes(menu) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {Object.keys(menuStructure[menu]).map((subMenu) => (
                        <div key={subMenu}>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:underline transition-all duration-200 font-korean"
                          >
                            {subMenu}
                          </a>
                          {menuStructure[menu][subMenu].length > 0 && (
                            <div className="ml-4 space-y-1">
                              {menuStructure[menu][subMenu].map((subSubMenu) => (
                                <a
                                  key={subSubMenu}
                                  href="#"
                                  className="block px-4 py-1 text-xs text-gray-300 hover:text-white hover:underline transition-all duration-200 font-korean"
                                >
                                  {subSubMenu}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
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