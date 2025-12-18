import React, { useEffect, useMemo, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { withBaseUrl } from '@/lib/utils';

interface PortfolioData {
  year: number;
  '정밀안전진단': number;
  '정밀안전검검': number;
  '설계': number;
  '감리': number;
  '기타': number;
  '합계': number;
}

interface PerformanceRecord {
  year: string;
  contractName: string;
  client: string;
  method: string;
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

const PerformanceTableSection = ({
  id,
  title,
  records,
  description,
}: {
  id: string;
  title: string;
  records: PerformanceRecord[];
  description: string;
}) => {
  if (records.length === 0) return null;

  return (
    <section id={id} className="mt-16 scroll-mt-32">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-xl md:text-2xl font-extrabold font-korean tracking-tight">
          {title}
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-korean">
          {records.length.toLocaleString()}
          {description}
        </p>
      </div>
      <Card className="shadow-sm border-slate-200">
        <CardContent className="pt-4">
          <div className="overflow-hidden rounded-xl border border-slate-200/80">
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th
                      className="px-3 py-3 text-center text-white font-korean font-semibold border-r border-slate-200"
                      style={{ width: '8%', backgroundColor: '#0C2B4B' }}
                    >
                      년도
                    </th>
                    <th
                      className="px-3 py-3 text-center text-white font-korean font-semibold border-r border-slate-200"
                      style={{ width: '42%', backgroundColor: '#0C2B4B' }}
                    >
                      계약명
                    </th>
                    <th
                      className="px-3 py-3 text-center text-white font-korean font-semibold border-r border-slate-200"
                      style={{ width: '30%', backgroundColor: '#0C2B4B' }}
                    >
                      발주처
                    </th>
                    <th
                      className="px-3 py-3 text-center text-white font-korean font-semibold"
                      style={{ width: '20%', backgroundColor: '#0C2B4B' }}
                    >
                      계약방법
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((row, index) => (
                    <tr
                      key={`${row.year}-${index}`}
                      className={
                        'border-b border-slate-100 last:border-b-0 transition-colors ' +
                        (index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60') +
                        ' hover:bg-blue-50/60'
                      }
                    >
                      <td className="px-3 py-2 text-center font-korean text-slate-900 border-r border-slate-200">
                        {row.year}
                      </td>
                      <td className="px-3 py-2 text-left font-korean text-slate-900 border-r border-slate-200 break-words">
                        {row.contractName}
                      </td>
                      <td className="px-3 py-2 text-left font-korean text-slate-900 border-r border-slate-200 break-words">
                        {row.client}
                      </td>
                      <td className="px-3 py-2 text-center font-korean text-slate-900">
                        {row.method ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs md:text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
                            {row.method}
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const Portfolio = () => {
  const [tunnelRecords, setTunnelRecords] = useState<PerformanceRecord[]>([]);
  const [suriRecords, setSuriRecords] = useState<PerformanceRecord[]>([]);
  const [designRecords, setDesignRecords] = useState<PerformanceRecord[]>([]);
  const [gamRiRecords, setGamRiRecords] = useState<PerformanceRecord[]>([]);

  const totals = useMemo(() => {
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

  // 이미지 경로 헬퍼 함수 (certification과 동일한 패턴)
  const getImagePath = (filename: string) => {
    return withBaseUrl(`portfolio/${filename}`);
  };

  // 텍스트 기반 수행실적 데이터 로드 (교량/터널, 수리, 설계, 감리)
  useEffect(() => {
    const loadRecords = async (filename: string): Promise<PerformanceRecord[]> => {
      try {
        const baseUrl = import.meta.env.BASE_URL;
        const response = await fetch(`${baseUrl}portfolio/${filename}`);
        if (!response.ok) {
          return [];
        }
        const text = await response.text();
        const lines = text.split(/\r?\n/);

        const records: PerformanceRecord[] = lines
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => {
            const parts = line.split('/');
            const year = (parts[0] ?? '').trim();
            const contractName = (parts[1] ?? '').trim();
            const client = (parts[2] ?? '').trim();
            let method = (parts[3] ?? '').trim();

            // 양쪽 따옴표 제거 등 간단 정리
            method = method.replace(/^"+|"+$/g, '').trim();

            return {
              year,
              contractName,
              client,
              method,
            };
          });

        return records;
      } catch (error) {
        console.error('Failed to load performance data:', error);
        return [];
      }
    };

    const loadAll = async () => {
      const [tunnel, suri, design, gamri] = await Promise.all([
        loadRecords('tunnel.txt'),
        loadRecords('Suri.txt'),
        loadRecords('Construction.txt'),
        loadRecords('GamRi.txt'),
      ]);

      setTunnelRecords(tunnel);
      setSuriRecords(suri);
      setDesignRecords(design);
      setGamRiRecords(gamri);
    };

    loadAll();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="default" forceLightTheme={true} />

      <div className="pt-28 pb-20">
        {/* 풀폭 헤더 배너 (배경 이미지 + 중앙 정렬 텍스트) */}
        <section className="relative overflow-hidden text-white mb-40">
          <div className="absolute inset-0">
            <img
              src={getImagePath('performance4.jpg')}
              alt="Portfolio hero background"
              className="h-full w-full object-cover"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                const attempt = parseInt(t.dataset.attempt || '0', 10);
                // 실제 존재하는 파일만 시도: performance4 (jpg/JPG), performance1 (JPG/jpg), performance5 (jpg/JPG)
                const attempts = [
                  getImagePath('performance4.jpg'),
                  getImagePath('performance4.JPG'),
                  getImagePath('performance1.JPG'),
                  getImagePath('performance1.jpg'),
                  getImagePath('performance5.jpg'),
                  getImagePath('performance5.JPG'),
                ];
                if (attempt < attempts.length - 1) {
                  t.src = attempts[attempt + 1];
                  t.dataset.attempt = String(attempt + 1);
                } else {
                  // 모든 시도 실패 시 에러 핸들러 제거하여 무한 루프 방지
                  t.onerror = null;
                  t.style.display = 'none';
                }
              }}
              data-attempt="0"
            />
            <div className="absolute inset-0 bg-slate-900/60" />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
            <div className="w-[75%] mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-korean">분야별 수행실적</h1>
              <p className="mt-3 text-sm md:text-base text-white/85 font-korean">정밀안전진단•정밀안전점검•엔지니어링 설계•건설사업관리</p>
            </div>
          </div>
        </section>
        <div className="w-[75%] mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-300 pt-12">
          {/* KPI 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            <Card className="border-2 border-[#0C2B4B]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">총 수행건수</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-slate-900 tabular-nums flex items-baseline gap-2">
                  {totals.totalProjects.toLocaleString()}
                  <span className="text-sm font-medium text-slate-600 font-korean">건</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0C2B4B]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">정밀안전진단</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-blue-600 tabular-nums flex items-baseline gap-2">
                  {totals.diagnosis.toLocaleString()}
                  <span className="text-sm font-medium text-slate-600 font-korean">건</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0C2B4B]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">정밀안전점검</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold tabular-nums flex items-baseline gap-2" style={{ color: '#D10000' }}>
                  {totals.inspection.toLocaleString()}
                  <span className="text-sm font-medium text-slate-600 font-korean">건</span>
                </div>
                
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0C2B4B]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">엔지니어링 설계</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold tabular-nums flex items-baseline gap-2" style={{ color: '#0EB500' }}>
                  {totals.design.toLocaleString()}
                  <span className="text-sm font-medium text-slate-600 font-korean">건</span>
                </div>
                
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0C2B4B]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 font-korean">건설사업관리</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-purple-600 tabular-nums flex items-baseline gap-2">
                  {totals.supervision.toLocaleString()}
                  <span className="text-sm font-medium text-slate-600 font-korean">건</span>
                </div>
                
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
                    <tr>
                      <th className="px-4 py-4 text-center text-white font-korean font-semibold border-r border-slate-200" style={{ width: '8%', backgroundColor: '#0C2B4B' }}>구분</th>
                      <th className="px-4 py-4 text-center text-white font-korean font-semibold border-r border-slate-200" style={{ width: '18%', backgroundColor: '#0C2B4B' }}>정밀안전진단</th>
                      <th className="px-4 py-4 text-center text-white font-korean font-semibold border-r border-slate-200" style={{ width: '18%', backgroundColor: '#0C2B4B' }}>정밀안전점검</th>
                      <th className="px-4 py-4 text-center text-white font-korean font-semibold border-r border-slate-200" style={{ width: '18%', backgroundColor: '#0C2B4B' }}>엔지니어링 설계</th>
                      <th className="px-4 py-4 text-center text-white font-korean font-semibold border-r border-slate-200" style={{ width: '18%', backgroundColor: '#0C2B4B' }}>건설사업관리</th>
                      <th className="px-4 py-4 text-center text-white font-korean font-semibold border-r border-slate-200" style={{ width: '10%', backgroundColor: '#0C2B4B' }}>기타</th>
                      <th className="px-4 py-4 text-center text-white font-korean font-semibold" style={{ width: '10%', backgroundColor: '#0C2B4B' }}>합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.map((row) => (
                      <tr key={row.year} className="border-b hover:bg-slate-50">
                        <td className="px-4 py-4 text-center font-semibold text-slate-900 font-korean border-r border-slate-200">{row.year}</td>
                        <td className="px-4 py-4 text-center text-blue-700 font-medium border-r border-slate-200">{row['정밀안전진단']}</td>
                        <td className="px-4 py-4 text-center font-medium border-r border-slate-200" style={{ color: '#D10000' }}>{row['정밀안전검검']}</td>
                        <td className="px-4 py-4 text-center font-medium border-r border-slate-200" style={{ color: '#0EB500' }}>{row['설계']}</td>
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

          <PerformanceTableSection
            id="portfolio-safety-bridge-tunnel"
            title="안전진단 수행실적 - 교량및터널"
            records={tunnelRecords}
            description="건의 교량 및 터널 관련 수행실적"
          />

          <PerformanceTableSection
            id="portfolio-safety-suri"
            title="안전진단 수행실적 - 수리"
            records={suriRecords}
            description="건의 수리 관련 수행실적"
          />

          <PerformanceTableSection
            id="portfolio-design"
            title="설계 수행실적"
            records={designRecords}
            description="건의 설계 관련 수행실적"
          />

          <PerformanceTableSection
            id="portfolio-supervision"
            title="건설사업관리 실적"
            records={gamRiRecords}
            description="건의 건설사업관리 관련 수행실적"
          />
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Portfolio;
