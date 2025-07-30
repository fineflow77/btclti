import { useState } from "react";

interface SimResult {
    year: number;
    btcHeld: number;
    totalValueJPY: number;
    btcPrice: number;
    withdrawalRate?: number;
    withdrawalAmountJPY?: number;
    withdrawalBTC?: number;
}

interface SimParams {
    initialBTC: number;
    withdrawal: number; // 初期%（例: 0.10）
    withdrawalMode: "fixed" | "percentage" | "decay";
    decayRate?: number;
    minWithdrawalRate?: number;
    taxRate: number;
    exchangeRate: number;
    inflationRate: number;
}

export function useWithdrawalSimulation() {
    const [results, setResults] = useState<SimResult[]>([]);

    const simulate = ({
        initialBTC,
        withdrawal,
        withdrawalMode,
        decayRate = 0.05,
        minWithdrawalRate = 0.03,
        taxRate,
        exchangeRate,
        inflationRate,
    }: SimParams) => {
        const years = 30;
        let btc = initialBTC;
        const newResults: SimResult[] = [];
        const initialWithdrawalRate = withdrawalMode === "decay" ? withdrawal : null;

        for (let year = 1; year <= years; year++) {
            const priceMultiplier = Math.pow(10, year / 10); // パワーローモデル代替
            const btcPrice = exchangeRate * priceMultiplier;

            let withdrawalBTC = 0;
            let rate = 0;

            if (withdrawalMode === "fixed") {
                withdrawalBTC = withdrawal / btcPrice;
            } else if (withdrawalMode === "percentage") {
                rate = withdrawal;
                withdrawalBTC = btc * rate;
            } else if (withdrawalMode === "decay" && initialWithdrawalRate !== null) {
                if (year <= 20) {
                    rate = Math.max(
                        minWithdrawalRate,
                        initialWithdrawalRate * Math.pow(1 - decayRate, year - 1)
                    );
                } else {
                    rate = minWithdrawalRate;
                }
                withdrawalBTC = btc * rate;
            }

            const withdrawalAmountJPY = withdrawalBTC * btcPrice;
            btc = Math.max(0, btc - withdrawalBTC);

            newResults.push({
                year,
                btcHeld: btc,
                totalValueJPY: btc * btcPrice,
                btcPrice,
                withdrawalRate: rate,
                withdrawalAmountJPY,
                withdrawalBTC,
            });
        }

        setResults(newResults);
    };

    return { results, simulate };
}