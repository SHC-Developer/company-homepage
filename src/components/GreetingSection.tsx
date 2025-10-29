import React from 'react';

export const GreetingSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] to-[#f5f3f0] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 상단 섹션 */}
        <div className="mb-16">
          <div className="text-sm font-medium text-[#1e40af] mb-4 tracking-wider">
            CEO'S MESSAGE
          </div>
          
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e40af] leading-tight tracking-tight">
              A SOLUTION PROVIDER WITH<br />
              CREATIVE & INNOVATIVE TECHNIQUES
            </h1>
          </div>
          
          <div className="space-y-2 text-lg text-[#1e40af] font-medium">
            <p>창의적인 아이디어로 기술 혁신을 성취하기 위하여 노력하는 기업을 목표로...</p>
            <p>보다 안전하게 / 보다 편리하게 / 보다 완벽하게</p>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 이미지 영역 */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-green-400 to-blue-500 rounded-lg overflow-hidden shadow-lg">
              {/* 실제 이미지가 있다면 여기에 img 태그를 사용하세요 */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-2xl font-bold">
                  시설사업소 소장님 사진 혹은 회사사진
                </div>
              </div>
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div className="space-y-6">
            <div className="max-w-none">
              <p className="leading-relaxed text-base" style={{ color: '#1C2D4D', marginBottom: '0.5rem' }}>
                ㈜지승 C&I는 토목기술분야 연구개발/엔지니어링/종합·전문건설시공사로서 열정적이고 실무 경험이 풍부한 기술자들이 모여 창의적이고 독창적인 아이디어를 바탕으로 혁신적이며 첨단화된 건설신기술을 연구, 개발하는 기술인의 보금자리입니다.
              </p>
              
              <p className="leading-relaxed text-base" style={{ color: '#1C2D4D', marginBottom: '0.5rem' }}>
                ㈜지승 C&I의 전문 기술분야는 반일체식 교대(무조인트) 교량(BIB Girder)를 포함한 다양한 형식의 교량 설계 및 건설과 교량의 필수 구성요소인 말뚝머리보강(Crown Cap), 교량받침 및 교체기술, 내진성능개선 장치 등을 포함한 구조물 유지관리에 필요한 전문기술을 보유하고 있습니다. 새로운 기술분야로 터널의 구조물의 합리적 건설을 위한 기술개발을 완성하여 토목구조물 전분야로 사업영역을 확장하고 있습니다.
              </p>
              
              <p className="leading-relaxed text-base" style={{ color: '#1C2D4D', marginBottom: '0.5rem' }}>
                기존 토목기술의 시공성, 유지관리성 및 효율성 관점에서 기술적 단점을 혁신적으로 개선 보완하여 "보다 안전하며, 보다 편리하고, 보다 완벽한" 토목기술 제공을 위하여 최선의 노력을 하고 있으며, 지난 30여 년간의 기술개발, 설계, 시공의 경험을 바탕으로 이론과 실제의 차이를 배제하는 최상의 설계 및 시공 기술을 제공하고 있습니다.
              </p>
              
              <p className="leading-relaxed text-base" style={{ color: '#1C2D4D' }}>
                ㈜지승 C&I의 젊은 기술자들은 이 순간에도 창의적이고 혁신적인 토목기술이 국가 기간 시설물에 적용될 수 있도록 기술연구개발에 정진하고 있으며, 미래 지향적 토목기술 기업으로 국가 기간 시설물 건설을 통하여 국민 편의를 제공함에 일익을 담당하는 ㈜지승 C&I가 되도록 최선의 노력을 경주하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
