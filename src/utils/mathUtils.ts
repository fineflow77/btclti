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
 * 決定係数（R²）を計算（対数スケールを使用）
 * ビットコインの価格はパワーローに従うと仮定し、対数スケールで線形回帰を行い、R²を計算する。
 * 具体的には、x軸（日数）とy軸（価格）を対数変換し、その間の相関を測定する。
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
        const x = log10(Math.max(1, days)); // 対数スケールで日数を変換
        const y = log10(Math.max(0.0000001, price)); // 対数スケールで価格を変換

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