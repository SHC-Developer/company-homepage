import React from 'react';
import { Users, Award, CheckCircle } from 'lucide-react';

const differentiators = [
  {
    icon: Users,
    title: '전문 인력',
    stats: '기술사 15명+',
    description: '토목, 건축, 구조 분야의 고급 기술진과 풍부한 현장 경험을 보유한 전문가들이 최고 품질의 서비스를 제공합니다.',
    highlights: ['기술사 자격 보유', '평균 15년+ 경력', '지속적 기술 교육']
  },
  {
    icon: Award,
    title: '법정 면허',
    stats: '인증 100%',
    description: '엔지니어링사업자, 안전진단전문기관, 감리전문회사 등 모든 필수 면허와 인증을 완비하여 신뢰할 수 있는 서비스를 제공합니다.',
    highlights: ['엔지니어링사업자 등록', '안전진단전문기관 지정', '감리전문회사 등록']
  },
  {
    icon: CheckCircle,
    title: '품질·안전 시스템',
    stats: '납기 준수율 100%',
    description: '체계적인 품질관리 시스템과 안전관리 체계를 통해 정확한 납기 준수와 최고 수준의 결과물을 보장합니다.',
    highlights: ['ISO 품질관리 시스템', '안전관리 인증', '정시 납기 보장']
  }
];

export const DifferentiatorsSection = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-korean">
            차별화된 경쟁력
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-korean">
            25년간 축적된 경험과 전문성을 바탕으로 고객에게 
            최고 수준의 엔지니어링 서비스를 제공합니다
          </p>
        </div>

        {/* 차별화 요소 카드들 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div 
              key={item.title}
              className="corporate-card p-8 text-center group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* 아이콘과 통계 */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mb-4 group-hover:bg-secondary/20 transition-colors">
                  <item.icon className="h-10 w-10 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-accent font-english mb-2">
                  {item.stats}
                </div>
              </div>

              {/* 제목과 설명 */}
              <h3 className="text-2xl font-semibold text-foreground mb-4 font-korean">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed font-korean">
                {item.description}
              </p>

              {/* 하이라이트 리스트 */}
              <div className="space-y-2">
                {item.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center justify-center text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                    <span className="font-korean">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 신뢰 지표 */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent font-english">200+</div>
                <div className="text-sm text-muted-foreground font-korean">정밀안전진단</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent font-english">150+</div>
                <div className="text-sm text-muted-foreground font-korean">설계 프로젝트</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent font-english">100+</div>
                <div className="text-sm text-muted-foreground font-korean">감리 실적</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent font-english">25+</div>
                <div className="text-sm text-muted-foreground font-korean">년간 경험</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};