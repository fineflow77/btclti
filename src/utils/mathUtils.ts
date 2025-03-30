// src/utils/mathUtils.ts
import { getDaysSinceGenesis } from './dateUtils'; // calculateRSquared で使用

/**
 * 10を底とする対数を計算（0以下の値も扱えるように微小値を追加）
 * @param value - 対数を計算する値
 * @returns 対数値（log10）
 */
export const log10 = (value: number): number => Math.log10(Math.max(1e-9, value)); // ゼロや負の値を避ける

/**
 * 10の冪乗を計算（log10の逆関数）
 * @param logValue - 対数値
 * @returns 10^logValue
 */
export const fromLog10 = (logValue: number): number => Math.pow(10, logValue);

/**
 * 決定係数（R²）を計算（対数-対数スケールでの線形相関）
 * ビットコイン価格データがパワーローモデルにどの程度適合するかを評価します。
 * 時間（日数）と価格の両方を対数変換し、その相関係数の2乗を計算します。
 * @param data - 価格データ配列 [[timestamp: number, price: number], ...]
 * @returns R²値（0〜1）、計算不可の場合はnull
 */
export const calculateRSquared = (data: [number, number][]): number | null => {
    if (!data || data.length < 2) return null; // 計算には最低2点必要

    const logData = data.map(([timestamp, price]) => {
        const days = getDaysSinceGenesis(new Date(timestamp));
        // 計算に有効なデータのみを対象とする（日数 > 0, 価格 > 0）
        if (days <= 0 || price <= 0) {
            return null;
        }
        return {
            logDays: log10(days),
            logPrice: log10(price),
        };
    }).filter(item => item !== null) as { logDays: number, logPrice: number }[]; // nullを除去し型アサーション

    if (logData.length < 2) return null; // 有効なデータが2点未満なら計算不可

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;
    const n = logData.length;

    for (const { logDays, logPrice } of logData) {
        sumX += logDays;
        sumY += logPrice;
        sumXY += logDays * logPrice;
        sumX2 += logDays * logDays;
        sumY2 += logPrice * logPrice;
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominatorX = n * sumX2 - sumX * sumX;
    const denominatorY = n * sumY2 - sumY * sumY;

    // 分母が0または非常に小さい場合は相関がない（または完全相関）と見なす
    if (denominatorX <= 1e-9 || denominatorY <= 1e-9) {
        // ほぼ完全相関か、データが一直線上にある場合など
        // より厳密には、どちらか一方が0に近い場合はR2=0とする方が安全かもしれない
        return (Math.abs(denominatorX) > 1e-9 && Math.abs(denominatorY) > 1e-9) ? 1.0 : 0.0;
    }

    const r = numerator / Math.sqrt(denominatorX * denominatorY);

    // r の値が -1 から 1 の範囲にあることを保証（浮動小数点誤差対策）
    const clampedR = Math.max(-1.0, Math.min(1.0, r));

    return clampedR * clampedR; // Rの2乗を返す
};


/**
 * 数値配列の平均値を計算
 * @param data - 数値の配列
 * @returns 平均値、配列が空の場合は0
 */
export const calculateMean = (data: number[]): number => {
    if (!data || data.length === 0) return 0;
    return data.reduce((sum, value) => sum + value, 0) / data.length;
};

/**
 * 数値配列の標準偏差を計算（母標準偏差: Nで割る）
 * @param data - 数値の配列
 * @param mean - 事前計算された平均値（オプション）
 * @returns 母標準偏差、配列が空の場合は0
 */
export const calculateStdDev = (data: number[], mean?: number): number => {
    if (!data || data.length === 0) return 0;
    const dataMean = mean === undefined ? calculateMean(data) : mean;
    const variance = data.reduce((sum, value) => sum + Math.pow(value - dataMean, 2), 0) / data.length;
    return Math.sqrt(variance);
};

/**
 * Zスコア（標準得点）を計算
 * ある値が平均から標準偏差いくつ分離れているかを示す
 * @param value - Zスコアを計算したい値
 * @param mean - データセットの平均値
 * @param stdDev - データセットの標準偏差
 * @returns Zスコア、標準偏差が0の場合はnull
 */
export const calculateZScore = (value: number, mean: number, stdDev: number): number | null => {
    if (stdDev === 0) return null; // 標準偏差が0の場合は計算不可
    return (value - mean) / stdDev;
};

/**
 * 日次価格データから指定期間の年率換算ボラティリティを計算（対数収益率を使用）
 * @param dailyPrices - 価格データの配列 [{ date: string, price: number }]
 * @param days - 計算に使用する期間（日数）
 * @returns 年率換算ボラティリティ（パーセント表示）、計算不可の場合はnull
 */
export const calculateVolatility = (dailyPrices: { date: string; price: number }[], days: number): number | null => {
    // 期間+1の日数が必要（リターン計算のため）
    if (!dailyPrices || dailyPrices.length < days + 1) return null;

    // 直近の(days+1)個の価格データを取得
    const recentPrices = dailyPrices.slice(-(days + 1)).map(p => p.price);
    const dailyLogReturns: number[] = [];

    for (let i = 1; i < recentPrices.length; i++) {
        // 価格が0または負でないこと、前の価格も0でないことを確認
        if (recentPrices[i] > 0 && recentPrices[i - 1] > 0) {
            const dailyReturn = Math.log(recentPrices[i] / recentPrices[i - 1]);
            dailyLogReturns.push(dailyReturn);
        } else {
            // 不正な価格データがある場合は計算を中断するか、無視するかを決定
            // ここでは計算を中断し、nullを返す
            console.warn(`Invalid price data found for volatility calculation near index ${dailyPrices.length - (days + 1) + i}`);
            return null;
        }
    }

    // 有効な日次リターンが計算できなかった場合
    if (dailyLogReturns.length === 0) return null;

    // 日次リターンの標準偏差を計算
    const stdDevDaily = calculateStdDev(dailyLogReturns);

    // 年率換算（取引日数ではなく暦日数365を使用）
    const annualizedVolatility = stdDevDaily * Math.sqrt(365);

    return annualizedVolatility * 100; // パーセント表示に変換
};

/**
 * 過去最高値からの下落率（ドローダウン）を計算
 * @param currentPrice - 現在価格
 * @param dailyPrices - 日次価格データの配列 [{ date: string, price: number }]
 * @returns ドローダウン（パーセント表示、通常は負数または0）、計算不可の場合はnull
 */
export const calculateDrawdown = (currentPrice: number | null, dailyPrices: { date: string; price: number }[]): number | null => {
    if (currentPrice === null || currentPrice < 0) return null; // 現在価格が不正
    if (!dailyPrices || dailyPrices.length === 0) return null; // 履歴データがない

    // 過去の価格データのみで最高値を探す
    const historicalPrices = dailyPrices.map(p => p.price).filter(p => p > 0); // 正の価格のみ対象
    if (historicalPrices.length === 0) {
        // 過去データがすべて不正なら、現在価格を最高値とする
        return 0; // 下落していない
    }

    const historicalHigh = Math.max(...historicalPrices);
    const allTimeHigh = Math.max(historicalHigh, currentPrice); // 現在価格も含めた最高値

    if (allTimeHigh <= 0) return null; // 最高値が不正な場合は計算不可

    return ((currentPrice - allTimeHigh) / allTimeHigh) * 100; // パーセント表示
};