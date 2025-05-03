
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sol-dark text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold">⚡</span>
              </div>
              <span className="font-bold text-xl">SolCharge</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Decentralized EV charging network powered by Solana blockchain, connecting drivers
              with private and public charging infrastructure worldwide.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                Discord
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Resources</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
              </li>
              <li>
                <Link to="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link>
              </li>
              <li>
                <Link to="/tokenomics" className="hover:text-white transition-colors">Tokenomics</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Solana Explorer</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Community</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/register" className="hover:text-white transition-colors">Become a Host</Link>
              </li>
              <li>
                <Link to="/drivers" className="hover:text-white transition-colors">For Drivers</Link>
              </li>
              <li>
                <Link to="/governance" className="hover:text-white transition-colors">Governance</Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors">Partners</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row gap-4 md:justify-between">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SolCharge. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
