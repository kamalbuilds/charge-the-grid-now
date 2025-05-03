"use client";

import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface TokenBalance {
  name: string;
  symbol: string;
  amount: number;
  icon: string;
}

const WalletBalance: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([
    {
      name: 'CHARGE Token',
      symbol: 'CHARGE',
      amount: 0,
      icon: '/images/charge-token.png'
    },
    {
      name: 'WATT Token',
      symbol: 'WATT',
      amount: 0,
      icon: '/images/watt-token.png'
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) return;
      
      setIsLoading(true);
      try {
        // Connect to Solana devnet for development
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        
        // Fetch SOL balance
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);
        
        // For demo purposes, we'll set mock values for CHARGE and WATT
        // In a real application, you would fetch SPL token balances here
        setTokenBalances([
          {
            name: 'CHARGE Token',
            symbol: 'CHARGE',
            amount: 1250.75,
            icon: '/images/charge-token.png'
          },
          {
            name: 'WATT Token',
            symbol: 'WATT',
            amount: 3780.5,
            icon: '/images/watt-token.png'
          }
        ]);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (connected && publicKey) {
      fetchBalances();
      
      // Set up listener for account changes
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const subscription = connection.onAccountChange(
        publicKey,
        () => fetchBalances(),
        'confirmed'
      );
      
      return () => {
        connection.removeAccountChangeListener(subscription);
      };
    }
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Wallet Balance</h3>
        <p className="text-muted-foreground">
          Connect your wallet to view your balances.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Wallet Balance</h3>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* SOL Balance */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                <img src="/images/solana-logo.png" alt="SOL" className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Solana</p>
                <p className="text-xs text-muted-foreground">SOL</p>
              </div>
            </div>
            <p className="font-medium">{solBalance !== null ? solBalance.toFixed(4) : '0'}</p>
          </div>
          
          {/* Token Balances */}
          {tokenBalances.map((token, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                  <img src={token.icon} alt={token.symbol} className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="text-xs text-muted-foreground">{token.symbol}</p>
                </div>
              </div>
              <p className="font-medium">{token.amount.toLocaleString()}</p>
            </div>
          ))}
          
          <div className="mt-4 text-xs text-muted-foreground text-center">
            <p>Public Key: {publicKey?.toString().slice(0, 6)}...{publicKey?.toString().slice(-6)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletBalance;
