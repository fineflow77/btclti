// src/pages/Home.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Info, ArrowUpRight } from 'lucide-react';
import { useBitcoinData } from '../hooks/useBitcoinData';
import PowerLawChartWrapper from '../components/charts/PowerLawChartWrapper';
import { formatCurrency } from '../utils/formatters';
import { calculatePowerLawPosition, getPowerLawPositionLabel } from '../utils/models';
import { calculateRSquared } from '../utils/mathUtils';
import DataContainer from '../components/ui/DataContainer';
import { ChartLineUp, Wallet as PhosphorWallet } from 'phosphor-react';
import { BitcoinData, PowerLawDataPoint, WeeklyPrice, DailyPrice } from '../types';

const typography: Record<string, string> = {
  h1: 'text-3xl sm:text-4xl font-bold tracking-tight',
  h2: 'text-2xl sm:text-3xl font-semibold',
  subtitle: 'text-lg sm:text-xl font-medium',
  body: 'text-base sm:text-lg font-normal',
  small: 'text-sm sm:text-base font-normal',
  tiny: 'text-xs sm:text-sm font-light',
};

const colors: Record<string, string> = {
  primary: 'bg-[#3B82F6] hover:bg-[#2b6cb0] text-white',
  secondary: 'bg-[#D4AF37] hover:bg-[#b8972f] text-black',
  accent: 'bg-[#FF69B4] hover:bg-[#e05a9f] text-white', // Pink accent for lower bound related buttons if needed
  cardBg: 'bg-gray-800/50 backdrop-blur-sm',
  cardBorder: 'border border-gray-700/50',
  cardBorderHighlight: 'border border-[#D4AF37]/30',
  textPrimary: 'text-gray-100',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  chartBg: 'bg-transparent',
  investmentCardBg: 'bg-gradient-to-br from-[#3B82F6] to-[#2b6cb0]',
  withdrawalCardBg: 'bg-gradient-to-br from-[#D4AF37] to-[#b8972f]',
  buttonBg: 'bg-gray-700',
  buttonHover: 'hover:bg-gray-600',
  tabActive: 'border-b-2 border-[#D4AF37] text-[#D4AF37]',
  tabInactive: 'text-gray-400 hover:text-gray-200',
  amber: 'text-[#D4AF37]',
  green: 'text-[#10B981]', // Adjusted green from green-400 to #10B981 to match central price color
  red: 'text-red-400',
  neutral: 'text-[#A3A3A3]',
  pink: 'text-[#FF69B4]', // Adding pink color for support price
};

