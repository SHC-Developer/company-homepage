import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const STORAGE_KEY = 'routeScrollPositions:v1';

function getRouteKey(location: { pathname: string; search: string; hash: string }) {
  // path + query + hash 별로 복원 (e.g., /greeting#license 같은 경우)
  return `${location.pathname}${location.search}${location.hash}`;
}

function loadPositions(): Record<string, number> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Record<string, number>;
  } catch {
    return {};
  }
}

function savePositions(map: Record<string, number>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

/**
 * 라우트 전환 시 스크롤 정책:
 * - PUSH/REPLACE: 항상 상단으로 이동(페이지 전환 시 중간에서 열리는 현상 방지)
 * - POP(뒤로/앞으로): 해당 라우트의 마지막 스크롤 위치로 복원(사이트맵 페이지로 복귀 UX 개선)
 */
export const RouteScrollManager = () => {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'

  // 현재 라우트에서 떠날 때 스크롤 위치 저장
  // NOTE: useEffect cleanup은 라우트 전환 후(스크롤이 이미 변경된 뒤)에 실행될 수 있어
  // 저장값이 0으로 덮이는 문제가 발생할 수 있음. layout effect cleanup으로 "페인트 전에" 저장.
  useLayoutEffect(() => {
    const key = getRouteKey(location);
    return () => {
      const map = loadPositions();
      map[key] = window.scrollY;
      savePositions(map);
    };
  }, [location.key]);

  // 라우트가 바뀌면 정책에 따라 스크롤 위치 적용
  useLayoutEffect(() => {
    const key = getRouteKey(location);
    const map = loadPositions();
    const top = navType === 'POP' ? (map[key] ?? 0) : 0;
    window.scrollTo({ top, behavior: 'auto' });
  }, [location.key, navType]);

  return null;
};


