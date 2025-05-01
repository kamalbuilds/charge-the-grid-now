
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Map, Settings, Menu } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <span className="font-bold text-xl">SolCharge</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/map" className="text-sm font-medium hover:text-primary">
            Find Chargers
          </Link>
          <Link to="/register" className="text-sm font-medium hover:text-primary">
            Register Charger
          </Link>
          <Link to="/tokenomics" className="text-sm font-medium hover:text-primary">
            Tokenomics
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button className="hidden md:flex button-glow bg-gradient-primary">
            Connect Wallet
          </Button>
          
          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center gap-2 w-full">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/map" className="flex items-center gap-2 w-full">
                  <Map className="h-4 w-4" />
                  <span>Find Chargers</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="flex items-center gap-2 w-full">
                  <Settings className="h-4 w-4" />
                  <span>Register Charger</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className="w-full button-glow bg-gradient-primary">
                  Connect Wallet
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
