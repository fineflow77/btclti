import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Calendar, PiggyBank } from 'lucide-react';
import { useBitcoinData } from '../hooks/useBitcoinData';
import { calculateVolatility, calculateDrawdown } from '../utils/mathUtils';
import { getDaysSinceGenesis } from '../utils/dateUtils';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { btcPriceMedian, btcPriceSupport, getPowerLawPositionLabel, getPowerLawPositionColor } from '../utils/models';
import DataContainer from '../components/ui/DataContainer';

// スタイル設定
const typography = {
    h1: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    body: 'text-sm sm:text-base font-normal',
    small: 'text-xs sm:text-sm font-normal',
};

const colors = {
    primary: 'bg-[#3B82F6] hover:bg-[#2b6cb0] text-white',
    cardBg: 'bg-gray-800',
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    info: 'text-[#3B82F6]',
};

const AnalysisNews: React.FC = () => {
    // 未使用の powerLawData と rSquared を削除
    const { loading, error, currentPrice, dailyPrices, exchangeRate } = useBitcoinData();

    // 乖離率計算
    const { medianDeviation, supportDeviation } = useMemo(() => {
        if (!currentPrice?.prices?.usd) return { medianDeviation: null, supportDeviation: null };
        const daysNow = getDaysSinceGenesis(new Date());
        if (daysNow <= 0) return { medianDeviation: null, supportDeviation: null };
        const currentMedian = btcPriceMedian(daysNow);
        const currentSupport = btcPriceSupport(daysNow);
        if (!currentMedian || !currentSupport) return { medianDeviation: null, supportDeviation: null };
        return {
            medianDeviation: ((currentPrice.prices.usd - currentMedian) / currentMedian) * 100,
            supportDeviation: ((currentPrice.prices.usd - currentSupport) / currentSupport) * 100,
        };
    }, [currentPrice]);

    // ボラティリティ計算
    const volatility30d = useMemo(() => {
        if (!dailyPrices || dailyPrices.length < 31) return null;
        const sorted = [...dailyPrices].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return calculateVolatility(sorted, 30);
    }, [dailyPrices]);

    // ドローダウン計算
    const drawdown = useMemo(() => {
        if (!currentPrice?.prices?.usd || !dailyPrices || dailyPrices.length === 0) return null;
        const sorted = [...dailyPrices].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return calculateDrawdown(currentPrice.prices.usd, sorted);
    }, [currentPrice, dailyPrices]);

    // 将来予測
    const calculateFuturePrediction = (years: number): { median: number; support: number } | null => {
        if (!exchangeRate) return null;
        const targetDate = new Date();
        targetDate.setFullYear(targetDate.getFullYear() + years);
        const days = getDaysSinceGenesis(targetDate);
        if (days <= 0) return null;
        const medianUSD = btcPriceMedian(days);
        const supportUSD = btcPriceSupport(days);
        if (!medianUSD || !supportUSD) return null;
        return {
            median: medianUSD * exchangeRate,
            support: supportUSD * exchangeRate,
        };
    };

    const prediction1y = useMemo(() => calculateFuturePrediction(1), [exchangeRate]);
    const prediction3y = useMemo(() => calculateFuturePrediction(3), [exchangeRate]);
    const prediction10y = useMemo(() => calculateFuturePrediction(10), [exchangeRate]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] via-[#2d3748] to-[#1a202c]">
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* タイトル */}
                <div className="text-center pt-4 pb-2">
                    <h1 className={`${typography.h1} ${colors.info}`}>
                        今日のビットコインをチェック
                    </h1>
                    <p className={`${typography.body} ${colors.textMuted} mt-2 max-w-2xl mx-auto`}>
                        パワーローを使って今の価格を分析。長期目線での投資判断に役立つデータをまとめました。
                    </p>
                </div>

                {/* 現在の状況 */}
                <section className={`${colors.cardBg} p-6 rounded-xl shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        今のビットコインの状況
                    </h2>
                    <DataContainer isLoading={loading} error={error} loadingMessage="データ取得中...">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className={`${typography.body} ${colors.textSecondary}`}>現在価格: </span>
                                <span className={`${typography.body} ${colors.textPrimary} font-semibold`}>
                                    {formatCurrency(currentPrice?.prices?.jpy ?? null, 'JPY') ?? '---'} ({formatCurrency(currentPrice?.prices?.usd ?? null, 'USD') ?? '---'})
                                </span>
                            </div>
                            <div>
                                <span className={`${typography.body} ${colors.textSecondary}`}>トレンド位置: </span>
                                {medianDeviation !== null && supportDeviation !== null ? (
                                    <span
                                        className={`${typography.body} font-semibold px-2 py-0.5 rounded`}
                                        style={{ backgroundColor: getPowerLawPositionColor(medianDeviation, supportDeviation), color: '#fff' }}
                                    >
                                        {getPowerLawPositionLabel(medianDeviation, supportDeviation)}
                                    </span>
                                ) : (
                                    <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                                )}
                            </div>
                            <div>
                                <span className={`${typography.body} ${colors.textSecondary}`}>標準価格との差: </span>
                                {medianDeviation !== null ? (
                                    <span className={`${typography.body} ${medianDeviation > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {formatPercentage(medianDeviation)}
                                    </span>
                                ) : (
                                    <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                                )}
                            </div>
                            <div>
                                <span className={`${typography.body} ${colors.textSecondary}`}>下限価格との差: </span>
                                {supportDeviation !== null ? (
                                    <span className={`${typography.body} ${supportDeviation > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {formatPercentage(supportDeviation)}
                                    </span>
                                ) : (
                                    <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                                )}
                            </div>
                        </div>
                    </DataContainer>
                </section>

                {/* リスク指標 */}
                <section className={`${colors.cardBg} p-6 rounded-xl shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingDown className="h-5 w-5 mr-2" />
                        リスクとデータ
                    </h2>
                    <DataContainer isLoading={loading} error={error} loadingMessage="計算中...">
                        <div className="space-y-4">
                            <div>
                                <span className={`${typography.body} ${colors.textSecondary}`}>値動きの大きさ (30日): </span>
                                {volatility30d !== null ? (
                                    <span className={`${typography.body} ${colors.textPrimary}`}>{volatility30d.toFixed(1)}%</span>
                                ) : (
                                    <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                                )}
                                <p className={`${typography.small} ${colors.textMuted}`}>値動きの激しさを年率で表したもの</p>
                            </div>
                            <div>
                                <span className={`${typography.body} ${colors.textSecondary}`}>最高値からの下落: </span>
                                {drawdown !== null ? (
                                    <span className={`${typography.body} ${colors.textPrimary}`}>{drawdown.toFixed(1)}%</span>
                                ) : (
                                    <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                                )}
                                <p className={`${typography.small} ${colors.textMuted}`}>過去のピークからの下落率</p>
                            </div>
                        </div>
                    </DataContainer>
                </section>

                {/* 将来予測 */}
                <section className={`${colors.cardBg} p-6 rounded-xl shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <Calendar className="h-5 w-5 mr-2" />
                        将来の価格目安
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <span className={`${typography.body} ${colors.textSecondary}`}>1年後: </span>
                            {prediction1y ? (
                                <span className={`${typography.body} ${colors.textPrimary}`}>
                                    {formatCurrency(prediction1y.median, 'JPY')} / {formatCurrency(prediction1y.support, 'JPY')}
                                </span>
                            ) : (
                                <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                            )}
                        </div>
                        <div>
                            <span className={`${typography.body} ${colors.textSecondary}`}>3年後: </span>
                            {prediction3y ? (
                                <span className={`${typography.body} ${colors.textPrimary}`}>
                                    {formatCurrency(prediction3y.median, 'JPY')} / {formatCurrency(prediction3y.support, 'JPY')}
                                </span>
                            ) : (
                                <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                            )}
                        </div>
                        <div>
                            <span className={`${typography.body} ${colors.textSecondary}`}>10年後: </span>
                            {prediction10y ? (
                                <span className={`${typography.body} ${colors.textPrimary}`}>
                                    {formatCurrency(prediction10y.median, 'JPY')} / {formatCurrency(prediction10y.support, 'JPY')}
                                </span>
                            ) : (
                                <span className={`${typography.small} ${colors.textMuted}`}>計算中...</span>
                            )}
                        </div>
                        <div className="text-right">
                            <Link
                                to="/simulators/investment"
                                className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center"
                            >
                                <PiggyBank className="h-4 w-4 mr-1" /> 積み立てを試す
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnalysisNews;