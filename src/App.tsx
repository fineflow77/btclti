// src/App.tsx

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { X } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react'; // <<< [修正①] この行をインポートに追加

import Header from './components/layout/Header';
import LoadingSpinner from './components/ui/LoadingSpinner';

// ======== ページの動的インポート (新しいファイルパス) ========
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const InvestmentSimulator = lazy(() => import('./pages/InvestmentSimulator'));
const PowerLawExplanation = lazy(() => import('./pages/PowerLawExplanation'));
const BitcoinBasics = lazy(() => import('./pages/BitcoinBasics'));
const AnalysisNews = lazy(() => import('./pages/AnalysisNews'));

// ローディング中のフォールバックコンポーネント
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
    <LoadingSpinner size="lg" />
  </div>
);

const App: React.FC = () => {
  const shareToX = () => {
    const shareUrl = window.location.href;
    const shareText = 'ビットコイン長期投資研究所で、あなたのFIRE計画をシミュレーション！';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ======== ルーティングの再定義 ======== */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investment-simulator" element={<InvestmentSimulator />} />
            <Route path="/power-law" element={<PowerLawExplanation />} />
            <Route path="/bitcoin-basics" element={<BitcoinBasics />} />
            <Route path="/analysis-news" element={<AnalysisNews />} />

            {/* 古いシミュレーターのURLからリダイレクト（任意） */}
            <Route path="/simulators/investment" element={<InvestmentSimulator />} />
            <Route path="/simulators/withdrawal" element={<Home />} />

            {/* 404ページなど */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Suspense>
      </main>
      <footer className="bg-gray-800 border-t border-gray-700 py-4 mt-auto">
        <div className="mx-auto max-w-screen-sm px-4 text-center text-gray-400 text-xs leading-tight">
          <p>※ 予測は理論モデルに基づく参考値です。投資は自己責任でお願いします。</p>
          <p className="mt-1">
            © {new Date().getFullYear()}
            <a
              href="https://x.com/DrPowerLaw"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 underline-offset-2 hover:underline ml-1"
            >
              リュウ@ビットコイン長期投資ラボ
            </a>
          </p>
          <div className="mt-2 flex justify-center">
            <button
              onClick={shareToX}
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Xでシェア"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </footer>
      <Analytics /> {/* <<< [修正②] この行を一番最後に追加 */}
    </div>
  );
};

export default App;