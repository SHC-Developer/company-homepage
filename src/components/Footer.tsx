import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* 상단을 깔끔한 직선으로 유지 (추가 오버레이 없음) */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-14 pb-16">
        {/* 좌: 로고+회사명 | 우: 연락처+주소 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] items-start">
          {/* 회사명 + 로고 */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={`${import.meta.env.BASE_URL}logo2.png`}
                alt="대한민국상이군경회시설사업소 로고"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <h3 className="text-2xl md:text-3xl font-bold font-korean">
                대한민국상이군경회시설사업소
              </h3>
            </div>
          </div>

          {/* 연락처 */}
          <div className="space-y-4 border-t border-primary-foreground/10 pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0">
            <h4 className="text-sm font-semibold text-primary-foreground/70 font-korean">
              연락처
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80 font-korean">
                  TEL&nbsp;
                  <span className="font-english text-primary-foreground">02)572-6218</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80 font-korean">
                  FAX&nbsp;
                  <span className="font-english text-primary-foreground">02)571-9274</span>
                </div>
              </div>
              {/* 주소 */}
              <div className="flex items-start gap-3 pt-2">
                <MapPin className="mt-1 h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-sm leading-relaxed text-primary-foreground/80 font-korean">
                  경기도 성남시 분당구 판교역로 230<br />
                  삼환하이펙스 B동 9층 907호
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <p className="text-xs text-primary-foreground/60 font-korean text-center md:text-left">
            © {currentYear} 대한민국상이군경회시설사업소. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};