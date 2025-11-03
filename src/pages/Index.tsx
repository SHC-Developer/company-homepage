import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SitemapSection } from '@/components/SitemapSection';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <SitemapSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
