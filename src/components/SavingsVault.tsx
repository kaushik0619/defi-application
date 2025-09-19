import React, { useState } from 'react';
import { PiggyBank, TrendingUp, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export const SavingsVault: React.FC = () => {
  const { isConnected, balance } = useWallet();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<'ETH' | 'DAI'>('ETH');

  const vaultData = {
    ETH: {
      deposited: 1.5,
      apy: 5.2,
      earned: 0.08,
      totalValue: 2456.50
    },
    DAI: {
      deposited: 850,
      apy: 4.8,
      earned: 42.3,
      totalValue: 892.3
    }
  };

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    // In a real app, this would interact with smart contracts
    console.log(`Depositing ${depositAmount} ${selectedAsset}`);
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    // In a real app, this would interact with smart contracts
    console.log(`Withdrawing ${withdrawAmount} ${selectedAsset}`);
    setWithdrawAmount('');
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <PiggyBank className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Connect your MetaMask wallet to access savings vaults</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Savings Vaults</h1>
          <p className="text-gray-400">Earn competitive APY on your crypto deposits</p>
        </div>
        <div className="bg-blue-600 bg-opacity-20 rounded-lg p-3">
          <PiggyBank className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      {/* Vault Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Total Deposited</div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">$3,348.80</div>
          <div className="text-sm text-green-400 mt-1">+5.2% APY Average</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Total Earned</div>
            <ArrowUpRight className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">$170.30</div>
          <div className="text-sm text-blue-400 mt-1">This Month</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Best APY</div>
            <PiggyBank className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">5.2%</div>
          <div className="text-sm text-purple-400 mt-1">ETH Vault</div>
        </div>
      </div>

      {/* Asset Selection */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">Select Asset</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['ETH', 'DAI'] as const).map((asset) => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAsset === asset
                  ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">{asset}</div>
                  <div className="text-sm text-gray-400">
                    {vaultData[asset].apy}% APY
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">
                    {vaultData[asset].deposited} {asset}
                  </div>
                  <div className="text-sm text-green-400">
                    +{vaultData[asset].earned} {asset} earned
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Deposit & Withdraw */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deposit Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Deposit {selectedAsset}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Amount</label>
                <div className="text-sm text-gray-400">
                  Balance: {selectedAsset === 'ETH' ? balance.eth.toFixed(3) : balance.dai.toFixed(2)} {selectedAsset}
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-16"
                />
                <button
                  onClick={() => setDepositAmount(selectedAsset === 'ETH' ? balance.eth.toString() : balance.dai.toString())}
                  className="absolute right-3 top-3 text-sm text-blue-400 hover:text-blue-300"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">APY</span>
                <span className="text-green-400 font-medium">{vaultData[selectedAsset].apy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Est. Monthly Earnings</span>
                <span className="text-white">
                  {depositAmount ? (parseFloat(depositAmount) * vaultData[selectedAsset].apy / 100 / 12).toFixed(4) : '0.0000'} {selectedAsset}
                </span>
              </div>
            </div>

            <button
              onClick={handleDeposit}
              disabled={!depositAmount || parseFloat(depositAmount) <= 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Deposit {selectedAsset}
            </button>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-red-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Withdraw {selectedAsset}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Amount</label>
                <div className="text-sm text-gray-400">
                  Deposited: {vaultData[selectedAsset].deposited} {selectedAsset}
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-16"
                />
                <button
                  onClick={() => setWithdrawAmount(vaultData[selectedAsset].deposited.toString())}
                  className="absolute right-3 top-3 text-sm text-blue-400 hover:text-blue-300"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Total Earned</span>
                <span className="text-green-400 font-medium">+{vaultData[selectedAsset].earned} {selectedAsset}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">You'll Receive</span>
                <span className="text-white">
                  {withdrawAmount ? parseFloat(withdrawAmount) : '0.0000'} {selectedAsset}
                </span>
              </div>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Withdraw {selectedAsset}
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-600 bg-opacity-20 border border-blue-500 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-blue-400 font-medium mb-1">How Savings Vaults Work</h3>
            <p className="text-sm text-gray-300">
              Your deposits are used for peer-to-peer lending. Interest is calculated daily and paid monthly. 
              You can withdraw your funds anytime, subject to available liquidity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};