import React from 'react';
import { Navigation } from '../components/Navigation';
import { GreetingSection } from '../components/GreetingSection';
import { Footer } from '../components/Footer';

const Greeting = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navigation variant="default" forceLightTheme={true} />
      <GreetingSection />
      <Footer />
    </div>
  );
};

export default Greeting;
