
"use client";

import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!publicKey) return;

    const getBalance = async () => {
      setIsLoading(true);
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getBalance();
    const intervalId = setInterval(getBalance, 30000); // Update every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [connection, publicKey]);

  if (!publicKey) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Wallet Balance</CardTitle>
        <CardDescription>Your current SOL balance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{isLoading ? 'Loading...' : `${balance.toFixed(4)} SOL`}</span>
          <span className="text-sm text-muted-foreground">{`$${(balance * 18.50).toFixed(2)} USD`}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBalance;
