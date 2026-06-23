import { useLayoutEffect } from 'react';
import { heroGradientStyle } from '@/lib/heroGradients';

type HeroGradientOverlayProps = {
  posterName: 'Main1' | 'Main2';
  className?: string;
};

/** 히어로 미디어(포스터·영상) 위 고정 불투명층 — 초기 진입부터 항상 표시 */
export function HeroGradientOverlay({ posterName, className = '' }: HeroGradientOverlayProps) {
  useLayoutEffect(() => {
    document.getElementById('hero-boot-gradient')?.remove();
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      style={heroGradientStyle(posterName)}
      aria-hidden
    />
  );
}
