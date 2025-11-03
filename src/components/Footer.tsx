import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 푸터 컨텐츠 */}
        <div className="py-8">
          {/* 회사 정보 - 좌우 분리 레이아웃 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 왼쪽: 회사명과 소개 */}
            <div>
              <h3 className="text-lg font-bold mb-3 font-korean">
                대한민국 상이군경회 시설사업소
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed font-korean text-sm">
                25년간 축적된 전문성과 신뢰를 바탕으로 공공시설과 산업시설의 
                안정과 성능을 책임지는 엔지니어링 전문기관입니다.
              </p>
            </div>

            {/* 오른쪽: 연락처 정보 */}
            <div>
              <h4 className="text-base font-semibold mb-3 font-korean">연락처</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                  <div>
                    <span className="text-primary-foreground/80 font-korean text-sm">TEL: </span>
                    <span className="text-primary-foreground font-english text-sm">02)572-6218</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                  <div>
                    <span className="text-primary-foreground/80 font-korean text-sm">FAX: </span>
                    <span className="text-primary-foreground font-english text-sm">02)571-9274</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-primary-foreground/80 font-korean text-sm">주소: </span>
                    <span className="text-primary-foreground font-korean text-sm">
                      경기도 성남시 분당구 판교역로 230 삼환하이펙스 B동 9층 907호
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 저작권 영역 */}
        <div className="py-3 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-xs text-primary-foreground/60">
              <span className="font-korean">
                © {currentYear} 대한민국 상이군경회 시설사업소. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <a 
                href="#privacy" 
                className="text-primary-foreground/80 hover:text-accent transition-colors font-korean"
              >
                개인정보처리방침
              </a>
              <a 
                href="#terms" 
                className="text-primary-foreground/80 hover:text-accent transition-colors font-korean"
              >
                이용약관
              </a>
              <a 
                href="#sitemap" 
                className="text-primary-foreground/80 hover:text-accent transition-colors font-korean"
              >
                사이트맵
              </a>
            </div>
          </div>

          {/* 면책 조항 */}
          <div className="mt-2 pt-2 border-t border-primary-foreground/10">
            <p className="text-xs text-primary-foreground/50 text-center font-korean">
              본 웹사이트에 게시된 모든 정보는 참고용이며, 정확한 정보는 직접 문의 바랍니다. 
              무단 복제 및 배포를 금지합니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};