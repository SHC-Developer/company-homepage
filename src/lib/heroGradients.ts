/** 히어로 배경 위 텍스트 시인성용 그라데이션 — 부트·섹션·영상 레이어 전 구간 동일 값 */
export const HERO_MAIN1_GRADIENT =
  'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.02) 100%)';

export const HERO_MAIN2_GRADIENT =
  'linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.24) 28%, rgba(0,0,0,0.1) 52%, rgba(0,0,0,0.03) 70%, transparent 88%)';

export const HERO_GRADIENTS = {
  Main1: HERO_MAIN1_GRADIENT,
  Main2: HERO_MAIN2_GRADIENT,
} as const;

export function heroGradientStyle(posterName: 'Main1' | 'Main2'): { background: string } {
  return { background: HERO_GRADIENTS[posterName] };
}

export function removeHeroBootLayers() {
  document.getElementById('hero-boot-poster')?.remove();
  document.getElementById('hero-boot-gradient')?.remove();
}
