// src/hooks/useBitcoinData.tsx
import { useState, useEffect, useCallback } from 'react';
import { calculateRSquared } from '../utils/mathUtils';
import { getDaysSinceGenesis } from '../utils/dateUtils';
import { ENV, CACHE_EXPIRY } from '../utils/constants';

// 型定義
interface PriceResponse {
    prices: { usd: number; jpy: number };
    timestamp: string;
    source?: string;
}

interface PriceDataPoint {
    date: string;
    price: number;
}

interface PowerLawDataPoint {
    date: number;
    price: number | null;
    medianModel: number;
    supportModel: number;
    isFuture: boolean;
    daysSinceGenesis: number;
}

interface BitcoinData {
    loading: boolean;
    error: Error | null;
    currentPrice: PriceResponse | null;
    dailyPrices: PriceDataPoint[];
    weeklyPrices: PriceDataPoint[];
    powerLawData: PowerLawDataPoint[];
    dailyPowerLawData: PowerLawDataPoint[];
    exchangeRate: number;
    rSquared: number | null;
    dataSources: { currentPrice?: string; dailyPrices?: string; weeklyPrices?: string };
    news: Array<{ title: string; description: string; url: string; publishedAt: string; source: { name: string } }>;
}

// キャッシュ用の型
interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

// キャッシュストレージ
const cache: { [key: string]: CacheEntry<any> } = {};

// キャッシュからデータを取得
const getCachedData = <T>(key: string, expiry: number): T | null => {
    const entry = cache[key];
    if (entry && Date.now() - entry.timestamp < expiry) {
        return entry.data;
    }
    return null;
};

// キャッシュにデータを保存
const setCachedData = <T>(key: string, data: T): void => {
    cache[key] = { data, timestamp: Date.now() };
};

// ダミーデータ
const DUMMY_CURRENT_PRICE: PriceResponse = {
    prices: { usd: 60000, jpy: 9000000 },
    timestamp: new Date().toISOString(),
    source: 'dummy',
};

const DUMMY_DAILY_PRICES: PriceDataPoint[] = [
    { date: '2024-01-01', price: 50000 },
    { date: '2024-02-01', price: 52000 },
    { date: '2024-03-01', price: 55000 },
];

const DUMMY_WEEKLY_PRICES: PriceDataPoint[] = [
    { date: '2021-01-01', price: 30000 },
    { date: '2022-01-01', price: 40000 },
    { date: '2023-01-01', price: 35000 },
    { date: '2024-01-01', price: 50000 },
];

const DUMMY_NEWS: Array<{ title: string; description: string; url: string; publishedAt: string; source: { name: string } }> = [
    {
        title: 'ビットコインが過去最高値を更新',
        description: 'ビットコインが過去最高値を更新しました。',
        url: 'https://example.com/bitcoin-record-high',
        publishedAt: new Date().toISOString(),
        source: { name: 'Dummy News' },
    },
];

// ユーティリティ関数
const btcPriceMedian = (days: number): number => {
    const medianModelLog = -17.01593313 + 5.84509376 * Math.log10(days);
    return Math.pow(10, medianModelLog);
};

const btcPriceSupport = (days: number): number => {
    const supportModelLog = -17.668 + 5.926 * Math.log10(days);
    return Math.pow(10, supportModelLog);
};

// APIフェッチ関数
const fetchBinanceCurrentPrice = async (): Promise<PriceResponse> => {
    const cacheKey = 'binance_current_price';
    const cached = getCachedData<PriceResponse>(cacheKey, CACHE_EXPIRY.PRICE);
    if (cached) return cached;

    try {
        const [usdcResponse, jpyResponse] = await Promise.all([
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCJPY'),
        ]);
        if (!usdcResponse.ok) throw new Error(`Binance USDT HTTP error! status: ${usdcResponse.status}`);
        if (!jpyResponse.ok) throw new Error(`Binance JPY HTTP error! status: ${jpyResponse.status}`);
        const usdcData = await usdcResponse.json();
        const jpyData = await jpyResponse.json();
        const usdPrice = parseFloat(usdcData.price);
        const jpyPrice = parseFloat(jpyData.price);
        const result = {
            prices: { usd: usdPrice, jpy: jpyPrice },
            timestamp: new Date().toISOString(),
            source: 'binance',
        };
        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('Binance Current Price Fetch Error:', error);
        throw error;
    }
};

