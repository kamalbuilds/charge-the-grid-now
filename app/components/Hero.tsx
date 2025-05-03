'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Decentralized</span> EV Charging Network
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-lg">
              Connect, charge, and earn crypto with the world's first decentralized EV charging infrastructure powered by Solana.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-3 md:text-lg md:px-8"
              >
                Register Your Charger
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/map"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-foreground bg-background hover:bg-muted md:py-3 md:text-lg md:px-8"
              >
                Find Chargers
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="mt-10 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Charging Stations</p>
              </div>
              <div>
                <p className="text-3xl font-bold">20k+</p>
                <p className="text-sm text-muted-foreground">Monthly Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">3M+</p>
                <p className="text-sm text-muted-foreground">kWh Delivered</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/images/ev-charging.jpg" 
                alt="Electric vehicle charging station" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-muted/40 to-transparent"></div>
    </section>
  );
};

export default Hero;
