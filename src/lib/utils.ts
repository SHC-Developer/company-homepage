import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withBaseUrl(path: string) {
  const baseUrl = import.meta.env.BASE_URL ?? '/';
  const normalized = path.replace(/^\/+/, '');
  return `${baseUrl}${normalized}`;
}

export function setupLoopingVideo(
  video: HTMLVideoElement,
  handlers: {
    onEndedPlayError?: (error: unknown) => void;
    onLoadError?: () => void;
    onAutoplayError?: (error: unknown) => void;
  } = {}
) {
  const handleEnded = () => {
    video.currentTime = 0;
    video.play().catch((e) => handlers.onEndedPlayError?.(e));
  };

  const handleError = () => {
    handlers.onLoadError?.();
  };

  video.addEventListener('ended', handleEnded);
  video.addEventListener('error', handleError);

  // 자동 재생 시도 (브라우저 정책으로 실패할 수 있음)
  video.play().catch((e) => handlers.onAutoplayError?.(e));

  return () => {
    video.removeEventListener('ended', handleEnded);
    video.removeEventListener('error', handleError);
  };
}
