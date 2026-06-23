import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { withBaseUrl } from '@/lib/utils';

const SIGN_W = 364;
const SIGN_H = 137;

/** sign.png 알파 중심선 — scripts/trace-sign-path.mjs 로 재생성 가능 */
const SIGN_STROKE_PATH =
  'M 0,130 Q 0,130 2,129.5 Q 4,129 6,127 Q 8,125 10,123.5 Q 12,122 14,120.5 Q 16,119 18,117.5 Q 20,116 22,114 Q 24,112 26,110 Q 28,108 30,106 Q 32,104 34,101.5 Q 36,99 38,97 Q 40,95 42,93 Q 44,91 46,89 Q 48,87 50,84.5 Q 52,82 54,81 Q 56,80 58,78 Q 60,76 62,74 Q 64,72 66,71 Q 68,70 70,68 Q 72,66 74,64.5 Q 76,63 78,61.5 Q 80,60 82,58 Q 84,56 86,61.5 Q 88,67 90,68.5 Q 92,70 94,69.5 Q 96,69 98,65.5 Q 100,62 102,60 Q 104,58 106,56.5 Q 108,55 110,52.5 Q 112,50 114,48 Q 116,46 118,44 Q 120,42 122,44 Q 124,46 126,54 Q 128,62 130,64 Q 132,66 134,67.5 Q 136,69 138,68.5 Q 140,68 142,67 Q 144,66 146,64.5 Q 148,63 150,61.5 Q 152,60 154,58.5 Q 156,57 158,55.5 Q 160,54 162,52.5 Q 164,51 166,54.5 Q 168,58 170,61.5 Q 172,65 174,63 Q 176,61 178,60 Q 180,59 182,57.5 Q 184,56 186,55 Q 188,54 190,63.5 Q 192,73 194,75 Q 196,77 198,74.5 Q 200,72 202,71 Q 204,70 206,69 Q 208,68 210,66.5 Q 212,65 214,64 Q 216,63 218,62 Q 220,61 222,60.5 Q 224,60 226,59.5 Q 228,59 230,58 Q 232,57 234,57.5 Q 236,58 238,58 Q 240,58 242,58 Q 244,58 246,56 Q 248,54 250,52 Q 252,50 254,48.5 Q 256,47 258,46 Q 260,45 262,46.5 Q 264,48 266,47 Q 268,46 270,48.5 Q 272,51 274,51.5 Q 276,52 278,51 Q 280,50 282,48.5 Q 284,47 286,45.5 Q 288,44 290,43 Q 292,42 294,41.5 Q 296,41 298,40.5 Q 300,40 302,40 Q 304,40 306,51.5 Q 308,63 310,66 Q 312,69 314,68.5 Q 316,68 318,67.5 Q 320,67 322,66 Q 324,65 326,68 Q 328,71 330,71 Q 332,71 334,79 Q 336,87 338,85.5 Q 340,84 342,82 Q 344,80 346,78 Q 348,76 350,64 Q 352,52 354,50.5 Q 356,49 358,47 T 360,45';

const SIGN_IMG_CLASS = 'h-11 w-auto shrink-0 opacity-[0.88] sm:h-14';
const SIGN_IMG_SRC = withBaseUrl('sign.png');

type SignatureRevealProps = {
  /** 스크롤 진입 후 true — 드로잉 시작 */
  active: boolean;
};

export function SignatureReveal({ active }: SignatureRevealProps) {
  const maskId = useId().replace(/:/g, '');
  const pathRef = useRef<SVGPathElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const playedRef = useRef(false);

  // 마운트 시 서명 숨김 (플래시 방지)
  useEffect(() => {
    if (revealed || prefersReducedMotion) return;
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  }, [revealed, prefersReducedMotion]);

  // active 시 stroke-dashoffset 0으로 드로잉
  useEffect(() => {
    if (!active || revealed || prefersReducedMotion || playedRef.current) return;
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.transition = 'stroke-dashoffset 3.0s cubic-bezier(0.4, 0, 0.2, 1) 0.25s';
        path.style.strokeDashoffset = '0';
      });
    });
    playedRef.current = true;
  }, [active, revealed, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion && active) setRevealed(true);
  }, [prefersReducedMotion, active]);

  if (revealed) {
    return (
      <img
        src={SIGN_IMG_SRC}
        alt=""
        width={SIGN_W}
        height={SIGN_H}
        className={SIGN_IMG_CLASS}
        decoding="async"
        aria-hidden
      />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${SIGN_W} ${SIGN_H}`}
      className={SIGN_IMG_CLASS}
      aria-hidden
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width={SIGN_W} height={SIGN_H} fill="black" />
          <path
            ref={pathRef}
            d={SIGN_STROKE_PATH}
            fill="none"
            stroke="white"
            strokeWidth="110"
            strokeLinecap="round"
            strokeLinejoin="round"
            onTransitionEnd={(e) => {
              if (e.propertyName === 'stroke-dashoffset') setRevealed(true);
            }}
          />
        </mask>
      </defs>
      <image href={SIGN_IMG_SRC} width={SIGN_W} height={SIGN_H} mask={`url(#${maskId})`} />
    </svg>
  );
}
