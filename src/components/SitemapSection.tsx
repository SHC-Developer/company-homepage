import React from 'react';
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
      onClick: () => handleCategoryClick('/greeting'),
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
    <section className="py-36 bg-muted/30 overflow-hidden min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-center mb-4 font-korean">대한민국상이군경회시설사업소</h3>
        <p className="text-center text-gray-600 font-korean mb-24 text-base max-w-3xl mx-auto leading-relaxed">
          대한민국상이군경회시설사업소는 시설물의 안전과 유지관리를 책임지는 엔지니어링 전문기관입니다.(수정 필요)
        </p>
        
        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 sm:gap-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={category.onClick}
              className="flex flex-col items-center gap-6 p-8 rounded-lg transition-all duration-200 hover:bg-card hover:shadow-lg group"
            >
              {/* 아이콘 */}
              <div className="text-foreground/60 group-hover:text-primary transition-colors">
                {React.cloneElement(category.icon as React.ReactElement, { className: "w-16 h-16" })}
              </div>
              
              {/* 라벨 */}
              <span className="text-base sm:text-lg font-medium text-center font-korean text-foreground/70 group-hover:text-foreground transition-colors">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
