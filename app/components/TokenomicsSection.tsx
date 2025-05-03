'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Coins, Zap } from 'lucide-react';

const TokenomicsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dual-Token Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground">
            Our dual-token model creates a sustainable economy for charging infrastructure
            growth while rewarding both charger hosts and network users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CHARGE Token Card */}
          <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">CHARGE Token</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              The governance and utility token of the SolCharge ecosystem.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium mb-1">Supply</h4>
                <p className="text-sm text-muted-foreground">Fixed at 100,000,000 CHARGE</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Distribution</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Community Rewards: 40%</li>
                  <li>Protocol Treasury: 25%</li>
                  <li>Team & Advisors: 15%</li>
                  <li>Strategic Partners: 10%</li>
                  <li>Liquidity & Marketing: 10%</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Key Functions</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Payment for charging services</li>
                  <li>Governance voting rights</li>
                  <li>Staking for passive income</li>
                  <li>Fee reduction for frequent users</li>
                  <li>Transaction fees are partially burned</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WATT Token Card */}
          <div className="bg-card rounded-lg p-8 border border-border shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">WATT Token</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              The reward token for energy providers in the SolCharge network.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium mb-1">Supply</h4>
                <p className="text-sm text-muted-foreground">
                  Dynamic supply based on network usage with no fixed maximum
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Minting Conditions</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Verified energy delivery (1 WATT per kWh)</li>
                  <li>Charger uptime score above 95%</li>
                  <li>Positive user ratings (&gt;4.5/5 stars)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Emission Schedule</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Year 1: Up to 10M WATT</li>
                  <li>Year 2: Up to 20M WATT</li>
                  <li>Year 3: Up to 30M WATT</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Key Functions</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Rewards for charger hosts</li>
                  <li>Convertible to CHARGE at variable rates</li>
                  <li>Access to premium network features</li>
                  <li>Network fee discounts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/tokenomics" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-3 md:text-lg md:px-8"
          >
            View Detailed Tokenomics
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
