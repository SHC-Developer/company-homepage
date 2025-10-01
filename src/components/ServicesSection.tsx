import React from 'react';
import { Search, Ruler, Shield, Settings, Target, FileCheck } from 'lucide-react';

const services = [
  {
    icon: Search,
    title: '정밀안전진단',
    description: '구조물의 안전성과 내구성을\n체계적으로 평가합니다',
    link: '#diagnosis'
  },
  {
    icon: Ruler,
    title: '엔지니어링 설계',
    description: '최적화된 설계로 시설의\n성능을 극대화합니다',
    link: '#design'
  },
  {
    icon: Shield,
    title: '건설사업관리',
    description: '전문 감리를 통해 품질과\n안전을 보장합니다',
    link: '#supervision'
  },
  {
    icon: Settings,
    title: '유지관리',
    description: '지속적인 모니터링으로\n시설 수명을 연장합니다',
    link: '#maintenance'
  },
  {
    icon: Target,
    title: '성능평가',
    description: '과학적 분석을 통한\n정확한 성능 진단',
    link: '#evaluation'
  },
  {
    icon: FileCheck,
    title: '컨설팅',
    description: '전문 지식 기반의\n맞춤형 솔루션 제공',
    link: '#consulting'
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-korean">
            엔지니어링 전 과정을 한 곳에서
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-korean">
            진단부터 설계, 감리, 유지관리까지 시설의 전체 생명주기를 
            전문적이고 체계적으로 관리합니다
          </p>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="corporate-card p-6 text-center group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-secondary" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 font-korean">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 whitespace-pre-line font-korean">
                {service.description}
              </p>
              
              <a 
                href={service.link}
                className="inline-flex items-center text-secondary hover:text-secondary/80 font-medium transition-colors font-korean"
              >
                자세히 보기
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-korean">
              프로젝트 상담이 필요하신가요?
            </h3>
            <p className="text-muted-foreground mb-6 font-korean">
              전문 엔지니어가 귀하의 프로젝트에 최적화된 솔루션을 제안해드립니다
            </p>
            <button className="btn-primary-korean text-lg">
              무료 상담 신청
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};