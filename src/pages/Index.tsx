import React from 'react';
import { Navigation } from '@/components/Navigation';
import { LandingSections } from '@/components/LandingSections';
import { ScrollToTop } from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <main className="overflow-x-hidden">
        <LandingSections />
      </main>
    </div>
  );
};

export default Index;
