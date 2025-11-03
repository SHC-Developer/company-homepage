import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

interface PortfolioData {
  year: number;
  '정밀안전진단': number;
  '정밀안전검검': number;
  '설계': number;
  '감리': number;
  '기타': number;
  '합계': number;
}

const portfolioData: PortfolioData[] = [
  { year: 2003, '정밀안전진단': 4, '정밀안전검검': 0, '설계': 0, '감리': 0, '기타': 0, '합계': 4 },
  { year: 2004, '정밀안전진단': 6, '정밀안전검검': 3, '설계': 2, '감리': 0, '기타': 1, '합계': 12 },
  { year: 2005, '정밀안전진단': 5, '정밀안전검검': 6, '설계': 3, '감리': 0, '기타': 2, '합계': 16 },
  { year: 2006, '정밀안전진단': 8, '정밀안전검검': 7, '설계': 0, '감리': 5, '기타': 1, '합계': 21 },
  { year: 2007, '정밀안전진단': 10, '정밀안전검검': 11, '설계': 2, '감리': 0, '기타': 2, '합계': 25 },
  { year: 2008, '정밀안전진단': 17, '정밀안전검검': 11, '설계': 3, '감리': 0, '기타': 2, '합계': 33 },
  { year: 2009, '정밀안전진단': 9, '정밀안전검검': 19, '설계': 3, '감리': 0, '기타': 1, '합계': 32 },
  { year: 2010, '정밀안전진단': 6, '정밀안전검검': 21, '설계': 5, '감리': 10, '기타': 0, '합계': 42 },
  { year: 2011, '정밀안전진단': 11, '정밀안전검검': 14, '설계': 6, '감리': 21, '기타': 0, '합계': 52 },
  { year: 2012, '정밀안전진단': 7, '정밀안전검검': 21, '설계': 10, '감리': 23, '기타': 0, '합계': 61 },
  { year: 2013, '정밀안전진단': 12, '정밀안전검검': 16, '설계': 8, '감리': 13, '기타': 0, '합계': 49 },
  { year: 2014, '정밀안전진단': 4, '정밀안전검검': 20, '설계': 3, '감리': 5, '기타': 0, '합계': 32 },
  { year: 2015, '정밀안전진단': 2, '정밀안전검검': 14, '설계': 1, '감리': 19, '기타': 2, '합계': 38 },
  { year: 2016, '정밀안전진단': 7, '정밀안전검검': 18, '설계': 4, '감리': 11, '기타': 1, '합계': 41 },
  { year: 2017, '정밀안전진단': 7, '정밀안전검검': 15, '설계': 8, '감리': 11, '기타': 3, '합계': 44 },
  { year: 2018, '정밀안전진단': 4, '정밀안전검검': 22, '설계': 4, '감리': 17, '기타': 2, '합계': 49 },
  { year: 2019, '정밀안전진단': 8, '정밀안전검검': 17, '설계': 7, '감리': 11, '기타': 0, '합계': 43 },
  { year: 2020, '정밀안전진단': 9, '정밀안전검검': 21, '설계': 8, '감리': 13, '기타': 0, '합계': 51 },
  { year: 2021, '정밀안전진단': 4, '정밀안전검검': 15, '설계': 4, '감리': 2, '기타': 3, '합계': 28 },
  { year: 2022, '정밀안전진단': 6, '정밀안전검검': 13, '설계': 4, '감리': 0, '기타': 0, '합계': 23 },
  { year: 2023, '정밀안전진단': 3, '정밀안전검검': 27, '설계': 6, '감리': 2, '기타': 2, '합계': 40 },
  { year: 2024, '정밀안전진단': 2, '정밀안전검검': 23, '설계': 6, '감리': 4, '기타': 3, '합계': 38 },
  { year: 2025, '정밀안전진단': 5, '정밀안전검검': 25, '설계': 3, '감리': 0, '기타': 0, '합계': 33 },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation variant="default" forceLightTheme={true} />
      
      <div className="pt-32 pb-20">
        <div className="w-[90%] md:w-[85%] mx-auto">
          {/* 제목 섹션 */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-korean">
              분야별 수행실적
            </h1>
            <p className="text-lg text-slate-600 font-korean">
              대한민국상이군경회시설사업소의 전문적인 수행 실적을 확인하세요
            </p>
          </div>

          {/* 통계 요약 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <p className="text-slate-600 text-sm font-korean mb-2">정밀안전진단</p>
              <p className="text-3xl font-bold text-blue-600">{portfolioData.reduce((sum, d) => sum + d['정밀안전진단'], 0)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
              <p className="text-slate-600 text-sm font-korean mb-2">정밀안전검검</p>
              <p className="text-3xl font-bold text-cyan-500">{portfolioData.reduce((sum, d) => sum + d['정밀안전검검'], 0)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <p className="text-slate-600 text-sm font-korean mb-2">설계</p>
              <p className="text-3xl font-bold text-green-600">{portfolioData.reduce((sum, d) => sum + d['설계'], 0)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <p className="text-slate-600 text-sm font-korean mb-2">감리</p>
              <p className="text-3xl font-bold text-purple-600">{portfolioData.reduce((sum, d) => sum + d['감리'], 0)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
              <p className="text-slate-600 text-sm font-korean mb-2">합계</p>
              <p className="text-3xl font-bold text-orange-600">{portfolioData.reduce((sum, d) => sum + d['합계'], 0)}</p>
            </div>
          </div>

          {/* 테이블 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* 헤더 */}
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 to-slate-800">
                    <th className="px-6 py-4 text-left text-white font-korean font-semibold">연도</th>
                    <th className="px-6 py-4 text-center text-white font-korean font-semibold">정밀안전진단</th>
                    <th className="px-6 py-4 text-center text-white font-korean font-semibold">정밀안전검검</th>
                    <th className="px-6 py-4 text-center text-white font-korean font-semibold">설계</th>
                    <th className="px-6 py-4 text-center text-white font-korean font-semibold">감리</th>
                    <th className="px-6 py-4 text-center text-white font-korean font-semibold">기타</th>
                    <th className="px-6 py-4 text-center text-white font-korean font-semibold bg-gradient-to-r from-orange-600 to-orange-500">합계</th>
                  </tr>
                </thead>

                {/* 바디 */}
                <tbody>
                  {portfolioData.map((row, index) => (
                    <tr 
                      key={row.year}
                      className={`border-b transition-colors hover:bg-slate-50 ${
                        row.year % 2 === 2003 % 2 ? 'bg-slate-50' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-4 font-bold text-slate-900 font-korean">{row.year}</td>
                      <td className="px-6 py-4 text-center text-blue-600 font-semibold">{row['정밀안전진단']}</td>
                      <td className="px-6 py-4 text-center text-cyan-600 font-semibold">{row['정밀안전검검']}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{row['설계']}</td>
                      <td className="px-6 py-4 text-center text-purple-600 font-semibold">{row['감리']}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{row['기타']}</td>
                      <td className="px-6 py-4 text-center font-bold text-orange-600 bg-gradient-to-r from-orange-50 to-transparent">{row['합계']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 표 하단 설명 */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-700 font-korean">
                <span className="font-semibold">※ 기타</span> : 성능평가용역, 연구용역 등
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
