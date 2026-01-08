import React from 'react';

// Color constants to match the image
const COLORS = {
  primary: '#103e75', // The deep blue color from the image
  line: '#94a3b8',    // Gray color for connecting lines
};

// --- Components ---

/**
 * Wide rectangular blue node (e.g., 시설사업소장)
 */
const MainNode = ({ text }: { text: string }) => (
  <div 
    className="w-full max-w-md py-4 px-4 text-center text-white font-bold text-lg shadow-md z-10 relative"
    style={{ backgroundColor: COLORS.primary }}
  >
    {text}
  </div>
);

/**
 * Department Header Node (e.g., 설계, 안전진단)
 */
const DeptHeaderNode = ({ text }: { text: string }) => (
  <div 
    className="w-full py-3 text-center text-white font-bold text-lg shadow-md mb-4 relative z-10"
    style={{ backgroundColor: COLORS.primary }}
  >
    {text}
  </div>
);

/**
 * Leaf Node (White box with blue border accent on left)
 */
const LeafNode = ({ text }: { text: string }) => (
  <div className="bg-white border border-gray-300 py-2 px-4 text-center text-gray-800 font-medium shadow-sm relative w-full flex items-center justify-center min-h-[40px]">
    {/* The thick blue bar on the left */}
    <div 
      className="absolute top-0 left-0 bottom-0 w-1.5"
      style={{ backgroundColor: COLORS.primary }}
    ></div>
    {text}
  </div>
);

/**
 * Advisor Node (Side nodes like 고문, 자문위원)
 */
const AdvisorNode = ({ text }: { text: string }) => (
  <div className="bg-white border border-gray-300 py-2 px-8 text-center text-gray-800 font-medium shadow-sm relative min-w-[140px]">
    <div 
      className="absolute top-0 left-0 bottom-0 w-1.5"
      style={{ backgroundColor: COLORS.primary }}
    ></div>
    {text}
  </div>
);

/**
 * Vertical Line Component
 */
const VLine = ({ height = 'h-8' }: { height?: string }) => (
  <div className={`w-px bg-slate-400 mx-auto ${height}`}></div>
);

// --- Sections ---

/**
 * Section for a specific department (Column)
 * Fixed to ensure the vertical line (1번 선) is continuous without breaks.
 */
const DepartmentColumn = ({ title, items }: { title: string, items: string[] }) => {
  return (
    <div className="flex flex-col w-full relative">
      {/* Department Header */}
      <DeptHeaderNode text={title} />

      {/* Items Container */}
      <div className="flex flex-col gap-3 relative">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center relative" 
            style={{ paddingLeft: '20%' }}
          >
            {/* 
              Vertical Line Segment (1번 선)
              Extended 'top' to cover the gap (12px = gap-3) and header spacing (16px = mb-4).
            */}
            <div 
              className="absolute bg-slate-400 w-px"
              style={{ 
                left: '12.5%', 
                // Bridge the gap from above:
                // If first item, reach up 16px to touch header.
                // If subsequent items, reach up 12px (the gap-3 size) to touch previous segment.
                top: index === 0 ? '-1rem' : '-0.75rem', 
                // If last item, end at exactly 50% height.
                // Otherwise, end at 100% (0 bottom) to meet the next segment's top extension.
                bottom: index === items.length - 1 ? '50%' : '0' 
              }}
            ></div>

            {/* 
              Horizontal Connector (2번 선)
              Connects from the vertical line (12.5%) to the box (20%)
            */}
            <div 
              className="absolute bg-slate-400 h-px"
              style={{ 
                left: '12.5%', 
                width: '7.5%', 
                top: '50%' 
              }}
            ></div>

            {/* The Item Box */}
            <LeafNode text={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center overflow-x-auto">
      <div className="min-w-[800px] w-full max-w-6xl flex flex-col items-center">
        
        {/* Level 1: 본회 */}
        <div className="text-black font-bold text-3xl mb-9 flex items-center justify-center">
          <span>본</span>
          <span className="inline-block w-[1em]"></span>
          <span>회</span>
        </div>

        {/* Level 2: 시설사업소장 */}
        <MainNode text="대한민국상이군경회 시설사업소장" />
        
        {/* Advisor Area */}
        <div className="relative flex justify-center h-24 w-full">
            <div className="h-full w-px bg-slate-400"></div>

            <div className="absolute top-1/2 left-[15%] -translate-y-1/2">
               <AdvisorNode text="고문" />
            </div>
            <div className="absolute top-1/2 right-[15%] -translate-y-1/2">
               <AdvisorNode text="자문위원" />
            </div>
        </div>

        {/* Increased vertical line height for solid connection to split point */}
        <VLine height="h-6" />

        {/* The Central Split Point - Unified Grid to ensure alignment */}
        <div className="relative w-full max-w-5xl">
            {/* The circle node at the intersection (Main branch drop) */}
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-white border-2 border-slate-500 rounded-full -translate-x-1/2 -translate-y-1.5 z-20"></div>

            {/* Grid for vertical lines to match column grid below */}
            <div className="grid grid-cols-3 gap-10 w-full">
                
                {/* Column 1 Connector (설계) */}
                {/* Increased height to h-10 to ensure it touches the header below */}
                <div className="relative h-10">
                    {/* Vertical line down to header */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400"></div>
                    {/* Horizontal line: Center to Right Gap (spans 50% + half gap) */}
                    <div className="absolute left-1/2 top-0 h-px bg-slate-400 w-[calc(50%+1.25rem)]"></div>
                </div>
                
                {/* Column 2 Connector (안전진단) */}
                <div className="relative h-10">
                    {/* Vertical line down to header */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400"></div>
                    {/* Horizontal line: Spans full width + left gap + right gap */}
                    <div className="absolute left-[-1.25rem] top-0 h-px bg-slate-400 w-[calc(100%+2.5rem)]"></div>
                </div>
                
                {/* Column 3 Connector (건설사업관리) */}
                <div className="relative h-10">
                    {/* Vertical line down to header */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400"></div>
                    {/* Horizontal line: Left Gap to Center (spans half gap + 50%) */}
                    <div className="absolute left-[-1.25rem] top-0 h-px bg-slate-400 w-[calc(50%+1.25rem)]"></div>
                </div>
            </div>
        </div>

        {/* Level 3: Department Columns */}
        <div className="grid grid-cols-3 gap-10 w-full max-w-5xl mt-0">
          
          {/* Column 1: 설계 */}
          <DepartmentColumn 
            title="설계" 
            items={['구조', '도로공항', '상하수도', '토질지질']} 
          />

          {/* Column 2: 안전진단 */}
          <DepartmentColumn 
            title="안전진단" 
            items={['교량및터널', '수리', '건축']} 
          />

          {/* Column 3: 건설사업관리 */}
          <DepartmentColumn 
            title="건설사업관리" 
            items={['토목', '건축']} 
          />

        </div>
      </div>
    </div>
  );
}