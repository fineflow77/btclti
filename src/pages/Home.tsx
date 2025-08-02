// src/pages/Home.tsx

import React, { useState, useMemo, useCallback } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChevronDown, ChevronUp, Settings, HelpCircle, ArrowRight, BookOpen, BrainCircuit, BarChart, TrendingUp, RotateCcw } from "lucide-react";
import { formatYen, formatBTC, formatPercentage } from '../utils/formatters';
import { DEFAULTS, CURRENT_YEAR, PriceModel } from '../utils/constants';
import { useWithdrawalSimulation, WithdrawalInputs } from '../hooks/useWithdrawalSimulation';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { track } from '@vercel/analytics';

// === スタイル定義 (変更なし) ===
const typography = {
    h1: 'text-4xl sm:text-5xl font-extrabold tracking-tight',
    h2: 'text-xl sm:text-2xl font-semibold tracking-tight',
    h3: 'text-lg sm:text-xl font-medium',
    body: 'text-sm sm:text-base font-normal',
    small: 'text-xs sm:text-sm font-normal',
};
const colors = {
    primary: 'bg-green-500 hover:bg-green-600 text-white',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white',
    cardBg: 'bg-gray-800',
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    error: 'text-red-500',
    success: 'text-green-400',
};

// === 型定義、コンポーネント、定数 (変更なし) ===
interface SavedInputs { /* ... */ }
const TooltipIcon: React.FC<{ content: React.ReactNode }> = ({ content }) => { /* ... */ };
const InputField: React.FC<{ /* ... */ }> = ({ label, tooltip, error, children }) => { /* ... */ };
const TOOLTIPS = { /* ... */ };

