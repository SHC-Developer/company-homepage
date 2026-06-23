---
name: company-homepage-v2
description: >-
  대한민국상이군경회시설사업소 홈페이지 v2(facility-trust-hub) 프로젝트의 구조, 디자인 토큰, 레이아웃 규칙, 코드
  컨벤션, 사용자 작업 의중·커뮤니케이션 원칙을 담은 개발 하네스. 이 저장소(React + TypeScript + Vite +
  Tailwind, LandingSections / Navigation / Greeting / Portfolio / LegalBasis / Recruit)에서
  UI·디자인·섹션·네비게이션·실적·법령·인사말 등 어떤 코드 작업이나 질문을 하든 항상 먼저 참조한다.
---

# 대한민국상이군경회시설사업소 홈페이지 v2 — 개발 하네스

이 프로젝트의 모든 작업은 이 스킬을 컨텍스트로 삼아 진행한다. 새 대화든 후속 요청이든, 코드를 건드리기 전에 아래 규칙과 의중을 따른다.

## 1. 프로젝트 정체성
- **목적**: 대한민국상이군경회시설사업소 공식 홈페이지 리디자인.
- **품질 기준**: 고급 한국 기업 홈페이지(JISEUNG 급) 수준의 세련됨. 단순 기능 구현이 아니라 **시각적 퀄리티가 1순위**.
- **4대 사업 분야**: 안전진단전문기관 | 엔지니어링사업 | 건설엔지니어링업 | 초경량비행장치사용사업.

## 2. 기술 스택 / 환경
- React 18 + TypeScript + Vite 5 + Tailwind CSS 3, React Router DOM 6, Lucide React, framer-motion, shadcn/ui(`src/components/ui/*`).
- 경로 별칭: `@` → `./src` (예: `@/components/...`). import 시 항상 `@` 별칭 사용.
- 개발 서버: `npm run dev` → **http://localhost:8081** (포트 8081 고정). 보통 이미 실행 중이므로 새로 띄우기 전 터미널 상태 확인.
- 빌드: `npm run build` (`dist/`로 출력, `vite.config.ts`의 `copyNetlifyFiles` 플러그인이 SPA 라우트별 `index.html`·404·portfolio 이미지 복사 → GitHub Pages SEO 대응).

## 3. 파일 지도 (어디를 고칠지)
- `src/pages/Index.tsx` — 루트 페이지. `activeIndex` 상태로 7섹션 추적, 슬라이드(1~5)에서 ScrollToTop 숨김.
- `src/components/LandingSections.tsx` — **메인 랜딩 7섹션** (가장 많이 수정하는 파일).
- `src/components/Navigation.tsx` — 상단 네비게이션. `variant`(default/legal), `forceLightTheme`, `autoHideOnMount` props. 밝은 배경 위 자동 테마 전환(`isOverLightBackground`).
- `src/components/GreetingSection.tsx` — 회사소개 본문(인사말·연혁·면허·조직). 대형 파일(약 1600줄).
- `src/components/Footer.tsx` — 연락처/저작권.
- `src/pages/Greeting.tsx · Portfolio.tsx · LegalBasis.tsx · Recruit.tsx` — 서브 페이지.
- `src/lib/navContentInset.ts` — 네비/본문 좌우 정렬 상수(아래 4-③ 참조).
- `src/index.css` — 디자인 토큰(CSS 변수) + 커스텀 컴포넌트/애니메이션 클래스.
- `src/App.tsx` — 라우팅. 커스텀 라우트는 catch-all `*` 위에 추가.

