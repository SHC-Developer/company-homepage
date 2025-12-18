import React from 'react';
import { Navigation } from '@/components/Navigation';
import { GreetingSection } from '@/components/GreetingSection';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const Greeting = () => {
  React.useEffect(() => {
    // URL 해시 확인 후 해당 섹션으로 스크롤
    const hash = window.location.hash;

    const hashToId: Record<string, string> = {
      '#management-philosophy': 'management-philosophy',
      '#company-history': 'company-history',
      '#license': 'license',
      '#directions': 'directions',
    };

    const targetId = hash ? hashToId[hash] : 'ceo-message';
    const behavior: ScrollBehavior = targetId === 'ceo-message' ? 'auto' : 'smooth';

    const timer = window.setTimeout(() => {
      const element = document.getElementById(targetId);
      if (!element) return;

      // 기존 동작 유지: 해시가 없을 때만 CEO MESSAGE로 자동 이동
      if (targetId === 'ceo-message' && hash) return;

      if (behavior === 'auto') {
        element.scrollIntoView({ behavior });
      } else {
        element.scrollIntoView({ behavior, block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navigation variant="default" forceLightTheme={false} />
      <div id="greeting-content">
        <GreetingSection />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Greeting;
