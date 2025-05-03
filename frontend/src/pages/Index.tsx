
import React from 'react';

import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletBalance from '@/components/WalletBalance';

const Index = () => {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      
      
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <TokenomicsSection />
        
        {/* Wallet Section - Only shown when connected */}
        {publicKey && (
          <section className="py-8 md:py-12 bg-muted">
            <div className="container">
              <h2 className="mb-6">Your Wallet</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WalletBalance />
                <div className="md:col-span-2 bg-card rounded-lg border p-4 flex items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Connected Address</p>
                    <p className="font-mono text-xs md:text-sm break-all">{publicKey.toString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
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
      
      
    </div>
  );
};

export default Index;