## 4. 레이아웃 규칙 (반드시 동기화 유지)
① **7섹션 scroll-snap**: Hero(0) → Slides 1~5 → Sitemap(6). `TOTAL_SECTIONS = 7`.
② **인디케이터**: Sitemap 섹션(index 6)에서는 숨김.
③ **좌우 정렬은 `navContentInset.ts` 상수로만**: `NAV_CONTENT_INSET_CLASS`(너비/패딩), `NAV_CONTENT_TEXT_START_PL_CLASS`(좌), `NAV_CONTENT_TEXT_END_PR_CLASS`(우)는 서로 대칭이며 **반드시 동기화**. 정렬 손볼 때 임의 px 하드코딩 금지, 이 상수를 쓰거나 함께 수정.
④ **모바일 높이**: 주소창 대응 `--vh` CSS 변수 → `calc(var(--vh, 1vh) * 100)` 사용.
⑤ **`.scroll-section` / `.sitemap-scroll-container`**: scroll-snap·스크롤바 숨김 규칙이 `index.css`에 정의됨.

## 5. 디자인 토큰 (색·폰트)
- 색은 전부 **HSL**로 `index.css :root`에 정의. 새 색을 인라인 hex로 박지 말고 토큰/Tailwind 시맨틱(`bg-primary`, `text-secondary` 등) 사용.
  - Primary(딥 네이비) `#0B1C2B` 계열 / Point Blue `#1D66B3`·`#1E6FD9` 계열.
  - 사이트맵 배경: `radial-gradient(ellipse at 50% 45%, #122438 0%, #0B1C2B 55%, #060f18 100%)`.
- 폰트 변수: `--font-logo`(Noto Serif KR, 회사명·강조) / `--font-korean`(Noto Sans KR, 본문) / `--font-english`(Inter). 로드처: `index.html` Google Fonts.
- 재사용 클래스: `corporate-card`, `btn-primary-korean`, `hero-link`, `animate-fade-in` 등 `index.css` `@layer components` 우선 활용.

## 6. 사이트 구조 (네비게이션)
```
회사소개 → /greeting   (설립이념 · 인사말 #ceo-message · 회사연혁 #company-history · 보유면허 및 기술 #license · 조직구성 #organization-chart)
관계법령 → /legal-basis
분야별 수행실적 → /portfolio (안전진단 #portfolio-safety-bridge-tunnel · 설계 #portfolio-design · 건설사업관리 #portfolio-supervision)
자료실 → /recruit
```
- 섹션 이동은 `Navigation.tsx`의 `navigateAndScrollToId`/`handleSameOrNavigateToSection` 패턴(해시 push + smooth scroll) 사용. 앵커 id를 바꾸면 네비·대상 섹션 양쪽을 함께 수정.

## 7. 연락처 (Footer)
TEL 02)572-6218 · FAX 050-5115-9274 · ADD 경기도 성남시 분당구 판교역로 230, 907호 (삼환하이펙스B동, 삼평동) · © 2026 대한민국상이군경회시설사업소.

## 8. 디자인 작업 원칙 (사용자 의중)
1. **비례·여백에 민감**: 텍스트/카드/간격 크기 하나하나가 중요. "살짝", "적절히" 요청 시 **과하지 않게** 미세 조정.
2. **중복 제거 우선**: 네비게이션 바에 이미 있는 정보(회사명·사업분야 등)는 섹션 안에서 반복하지 않음.
3. **고급 기업 감도**: 애니메이션·hover·폰트 디테일까지 신경. 기성 느낌의 밋밋한 결과 지양.
4. **정보 위계 명확히**: 텍스트 크기·색상 대비로 메인/서브 계층이 한눈에 드러나게.

## 9. 커뮤니케이션·실행 원칙 (반드시 준수)
5. **다음 단계 확인 질문 금지**: "다음으로 넘어갈까요?" 류 금지. 사용자가 직접 지시한다.
6. **결정 후 즉시 실행**: 옵션 선택 후 추가 확인 없이 바로 진행.
7. **수정 후 스크린샷 검증**: 코드 수정 완료 시 반드시 스크린샷으로 결과 확인. 수동 캡처 대신 `npm run shot`(자동화 스크립트)을 사용한다 — 11절 참조.
8. **수정 후 개선안 3가지 제안**: 작업 완료 시 다음에 손보면 좋을 개선안을 **매번 3가지** 제안.
- 응답 언어는 항상 한국어.

