'use client';

import './globals.css';
import React from 'react';
import { WalletProvider } from '../providers/WalletProvider';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  
  return (
    <html lang="en">
      <head>
        <title>SolCharge - Decentralized EV Charging Network</title>
        <meta name="description" content="Connect, charge, and earn crypto with the world's first decentralized EV charging infrastructure powered by Solana." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Sonner />
          <TooltipProvider>
            <WalletProvider>
              <Navigation />
              {children}
              <Footer />
            </WalletProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
} 