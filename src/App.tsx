import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SavingsVault } from './components/SavingsVault';
import { BorrowingVault } from './components/BorrowingVault';
import { RiskDashboard } from './components/RiskDashboard';
import { WalletProvider } from './context/WalletContext';

type Tab = 'dashboard' | 'savings' | 'borrow' | 'risk';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="container mx-auto px-4 py-8">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'savings' && <SavingsVault />}
          {activeTab === 'borrow' && <BorrowingVault />}
          {activeTab === 'risk' && <RiskDashboard />}
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;