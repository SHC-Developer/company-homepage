import React from 'react';
import { MapPin } from 'lucide-react';
import logo2 from '@/assets/logo2.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative overflow-hidden text-primary-foreground"
      style={{ 
        backgroundColor: '#0b1c2b'
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-14 pb-16">
        {/* 좌: 로고+회사명 | 우: 연락처+주소 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] items-start">
          {/* 회사명 + 로고 */}
          <div className="space-y-6">
            <div className="flex items-center gap-5">
              <img
                src={logo2}
                alt="대한민국상이군경회시설사업소 로고"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
              <div className="space-y-1">
                <h3 className="text-lg sm:text-2xl md:text-4xl font-bold font-logo leading-tight">
                  대한민국상이군경회시설사업소
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 font-logo tracking-wide leading-tight">
                  大韓民國傷痍軍警會
                </p>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div className="space-y-4 border-t border-primary-foreground/10 pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0">
            <h4 className="hidden md:block text-sm font-semibold text-primary-foreground/70 font-korean">
              연락처
            </h4>
            <div className="space-y-3">
              {/* 모바일: 한 줄, 데스크톱: 세로 */}
              <div className="text-sm text-primary-foreground/80 font-korean md:space-y-3">
                <div className="md:block">
                  TEL&nbsp;
                  <span className="font-english text-primary-foreground">02)572-6218</span>
                  <span className="md:hidden">
                    &nbsp;FAX&nbsp;
                    <span className="font-english text-primary-foreground">02)571-9274</span>
                  </span>
                </div>
                <div className="hidden md:block">
                  FAX&nbsp;
                  <span className="font-english text-primary-foreground">02)571-9274</span>
                </div>
              </div>
              {/* 주소 */}
              <div className="flex items-start gap-3 pt-2">
                <MapPin className="mt-1 h-5 w-5 text-primary-foreground flex-shrink-0" />
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