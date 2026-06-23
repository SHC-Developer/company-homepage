#!/usr/bin/env node
// 스크린샷 검증 + 시각 회귀(visual regression) 비교 자동화
//
// 흐름:
//   1) 수정 전 기준선 저장:  npm run shot -- --baseline
//   2) 코드 수정
//   3) 수정 후 비교:        npm run shot
//      → screenshots/current/ 캡처 후 screenshots/baseline/ 와 픽셀 비교
//      → 달라진 부분을 screenshots/diff/ 에 빨갛게 표시하고 변화율(%) 리포트
//
// 영상/무한 애니메이션 섹션(히어로 영상, 파트너 로고 마퀴, 푸터 웨이브)은
// 마스킹되어 비교에서 제외된다(MASK_SELECTORS).
//
// 사용법(타깃 = "route#anchor"):
//   npm run shot                                  → 홈(/) 캡처+비교
//   npm run shot -- "greeting#license"            → 해당 섹션 캡처+비교
//   npm run shot -- portfolio recruit             → 여러 타깃 연속
//   npm run shot -- --baseline "greeting#license" → 기준선만 저장(비교 안 함)
// 옵션:
//   --baseline      비교 대신 기준선(baseline/) 저장
//   --full          전체 페이지(스크롤 포함) 캡처 (anchor 없을 때만)
//   --desktop-only / --mobile-only
//   --port=8081     dev 서버 포트
//   --threshold=0.1 픽셀 민감도(0 엄격 ~ 1 느슨)

import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith('--'));
const targets = args.filter((a) => !a.startsWith('--'));

const getFlag = (name, fallback) => {
  const hit = flags.find((f) => f === `--${name}` || f.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const [, v] = hit.split('=');
  return v ?? true;
};

const PORT = getFlag('port', '8081');
const BASE = `http://localhost:${PORT}`;
const FULL = !!getFlag('full', false);
const DESKTOP_ONLY = !!getFlag('desktop-only', false);
const MOBILE_ONLY = !!getFlag('mobile-only', false);
const IS_BASELINE = !!getFlag('baseline', false);
const NO_MASK = !!getFlag('no-mask', false); // 영상/마퀴 마스킹 끄고 실제 화면 캡처(육안 검증용)
const THRESHOLD = parseFloat(getFlag('threshold', '0.1'));

const ROOT = path.resolve(process.cwd(), 'screenshots');
const DIR = {
  baseline: path.join(ROOT, 'baseline'),
  current: path.join(ROOT, 'current'),
  diff: path.join(ROOT, 'diff'),
};

// 비교에서 제외할 동적(영상/무한 애니메이션) 요소 — index.css 클래스 기준
const MASK_SELECTORS = [
  'video',
  '.hero-video-bg',
  '.animate-scroll', // 파트너 로고 마퀴
  '.animate-wave',
  '.animate-wave-slow', // 푸터 웨이브
];
const MASK_COLOR = '#FF00FF'; // baseline·current 동일하게 칠해져 diff 0

// 애니메이션/트랜지션 정지 + 영상 일시정지 (마스킹 안 된 잔여 움직임까지 안정화)
const FREEZE_CSS = `*,*::before,*::after{animation:none!important;transition:none!important;animation-play-state:paused!important;caret-color:transparent!important}`;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
];
const devices = VIEWPORTS.filter((v) =>
  DESKTOP_ONLY ? v.name === 'desktop' : MOBILE_ONLY ? v.name === 'mobile' : true
);

const parseTarget = (raw) => {
  const [routeRaw = '', anchor = ''] = raw.split('#');
  const route = routeRaw.replace(/^\/+/, '');
  const label = `${route || 'home'}${anchor ? `-${anchor}` : '-top'}`.replace(/[^a-z0-9-_]/gi, '_');
  return { route, anchor, label, url: `${BASE}/${route}` };
};

