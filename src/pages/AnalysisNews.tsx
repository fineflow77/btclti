// AnalysisNews.tsx 改善案 (型エラー修正版)

import React, { useMemo } from 'react';
import {
    BarChart2, TrendingDown, Percent, Calendar, TrendingUp,
    Activity, Info, Target, BarChartHorizontal, PiggyBank
} from 'lucide-react';
import { Link } from 'react-router-dom';

// 既存のフックとユーティリティをインポート
import { useBitcoinData } from '../hooks/useBitcoinData';
import {
    calculateVolatility, calculateDrawdown, calculateMean, calculateStdDev, calculateZScore
} from '../utils/mathUtils';
import { getDaysSinceGenesis } from '../utils/dateUtils';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { btcPriceMedian, btcPriceSupport, getPowerLawPositionLabel, getPowerLawPositionColor } from '../utils/models';
import DataContainer from '../components/ui/DataContainer';

// 既存のスタイルクラスを維持
const cardBaseClass = "bg-gray-800 bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700";
const textPrimaryClass = "text-gray-100";
const textSecondaryClass = "text-gray-400";
const textMutedClass = "text-gray-500";
const linkClass = "text-blue-400 hover:text-blue-300 transition-colors duration-200";
const h1Class = "text-3xl sm:text-4xl font-bold text-white tracking-tight";
const h2Class = "text-xl font-semibold text-blue-300 mb-4 flex items-center";
const bodyClass = "text-base";
const smallClass = "text-sm";
const backgroundGradientClass = 'bg-gradient-to-b from-[#1a202c] via-[#2d3748] to-[#1a202c]';
const gridClass = "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5";

// Z-Scoreの説明をより直感的に
function getZScoreInterpretation(z: number | null): string {
    if (z === null) return 'N/A';
    if (z > 2) return '非常に割高 💸';
    if (z > 1) return 'やや割高 ⚠️';
    if (z < -2) return '超割安！🔥';
    if (z < -1) return 'やや割安 👍';
    return '適正水準 ✓';
};

// 指標ラベルコンポーネントは変更なし
const MetricLabel: React.FC<{ label: string, explanation: string }> = ({ label, explanation }) => {
    return (
        <div className="flex flex-col">
            <span className={`${bodyClass} ${textSecondaryClass}`}>{label}:</span>
            <span className={`${smallClass} ${textMutedClass} mt-0.5`}>{explanation}</span>
        </div>
    );
};

