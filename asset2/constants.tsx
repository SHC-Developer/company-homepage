
import React from 'react';
import { 
  Building2, 
  Lightbulb, 
  CheckSquare2, 
  Shield, 
  Users, 
  Search 
} from 'lucide-react';
import { SlideItem, CategoryItem } from './types';

export const SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    title: '당신의 오늘은 안전하셨습니까?',
    subtitle: '국민의 일상을 지키는 든든한 파트너',
    imageSrc: 'https://picsum.photos/id/122/1920/1080',
    highlightWords: ['오늘'],
  },
  {
    id: 'slide-2',
    title: '국민들의 안전하고 쾌적한 공간',
    subtitle: '최고의 시설 관리 솔루션을 제공합니다',
    imageSrc: 'https://picsum.photos/id/142/1920/1080',
    highlightWords: ['안전', '쾌적'],
  },
  {
    id: 'slide-3',
    title: '아름다운 생활을 영위하는 나라건설',
    subtitle: '미래를 향한 발걸음, 우리가 함께합니다',
    imageSrc: 'https://picsum.photos/id/164/1920/1080',
    highlightWords: ['나라건설'],
  },
  {
    id: 'slide-4',
    title: '사람과 사랑으로 융합된 서비스',
    subtitle: '진심을 다하는 전문 인력의 노하우',
    imageSrc: 'https://picsum.photos/id/180/1920/1080',
    highlightWords: ['사람', '사랑'],
  },
  {
    id: 'slide-5',
    title: '성장의 발자국을 남기는 시설사업소',
    subtitle: '신뢰와 정직으로 보답하겠습니다',
    imageSrc: 'https://picsum.photos/id/191/1920/1080',
    highlightWords: ['성장', '시설사업소'],
  },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'ceo',
    label: '인사말',
    icon: <Building2 />,
    path: '/greeting',
    hash: 'management-philosophy',
  },
  {
    id: 'vision',
    label: '비전 및 경영이념',
    icon: <Lightbulb />,
    path: '/greeting',
    hash: 'management-philosophy',
  },
  {
    id: 'history',
    label: '회사연혁',
    icon: <CheckSquare2 />,
    path: '/greeting',
    hash: 'company-history',
  },
  {
    id: 'license',
    label: '보유 면허 및 자격증',
    icon: <Shield />,
    path: '/greeting',
    hash: 'license',
  },
  {
    id: 'organization',
    label: '조직도',
    icon: <Users />,
    path: '/greeting',
    hash: 'organization',
  },
  {
    id: 'portfolio',
    label: '수행 실적',
    icon: <Search />,
    path: '/portfolio',
  },
];
