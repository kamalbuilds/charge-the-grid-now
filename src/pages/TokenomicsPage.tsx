
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TokenomicsSection from '@/components/TokenomicsSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TokenomicsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-12">
        <h1 className="mb-2">SolCharge <span className="gradient-text">Tokenomics</span></h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Our dual-token model creates a sustainable economy that rewards participation and aligns incentives across the network.
        </p>
        
        <TokenomicsSection />
        
        <section className="mt-16">
          <h2 className="mb-6">Token <span className="gradient-text">Allocation</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>$CHARGE Distribution</CardTitle>
                <CardDescription>Total Supply: 100,000,000 $CHARGE</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Community Rewards (40%)</span>
                    <span className="text-sm">40,000,000</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Team & Advisors (15%)</span>
                    <span className="text-sm">15,000,000</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Protocol Treasury (25%)</span>
                    <span className="text-sm">25,000,000</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Strategic Partners (10%)</span>
                    <span className="text-sm">10,000,000</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Private Sale (5%)</span>
                    <span className="text-sm">5,000,000</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Liquidity Provision (5%)</span>
                    <span className="text-sm">5,000,000</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>$WATT Emissions</CardTitle>
                <CardDescription>Dynamic Supply Based on Network Usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Unlike $CHARGE, $WATT has no fixed maximum supply. New tokens are minted when:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Chargers deliver verified kWh of energy (~1 $WATT per kWh)</li>
                  <li>Chargers maintain high uptime and reliability scores</li>
                  <li>Hosts stake $CHARGE to secure their position in the network</li>
                </ul>
                
                <div className="mt-6">
                  <h4 className="text-base font-medium mb-4">Emission Schedule</h4>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Year 1 (2025)</span>
                      <span className="text-sm font-medium">~10,000,000 $WATT</span>
                    </div>
                    <Progress value={100} className="h-1.5 mb-4" />
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Year 2 (2026)</span>
                      <span className="text-sm font-medium">~25,000,000 $WATT</span>
                    </div>
                    <Progress value={250} className="h-1.5 mb-4" />
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Year 3 (2027)</span>
                      <span className="text-sm font-medium">~50,000,000 $WATT</span>
                    </div>
                    <Progress value={500} className="h-1.5 mb-4" />
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Year 4 (2028)</span>
                      <span className="text-sm font-medium">~80,000,000 $WATT</span>
                    </div>
                    <Progress value={800} className="h-1.5" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    * Emission rates will adjust based on actual network growth and governance decisions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mt-16">
          <h2 className="mb-6">Fee Structure & <span className="gradient-text">Economics</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>2% Transaction Fee</CardTitle>
                <CardDescription>On all charging payments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A 2% fee is collected on all charging transactions paid in $CHARGE tokens.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  <div className="flex justify-between mb-2">
                    <span>50% Burned</span>
                    <span>Reduces supply</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>30% Protocol Treasury</span>
                    <span>Development</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20% Staking Rewards</span>
                    <span>Incentives</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Burn & Mint Equilibrium</CardTitle>
                <CardDescription>Supply regulation mechanism</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The burn-and-mint model ensures the token supply adjusts with network usage.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  <div className="mb-2">
                    <span className="font-medium block">Deflation Force:</span>
                    <span>50% of all transaction fees in $CHARGE are burned</span>
                  </div>
                  <div>
                    <span className="font-medium block">Inflation Force:</span>
                    <span>$WATT rewards are minted based on verified electricity delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Staking & Governance</CardTitle>
                <CardDescription>Network participation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Staking $CHARGE grants voting rights and passive income through rewards.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  <div className="mb-2">
                    <span className="font-medium block">Host Staking:</span>
                    <span>Minimum 1,000 $CHARGE to register a charger</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium block">Governance Staking:</span>
                    <span>1 $CHARGE = 1 vote on protocol proposals</span>
                  </div>
                  <div>
                    <span className="font-medium block">Liquidity Staking:</span>
                    <span>Earn 8-15% APY by providing liquidity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default TokenomicsPage;
