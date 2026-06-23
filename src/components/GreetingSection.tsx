import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { HandHeart, Target, Award, TrendingUp, Globe, ChevronDown } from 'lucide-react';
import { setupLoopingVideo } from '@/lib/utils';
import { HeroVideoLayer, heroSectionBackgroundStyle } from '@/components/HeroVideoLayer';
import { HeroGradientOverlay } from '@/components/HeroGradientOverlay';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { OrganizationChartV4 } from '@/components/OrganizationChartV4';
import { SignatureReveal } from '@/components/SignatureReveal';
import {
  NAV_CONTENT_INSET_CLASS,
  NAV_CONTENT_TEXT_END_PR_CLASS,
  NAV_CONTENT_TEXT_START_PL_CLASS,
  NAV_CONTENT_TEXT_START_PL_STACKED_THEN_SPLIT_CLASS,
} from '@/lib/navContentInset';

const HERO_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** LandingSections `performScroll` 과 동일한 스냅 잠금 시간 */
const GREETING_SNAP_SCROLL_MS = 200;

/**
 * 경영이념 영역 내부 `overflow-y-auto` 패널이 먼저 스크롤되어야 할 때.
 * (메인 히어로→슬라이드는 풀 뷰포트라 중첩 스크롤이 없음)
 */
function greetingInnerWheelConsumes(
  target: EventTarget | null,
  philosophyRoot: HTMLElement | null,
  deltaY: number
): boolean {
  if (!philosophyRoot) return false;
  let el = target instanceof Element ? target : null;
  if (!el || !philosophyRoot.contains(el)) return false;
  let node: Element | null = el;
  while (node && node !== philosophyRoot) {
    const st = window.getComputedStyle(node);
    const oy = st.overflowY;
    const scrollable =
      (oy === 'auto' || oy === 'scroll' || oy === 'overlay') && node.scrollHeight > node.clientHeight + 1;
    if (scrollable) {
      if (deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) return true;
      if (deltaY < 0 && node.scrollTop > 1) return true;
    }
    node = node.parentElement;
  }
  return false;
}

/** 히어로 한문 줄 (작은 스케일) */
const HERO_BRAND_TITLE_STYLE: React.CSSProperties = {
  fontSize: 'clamp(1.1rem, 3.25vw, 2.5rem)',
  lineHeight: 1.15,
  textShadow: '0 1px 18px rgba(0,0,0,0.6)',
};

/** 시설사업소 — 원래 대형 타이틀 스케일, 너비는 한문 줄에 맞춤 */
const HERO_SISO_TITLE_STYLE: React.CSSProperties = {
  fontSize: 'clamp(2.2rem, 6.5vw, 5rem)',
  lineHeight: 1.15,
  textShadow: '0 2px 32px rgba(0,0,0,0.65)',
};

type MotionCharLineProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charStagger?: number;
  charDuration?: number;
  reducedMotion?: boolean;
  /** 부모 show 이후 이 줄의 첫 글자 리빌까지 지연(초) — 경영이념 등 순차 타이포용 */
  delayStart?: number;
  /**
   * 음절(글자) 사이 간격(px). 한문 줄 너비에 맞추기 위해 계산해 전달.
   * 양수·음수 모두 허용(좁히기).
   */
  betweenGlyphPx?: number;
};

const MotionCharLine = React.forwardRef<HTMLDivElement, MotionCharLineProps>(function MotionCharLine(
  { text, className, style, charStagger = 0.025, charDuration = 0.4, reducedMotion = false, delayStart = 0, betweenGlyphPx },
  ref
) {
  const layoutStyle: React.CSSProperties =
    betweenGlyphPx !== undefined
      ? { display: 'inline-flex', alignItems: 'baseline', flexWrap: 'nowrap' }
      : {};

  return (
  <motion.div
    ref={ref}
    className={className}
    style={{ ...style, ...layoutStyle }}
    variants={{
      hidden: {},
      show: {
        transition: {
          delay: reducedMotion ? 0 : delayStart,
          staggerChildren: reducedMotion ? 0 : charStagger,
        },
      },
    }}
  >
    {text.split('').map((char, i) =>
      char === ' ' ? (
        <span key={i} className="inline-block" style={{ width: '0.3em' }} />
      ) : (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{
            verticalAlign: 'top',
            lineHeight: 'inherit',
            marginRight:
              betweenGlyphPx !== undefined && i < text.length - 1
                ? betweenGlyphPx
                : undefined,
          }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: {
                y: reducedMotion ? '0%' : '110%',
                opacity: reducedMotion ? 0 : 1,
              },
              show: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: reducedMotion ? 0.12 : charDuration,
                  ease: HERO_EASE,
                },
              },
            }}
          >
            {char}
          </motion.span>
        </span>
      )
    )}
  </motion.div>
  );
});

