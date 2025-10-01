import React from 'react';

const partnerLogos = [
  { name: '해양수산부', url: '#' },
  { name: '한국시설안전공단', url: '#' },
  { name: '한국지반환경공학회', url: '#' },
  { name: '한국지하안전협회', url: '#' },
  { name: '국토교통부', url: '#' },
  { name: '한국시설물안전진단협회', url: '#' }
];

export const SitemapSection = () => {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-center mb-8 font-korean">협력 기관</h3>
        
        {/* 자동 슬라이드 컨테이너 */}
        <div className="relative">
          <div className="flex animate-scroll">
            {/* 첫 번째 세트 */}
            {partnerLogos.map((partner, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 mx-8"
              >
                <a 
                  href={partner.url}
                  className="block w-40 h-20 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center border border-border"
                >
                  <span className="text-sm font-medium text-foreground font-korean text-center px-4">
                    {partner.name}
                  </span>
                </a>
              </div>
            ))}
            {/* 두 번째 세트 (무한 루프용) */}
            {partnerLogos.map((partner, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 mx-8"
              >
                <a 
                  href={partner.url}
                  className="block w-40 h-20 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center border border-border"
                >
                  <span className="text-sm font-medium text-foreground font-korean text-center px-4">
                    {partner.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
