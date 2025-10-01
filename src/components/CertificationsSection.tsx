import React from 'react';
import { Award, Shield, CheckCircle, FileText } from 'lucide-react';

const certifications = [
  {
    icon: Award,
    title: '엔지니어링사업자',
    category: '등록증',
    description: '토목공학, 건축공학 분야',
    number: '제○○○○호'
  },
  {
    icon: Shield,
    title: '안전진단전문기관',
    category: '지정서',
    description: '1종 (교량, 터널, 건축물)',
    number: '제○○호'
  },
  {
    icon: CheckCircle,
    title: '감리전문회사',
    category: '등록증',
    description: '토목공사, 건축공사',
    number: '제○○○○호'
  },
  {
    icon: FileText,
    title: 'ISO 9001',
    category: '품질경영시스템',
    description: '국제표준 품질관리 인증',
    number: '○○○○○○○'
  },
  {
    icon: Shield,
    title: '건설사업관리업',
    category: '등록증',
    description: '종합감리 전문업체',
    number: '제○○○○호'
  },
  {
    icon: Award,
    title: '기술진흥법',
    category: '신기술 보유',
    description: '구조물 진단 신기술',
    number: '제○○○호'
  }
];

const partners = [
  { name: '한국시설안전공단', type: '공공기관' },
  { name: '한국도로공사', type: '공기업' },
  { name: '서울특별시', type: '지방자치단체' },
  { name: '경기도', type: '지방자치단체' },
  { name: '한국수자원공사', type: '공기업' },
  { name: '한국철도공사', type: '공기업' },
  { name: '국토교통부', type: '중앙정부' },
  { name: '○○건설', type: '민간기업' }
];

export const CertificationsSection = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 인증 및 면허 섹션 */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-korean">
              인증 및 보유면허
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-korean">
              법정 요구사항을 완벽히 충족하는 모든 면허와 인증을 보유하여 
              안전하고 신뢰할 수 있는 서비스를 제공합니다
            </p>
          </div>

          {/* 인증 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={cert.title}
                className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <cert.icon className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-accent font-medium mb-1 font-korean">
                      {cert.category}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 font-korean">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 font-korean">
                      {cert.description}
                    </p>
                    <div className="text-xs text-muted-foreground font-english">
                      {cert.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주요 고객사 및 파트너 섹션 */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-korean">
              주요 고객사 및 파트너
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-korean">
              공공기관부터 민간기업까지 다양한 고객사와의 신뢰 관계를 
              지속적으로 구축해왔습니다
            </p>
          </div>

          {/* 파트너 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className="bg-white rounded-lg p-6 text-center border border-border hover:shadow-md transition-all duration-300 group grayscale hover:grayscale-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* 로고 영역 (더미) */}
                <div className="h-16 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-secondary/20 group-hover:to-accent/20 transition-all">
                  <div className="text-2xl">🏢</div>
                </div>
                
                <h3 className="text-sm font-medium text-foreground mb-1 font-korean">
                  {partner.name}
                </h3>
                <p className="text-xs text-muted-foreground font-korean">
                  {partner.type}
                </p>
              </div>
            ))}
          </div>

          {/* 파트너십 문의 */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4 font-korean">
                파트너십 제안
              </h3>
              <p className="text-muted-foreground mb-6 font-korean">
                함께 성장할 수 있는 파트너를 찾고 있습니다. 
                상호 발전 가능한 협력 관계를 제안해 주세요.
              </p>
              <button className="btn-secondary-korean">
                파트너십 문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};