export const GreetingSection = () => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  /** 5초마다 증가 → 히어로 타이포 블록 remount 후 애니메이션 반복 */
  const [heroTypographyCycle, setHeroTypographyCycle] = useState(0);
  const [visibleParagraphs, setVisibleParagraphs] = useState<boolean[]>([false, false, false, false, false, false]);
  const [visibleTitle, setVisibleTitle] = useState(false);
  const [visibleSubtitle, setVisibleSubtitle] = useState(false);
  const [visibleHistoryTitle, setVisibleHistoryTitle] = useState(false);
  const [visibleHistoryItems, setVisibleHistoryItems] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const philosophySectionRef = useRef<HTMLElement | null>(null);
  const isGreetingSnapScrollingRef = useRef(false);
  /** 휠 스냅용 — 매 wheel 이벤트마다 offsetHeight/offsetTop 읽지 않도록 캐시 (레이아웃 스래싱 방지) */
  /** philTop: 섹션 레이아웃 상단(document). philSnapY: scroll-margin 반영 후 목표 스크롤(네비 아래 정렬). */
  const greetingSnapMetricsRef = useRef({ heroH: 0, philTop: 0, philSnapY: 0 });
  /** 모바일: LandingSections와 동일한 터치 스냅(히어로 ↔ 경영이념 상단) */
  const greetingTouchActiveRef = useRef(false);
  const greetingTouchMovedRef = useRef(false);
  const greetingGestureSnapRef = useRef<0 | null>(null);
  const greetingTouchStartYRef = useRef(0);
  const greetingTouchCurrentYRef = useRef(0);
  /** LandingSections `viewportHeightRef` 와 동기 — 휠 스냅 구간 계산 */
  const greetingViewportHeightRef = useRef(
    Math.round(typeof window !== 'undefined' ? window.visualViewport?.height ?? window.innerHeight : 600)
  );
  const historyTitleRef = useRef<HTMLDivElement>(null);
  const historyItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const licenseCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleLicenseCards, setVisibleLicenseCards] = useState<boolean[]>(Array(7).fill(false));

  const hanjaRowWrapRef = useRef<HTMLDivElement>(null);
  const sisoLineRef = useRef<HTMLDivElement>(null);
  const [sisoBetweenGlyphPx, setSisoBetweenGlyphPx] = useState(0);

  /** 한문 줄 너비와 시설사업소 각 글자 폭 합 → 음절 사이 letter-spacing(px) 균등 배분 */
  useLayoutEffect(() => {
    const measure = () => {
      const hEl = hanjaRowWrapRef.current;
      const sEl = sisoLineRef.current;
      if (!hEl || !sEl) return;

      const wHanja = hEl.getBoundingClientRect().width;
      const spans = sEl.querySelectorAll(':scope > span');
      if (spans.length < 2) return;

      let sumGlyph = 0;
      spans.forEach((span) => {
        sumGlyph += span.getBoundingClientRect().width;
      });
      const gapSlots = spans.length - 1;
      const px = gapSlots > 0 ? (wHanja - sumGlyph) / gapSlots : 0;
      setSisoBetweenGlyphPx(px);
    };

    measure();
    const t = window.setTimeout(measure, 0);
    void document.fonts.ready.then(measure);

    const ro = new ResizeObserver(() => measure());
    if (hanjaRowWrapRef.current) ro.observe(hanjaRowWrapRef.current);
    if (sisoLineRef.current) ro.observe(sisoLineRef.current);
    window.addEventListener('resize', measure);

    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [heroTypographyCycle]);

  // 로컬 비디오 반복 재생
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    return setupLoopingVideo(video, {
      onEndedPlayError: (e) => {
        console.error('비디오 재생 실패:', e);
        setVideoError(true);
      },
      onLoadError: () => {
        console.error('비디오 로드 실패');
        setVideoError(true);
      },
      onAutoplayError: (e) => {
        console.error('비디오 자동 재생 실패:', e);
      },
    });
  }, []);

  /** 배경 탭에서는 비디오 일시정지로 디코딩·합성 부하 감소 */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || videoError) return;
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        v.pause();
      } else {
        void v.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [videoError]);

  useEffect(() => {
    const checkMobile = () => {
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(touchCapable || window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const refreshGreetingSnapMetrics = useCallback(() => {
    const hero = heroSectionRef.current;
    const phil = philosophySectionRef.current;
    if (!hero || !phil) return;
    const philTop = phil.getBoundingClientRect().top + window.scrollY;
    const marginTop = parseFloat(getComputedStyle(phil).scrollMarginTop) || 0;
    const philSnapY = Math.max(0, philTop - marginTop);
    greetingSnapMetricsRef.current = {
      heroH: hero.offsetHeight,
      philTop,
      philSnapY,
    };
  }, []);

  /** LandingSections 와 동일: visualViewport 기준 뷰포트 높이 */
  useEffect(() => {
    const syncVh = () => {
      greetingViewportHeightRef.current = Math.round(window.visualViewport?.height ?? window.innerHeight);
    };
    syncVh();
    window.addEventListener('resize', syncVh);
    window.addEventListener('orientationchange', syncVh);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', syncVh);
    vv?.addEventListener('scroll', syncVh);
    return () => {
      window.removeEventListener('resize', syncVh);
      window.removeEventListener('orientationchange', syncVh);
      vv?.removeEventListener('resize', syncVh);
      vv?.removeEventListener('scroll', syncVh);
    };
  }, []);

  useLayoutEffect(() => {
    refreshGreetingSnapMetrics();
    window.addEventListener('resize', refreshGreetingSnapMetrics);
    window.addEventListener('orientationchange', refreshGreetingSnapMetrics);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refreshGreetingSnapMetrics) : null;
    const h = heroSectionRef.current;
    const p = philosophySectionRef.current;
    if (ro) {
      if (h) ro.observe(h);
      if (p) ro.observe(p);
    }
    return () => {
      window.removeEventListener('resize', refreshGreetingSnapMetrics);
      window.removeEventListener('orientationchange', refreshGreetingSnapMetrics);
      ro?.disconnect();
    };
  }, [refreshGreetingSnapMetrics]);

  const performGreetingSnap = useCallback((index: 0 | 1) => {
    const hero = heroSectionRef.current;
    const phil = philosophySectionRef.current;
    if (!hero || !phil) return;
    refreshGreetingSnapMetrics();
    let { philTop, philSnapY } = greetingSnapMetricsRef.current;
    if (philTop <= 0) {
      philTop = phil.getBoundingClientRect().top + window.scrollY;
      const marginTop = parseFloat(getComputedStyle(phil).scrollMarginTop) || 0;
      philSnapY = Math.max(0, philTop - marginTop);
      greetingSnapMetricsRef.current.philTop = philTop;
      greetingSnapMetricsRef.current.philSnapY = philSnapY;
    }
    const top = index === 0 ? 0 : philSnapY;
    if (isGreetingSnapScrollingRef.current) return;
    isGreetingSnapScrollingRef.current = true;
    window.scrollTo({ top, behavior: 'auto' });
    window.setTimeout(() => {
      isGreetingSnapScrollingRef.current = false;
    }, GREETING_SNAP_SCROLL_MS);
  }, [refreshGreetingSnapMetrics]);

  /**
   * 메인 LandingSections 히어로↔슬라이드와 동일한 의도:
   * - 히어로 구간: 휠 시 기본 스크롤 차단(LandingSections 의 snap 구간과 동일)
   * - 아래로: 경영이념 섹션 상단으로 한 번에 스크롤
   * - 설립이념 스냅 정렬 지점(atPhilSnap)에서만 위로 히어로 복귀; 그 아래(인사말 등)는 일반 스크롤
   */
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      const hero = heroSectionRef.current;
      const phil = philosophySectionRef.current;
      if (!hero || !phil) return;

      refreshGreetingSnapMetrics();
      let { philTop, philSnapY } = greetingSnapMetricsRef.current;
      if (philTop <= 0) {
        philTop = phil.getBoundingClientRect().top + window.scrollY;
        const marginTop = parseFloat(getComputedStyle(phil).scrollMarginTop) || 0;
        philSnapY = Math.max(0, philTop - marginTop);
        greetingSnapMetricsRef.current.philTop = philTop;
        greetingSnapMetricsRef.current.philSnapY = philSnapY;
      }

      const y = window.scrollY;
      const delta = e.deltaY;
      const SNAP_FUZZ = 50;

      const atHero = y < philSnapY - SNAP_FUZZ;
      /** 설립이념이 뷰포트 상단에 스냅된 상태에서만 히어로 복귀 — 섹션 전체 높이가 아님 */
      const atPhilSnap = Math.abs(y - philSnapY) <= SNAP_FUZZ;

      if (isGreetingSnapScrollingRef.current) {
        if (atHero || atPhilSnap) e.preventDefault();
        return;
      }

      if (atHero) {
        e.preventDefault();
        if (delta > 0) performGreetingSnap(1);
        return;
      }

      if (atPhilSnap && delta < 0) {
        if (greetingInnerWheelConsumes(e.target, phil, delta)) return;
        e.preventDefault();
        performGreetingSnap(0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isMobile, refreshGreetingSnapMetrics, performGreetingSnap]);

  const getGreetingTouchSnapZone = useCallback((): 0 | null => {
    const hero = heroSectionRef.current;
    const phil = philosophySectionRef.current;
    if (!hero || !phil) return null;
    refreshGreetingSnapMetrics();
    const y = window.scrollY;
    const vh = greetingViewportHeightRef.current;
    let { heroH, philTop, philSnapY } = greetingSnapMetricsRef.current;
    if (heroH <= 0) heroH = hero.offsetHeight;
    if (philTop <= 0) philTop = phil.getBoundingClientRect().top + window.scrollY;
    if (philSnapY <= 0 && philTop > 0) {
      const marginTop = parseFloat(getComputedStyle(phil).scrollMarginTop) || 0;
      philSnapY = Math.max(0, philTop - marginTop);
      greetingSnapMetricsRef.current.philSnapY = philSnapY;
    }
    if (y < philSnapY - 36) return 0;
    return null;
  }, [refreshGreetingSnapMetrics]);

  /** 모바일 터치 — LandingSections.tsx 와 같은 임계값·플로우(스크롤 관성 차단 후 스냅) */
  useEffect(() => {
    if (!isMobile) return;

    const skipTarget = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      if (!el) return true;
      if (el.closest('nav')) return true;
      if (el.closest('footer')) return true;
      if (el.closest('[data-skip-greeting-touch-snap]')) return true;
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (isGreetingSnapScrollingRef.current) return;
      if (skipTarget(e.target)) return;

      const zone = getGreetingTouchSnapZone();
      if (zone === null) {
        greetingGestureSnapRef.current = null;
        return;
      }

      greetingTouchActiveRef.current = true;
      greetingTouchMovedRef.current = false;
      greetingGestureSnapRef.current = zone;
      greetingTouchStartYRef.current = e.touches[0].clientY;
      greetingTouchCurrentYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!greetingTouchActiveRef.current || greetingGestureSnapRef.current === null) return;
      if (isGreetingSnapScrollingRef.current) {
        e.preventDefault();
        return;
      }

      greetingTouchCurrentYRef.current = e.touches[0].clientY;
      const diffY = greetingTouchStartYRef.current - greetingTouchCurrentYRef.current;
      const startZone = greetingGestureSnapRef.current;

      if (startZone === 0) {
        if (Math.abs(diffY) > 2) {
          greetingTouchMovedRef.current = true;
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (!greetingTouchActiveRef.current) return;
      greetingTouchActiveRef.current = false;

      const startZone = greetingGestureSnapRef.current;
      greetingGestureSnapRef.current = null;

      if (startZone === null) return;
      if (isGreetingSnapScrollingRef.current) return;

      const diffY = greetingTouchStartYRef.current - greetingTouchCurrentYRef.current;
      const distanceThreshold = 30;

      if (startZone === 0) {
        if (greetingTouchMovedRef.current && diffY > distanceThreshold) {
          performGreetingSnap(1);
        } else if (greetingTouchMovedRef.current) {
          performGreetingSnap(0);
        }
      }
    };

    const handleTouchCancel = () => {
      greetingTouchActiveRef.current = false;
      greetingTouchMovedRef.current = false;
      greetingGestureSnapRef.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true, capture: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, true);
      document.removeEventListener('touchmove', handleTouchMove, true);
      document.removeEventListener('touchend', handleTouchEnd, true);
      document.removeEventListener('touchcancel', handleTouchCancel, true);
    };
  }, [isMobile, getGreetingTouchSnapZone, performGreetingSnap]);

  // 히어로 타이포 반복 — 리마운트 비용·CPU 부하 줄이기: 배경 탭에서는 생략, 간격 연장, 감소 동작 시 비활성
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      setHeroTypographyCycle((k) => k + 1);
    }, 12000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // COMPANY HISTORY: no range filtering, continuous timeline (latest first)

  const observeSingle = <T extends Element>(
    ref: React.RefObject<T>,
    onChange: (isVisible: boolean) => void,
    options: IntersectionObserverInit
  ) => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      onChange(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  };

  const observeMany = <T extends Element>(
    refs: React.MutableRefObject<(T | null)[]>,
    onChangeAtIndex: (index: number, isVisible: boolean) => void,
    options: IntersectionObserverInit
  ) => {
    const observers = refs.current.map((node, index) => {
      if (!node) return null;

      const observer = new IntersectionObserver(([entry]) => {
        onChangeAtIndex(index, entry.isIntersecting);
      }, options);

      observer.observe(node);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  };

  const approvalAndCertificates = [
    {
      title: '수익사업 승인서',
      badge: 'APPROVAL',
      items: [
        { label: '등록번호', value: '제2024-23호' },
        { label: '등록일자', value: '2024년 11월 28일' },
        {
          label: '승인내용',
          value:
            '용역사업',
        },
      ],
    },
    {
      title: '안전진단전문기관등록증',
      badge: 'CERTIFICATE',
      items: [
        { label: '등록번호', value: '제 서울-11호' },
        { label: '등록일자', value: '2003년 06월 10일' },
        { label: '등록분야', value: '교량 및 터널, 수리시설, 건축' },
      ],
    },
    {
      title: '엔지니어링사업자 신고증',
      badge: 'CERTIFICATE',
      items: [
        { label: '등록번호', value: '제E-9-1673호' },
        { label: '등록일자', value: '2003년 06월 11일' },
        { label: '등록분야', value: '건설 등 1개 부문, 구조 등 4개 분야' },
      ],
    },
    {
      title: '건설엔지니어링업 등록증',
      badge: 'CERTIFICATE',
      items: [
        { label: '등록번호', value: '서울-2-134호' },
        { label: '등록일자', value: '2015년 02월 12일' },
        { label: '등록분야', value: '설계•사업관리' },
      ],
    },
  ] as const;

  const patentsTextOnly = [
    {
      title: '특허 제10-2654625호',
      badge: 'PATENT',
      items: [
        { label: '출원일', value: '2023년 12월 19일' },
        { label: '등록일', value: '2024년 04월 01일' },
        { label: '발명 명칭', value: '교량의 3차원 거동 측정 장치 및 이를 포함하는 시스템' },
      ],
    },
    {
      title: '특허 제10-2654629호',
      badge: 'PATENT',
      items: [
        { label: '출원일', value: '2023년 12월 19일' },
        { label: '등록일', value: '2024년 04월 01일' },
        { label: '발명 명칭', value: '교량의 3차원 거동 측정 방법' },
      ],
    },
    {
      title: '특허 제10-2654632호',
      badge: 'PATENT',
      items: [
        { label: '출원일', value: '2023년 12월 19일' },
        { label: '등록일', value: '2024년 04월 01일' },
        { label: '발명 명칭', value: '교량의 3차원 거동 측정 시스템' },
      ],
    },
  ] as const;

  useEffect(() => {
    return observeMany(
      paragraphRefs,
      (index, isVisible) => {
        setVisibleParagraphs((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.1, // 요소의 10%가 보일 때 트리거
        rootMargin: '0px 0px 50px 0px', // 뷰포트 하단보다 50px 아래에서 시작
      }
    );
  }, []);

  // Title 애니메이션 감지
  useEffect(() => {
    return observeSingle(titleRef, setVisibleTitle, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });
  }, []);

  // Subtitle 애니메이션 감지
  useEffect(() => {
    return observeSingle(subtitleRef, setVisibleSubtitle, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });
  }, []);

  // History Title 애니메이션 감지
  useEffect(() => {
    return observeSingle(historyTitleRef, setVisibleHistoryTitle, {
      threshold: 0.1,
      rootMargin: '0px 0px 50px 0px',
    });
  }, []);

  // History Items 애니메이션 감지
  useEffect(() => {
    return observeMany(
      historyItemRefs,
      (index, isVisible) => {
        setVisibleHistoryItems((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px 100px 0px',
      }
    );
  }, []);

  // License/Patent Cards 애니메이션 감지
  useEffect(() => {
    return observeMany(
      licenseCardRefs,
      (index, isVisible) => {
        setVisibleLicenseCards((prev) => {
          const next = [...prev];
          next[index] = isVisible;
          return next;
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px 80px 0px',
      }
    );
  }, []);

  const heroGroupVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.18,
          delayChildren: prefersReducedMotion ? 0 : 0.08,
        },
      },
    }),
    [prefersReducedMotion]
  );

  /**
   * 설립이념 섹션에서 과거 framer-motion variants를 제거한 뒤에도,
   * HMR·브라우저가 옛 모듈 청크를 잠깐 참조하면 ReferenceError가 날 수 있어 식별자만 유지합니다.
   * (현재 설립이념 마크업에서는 사용하지 않습니다.)
   */
  const philosophyOrchestrator = useMemo(() => ({ hidden: {}, show: {} }), []);
  const philosophyFadeAt = useCallback((_delay: number) => ({ hidden: {}, show: {} }), []);
  const philosophyTimeline = useMemo(
    () => ({
      tBar: 0,
      tL1: 0,
      tL2: 0,
      tL2b: 0,
      tEn: 0,
      tEn2: 0,
      tC1: 0,
      tC2: 0,
      tCore: 0,
      tVals: [0, 0, 0, 0, 0] as number[],
      tSloganLine: [0, 0, 0, 0, 0] as number[],
      tLeftCaption: 0,
      tRightFoundationRow: 0,
      tFoundationLead: 0,
      tFoundationCard1: 0,
      tFoundationCard2: 0,
      tCorePillarsRow: 0,
      tPillarVals: [0, 0, 0, 0, 0, 0] as number[],
    }),
    []
  );

  const heroShellTransition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.2 : 0.35,
      ease: HERO_EASE,
    }),
    [prefersReducedMotion]
  );

  const rm = !!prefersReducedMotion;

  return (
    <div className="w-full overflow-x-hidden">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          히어로 타이포 — 한문·시설사업소·영문만, 5초마다 remount로 스태거 반복
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="greeting-hero"
        ref={heroSectionRef}
        className="relative w-full overflow-hidden"
        style={{ ...heroSectionBackgroundStyle('Main2'), height: 'calc(var(--vh, 1vh) * 100)' }}
      >
        <div className="absolute inset-0 z-0">
          {!videoError ? (
            <HeroVideoLayer
              videoRef={videoRef}
              src={`${import.meta.env.BASE_URL}video/Main2.mp4`}
              posterName="Main2"
              preload={isMobile ? 'none' : 'auto'}
            />
          ) : (
            <div
              className="h-full w-full bg-gradient-to-br from-primary to-primary-hover"
              style={{ backgroundImage: `linear-gradient(135deg, rgba(13, 42, 74, 0.8), rgba(30, 111, 217, 0.8))` }}
            />
          )}
        </div>
        <HeroGradientOverlay posterName="Main2" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`greeting-hero-typo-${heroTypographyCycle}`}
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: heroShellTransition }}
            exit={{ opacity: 0, transition: heroShellTransition }}
          >
              <motion.div
                className={`${NAV_CONTENT_INSET_CLASS} flex h-full flex-col justify-end pt-20 sm:pt-24 md:pt-28 pb-24 sm:pb-28 md:pb-32`}
              >
                <motion.div
                  className="flex flex-col items-start gap-1.5 sm:gap-2 md:gap-2.5"
                  variants={heroGroupVariants}
                  initial="hidden"
                  animate="show"
                >
                  <MotionCharLine
                    ref={hanjaRowWrapRef}
                    text="大韓民國傷痍軍警會"
                    className="w-fit max-w-full whitespace-nowrap font-logo text-white"
                    style={HERO_BRAND_TITLE_STYLE}
                    charStagger={0.028}
                    charDuration={0.38}
                    reducedMotion={rm}
                  />
                  <MotionCharLine
                    ref={sisoLineRef}
                    text="시설사업소"
                    betweenGlyphPx={sisoBetweenGlyphPx}
                    className="font-logo w-fit max-w-full text-white"
                    style={{
                      ...HERO_SISO_TITLE_STYLE,
                      letterSpacing: 0,
                    }}
                    charStagger={0.035}
                    charDuration={0.4}
                    reducedMotion={rm}
                  />
                  <MotionCharLine
                    text="Engineering Safety. Inspiring Innovation."
                    className="whitespace-nowrap text-white/55 tracking-widest"
                    style={{ fontSize: 'clamp(0.6rem, 1.15vw, 0.85rem)', letterSpacing: '0.18em' }}
                    charStagger={0.012}
                    charDuration={0.32}
                    reducedMotion={rm}
                  />
                </motion.div>
              </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll 인디케이터 — 메인 히어로와 동일한 하단·safe-area 기준 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:bottom-6 md:bottom-8 pb-[max(0rem,env(safe-area-inset-bottom,0px))]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[7pt] text-white/40 tracking-[0.2em] uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 text-white/40" />
          </div>
        </div>

        {/* 우측 세로 캡션 — 메인 히어로와 동일 배치 */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-row items-center gap-2.5 sm:gap-3">
          <p
            className="text-xs sm:text-sm text-white/65 font-korean tracking-[0.12em] shrink-0"
            style={{ writingMode: 'vertical-rl' }}
          >
            25.10.25 올림픽대교 전경
          </p>
        </div>
      </section>

      {/* 설립 이념 · 핵심 가치 — 좌/우 2분할, 1뷰포트 */}
      <section
        id="management-philosophy"
        ref={philosophySectionRef}
        className="relative w-full scroll-mt-14 sm:scroll-mt-16 md:scroll-mt-[4.25rem] lg:scroll-mt-20 xl:scroll-mt-[5.5rem] desktop:scroll-mt-24 2xl:scroll-mt-[7.5rem]"
      >
        {/* 네이비 브릿지 — 문서 흐름 밖(absolute), 네비 뒤 톤만 맞춤. 레이아웃 여백을 만들지 않음 */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-14 sm:h-16 md:h-[4.25rem] lg:h-20 xl:h-[5.5rem] desktop:h-24 2xl:h-[7.5rem]"
          style={{ background: 'linear-gradient(160deg, #0B1C2B 0%, #0d2237 100%)' }}
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-0 w-full flex-col lg:h-[calc(100dvh-5rem)] lg:flex-row lg:overflow-hidden xl:h-[calc(100dvh-5.5rem)] desktop:h-[calc(100dvh-6rem)] 2xl:h-[calc(100dvh-7.5rem)]">
          {/* ══ 좌측 패널: 딥 네이비 슬로건 — 모바일 숨김, lg 이상 2분할 */}
          <div
            className={`relative hidden min-h-0 shrink-0 flex-col justify-between pt-12 pr-8 pb-8 lg:flex lg:w-[30%] lg:overflow-x-hidden lg:overflow-y-auto lg:pr-7 lg:pb-7 lg:pt-14 xl:w-[33%] xl:pr-8 xl:pb-8 xl:pt-16 ${NAV_CONTENT_TEXT_START_PL_CLASS}`}
            style={{ background: 'linear-gradient(160deg, #0B1C2B 0%, #0d2237 55%, #071420 100%)' }}
          >
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ contain: 'paint' }}
              aria-hidden
            >
              <div
                className="absolute -left-[28%] -top-[12%] h-[90%] w-[118%] opacity-[0.92]"
                style={{
                  background:
                    'radial-gradient(ellipse 88% 72% at 30% 38%, rgba(105, 195, 248, 0.26) 0%, rgba(75, 150, 210, 0.11) 38%, rgba(40, 95, 150, 0.04) 58%, transparent 74%)',
                }}
              />
              <div
                className="absolute -bottom-[14%] -left-[36%] h-[82%] w-[122%] opacity-[0.88]"
                style={{
                  background:
                    'radial-gradient(ellipse 92% 68% at 22% 70%, rgba(92, 180, 235, 0.2) 0%, rgba(50, 115, 175, 0.07) 45%, transparent 73%)',
                }}
              />
              <div
                className="absolute -right-[6%] top-[10%] h-[60%] w-[88%] opacity-80"
                style={{
                  background:
                    'radial-gradient(ellipse 78% 64% at 56% 44%, rgba(52, 125, 188, 0.11) 0%, transparent 68%)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(168deg, rgba(6, 16, 28, 0.52) 0%, transparent 38%, rgba(4, 10, 20, 0.48) 100%)',
                }}
              />
            </div>

            <div className="relative flex flex-1 flex-col justify-center gap-[1.125rem] py-6 lg:gap-6 lg:py-5 xl:gap-9 xl:py-6">
              <div className="flex flex-col gap-1.5 lg:gap-1.5 xl:gap-2">
                <p className="font-korean font-bold text-white text-[clamp(1.7rem,5vw,2.34rem)] lg:text-[1.8rem] xl:text-[clamp(1.65rem,3.4vw,2.34rem)] desktop:text-[clamp(1.58rem,2.75vw,2.05rem)]" style={{ lineHeight: 1.22, letterSpacing: '-0.01em' }}>국가유공자의</p>
                <p className="font-korean font-bold text-white text-[clamp(1.7rem,5vw,2.34rem)] lg:text-[1.8rem] xl:text-[clamp(1.65rem,3.4vw,2.34rem)] desktop:text-[clamp(1.58rem,2.75vw,2.05rem)]" style={{ lineHeight: 1.22, letterSpacing: '-0.01em' }}>높은 이상을 바탕으로</p>
              </div>
              <div className="flex flex-col gap-1.5 text-[#5B9BD5] lg:gap-1.5 xl:gap-2">
                <p className="font-korean font-bold text-[clamp(1.7rem,5vw,2.34rem)] lg:text-[1.8rem] xl:text-[clamp(1.65rem,3.4vw,2.34rem)] desktop:text-[clamp(1.58rem,2.75vw,2.05rem)]" style={{ lineHeight: 1.22, letterSpacing: '-0.01em' }}>공명정대하고 투명한</p>
                <p className="font-korean font-bold text-[clamp(1.7rem,5vw,2.34rem)] lg:text-[1.8rem] xl:text-[clamp(1.65rem,3.4vw,2.34rem)] desktop:text-[clamp(1.58rem,2.75vw,2.05rem)]" style={{ lineHeight: 1.22, letterSpacing: '-0.01em' }}>조직운영으로</p>
              </div>
              <p className="font-korean font-bold text-white text-[clamp(1.7rem,5vw,2.34rem)] lg:text-[1.8rem] xl:text-[clamp(1.65rem,3.4vw,2.34rem)] desktop:text-[clamp(1.58rem,2.75vw,2.05rem)]" style={{ lineHeight: 1.22, letterSpacing: '-0.01em' }}>국가 발전에 기여합니다.</p>
            </div>

            <div className="relative space-y-0.5 lg:space-y-0.5">
              {(['Veterans-first ethics.', 'Transparent governance.', 'Impact for national infrastructure.'] as const).map(t => (
                <p key={t} className="font-english text-[0.8125rem] tracking-[0.07em] text-white/35 sm:text-[0.875rem] sm:text-white/40 lg:text-[0.82rem] lg:tracking-[0.06em] lg:text-white/48 xl:text-[0.95rem] xl:text-white/50">{t}</p>
              ))}
              <div className="mt-4 h-px w-10 bg-[#1D66B3]/40 lg:mt-3" />
            </div>
          </div>

          {/* ══ 우측 패널 — 가로: 좌는 열 경계 여백, 우는 네비 인셋 끝선과 정렬 */}
          <div
            className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden bg-[#F9FAFB] lg:overflow-hidden ${NAV_CONTENT_TEXT_START_PL_STACKED_THEN_SPLIT_CLASS} ${NAV_CONTENT_TEXT_END_PR_CLASS}`}
          >
            <div className="flex min-h-0 flex-1 flex-col lg:overflow-hidden">
              <div className="shrink-0 pt-8 lg:pt-10 xl:pt-11">
                <div className="mb-5 flex items-center gap-5 lg:mb-3">
                  <span className="shrink-0 font-korean text-xs font-semibold tracking-[0.12em] text-[#1D66B3] sm:text-sm sm:tracking-[0.13em] md:text-[0.875rem] lg:text-[0.875rem] lg:tracking-[0.15em] xl:text-[0.9rem] xl:tracking-[0.16em]">
                    설립 이념
                  </span>
                  <div className="h-px min-w-0 flex-1 bg-slate-400/50" />
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-10 md:gap-y-5 lg:gap-x-14 lg:gap-y-4">
                  {([
                    {
                      numEn: '01', title: '국가 보훈의 이념',
                      body: '대한민국의 오늘은 국가유공자의 공헌과 희생 위에 이룩되었습니다. 그 숭고한 애국정신이 항구적으로 존중받고, 이에 상응하는 명예와 보상이 유지되도록 합니다.',
                    },
                    {
                      numEn: '02', title: '단체설립근거',
                      body: '『국가유공자 등 단체설립에 관한 법률』 제1조에 근거하여 설립되었으며, 국가유공자와 유족의 상부상조, 자활능력 배양, 민족정기 선양, 자유민주주의 수호를 목적으로 합니다.',
                    },
                  ] as const).map(card => (
                    <div key={card.numEn} className="flex min-w-0 flex-col">
                      <span className="mb-2 font-english text-[0.6875rem] font-semibold tracking-[0.18em] text-[#0B1C2B]/30 sm:text-[0.72rem] sm:tracking-[0.2em] md:text-[0.76rem] lg:mb-1.5 lg:text-[0.77rem] lg:tracking-[0.155em] xl:text-[0.8rem] xl:tracking-[0.16em]">
                        {card.numEn}
                      </span>
                      <h3 className="mb-3 flex min-w-0 items-center gap-2 font-korean text-[0.9375rem] font-bold leading-snug text-[#0B1C2B] sm:text-[1.0625rem] md:text-[1.125rem] lg:mb-2 lg:gap-2 lg:text-[1.125rem] lg:leading-snug xl:text-[1.2rem]">
                        <span className="h-3 w-0.5 shrink-0 rounded-full bg-[#1D66B3] lg:h-3" aria-hidden />
                        {card.title}
                      </h3>
                      <p className="min-w-0 whitespace-normal break-words font-korean text-[0.9375rem] leading-[2.05] text-[#4B5563] sm:text-[0.96875rem] sm:leading-[2.12] md:text-[1rem] md:leading-[2.18] lg:text-[1rem] lg:leading-[2.12] xl:text-[1.04rem] xl:leading-[2.23] [word-break:keep-all]">
                        {card.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 설립이념 ↔ 핵심가치 사이 — 남는 높이 흡수(최소 gap 보장) */}
              <div className="min-h-5 shrink-0 lg:min-h-8 lg:flex-1" aria-hidden />

              <div className="mt-auto shrink-0 pb-5 lg:pb-4">
                <div className="mb-3 flex items-center gap-5 lg:mb-2">
                  <span className="shrink-0 font-korean text-xs font-semibold tracking-[0.12em] text-[#1D66B3] sm:text-sm sm:tracking-[0.13em] md:text-[0.875rem] lg:text-[0.875rem] lg:tracking-[0.15em] xl:text-[0.9rem] xl:tracking-[0.16em]">
                    핵심 가치
                  </span>
                  <div className="h-px min-w-0 flex-1 bg-slate-400/50" />
                </div>

                <div className="grid min-w-0 grid-cols-3 gap-3 lg:gap-1.5 xl:gap-2">
                  {([
                    { icon: HandHeart,  title: '상부상조', desc: '서로 돕고 함께 성장',  num: '01' },
                    { icon: Target,     title: '자활자립', desc: '스스로의 역량으로 자립', num: '02' },
                    { icon: Award,      title: '명예선양', desc: '숭고한 희생을 기림',   num: '03' },
                    { icon: TrendingUp, title: '국가발전', desc: '인프라 발전 기여',     num: '04' },
                    { icon: Globe,      title: '세계평화', desc: '공동번영과 협력',      num: '05' },
                  ] as const).map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="relative flex min-w-0 flex-col rounded-lg border border-slate-200/80 bg-white p-3.5 lg:p-3 xl:p-4"
                      >
                        <span className="mb-2.5 font-english text-[0.6875rem] font-semibold tracking-[0.18em] text-[#0B1C2B]/30 sm:text-[0.72rem] sm:tracking-[0.2em] md:text-[0.76rem] lg:mb-2 lg:text-[0.77rem] lg:tracking-[0.155em] xl:text-[0.8rem] xl:tracking-[0.16em]">
                          {item.num}
                        </span>
                        <Icon
                          className="mb-2.5 h-4 w-4 shrink-0 text-[#1D66B3] sm:h-[1.0625rem] sm:w-[1.0625rem] lg:mb-2 lg:h-[0.9375rem] lg:w-[0.9375rem] xl:h-4 xl:w-4"
                          strokeWidth={1.5}
                        />
                        <h3 className="min-w-0 font-korean text-[0.9375rem] font-bold leading-snug text-[#0B1C2B] sm:text-[1.0625rem] md:text-[1.125rem] lg:text-[1.125rem] lg:leading-snug xl:text-[1.2rem]">
                          {item.title}
                        </h3>
                        <p className="mt-1 min-w-0 whitespace-normal break-words font-korean text-[0.9375rem] leading-[1.82] text-[#4B5563] sm:text-[0.96875rem] sm:leading-[1.76] md:text-[1rem] md:leading-[1.68] lg:mt-1 lg:text-[0.98rem] lg:leading-[1.52] xl:text-[1.04rem] xl:leading-[1.55] [word-break:keep-all]">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}

                  <div className="rounded-lg border border-slate-200/80 bg-white" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 인사말 콘텐츠 섹션 */}
      <div className="min-h-screen pt-10" id="ceo-message" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #F0F4F8 100%)' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          {/* 섹션 레이블 */}
          <div
            ref={titleRef}
            className={`flex items-center gap-4 mb-12 md:mb-16 transition-all duration-700 ${visibleTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="h-px w-10 bg-[#1D66B3]" />
            <span className="text-[10px] tracking-[0.45em] text-[#1D66B3] uppercase font-semibold">CEO Message</span>
          </div>

          {/* 2열 레이아웃: 좌측 인용 카드 + 우측 본문 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.85fr] gap-10 lg:gap-16 items-start">

            {/* ── 좌측: 핵심 인용구 카드 (sticky) ── */}
            <div
              ref={subtitleRef}
              className={`transition-all duration-700 delay-100 ${visibleSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="lg:sticky lg:top-24">
                <div
                  className="rounded-xl p-8 md:p-10 shadow-2xl ring-1 ring-white/[0.08]"
                  style={{ background: 'linear-gradient(145deg, #0B1C2B 0%, #132d47 100%)', boxShadow: '0 20px 60px rgba(11,28,43,0.45), 0 4px 16px rgba(11,28,43,0.3), inset 0 1px 0 rgba(255,255,255,0.06)' }}
                >
                  {/* 상단 컬러 액센트 바 — sticky 카드 시각적 앵커 */}
                  <div className="mb-6 h-0.5 w-10 rounded-full bg-[#1D66B3]" aria-hidden />
                  <div
                    className="text-[#1D66B3] leading-none mb-5 select-none"
                    style={{ fontSize: '3.5rem', fontFamily: 'Georgia, serif' }}
                    aria-hidden
                  >
                    &#8220;
                  </div>
                  <blockquote className="font-korean text-white/95 leading-[1.85] lg:leading-[1.7] text-[0.95rem] lg:text-[1.5rem] font-light" style={{ letterSpacing: '0.03em' }}>
                    기술혁신의 창의를 바탕으로,<br />
                    보다 안전하고 편의로운 국가를 완성하다.<br />
                    <span className="text-[#5B9BD5] font-medium">Engineering Safety <br />Inspiring Innovation.</span>
                  </blockquote>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full bg-[#1D66B3]" />
                    <p className="text-white/90 text-[15px] tracking-[0.12em] uppercase">대한민국상이군경회시설사업소</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 우측: 본문 단락 ── */}
            <div>
              <div
                ref={el => paragraphRefs.current[0] = el}
                className={`transition-all duration-700 ${visibleParagraphs[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <p className="mb-7 leading-[1.95] text-[0.92rem] sm:text-[0.97rem] md:text-base text-[#374151] break-words lg:break-keep text-left lg:text-justify">
                  <span className="font-bold text-[#0B1C2B]">대한민국상이군경회</span>는 국가와 사회에 헌신 봉사하고 참여했던 국가유공자들의 높은 이상과 뜻을 한데 모아 국가유공자단체법에 의거하여 설립된 단체로 국가유공자와 그 유족이 상부상조하여 자활능력을 배양하고 순국선열과 호국전몰장병의 유지를 이어 민족정기를 선양하고 국민의 애국정신을 함양시키며 자유민주주의의 수호 및 조국의 평화적 통일과 국제평화의 유지에 이바지함을 목적으로 하는 단체입니다.
                </p>
              </div>

              <div
                ref={el => paragraphRefs.current[1] = el}
                className={`transition-all duration-700 delay-75 ${visibleParagraphs[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <p className="mb-7 leading-[1.95] text-[0.92rem] sm:text-[0.97rem] md:text-base text-[#374151] break-words text-left lg:text-justify">
                  이러한 근간의 정신을 바탕으로 저희 <b className="text-[#0B1C2B]">대한민국상이군경회</b>에서는 <b>『 국가유공자등단체설립에관한법률 』</b> 제7조의 2 및 <b>『 국가유공자단체의수익사업에관한규칙 』</b> 제5조의 규정에 의하여 국가보훈부의 승인을 받은 수익사업 중 토목 및 건축 등 건설기술용역을 <b className="text-[#0B1C2B]">대한민국상이군경회시설사업소</b>를 설립하여 전문적으로 수행하게 되었습니다.
                </p>
              </div>

              <div
                ref={el => paragraphRefs.current[2] = el}
                className={`transition-all duration-700 delay-100 ${visibleParagraphs[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <p className="mb-7 leading-[1.95] text-[0.92rem] sm:text-[0.97rem] md:text-base text-[#374151] break-words lg:break-keep text-left lg:text-justify">
                  <span className="font-bold text-[#0B1C2B]">본 시설사업소</span>는 <b>『건설산업기본법』</b> <b>『엔지니어링산업진흥법』</b> <b>『건설기술진흥법』</b> <b>『시설물의 안전 및 유지관리에 관한 특별법』</b>에 근거하여 업면허를 보유하고 있으며, 각 분야별 다년간의 다양한 경험과 전문 기술력을 가진 기술인들로 구성하여 국가시설물의 설계단계부터 시공, 건설사업관리 및 유지관리차원의 안전진단 및 안전점검 업무에 이르기까지 어느 분야를 담당하여도 신뢰할 수 있는 성과를 제시할 수 있다고 자부하는 바입니다.
                </p>
              </div>

              <div
                ref={el => paragraphRefs.current[3] = el}
                className={`transition-all duration-700 delay-150 ${visibleParagraphs[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <p className="mb-10 leading-[1.95] text-[0.92rem] sm:text-[0.97rem] md:text-base text-[#374151] break-words lg:break-keep text-left lg:text-justify">
                  사람의 걸음에는 그 걸음마다 자국이 남게 마련입니다. 저희는 사람과 사랑으로 융합된 성장의 발자국을 남기려 합니다. 지금까지 국가를 위하여 헌신 봉사하였던 마음가짐을 그대로 이어 건설 분야의 기술용역사업 수행을 통하여 다시 한번 봉사하고자 하오니 많은 협조와 조언을 부탁드리며 저희 <b className="text-[#0B1C2B]">대한민국상이군경회시설사업소</b>에 많은 일을 맡겨주실 것을 부탁말씀 드립니다.
                </p>
              </div>

              {/* 서명 블록 */}
              <div
                ref={el => paragraphRefs.current[5] = el}
                className={`transition-all duration-700 delay-200 ${visibleParagraphs[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <div className="flex flex-col items-end gap-4 border-t border-[#0B1C2B]/10 pt-8 sm:flex-row sm:items-end sm:justify-end sm:gap-5">
                  <p className="font-korean whitespace-nowrap text-base font-semibold tracking-wider text-[#0B1C2B] sm:text-lg">
                    대한민국상이군경회시설사업소장
                  </p>
                  <SignatureReveal active={visibleParagraphs[5]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회사연혁 콘텐츠 섹션 */}
      <div className="min-h-screen pt-20 md:pt-36" id="company-history" style={{ background: 'linear-gradient(to bottom, #F0F4F8 0%, #F7FBFF 100%)' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] lg:w-[65%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 헤더 */}
          <div
            ref={historyTitleRef}
            className={`transition-all duration-1000 ${visibleHistoryTitle ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-2 md:-translate-x-12 md:translate-y-0'}`}
          >
            {/* Mobile header (이미지 스타일) */}
            <div className="md:hidden">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-slate-500">
                <span className="inline-block h-3 w-3 rounded-full border-2 border-[#1D66B3] bg-white" />
                <span>HISTORY</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0B1C2B]">연혁</h2>
              <div className="mt-5 border-b border-slate-300" />
            </div>

            {/* Desktop header (기존) */}
            <div className="hidden md:block mb-10">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                YEARLY <span style={{ color: '#1D66B3' }} className="font-black">GROWTH</span> HIGHLIGHTS
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                국가 인프라 발전에 기여해온 여정의 주요 순간들
              </p>
            </div>
          </div>


          {/* 리스트형 타임라인 */}
          <div className="relative divide-y divide-slate-300 md:divide-y-0 md:space-y-24">
            {/* 연결된 세로줄 (PC 전용) */}
            <div className="hidden md:block absolute left-[304px] top-0 bottom-0 w-px bg-slate-300"></div>
            {/* 2026.01 - 잠시 숨김 처리 */}
            {/* <div
              id="history-2026"
              ref={el => historyItemRefs.current[11] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[11] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2026.01</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">초경량비행장치사용 사업자 등록</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}

            {/* 2021.11 */}
            <div
              id="history-2021"
              ref={el => historyItemRefs.current[10] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[10] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2021.11</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">건설기술용역업 - 건설엔지니어링업 명칭 변경</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2017.03 */}
            <div
              id="history-2017"
              ref={el => historyItemRefs.current[9] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[9] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2017.03</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">기업부설연구소 등록 (시설사업소 휴먼테크연구부)</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2015.02 */}
            <div
              id="history-2015"
              ref={el => historyItemRefs.current[8] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[8] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2015.02</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">감리전문회사 - 건설기술용역업 명칭 변경</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2014.03 */}
            <div
              id="history-2014"
              ref={el => historyItemRefs.current[7] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2014.03</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">대한민국상이군경회시설사업소 소장 나경준 부임</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2012.05 */}
            <div
              id="history-2012"
              ref={el => historyItemRefs.current[6] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2012.05</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">엔지니어링사업자 신고</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2009.10 */}
            <div
              id="history-2009-10"
              ref={el => historyItemRefs.current[5] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2009.10</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">감리전문회사 등록</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2009.07 */}
            <div
              id="history-2009-07"
              ref={el => historyItemRefs.current[4] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2009.07</h3>
              </div>
              <div className="relative md:pl-10">
                <ul className="divide-y divide-slate-200">
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">대한민국상이군경회 - 대한민국상이군경회시설사업소 법인 명칭 변경</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2003.06 */}
            <div
              id="history-2003-06"
              ref={el => historyItemRefs.current[3] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3 className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:w-[256px]" style={{ color: '#1D66B3' }}>2003.06</h3>
              </div>
              <div className="relative md:pl-10">
                <ul>
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">안전진단전문기관 등록</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                  <li className="group relative py-3 pl-6">
                    <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                    <div>
                      <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">엔지니어링활동주체 신고</p>
                      <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2002.12 */}
            <div
              id="history-2002"
              ref={el => historyItemRefs.current[2] = el}
              className={`grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-6 py-10 md:py-0 transition-all duration-700 ${visibleHistoryItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="md:w-[240px] md:text-right md:pr-6">
                <h3
                  className="text-3xl max-[480px]:text-3xl sm:text-4xl md:text-5xl font-extrabold md:whitespace-nowrap md:w-[256px]"
                  style={{ color: '#0C2B4B' }}
                >
                  2002.12.03
                </h3>
              </div>
              <div className="relative md:pl-10">
                  <ul className="divide-y divide-slate-200">
                    <li className="group relative py-3 pl-6">
                      <span className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 bg-white border-[#1D66B3] group-hover:bg-[#1D66B3] group-hover:border-[#1D66B3]"></span>
                      <div>
                        <p className="text-base max-[480px]:text-base sm:text-lg text-gray-700">대한민국상이군경회 시설물관리사업소 설립</p>
                        <div className="hidden md:block mt-2 border-b border-slate-300 w-full"></div>
                      </div>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 보유면허 및 기술 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" id="license" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#1D66B3] to-[#1D66B3] bg-clip-text text-transparent py-4 border-l-4 border-[#1D66B3] pl-6">국가승인서 및 등록증</h2>
          </div>

          {/* 텍스트 카드 (4개) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {approvalAndCertificates.map((card, index) => (
              <motion.div
                key={card.title}
                ref={(el) => {
                  licenseCardRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                animate={visibleLicenseCards[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.4, ease: 'easeOut' }}
                className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="px-5 pt-5 pb-4 border-b border-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.75rem] tracking-[0.22em] font-semibold text-slate-500">
                      {card.badge}
                    </p>
                    <span className="h-1.5 w-10 rounded-full bg-[#0C2B4B]/90" />
                  </div>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#0B1C2B] break-keep">
                    {card.title}
                  </h3>
                </div>
                <div className="px-5 py-5">
                  <dl className="space-y-3">
                    {card.items.map((it) => (
                      <div key={it.label} className="grid grid-cols-[92px_1fr] gap-3">
                        <dt className="text-sm font-semibold text-slate-600">{it.label}</dt>
                        <dd className="text-sm text-[#0C2B4B] leading-6 break-keep">{it.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 보유기술 (특허) 콘텐츠 섹션 */}
      <div className="pt-20 pb-16" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          {/* 제목 */}
          <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#1D66B3] to-[#1D66B3] bg-clip-text text-transparent py-4 border-l-4 border-[#1D66B3] pl-6">보유기술</h2>
          </div>

          {/* 텍스트 카드 (3개) */}
          {/* md(768px)에서는 3열이 너무 좁아 텍스트가 과도하게 줄바꿈되므로 2열로 표시, lg부터 3열 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {patentsTextOnly.map((card, idx) => {
              const index = approvalAndCertificates.length + idx;
              return (
                <motion.div
                  key={card.title}
                  ref={(el) => {
                    licenseCardRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  animate={visibleLicenseCards[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.4, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.05 }}
                  className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="px-5 pt-5 pb-4 border-b border-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.75rem] tracking-[0.22em] font-semibold text-slate-500">
                        {card.badge}
                      </p>
                      <span className="h-1.5 w-10 rounded-full bg-[#1D66B3]/90" />
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#0B1C2B] break-keep">
                      {card.title}
                    </h3>
                  </div>
                  <div className="px-5 py-5">
                    <dl className="space-y-3">
                      {card.items.map((it) => (
                        <div key={it.label} className="grid grid-cols-[72px_1fr] gap-3">
                          <dt className="text-sm font-semibold text-slate-600">{it.label}</dt>
                          <dd className="min-w-0 text-sm text-[#0C2B4B] leading-6 break-keep">{it.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 조직도 (v4 코드 반영: 기존 폰트/컬러 토큰 사용) */}
      <div className="pt-20 pb-16" id="organization-chart" style={{ backgroundColor: '#F7FBFF' }}>
        <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-1.5 w-12 rounded-full bg-[#1e40af]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#1D66B3' }}>
              조직구성
            </h2>
          </div>

          <div className="w-full">
            <div className="rounded-2xl border border-border bg-white p-4 sm:p-8 lg:p-10 shadow-sm">
              <OrganizationChartV4 />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GreetingSection;