const fetchBinanceDailyPrices = async (): Promise<PriceDataPoint[]> => {
    const cacheKey = 'binance_daily_prices';
    const cached = getCachedData<PriceDataPoint[]>(cacheKey, CACHE_EXPIRY.DAILY);
    if (cached) return cached;

    try {
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=365');
        if (!response.ok) throw new Error(`Binance HTTP error! status: ${response.status}`);
        const data = await response.json();
        const result = data.map(([timestamp, open]: [number, string]) => ({
            date: new Date(timestamp).toISOString().split('T')[0],
            price: parseFloat(open),
        }));
        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('Binance Daily Prices Fetch Error:', error);
        throw error;
    }
};

const fetchCoinGeckoCurrentPrice = async (): Promise<PriceResponse> => {
    const cacheKey = 'coingecko_current_price';
    const cached = getCachedData<PriceResponse>(cacheKey, CACHE_EXPIRY.PRICE);
    if (cached) return cached;

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,jpy');
        if (!response.ok) throw new Error(`CoinGecko HTTP error! status: ${response.status}`);
        const data = await response.json();
        const result = {
            prices: { usd: data.bitcoin.usd, jpy: data.bitcoin.jpy },
            timestamp: new Date().toISOString(),
            source: 'coingecko',
        };
        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('CoinGecko Current Price Fetch Error:', error);
        throw error;
    }
};

const fetchCoinGeckoDailyPrices = async (): Promise<PriceDataPoint[]> => {
    const cacheKey = 'coingecko_daily_prices';
    const cached = getCachedData<PriceDataPoint[]>(cacheKey, CACHE_EXPIRY.DAILY);
    if (cached) return cached;

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily');
        if (!response.ok) throw new Error(`CoinGecko HTTP error! status: ${response.status}`);
        const data = await response.json();
        const result = data.prices.map(([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toISOString().split('T')[0],
            price,
        }));
        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('CoinGecko Daily Prices Fetch Error:', error);
        throw error;
    }
};

const fetchWeeklyJson = async (): Promise<PriceDataPoint[]> => {
    const cacheKey = 'weekly_json';
    const cached = getCachedData<PriceDataPoint[]>(cacheKey, CACHE_EXPIRY.DAILY);
    if (cached) return cached;

    try {
        const response = await fetch('/weekly.json');
        if (!response.ok) throw new Error(`Weekly JSON HTTP error! status: ${response.status}`);
        const weeklyData = await response.json();
        const result = [...weeklyData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        console.log('Fetched weekly.json:', result);
        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('Weekly JSON Fetch Error:', error);
        return DUMMY_WEEKLY_PRICES;
    }
};

const fetchNews = async (): Promise<Array<{ title: string; description: string; url: string; publishedAt: string; source: { name: string } }>> => {
    const cacheKey = 'news';
    const cached = getCachedData<Array<{ title: string; description: string; url: string; publishedAt: string; source: { name: string } }>>(cacheKey, CACHE_EXPIRY.DAILY);
    if (cached) return cached;

    try {
        const apiKey = ENV.NEWSAPI_KEY;
        if (!apiKey) throw new Error('NewsAPI key is not set in environment variables.');
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=bitcoin&language=en&sortBy=publishedAt&apiKey=${apiKey}`
        );
        if (!response.ok) throw new Error(`NewsAPI HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.status !== 'ok') throw new Error('NewsAPI response status is not ok.');
        const result = data.articles.slice(0, 5);
        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('NewsAPI Fetch Error:', error);
        return DUMMY_NEWS;
    }
};

const convertDailyToWeekly = (dailyData: PriceDataPoint[]): PriceDataPoint[] => {
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const startTimestamp = new Date('2009-07-18').getTime();
    const endTimestamp = new Date().getTime();
    const weeklyData: PriceDataPoint[] = [];

    for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += weekMs) {
        const weekStart = new Date(timestamp);
        const weekEnd = new Date(timestamp + weekMs);
        const weekPrices = dailyData.filter(d => {
            const dTimestamp = new Date(d.date).getTime();
            return dTimestamp >= weekStart.getTime() && dTimestamp < weekEnd.getTime();
        });

        if (weekPrices.length > 0) {
            const avgPrice = weekPrices.reduce((sum, d) => sum + d.price, 0) / weekPrices.length;
            weeklyData.push({
                date: weekStart.toISOString().split('T')[0],
                price: avgPrice,
            });
        }
    }

    return weeklyData;
};

