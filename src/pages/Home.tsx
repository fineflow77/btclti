// src/pages/Home.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Info, ArrowUpRight } from 'lucide-react';
import { useBitcoinData } from '../hooks/useBitcoinData';
import PowerLawChartWrapper from '../components/charts/PowerLawChartWrapper';
import { formatCurrency } from '../utils/formatters';
import { getPowerLawPositionLabel, getPowerLawPositionColor } from '../utils/models';
import { calculateRSquared } from '../utils/mathUtils';
import DataContainer from '../components/ui/DataContainer';
import { ChartLineUp, Wallet as PhosphorWallet } from 'phosphor-react';
import { BitcoinData, PowerLawDataPoint, WeeklyPrice, DailyPrice } from '../types';

// タイポグラフィと色の定義は変更なし
const typography: Record<string, string> = {
  h1: 'text-2xl sm:text-3xl font-semibold tracking-tight',
  h2: 'text-xl sm:text-2xl font-medium',
  subtitle: 'text-base sm:text-lg font-medium',
  body: 'text-sm sm:text-base font-normal',
  tiny: 'text-xs sm:text-sm font-normal',
  small: 'text-xs sm:text-sm font-normal',
};

const colors: Record<string, string> = {
  primary: 'bg-[#3B82F6] hover:bg-[#2b6cb0] text-white',
  cardBg: 'bg-gray-800',
  cardBorder: 'border border-gray-700',
  textPrimary: 'text-gray-100',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  amber: 'text-[#D4AF37]',
  green: 'text-[#10B981]',
  pink: 'text-[#FF69B4]',
  tabActive: 'bg-[#3B82F6] text-white',
  tabInactive: 'bg-gray-700 text-gray-300',
  investmentCardBg: 'bg-gradient-to-br from-[#3B82F6] to-[#2b6cb0]',
  withdrawalCardBg: 'bg-gradient-to-br from-[#10B981] to-[#065f46]',
  cardBorderHighlight: 'border border-gray-600 hover:border-[#3B82F6]',
};