// === [UI最終改善] シミュレーション結果テーブルコンポーネント ===
const SimulationResultsTable: React.FC<{
    results: any[];
    showSecondPhase: boolean;
}> = ({ results, showSecondPhase }) => {
    const firstWithdrawalIndex = results.findIndex(r => typeof r.withdrawalAmount === 'number' && r.withdrawalAmount > 0);

    return (
        <div className={`${colors.cardBg} p-4 sm:p-6 rounded-xl shadow-md ${colors.cardBorder}`}>
            <div className="flex justify-between items-center mb-4 px-2 sm:px-0">
                <h3 className={`${typography.h3} ${colors.textPrimary}`}>シミュレーション結果（年間推移）</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-900/70">
                        <tr>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">年</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">BTC価格</th>
                            {showSecondPhase && <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">段階</th>}
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">取り崩し率</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider bg-amber-900/20">年間生活費</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">売却BTC</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">BTC残高</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider bg-blue-900/20">資産評価額</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {results.map((result, index) => (
                            <tr
                                key={result.year}
                                className={`
                                    ${index === firstWithdrawalIndex ? 'bg-gray-700/50' : ''}
                                    hover:bg-gray-700 transition-colors duration-200
                                    relative
                                `}
                            >
                                {index === firstWithdrawalIndex && (
                                    <td colSpan={showSecondPhase ? 8 : 7} className="p-0 -mb-px">
                                        <div className="w-full border-t-2 border-amber-500 opacity-70"></div>
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                                            FIRE 開始
                                        </div>
                                    </td>
                                )}
                                <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-white">{result.year}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-400">{formatYen(result.btcPrice, 2)}</td>
                                {showSecondPhase && <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-400">{result.phase}</td>}
                                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-400">
                                    {typeof result.withdrawalRate === 'number' ? formatPercentage(result.withdrawalRate, { decimals: 2 }) : result.withdrawalRate}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm font-semibold text-amber-300 bg-amber-900/20">
                                    {typeof result.withdrawalAmount === 'number' ? formatYen(result.withdrawalAmount, 2) : result.withdrawalAmount}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-400">
                                    {typeof result.withdrawalBTC === 'number' ? formatBTC(result.withdrawalBTC, 4) : result.withdrawalBTC}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm font-semibold text-green-400">
                                    {formatBTC(result.remainingBTC, 4)}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm font-semibold text-blue-300 bg-blue-900/20">
                                    {formatYen(result.totalValue, 2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center md:hidden">◀︎ テーブルは横にスクロールできます ▶︎</p>
        </div>
    );
};


// === メインコンポーネント (ロジックは変更なし、結果表示部分を簡素化) ===
const Home: React.FC = () => {
    // State declarations (変更なし)
    const [initialBTC, setInitialBTC] = useState<string>("");
    const [startYear, setStartYear] = useState<string>("2025");
    const [priceModel, setPriceModel] = useState<PriceModel>(PriceModel.STANDARD);
    const [withdrawalType, setWithdrawalType] = useState<'fixed' | 'percentage'>("fixed");
    const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
    const [withdrawalRate, setWithdrawalRate] = useState<string>("4");
    const [showSecondPhase, setShowSecondPhase] = useState<boolean>(false);
    const [secondPhaseYear, setSecondPhaseYear] = useState<string>("2030");
    const [secondPhaseType, setSecondPhaseType] = useState<'fixed' | 'percentage'>("fixed");
    const [secondPhaseAmount, setSecondPhaseAmount] = useState<string>("");
    const [secondPhaseRate, setSecondPhaseRate] = useState<string>("4");
    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
    const [taxRate, setTaxRate] = useState<string>(DEFAULTS.TAX_RATE.toString());
    const [exchangeRate, setExchangeRate] = useState<string>(DEFAULTS.EXCHANGE_RATE.toString());
    const [inflationRate, setInflationRate] = useState<string>(DEFAULTS.INFLATION_RATE.toString());
    const [isCalculating, setIsCalculating] = useState<boolean>(false);

    const { results, errors, simulate } = useWithdrawalSimulation();

    // 関数 (runSimulation, restoreLastInputs, chartData) (変更なし)
    const runSimulation = useCallback(() => { /* ... */ }, [/* ... */]);
    const restoreLastInputs = useCallback(() => { /* ... */ }, []);
    const chartData = useMemo(() => { /* ... */ }, [results]);

    // ... (関数の中身は長いので省略、前回のコードから変更ありません)
    const runSimulation = useCallback(() => {
        try {
            const inputsToSave: SavedInputs = {
                initialBTC, startYear, priceModel, withdrawalType, withdrawalAmount,
                withdrawalRate, showSecondPhase, secondPhaseYear, secondPhaseType,
                secondPhaseAmount, secondPhaseRate, showAdvancedOptions, taxRate,
                exchangeRate, inflationRate,
            };
            localStorage.setItem('btcSimulatorInputs', JSON.stringify(inputsToSave));
        } catch (error) {
            console.error("Failed to save inputs to localStorage:", error);
        }
        track('Run Simulation', {
            priceModel: priceModel,
            withdrawalType: withdrawalType,
            startYear: startYear,
        });
        setIsCalculating(true);
        const inputs: WithdrawalInputs = {
            initialBTC, startYear, priceModel, withdrawalType, withdrawalAmount,
            withdrawalRate, showSecondPhase, secondPhaseYear, secondPhaseType,
            secondPhaseAmount, secondPhaseRate, taxRate, exchangeRate, inflationRate,
        };
        setTimeout(() => {
            simulate(inputs);
            setIsCalculating(false);
        }, 500);
    }, [
        initialBTC, startYear, priceModel, withdrawalType, withdrawalAmount,
        withdrawalRate, showSecondPhase, secondPhaseYear, secondPhaseType,
        secondPhaseAmount, secondPhaseRate, showAdvancedOptions, taxRate,
        exchangeRate, inflationRate, simulate
    ]);

    const restoreLastInputs = useCallback(() => {
        try {
            const savedData = localStorage.getItem('btcSimulatorInputs');
            if (savedData) {
                const parsedData: SavedInputs = JSON.parse(savedData);
                if (typeof parsedData !== 'object' || parsedData === null) return;
                setInitialBTC(parsedData.initialBTC ?? "");
                setStartYear(parsedData.startYear ?? "2025");
                setPriceModel(parsedData.priceModel ?? PriceModel.STANDARD);
                setWithdrawalType(parsedData.withdrawalType ?? "fixed");
                setWithdrawalAmount(parsedData.withdrawalAmount ?? "");
                setWithdrawalRate(parsedData.withdrawalRate ?? "4");
                setShowSecondPhase(parsedData.showSecondPhase ?? false);
                setSecondPhaseYear(parsedData.secondPhaseYear ?? "2030");
                setSecondPhaseType(parsedData.secondPhaseType ?? "fixed");
                setSecondPhaseAmount(parsedData.secondPhaseAmount ?? "");
                setSecondPhaseRate(parsedData.secondPhaseRate ?? "4");
                setShowAdvancedOptions(parsedData.showAdvancedOptions ?? false);
                setTaxRate(parsedData.taxRate ?? DEFAULTS.TAX_RATE.toString());
                setExchangeRate(parsedData.exchangeRate ?? DEFAULTS.EXCHANGE_RATE.toString());
                setInflationRate(parsedData.inflationRate ?? DEFAULTS.INFLATION_RATE.toString());
            }
        } catch (error) {
            console.error("Failed to restore inputs from localStorage:", error);
        }
    }, []);

    const chartData = useMemo(() => {
        if (results.length > 0) {
            return results.map(result => ({
                year: result.year,
                btcHeld: result.remainingBTC,
                totalValue: result.totalValue,
            }));
        }
        return [];
    }, [results]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 text-gray-100 space-y-8">
            {/* ... ヒーローセクションと入力フォーム (変更なし) ... */}
            <div className="text-center py-12 sm:py-16">
                <h1 className={`${typography.h1} bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent`}>
                    ビットコイン FIREシミュレーター
                </h1>
                <p className={`${typography.h3} text-gray-300 max-w-3xl mx-auto mt-4`}>
                    あなたのビットコイン資産で、いつ経済的自由を達成できるか。リアルな未来を予測し、具体的なFIREプランを描き出しましょう。
                </p>
            </div>

            <div id="simulator" className={`${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`${typography.h2} ${colors.textPrimary}`}>
                        FIREプランニング
                    </h2>
                    <button
                        onClick={restoreLastInputs}
                        className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500"
                        title="前回入力した値を復元します"
                    >
                        <RotateCcw size={14} className="mr-1.5" />
                        前回の値を復元
                    </button>
                </div>

                <div className="space-y-6">
                    {/* ... (入力フォームのJSXは長いので省略、変更なし) ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="保有BTC" tooltip={TOOLTIPS.initialBTC} error={errors.initialBTC}>
                            <input
                                type="number"
                                value={initialBTC}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInitialBTC(e.target.value)}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                step="0.00000001"
                                placeholder="例: 0.1"
                                aria-label="保有BTC"
                            />
                        </InputField>
                        <InputField label="FIRE開始年" error={errors.startYear}>
                            <select
                                value={startYear}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStartYear(e.target.value)}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                aria-label="FIRE開始年"
                            >
                                {Array.from({ length: 26 }, (_, i) => CURRENT_YEAR + i).map((year) => (
                                    <option key={year} value={year}>{year}年</option>
                                ))}
                            </select>
                        </InputField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="価格予測モデル" tooltip={TOOLTIPS.priceModel}>
                            <select
                                value={priceModel}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriceModel(e.target.value as PriceModel)}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                aria-label="価格予測モデル"
                            >
                                <option value={PriceModel.STANDARD}>標準モデル</option>
                                <option value={PriceModel.CONSERVATIVE}>保守的モデル</option>
                            </select>
                        </InputField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="取り崩し方法">
                            <select
                                value={withdrawalType}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWithdrawalType(e.target.value as 'fixed' | 'percentage')}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                aria-label="取り崩し方法"
                            >
                                <option value="fixed">定額（毎月の生活費）</option>
                                <option value="percentage">定率（年間資産のX%）</option>
                            </select>
                        </InputField>
                        <InputField
                            label={withdrawalType === "fixed" ? "毎月の生活費（手取り額）" : "年間取り崩し率"}
                            tooltip={withdrawalType === "fixed" ? TOOLTIPS.withdrawalAmount : TOOLTIPS.withdrawalRate}
                            error={withdrawalType === "fixed" ? errors.withdrawalAmount : errors.withdrawalRate}
                        >
                            <div className="relative">
                                <input
                                    type="number"
                                    value={withdrawalType === "fixed" ? withdrawalAmount : withdrawalRate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => withdrawalType === "fixed" ? setWithdrawalAmount(e.target.value) : setWithdrawalRate(e.target.value)}
                                    className="w-full bg-gray-700 p-2 rounded-md text-gray-100 pr-12 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                    placeholder={withdrawalType === "fixed" ? "例: 200000" : "例: 4"}
                                    step={withdrawalType === "fixed" ? "1000" : "0.1"}
                                    aria-label={withdrawalType === "fixed" ? "毎月の生活費" : "年間取り崩し率"}
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    {withdrawalType === "fixed" ? "円" : "%"}
                                </span>
                            </div>
                        </InputField>
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center space-x-2 text-gray-300 mb-2">
                            <input
                                type="checkbox"
                                checked={showSecondPhase}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowSecondPhase(e.target.checked)}
                                className="rounded bg-gray-600 focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                                aria-label="プラン変更のセカンドフェーズを設定する"
                            />
                            <span className={`${typography.body} ${colors.textSecondary}`}>プラン変更のセカンドフェーズを設定する</span>
                            <TooltipIcon content={TOOLTIPS.secondPhase} />
                        </label>
                        {showSecondPhase && (
                            <div className="pl-4 space-y-4 border-l-2 border-gray-700">
                                {/* ... (セカンドフェーズのJSXは長いので省略、変更なし) ... */}
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <button
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors w-full text-left ${showAdvancedOptions ? 'bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                            aria-expanded={showAdvancedOptions}
                            aria-controls="advanced-options"
                        >
                            <div className="flex items-center space-x-2">
                                <Settings size={18} className={colors.textSecondary} />
                                <span className={`${typography.body} ${colors.textSecondary}`}>詳細設定（税金など）</span>
                            </div>
                            {showAdvancedOptions ? <ChevronUp size={18} className={colors.textPrimary} /> : <ChevronDown size={18} className={colors.textSecondary} />}
                        </button>
                        {showAdvancedOptions && (
                            <div id="advanced-options" className="mt-4 space-y-4 p-4 bg-gray-700 rounded-md">
                                {/* ... (詳細設定のJSXは長いので省略、変更なし) ... */}
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={runSimulation}
                            disabled={isCalculating}
                            className={`${colors.accent} w-full p-3 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 shadow-md flex justify-center items-center ${isCalculating ? 'opacity-70 cursor-not-allowed' : ''}`}
                            aria-label="シミュレーション実行"
                        >
                            {isCalculating ? (
                                <><LoadingSpinner size="sm" className="mr-2" /> 計算中...</>
                            ) : (
                                'あなたのFIREプランを計算する'
                            )}
                        </button>
                    </div>
                </div>

                {errors.simulation && (
                    <div className="mt-4 p-3 bg-red-900 text-gray-100 rounded-md">
                        {errors.simulation}
                    </div>
                )}
            </div>

            {/* === [変更] 結果表示エリアを簡素化 === */}
            {results.length > 0 && (
                <div className="mt-8 space-y-8">
                    {/* グラフ */}
                    <div className={`${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder}`}>
                        <h2 className={`${typography.h2} ${colors.textPrimary} mb-2 text-center`}>FIREプラン 結果サマリー</h2>
                        <p className={`${typography.small} ${colors.textMuted} text-center mb-6 max-w-xl mx-auto`}>
                            この資産推移は、統計的価格予測モデル
                            <Link to="/power-law" className="text-amber-400 hover:underline font-semibold mx-1">「パワーローモデル」</Link>
                            に基づいて計算されています。
                        </p>
                        <ResponsiveContainer width="100%" height={400}>
                            {/* ... (LineChartのJSXは長いので省略、変更なし) ... */}
                        </ResponsiveContainer>
                    </div>

                    {/* テーブル (常に表示) */}
                    <SimulationResultsTable
                        results={results}
                        showSecondPhase={showSecondPhase}
                    />

                    {/* 次のステップ */}
                    <div className={`mt-8 ${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder} text-center`}>
                        {/* ... (次のステップのJSXは変更なし) ... */}
                    </div>
                </div>
            )}

            {/* ... フッター手前のリンク集 (変更なし) ... */}
        </div>
    );
};

export default Home;