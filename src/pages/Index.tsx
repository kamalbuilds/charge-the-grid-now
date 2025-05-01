
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <TokenomicsSection />
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-primary text-white">
          <div className="container text-center">
            <h2 className="mb-6">Ready to join the revolution?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-white/80">
              Whether you're a driver looking for affordable charging or a host wanting to monetize your charger, 
              SolCharge has a place for you in our ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="button-glow">
                <Link to="/map">Find Chargers</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/register">Register Your Charger</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
