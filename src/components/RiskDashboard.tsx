import React from 'react';
import { AlertTriangle, Shield, TrendingDown, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export const RiskDashboard: React.FC = () => {
  const { isConnected } = useWallet();

  const riskMetrics = {
    portfolioHealth: 78, // 0-100 score
    liquidationRisk: 'Low',
    collateralRatio: 273,
    totalExposure: 4525.50,
    diversificationScore: 65,
    volatilityRisk: 'Medium'
  };

  const positions = [
    {
      asset: 'ETH',
      type: 'Collateral',
      amount: 2.0,
      value: 3280,
      ratio: 273,
      risk: 'Low',
      apy: null
    },
    {
      asset: 'DAI',
      type: 'Borrowed',
      amount: -1200,
      value: -1200,
      ratio: null,
      risk: 'Medium',
      apr: 3.8
    },
    {
      asset: 'ETH',
      type: 'Savings',
      amount: 1.5,
      value: 2460,
      ratio: null,
      risk: 'Low',
      apy: 5.2
    },
    {
      asset: 'DAI',
      type: 'Savings',
      amount: 850,
      value: 850,
      ratio: null,
      risk: 'Low',
      apy: 4.8
    }
  ];

  const riskFactors = [
    {
      factor: 'Collateral Volatility',
      level: 'Medium',
      impact: 'Price swings in ETH can affect collateral ratio',
      severity: 'warning'
    },
    {
      factor: 'Liquidation Threshold',
      level: 'Low',
      impact: 'Safe distance from 120% liquidation ratio',
      severity: 'success'
    },
    {
      factor: 'Interest Rate Risk',
      level: 'Low',
      impact: 'Stable borrowing rates in current market',
      severity: 'success'
    },
    {
      factor: 'Smart Contract Risk',
      level: 'Low',
      impact: 'Audited contracts with established track record',
      severity: 'success'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Connect your MetaMask wallet to view risk analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Risk Dashboard</h1>
          <p className="text-gray-400">Monitor your portfolio health and risk exposure</p>
        </div>
        <div className="bg-red-600 bg-opacity-20 rounded-lg p-3">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Portfolio Health</div>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{riskMetrics.portfolioHealth}/100</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-400 h-2 rounded-full" 
              style={{ width: `${riskMetrics.portfolioHealth}%` }}
            ></div>
          </div>
          <div className="text-sm text-blue-400">Good Health</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Liquidation Risk</div>
            <AlertTriangle className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">{riskMetrics.liquidationRisk}</div>
          <div className="text-sm text-gray-400 mb-2">Collateral Ratio</div>
          <div className="text-lg font-semibold text-white">{riskMetrics.collateralRatio}%</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">Total Exposure</div>
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${riskMetrics.totalExposure.toLocaleString()}
          </div>
          <div className="text-sm text-purple-400">Across All Positions</div>
        </div>
      </div>

      {/* Position Analysis */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Position Analysis</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {positions.map((position, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    position.type === 'Collateral' ? 'bg-blue-600 bg-opacity-20' :
                    position.type === 'Borrowed' ? 'bg-red-600 bg-opacity-20' :
                    'bg-green-600 bg-opacity-20'
                  }`}>
                    <span className={`font-bold text-sm ${
                      position.type === 'Collateral' ? 'text-blue-400' :
                      position.type === 'Borrowed' ? 'text-red-400' :
                      'text-green-400'
                    }`}>
                      {position.asset}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{position.asset} - {position.type}</div>
                    <div className="text-sm text-gray-400">
                      {position.amount > 0 ? '+' : ''}{position.amount} {position.asset}
                      {position.apy && ` • ${position.apy}% APY`}
                      {position.apr && ` • ${position.apr}% APR`}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-semibold ${position.value > 0 ? 'text-white' : 'text-red-400'}`}>
                    ${Math.abs(position.value).toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    {position.ratio && (
                      <span className="text-sm text-green-400">{position.ratio}% Ratio</span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      position.risk === 'Low' ? 'bg-green-600 bg-opacity-20 text-green-400' :
                      position.risk === 'Medium' ? 'bg-yellow-600 bg-opacity-20 text-yellow-400' :
                      'bg-red-600 bg-opacity-20 text-red-400'
                    }`}>
                      {position.risk} Risk
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Risk Factors</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskFactors.map((factor, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-3 h-3 rounded-full mt-1 ${getSeverityBg(factor.severity)} bg-opacity-60`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium">{factor.factor}</h3>
                    <span className={`text-sm font-medium ${getSeverityColor(factor.severity)}`}>
                      {factor.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{factor.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Market Volatility (24h)</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-400">ETH</span>
                </div>
                <span className="text-white">Ethereum</span>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">$1,640</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.4%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-green-400">DAI</span>
                </div>
                <span className="text-white">DAI Stablecoin</span>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">$1.00</div>
                <div className="flex items-center text-sm text-gray-400">
                  <Activity className="w-3 h-3 mr-1" />
                  0.0%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Interest Rates</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Savings APY (ETH)</span>
              <span className="text-green-400 font-medium">5.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Savings APY (DAI)</span>
              <span className="text-green-400 font-medium">4.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Borrowing APR (DAI)</span>
              <span className="text-red-400 font-medium">3.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Liquidation Threshold</span>
              <span className="text-yellow-400 font-medium">120%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-600 bg-opacity-20 border border-blue-500 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-400 mt-1" />
          <div>
            <h3 className="text-blue-400 font-semibold mb-2">Risk Management Recommendations</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Your collateral health is strong at 273%. Consider this a safe position.</li>
              <li>• Monitor ETH price volatility as it directly affects your collateral value.</li>
              <li>• Consider diversifying collateral types when feature becomes available.</li>
              <li>• Set up price alerts for ETH to monitor liquidation risk proactively.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};