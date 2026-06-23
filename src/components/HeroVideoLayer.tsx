import React, { useEffect, useState } from 'react';
import { heroPosterImage } from '@/lib/utils';
import { heroPosterLqip } from '@/lib/heroPosterLqip';

const VIDEO_COVER_CLASS =
  'absolute top-1/2 left-1/2 h-[56.25vw] w-[177.77vh] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 transform object-cover';

type HeroVideoLayerProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  posterName: 'Main1' | 'Main2';
  preload?: 'auto' | 'none' | 'metadata';
};

/** 포스터 즉시 표시 → 영상 첫 프레임 재생 시 crossfade (파란 단색 플래시 방지) */
export function HeroVideoLayer({
  videoRef,
  src,
  posterName,
  preload = 'auto',
}: HeroVideoLayerProps) {
  const posterFull = heroPosterImage(posterName);
  const [posterSrc, setPosterSrc] = useState(heroPosterLqip[posterName]);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setPosterSrc(posterFull);
    img.src = posterFull;
  }, [posterFull]);

  const removeBootPoster = () => {
    document.getElementById('hero-boot-poster')?.remove();
  };

  const posterImgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (posterImgRef.current?.complete) removeBootPoster();
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = posterFull;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [posterFull]);

  return (
    <div className="relative h-full w-full">
      <img
        ref={posterImgRef}
        src={posterSrc}
        alt=""
        aria-hidden
        decoding="sync"
        fetchPriority="high"
        onLoad={removeBootPoster}
        className={`${VIDEO_COVER_CLASS} z-0 transition-opacity duration-300 ${frameReady ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={videoRef}
        className={`${VIDEO_COVER_CLASS} z-[1] transition-opacity duration-300 ${frameReady ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        poster={posterFull}
        autoPlay
        muted
        playsInline
        loop={false}
        preload={preload}
        style={{ pointerEvents: 'none' }}
        onPlaying={() => setFrameReady(true)}
      />
    </div>
  );
}

export function heroSectionBackgroundStyle(posterName: 'Main1' | 'Main2'): React.CSSProperties {
  const full = heroPosterImage(posterName);
  return {
    backgroundImage: `url(${heroPosterLqip[posterName]}), url(${full})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
}
