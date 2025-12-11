import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Scale } from 'lucide-react';

// 섹션 화면 비율 설정 (% 단위로 입력)
const HERO_WIDTH = 100; // Hero 섹션 너비
const CONTENT_WIDTH = 65; // 컨텐츠 섹션 너비

const LegalBasis = () => {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      const elementHeight = elementRect.height;
      const elementCenter = elementTop + (elementHeight / 2);
      const viewportHeight = window.innerHeight;
      const scrollPosition = elementCenter - (viewportHeight / 2);
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="default" forceLightTheme={true} />
      
      <main className="pt-20">
        {/* Document Header */}
        <section className="relative text-white" style={{ backgroundColor: '#0b1c2b' }}>
          <Scale className="absolute left-[150px] top-1/2 -translate-y-1/2 w-40 h-40 text-white opacity-20" />
          <div style={{ width: `${HERO_WIDTH}%`, margin: '0 auto' }} className="px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-6xl mx-auto">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight font-korean">수의계약 근거 법률조항</h1>
                <p className="mt-1 text-sm text-white/70 font-korean">법률·시행령 각 조문에 근거한 수의계약 체결 요건 정리</p>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/70 font-korean">
                <div className="rounded-md bg-white/5 ring-1 ring-white/10 px-3 py-2">문서유형: 법률근거 안내</div>
                <div className="rounded-md bg-white/5 ring-1 ring-white/10 px-3 py-2">작성부서: 시설사업소</div>
                <div className="rounded-md bg-white/5 ring-1 ring-white/10 px-3 py-2">최종개정: 2025-10-01</div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Content Section */}
        <section className="py-14 bg-background">
          <div style={{ width: `${CONTENT_WIDTH}%`, margin: '0 auto' }} className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* TOC */}
              <aside className="lg:col-span-3">
                <div className="sticky top-28">
                  <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
                    <div className="mb-3">
                      <p className="text-sm font-semibold tracking-wide font-korean">목차</p>
                    </div>
                    <nav aria-label="Table of contents" className="text-sm font-korean">
                      <ul className="space-y-2">
                        <li><a href="#laws-list" onClick={(e) => handleScrollToSection(e, 'laws-list')} style={{ color: '#0C2B4B' }} className="hover:underline transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = '#0B1C2B'} onMouseLeave={(e) => e.currentTarget.style.color = '#0C2B4B'}>수의계약 체결 가능한 법률조항</a></li>
                        <li><a href="#qa" onClick={(e) => handleScrollToSection(e, 'qa')} style={{ color: '#0C2B4B' }} className="hover:underline transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = '#0B1C2B'} onMouseLeave={(e) => e.currentTarget.style.color = '#0C2B4B'}>질의회신자료</a></li>
                        <li className="space-y-2" style={{ color: '#0B1C2B' }}>관련 법령</li>
                        <li className="ml-3"><a href="#act-veterans" onClick={(e) => handleScrollToSection(e, 'act-veterans')} style={{ color: '#0C2B4B' }} className="hover:underline transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = '#0B1C2B'} onMouseLeave={(e) => e.currentTarget.style.color = '#0C2B4B'}>- 국가유공자단체법</a></li>
                        <li className="ml-3"><a href="#basiclaw-veterans" onClick={(e) => handleScrollToSection(e, 'basiclaw-veterans')} style={{ color: '#0C2B4B' }} className="hover:underline transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = '#0B1C2B'} onMouseLeave={(e) => e.currentTarget.style.color = '#0C2B4B'}>- 국가보훈 기본법</a></li>
                        <li className="ml-3"><a href="#decree-national" onClick={(e) => handleScrollToSection(e, 'decree-national')} style={{ color: '#0C2B4B' }} className="hover:underline transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = '#0B1C2B'} onMouseLeave={(e) => e.currentTarget.style.color = '#0C2B4B'}>- 국가계약법 시행령</a></li>
                        <li className="ml-3"><a href="#decree-local" onClick={(e) => handleScrollToSection(e, 'decree-local')} style={{ color: '#0C2B4B' }} className="hover:underline transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = '#0B1C2B'} onMouseLeave={(e) => e.currentTarget.style.color = '#0C2B4B'}>- 지방계약법 시행령</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Content */}
              <div className="lg:col-span-9">
                <div className="bg-white rounded-xl shadow-sm border border-border">
                  <div className="p-7 md:p-8 text-base leading-8 font-korean text-foreground space-y-10" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    {/* Summary Callout */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
                      <p className="text-sm font-semibold text-blue-900 mb-2">핵심 요약</p>
                      <p className="text-blue-900/90">상이군경 등으로 구성된 단체가 직접 수행하는 용역·물품에 대하여, 국가·지자체 및 공공기관은 관련 법률 및 시행령에 근거하여 수의계약 체결이 가능함.</p>
                    </div>

                    {/* List of laws */}
                    <section id="laws-list">
                      <h2 className="text-xl font-bold mb-3 tracking-tight">■ 수의계약 체결 가능한 법률조항</h2>
                      <div className="ml-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <p>국가유공자등단체설립에 관한 법률 제17조</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <p>국가를 당사자로 하는 계약에 관한 법률 시행령 제26조 1항 4호 나목</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <p>지방자치단체를 당사자로 하는 계약에 관한 법률 시행령 제25조 1항 7의2호 가목</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <p>공기업·준정부기관 계약사무규칙</p>
                        </div>
                      </div>
                    </section>

                    {/* Q&A references */}
                    <section id="qa">
                      <h2 className="text-xl font-bold mb-3 tracking-tight">■ 수의계약관련 법률근거에 의한 질의회신자료</h2>
                      <div className="rounded-md border border-slate-200 p-5 space-y-3">
                        <div className="space-y-3">
                          <div className="border-b border-slate-100 pb-3 last:border-b-0">
                            <p className="text-sm font-semibold text-foreground mb-1">► 서울특별시장(재무과-56218, 2013.12.21)</p>
                            <p className="text-sm text-foreground/70 ml-4">→ 금액제한없고/1인견적수의가능/적극지원</p>
                          </div>
                          <div className="border-b border-slate-100 pb-3 last:border-b-0">
                            <p className="text-sm font-semibold text-foreground mb-1">► 경기도(회계과-31213, 2017.9.5)</p>
                            <p className="text-sm text-foreground/70 ml-4">→ 1인수의가능(설계,감리,진단) 적의처리하달</p>
                          </div>
                          <div className="border-b border-slate-100 pb-3 last:border-b-0">
                            <p className="text-sm font-semibold text-foreground mb-1">► 인천광역시(회계계약심사과-22540, 2009.12.7)</p>
                            <p className="text-sm text-foreground/70 ml-4">→ 수의계약 가능 및 물품 제조/구매가능</p>
                          </div>
                          <div className="border-b border-slate-100 pb-3 last:border-b-0">
                            <p className="text-sm font-semibold text-foreground mb-1">► 국방부(재정회계담당관-920, 2008.5.2)</p>
                            <p className="text-sm text-foreground/70 ml-4">→ 수의계약 가능 및 예하부대 하달공문</p>
                          </div>
                          <div className="border-b border-slate-100 pb-3 last:border-b-0">
                            <p className="text-sm font-semibold text-foreground mb-1">► 재정경제부(회계제도과-340, 2005.2.18)</p>
                            <p className="text-sm text-foreground/70 ml-4">→ 수의계약가능 및 금액제한 없음</p>
                          </div>
                          <div className="border-b border-slate-100 pb-3 last:border-b-0">
                            <p className="text-sm font-semibold text-foreground mb-1">► 기획재정부(회계제도과-112, 2010.1.18)</p>
                            <p className="text-sm text-foreground/70 ml-4">→ 수의계약시 적격심사 적용 제외</p>
                          </div>
                          <div className="border-b border-slate-100 pb-3 last:border-b-0">
                            <p className="text-sm font-semibold text-foreground mb-1">► 국토해양부(건설경제과-1074, 2011.3.15)</p>
                            <p className="text-sm text-foreground/70 ml-4">→ 수의계약가능 확인</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Related Laws Section Title */}
                    <section className="pt-2 border-t border-gray-200">
                      <h2 className="text-xl font-bold mb-3 tracking-tight">■ 관련 법령</h2>
                    </section>

                    {/* Law sections */}
                    <section id="act-veterans" className="pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <h3 className="font-bold mb-2 text-lg"><span style={{ textDecoration: 'underline' }}>국가유공자단체법</span></h3>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">시행 2023.6.5<span className="text-slate-400">/</span> 법률 제19228호</span>
                      </div>
                      <div className="rounded-md border border-slate-200 p-5 bg-slate-50/50">
                        <p className="text-primary font-bold mb-2">제17조(국가유공자등단체의 수익사업)</p>
                        <div className="ml-4 space-y-2">
                          <p>① 이 법에 따라 설립된 국가유공자등단체는 <span style={{ color: '#0024FF', textDecoration: 'underline' }}>제1조</span>에 따른 설립목적을 달성하기 위하여 필요한 범위에서 <span style={{ color: '#0024FF', textDecoration: 'underline' }}>직접 수익사업을 할 수 있다.</span><span style={{ textDecoration: 'underline' }}>&lt;개정 2021.6.8.&gt;</span></p>
                          <p>② 국가, 지방자치단체 및 그 밖의 공공단체는 제1항에 따라 수익사업을 운영하는 국가유공자등단체 중 상이를 입은 사람을 회원으로 하는 국가유공자등단체가 직접 생산하는 물품을 구매하거나 해당 국가유공자등단체에 직접 물건을 매각 또는 임대하거나 해당 국가유공자등단체와 용역계약을 체결하는 경우에는 <span style={{ color: '#0024FF', textDecoration: 'underline' }}>수의계약으로 할 수 있다.</span><span style={{ textDecoration: 'underline' }}>&lt;개정 2021.6.8.&gt;</span></p>
                        </div>
                      </div>
                    </section>

                    <section id="basiclaw-veterans" className="pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <h3 className="font-bold mb-2 text-lg"><span style={{ textDecoration: 'underline' }}>국가보훈 기본법</span></h3>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">시행 2024.2.13<span className="text-slate-400">/</span> 법률 제20278호</span>
                      </div>
                      <div className="rounded-md border border-slate-200 p-5">
                        <p className="text-primary font-bold mb-2">제5조(국가와 지방자치단체의 책무)</p>
                        <div className="ml-4 space-y-2">
                          <p style={{ color: '#0024FF' }}>① 국가와 지방자치단체는 희생·공헌자의 공훈과 나라사랑정신을 선양하고, 국가보훈대상자를 예우하는 기반을 조성하기 위하여 노력하여야 한다.</p>
                          <p style={{ color: '#0024FF' }}>② 국가와 지방자치단체는 제2조에 따른 기본이념을 구현하기 위하여 필요한 시책을 수립·시행하여야 한다.</p>
                          <p style={{ color: '#0024FF' }}>③ 국가와 지방자치단체는 국민 또는 주민의 복지와 관련된 정책을 수립·시행하거나 법령 등을 제정 또는 개정할 때에는 국가보훈대상자를 우선하여 배려하는 등 적극적 조치를 하여야 한다.</p>
                          <p style={{ color: '#ED1C24', fontWeight: 'bold' }}>④ 국가와 지방자치단체는 국가보훈사업에 필요한 재원(財源) 조성에 노력하여야 한다.</p>
                        </div>
                      </div>
                    </section>

                    <section id="decree-national" className="pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <h3 className="font-bold mb-2 text-lg"><span style={{ textDecoration: 'underline' }}>국가계약법 시행령</span></h3>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">시행 2025.10.01<span className="text-slate-400">/</span> 대통령령 제35811호</span>
                      </div>
                      <div className="rounded-md border border-slate-200 p-5">
                        <p className="text-primary font-bold mb-2">제26조(수의계약에 의할 수 있는 경우)</p>
                        <div className="ml-4 space-y-2">
                          <p style={{ color: '#0024FF' }}>① 법 제7조제1항 단서에 따라 수의계약을 할 수 있는 경우는 다음 각 호와 같다.</p>
                          <div className="ml-4">
                            <p>1. 경쟁에 부칠 여유가 없거나 경쟁에 부쳐서는 계약의 목적을 달성하기 곤란하다고 판단되는 경우로서 다음 각 목의 경우(가~라 : 4개 목)</p>
                            <p style={{ color: '#0024FF' }}>4. 국가유공자 또는 장애인 등에게 일자리나 보훈ㆍ복지서비스 등을 제공하기 위한 목적으로 설립된 다음 각 목의 어느 하나에 해당하는 단체 등과 물품의 제조ㆍ구매 또는 용역 계약(해당 단체가 직접 생산하는 물품 및 직접 수행하는 용역에 한정한다)을 체결하거나, 그 단체 등에 직접 물건을 매각ㆍ임대하는 경우</p>
                            <div className="ml-4 space-y-1">
                              <p style={{ color: '#0024FF' }}>가. 국가보훈부장관이 지정하는 국가유공자 자활집단촌의 복지공장</p>
                              <p style={{ color: '#ED1C24', fontWeight: 'bold' }}>나. <span style={{ textDecoration: 'underline' }}>「국가유공자 등 단체설립에 관한 법률」</span>에 따라 설립된 단체 중 상이를 입은 자들로 구성된 단체</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="decree-local" className="pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          <h3 className="font-bold mb-2 text-lg"><span style={{ textDecoration: 'underline' }}>지방계약법 시행령</span></h3>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">시행 2025.10.01<span className="text-slate-400">/</span> 대통령령 제35811호</span>
                      </div>
                      <div className="rounded-md border border-slate-200 p-5">
                        <p className="text-primary font-bold mb-2">제25조(수의계약에 의할 수 있는 경우)</p>
                        <div className="ml-4 space-y-2">
                          <p>① 지방자치단체의 장 또는 계약담당자는 다음 각 호의 어느 하나에 해당하는 경우에는 법 제9조제1항 단서에 따라 수의계약을 할 수 있다.</p>
                          <div className="ml-4">
                            <p style={{ fontWeight: 'bold' }}>7의2. 국가유공자 또는 장애인 등에게 일자리나 보훈ㆍ복지서비스 등을 제공하기 위한 경우로서 다음 각 목의 경우</p>
                            <div className="ml-4">
                              <p style={{ color: '#ED1C24', fontWeight: 'bold' }}>가. 「국가유공자 등 단체 설립에 관한 법률」 제1조에 따라 설립된 단체 중 상이(傷痍)를 입은 사람들로 구성된 단체가 직접 생산하는 물품의 제조ㆍ구매 또는 직접 수행하는 용역계약을 하거나 이들에게 직접 물품을 매각 또는 임대하는 경우</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Footer note */}
                    <div className="pt-4 text-xs text-foreground/60">
                      <p>본 안내는 관련 법령의 이해를 돕기 위한 자료이며, 구체적인 계약 체결에 앞서 해당 기관의 계약 지침을 확인하시기 바랍니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LegalBasis;