// 두 PNG 비교 → diff 파일 작성, 변화율(%) 반환
const compare = (baselinePath, currentPath, diffPath) => {
  if (!existsSync(baselinePath)) return { status: 'no-baseline' };
  const base = PNG.sync.read(readFileSync(baselinePath));
  const cur = PNG.sync.read(readFileSync(currentPath));

  if (base.width !== cur.width || base.height !== cur.height) {
    return {
      status: 'size-changed',
      detail: `${base.width}x${base.height} → ${cur.width}x${cur.height}`,
    };
  }

  const { width, height } = base;
  const diff = new PNG({ width, height });
  const changed = pixelmatch(base.data, cur.data, diff.data, width, height, {
    threshold: THRESHOLD,
    includeAA: false,
    alpha: 0.4,
    diffColor: [255, 0, 0],
  });
  writeFileSync(diffPath, PNG.sync.write(diff));
  const ratio = (changed / (width * height)) * 100;
  return { status: 'compared', changed, ratio };
};

const shotsFor = targets.length ? targets : [''];

const main = async () => {
  // OneDrive 동기화가 폴더를 잠깐 잠그는 경우 대비 재시도
  const rmDir = (p) => rm(p, { recursive: true, force: true, maxRetries: 8, retryDelay: 250 });
  if (IS_BASELINE) {
    await rmDir(DIR.baseline);
    await mkdir(DIR.baseline, { recursive: true });
  } else {
    await rmDir(DIR.current);
    await rmDir(DIR.diff);
    await mkdir(DIR.current, { recursive: true });
    await mkdir(DIR.diff, { recursive: true });
  }

  const browser = await chromium.launch();
  const reports = [];

  try {
    for (const device of devices) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: device.deviceScaleFactor ?? 1,
        isMobile: device.isMobile ?? false,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();

      for (const raw of shotsFor) {
        const { anchor, label, url } = parseTarget(raw);
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        await page.addStyleTag({ content: FREEZE_CSS });
        await page.evaluate(() => {
          document.querySelectorAll('video').forEach((v) => {
            try { v.pause(); v.currentTime = 0; } catch {}
          });
        });

        if (anchor) {
          await page.evaluate((id) => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
          }, anchor);
        }
        await page.waitForTimeout(500);

        const fileName = `${label}-${device.name}.png`;
        const outDir = IS_BASELINE ? DIR.baseline : DIR.current;
        const outPath = path.join(outDir, fileName);

        await page.screenshot({
          path: outPath,
          fullPage: FULL && !anchor,
          mask: NO_MASK ? [] : MASK_SELECTORS.map((s) => page.locator(s)),
          maskColor: MASK_COLOR,
        });

        if (IS_BASELINE) {
          reports.push(`✓ baseline  ${path.relative(process.cwd(), outPath)}`);
        } else {
          const r = compare(
            path.join(DIR.baseline, fileName),
            outPath,
            path.join(DIR.diff, fileName)
          );
          if (r.status === 'no-baseline') {
            reports.push(`• ${fileName}  baseline 없음 (먼저 --baseline 실행)`);
          } else if (r.status === 'size-changed') {
            reports.push(`⚠ ${fileName}  치수 변경 ${r.detail} (높이/레이아웃 변화)`);
          } else if (r.ratio === 0) {
            reports.push(`✓ ${fileName}  변화 없음 (0%)`);
          } else {
            reports.push(
              `⚠ ${fileName}  변화 ${r.ratio.toFixed(3)}% (${r.changed}px) → diff/${fileName}`
            );
          }
        }
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }

  console.log(reports.join('\n'));
  if (IS_BASELINE) {
    console.log(`\n기준선 저장 완료 → ${path.relative(process.cwd(), DIR.baseline)}/`);
  } else {
    const changed = reports.filter((l) => l.startsWith('⚠'));
    console.log(
      changed.length
        ? `\n변화 감지 ${changed.length}건 — diff/ 의 빨간 영역 확인 (영상·마퀴·웨이브는 마스킹 제외됨)`
        : `\n회귀 없음 — 변경된 픽셀 없음`
    );
  }
};

main().catch((err) => {
  console.error('실패:', err.message);
  console.error(`dev 서버가 ${BASE} 에서 실행 중인지 확인하세요 (npm run dev).`);
  process.exit(1);
});
