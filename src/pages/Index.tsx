import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { BusinessAreasSection } from '@/components/BusinessAreasSection';
import { SitemapSection } from '@/components/SitemapSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <BusinessAreasSection />
        <SitemapSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
