import React from 'react';
import { TrendingUp, PiggyBank, AlertTriangle, DollarSign, Percent, Shield } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

type Tab = 'dashboard' | 'savings' | 'borrow' | 'risk';

interface Props {
  setActiveTab: (tab: Tab) => void;
}

export const Dashboard: React.FC<Props> = ({ setActiveTab }) => {
  const { isConnected, balance } = useWallet();

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Connect your MetaMask wallet to start using DeFi Bank</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Portfolio Value',
      value: '$4,125.50',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-400',
    },
    {
      title: 'Savings Balance',
      value: '$2,450.00',
      apy: '5.2% APY',
      icon: PiggyBank,
      color: 'text-blue-400',
    },
    {
      title: 'Active Loans',
      value: '$1,200.00',
      interest: '3.8% APR',
      icon: TrendingUp,
      color: 'text-purple-400',
    },
    {
      title: 'Collateral Health',
      value: '185%',
      status: 'Safe',
      icon: Shield,
      color: 'text-green-400',
    },
  ];

  const quickActions = [
    {
      title: 'Deposit to Savings',
      description: 'Earn 5.2% APY on your crypto deposits',
      action: () => setActiveTab('savings'),
      icon: PiggyBank,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Borrow Against Collateral',
      description: 'Get instant liquidity without selling',
      action: () => setActiveTab('borrow'),
      icon: TrendingUp,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: 'View Risk Analysis',
      description: 'Monitor your liquidation risks',
      action: () => setActiveTab('risk'),
      icon: AlertTriangle,
      color: 'bg-yellow-600 hover:bg-yellow-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Portfolio Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color.replace('text-', 'bg-').replace('400', '600')} bg-opacity-20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                {stat.change && (
                  <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                )}
                {stat.apy && (
                  <div className="text-sm text-blue-400">{stat.apy}</div>
                )}
                {stat.interest && (
                  <div className="text-sm text-purple-400">{stat.interest}</div>
                )}
                {stat.status && (
                  <div className="text-sm text-green-400">{stat.status}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white p-6 rounded-xl transition-all duration-200 transform hover:scale-105 text-left`}
              >
                <Icon className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Deposited to Savings</div>
                    <div className="text-sm text-gray-400">2 hours ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">+0.5 ETH</div>
                  <div className="text-sm text-green-400">Earning 5.2% APY</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Borrowed DAI</div>
                    <div className="text-sm text-gray-400">1 day ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">500 DAI</div>
                  <div className="text-sm text-purple-400">3.8% APR</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Percent className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Interest Earned</div>
                    <div className="text-sm text-gray-400">3 days ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">+25.4 DAI</div>
                  <div className="text-sm text-blue-400">Monthly payout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};