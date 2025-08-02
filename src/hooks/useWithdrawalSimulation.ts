// src/hooks/useWithdrawalSimulation.ts

import { useState, useCallback } from 'react';
import { getDaysSinceGenesis } from '../utils/dateUtils';
import { btcPriceMedian } from '../utils/models';
import { CURRENT_YEAR, TRANSITION_START_YEAR, TARGET_YEAR, PriceModel, WithdrawalStrategy } from '../utils/constants';

// 入力値の型定義
export interface WithdrawalInputs {
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
    taxRate: string;
    exchangeRate: string;
    inflationRate: string;
}

// 結果の型定義
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

// エラーの型定義
interface SimulationErrors {
    initialBTC?: string;
    startYear?: string;
    withdrawalAmount?: string;
    withdrawalRate?: string;
    startRate?: string;
    endRate?: string;
    reductionYears?: string;
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
    const [errors, setErrors] = useState<SimulationErrors>({});

    const validateInputs = (inputs: WithdrawalInputs): boolean => {
        const newErrors: SimulationErrors = {};

        if (!inputs.initialBTC || isNaN(parseFloat(inputs.initialBTC)) || parseFloat(inputs.initialBTC) < 0) {
            newErrors.initialBTC = '有効な値を入力してください';
        }

        switch (inputs.withdrawalType) {
            case WithdrawalStrategy.FIXED:
                if (!inputs.withdrawalAmount || isNaN(parseFloat(inputs.withdrawalAmount)) || parseFloat(inputs.withdrawalAmount) <= 0) {
                    newErrors.withdrawalAmount = '有効な値を入力してください';
                }
                break;
            case WithdrawalStrategy.PERCENTAGE:
                if (!inputs.withdrawalRate || isNaN(parseFloat(inputs.withdrawalRate)) || parseFloat(inputs.withdrawalRate) <= 0 || parseFloat(inputs.withdrawalRate) > 100) {
                    newErrors.withdrawalRate = '0～100%で入力してください';
                }
                break;
            case WithdrawalStrategy.ACTIVE_FIRE:
                if (!inputs.startRate || isNaN(parseFloat(inputs.startRate)) || parseFloat(inputs.startRate) <= 0 || parseFloat(inputs.startRate) > 100) {
                    newErrors.startRate = '0～100%で入力してください';
                }
                if (!inputs.endRate || isNaN(parseFloat(inputs.endRate)) || parseFloat(inputs.endRate) < 0 || parseFloat(inputs.endRate) > 100) {
                    newErrors.endRate = '0～100%で入力してください';
                }
                if (!inputs.reductionYears || isNaN(parseInt(inputs.reductionYears, 10)) || parseInt(inputs.reductionYears, 10) <= 0) {
                    newErrors.reductionYears = '1年以上で入力してください';
                }
                break;
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

    const simulate = useCallback((inputs: WithdrawalInputs): void => {
        if (!validateInputs(inputs)) return;

        try {
            let currentBTC = parseFloat(inputs.initialBTC);
            const simulationResults: WithdrawalSimulationResult[] = [];
            const exchangeRateNum = parseFloat(inputs.exchangeRate);
            const taxRateNum = parseFloat(inputs.taxRate) / 100;
            const inflationRateNum = parseFloat(inputs.inflationRate) / 100;
            const startYearNum = parseInt(inputs.startYear);

            const pStartRate = parseFloat(inputs.startRate) / 100;
            const pEndRate = parseFloat(inputs.endRate) / 100;
            const pReductionYears = parseInt(inputs.reductionYears, 10);

            let basePriceUSD = 0;
            let baseDays = 0;

            for (let year = CURRENT_YEAR; year <= TARGET_YEAR; year++) {
                if (currentBTC <= 0.00000001) {
                    currentBTC = 0;
                    simulationResults.push({
                        year,
                        btcPrice: simulationResults[simulationResults.length - 1]?.btcPrice || 0,
                        withdrawalRate: '-',
                        withdrawalAmount: '-',
                        withdrawalBTC: '-',
                        remainingBTC: 0,
                        totalValue: 0,
                        phase: '-',
                    });
                    continue;
                }

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
                let withdrawalBTC = 0;
                let withdrawalValue = 0;
                let effectiveWithdrawalRate: number | string = '-';

                if (year >= startYearNum) {
                    const totalValue = currentBTC * btcPriceJPY;

                    switch (inputs.withdrawalType) {
                        case WithdrawalStrategy.ACTIVE_FIRE: {
                            const yearsSinceStart = year - startYearNum;
                            let currentRate = pStartRate;
                            // 逓減期間中は線形補間で率を計算
                            if (yearsSinceStart < pReductionYears) {
                                // 逓減年数が1年の場合は即座に目標率になる
                                const progress = pReductionYears > 1 ? yearsSinceStart / (pReductionYears - 1) : 1;
                                currentRate = pStartRate - (pStartRate - pEndRate) * progress;
                            } else {
                                currentRate = pEndRate;
                            }
                            withdrawalBTC = currentBTC * currentRate;
                            break;
                        }
                        case WithdrawalStrategy.PERCENTAGE: {
                            const rate = parseFloat(inputs.withdrawalRate) / 100;
                            withdrawalBTC = currentBTC * rate;
                            break;
                        }
                        case WithdrawalStrategy.FIXED: {
                            const monthlyWithdrawal = parseFloat(inputs.withdrawalAmount);
                            const desiredAnnualWithdrawalJPY = monthlyWithdrawal * 12 * Math.pow(1 + inflationRateNum, year - startYearNum);
                            const totalWithdrawalAfterTax = desiredAnnualWithdrawalJPY;
                            const totalWithdrawalBeforeTax = totalWithdrawalAfterTax / (1 - taxRateNum);
                            withdrawalBTC = totalWithdrawalBeforeTax / btcPriceJPY;
                            break;
                        }
                    }

                    if (currentBTC < withdrawalBTC) {
                        withdrawalBTC = currentBTC;
                    }

                    const grossWithdrawalValue = withdrawalBTC * btcPriceJPY;
                    withdrawalValue = grossWithdrawalValue * (1 - taxRateNum);
                    effectiveWithdrawalRate = (withdrawalBTC / currentBTC) * 100;
                }

                currentBTC -= withdrawalBTC;
                const totalValueAfterWithdrawal = currentBTC * btcPriceJPY;

                simulationResults.push({
                    year,
                    btcPrice: btcPriceJPY,
                    withdrawalRate: year < startYearNum ? '-' : effectiveWithdrawalRate,
                    withdrawalAmount: year < startYearNum ? '-' : withdrawalValue,
                    withdrawalBTC: year < startYearNum ? '-' : withdrawalBTC,
                    remainingBTC: currentBTC,
                    totalValue: totalValueAfterWithdrawal,
                    phase: year < startYearNum ? '積立' : '取崩',
                });
            }

            setResults(simulationResults);
            setErrors({});
        } catch (err: any) {
            setErrors({ simulation: 'シミュレーション中にエラーが発生しました: ' + err.message });
        }
    }, []);

    return {
        results,
        errors,
        simulate,
    };
};