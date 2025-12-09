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
      onClick: () => handleCategoryClick('/greeting', 'organization'),
    },
    {
      id: 'portfolio',
      label: '수행 실적',
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
    <section className="pt-32 pb-8 overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: '#1e3f64' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center gap-12">
        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 sm:gap-4">
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
