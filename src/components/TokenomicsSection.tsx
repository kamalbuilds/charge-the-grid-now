
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TokenomicsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Dual Token <span className="gradient-text">Economy</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dual token model balances supply and demand while incentivizing network growth
          </p>
        </div>
        
        <Tabs defaultValue="charge" className="w-full">
          <TabsList className="grid w-full md:w-[400px] mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="charge">$CHARGE</TabsTrigger>
            <TabsTrigger value="watt">$WATT</TabsTrigger>
          </TabsList>
          
          <TabsContent value="charge">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border card-hover">
                <CardHeader>
                  <CardTitle>Utility Token</CardTitle>
                  <CardDescription>Payment & Governance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Used by drivers to pay for charging sessions and by hosts to stake for network participation.
                  </p>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Total Supply</div>
                    <div className="text-lg font-bold">100,000,000 $CHARGE</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border card-hover">
                <CardHeader>
                  <CardTitle>Burn Mechanism</CardTitle>
                  <CardDescription>Deflationary Model</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    50% of transaction fees are burned, reducing circulating supply over time.
                  </p>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Burn Rate</div>
                    <div className="text-lg font-bold">50% of 2% Fee</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border card-hover">
                <CardHeader>
                  <CardTitle>Governance</CardTitle>
                  <CardDescription>Community Control</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Staked $CHARGE grants voting rights on network proposals and protocol updates.
                  </p>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Staking APY</div>
                    <div className="text-lg font-bold">8-15% Variable</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="watt">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border card-hover">
                <CardHeader>
                  <CardTitle>Reward Token</CardTitle>
                  <CardDescription>Incentivized Participation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Earned by hosts when their chargers are used, proportional to energy delivered.
                  </p>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Distribution Model</div>
                    <div className="text-lg font-bold">Dynamic Emission</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border card-hover">
                <CardHeader>
                  <CardTitle>Mint Mechanism</CardTitle>
                  <CardDescription>Proof of Usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    New $WATT tokens are minted based on verified energy delivery and charger uptime.
                  </p>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Earn Rate</div>
                    <div className="text-lg font-bold">~1 $WATT per kWh</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border card-hover">
                <CardHeader>
                  <CardTitle>Utility</CardTitle>
                  <CardDescription>Network Benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Holders can convert to $CHARGE, access premium features, or redeem for network services.
                  </p>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Conversion Rate</div>
                    <div className="text-lg font-bold">Variable Market Rate</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TokenomicsSection;
