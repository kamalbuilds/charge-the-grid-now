
"use client";

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletButton = () => {
  return (
    <div className="wallet-button-container">
      <WalletMultiButton />
    </div>
  );
};

export default WalletButton;
