// src/pages/Home.tsx

import React, { useState, useMemo, useCallback } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChevronDown, ChevronUp, Settings, HelpCircle, ArrowRight, BookOpen, BrainCircuit, BarChart, TrendingUp, RotateCcw } from "lucide-react";
import { formatYen, formatBTC, formatPercentage } from '../utils/formatters';
import { DEFAULTS, CURRENT_YEAR, PriceModel, WithdrawalStrategy } from '../utils/constants';
import { useWithdrawalSimulation, WithdrawalInputs } from '../hooks/useWithdrawalSimulation';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { track } from '@vercel/analytics';

// スタイル定義
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

// localStorageに保存するデータの型
interface SavedInputs {
    initialBTC: string;
    startYear: string;
    priceModel: PriceModel;
    withdrawalType: WithdrawalStrategy;
    withdrawalAmount: string;
    withdrawalRate: string;
    startRate: string;
    endRate: string;
    reductionYears: string;
    showSecondPhase: boolean;
    secondPhaseYear: string;
    secondPhaseType: 'fixed' | 'percentage';
    secondPhaseAmount: string;
    secondPhaseRate: string;
    showAdvancedOptions: boolean;
    taxRate: string;
    exchangeRate: string;
    inflationRate: string;
}

// ツールチップアイコンコンポーネント
const TooltipIcon: React.FC<{ content: React.ReactNode }> = ({ content }) => (
    <div className="group relative inline-block ml-2">
        <HelpCircle
            className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help transition-colors duration-200"
            aria-label="ツールチップ"
        />
        <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 text-sm text-gray-300 bg-gray-800 rounded-lg shadow-lg -translate-x-1/2 left-1/2">
            {content}
        </div>
    </div>
);

// インプットフィールドコンポーネント
const InputField: React.FC<{
    label: string;
    tooltip?: React.ReactNode;
    error?: string;
    children: React.ReactNode;
}> = ({ label, tooltip, error, children }) => (
    <div className="mb-4">
        <div className="flex items-center mb-1">
            <label className={`${typography.body} ${colors.textSecondary}`}>{label}</label>
            {tooltip && <TooltipIcon content={tooltip} />}
        </div>
        {children}
        {error && <p className={`${colors.error} text-xs mt-1`}>{error}</p>}
    </div>
);

// ツールチップの内容
const TOOLTIPS = {
    initialBTC: "現在保有しているビットコインの量を入力してください。",
    withdrawalAmount: "FIRE後の毎月の生活費として必要な金額を入力してください。税引き後の手取り額として計算されます。",
    withdrawalRate: "資産からの年間取り崩し率を指定します。一般的なFIRE理論では4%が目安とされています。",
    activeFirePlan: "退職後の活動的な時期は多めに資産を取り崩し、徐々に率を下げていくことで、人生を楽しみつつ資産寿命を延ばす戦略です。",
    secondPhase: "特定の年から生活スタイルを変更する場合（例: 子どもの独立後など）のプランを設定できます。",
    taxRate: "利益に対する税率を設定します。デフォルトは確定申告を行った場合の税率です。",
    exchangeRate: "円ドルの為替レートを設定します。",
    inflationRate: "年間の物価上昇率を設定します。",
    priceModel: (
        <>
            <p>ビットコインの価格予測に使用するモデルです。どちらのモデルも「パワーロー」という統計法則に基づいています。</p>
            <p className="mt-2"><b>標準モデル：</b>ビットコインが世界的な基軸通貨になるシナリオ。</p>
            <p className="mt-1"><b>保守的モデル：</b>ビットコインが金（ゴールド）のような価値の保存手段になるシナリオ。</p>
            <Link to="/power-law" className="text-amber-400 hover:underline mt-3 block font-semibold">
                パワーローモデルについて詳しくはこちら »
            </Link>
        </>
    ),
};

