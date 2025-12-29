import React from 'react';
import logo2 from '@/assets/logo2.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const tel = '02)572-6218';
  const fax = '050-5115-9274';
  const addressLine1 = '경기도 성남시 분당구 판교역로 230, 907호';
  const addressLine2 = '(삼환하이펙스B동, 삼평동)';

  return (
    <footer
      className="relative overflow-hidden text-primary-foreground"
      style={{ backgroundColor: '#0b1c2b' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-14 pb-16">
        {/* 좌: 로고+회사명 | 우: 연락처+주소 */}
        <div className="grid grid-cols-1 gap-4 xl:gap-10 xl:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] items-start">
          {/* 회사명 + 로고 */}
          <div className="space-y-6 xl:space-y-6 pb-2 xl:pb-0">
            <div className="flex items-end gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <img
                src={logo2}
                alt="대한민국상이군경회시설사업소 로고"
                className="w-12 h-12 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-24 xl:h-24 object-contain"
              />
              <div className="space-y-0.5 sm:space-y-1">
                <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-logo leading-tight">
                  대한민국상이군경회시설사업소
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-primary-foreground/80 font-logo tracking-wide leading-tight">
                  大韓民國傷痍軍警會
                </p>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div className="border-t border-primary-foreground/10 pt-4 xl:pt-0 pb-0 xl:pb-0 xl:border-t-0 xl:border-l xl:pl-10 flex flex-col justify-center xl:block">
            <div className="space-y-3 sm:space-y-3 md:space-y-2 lg:space-y-2.5 text-left">
              {/* 모바일: TEL과 FAX 가로 한 줄, 데스크톱: 세로 배치 */}
              <div className="text-base md:text-sm text-primary-foreground/80 font-korean space-y-3 sm:space-y-3 md:space-y-2 lg:space-y-2.5">
                {/* 모바일: TEL과 FAX 가로 배치 - 바로 옆에, 좌정렬 */}
                <div className="flex justify-start xl:block gap-x-3 sm:gap-x-4 items-center xl:space-y-2">
                  {/* TEL */}
                  <div className="xl:block whitespace-nowrap text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg">
                    TEL&nbsp;
                    <span className="font-english text-primary-foreground">{tel}</span>
                  </div>
                  {/* FAX */}
                  <div className="xl:block whitespace-nowrap text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg">
                    FAX&nbsp;
                    <span className="font-english text-primary-foreground">{fax}</span>
                  </div>
                </div>
                {/* 주소 */}
                <div className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-primary-foreground/80 whitespace-nowrap">
                  Add.&nbsp;
                  <span className="font-korean text-primary-foreground">{addressLine1}</span>
                  <br />
                  <span className="font-korean text-primary-foreground">{addressLine2}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* 저작권 */}
        <div className="mt-4 sm:mt-5 md:mt-6 border-t border-primary-foreground/10 pt-4 sm:pt-5 md:pt-6">
          <p className="text-xs sm:text-sm md:text-sm lg:text-base text-primary-foreground/60 font-korean text-left">
            © {currentYear} 대한민국상이군경회시설사업소. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};