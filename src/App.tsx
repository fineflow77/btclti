// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Twitter } from 'lucide-react';
import Header from './components/layout/Header';
import Dashboard from './pages/Home';
import BitcoinBasics from './pages/BitcoinBasics';
import AnalysisNews from './pages/AnalysisNews';
import PowerLawExplanation from './pages/PowerLawExplanation';
import InvestmentSimulator from './components/simulators/InvestmentSimulator';
import WithdrawalSimulator from './components/simulators/WithdrawalSimulator';
import PowerLawChart from './components/charts/PowerLawChart';
import { useBitcoinData } from './hooks/useBitcoinData';

const App: React.FC = () => {
  const {
    loading,
    error,
    currentPrice,
    powerLawData,
    exchangeRate,
    rSquared,
  } = useBitcoinData();

  const shareUrl = window.location.href;
  const shareText = 'ビットコイン長期投資研究所で価格予測をチェック！';

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bitcoin-basics" element={<BitcoinBasics />} />
          <Route path="/analysis-news" element={<AnalysisNews />} />
          <Route path="/simulators/investment" element={<InvestmentSimulator />} />
          <Route path="/simulators/withdrawal" element={<WithdrawalSimulator />} />
          <Route
            path="/power-law-explanation"
            element={
              <PowerLawExplanation
                chartComponent={
                  loading ? (
                    <div className="flex items-center justify-center min-h-[500px] bg-gray-800 rounded-lg">
                      <p className="text-xl text-gray-400">Loading...</p>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center min-h-[500px] bg-gray-800 rounded-lg">
                      <p className="text-xl text-red-500">Error: {error.message}</p>
                    </div>
                  ) : (
                    <PowerLawChart
                      exchangeRate={exchangeRate || 1}
                      rSquared={rSquared || 0}
                      chartData={powerLawData || []}
                      currentPrice={currentPrice?.prices.usd ?? 0}
                      height={500}
                    />
                  )
                }
              />
            }
          />
        </Routes>
      </main>
      <footer className="bg-[#1a202c] py-6">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>※ 予測は理論モデルに基づく参考値です。投資は自己責任で。</p>
          <p className="mt-2">
            © 2025 ビットコイン長期投資研究所{' '}
            <a href="https://x.com/DrPowerLaw" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0]">
              @DrPowerLaw
            </a>
          </p>
          <div className="mt-2 flex justify-center">
            <button
              onClick={shareToTwitter}
              className="text-gray-400 hover:text-[#3B82F6] transition-colors duration-300"
              aria-label="Xでシェア"
            >
              <Twitter size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;