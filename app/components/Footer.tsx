'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
              <span className="text-primary">Sol</span>
              <span>Charge</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Decentralized EV charging infrastructure powered by Solana blockchain.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link href="/map" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Find Chargers
              </Link>
              <Link href="/register" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Register Charger
              </Link>
              <Link href="/tokenomics" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Tokenomics
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <a 
                href="https://solana.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
              >
                Solana
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
              >
                GitHub
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <a 
                href="https://docs.solcharge.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
              >
                Documentation
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </nav>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} SolCharge. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Built on <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Solana</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
