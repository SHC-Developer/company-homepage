import React from 'react';
import { Navigation } from '@/components/Navigation';
import GreetingSection from '@/components/GreetingSection';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const Greeting = () => {
  React.useEffect(() => {
    const root = document.documentElement;

    const setVH = () => {
      const h = Math.round(window.visualViewport?.height ?? window.innerHeight);
      root.style.setProperty('--vh', `${h * 0.01}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', setVH);

    return () => {
      root.style.removeProperty('--vh');
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      vv?.removeEventListener('resize', setVH);
    };
  }, []);

  React.useEffect(() => {
    const hash = window.location.hash;

    const hashToId: Record<string, string> = {
      '#ceo-message': 'ceo-message',
      '#management-philosophy': 'management-philosophy',
      '#company-history': 'company-history',
      '#license': 'license',
      '#directions': 'directions',
    };

    const targetId = hash ? hashToId[hash] : undefined;
    if (!targetId) return;

    const behavior: ScrollBehavior =
      targetId === 'ceo-message' || targetId === 'management-philosophy' ? 'auto' : 'smooth';

    const timer = window.setTimeout(() => {
      const element = document.getElementById(targetId);
      if (!element) return;

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