// シミュレーション結果テーブルコンポーネント
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
                <table className="min-w-full border-collapse">
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
                    <tbody>
                        {results.map((result, index) => (
                            <tr
                                key={result.year}
                                className={`
                                    border-b border-gray-700/50
                                    ${index % 2 === 0 ? "bg-gray-800/50" : "bg-transparent"}
                                    ${index === firstWithdrawalIndex ? 'border-t-4 border-amber-500/80 bg-amber-900/10' : ''}
                                    hover:bg-gray-700/80 transition-colors duration-200
                                `}
                            >
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

// メインコンポーネント
const Home: React.FC = () => {
    // State declarations
    const [initialBTC, setInitialBTC] = useState<string>("");
    const [startYear, setStartYear] = useState<string>("2025");
    const [priceModel, setPriceModel] = useState<PriceModel>(PriceModel.STANDARD);
    const [withdrawalType, setWithdrawalType] = useState<WithdrawalStrategy>(WithdrawalStrategy.ACTIVE_FIRE);

    const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
    const [withdrawalRate, setWithdrawalRate] = useState<string>("4");

    const [startRate, setStartRate] = useState<string>("10");
    const [endRate, setEndRate] = useState<string>("3");
    const [reductionYears, setReductionYears] = useState<string>("20");

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

    const runSimulation = useCallback(() => {
        try {
            const inputsToSave: SavedInputs = {
                initialBTC, startYear, priceModel, withdrawalType, withdrawalAmount,
                withdrawalRate, startRate, endRate, reductionYears,
                showSecondPhase, secondPhaseYear, secondPhaseType,
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
            withdrawalRate, startRate, endRate, reductionYears,
            showSecondPhase, secondPhaseYear, secondPhaseType,
            secondPhaseAmount, secondPhaseRate, taxRate, exchangeRate, inflationRate,
        };
        setTimeout(() => {
            simulate(inputs);
            setIsCalculating(false);
        }, 500);
    }, [
        initialBTC, startYear, priceModel, withdrawalType, withdrawalAmount,
        withdrawalRate, startRate, endRate, reductionYears,
        showSecondPhase, secondPhaseYear, secondPhaseType,
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
                setWithdrawalType(parsedData.withdrawalType ?? WithdrawalStrategy.ACTIVE_FIRE);
                setWithdrawalAmount(parsedData.withdrawalAmount ?? "");
                setWithdrawalRate(parsedData.withdrawalRate ?? "4");
                setStartRate(parsedData.startRate ?? "10");
                setEndRate(parsedData.endRate ?? "3");
                setReductionYears(parsedData.reductionYears ?? "20");
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="保有BTC" tooltip={TOOLTIPS.initialBTC} error={errors.initialBTC}>
                            <input type="number" value={initialBTC} onChange={(e) => setInitialBTC(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md" step="0.00000001" placeholder="例: 0.1" />
                        </InputField>
                        <InputField label="FIRE開始年" error={errors.startYear}>
                            <select value={startYear} onChange={(e) => setStartYear(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md">
                                {Array.from({ length: 26 }, (_, i) => CURRENT_YEAR + i).map((year) => (
                                    <option key={year} value={year}>{year}年</option>
                                ))}
                            </select>
                        </InputField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="価格予測モデル" tooltip={TOOLTIPS.priceModel}>
                            <select value={priceModel} onChange={(e) => setPriceModel(e.target.value as PriceModel)} className="w-full bg-gray-700 p-2 rounded-md">
                                <option value={PriceModel.STANDARD}>標準モデル</option>
                                <option value={PriceModel.CONSERVATIVE}>保守的モデル</option>
                            </select>
                        </InputField>
                    </div>

                    <div>
                        <InputField label="取り崩し方法" tooltip={TOOLTIPS.activeFirePlan}>
                            <select
                                value={withdrawalType}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWithdrawalType(e.target.value as WithdrawalStrategy)}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            >
                                <option value={WithdrawalStrategy.ACTIVE_FIRE}>アクティブFIREプラン</option>
                                <option value={WithdrawalStrategy.PERCENTAGE}>定率プラン（年間X%）</option>
                                <option value={WithdrawalStrategy.FIXED}>定額プラン（毎月X円）</option>
                            </select>
                        </InputField>
                    </div>

                    {withdrawalType === WithdrawalStrategy.ACTIVE_FIRE && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                            <InputField label="開始時の率 (%)" error={errors.startRate}>
                                <input type="number" value={startRate} onChange={e => setStartRate(e.target.value)} className="w-full bg-gray-600 p-2 rounded-md" step="0.1" />
                            </InputField>
                            <InputField label="目標の率 (%)" error={errors.endRate}>
                                <input type="number" value={endRate} onChange={e => setEndRate(e.target.value)} className="w-full bg-gray-600 p-2 rounded-md" step="0.1" />
                            </InputField>
                            <InputField label="逓減年数 (年)" error={errors.reductionYears}>
                                <input type="number" value={reductionYears} onChange={e => setReductionYears(e.target.value)} className="w-full bg-gray-600 p-2 rounded-md" step="1" />
                            </InputField>
                        </div>
                    )}

                    {withdrawalType === WithdrawalStrategy.PERCENTAGE && (
                        <InputField label="年間取り崩し率 (%)" tooltip={TOOLTIPS.withdrawalRate} error={errors.withdrawalRate}>
                            <div className="relative">
                                <input type="number" value={withdrawalRate} onChange={e => setWithdrawalRate(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md pr-8" placeholder="例: 4" step="0.1" />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                            </div>
                        </InputField>
                    )}

                    {withdrawalType === WithdrawalStrategy.FIXED && (
                        <InputField label="毎月の生活費（手取り額）" tooltip={TOOLTIPS.withdrawalAmount} error={errors.withdrawalAmount}>
                            <div className="relative">
                                <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md pr-12" placeholder="例: 250000" step="1000" />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">円</span>
                            </div>
                        </InputField>
                    )}

                    <div className="mt-4">
                        <label className="flex items-center space-x-2 text-gray-300 mb-2">
                            <input type="checkbox" checked={showSecondPhase} onChange={(e) => setShowSecondPhase(e.target.checked)} className="rounded bg-gray-600" />
                            <span className={`${typography.body} ${colors.textSecondary}`}>プラン変更のセカンドフェーズを設定する</span>
                            <TooltipIcon content={TOOLTIPS.secondPhase} />
                        </label>
                        {showSecondPhase && (
                            <div className="pl-4 space-y-4 border-l-2 border-gray-700">
                                <InputField label="プラン変更の開始年" error={errors.secondPhaseYear}>
                                    <select value={secondPhaseYear} onChange={(e) => setSecondPhaseYear(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md">
                                        {Array.from({ length: 26 }, (_, i) => CURRENT_YEAR + i).map((year) => (
                                            <option key={year} value={year}>{year}年</option>
                                        ))}
                                    </select>
                                </InputField>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="変更後の取り崩し方法">
                                        <select value={secondPhaseType} onChange={(e) => setSecondPhaseType(e.target.value as 'fixed' | 'percentage')} className="w-full bg-gray-700 p-2 rounded-md">
                                            <option value="fixed">定額（毎月の生活費）</option>
                                            <option value="percentage">定率（年間資産のX%）</option>
                                        </select>
                                    </InputField>
                                    <InputField
                                        label={secondPhaseType === "fixed" ? "変更後の毎月の生活費" : "変更後の年間取り崩し率"}
                                        error={secondPhaseType === "fixed" ? errors.secondPhaseAmount : errors.secondPhaseRate}
                                    >
                                        <div className="relative">
                                            <input type="number" value={secondPhaseType === "fixed" ? secondPhaseAmount : secondPhaseRate} onChange={(e) => secondPhaseType === "fixed" ? setSecondPhaseAmount(e.target.value) : setSecondPhaseRate(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md pr-12" placeholder={secondPhaseType === "fixed" ? "例: 200000" : "例: 4"} step={secondPhaseType === "fixed" ? "1000" : "0.1"} />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                {secondPhaseType === "fixed" ? "円" : "%"}
                                            </span>
                                        </div>
                                    </InputField>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <button className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors w-full text-left ${showAdvancedOptions ? 'bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} aria-expanded={showAdvancedOptions} aria-controls="advanced-options">
                            <div className="flex items-center space-x-2">
                                <Settings size={18} className={colors.textSecondary} />
                                <span className={`${typography.body} ${colors.textSecondary}`}>詳細設定（税金など）</span>
                            </div>
                            {showAdvancedOptions ? <ChevronUp size={18} className={colors.textPrimary} /> : <ChevronDown size={18} className={colors.textSecondary} />}
                        </button>
                        {showAdvancedOptions && (
                            <div id="advanced-options" className="mt-4 space-y-4 p-4 bg-gray-700 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField label="税率 (%)" tooltip={TOOLTIPS.taxRate} error={errors.taxRate}>
                                        <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full bg-gray-600 p-2 rounded-md" step="0.1" placeholder="例: 20.315" />
                                    </InputField>
                                    <InputField label="為替レート (円/USD)" tooltip={TOOLTIPS.exchangeRate} error={errors.exchangeRate}>
                                        <input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} className="w-full bg-gray-600 p-2 rounded-md" step="0.1" placeholder="例: 150" />
                                    </InputField>
                                    <InputField label="インフレ率 (%)" tooltip={TOOLTIPS.inflationRate} error={errors.inflationRate}>
                                        <input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="w-full bg-gray-600 p-2 rounded-md" step="0.1" placeholder="例: 0" />
                                    </InputField>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        <button onClick={runSimulation} disabled={isCalculating} className={`${colors.accent} w-full p-3 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 shadow-md flex justify-center items-center ${isCalculating ? 'opacity-70 cursor-not-allowed' : ''}`} aria-label="シミュレーション実行">
                            {isCalculating ? (<><LoadingSpinner size="sm" className="mr-2" /> 計算中...</>) : ('あなたのFIREプランを計算する')}
                        </button>
                    </div>
                </div>

                {errors.simulation && (
                    <div className="mt-4 p-3 bg-red-900 text-gray-100 rounded-md">
                        {errors.simulation}
                    </div>
                )}
            </div>

            {results.length > 0 && (
                <div className="mt-8 space-y-8">
                    <div className={`${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder}`}>
                        <h2 className={`${typography.h2} ${colors.textPrimary} mb-2 text-center`}>FIREプラン 結果サマリー</h2>
                        <p className={`${typography.small} ${colors.textMuted} text-center mb-6 max-w-xl mx-auto`}>
                            この資産推移は、統計的価格予測モデル
                            <Link to="/power-law" className="text-amber-400 hover:underline font-semibold mx-1">「パワーローモデル」</Link>
                            に基づいて計算されています。
                        </p>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4A4A5A" />
                                <XAxis dataKey="year" stroke="#e2e8f0" tick={{ fontSize: 12, fill: '#e2e8f0' }} />
                                <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => formatBTC(value as number, 4)} tick={{ fill: '#e2e8f0' }} domain={['auto', 'auto']} label={{ value: 'BTC残高', angle: -90, position: 'insideLeft', style: { fill: '#34D399', fontSize: 12, fontWeight: 500 }, }} />
                                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => formatYen(value as number, 2)} tick={{ fill: '#e2e8f0' }} domain={['auto', 'auto']} label={{ value: '資産評価額', angle: 90, position: 'insideRight', style: { fill: '#60A5FA', fontSize: 12, fontWeight: 500 }, }} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(26, 32, 44, 0.95)', border: '1px solid rgba(82, 82, 91, 0.8)', borderRadius: '8px' }} labelStyle={{ color: '#e2e8f0' }} formatter={(value, name) => {
                                    if (typeof name === 'string') {
                                        if (name === 'btcHeld') return [formatBTC(value as number, 4), 'BTC残高'];
                                        if (name === 'totalValue') return [formatYen(value as number, 2), '資産評価額'];
                                    }
                                    return [value, name];
                                }} />
                                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                                <Line yAxisId="left" type="monotone" dataKey="btcHeld" stroke="#34D399" name="BTC残高" dot={false} />
                                <Line yAxisId="right" type="monotone" dataKey="totalValue" stroke="#60A5FA" name="資産評価額" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <SimulationResultsTable
                        results={results}
                        showSecondPhase={showSecondPhase}
                    />

                    <div className={`mt-8 ${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder} text-center`}>
                        <h2 className={`${typography.h2} ${colors.textPrimary} mb-4`}>次のステップへ</h2>
                        <p className={`${typography.body} ${colors.textMuted} mb-6 max-w-xl mx-auto`}>
                            FIRE計画を立てる前に、まずは資産を築くシミュレーションを試してみませんか？毎月の積み立てが将来どれほどの価値になるかを確認できます。
                        </p>
                        <Link to="/investment-simulator" className={`${colors.secondary} inline-block px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-md`}>
                            積み立てシミュレーターを試す
                        </Link>
                    </div>
                </div>
            )}

            <div className="text-center mt-12">
                <h2 className={`${typography.h2} ${colors.textPrimary} mb-4`}>
                    他のツールや学習コンテンツ
                </h2>
                <p className={`${typography.body} ${colors.textSecondary} max-w-3xl mx-auto mb-8`}>
                    ビットコインFIREに関する、積み立て計画や価格モデルの解説、基礎知識などもご覧いただけます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    <Link to="/investment-simulator" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center space-x-3 text-left shadow-md">
                        <BarChart className="h-8 w-8 text-green-400 flex-shrink-0" />
                        <div>
                            <p className={`${typography.h3} ${colors.textPrimary}`}>積み立て</p>
                            <p className={`${typography.small} ${colors.textMuted}`}>資産を築く計画</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                    </Link>
                    <Link to="/dashboard" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center space-x-3 text-left shadow-md">
                        <TrendingUp className="h-8 w-8 text-amber-400 flex-shrink-0" />
                        <div>
                            <p className={`${typography.h3} ${colors.textPrimary}`}>ダッシュボード</p>
                            <p className={`${typography.small} ${colors.textMuted}`}>現在の価格状況</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                    </Link>
                    <Link to="/power-law" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center space-x-3 text-left shadow-md">
                        <BrainCircuit className="h-8 w-8 text-blue-400 flex-shrink-0" />
                        <div>
                            <p className={`${typography.h3} ${colors.textPrimary}`}>パワーロー</p>
                            <p className={`${typography.small} ${colors.textMuted}`}>価格予測の根拠</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                    </Link>
                    <Link to="/basics" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center space-x-3 text-left shadow-md">
                        <BookOpen className="h-8 w-8 text-purple-400 flex-shrink-0" />
                        <div>
                            <p className={`${typography.h3} ${colors.textPrimary}`}>基礎知識</p>
                            <p className={`${typography.small} ${colors.textMuted}`}>ビットコインを学ぶ</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;