// Fixed: Generate power law data with correct formatting
const generateWeeklyPowerLawData = (
    weeklyData: PriceDataPoint[],
    currentPrice: PriceResponse | null
): PowerLawDataPoint[] => {
    const now = new Date();
    const nowTimestamp = now.getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const graphStartTimestamp = new Date('2009-07-18').getTime();
    const endTimestamp = new Date('2040-12-31').getTime();
    const powerLawData: PowerLawDataPoint[] = [];

    // Process historical weekly data
    weeklyData.forEach(item => {
        const date = new Date(item.date);
        const timestamp = date.getTime();
        if (timestamp >= graphStartTimestamp) {
            const days = getDaysSinceGenesis(date);
            powerLawData.push({
                date: timestamp,
                price: item.price,
                medianModel: btcPriceMedian(days),
                supportModel: btcPriceSupport(days),
                isFuture: date > now,
                daysSinceGenesis: days,
            });
        }
    });

    // Add current price point if available
    if (currentPrice) {
        const days = getDaysSinceGenesis(now);
        powerLawData.push({
            date: nowTimestamp,
            price: currentPrice.prices.usd,
            medianModel: btcPriceMedian(days),
            supportModel: btcPriceSupport(days),
            isFuture: false,
            daysSinceGenesis: days,
        });
    }

    // Add future prediction points
    let lastWeekDate = Math.max(...powerLawData.map(d => d.date));
    for (let timestamp = lastWeekDate + weekMs; timestamp <= endTimestamp; timestamp += weekMs) {
        const days = getDaysSinceGenesis(new Date(timestamp));
        powerLawData.push({
            date: timestamp,
            price: null,
            medianModel: btcPriceMedian(days),
            supportModel: btcPriceSupport(days),
            isFuture: true,
            daysSinceGenesis: days,
        });
    }

    // Sort by date
    return powerLawData.sort((a, b) => a.date - b.date);
};

// Fixed: Generate daily power law data
const generateDailyPowerLawData = (
    dailyData: PriceDataPoint[],
    currentPrice: PriceResponse | null
): PowerLawDataPoint[] => {
    const now = new Date();
    const nowTimestamp = now.getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    const graphStartTimestamp = new Date('2009-07-18').getTime();
    const endTimestamp = new Date(now.getTime() + 365 * dayMs).getTime(); // Only predict 1 year in the future for daily
    const dailyPowerLawData: PowerLawDataPoint[] = [];

    // Process historical daily data
    dailyData.forEach(item => {
        const date = new Date(item.date);
        const timestamp = date.getTime();
        if (timestamp >= graphStartTimestamp) {
            const days = getDaysSinceGenesis(date);
            dailyPowerLawData.push({
                date: timestamp,
                price: item.price,
                medianModel: btcPriceMedian(days),
                supportModel: btcPriceSupport(days),
                isFuture: date > now,
                daysSinceGenesis: days,
            });
        }
    });

    // Add current price point if available
    if (currentPrice) {
        const days = getDaysSinceGenesis(now);
        dailyPowerLawData.push({
            date: nowTimestamp,
            price: currentPrice.prices.usd,
            medianModel: btcPriceMedian(days),
            supportModel: btcPriceSupport(days),
            isFuture: false,
            daysSinceGenesis: days,
        });
    }

    // Add future prediction points
    let lastDailyDate = Math.max(...dailyPowerLawData.map(d => d.date));
    for (let timestamp = lastDailyDate + dayMs; timestamp <= endTimestamp; timestamp += dayMs) {
        const days = getDaysSinceGenesis(new Date(timestamp));
        dailyPowerLawData.push({
            date: timestamp,
            price: null,
            medianModel: btcPriceMedian(days),
            supportModel: btcPriceSupport(days),
            isFuture: true,
            daysSinceGenesis: days,
        });
    }

    // Sort by date
    return dailyPowerLawData.sort((a, b) => a.date - b.date);
};

// Updated to combine data sources better
const generatePowerLawChartData = (
    weeklyData: PriceDataPoint[],
    dailyData: PriceDataPoint[],
    currentPrice: PriceResponse | null
) => {
    console.log('Generating power law data with:', { weeklyDataCount: weeklyData.length, dailyDataCount: dailyData.length });

    const displayStartTimestamp = new Date('2009-07-18').getTime();

    // Generate basic power law data
    let powerLawData = generateWeeklyPowerLawData(weeklyData, currentPrice);

    // Incorporate daily data by converting to weekly
    if (dailyData.length > 0) {
        const weeklyDailyData = convertDailyToWeekly(dailyData);
        weeklyDailyData.forEach((item: PriceDataPoint) => {
            const date = new Date(item.date);
            const timestamp = date.getTime();
            const days = getDaysSinceGenesis(date);

            // Find existing data point or create new one
            const existingIndex = powerLawData.findIndex(d => d.date === timestamp);
            if (existingIndex !== -1) {
                // Update existing point if more recent
                if (dailyData.length > 0 && !powerLawData[existingIndex].isFuture) {
                    powerLawData[existingIndex].price = item.price;
                }
            } else {
                // Add new point
                powerLawData.push({
                    date: timestamp,
                    price: item.price,
                    medianModel: btcPriceMedian(days),
                    supportModel: btcPriceSupport(days),
                    isFuture: date > new Date(),
                    daysSinceGenesis: days,
                });
            }
        });

        // Re-sort the array after adding new points
        powerLawData.sort((a, b) => a.date - b.date);
    }

    // Generate daily power law data separately
    const dailyPowerLawData = generateDailyPowerLawData(dailyData, currentPrice);

    // Calculate R-squared for the model
    const rSquaredInput = powerLawData
        .filter(d => !d.isFuture && d.price !== null)
        .map(d => [d.date, d.price as number] as [number, number]);
    const rSquared = calculateRSquared(rSquaredInput);

    // Filter data to start from desired timestamp
    const filteredPowerLawData = powerLawData.filter(d => d.date >= displayStartTimestamp);
    const filteredDailyPowerLawData = dailyPowerLawData.filter(d => d.date >= displayStartTimestamp);

    console.log('Generated powerLawData:', filteredPowerLawData.length);
    console.log('Generated dailyPowerLawData:', filteredDailyPowerLawData.length);
    console.log('Calculated rSquared:', rSquared);

    return { powerLawData: filteredPowerLawData, dailyPowerLawData: filteredDailyPowerLawData, rSquared };
};

