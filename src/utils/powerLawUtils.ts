// src/utils/powerLawUtils.ts
import { getDaysSinceGenesis } from './dateUtils';
import { btcPriceMedian, btcPriceSupport } from './models';

// --- 型定義 (必要であれば types.ts などからインポート) ---
interface PriceDataPoint {
    date: string; // YYYY-MM-DD
    price: number; // USD
}

interface PriceResponse {
    prices: { usd: number };
    timestamp?: string; // timestamp はここでは直接使わないが、型合わせのため optional で定義
}

export interface PowerLawDataPoint {
    date: number; // timestamp (ms)
    price: number | null; // 実価格 (USD)
    medianModel: number; // モデル中央値 (USD)
    supportModel: number; // モデル下限値 (USD)
    isFuture: boolean;
    daysSinceGenesis: number;
}
// --- 型定義ここまで ---

const MIN_DAYS_FOR_MODEL = 1; // モデル計算に必要な最低日数 (対数計算のため1以上)
const FUTURE_PREDICTION_END_YEAR = 2040; // 週次予測の終了年
const DAILY_PREDICTION_DAYS_AHEAD = 365; // 日次予測を何日先まで行うか

/**
 * 週次のパワーローデータを生成する
 * @param weeklyData - 週次価格履歴データ
 * @param currentPrice - 現在価格情報
 * @returns PowerLawDataPoint の配列
 */
export const generateWeeklyPowerLawData = (
    weeklyData: PriceDataPoint[],
    currentPrice: PriceResponse | null
): PowerLawDataPoint[] => {
    const results: PowerLawDataPoint[] = [];
    const now = new Date();
    const nowTimestamp = now.getTime();
    // データが存在する最も古い日付、またはデフォルト開始日
    const startDate = weeklyData.length > 0 ? new Date(weeklyData[0].date) : new Date('2010-07-18');
    const graphStartTimestamp = startDate.getTime();
    const endTimestamp = new Date(`${FUTURE_PREDICTION_END_YEAR}-12-31`).getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;

    // 過去の週次データ処理
    weeklyData.forEach(item => {
        try {
            const date = new Date(item.date);
            const timestamp = date.getTime();
            // 開始日以降で、価格が正のデータのみ処理
            if (timestamp >= graphStartTimestamp && item.price > 0) {
                const days = getDaysSinceGenesis(date);
                if (days >= MIN_DAYS_FOR_MODEL) {
                    results.push({
                        date: timestamp,
                        price: item.price,
                        medianModel: btcPriceMedian(days),
                        supportModel: btcPriceSupport(days),
                        isFuture: date > now, // 厳密には isFuture は後で更新する
                        daysSinceGenesis: days,
                    });
                } else {
                    // console.warn(`Skipping weekly data point with insufficient days: ${item.date}`);
                }
            }
        } catch (e) {
            console.error(`Error processing weekly data point: ${item.date}`, e);
        }
    });

    // 現在価格データの追加 (価格が正の場合)
    if (currentPrice?.prices.usd && currentPrice.prices.usd > 0) {
        try {
            const days = getDaysSinceGenesis(now);
            if (days >= MIN_DAYS_FOR_MODEL) {
                // 同じ日のデータがあれば上書き、なければ追加
                const existingIndex = results.findIndex(p =>
                    new Date(p.date).toDateString() === now.toDateString() && !p.isFuture
                );
                const currentPoint = {
                    date: nowTimestamp,
                    price: currentPrice.prices.usd,
                    medianModel: btcPriceMedian(days),
                    supportModel: btcPriceSupport(days),
                    isFuture: false,
                    daysSinceGenesis: days,
                };
                if (existingIndex !== -1) {
                    results[existingIndex] = currentPoint;
                } else {
                    results.push(currentPoint);
                }
            }
        } catch (e) {
            console.error(`Error processing current price data:`, e);
        }
    }

    // 未来予測データの追加
    const lastKnownDateTimestamp = results.length > 0
        ? Math.max(...results.map(d => d.date))
        : nowTimestamp; // 過去データがなければ現在時刻から開始

    for (let timestamp = lastKnownDateTimestamp + weekMs; timestamp <= endTimestamp; timestamp += weekMs) {
        try {
            const futureDate = new Date(timestamp);
            const days = getDaysSinceGenesis(futureDate);
            if (days >= MIN_DAYS_FOR_MODEL) {
                results.push({
                    date: timestamp,
                    price: null, // 未来の価格は不明
                    medianModel: btcPriceMedian(days),
                    supportModel: btcPriceSupport(days),
                    isFuture: true,
                    daysSinceGenesis: days,
                });
            }
        } catch (e) {
            console.error(`Error processing future weekly point for timestamp: ${timestamp}`, e);
        }
    }

    // 最終的に日付でソートし、isFutureフラグを確定させる
    results.sort((a, b) => a.date - b.date);
    results.forEach(point => {
        point.isFuture = point.date > nowTimestamp;
        // 現在のポイントより古いデータは isFuture=false になっているはずだが念のため
        if (point.date <= nowTimestamp && point.price === null) {
            point.isFuture = true; // 価格がない過去ポイントは未来扱い（予測線用）にする場合もあるが、基本はfalse
            //あるいはこのポイントを除外する処理を入れる
        }
    });


    // 重複日付の処理 (ソート後に行う)
    const uniqueResults: PowerLawDataPoint[] = [];
    const seenDates = new Set<number>();
    for (const point of results) {
        // 同じ日付のデータは最新（isFutureでないもの、または price があるもの）を優先するなどのロジックも可能
        // ここでは単純に最初に出てきたものを採用
        if (!seenDates.has(new Date(point.date).setHours(0, 0, 0, 0))) { // 日付単位で比較
            uniqueResults.push(point);
            seenDates.add(new Date(point.date).setHours(0, 0, 0, 0));
        } else {
            // 重複した場合の処理（例：最新価格で上書きなど）をここに入れることもできる
            // console.log("Duplicate date found, skipping:", new Date(point.date).toISOString());
        }
    }


    console.log(`Generated ${uniqueResults.length} weekly power law data points.`);
    return uniqueResults; // 重複を除去した結果を返す
};


