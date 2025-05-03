import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  const isActive = (path: string) => router.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-primary">Sol</span>
            <span>Charge</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/60'}`}
            >
              Home
            </Link>
            <Link 
              href="/map" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/map') ? 'text-primary' : 'text-foreground/60'}`}
            >
              Find Chargers
            </Link>
            <Link 
              href="/register" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/register') ? 'text-primary' : 'text-foreground/60'}`}
            >
              Register Charger
            </Link>
            <Link 
              href="/tokenomics" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/tokenomics') ? 'text-primary' : 'text-foreground/60'}`}
            >
              Tokenomics
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <WalletMultiButton />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 container border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/60'}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/map" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/map') ? 'text-primary' : 'text-foreground/60'}`}
              onClick={toggleMenu}
            >
              Find Chargers
            </Link>
            <Link 
              href="/register" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/register') ? 'text-primary' : 'text-foreground/60'}`}
              onClick={toggleMenu}
            >
              Register Charger
            </Link>
            <Link 
              href="/tokenomics" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/tokenomics') ? 'text-primary' : 'text-foreground/60'}`}
              onClick={toggleMenu}
            >
              Tokenomics
            </Link>
            <div className="pt-4">
              <WalletMultiButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
