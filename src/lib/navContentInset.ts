/** 상단 내비 본문 래퍼 — 너비·패딩 브레이크포인트를 모든 페이지에서 동일하게 유지 */
export const NAV_CONTENT_INSET_CLASS =
  'w-[95%] sm:w-[90%] md:w-[85%] mx-auto px-2 sm:px-4 md:px-6 lg:px-8';

/**
 * 뷰포트 좌측 끝(0) 기준, 네비 인셋 박스 안쪽(패딩 적용 후) 텍스트 시작선과 맞추기 위한 pl.
 * (100vw − 컨테이너 너비) / 2 + 해당 구간 px — 값은 NAV_CONTENT_INSET_CLASS 와 반드시 동기화.
 */
export const NAV_CONTENT_TEXT_START_PL_CLASS =
  'pl-[calc(2.5vw+0.5rem)] sm:pl-[calc(5vw+1rem)] md:pl-[calc(7.5vw+1.5rem)] lg:pl-[calc(7.5vw+2rem)]';

/**
 * 설립이념 우측 패널 등: lg 미만(세로 스택)은 뷰포트 0 기준으로 NAV 와 동일 pl,
 * lg+ 는 좌측 딥네이비 열 옆 고정 여백만 사용.
 */
export const NAV_CONTENT_TEXT_START_PL_STACKED_THEN_SPLIT_CLASS =
  'pl-[calc(2.5vw+0.5rem)] sm:pl-[calc(5vw+1rem)] md:pl-[calc(7.5vw+1.5rem)] lg:pl-9 xl:pl-10';

/**
 * 뷰포트 우측 끝 기준, 네비 인셋 박스 오른쪽 안쪽과 맞추기 위한 pr — PL 과 대칭, 동기화 필수.
 */
export const NAV_CONTENT_TEXT_END_PR_CLASS =
  'pr-[calc(2.5vw+0.5rem)] sm:pr-[calc(5vw+1rem)] md:pr-[calc(7.5vw+1.5rem)] lg:pr-[calc(7.5vw+2rem)]';
