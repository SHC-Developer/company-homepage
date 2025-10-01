import React, { useState } from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

const portfolioData = [
  {
    id: 1,
    title: '한강대교 정밀안전진단',
    location: '서울특별시 용산구',
    year: '2024',
    description: '교량 구조 안전성 평가 및 보수보강 방안 제시',
    category: '교량',
    type: '진단',
    image: null
  },
  {
    id: 2,
    title: '지하철 2호선 터널 안전점검',
    location: '서울특별시 강남구',
    year: '2024',
    description: '지하구조물 정밀안전진단 및 성능평가',
    category: '터널',
    type: '진단',
    image: null
  },
  {
    id: 3,
    title: '○○시 상수도 시설 설계',
    location: '경기도 ○○시',
    year: '2023',
    description: '상수도 관로 및 정수장 기본설계',
    category: '수리',
    type: '설계',
    image: null
  },
  {
    id: 4,
    title: '△△ 산업단지 개발 감리',
    location: '경상남도 △△시',
    year: '2023',
    description: '산업단지 조성공사 건설사업관리',
    category: '공공',
    type: '감리',
    image: null
  },
  {
    id: 5,
    title: '고속도로 교량 보수설계',
    location: '충청북도 ××시',
    year: '2023',
    description: '노후 교량 보수보강 실시설계',
    category: '교량',
    type: '설계',
    image: null
  },
  {
    id: 6,
    title: '공공건물 구조 안전진단',
    location: '전라남도 ◇◇군',
    year: '2022',
    description: '공공시설 정밀안전진단 및 내진성능평가',
    category: '건축',
    type: '진단',
    image: null
  }
];

const categories = ['전체', '교량', '터널', '수리', '건축', '공공'];
const types = ['전체', '진단', '설계', '감리'];

export const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');

  const filteredPortfolio = portfolioData.filter(item => {
    const categoryMatch = selectedCategory === '전체' || item.category === selectedCategory;
    const typeMatch = selectedType === '전체' || item.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-korean">
            수행실적
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-korean">
            다양한 분야의 프로젝트 경험을 통해 축적된 전문성과 
            고객 만족도를 확인하실 수 있습니다
          </p>
        </div>

        {/* 필터 탭 */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* 분야 필터 */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2 font-korean">분야:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-korean ${
                    selectedCategory === category
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-secondary/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 타입 필터 */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2 font-korean">유형:</span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-korean ${
                    selectedType === type
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((project, index) => (
            <div 
              key={project.id}
              className="corporate-card overflow-hidden group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 프로젝트 이미지 영역 (더미) */}
              <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏗️</div>
                  <div className="text-sm text-muted-foreground font-korean">프로젝트 이미지</div>
                </div>
              </div>

              {/* 프로젝트 정보 */}
              <div className="p-6">
                {/* 카테고리 및 타입 태그 */}
                <div className="flex gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full font-korean">
                    <Tag className="h-3 w-3 mr-1" />
                    {project.category}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full font-korean">
                    {project.type}
                  </span>
                </div>

                {/* 프로젝트 제목 */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors font-korean">
                  {project.title}
                </h3>

                {/* 위치와 연도 */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="font-korean">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-english">{project.year}</span>
                  </div>
                </div>

                {/* 프로젝트 설명 */}
                <p className="text-muted-foreground text-sm leading-relaxed font-korean">
                  {project.description}
                </p>

                {/* 더보기 링크 */}
                <div className="mt-4 pt-4 border-t border-border">
                  <a 
                    href="#"
                    className="inline-flex items-center text-secondary hover:text-secondary/80 text-sm font-medium transition-colors font-korean"
                  >
                    상세보기
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 많은 실적 보기 */}
        <div className="text-center mt-12">
          <button className="btn-outline-korean">
            더 많은 실적 보기
          </button>
        </div>
      </div>
    </section>
  );
};