const Home: React.FC = () => {
  const { loading, error, currentPrice, exchangeRate, weeklyPrices, powerLawData, dailyPrices } = useBitcoinData() as BitcoinData;
  const [rSquared, setRSquared] = useState<number>(0.9703);
  const [activeTab, setActiveTab] = useState<'log' | 'loglog'>('loglog'); // Default to 'loglog' (Log Scale)

  // useEffect, useMemo hooks are unchanged
  useEffect(() => {
    if (weeklyPrices && weeklyPrices.length > 0) {
      const calculatedRSquared = calculateRSquared(
        weeklyPrices.map((item: WeeklyPrice) => [new Date(item.date).getTime(), item.price])
      );
      if (calculatedRSquared !== null) setRSquared(calculatedRSquared);
    }
  }, [weeklyPrices]);

  const priceChangePercentage = useMemo(() => {
    if (!currentPrice || !dailyPrices || dailyPrices.length < 2) return null;
    const sortedPrices = [...dailyPrices].sort(
      (a: DailyPrice, b: DailyPrice) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (sortedPrices.length < 2 || !currentPrice.prices.usd) return null;
    const latestPrice = currentPrice.prices.usd;
    const yesterdayPrice = sortedPrices[1].price;
    return ((latestPrice - yesterdayPrice) / yesterdayPrice) * 100;
  }, [currentPrice, dailyPrices]);

  const { medianPrice, supportPrice } = useMemo(() => {
    if (!powerLawData || powerLawData.length === 0) return { medianPrice: 0, supportPrice: 0 };
    const now = Date.now();
    const closestPoint = powerLawData.reduce(
      (closest: PowerLawDataPoint, current: PowerLawDataPoint) => {
        const currentDiff = Math.abs(current.date - now);
        const closestDiff = Math.abs(closest.date - now);
        return currentDiff < closestDiff ? current : closest;
      },
      powerLawData[0]
    );
    return { medianPrice: closestPoint.medianModel, supportPrice: closestPoint.supportModel };
  }, [powerLawData]);

  const medianDeviation = useMemo(() => {
    if (!currentPrice || !medianPrice) return null;
    return ((currentPrice.prices.usd - medianPrice) / medianPrice) * 100;
  }, [currentPrice, medianPrice]);

  const supportDeviation = useMemo(() => {
    if (!currentPrice || !supportPrice) return null;
    return ((currentPrice.prices.usd - supportPrice) / supportPrice) * 100;
  }, [currentPrice, supportPrice]);

  const chartDataToUse = powerLawData || [];


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
      {/* space-y-12 for section spacing */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* --- Price Information Section --- */}
        <div className="space-y-6"> {/* Spacing between card grid and exchange rate info */}
          {/* Price Card Grid - Optimized for vertical display on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Current Price Card - Optimized for vertical display */}
            <div className={`${colors.cardBg} p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg ${colors.cardBorder} transition-all duration-300 hover:shadow-xl`}>
              <div className="flex justify-between items-center mb-1 sm:mb-3">
                <h3 className={`${typography.small} sm:${typography.subtitle} ${colors.amber} flex items-center`}>
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> 現在価格
                </h3>
                {priceChangePercentage !== null && (
                  <div className={`text-xs font-medium ${priceChangePercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {priceChangePercentage >= 0 ? '+' : ''}{priceChangePercentage.toFixed(1)}%
                  </div>
                )}
              </div>
              <DataContainer
                isLoading={loading}
                error={error}
                loadingMessage="価格データ取得中..."
                noDataMessage="価格データが利用できません"
              >
                {currentPrice && currentPrice.prices.usd ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl sm:text-3xl font-bold text-[#D4AF37]">
                        {formatCurrency(currentPrice.prices.jpy, 'JPY')}
                      </div>
                      <div className={`${typography.tiny} ${colors.textMuted}`}>
                        ({formatCurrency(currentPrice.prices.usd, 'USD')})
                      </div>
                    </div>
                    {medianDeviation !== null && (
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-opacity-20`}
                        style={{
                          backgroundColor: `${getPowerLawPositionColor(medianDeviation, supportDeviation)}20`,
                          color: getPowerLawPositionColor(medianDeviation, supportDeviation),
                        }}
                      >
                        {getPowerLawPositionLabel(medianDeviation, supportDeviation)}
                      </span>
                    )}
                  </div>
                ) : null}
              </DataContainer>
            </div>

            {/* Median Price Card - Optimized for vertical display */}
            <div className={`${colors.cardBg} p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg ${colors.cardBorder} transition-all duration-300 hover:shadow-xl`}>
              <div className="flex justify-between items-center mb-1 sm:mb-3">
                <h3 className={`${typography.small} sm:${typography.subtitle} ${colors.green} flex items-center`}>
                  中央価格（予測）
                </h3>
                {medianDeviation !== null && (
                  <div className={`text-xs font-medium ${medianDeviation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    乖離: {medianDeviation >= 0 ? '+' : ''}{medianDeviation.toFixed(1)}%
                  </div>
                )}
              </div>
              <DataContainer
                isLoading={loading}
                error={error}
                loadingMessage="価格データ取得中..."
                noDataMessage="中央価格データが利用できません"
              >
                {powerLawData && powerLawData.length > 0 ? (
                  <div className="flex items-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-semibold text-[#10B981]">
                        {formatCurrency(medianPrice * exchangeRate, 'JPY')}
                      </div>
                      <div className={`${typography.tiny} ${colors.textMuted}`}>
                        ({formatCurrency(medianPrice, 'USD')})
                      </div>
                    </div>
                  </div>
                ) : null}
              </DataContainer>
            </div>

            {/* Lower Bound Price Card - Optimized for vertical display */}
            <div className={`${colors.cardBg} p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg ${colors.cardBorder} transition-all duration-300 hover:shadow-xl`}>
              <div className="flex justify-between items-center mb-1 sm:mb-3">
                <h3 className={`${typography.small} sm:${typography.subtitle} ${colors.pink} flex items-center`}>
                  下限価格（予測）
                </h3>
                {supportDeviation !== null && (
                  <div className={`text-xs font-medium ${supportDeviation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    乖離: {supportDeviation >= 0 ? '+' : ''}{supportDeviation.toFixed(1)}%
                  </div>
                )}
              </div>
              <DataContainer
                isLoading={loading}
                error={error}
                loadingMessage="価格データ取得中..."
                noDataMessage="下限価格データが利用できません"
              >
                {powerLawData && powerLawData.length > 0 ? (
                  <div className="flex items-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-semibold text-[#FF69B4]">
                        {formatCurrency(supportPrice * exchangeRate, 'JPY')}
                      </div>
                      <div className={`${typography.tiny} ${colors.textMuted}`}>
                        ({formatCurrency(supportPrice, 'USD')})
                      </div>
                    </div>
                  </div>
                ) : null}
              </DataContainer>
            </div>
          </div>

          {/* Exchange Rate and Last Updated */}
          <div className="flex justify-between items-center bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <div className={`${typography.small} ${colors.textMuted}`}>
              為替レート: {formatCurrency(exchangeRate, 'JPY', { maxDecimals: 2 }).replace('¥', '')}円/USD
            </div>
            <div className={`${typography.small} ${colors.textMuted}`}>
              {currentPrice && (
                <span>
                  最終更新: {new Date(currentPrice.timestamp).toLocaleString('ja-JP', { timeStyle: 'short' })}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* --- Price Information Section End --- */}


        {/* --- Main: Tabbed Power Law Chart --- */}
        {/* mt-12 removed */}
        <div>
          <h1 className={`${typography.h1} text-center text-[#D4AF37] mb-4`}>パワーローチャート</h1>
          <div className="flex justify-center mb-2 space-x-10">
            <button
              onClick={() => setActiveTab('loglog')} // 'loglog' (Log Scale) button
              className={`px-6 py-2 ${typography.subtitle} rounded-full transition-all duration-300 ${activeTab === 'loglog' ? colors.tabActive : colors.tabInactive
                } hover:bg-gray-700/50`}
            >
              logスケール
            </button>
            <button
              onClick={() => setActiveTab('log')} // 'log' (Log-Log Scale) button
              className={`px-6 py-2 ${typography.subtitle} rounded-full transition-all duration-300 ${activeTab === 'log' ? colors.tabActive : colors.tabInactive
                } hover:bg-gray-700/50`}
            >
              log-logスケール
            </button>
          </div>
          <div className="relative rounded-2xl ${colors.cardBorder} overflow-hidden shadow-lg"> {/* relative added */}
            <DataContainer
              isLoading={loading}
              error={error}
              loadingMessage="チャートデータ取得中..."
              noDataMessage="チャートデータがありません"
            >
              <PowerLawChartWrapper
                rSquared={rSquared}
                chartData={chartDataToUse}
                exchangeRate={exchangeRate || 1}
                currentPrice={currentPrice?.prices.usd}
                height={500}
                isLogScale={activeTab === 'log'} // isLogScale は 'log' の時に true (修正)
              />
            </DataContainer>

          </div>
          <div className="mt-6 text-center">
            <Link
              to="/power-law-explanation"
              className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
            >
              パワーローについて詳しく学ぶ{' '}
              <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
        {/* --- Main: Tabbed Power Law Chart End --- */}


        {/* --- Simulator Links --- */}
        {/* mt-12 removed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/simulators/investment"
            className={`${colors.investmentCardBg} p-6 rounded-2xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl ${colors.cardBorderHighlight}`}
          >
            <div>
              <h3 className={`${typography.h2} ${colors.textPrimary} mb-2 flex items-center`}>
                <ChartLineUp className="h-6 w-6 mr-2" />
                積み立てシミュレーター
              </h3>
              <p className={`${typography.body} ${colors.textSecondary}`}>
                毎月一定額を投資した場合の将来価値をシミュレーションできます。
              </p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-white" />
          </Link>
          <Link
            to="/simulators/withdrawal"
            className={`${colors.withdrawalCardBg} p-6 rounded-2xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl ${colors.cardBorderHighlight}`}
          >
            <div>
              <h3 className={`${typography.h2} ${colors.textPrimary} mb-2 flex items-center`}>
                <PhosphorWallet className="h-6 w-6 mr-2" />
                取り崩しシミュレーター
              </h3>
              <p className={`${typography.body} ${colors.textSecondary}`}>
                資産を取り崩しながら運用した場合のシミュレーションができます。
              </p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-white" />
          </Link>
        </div>
        {/* --- Simulator Links End --- */}


        {/* --- Analysis News Link --- */}
        <div className="text-center">
          <Link
            to="/analysis-news"
            className={`bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors text-white`}
          >
            詳細な価格分析を見る
            <Info className="ml-2 h-4 w-4" />
          </Link>
        </div>
        {/* --- Analysis News Link End --- */}

      </div>
    </div>
  );
};

export default Home;