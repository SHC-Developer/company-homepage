import React from 'react';
import { Navigation } from '../components/Navigation';
import { GreetingSection } from '../components/GreetingSection';
import { Footer } from '../components/Footer';

const Greeting = () => {
  React.useEffect(() => {
    // 페이지 로드 시 CEO MESSAGE 섹션으로 스크롤
    const timer = setTimeout(() => {
      const contentSection = document.getElementById('ceo-message');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'auto' });
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
    </div>
  );
};

export default Greeting;
