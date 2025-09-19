import React, { useState } from 'react';
import { TrendingUp, Shield, AlertTriangle, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export const BorrowingVault: React.FC = () => {
  const { isConnected, balance } = useWallet();
  const [collateralAmount, setCollateralAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');

  const loanData = {
    collateralDeposited: 2.0, // ETH
    borrowed: 1200, // DAI
    collateralValue: 3280, // USD
    borrowedValue: 1200, // USD
    collateralRatio: 273, // %
    liquidationRatio: 120, // %
    interestRate: 3.8, // %
    monthlyInterest: 3.8 // DAI
  };

  const maxBorrowAmount = (collateralAmount ? parseFloat(collateralAmount) * 1640 * 0.75 : 0); // 75% LTV at $1640/ETH
  const healthFactor = loanData.collateralValue / (loanData.borrowedValue || 1) * 100;

  const getHealthColor = (ratio: number) => {
    if (ratio >= 200) return 'text-green-400';
    if (ratio >= 150) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBg = (ratio: number) => {
    if (ratio >= 200) return 'bg-green-600';
    if (ratio >= 150) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Connect your MetaMask wallet to access borrowing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Borrowing</h1>
          <p className="text-gray-400">Borrow DAI against your ETH collateral</p>
        </div>
        <div className="bg-purple-600 bg-opacity-20 rounded-lg p-3">
          <TrendingUp className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      {/* Loan Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Collateral Health</div>
            <Shield className={`w-5 h-5 ${getHealthColor(loanData.collateralRatio)}`} />
          </div>
          <div className={`text-2xl font-bold ${getHealthColor(loanData.collateralRatio)}`}>
            {loanData.collateralRatio}%
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {loanData.collateralRatio >= 200 ? 'Safe' : loanData.collateralRatio >= 150 ? 'Warning' : 'At Risk'}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Collateral Value</div>
            <ArrowUpRight className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">${loanData.collateralValue.toLocaleString()}</div>
          <div className="text-sm text-blue-400 mt-1">{loanData.collateralDeposited} ETH</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Borrowed Amount</div>
            <ArrowDownRight className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">${loanData.borrowedValue.toLocaleString()}</div>
          <div className="text-sm text-purple-400 mt-1">{loanData.borrowed} DAI</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Interest Rate</div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{loanData.interestRate}%</div>
          <div className="text-sm text-green-400 mt-1">APR</div>
        </div>
      </div>

      {/* Health Progress Bar */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Liquidation Risk</h2>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Liquidation at 120%</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${getHealthBg(loanData.collateralRatio)} bg-opacity-60`}
              style={{ width: `${Math.min(100, (loanData.collateralRatio / 300) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-red-400">120% (Liquidation)</span>
            <span className="text-yellow-400">150% (Warning)</span>
            <span className="text-green-400">200% (Safe)</span>
          </div>
        </div>
      </div>

      {/* Borrowing Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Collateral & Borrow */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Add Collateral (ETH)</h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-400">Amount</label>
                  <div className="text-sm text-gray-400">
                    Balance: {balance.eth.toFixed(3)} ETH
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-16"
                  />
                  <button
                    onClick={() => setCollateralAmount(balance.eth.toString())}
                    className="absolute right-3 top-3 text-sm text-blue-400 hover:text-blue-300"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Max Borrowing Power</span>
                  <span className="text-blue-400 font-medium">${maxBorrowAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Loan-to-Value (LTV)</span>
                  <span className="text-white">75%</span>
                </div>
              </div>

              <button
                disabled={!collateralAmount || parseFloat(collateralAmount) <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Add Collateral
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Borrow DAI</h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-400">Amount</label>
                  <div className="text-sm text-gray-400">
                    Max: ${((loanData.collateralValue * 0.75) - loanData.borrowedValue).toFixed(2)}
                  </div>
                </div>
                <input
                  type="number"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Interest Rate</span>
                  <span className="text-purple-400 font-medium">{loanData.interestRate}% APR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Est. Monthly Interest</span>
                  <span className="text-white">
                    {borrowAmount ? (parseFloat(borrowAmount) * loanData.interestRate / 100 / 12).toFixed(2) : '0.00'} DAI
                  </span>
                </div>
              </div>

              <button
                disabled={!borrowAmount || parseFloat(borrowAmount) <= 0}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Borrow DAI
              </button>
            </div>
          </div>
        </div>

        {/* Repay Loan */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Repay Loan</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Repay Amount (DAI)</label>
                <div className="text-sm text-gray-400">
                  Owed: {loanData.borrowed} DAI
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-16"
                />
                <button
                  onClick={() => setRepayAmount(loanData.borrowed.toString())}
                  className="absolute right-3 top-3 text-sm text-blue-400 hover:text-blue-300"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Outstanding Debt</span>
                <span className="text-red-400 font-medium">{loanData.borrowed} DAI</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Accrued Interest</span>
                <span className="text-yellow-400">{loanData.monthlyInterest} DAI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">New Debt</span>
                <span className="text-white">
                  {repayAmount ? Math.max(0, loanData.borrowed - parseFloat(repayAmount)).toFixed(2) : loanData.borrowed} DAI
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                disabled={!repayAmount || parseFloat(repayAmount) <= 0}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Repay Loan
              </button>
              
              {loanData.borrowed > 0 && (
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Close Position & Withdraw Collateral
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-yellow-600 bg-opacity-20 border border-yellow-500 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="text-yellow-400 font-medium mb-1">Liquidation Risk Warning</h3>
            <p className="text-sm text-gray-300">
              Your collateral may be liquidated if the health factor falls below 120%. 
              Monitor your position closely and consider adding more collateral or repaying your loan to maintain a safe ratio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};