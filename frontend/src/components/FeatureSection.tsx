
import React from 'react';
import { Battery, CircleArrowDown, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const featureList = [
  {
    title: "Host Your Charger",
    description: "Turn your home or office charger into a passive income source by sharing it with the network.",
    icon: <Battery className="h-12 w-12 text-sol-blue" />,
    stats: "Earn up to 300 $WATT monthly",
  },
  {
    title: "Find & Use Chargers",
    description: "Locate the nearest available chargers on our interactive map and pay with $CHARGE tokens.",
    icon: <Map className="h-12 w-12 text-sol-green" />,
    stats: "500+ stations globally",
  },
  {
    title: "Governance & Staking",
    description: "Stake your tokens to earn rewards and participate in governing the network's future.",
    icon: <CircleArrowDown className="h-12 w-12 text-sol-orange" />, 
    stats: "12% APY on staked $CHARGE",
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-3">How <span className="gradient-text">SolCharge</span> Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our decentralized network as a host or user and participate in the future of EV infrastructure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <Card key={index} className="border-border card-hover">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-primary">{feature.stats}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
