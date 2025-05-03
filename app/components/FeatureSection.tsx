'use client';

import React from 'react';
import { 
  DollarSign, 
  Cpu, 
  ShieldCheck, 
  Globe, 
  Clock, 
  BarChart4
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Earn Passive Income",
      description: "Share your EV charger and earn $WATT tokens for every kWh delivered to the network."
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      title: "Affordable Charging",
      description: "Pay less than traditional charging networks with no subscription fees or hidden costs."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Real-time Data",
      description: "Track charger availability, usage statistics, and performance metrics in real-time."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure Payments",
      description: "All transactions are secured by the Solana blockchain with near-zero gas fees."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Network",
      description: "Access thousands of chargers around the world with a single wallet."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Availability",
      description: "Charge your vehicle anytime with fully automated processes and smart contracts."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Reimagining EV Charging Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground">
            Our decentralized network brings together EV owners and charger hosts in a
            secure, efficient, and rewarding ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
