'use client';

import Link from 'next/link';
import { ArrowRight, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-hero-pattern py-16 md:py-24">
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-background/80 backdrop-blur-sm"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6">
              <span className="block">Decentralized EV Charging</span>
              <span className="gradient-text">Powered by Solana</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 md:pr-12">
              SolCharge revolutionizes EV infrastructure with a decentralized network that rewards charger hosts, reduces costs for drivers, and accelerates the transition to sustainable energy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary button-glow">
                <Link href="/map">Find Chargers</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/register">Host a Charger</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">500+</div>
                <div className="text-sm text-muted-foreground">Active Stations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">350K+</div>
                <div className="text-sm text-muted-foreground">kWh Delivered</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 md:-rotate-3 transform transition-transform hover:rotate-0">
              <div className="aspect-video bg-gradient-primary rounded-md mb-6 flex items-center justify-center">
                <span className="text-5xl">🔌</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Charger ID</div>
                  <div className="font-mono text-xs bg-muted p-2 rounded">0x8f...3d9e</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Location</div>
                  <div className="font-medium">123 Main Street, Miami, FL</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Cost</div>
                    <div className="font-medium">0.05 $CHARGE / kWh</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary button-glow">Connect & Charge</Button>
              </div>
            </div>
            
            <div className="hidden md:block absolute -bottom-12 -right-12 w-64 h-64 bg-gradient-primary rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