const AnalysisNews: React.FC = () => {
    // 説明テキストをより簡潔に
    const explanations = {
        volatility: "値動きの激しさを表す指標（年率）。数値が大きいほど乱高下しやすい",
        drawdown: "史上最高値からの下落率。どれだけ高値から下がっているかの指標",
        zScore: "現在の価格が平均的な価格帯からどれだけ離れているか",
        rSquared: "予測モデルの精度。1に近いほど信頼性が高い",
        prediction1y: "1年後の予測価格(中央値/下限値)",
        prediction3y: "3年後の予測価格(中央値/下限値)",
        prediction10y: "10年後の予測価格(中央値/下限値)"
    };

    // 既存のデータフック呼び出し
    const {
        loading, error, currentPrice, dailyPrices,
        powerLawData,
        exchangeRate,
        rSquared
    } = useBitcoinData();

    // --- useMemo 計算部分は変更なし（そのまま維持） ---
    const { medianDeviation, supportDeviation } = useMemo(() => {
        if (!currentPrice?.prices?.usd) return { medianDeviation: null, supportDeviation: null };
        try {
            const daysNow = getDaysSinceGenesis(new Date());
            if (daysNow <= 0) return { medianDeviation: null, supportDeviation: null };
            const currentMedian = btcPriceMedian(daysNow);
            const currentSupport = btcPriceSupport(daysNow);
            if (!currentMedian || currentMedian <= 0 || !currentSupport || currentSupport <= 0) return { medianDeviation: null, supportDeviation: null };
            return {
                medianDeviation: ((currentPrice.prices.usd - currentMedian) / currentMedian) * 100,
                supportDeviation: ((currentPrice.prices.usd - currentSupport) / currentSupport) * 100
            };
        } catch (e) { console.error("Error calculating deviations:", e); return { medianDeviation: null, supportDeviation: null }; }
    }, [currentPrice]);

    const volatility30d = useMemo(() => {
        if (!dailyPrices || dailyPrices.length < 31) return null;
        try {
            const sorted = [...dailyPrices].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const result = calculateVolatility(sorted, 30);
            return typeof result === 'number' && isFinite(result) ? result : null;
        } catch (e) { console.error("Error calculating volatility:", e); return null; }
    }, [dailyPrices]);

    const drawdown = useMemo(() => {
        if (!currentPrice?.prices?.usd || !dailyPrices || dailyPrices.length === 0) return null;
        try {
            const sorted = [...dailyPrices].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const result = calculateDrawdown(currentPrice.prices.usd, sorted);
            return typeof result === 'number' && isFinite(result) ? result : null;
        } catch (e) { console.error("Error calculating drawdown:", e); return null; }
    }, [currentPrice, dailyPrices]);

    const historicalMedianDeviations = useMemo(() => {
        if (!powerLawData || powerLawData.length < 2) return [];
        try {
            return powerLawData
                .filter(d => !d.isFuture && d.price !== null && d.price > 0 && d.medianModel > 0)
                .map(d => d.medianModel === 0 ? null : ((d.price as number) - d.medianModel) / d.medianModel)
                .filter((val): val is number => typeof val === 'number' && isFinite(val));
        } catch (e) { console.error("Error calculating historical deviations:", e); return []; }
    }, [powerLawData]);

    const medianDeviationZScore = useMemo(() => {
        if (medianDeviation === null || historicalMedianDeviations.length < 2) return null;
        try {
            const currentRatio = medianDeviation / 100;
            const mean = calculateMean(historicalMedianDeviations);
            const stdDev = calculateStdDev(historicalMedianDeviations, mean);
            if (stdDev === null || !isFinite(stdDev) || stdDev < 1e-9) return null;
            const result = calculateZScore(currentRatio, mean, stdDev);
            return typeof result === 'number' && isFinite(result) ? result : null;
        } catch (e) { console.error("Error calculating Z-Score:", e); return null; }
    }, [medianDeviation, historicalMedianDeviations]);

    const calculateFuturePrediction = (targetDate: Date): { median: { usd: number; jpy: number }; support: { usd: number; jpy: number } } | null => {
        if (!exchangeRate || !isFinite(exchangeRate)) return null;
        try {
            const days = getDaysSinceGenesis(targetDate);
            if (days <= 0) return null;
            const medianUSD = btcPriceMedian(days);
            const supportUSD = btcPriceSupport(days);
            if (!medianUSD || medianUSD <= 0 || !supportUSD || supportUSD <= 0 || !isFinite(medianUSD) || !isFinite(supportUSD)) return null;
            return {
                median: { usd: medianUSD, jpy: medianUSD * exchangeRate },
                support: { usd: supportUSD, jpy: supportUSD * exchangeRate }
            };
        } catch (e) { console.error("Error calculating future prediction for", targetDate, e); return null; }
    };

    const prediction1y = useMemo(() => calculateFuturePrediction(new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())), [exchangeRate]);
    const prediction3y = useMemo(() => calculateFuturePrediction(new Date(new Date().getFullYear() + 3, new Date().getMonth(), new Date().getDate())), [exchangeRate]);
    const prediction10y = useMemo(() => calculateFuturePrediction(new Date(new Date().getFullYear() + 10, new Date().getMonth(), new Date().getDate())), [exchangeRate]);

    // --- レンダリング ---
    return (
        <div className={`flex flex-col min-h-screen ${backgroundGradientClass}`}>
            <div className={`flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 ${textPrimaryClass}`}>

                {/* --- ページタイトル --- */}
                <div className="text-center pt-4 pb-2">
                    <h1 className={`${h1Class}`}>ビットコイン今日の値動き診断</h1>
                    <p className={`text-lg ${textMutedClass} mt-2 max-w-2xl mx-auto`}>
                        パワーローモデルを活用した価格診断で、今が買い時か売り時かをチェック。
                        長期投資家のための指標を見やすく整理しました。
                    </p>
                </div>

                {/* --- 現在の状況カード --- */}
                <section aria-labelledby="current-status-heading" className={cardBaseClass}>
                    <h2 id="current-status-heading" className={h2Class}> <TrendingUp className="h-5 w-5 mr-2" /> 今日のBTC診断結果 </h2>
                    <DataContainer isLoading={loading} error={error} loadingMessage="データロード中...">
                        <div className={gridClass}>
                            {/* 現在価格 */}
                            <div className="flex items-center space-x-2">
                                <span className={`w-6 text-center ${textSecondaryClass}`}>¥</span>
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[70px]`}>現在価格:</span>
                                <span className={`${bodyClass} ${textPrimaryClass} font-semibold`}>
                                    {formatCurrency(currentPrice?.prices?.jpy ?? null, 'JPY') ?? '---'}
                                    <span className={`${smallClass} ${textMutedClass} ml-1`}>({formatCurrency(currentPrice?.prices?.usd ?? null, 'USD') ?? '---'})</span>
                                </span>
                            </div>
                            {/* パワーロー評価 */}
                            <div className="flex items-center space-x-2">
                                <BarChartHorizontal className={`h-5 w-6 ${textSecondaryClass}`} />
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[70px]`}>市場ポジション:</span>
                                {(medianDeviation !== null && supportDeviation !== null) ? (
                                    <span className={`${bodyClass} font-semibold px-2 py-0.5 rounded`} style={{ backgroundColor: getPowerLawPositionColor(medianDeviation, supportDeviation), color: '#fff' }}>
                                        {getPowerLawPositionLabel(medianDeviation, supportDeviation)}
                                    </span>
                                ) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            </div>
                            {/* 中央乖離 */}
                            <div className="flex items-center space-x-2">
                                <span className={`w-6 text-center ${textSecondaryClass}`}>📈</span>
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[70px]`}>標準値との差:</span>
                                {medianDeviation !== null ? (<span className={`${bodyClass} ${textPrimaryClass} font-semibold ${medianDeviation > 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(medianDeviation)}</span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            </div>
                            {/* 下限乖離 */}
                            <div className="flex items-center space-x-2">
                                <span className={`w-6 text-center ${textSecondaryClass}`}>📉</span>
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[70px]`}>下限値との差:</span>
                                {supportDeviation !== null ? (<span className={`${bodyClass} ${textPrimaryClass} font-semibold ${supportDeviation > 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(supportDeviation)}</span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            </div>
                        </div>
                    </DataContainer>
                </section>

                {/* --- リスク & 統計指標カード --- */}
                <section aria-labelledby="risk-stats-heading" className={cardBaseClass}>
                    <h2 id="risk-stats-heading" className={h2Class}> <Activity className="h-5 w-5 mr-2" /> リスク指標 & 重要データ </h2>
                    <DataContainer isLoading={loading} error={error} loadingMessage="指標計算中...">
                        <div className="grid grid-cols-1 gap-y-5">
                            {/* ボラティリティ */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-4">
                                <div className="flex items-center">
                                    <BarChart2 className={`h-5 w-6 ${textSecondaryClass} mr-2`} />
                                    <MetricLabel
                                        label="値動きの激しさ"
                                        explanation={explanations.volatility}
                                    />
                                </div>
                                <div className="ml-8 sm:ml-auto">
                                    {volatility30d !== null ? (
                                        <span className={`${bodyClass} ${textPrimaryClass} font-semibold`}>
                                            {volatility30d.toFixed(1)}%
                                        </span>
                                    ) : (
                                        <span className={`${smallClass} ${textMutedClass}`}>計算中...</span>
                                    )}
                                </div>
                            </div>
                            {/* ドローダウン */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-4">
                                <div className="flex items-center">
                                    <TrendingDown className={`h-5 w-6 ${textSecondaryClass} mr-2`} />
                                    <MetricLabel
                                        label="最高値からの下落"
                                        explanation={explanations.drawdown}
                                    />
                                </div>
                                <div className="ml-8 sm:ml-auto">
                                    {drawdown !== null ? (
                                        <span className={`${bodyClass} ${textPrimaryClass} font-semibold`}>
                                            {drawdown.toFixed(1)}%
                                        </span>
                                    ) : (
                                        <span className={`${smallClass} ${textMutedClass}`}>計算中...</span>
                                    )}
                                </div>
                            </div>
                            {/* 乖離Zスコア */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-4">
                                <div className="flex items-center">
                                    <Percent className={`h-5 w-6 ${textSecondaryClass} mr-2`} />
                                    <MetricLabel
                                        label="価格の偏り度"
                                        explanation={explanations.zScore}
                                    />
                                </div>
                                <div className="ml-8 sm:ml-auto">
                                    {medianDeviationZScore !== null ? (
                                        <span className={`${bodyClass} ${textPrimaryClass} font-semibold`}>
                                            {medianDeviationZScore.toFixed(2)}
                                            <span className={`${smallClass} ${textMutedClass} ml-1`}>
                                                ({getZScoreInterpretation(medianDeviationZScore)})
                                            </span>
                                        </span>
                                    ) : (
                                        <span className={`${smallClass} ${textMutedClass}`}>計算中...</span>
                                    )}
                                </div>
                            </div>
                            {/* モデル適合度 R2 */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-4">
                                <div className="flex items-center">
                                    <Target className={`h-5 w-6 ${textSecondaryClass} mr-2`} />
                                    <MetricLabel
                                        label="モデル信頼度"
                                        explanation={explanations.rSquared}
                                    />
                                </div>
                                <div className="ml-8 sm:ml-auto">
                                    {rSquared !== null ? (
                                        <span className={`${smallClass} ${textPrimaryClass} font-semibold`}>
                                            {rSquared.toFixed(4)}
                                        </span>
                                    ) : (
                                        <span className={`${smallClass} ${textMutedClass}`}>計算中...</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DataContainer>
                </section>

                {/* --- 将来予測 --- */}
                <section aria-labelledby="forecast-info-heading" className={cardBaseClass}>
                    <h2 id="forecast-info-heading" className={h2Class}> <Calendar className="h-5 w-5 mr-2" /> 未来予測 & 長期見通し </h2>
                    <div className="space-y-5">
                        {/* 1年後予測 */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-4">
                            <div className="flex items-center">
                                <span className={`w-6 text-center ${textSecondaryClass} mr-2`}>🔮</span>
                                <MetricLabel
                                    label="1年後の予想価格"
                                    explanation="長期トレンドに基づいた1年後の予測価格範囲"
                                />
                            </div>
                            <div className="ml-8 sm:ml-auto">
                                {prediction1y !== null ? (
                                    <span className={`${smallClass} ${textPrimaryClass}`}>
                                        {formatCurrency(prediction1y.median.jpy, 'JPY')}
                                        <span className={`${smallClass} ${textMutedClass}`}>
                                            ({formatCurrency(prediction1y.median.usd, 'USD')})
                                        </span> /
                                        {formatCurrency(prediction1y.support.jpy, 'JPY')}
                                        <span className={`${smallClass} ${textMutedClass}`}>
                                            ({formatCurrency(prediction1y.support.usd, 'USD')})
                                        </span>
                                    </span>
                                ) : (
                                    <span className={`${smallClass} ${textMutedClass}`}>計算中...</span>
                                )}
                            </div>
                        </div>
                        {/* 3年後予測 */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-4">
                            <div className="flex items-center">
                                <span className={`w-6 text-center ${textSecondaryClass} mr-2`}>✨</span>
                                <MetricLabel
                                    label="3年後の予想価格"
                                    explanation="長期トレンドに基づいた3年後の予測価格範囲"
                                />
                            </div>
                            <div className="ml-8 sm:ml-auto">
                                {prediction3y !== null ? (
                                    <span className={`${smallClass} ${textPrimaryClass}`}>
                                        {formatCurrency(prediction3y.median.jpy, 'JPY')}
                                        <span className={`${smallClass} ${textMutedClass}`}>
                                            ({formatCurrency(prediction3y.median.usd, 'USD')})
                                        </span> /
                                        {formatCurrency(prediction3y.support.jpy, 'JPY')}
                                        <span className={`${smallClass} ${textMutedClass}`}>
                                            ({formatCurrency(prediction3y.support.usd, 'USD')})
                                        </span>
                                    </span>
                                ) : (
                                    <span className={`${smallClass} ${textMutedClass}`}>計算中...</span>
                                )}
                            </div>
                        </div>
                        {/* 10年後予測 */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-4">
                            <div className="flex items-center">
                                <span className={`w-6 text-center ${textSecondaryClass} mr-2`}>🚀</span>
                                <MetricLabel
                                    label="10年後の予想価格"
                                    explanation="長期積立投資の目標値として参考にできる予測範囲"
                                />
                            </div>
                            <div className="ml-8 sm:ml-auto">
                                {prediction10y !== null ? (
                                    <span className={`${smallClass} ${textPrimaryClass}`}>
                                        {formatCurrency(prediction10y.median.jpy, 'JPY')}
                                        <span className={`${smallClass} ${textMutedClass}`}>
                                            ({formatCurrency(prediction10y.median.usd, 'USD')})
                                        </span> /
                                        {formatCurrency(prediction10y.support.jpy, 'JPY')}
                                        <span className={`${smallClass} ${textMutedClass}`}>
                                            ({formatCurrency(prediction10y.support.usd, 'USD')})
                                        </span>
                                    </span>
                                ) : (
                                    <span className={`${smallClass} ${textMutedClass}`}>計算中...</span>
                                )}
                            </div>
                        </div>
                        {/* 関連リンク */}
                        <div className="pt-4 border-t border-gray-700 flex flex-wrap gap-x-4 gap-y-2 justify-end">
                            <Link to="/power-law-explanation" className={`${linkClass} inline-flex items-center text-sm`}>
                                <Info className="h-4 w-4 mr-1" /> モデルの仕組みをわかりやすく解説
                            </Link>
                            <Link to="/simulators/investment" className={`${linkClass} inline-flex items-center text-sm ml-4`}>
                                <PiggyBank className="h-4 w-4 mr-1" /> 積立シミュレーターを試す
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnalysisNews;