import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BookOpen } from 'lucide-react';

// 섹션 화면 비율 설정 (% 단위로 입력)
const HERO_WIDTH = 100; // Hero 섹션 너비
const CONTENT_WIDTH = 60; // 컨텐츠 섹션 너비

const LegalBasis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="default" forceLightTheme={true} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-hover text-white py-16">
          <div style={{ width: `${HERO_WIDTH}%`, margin: '0 auto' }} className="px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <BookOpen className="h-16 w-16 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-korean">
                수의계약 근거 법률조항
              </h1>
            </div>
          </div>
        </section>

        {/* Legal Content Section */}
        <section className="py-16 bg-background">
          <div style={{ width: `${CONTENT_WIDTH}%`, margin: '0 auto' }} className="px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
              <div className="text-base leading-10 font-korean text-foreground space-y-8" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                <div>
                  <p className="font-bold mb-2 text-lg">■ 수의계약 체결 가능한 법률조항</p>
                  <div className="ml-4 space-y-1">
                    <p>● 국가유공자등단체설립에 관한 법률 제17조</p>
                    <p>● 국가를 당사자로 하는 계약에 관한 법률 시행령 제26조 1항 4호 나목</p>
                    <p>● 지방자치단체를 당사자로 하는 계약에 관한 법률 시행령 제25조 1항 7의2호 가목</p>
                    <p>● 공기업·준정부기관 계약사무규칙</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold mb-2 text-lg">■ 수의계약관련 법률근거에 의한 질의회신자료</p>
                  <div className="ml-4 space-y-1">
                    <div className="flex">
                      <span className="w-96">► 서울특별시장(재무과-56218, 2013.12.21)</span>
                      <span>→ 금액제한없고/1인견적수의가능/적극지원</span>
                    </div>
                    <div className="flex">
                      <span className="w-96">► 경기도(회계과-31213, 2017.9.5)</span>
                      <span>→ 1인수의가능(설계,감리,진단) 적의처리하달</span>
                    </div>
                    <div className="flex">
                      <span className="w-96">► 인천광역시(회계계약심사과-22540, 2009.12.7)</span>
                      <span>→ 수의계약 가능 및 물품 제조/구매가능</span>
                    </div>
                    <div className="flex">
                      <span className="w-96">► 국방부(재정회계담당관-920, 2008.5.2)</span>
                      <span>→ 수의계약 가능 및 예하부대 하달공문</span>
                    </div>
                    <div className="flex">
                      <span className="w-96">► 재정경제부(회계제도과-340, 2005.2.18)</span>
                      <span>→ 수의계약가능 및 금액제한 없음</span>
                    </div>
                    <div className="flex">
                      <span className="w-96">► 기획재정부(회계제도과-112, 2010.1.18)</span>
                      <span>→ 수의계약시 적격심사 적용 제외</span>
                    </div>
                    <div className="flex">
                      <span className="w-96">► 국토해양부(건설경제과-1074, 2011.3.15)</span>
                      <span>→ 수의계약가능 확인</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold mb-2 text-lg">● <span style={{ textDecoration: 'underline' }}>국가유공자 등 단체 설립에 관한 법률 (약칭: 국가유공자단체법)</span></p>
                  <p className="text-xs text-gray-500 mb-2 text-right">[시행 2023.6.5] [법률 제19228호, 2023.3.4, 타법개정]</p>
                  <p style={{ color: '#2563eb' }} className="font-bold mb-2">제17조(국가유공자등단체의 수익사업)</p>
                  <div className="ml-4 space-y-2">
                    <p>① 이 법에 따라 설립된 국가유공자등단체는 <span style={{ color: '#2563eb', textDecoration: 'underline' }}>제1조</span>에 따른 설립목적을 달성하기 위하여 필요한 범위에서 <span style={{ color: '#2563eb', textDecoration: 'underline' }}>직접 수익사업을 할 수 있다.</span><span style={{ textDecoration: 'underline' }}>&lt;개정 2021.6.8.&gt;</span></p>
                    <p>② 국가, 지방자치단체 및 그 밖의 공공단체는 제1항에 따라 수익사업을 운영하는 국가유공자등단체 중 상이를 입은 사람을 회원으로 하는 국가유공자등단체가 직접 생산하는 물품을 구매하거나 해당 국가유공자등단체에 직접 물건을 매각 또는 임대하거나 해당 국가유공자등단체와 용역계약을 체결하는 경우에는 <span style={{ color: '#2563eb', textDecoration: 'underline' }}>수의계약으로 할 수 있다.</span><span style={{ textDecoration: 'underline' }}>&lt;개정 2021.6.8.&gt;</span></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold mb-2 text-lg">● <span style={{ textDecoration: 'underline' }}>국가보훈 기본법</span></p>
                  <p className="text-xs text-gray-500 mb-2 text-right">[시행 2024.2.13] [법률 제20278호, 2024.2.13. 일부개정]</p>
                  <p style={{ color: '#2563eb' }} className="font-bold mb-2">제5조(국가와 지방자치단체의 책무)</p>
                  <div className="ml-4 space-y-2">
                    <p style={{ color: '#2563eb' }}>① 국가와 지방자치단체는 희생·공헌자의 공훈과 나라사랑정신을 선양하고, 국가보훈대상자를 예우하는 기반을 조성하기 위하여 노력하여야 한다.</p>
                    <p style={{ color: '#2563eb' }}>② 국가와 지방자치단체는 제2조에 따른 기본이념을 구현하기 위하여 필요한 시책을 수립·시행하여야 한다.</p>
                    <p style={{ color: '#2563eb' }}>③ 국가와 지방자치단체는 국민 또는 주민의 복지와 관련된 정책을 수립·시행하거나 법령 등을 제정 또는 개정할 때에는 국가보훈대상자를 우선하여 배려하는 등 적극적 조치를 하여야 한다.</p>
                    <p style={{ color: '#dc2626', fontWeight: 'bold' }}>④ 국가와 지방자치단체는 국가보훈사업에 필요한 재원(財源) 조성에 노력하여야 한다.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold mb-2 text-lg">● <span style={{ textDecoration: 'underline' }}>국가를 당사자로 하는 계약에 관한 법률 시행령 (약칭: 국가계약법 시행령)</span></p>
                  <p className="text-xs text-gray-500 mb-2 text-right">[시행 2025.10.01.] [대통령령 제35811호, 2025.10.01. 타법개정]</p>
                  <p style={{ color: '#2563eb' }} className="font-bold mb-2">제26조(수의계약에 의할 수 있는 경우)</p>
                  <div className="ml-4 space-y-2">
                    <p style={{ color: '#2563eb' }}>① 법 제7조제1항 단서에 따라 수의계약을 할 수 있는 경우는 다음 각 호와 같다.</p>
                    <div className="ml-4">
                      <p>1. 경쟁에 부칠 여유가 없거나 경쟁에 부쳐서는 계약의 목적을 달성하기 곤란하다고 판단되는 경우로서 다음 각 목의 경우(가~라 : 4개 목)</p>
                      <p style={{ color: '#2563eb' }}>4. 국가유공자 또는 장애인 등에게 일자리나 보훈ㆍ복지서비스 등을 제공하기 위한 목적으로 설립된 다음 각 목의 어느 하나에 해당하는 단체 등과 물품의 제조ㆍ구매 또는 용역 계약(해당 단체가 직접 생산하는 물품 및 직접 수행하는 용역에 한정한다)을 체결하거나, 그 단체 등에 직접 물건을 매각ㆍ임대하는 경우</p>
                      <div className="ml-4 space-y-1">
                        <p style={{ color: '#2563eb' }}>가. 국가보훈부장관이 지정하는 국가유공자 자활집단촌의 복지공장</p>
                        <p style={{ color: '#dc2626', fontWeight: 'bold' }}>나. <span style={{ textDecoration: 'underline' }}>「국가유공자 등 단체설립에 관한 법률」</span>에 따라 설립된 단체 중 상이를 입은 자들로 구성된 단체</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold mb-2 text-lg">● <span style={{ textDecoration: 'underline' }}>지방자치단체를 당사자로 하는 계약에 관한 법률 시행령 (약칭: 지방계약법 시행령)</span></p>
                  <p className="text-xs text-gray-500 mb-2 text-right">[시행 2025.10.01] [대통령령 제35811호, 2025.10.01 타법개정]</p>
                  <p style={{ color: '#2563eb' }} className="font-bold mb-2">제25조(수의계약에 의할 수 있는 경우)</p>
                  <div className="ml-4 space-y-2">
                    <p>① 지방자치단체의 장 또는 계약담당자는 다음 각 호의 어느 하나에 해당하는 경우에는 법 제9조제1항 단서에 따라 수의계약을 할 수 있다.</p>
                    <div className="ml-4">
                      <p style={{ fontWeight: 'bold' }}>7의2. 국가유공자 또는 장애인 등에게 일자리나 보훈ㆍ복지서비스 등을 제공하기 위한 경우로서 다음 각 목의 경우</p>
                      <div className="ml-4">
                        <p style={{ color: '#dc2626', fontWeight: 'bold' }}>가. 「국가유공자 등 단체 설립에 관한 법률」 제1조에 따라 설립된 단체 중 상이(傷痍)를 입은 사람들로 구성된 단체가 직접 생산하는 물품의 제조ㆍ구매 또는 직접 수행하는 용역계약을 하거나 이들에게 직접 물품을 매각 또는 임대하는 경우</p>
                      </div>
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