## 10. 코드 컨벤션
- 컴포넌트: 함수형 + named export(예: `export const Navigation = (...)`). 페이지는 default export.
- props는 인터페이스로 타입 지정, 기본값은 구조분해에서 부여.
- Tailwind 우선, 복잡/재사용 스타일만 `index.css` `@layer`에 클래스로. 색은 토큰 경유.
- 주석은 의도/제약만. 코드를 그대로 풀어 쓰는 군더더기 주석 금지.
- 수정 후 `ReadLints`로 린트 확인하고 새로 생긴 오류는 정리.

## 11. 스크린샷 검증 + 시각 회귀 비교 (`scripts/shot.mjs`)
수정 검증용 캡처·비교는 항상 이 스크립트로 한다. dev 서버(localhost:8081)가 떠 있어야 함.
타깃 인자 형식은 `route#anchor`(앵커 id는 6절 참조). 데스크톱(1440)·모바일(390) 동시 캡처.

**기본 캡처**
- `npm run shot` → 홈(/) 캡처.
- `npm run shot -- "greeting#license"` → 해당 섹션으로 스크롤 후 캡처.
- `npm run shot -- portfolio "greeting#organization-chart"` → 여러 타깃 연속.

**시각 회귀 비교 (권장 워크플로우)** — 의도치 않은 부작용 자동 감지:
1. 수정 전: `npm run shot -- --baseline "<타깃들>"` → `screenshots/baseline/`에 기준선 저장.
2. 코드 수정.
3. 수정 후: `npm run shot -- "<같은 타깃들>"` → `screenshots/current/` 캡처 + baseline과 픽셀 비교 → `screenshots/diff/`에 변경 픽셀을 빨갛게 표시, 변화율(%) 리포트.
- 판독: diff의 빨간 영역이 **내가 의도한 섹션에만** 있으면 정상, 안 건드린 곳에 있으면 회귀(부작용).
- **영상·무한 애니메이션은 비교에서 자동 제외**: `MASK_SELECTORS`(`video`, `.hero-video-bg`, `.animate-scroll`, `.animate-wave`, `.animate-wave-slow`)는 마스킹되고, 그 외 트랜지션/애니메이션은 정지(`FREEZE_CSS`)시켜 비교한다. 새 동적 섹션을 추가하면 `MASK_SELECTORS`에 등록할 것.

**옵션**: `--full`(전체 페이지, anchor 없을 때) · `--desktop-only` · `--mobile-only` · `--port=8081` · `--threshold=0.1`(픽셀 민감도) · `--no-mask`(영상/마퀴 마스킹 끄고 실제 화면 육안 검증) · `--keep`(기존 캡처 유지).
- 참고: 마스킹/애니메이션 정지(`FREEZE_CSS`) 때문에 CSS @keyframes로 슬라이드인되는 요소(예: 히어로 텍스트)는 캡처에서 안 보일 수 있음 — 실제 브라우저에선 정상. 동적 영역 육안 확인은 `--no-mask` 사용.
- 히어로 앵커: 사이트맵 푸터는 `#sitemap-footer`로 캡처 가능.
- 산출물 `screenshots/`(baseline·current·diff)는 git ignore됨. 캡처 후 이미지를 읽어 비례·여백·위계를 검증하고 사용자에게 보여준다.

## 작업 루틴 체크리스트
```
- [ ] 어떤 파일/섹션인지 3절 파일 지도로 위치 확인
- [ ] 디자인 토큰·정렬 상수(4·5절) 준수, 하드코딩 회피
- [ ] 비례/여백/중복제거/위계(8절) 점검
- [ ] 수정 후 린트 확인
- [ ] npm run shot 으로 해당 화면 캡처·검증(11절)
- [ ] 개선안 3가지 제안
```
