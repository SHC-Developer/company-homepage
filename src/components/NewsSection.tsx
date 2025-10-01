import React from 'react';
import { Calendar, ArrowRight, Bell, FileText, Users, Briefcase } from 'lucide-react';

const newsData = [
  {
    id: 1,
    type: '채용공고',
    title: '토목안전진단 신입/경력 기술자 채용(상시)',
    summary: '정밀안전진단 분야 전문 인력을 상시 채용합니다. 우대조건 및 복리후생 확인하세요.',
    date: '2024-09-15',
    category: 'career',
    icon: Users,
    isHighlight: true
  },
  {
    id: 2,
    type: '공지사항',
    title: '하반기 점검 일정 안내',
    summary: '2024년 하반기 정기 안전점검 및 진단 일정을 안내드립니다.',
    date: '2024-09-01',
    category: 'notice',
    icon: Bell,
    isHighlight: false
  },
  {
    id: 3,
    type: '기술소식',
    title: '신기술 도입 - AI 기반 구조물 진단 시스템',
    summary: '최신 AI 기술을 활용한 정밀진단 시스템을 도입하여 진단 정확도를 향상시켰습니다.',
    date: '2024-08-28',
    category: 'tech',
    icon: FileText,
    isHighlight: false
  },
  {
    id: 4,
    type: '수주소식',
    title: '○○시 교량 정밀안전진단 용역 수주',
    summary: '○○시 관내 주요 교량 3개소에 대한 정밀안전진단 용역을 수주하였습니다.',
    date: '2024-08-20',
    category: 'business',
    icon: Briefcase,
    isHighlight: false
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'career': return 'bg-accent/10 text-accent';
    case 'notice': return 'bg-secondary/10 text-secondary';
    case 'tech': return 'bg-primary/10 text-primary';
    case 'business': return 'bg-orange-100 text-orange-600';
    default: return 'bg-muted/10 text-muted-foreground';
  }
};

export const NewsSection = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-korean">
            소식 및 공지
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-korean">
            최신 소식과 중요한 공지사항을 확인하세요. 
            채용정보와 기술 동향도 함께 제공합니다.
          </p>
        </div>

        {/* 뉴스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {newsData.map((news, index) => (
            <article 
              key={news.id}
              className={`corporate-card overflow-hidden group cursor-pointer ${
                news.isHighlight ? 'ring-2 ring-accent ring-opacity-20' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                {/* 헤더 - 카테고리와 날짜 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(news.category)}`}>
                      <news.icon className="h-4 w-4" />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(news.category)}`}>
                      {news.type}
                    </span>
                    {news.isHighlight && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-600 font-korean">
                        중요
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="font-korean">{formatDate(news.date)}</span>
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors font-korean line-clamp-2">
                  {news.title}
                </h3>

                {/* 요약 */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-korean line-clamp-3">
                  {news.summary}
                </p>

                {/* 더보기 링크 */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <a 
                    href="#"
                    className="inline-flex items-center text-secondary hover:text-secondary/80 text-sm font-medium transition-colors group font-korean"
                  >
                    자세히 보기
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  {news.isHighlight && (
                    <div className="text-xs text-accent font-medium font-korean">
                      상시모집
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 뉴스레터 구독 */}
        <div className="bg-muted rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4 font-korean">
            최신 소식을 받아보세요
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto font-korean">
            기술 동향, 채용 정보, 프로젝트 소식 등 
            유용한 정보를 이메일로 정기적으로 받아보실 수 있습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-korean"
            />
            <button className="btn-secondary-korean whitespace-nowrap">
              구독하기
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 font-korean">
            개인정보는 안전하게 보호되며, 언제든지 구독을 취소할 수 있습니다.
          </p>
        </div>

        {/* 더 많은 소식 보기 */}
        <div className="text-center mt-12">
          <button className="btn-outline-korean">
            전체 소식 보기
          </button>
        </div>
      </div>
    </section>
  );
};