const Home: React.FC = () => {
  const { loading, error, currentPrice, exchangeRate, weeklyPrices, powerLawData, dailyPrices } = useBitcoinData() as BitcoinData;
  const [rSquared, setRSquared] = useState<number>(0.9703);
  const [activeTab, setActiveTab] = useState<'log' | 'loglog'>('log');

  useEffect(() => {
    if (weeklyPrices && weeklyPrices.length > 0) {
      const calculatedRSquared = calculateRSquared(
        weeklyPrices.map((item: WeeklyPrice) => [new Date(item.date).getTime(), item.price])
      );
      if (calculatedRSquared !== null) setRSquared(calculatedRSquared);
    }
  }, [weeklyPrices]);

  const powerLawPosition = useMemo(() => {
    if (!currentPrice || !powerLawData || !currentPrice.prices || !currentPrice.prices.usd) return null;

    // Get the latest non-future data point
    const now = Date.now();
    const latestNonFutureData = powerLawData
      .filter((item: PowerLawDataPoint) => item.date <= now)
      .sort((a: PowerLawDataPoint, b: PowerLawDataPoint) => b.date - a.date)[0];

    if (!latestNonFutureData) return null;

    return calculatePowerLawPosition(
      currentPrice.prices.usd,
      latestNonFutureData.medianModel,
      latestNonFutureData.supportModel
    );
  }, [currentPrice, powerLawData]);

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
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 価格カード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 現在価格カード */}
          <div className={`${colors.cardBg} p-6 rounded-2xl shadow-lg ${colors.cardBorder} transition-all duration-300 hover:shadow-xl`}>
            <h3 className={`${typography.subtitle} ${colors.amber} mb-3 flex items-center`}>
              <TrendingUp className="h-5 w-5 mr-2" /> 現在価格
            </h3>
            <DataContainer
              isLoading={loading}
              error={error}
              loadingMessage="価格データ取得中..."
              noDataMessage="価格データが利用できません"
            >
              {currentPrice && currentPrice.prices.usd ? (
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#D4AF37]">
                    {formatCurrency(currentPrice.prices.jpy, 'JPY')}
                  </div>
                  <div className={`${typography.tiny} ${colors.textMuted}`}>
                    ({formatCurrency(currentPrice.prices.usd, 'USD')})
                  </div>
                  {priceChangePercentage !== null && (
                    <div className={`${typography.tiny} font-medium ${priceChangePercentage >= 0 ? 'text-green-400' : colors.red // Use text-green-400 for positive change
                      }`}
                    >
                      前日比: {priceChangePercentage >= 0 ? '+' : ''}{priceChangePercentage.toFixed(2)}%
                    </div>
                  )}
                  {powerLawPosition !== null && (
                    <div className="mt-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${powerLawPosition > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          } hover:bg-[#b8972f]/20 hover:text-[#b8972f] transition-all duration-300`}
                      >
                        {getPowerLawPositionLabel(powerLawPosition)}
                      </span>
                    </div>
                  )}
                </div>
              ) : null}
            </DataContainer>
          </div>

          {/* 中央価格カード */}
          <div className={`${colors.cardBg} p-6 rounded-2xl shadow-lg ${colors.cardBorder} transition-all duration-300 hover:shadow-xl`}>
            <h3 className={`${typography.subtitle} ${colors.green} mb-3`}>本日のパワーロー 中央価格</h3>
            <DataContainer
              isLoading={loading}
              error={error}
              loadingMessage="価格データ取得中..."
              noDataMessage="中央価格データが利用できません"
            >
              {powerLawData && powerLawData.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-[#10B981]">
                    {formatCurrency(medianPrice * exchangeRate, 'JPY')}
                  </div>
                  <div className={`${typography.tiny} ${colors.textMuted}`}>
                    ({formatCurrency(medianPrice, 'USD')})
                  </div>
                  {medianDeviation !== null && (
                    <div
                      className={`${typography.tiny} font-medium ${medianDeviation >= 0 ? 'text-red-400' : 'text-green-400' // red for above median, green for below
                        }`}
                    >
                      現在価格は中央価格より {medianDeviation.toFixed(1)}% 乖離
                    </div>
                  )}
                </div>
              ) : null}
            </DataContainer>
          </div>

          {/* 下限価格カード */}
          <div className={`${colors.cardBg} p-6 rounded-2xl shadow-lg ${colors.cardBorder} transition-all duration-300 hover:shadow-xl`}>
            <h3 className={`${typography.subtitle} ${colors.pink} mb-3`}>本日のパワーロー 下限価格</h3>
            <DataContainer
              isLoading={loading}
              error={error}
              loadingMessage="価格データ取得中..."
              noDataMessage="下限価格データが利用できません"
            >
              {powerLawData && powerLawData.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-[#FF69B4]">
                    {formatCurrency(supportPrice * exchangeRate, 'JPY')}
                  </div>
                  <div className={`${typography.tiny} ${colors.textMuted}`}>
                    ({formatCurrency(supportPrice, 'USD')})
                  </div>
                  {supportDeviation !== null && (
                    <div
                      className={`${typography.tiny} font-medium ${supportDeviation >= 0 ? 'text-green-400' : 'text-red-400' // green for above support, red for below
                        }`}
                    >
                      現在価格は、この価格より {supportDeviation >= 0 ? '+' : ''}{supportDeviation.toFixed(1)}% 乖離
                    </div>
                  )}
                </div>
              ) : null}
            </DataContainer>
          </div>
        </div>

        {/* 為替レートと最終更新 */}
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

        {/* メイン：タブ付きパワーローチャート */}
        <div className="mt-12">
          <h1 className={`${typography.h1} text-center text-[#D4AF37] mb-6`}>
            長期パワーローチャート
          </h1>
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setActiveTab('log')}
              className={`px-6 py-2 ${typography.subtitle} rounded-full transition-all duration-300 ${activeTab === 'log' ? colors.tabActive : colors.tabInactive
                } hover:bg-gray-700/50`}
            >
              対数スケール
            </button>
            <button
              onClick={() => setActiveTab('loglog')}
              className={`px-6 py-2 ${typography.subtitle} rounded-full transition-all duration-300 ${activeTab === 'loglog' ? colors.tabActive : colors.tabInactive
                } hover:bg-gray-700/50`}
            >
              対数-対数スケール
            </button>
          </div>
          <div className={`rounded-2xl ${colors.cardBorder} overflow-hidden shadow-lg`}>
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
                isLogScale={activeTab === 'log'}
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

        {/* シミュレーターへの導線 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
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

        {/* ニュースと分析への導線 */}
        <div className="text-center mt-12">
          <Link
            to="/analysis-news"
            className={`${colors.primary} px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
          >
            最新の価格分析とニュースを見る
            <Info className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;