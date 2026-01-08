import React from "react";

type DepartmentColumnProps = {
  title: string;
  items: string[];
};

// Hex-based styling (no design tokens)
const ORG_COLORS = {
  // Main (Director) node background
  mainNodeBg: "#0B1C2B",
  // Department headers background (설계/안전진단/건설사업관리)
  deptHeaderBg: "#175391",
  // Advisor (고문/자문위원) left accent bar color
  advisorBar: "#0B1C2B",
  textOnPrimary: "#FFFFFF",
  border: "#CBD5E1", // slate-300-ish
  line: "#94A3B8", // slate-400-ish
  text: "#0B1C2B",
  bg: "#FFFFFF",
} as const;

const DEPARTMENTS: DepartmentColumnProps[] = [
  { title: "설계", items: ["구조", "도로공항", "상하수도", "토질지질"] },
  { title: "안전진단", items: ["교량및터널", "수리", "건축"] },
  { title: "건설사업관리", items: ["토목", "건축"] },
];

const LineV = ({ heightClass = "h-8" }: { heightClass?: string }) => (
  <div className={`mx-auto w-px ${heightClass}`} style={{ backgroundColor: ORG_COLORS.line }} />
);

const MainNode = ({ text, className }: { text: string; className?: string }) => (
  <div
    className={`relative z-10 w-full max-w-md px-4 py-4 text-center text-base font-bold shadow-md sm:text-lg ${
      className ?? ""
    }`}
    style={{ backgroundColor: ORG_COLORS.mainNodeBg, color: ORG_COLORS.textOnPrimary }}
  >
    {text}
  </div>
);

const AdvisorNode = ({ text, className }: { text: string; className?: string }) => (
  <div
    className={`relative min-w-[140px] border px-8 py-2 text-center text-sm font-semibold shadow-sm ${className ?? ""}`}
    style={{ backgroundColor: ORG_COLORS.bg, borderColor: ORG_COLORS.border, color: ORG_COLORS.text }}
  >
    <div className="absolute bottom-0 left-0 top-0 w-1.5" style={{ backgroundColor: ORG_COLORS.advisorBar }} />
    {text}
  </div>
);

const DeptHeaderNode = ({ text, className }: { text: string; className?: string }) => (
  <div
    className={`relative z-10 mb-4 w-full py-3 text-center text-base font-bold shadow-md sm:text-lg ${className ?? ""}`}
    style={{ backgroundColor: ORG_COLORS.deptHeaderBg, color: ORG_COLORS.textOnPrimary }}
  >
    {text}
  </div>
);

const LeafNode = ({ text, className }: { text: string; className?: string }) => (
  <div
    className={`relative flex min-h-[40px] w-full items-center justify-center border px-4 py-2 text-center text-sm font-medium shadow-sm sm:text-[0.95rem] ${
      className ?? ""
    }`}
    style={{ backgroundColor: ORG_COLORS.bg, borderColor: ORG_COLORS.border, color: ORG_COLORS.text }}
  >
    {/* Leaf node accent bar uses the department/header blue */}
    <div className="absolute bottom-0 left-0 top-0 w-1.5" style={{ backgroundColor: ORG_COLORS.deptHeaderBg }} />
    {text}
  </div>
);

const DepartmentColumn = ({ title, items }: DepartmentColumnProps) => {
  return (
    <div className="relative flex w-full flex-col">
      <DeptHeaderNode text={title} />

      <div className="relative flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={item} className="relative flex items-center" style={{ paddingLeft: "20%" }}>
            {/* Vertical line segment */}
            <div
              className="absolute w-px"
              style={{
                backgroundColor: ORG_COLORS.line,
                left: "12.5%",
                top: index === 0 ? "-1rem" : "-0.75rem",
                bottom: index === items.length - 1 ? "50%" : "0",
              }}
            />

            {/* Horizontal connector */}
            <div
              className="absolute h-px"
              style={{
                backgroundColor: ORG_COLORS.line,
                left: "12.5%",
                width: "7.5%",
                top: "50%",
              }}
            />

            <LeafNode text={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileDepartmentSection = ({ title, items }: DepartmentColumnProps) => {
  return (
    <section
      className="rounded-xl border p-3 shadow-sm"
      style={{ borderColor: ORG_COLORS.border, backgroundColor: ORG_COLORS.bg }}
    >
      <DeptHeaderNode text={title} className="mb-3 rounded-lg px-4 text-left" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <LeafNode key={item} text={item} className="justify-start px-4 text-left" />
        ))}
      </div>
    </section>
  );
};

