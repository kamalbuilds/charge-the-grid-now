'use client';

import React from 'react';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import TokenomicsSection from '../components/TokenomicsSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <FeatureSection />
      <TokenomicsSection />
      
    </main>
  );
}