/**
 * 日次のパワーローデータを生成する
 * @param dailyData - 日次価格履歴データ
 * @param currentPrice - 現在価格情報
 * @returns PowerLawDataPoint の配列
 */
export const generateDailyPowerLawData = (
    dailyData: PriceDataPoint[],
    currentPrice: PriceResponse | null
): PowerLawDataPoint[] => {
    const results: PowerLawDataPoint[] = [];
    const now = new Date();
    const nowTimestamp = now.getTime();
    // データが存在する最も古い日付、またはデフォルト開始日
    const startDate = dailyData.length > 0 ? new Date(dailyData[0].date) : new Date('2010-07-18');
    const graphStartTimestamp = startDate.getTime();
    // 日次予測は指定日数先まで
    const endTimestamp = nowTimestamp + DAILY_PREDICTION_DAYS_AHEAD * 24 * 60 * 60 * 1000;
    const dayMs = 24 * 60 * 60 * 1000;

    // 過去の日次データ処理
    dailyData.forEach(item => {
        try {
            const date = new Date(item.date);
            const timestamp = date.getTime();
            if (timestamp >= graphStartTimestamp && item.price > 0) {
                const days = getDaysSinceGenesis(date);
                if (days >= MIN_DAYS_FOR_MODEL) {
                    results.push({
                        date: timestamp,
                        price: item.price,
                        medianModel: btcPriceMedian(days),
                        supportModel: btcPriceSupport(days),
                        isFuture: date > now,
                        daysSinceGenesis: days,
                    });
                }
            }
        } catch (e) {
            console.error(`Error processing daily data point: ${item.date}`, e);
        }
    });

    // 現在価格データの追加 (価格が正の場合)
    if (currentPrice?.prices.usd && currentPrice.prices.usd > 0) {
        try {
            const days = getDaysSinceGenesis(now);
            if (days >= MIN_DAYS_FOR_MODEL) {
                const existingIndex = results.findIndex(p =>
                    new Date(p.date).toDateString() === now.toDateString() && !p.isFuture
                );
                const currentPoint = {
                    date: nowTimestamp,
                    price: currentPrice.prices.usd,
                    medianModel: btcPriceMedian(days),
                    supportModel: btcPriceSupport(days),
                    isFuture: false,
                    daysSinceGenesis: days,
                };
                if (existingIndex !== -1) {
                    results[existingIndex] = currentPoint;
                } else {
                    results.push(currentPoint);
                }
            }
        } catch (e) {
            console.error(`Error processing current price data (daily):`, e);
        }
    }

    // 未来予測データの追加 (日次)
    const lastKnownDateTimestamp = results.length > 0
        ? Math.max(...results.map(d => d.date))
        : nowTimestamp;

    for (let timestamp = lastKnownDateTimestamp + dayMs; timestamp <= endTimestamp; timestamp += dayMs) {
        try {
            const futureDate = new Date(timestamp);
            const days = getDaysSinceGenesis(futureDate);
            if (days >= MIN_DAYS_FOR_MODEL) {
                results.push({
                    date: timestamp,
                    price: null,
                    medianModel: btcPriceMedian(days),
                    supportModel: btcPriceSupport(days),
                    isFuture: true,
                    daysSinceGenesis: days,
                });
            }
        } catch (e) {
            console.error(`Error processing future daily point for timestamp: ${timestamp}`, e);
        }
    }

    // ソートと isFuture フラグの確定
    results.sort((a, b) => a.date - b.date);
    results.forEach(point => {
        point.isFuture = point.date > nowTimestamp;
    });

    // 重複日付の処理 (日次でも念のため)
    const uniqueResults: PowerLawDataPoint[] = [];
    const seenDates = new Set<number>();
    for (const point of results) {
        if (!seenDates.has(new Date(point.date).setHours(0, 0, 0, 0))) {
            uniqueResults.push(point);
            seenDates.add(new Date(point.date).setHours(0, 0, 0, 0));
        }
    }

    console.log(`Generated ${uniqueResults.length} daily power law data points.`);
    return uniqueResults;
};