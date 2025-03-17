// src/utils/mathUtils.ts
import { getDaysSinceGenesis } from './dateUtils';

/**
 * 10を底とする対数を計算（0以下の値も扱える）
 * @param value - 対数を計算する値
 * @returns 対数値（log10）
 */
export const log10 = (value: number): number => Math.log10(Math.max(0.0000001, value));

/**
 * 10の冪乗を計算（fromLog10(log10(x)) = x）
 * @param logValue - 対数値
 * @returns 10^logValue
 */
export const fromLog10 = (logValue: number): number => Math.pow(10, logValue);

/**
 * 決定係数（R²）を計算
 * @param data - 価格データ配列 [[timestamp: number, price: number], ...]
 * @returns R²値（0〜1）、データがない場合はnull
 */
export const calculateRSquared = (data: [number, number][]): number | null => {
    if (!data || data.length === 0) return null;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;
    const n = data.length;

    for (const [timestamp, price] of data) {
        const days = getDaysSinceGenesis(new Date(timestamp));
        const x = log10(Math.max(1, days));
        const y = log10(Math.max(0.0000001, price));

        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
        sumY2 += y * y;
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    return denominator === 0 ? 0 : Math.pow(numerator / denominator, 2);
};

/**
 * パーセント形式でフォーマット
 * @param value - フォーマットする値
 * @param decimals - 小数点以下の桁数（デフォルト: 1）
 * @returns フォーマットされた文字列（例: "+12.3%"）
 */
export const formatPercentage = (value: number | null, decimals: number = 1): string => {
    if (value === null || isNaN(value)) return '-';
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};