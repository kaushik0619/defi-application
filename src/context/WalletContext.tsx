import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: {
    eth: number;
    dai: number;
  };
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletState | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const WalletProvider: React.FC<Props> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState({ eth: 0, dai: 0 });

  // Mock wallet connection for demo purposes
  const connect = async () => {
    try {
      // In a real app, this would interact with MetaMask
      // For demo purposes, we'll simulate a connection
      const mockAddress = '0x742d35Cc6543C073...89fE7';
      setAddress(mockAddress);
      setIsConnected(true);
      
      // Mock balances
      setBalance({
        eth: 2.45,
        dai: 1250.00
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance({ eth: 0, dai: 0 });
  };

  const value: WalletState = {
    isConnected,
    address,
    balance,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};