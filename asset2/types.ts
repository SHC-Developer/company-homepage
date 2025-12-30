
import { ReactNode } from 'react';

export interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  highlightWords: string[];
}

export interface CategoryItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  hash?: string;
}
