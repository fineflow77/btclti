// src/pages/AnalysisNews.tsx
import React, { useMemo } from 'react';
// ★ 使われていないアイコンをインポートから削除
import {
    BarChart2, TrendingDown, Percent, /*HelpCircle,*/ Calendar, TrendingUp,
    /*CheckCircle,*/ Activity, /*ExternalLink,*/ Info, /*LineChart,*/ /*Link as LinkIcon,*/ Target, BarChartHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- フック・ユーティリティ・コンポーネント ---
import { useBitcoinData } from '../hooks/useBitcoinData'; // ★ 元のバージョンを使用
// ★ 使われていない calculateRSquared をインポートから削除
import {
    calculateVolatility, calculateDrawdown, calculateMean, calculateStdDev, calculateZScore
} from '../utils/mathUtils';
import { getDaysSinceGenesis } from '../utils/dateUtils';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { btcPriceMedian, btcPriceSupport, getPowerLawPositionLabel, getPowerLawPositionColor } from '../utils/models';
import DataContainer from '../components/ui/DataContainer';
// ★ チャートはコメントアウト中なのでインポートもコメントアウト (エラー解消のため)
// import PowerLawChartWrapper from '../components/charts/PowerLawChartWrapper';

// --- スタイルクラス (変更なし) ---
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

// --- ヘルパー関数 (変更なし) ---
function getZScoreInterpretation(z: number | null): string {
    if (z === null) return 'N/A';
    if (z > 2) return '非常に高い'; if (z > 1) return 'やや高い';
    if (z < -2) return '非常に低い'; if (z < -1) return 'やや低い';
    return '標準的';
};

const AnalysisNews: React.FC = () => {
    // ★ 使われていない weeklyPrices, dailyPowerLawData, dataSources を削除 (必要に応じて戻す)
    const {
        loading, error, currentPrice, dailyPrices,
        powerLawData,        // Zスコア計算で使う
        exchangeRate,
        rSquared             // R2表示で使う
        // dataSources // データソース表示しない場合は削除
    } = useBitcoinData();

    // --- useMemo 計算 (エラーハンドリング強化済み) ---
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
                    <h1 className={`${h1Class}`}>ビットコイン価格分析</h1>
                    <p className={`text-lg ${textMutedClass} mt-2 max-w-2xl mx-auto`}>
                        パワーローモデルと各種テクニカル指標に基づいた現在の市場ポジションを分析します。
                    </p>
                </div>

                {/* --- 現在の状況カード --- */}
                <section aria-labelledby="current-status-heading" className={cardBaseClass}>
                    <h2 id="current-status-heading" className={h2Class}> <TrendingUp className="h-5 w-5 mr-2" /> 現在の状況 </h2>
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
                                <BarChartHorizontal className={`h-5 w-5 w-6 ${textSecondaryClass}`} /> {/* ★ アイコンを使用 */}
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[70px]`}>評価:</span>
                                {(medianDeviation !== null && supportDeviation !== null) ? (
                                    <span className={`${bodyClass} font-semibold px-2 py-0.5 rounded`} style={{ backgroundColor: getPowerLawPositionColor(medianDeviation, supportDeviation), color: '#fff' }}>
                                        {getPowerLawPositionLabel(medianDeviation, supportDeviation)}
                                    </span>
                                ) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            </div>
                            {/* 中央乖離 */}
                            <div className="flex items-center space-x-2">
                                <span className={`w-6 text-center ${textSecondaryClass}`}>📈</span>
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[70px]`}>中央乖離:</span>
                                {medianDeviation !== null ? (<span className={`${bodyClass} ${textPrimaryClass} font-semibold ${medianDeviation > 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(medianDeviation)}</span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            </div>
                            {/* 下限乖離 */}
                            <div className="flex items-center space-x-2">
                                <span className={`w-6 text-center ${textSecondaryClass}`}>📉</span>
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[70px]`}>下限乖離:</span>
                                {supportDeviation !== null ? (<span className={`${bodyClass} ${textPrimaryClass} font-semibold ${supportDeviation > 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(supportDeviation)}</span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            </div>
                        </div>
                    </DataContainer>
                </section>

                {/* --- リスク & 統計指標カード --- */}
                <section aria-labelledby="risk-stats-heading" className={cardBaseClass}>
                    <h2 id="risk-stats-heading" className={h2Class}> <Activity className="h-5 w-5 mr-2" /> リスク & 統計指標 </h2> {/* ★ Activity アイコンを使用 */}
                    <DataContainer isLoading={loading} error={error} loadingMessage="指標計算中...">
                        <div className={gridClass}>
                            {/* ボラティリティ */}
                            <div className="flex items-center space-x-2" title="過去30日間の日次対数収益率の標準偏差（年率換算）">
                                <BarChart2 className={`h-5 w-5 w-6 ${textSecondaryClass}`} /> {/* ★ アイコンを使用 */}
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[110px]`}>ボラティリティ:</span>
                                {volatility30d !== null ? (<span className={`${bodyClass} ${textPrimaryClass} font-semibold`}>{volatility30d.toFixed(1)}%</span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                                <Info className="h-4 w-4 text-gray-500 cursor-help ml-auto" /> {/* ★ Info アイコンを使用 */}
                            </div>
                            {/* ドローダウン */}
                            <div className="flex items-center space-x-2" title="記録されている最高値からの現在価格の下落率">
                                <TrendingDown className={`h-5 w-5 w-6 ${textSecondaryClass}`} /> {/* ★ アイコンを使用 */}
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[110px]`}>下落率(ATH):</span>
                                {drawdown !== null ? (<span className={`${bodyClass} ${textPrimaryClass} font-semibold`}>{drawdown.toFixed(1)}%</span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                                <Info className="h-4 w-4 text-gray-500 cursor-help ml-auto" /> {/* ★ Info アイコンを使用 */}
                            </div>
                            {/* 乖離Zスコア */}
                            <div className="flex items-center space-x-2" title="中央価格からの乖離率が、過去の乖離率分布の中でどの位置にあるか（標準偏差単位）">
                                <Percent className={`h-5 w-5 w-6 ${textSecondaryClass}`} /> {/* ★ アイコンを使用 */}
                                <span className={`${bodyClass} ${textSecondaryClass} min-w-[110px]`}>乖離Zスコア:</span>
                                {medianDeviationZScore !== null ? (<span className={`${bodyClass} ${textPrimaryClass} font-semibold`}>{medianDeviationZScore.toFixed(2)} <span className={`${smallClass} ${textMutedClass}`}>({getZScoreInterpretation(medianDeviationZScore)})</span></span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                                <Info className="h-4 w-4 text-gray-500 cursor-help ml-auto" /> {/* ★ Info アイコンを使用 */}
                            </div>
                            {/* モデル適合度 R2 */}
                            <div className="flex items-center space-x-2" title="パワーローモデルへの価格データの適合度 (対数スケール)">
                                <Target className={`h-5 w-5 w-6 ${textSecondaryClass}`} /> {/* ★ アイコンを使用 */}
                                <span className={`${smallClass} ${textSecondaryClass} min-w-[110px]`}>モデル適合度(R²):</span>
                                {rSquared !== null ? (<span className={`${smallClass} ${textPrimaryClass} font-semibold`}>{rSquared.toFixed(4)}</span>) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                                <Info className="h-4 w-4 text-gray-500 cursor-help ml-auto" /> {/* ★ Info アイコンを使用 */}
                            </div>
                        </div>
                    </DataContainer>
                </section>

                {/* --- パワーローチャート (コメントアウト中) --- */}
                {/*
                <section aria-labelledby="powerlaw-chart-heading" className={cardBaseClass}>
                     <h2 id="powerlaw-chart-heading" className={h2Class}> <LineChart className="h-5 w-5 mr-2" /> パワーローモデル チャート </h2>
                    <DataContainer isLoading={loading || !powerLawData || powerLawData.length === 0} error={error} loadingMessage="チャートデータ生成中...">
                        <PowerLawChartWrapper
                            powerLawData={powerLawData || []}
                            dailyPowerLawData={dailyPowerLawData || []}
                            currentPrice={currentPrice}
                            exchangeRate={exchangeRate}
                            rSquared={rSquared}
                            isLoading={loading}
                            error={error}
                        />
                    </DataContainer>
                    <p className={`text-xs ${textMutedClass} mt-3 text-center`}>
                        対数スケールチャート。実線: 価格(USD), 点線: モデル中央値, 破線: モデル下限値。
                        {dataSources && ( ` データソース: ${dataSources.dailyPrices || 'N/A'} (日次), ${dataSources.weeklyPrices || 'N/A'} (週次)` )}
                    </p>
                </section>
                */}

                {/* --- 将来予測 & 関連情報 --- */}
                <section aria-labelledby="forecast-info-heading" className={cardBaseClass}>
                    <h2 id="forecast-info-heading" className={h2Class}> <Calendar className="h-5 w-5 mr-2" /> 将来予測 & 関連情報 </h2> {/* ★ Calendar アイコンを使用 */}
                    <div className="space-y-4">
                        {/* 1年後予測 */}
                        <div className="flex items-center space-x-2" title="パワーローモデルに基づく1年後の理論価格予測（中央値/下限値）">
                            <span className={`w-6 text-center ${textSecondaryClass}`}>🔮</span>
                            <span className={`${bodyClass} ${textSecondaryClass} min-w-[120px]`}>1年後予測(モデル):</span>
                            {prediction1y !== null ? (
                                <span className={`${smallClass} ${textPrimaryClass}`}>
                                    {formatCurrency(prediction1y.median.jpy, 'JPY')} <span className={`${smallClass} ${textMutedClass}`}>({formatCurrency(prediction1y.median.usd, 'USD')})</span> / {formatCurrency(prediction1y.support.jpy, 'JPY')} <span className={`${smallClass} ${textMutedClass}`}>({formatCurrency(prediction1y.support.usd, 'USD')})</span>
                                </span>
                            ) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            <Info className="h-4 w-4 text-gray-500 cursor-help ml-auto" /> {/* ★ Info アイコンを使用 */}
                        </div>
                        {/* 3年後予測 */}
                        <div className="flex items-center space-x-2" title="パワーローモデルに基づく3年後の理論価格予測（中央値/下限値）">
                            <span className={`w-6 text-center ${textSecondaryClass}`}>✨</span>
                            <span className={`${bodyClass} ${textSecondaryClass} min-w-[120px]`}>3年後予測(モデル):</span>
                            {prediction3y !== null ? (
                                <span className={`${smallClass} ${textPrimaryClass}`}>
                                    {formatCurrency(prediction3y.median.jpy, 'JPY')} <span className={`${smallClass} ${textMutedClass}`}>({formatCurrency(prediction3y.median.usd, 'USD')})</span> / {formatCurrency(prediction3y.support.jpy, 'JPY')} <span className={`${smallClass} ${textMutedClass}`}>({formatCurrency(prediction3y.support.usd, 'USD')})</span>
                                </span>
                            ) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            <Info className="h-4 w-4 text-gray-500 cursor-help ml-auto" /> {/* ★ Info アイコンを使用 */}
                        </div>
                        {/* 10年後予測 */}
                        <div className="flex items-center space-x-2" title="パワーローモデルに基づく10年後の理論価格予測（中央値/下限値）">
                            <span className={`w-6 text-center ${textSecondaryClass}`}>🚀</span>
                            <span className={`${bodyClass} ${textSecondaryClass} min-w-[120px]`}>10年後予測(モデル):</span>
                            {prediction10y !== null ? (
                                <span className={`${smallClass} ${textPrimaryClass}`}>
                                    {formatCurrency(prediction10y.median.jpy, 'JPY')} <span className={`${smallClass} ${textMutedClass}`}>({formatCurrency(prediction10y.median.usd, 'USD')})</span> / {formatCurrency(prediction10y.support.jpy, 'JPY')} <span className={`${smallClass} ${textMutedClass}`}>({formatCurrency(prediction10y.support.usd, 'USD')})</span>
                                </span>
                            ) : (<span className={`${smallClass} ${textMutedClass}`}>計算中...</span>)}
                            <Info className="h-4 w-4 text-gray-500 cursor-help ml-auto" /> {/* ★ Info アイコンを使用 */}
                        </div>
                        {/* 関連リンク */}
                        <div className="pt-4 border-t border-gray-700 flex flex-wrap gap-x-4 gap-y-2 justify-end">
                            <Link to="/power-law-explanation" className={`${linkClass} inline-flex items-center text-sm`}> <Info className="h-4 w-4 mr-1" /> パワーローモデルとは？ </Link> {/* ★ Info アイコンを使用 */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnalysisNews;