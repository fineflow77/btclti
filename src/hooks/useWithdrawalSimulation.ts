// src/hooks/useWithdrawalSimulation.ts

import { useState } from 'react';
import { getDaysSinceGenesis } from '../utils/dateUtils';
import { btcPriceMedian } from '../utils/models';
import { CURRENT_YEAR, TRANSITION_START_YEAR, TARGET_YEAR, PriceModel } from '../utils/constants';

// ★★★ エラー修正: この型定義をexportする ★★★
export interface WithdrawalInputs {
    initialBTC: string;
    startYear: string;
    priceModel: PriceModel;
    withdrawalType: 'fixed' | 'percentage';
    withdrawalAmount: string;
    withdrawalRate: string;
    showSecondPhase: boolean;
    secondPhaseYear: string;
    secondPhaseType: 'fixed' | 'percentage';
    secondPhaseAmount: string;
    secondPhaseRate: string;
    taxRate: string;
    exchangeRate: string;
    inflationRate: string;
}

// ★★★ エラー修正: 結果の型定義を明確にする ★★★
export interface WithdrawalSimulationResult {
    year: number;
    btcPrice: number;
    withdrawalRate: number | string;
    withdrawalAmount: number | string;
    withdrawalBTC: number | string;
    remainingBTC: number;
    totalValue: number;
    phase: string;
}

interface SimulationErrors {
    initialBTC?: string;
    startYear?: string;
    withdrawalAmount?: string;
    withdrawalRate?: string;
    secondPhaseYear?: string;
    secondPhaseAmount?: string;
    secondPhaseRate?: string;
    taxRate?: string;
    exchangeRate?: string;
    inflationRate?: string;
    simulation?: string;
}

