import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
  const totals = React.useMemo(() => {
    const totalProjects = portfolioData.reduce((sum, d) => sum + d['합계'], 0);
    const diagnosis = portfolioData.reduce((sum, d) => sum + d['정밀안전진단'], 0);
    const inspection = portfolioData.reduce((sum, d) => sum + d['정밀안전검검'], 0);
    const design = portfolioData.reduce((sum, d) => sum + d['설계'], 0);
    const supervision = portfolioData.reduce((sum, d) => sum + d['감리'], 0);
    const years = portfolioData.length;
    const avgPerYear = Math.round(totalProjects / (years || 1));

    const lastYear = Math.max(...portfolioData.map((d) => d.year));
    const prevYear = lastYear - 1;
    const lastTotal = portfolioData.find((d) => d.year === lastYear)?.['합계'] ?? 0;
    const prevTotal = portfolioData.find((d) => d.year === prevYear)?.['합계'] ?? 0;
    const yoy = prevTotal ? ((lastTotal - prevTotal) / prevTotal) * 100 : 0;

    return { totalProjects, diagnosis, inspection, design, supervision, years, avgPerYear, lastYear, yoy };
  }, []);


  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="default" forceLightTheme={true} />

      <div className="pt-28 pb-20">
        {/* 풀폭 헤더 배너 (배경 이미지 + 중앙 정렬 텍스트) */}
        <section className="relative overflow-hidden text-white mb-40">
          <div className="absolute inset-0">
            <img
              src="/portfolio/performance4.jpg"
              alt="Portfolio hero background"
              className="h-full w-full object-cover"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                const attempt = parseInt(t.dataset.attempt || '0', 10);
                const attempts = [
                  '/portfolio/performance4.jpg',
                  '/portfolio/performance4.JPG',
                  '/portfolio/performance1.jpg',
                  '/portfolio/performance1.JPG',
                  '/portfolio/performance5.jpg',
                  '/portfolio/performance5.JPG',
                  '/logo3.png',
                ];
                if (attempt < attempts.length - 1) {
                  t.src = attempts[attempt + 1];
                  t.dataset.attempt = String(attempt + 1);
                }
              }}
              data-attempt="0"
            />
            <div className="absolute inset-0 bg-slate-900/60" />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
            <div className="w-[75%] mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-korean">분야별 수행실적</h1>
              <p className="mt-3 text-sm md:text-base text-white/85 font-korean">정밀안전진단•정밀안전점검•엔지니어링 설계•설계/사업관리</p>
            </div>
          </div>
        </section>
        <div className="w-[75%] mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-300 pt-12">
          {/* 정밀안전진단 섹션 (좌측 설명 + 우측 6장 그리드) */}
          <section className="mb-40 pb-12 border-b border-slate-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <aside className="lg:col-span-4">
                <h2 className="text-2xl md:text-3xl font-extrabold font-korean tracking-tight">정밀안전진단</h2>
                <p className="mt-3 text-sm text-slate-600 font-korean">예시 문구: 2003년부터 2025년까지 전국 주요 구조물에 대해 수행된 정밀안전진단 용역의 일부 사례입니다.</p>
                <ul className="mt-6 space-y-3 text-sm font-korean">
                  <li className="flex items-center justify-between border-b border-slate-200 pb-2"><span>2025 · ○○교 정밀안전진단</span><span className="text-slate-400">서울</span></li>
                  <li className="flex items-center justify-between border-b border-slate-200 pb-2"><span>2024 · △△ 터널 정밀안전진단</span><span className="text-slate-400">부산</span></li>
                  <li className="flex items-center justify-between border-b border-slate-200 pb-2"><span>2023 · □□댐 정밀안전진단</span><span className="text-slate-400">강원</span></li>
                  <li className="flex items-center justify-between border-b border-slate-200 pb-2"><span>2022 · ○○교차로 램프 정밀안전진단</span><span className="text-slate-400">대전</span></li>
                  <li className="flex items-center justify-between border-b border-slate-200 pb-2"><span>2021 · 해상교량 케이블 점검</span><span className="text-slate-400">인천</span></li>
                  <li className="flex items-center justify-between"><span>2020 · 광역철도 구조물 조사</span><span className="text-slate-400">경기</span></li>
                </ul>
              </aside>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map((idx) => (
                    <figure key={idx} className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-slate-200 bg-slate-100">
                      <img
                        src={`/portfolio/performance${idx}.jpg`}
                        alt={`정밀안전진단 사례 ${idx}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement;
                          const attemptCount = parseInt(t.dataset.attempt || '0', 10);
                          // 실제 파일 확장자에 맞게 시도: .jpg -> .JPG
                          const attempts = [
                            `/portfolio/performance${idx}.jpg`,
                            `/portfolio/performance${idx}.JPG`,
                          ];
                          if (attemptCount < attempts.length - 1) {
                            t.src = attempts[attemptCount + 1];
                            t.dataset.attempt = String(attemptCount + 1);
                          }
                        }}
                        data-attempt="0"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </section>

          

          {/* KPI 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            <Card className="border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">총 수행건수</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-slate-900 tabular-nums">{totals.totalProjects.toLocaleString()}</div>
                  <div className={`flex items-center gap-1 text-xs ${totals.yoy >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totals.yoy >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="font-medium">
                      {Math.abs(totals.yoy).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-500">전년 대비 (기준년도 {totals.lastYear})</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">정밀안전진단</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-blue-600 tabular-nums">{totals.diagnosis.toLocaleString()}</div>
                <p className="mt-1 text-xs text-slate-500">누적</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">정밀안전점검</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-cyan-600 tabular-nums">{totals.inspection.toLocaleString()}</div>
                <p className="mt-1 text-xs text-slate-500">누적</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">엔지니어링 설계</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-green-600 tabular-nums">{totals.design.toLocaleString()}</div>
                <p className="mt-1 text-xs text-slate-500">누적</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">설계/사업관리(감리)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-purple-600 tabular-nums">{totals.supervision.toLocaleString()}</div>
                <p className="mt-1 text-xs text-slate-500">누적</p>
              </CardContent>
            </Card>
          </div>

          {/* 세부 표 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-korean">연도별 상세 내역</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-base" style={{ tableLayout: 'fixed' }}>
                      <thead className="sticky top-0 z-10">
                        <tr className="bg-slate-100/80 backdrop-blur supports-[backdrop-filter]:bg-slate-100/60">
                          <th className="px-4 py-4 text-center text-slate-700 font-korean font-semibold border-r border-slate-200" style={{ width: '8%' }}>구분</th>
                          <th className="px-4 py-4 text-center text-slate-700 font-korean font-semibold border-r border-slate-200" style={{ width: '18%' }}>정밀안전진단</th>
                          <th className="px-4 py-4 text-center text-slate-700 font-korean font-semibold border-r border-slate-200" style={{ width: '18%' }}>정밀안전점검</th>
                          <th className="px-4 py-4 text-center text-slate-700 font-korean font-semibold border-r border-slate-200" style={{ width: '18%' }}>엔지니어링 설계</th>
                          <th className="px-4 py-4 text-center text-slate-700 font-korean font-semibold border-r border-slate-200" style={{ width: '18%' }}>설계/사업관리(감리)</th>
                          <th className="px-4 py-4 text-center text-slate-700 font-korean font-semibold border-r border-slate-200" style={{ width: '10%' }}>기타</th>
                          <th className="px-4 py-4 text-center text-slate-700 font-korean font-semibold" style={{ width: '10%' }}>합계</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioData.map((row) => (
                          <tr key={row.year} className="border-b hover:bg-slate-50">
                            <td className="px-4 py-4 text-center font-semibold text-slate-900 font-korean border-r border-slate-200">{row.year}</td>
                            <td className="px-4 py-4 text-center text-blue-700 font-medium border-r border-slate-200">{row['정밀안전진단']}</td>
                            <td className="px-4 py-4 text-center text-cyan-700 font-medium border-r border-slate-200">{row['정밀안전검검']}</td>
                            <td className="px-4 py-4 text-center text-green-700 font-medium border-r border-slate-200">{row['설계']}</td>
                            <td className="px-4 py-4 text-center text-purple-700 font-medium border-r border-slate-200">{row['감리']}</td>
                            <td className="px-4 py-4 text-center text-slate-700 border-r border-slate-200">{row['기타']}</td>
                            <td className="px-4 py-4 text-center font-bold text-orange-600">{row['합계']}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-1 pt-3">
                    <p className="text-xs text-slate-500 font-korean text-right">
                      <span className="font-semibold">※ 기타</span> : 성능평가용역, 연구용역 등
                    </p>
                  </div>
                </CardContent>
              </Card>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Portfolio;
