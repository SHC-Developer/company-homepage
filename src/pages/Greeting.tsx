import React from 'react';
import { Navigation } from '../components/Navigation';
import { GreetingSection } from '../components/GreetingSection';
import { Footer } from '../components/Footer';

const Greeting = () => {
  React.useEffect(() => {
    // URL 해시 확인
    const hash = window.location.hash;
    
    if (hash === '#management-philosophy') {
      // 경영이념 섹션으로 스크롤
      const timer = setTimeout(() => {
        const philosophySection = document.getElementById('management-philosophy');
        if (philosophySection) {
          philosophySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (hash === '#company-history') {
      // 회사연혁 섹션으로 스크롤
      const timer = setTimeout(() => {
        const historySection = document.getElementById('company-history');
        if (historySection) {
          historySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (hash === '#license') {
      // 보유면허 및 기술특허 섹션으로 스크롤
      const timer = setTimeout(() => {
        const licenseSection = document.getElementById('license');
        if (licenseSection) {
          licenseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (hash === '#directions') {
      // 오시는길 섹션으로 스크롤
      const timer = setTimeout(() => {
        const directionsSection = document.getElementById('directions');
        if (directionsSection) {
          directionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // 기본적으로 CEO MESSAGE 섹션으로 스크롤
      const timer = setTimeout(() => {
        const contentSection = document.getElementById('ceo-message');
        if (contentSection && !hash) {
          contentSection.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
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