export const useWithdrawalSimulation = () => {
    const [results, setResults] = useState<WithdrawalSimulationResult[]>([]);
    // ★★★ エラー修正: errorsをstateで管理し、返すようにする ★★★
    const [errors, setErrors] = useState<SimulationErrors>({});

    const validateInputs = (inputs: WithdrawalInputs): boolean => {
        const newErrors: SimulationErrors = {};

        if (!inputs.initialBTC || isNaN(parseFloat(inputs.initialBTC)) || parseFloat(inputs.initialBTC) < 0) {
            newErrors.initialBTC = '有効な値を入力してください';
        }
        if (inputs.withdrawalType === 'fixed') {
            if (!inputs.withdrawalAmount || isNaN(parseFloat(inputs.withdrawalAmount)) || parseFloat(inputs.withdrawalAmount) <= 0) {
                newErrors.withdrawalAmount = '有効な値を入力してください';
            }
        } else {
            if (!inputs.withdrawalRate || isNaN(parseFloat(inputs.withdrawalRate)) || parseFloat(inputs.withdrawalRate) <= 0 || parseFloat(inputs.withdrawalRate) > 100) {
                newErrors.withdrawalRate = '0～100%で入力してください';
            }
        }
        if (inputs.showSecondPhase) {
            if (inputs.secondPhaseType === 'fixed' && (!inputs.secondPhaseAmount || isNaN(parseFloat(inputs.secondPhaseAmount)) || parseFloat(inputs.secondPhaseAmount) <= 0)) {
                newErrors.secondPhaseAmount = '有効な値を入力してください';
            }
            if (inputs.secondPhaseType === 'percentage' && (!inputs.secondPhaseRate || isNaN(parseFloat(inputs.secondPhaseRate)) || parseFloat(inputs.secondPhaseRate) <= 0 || parseFloat(inputs.secondPhaseRate) > 100)) {
                newErrors.secondPhaseRate = '0～100%で入力してください';
            }
            if (parseInt(inputs.secondPhaseYear) <= parseInt(inputs.startYear)) {
                newErrors.secondPhaseYear = '開始年より後にしてください';
            }
        }
        if (isNaN(parseFloat(inputs.taxRate)) || parseFloat(inputs.taxRate) < 0 || parseFloat(inputs.taxRate) > 100) {
            newErrors.taxRate = '0～100%で入力してください';
        }
        if (isNaN(parseFloat(inputs.exchangeRate)) || parseFloat(inputs.exchangeRate) <= 0) {
            newErrors.exchangeRate = '0より大きくしてください';
        }
        if (isNaN(parseFloat(inputs.inflationRate)) || parseFloat(inputs.inflationRate) < 0) {
            newErrors.inflationRate = '0%以上で入力してください';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const simulate = (inputs: WithdrawalInputs): void => {
        if (!validateInputs(inputs)) return;

        try {
            let currentBTC = parseFloat(inputs.initialBTC);
            const simulationResults: WithdrawalSimulationResult[] = [];
            const exchangeRateNum = parseFloat(inputs.exchangeRate);
            const taxRateNum = parseFloat(inputs.taxRate) / 100; // ★★★ エラー修正: taxRateを使用 ★★★
            const inflationRateNum = parseFloat(inputs.inflationRate) / 100; // ★★★ エラー修正: inflationRateを使用 ★★★
            const startYearNum = parseInt(inputs.startYear);
            let basePriceUSD = 0;
            let baseDays = 0;

            for (let year = CURRENT_YEAR; year <= TARGET_YEAR; year++) {
                if (currentBTC <= 0) {
                    const lastResult = simulationResults[simulationResults.length - 1];
                    if (lastResult) {
                        simulationResults.push({ ...lastResult, year, remainingBTC: 0, totalValue: 0 });
                    }
                    continue;
                }

                const isBeforeStart = year < startYearNum;
                const days = getDaysSinceGenesis(new Date(year, 0, 1));

                let btcPriceUSD = btcPriceMedian(days, inputs.priceModel) || 0;
                if (year >= TRANSITION_START_YEAR) {
                    if (basePriceUSD === 0) {
                        basePriceUSD = btcPriceMedian(getDaysSinceGenesis(new Date(TRANSITION_START_YEAR - 1, 0, 1)), inputs.priceModel) || 0;
                        baseDays = getDaysSinceGenesis(new Date(TRANSITION_START_YEAR - 1, 0, 1));
                    }
                    const decayRate = inputs.priceModel === PriceModel.STANDARD ? 0.2 : 0.25;
                    const targetScale = inputs.priceModel === PriceModel.STANDARD ? 0.41 : 0.5;
                    const scale = targetScale + (1.0 - targetScale) * Math.exp(-decayRate * (year - (TRANSITION_START_YEAR - 1)));
                    const medianPrice = btcPriceMedian(days, inputs.priceModel) || 0;
                    const baseMedianPrice = btcPriceMedian(baseDays, inputs.priceModel) || 1;
                    btcPriceUSD = basePriceUSD * Math.pow(medianPrice / baseMedianPrice, scale);
                }

                if (!btcPriceUSD || btcPriceUSD <= 0) {
                    throw new Error(`BTC価格の計算に失敗しました (年: ${year})`);
                }

                const btcPriceJPY = btcPriceUSD * exchangeRateNum;
                let desiredAnnualWithdrawalJPY = 0;

                if (!isBeforeStart) {
                    let currentWithdrawalType = inputs.withdrawalType;
                    let currentWithdrawalAmount = inputs.withdrawalAmount;

                    if (inputs.showSecondPhase && year >= parseInt(inputs.secondPhaseYear)) {
                        currentWithdrawalType = inputs.secondPhaseType;
                        currentWithdrawalAmount = inputs.secondPhaseAmount;
                    }
                    if (currentWithdrawalType === 'fixed') {
                        const monthlyWithdrawal = parseFloat(currentWithdrawalAmount);
                        desiredAnnualWithdrawalJPY = monthlyWithdrawal * 12 * Math.pow(1 + inflationRateNum, year - startYearNum);
                    }
                }

                let withdrawalBTC = 0;
                let withdrawalValue = 0;
                let effectiveWithdrawalRate: number | string = '-';

                if (!isBeforeStart) {
                    let currentWithdrawalType = inputs.withdrawalType;
                    let currentWithdrawalRate = inputs.withdrawalRate;
                    if (inputs.showSecondPhase && year >= parseInt(inputs.secondPhaseYear)) {
                        currentWithdrawalType = inputs.secondPhaseType;
                        currentWithdrawalRate = inputs.secondPhaseRate;
                    }
                    if (currentWithdrawalType === 'fixed') {
                        const totalWithdrawal = desiredAnnualWithdrawalJPY / (1 - taxRateNum);
                        withdrawalBTC = totalWithdrawal / btcPriceJPY;
                        withdrawalValue = desiredAnnualWithdrawalJPY;
                    } else {
                        const rate = parseFloat(currentWithdrawalRate) / 100;
                        withdrawalBTC = currentBTC * rate;
                        const grossWithdrawalValue = withdrawalBTC * btcPriceJPY;
                        withdrawalValue = grossWithdrawalValue * (1 - taxRateNum);
                    }

                    if (currentBTC < withdrawalBTC) {
                        withdrawalBTC = currentBTC;
                        const grossWithdrawalValue = withdrawalBTC * btcPriceJPY;
                        withdrawalValue = grossWithdrawalValue * (1 - taxRateNum);
                    }

                    effectiveWithdrawalRate = (withdrawalBTC / currentBTC) * 100;
                }

                const yearEndBTC = currentBTC - withdrawalBTC;
                const totalValue = yearEndBTC * btcPriceJPY;

                simulationResults.push({
                    year,
                    btcPrice: btcPriceJPY,
                    withdrawalRate: effectiveWithdrawalRate,
                    withdrawalAmount: isBeforeStart ? '-' : withdrawalValue,
                    withdrawalBTC: isBeforeStart ? '-' : withdrawalBTC,
                    remainingBTC: yearEndBTC,
                    totalValue: totalValue, // ★★★ エラー修正: totalValueプロパティを追加
                    phase: isBeforeStart ? '-' : (inputs.showSecondPhase && year >= parseInt(inputs.secondPhaseYear)) ? '2段階目' : (inputs.showSecondPhase ? '1段階目' : '-'),
                });

                currentBTC = yearEndBTC;
                if (currentBTC < 0.00000001) currentBTC = 0; // 非常に小さい値を0にする
            }

            setResults(simulationResults);
            setErrors({});
        } catch (err: any) {
            setErrors({ simulation: 'シミュレーション中にエラーが発生しました: ' + err.message });
        }
    };

    return {
        results,
        errors,
        simulate,
    };
};