export const useBitcoinData = (): BitcoinData => {
    const [state, setState] = useState<BitcoinData>({
        loading: true,
        error: null,
        currentPrice: null,
        dailyPrices: [],
        weeklyPrices: [],
        powerLawData: [],
        dailyPowerLawData: [],
        exchangeRate: 150.0,
        rSquared: null,
        dataSources: {},
        news: [],
    });

    const fetchData = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            console.log('データ取得開始');
            const weeklyPricesData = await fetchWeeklyJson();
            console.log('weeklyPrices取得:', weeklyPricesData.length);

            let currentPriceData: PriceResponse;
            let dailyPricesData: PriceDataPoint[];

            try {
                console.log('Binanceデータ取得開始');
                [currentPriceData, dailyPricesData] = await Promise.all([
                    fetchBinanceCurrentPrice(),
                    fetchBinanceDailyPrices(),
                ]);
                console.log('Binance成功:', currentPriceData);
            } catch (binanceError) {
                console.warn('Binance失敗、CoinGeckoにフォールバック:', binanceError);
                try {
                    console.log('CoinGeckoデータ取得開始');
                    [currentPriceData, dailyPricesData] = await Promise.all([
                        fetchCoinGeckoCurrentPrice(),
                        fetchCoinGeckoDailyPrices(),
                    ]);
                    console.log('CoinGecko成功:', currentPriceData);
                } catch (coingeckoError) {
                    console.warn('CoinGeckoも失敗、ダミーデータを使用:', coingeckoError);
                    currentPriceData = DUMMY_CURRENT_PRICE;
                    dailyPricesData = DUMMY_DAILY_PRICES;
                }
            }

            const newsData = await fetchNews();

            const { powerLawData, dailyPowerLawData, rSquared } = generatePowerLawChartData(
                weeklyPricesData.length > 0 ? weeklyPricesData : DUMMY_WEEKLY_PRICES,
                dailyPricesData.length > 0 ? dailyPricesData : DUMMY_DAILY_PRICES,
                currentPriceData
            );

            setState({
                loading: false,
                error: null,
                currentPrice: currentPriceData,
                dailyPrices: dailyPricesData,
                weeklyPrices: weeklyPricesData,
                powerLawData: powerLawData || [],
                dailyPowerLawData: dailyPowerLawData || [],
                exchangeRate: currentPriceData.prices.jpy / currentPriceData.prices.usd,
                rSquared,
                dataSources: {
                    currentPrice: currentPriceData.source,
                    dailyPrices: currentPriceData.source,
                    weeklyPrices: 'local',
                },
                news: newsData,
            });
        } catch (error) {
            console.error('全体エラー:', error);
            const { powerLawData, dailyPowerLawData, rSquared } = generatePowerLawChartData(
                DUMMY_WEEKLY_PRICES,
                DUMMY_DAILY_PRICES,
                DUMMY_CURRENT_PRICE
            );
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error('データ取得に失敗しました。後でもう一度お試しください。'),
                currentPrice: DUMMY_CURRENT_PRICE,
                dailyPrices: DUMMY_DAILY_PRICES,
                weeklyPrices: DUMMY_WEEKLY_PRICES,
                powerLawData: powerLawData || [],
                dailyPowerLawData: dailyPowerLawData || [],
                exchangeRate: 150.0,
                rSquared: rSquared || null,
                dataSources: { currentPrice: 'dummy', dailyPrices: 'dummy', weeklyPrices: 'dummy' },
                news: DUMMY_NEWS,
            }));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return state;
};