export const OrganizationChartV4 = () => {
  return (
    <div className="w-full">
      {/* Desktop (lg/xl): keep the original diagram with connectors */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="mx-auto flex w-full min-w-[860px] max-w-6xl flex-col items-center">
          {/* Level 1 */}
          <div className="mb-9 flex items-center justify-center text-2xl font-bold sm:text-3xl" style={{ color: ORG_COLORS.text }}>
            <span>본</span>
            <span className="inline-block w-[1em]" />
            <span>회</span>
          </div>

          {/* Level 2 */}
          <MainNode text="대한민국상이군경회 시설사업소장" />

          {/* Advisors */}
          <div className="relative flex h-24 w-full justify-center">
            <div className="h-full w-px" style={{ backgroundColor: ORG_COLORS.line }} />
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2">
              <AdvisorNode text="고문" />
            </div>
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2">
              <AdvisorNode text="자문위원" />
            </div>
          </div>

          <LineV heightClass="h-6" />

          {/* Split point + connectors */}
          <div className="relative w-full max-w-5xl">
            <div
              className="absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1.5 rounded-full border-2"
              style={{ backgroundColor: ORG_COLORS.bg, borderColor: ORG_COLORS.line }}
            />

            <div className="grid w-full grid-cols-3 gap-10">
              {/* Column 1 */}
              <div className="relative h-10">
                <div className="absolute bottom-0 left-1/2 top-0 w-px" style={{ backgroundColor: ORG_COLORS.line }} />
                <div
                  className="absolute left-1/2 top-0 h-px w-[calc(50%+1.25rem)]"
                  style={{ backgroundColor: ORG_COLORS.line }}
                />
              </div>

              {/* Column 2 */}
              <div className="relative h-10">
                <div className="absolute bottom-0 left-1/2 top-0 w-px" style={{ backgroundColor: ORG_COLORS.line }} />
                <div
                  className="absolute left-[-1.25rem] top-0 h-px w-[calc(100%+2.5rem)]"
                  style={{ backgroundColor: ORG_COLORS.line }}
                />
              </div>

              {/* Column 3 */}
              <div className="relative h-10">
                <div className="absolute bottom-0 left-1/2 top-0 w-px" style={{ backgroundColor: ORG_COLORS.line }} />
                <div
                  className="absolute left-[-1.25rem] top-0 h-px w-[calc(50%+1.25rem)]"
                  style={{ backgroundColor: ORG_COLORS.line }}
                />
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="mt-0 grid w-full max-w-5xl grid-cols-3 gap-10">
            {DEPARTMENTS.map((d) => (
              <DepartmentColumn key={d.title} title={d.title} items={d.items} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet (xs/sm/md): stacked responsive layout */}
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-5 text-center text-xl font-bold sm:text-2xl" style={{ color: ORG_COLORS.text }}>
            본회
          </div>

          <MainNode text="대한민국상이군경회 시설사업소장" className="max-w-none" />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AdvisorNode text="고문" className="w-full min-w-0" />
            <AdvisorNode text="자문위원" className="w-full min-w-0" />
          </div>

          <div className="mt-6 space-y-4">
            {DEPARTMENTS.map((d) => (
              <MobileDepartmentSection key={d.title} title={d.title} items={d.items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


