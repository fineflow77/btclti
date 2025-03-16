import { useState, useEffect, useCallback } from 'react';
import { PriceModel } from '../utils/constants';
import { calculateRSquared } from '../utils/models';

const getDaysSinceGenesis = (date: Date): number => {
    const genesisDate = new Date('2009-01-03');
    return Math.floor((date.getTime() - genesisDate.getTime()) / (1000 * 60 * 60 * 24));
};

const btcPriceMedian = (days: number, model: PriceModel = PriceModel.STANDARD): number => {
    const medianModelLog = -17.01593313 + 5.84509376 * Math.log10(days);
    return Math.pow(10, medianModelLog);
};

const btcPriceSupport = (days: number): number => {
    const supportModelLog = -17.668 + 5.926 * Math.log10(days);
    return Math.pow(10, supportModelLog);
};

// 型定義を src/types/index.ts に合わせる
interface PriceResponse {
    prices: { usd: number; jpy: number; };
    timestamp: string; // src/types/index.ts に合わせるため string に
    source?: string;
}

interface BitcoinData {
    loading: boolean;
    error: Error | null;
    currentPrice: PriceResponse | null;
    dailyPrices: Array<{ date: string; price: number }>;
    weeklyPrices: Array<{ date: string; price: number }>;
    powerLawData: Array<{ date: number; price: number | null; medianModel: number; supportModel: number; isFuture: boolean; daysSinceGenesis: number }>;
    dailyPowerLawData: Array<{ date: number; price: number | null; medianModel: number; supportModel: number; isFuture: boolean; daysSinceGenesis: number }>;
    exchangeRate: number;
    rSquared: number | null;
    dataSources: { currentPrice?: string; dailyPrices?: string; weeklyPrices?: string; };
}

const fetchBinanceCurrentPrice = async (): Promise<PriceResponse> => {
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
        return {
            prices: { usd: usdPrice, jpy: jpyPrice },
            timestamp: new Date().toISOString(),
            source: 'binance',
        };
    } catch (error) {
        console.error('Binance Current Price Fetch Error:', error);
        throw error;
    }
};

const fetchBinanceDailyPrices = async (): Promise<Array<{ date: string; price: number }>> => {
    try {
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=365');
        if (!response.ok) throw new Error(`Binance HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.map(([timestamp, open]: [number, string]) => ({
            date: new Date(timestamp).toISOString().split('T')[0],
            price: parseFloat(open),
        }));
    } catch (error) {
        console.error('Binance Daily Prices Fetch Error:', error);
        throw error;
    }
};

const fetchCoinGeckoCurrentPrice = async (): Promise<PriceResponse> => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,jpy');
        if (!response.ok) throw new Error(`CoinGecko HTTP error! status: ${response.status}`);
        const data = await response.json();
        return {
            prices: { usd: data.bitcoin.usd, jpy: data.bitcoin.jpy },
            timestamp: new Date().toISOString(),
            source: 'coingecko',
        };
    } catch (error) {
        console.error('CoinGecko Current Price Fetch Error:', error);
        throw error;
    }
};

const fetchCoinGeckoDailyPrices = async (): Promise<Array<{ date: string; price: number }>> => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily');
        if (!response.ok) throw new Error(`CoinGecko HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.prices.map(([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toISOString().split('T')[0],
            price,
        }));
    } catch (error) {
        console.error('CoinGecko Daily Prices Fetch Error:', error);
        throw error;
    }
};

const fetchWeeklyJson = async (): Promise<Array<{ date: string; price: number }>> => {
    try {
        const response = await fetch('/weekly.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const weeklyData = await response.json();
        return [...weeklyData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error('Weekly JSON Fetch Error:', error);
        return [];
    }
};

const convertDailyToWeekly = (dailyData: Array<{ date: string; price: number }>): Array<{ date: string; price: number }> => {
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const startTimestamp = new Date('2009-07-18').getTime();
    const endTimestamp = new Date().getTime();
    const weeklyData: Array<{ date: string; price: number }> = [];

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

const generatePowerLawChartData = (
    weeklyData: Array<{ date: string; price: number }>,
    dailyData: Array<{ date: string; price: number }>,
    currentPrice: PriceResponse | null
) => {
    const now = new Date();
    const nowTimestamp = now.getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const dayMs = 24 * 60 * 60 * 1000;
    const graphStartTimestamp = new Date('2009-07-18').getTime();
    const displayStartTimestamp = new Date('2009-07-18').getTime();
    const endTimestamp = new Date('2040-12-31').getTime();

    const powerLawData: Array<{ date: number; price: number | null; medianModel: number; supportModel: number; isFuture: boolean; daysSinceGenesis: number }> = [];
    const dailyPowerLawData: Array<{ date: number; price: number | null; medianModel: number; supportModel: number; isFuture: boolean; daysSinceGenesis: number }> = [];

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

    const weeklyDailyData = convertDailyToWeekly(dailyData);
    weeklyDailyData.forEach(item => {
        const date = new Date(item.date);
        const timestamp = date.getTime();
        if (timestamp >= graphStartTimestamp) {
            const days = getDaysSinceGenesis(date);
            const existingIndex = powerLawData.findIndex(d => d.date === timestamp);
            if (existingIndex !== -1) powerLawData[existingIndex].price = item.price;
            else powerLawData.push({ date: timestamp, price: item.price, medianModel: btcPriceMedian(days), supportModel: btcPriceSupport(days), isFuture: date > now, daysSinceGenesis: days });
        }
    });

    if (currentPrice) {
        const days = getDaysSinceGenesis(now);
        powerLawData.push({ date: nowTimestamp, price: currentPrice.prices.usd, medianModel: btcPriceMedian(days), supportModel: btcPriceSupport(days), isFuture: false, daysSinceGenesis: days });
        dailyPowerLawData.push({ date: nowTimestamp, price: currentPrice.prices.usd, medianModel: btcPriceMedian(days), supportModel: btcPriceSupport(days), isFuture: false, daysSinceGenesis: days });
    }

    let lastWeekDate = Math.max(...powerLawData.map(d => d.date));
    for (let timestamp = lastWeekDate + weekMs; timestamp <= endTimestamp; timestamp += weekMs) {
        const days = getDaysSinceGenesis(new Date(timestamp));
        powerLawData.push({ date: timestamp, price: null, medianModel: btcPriceMedian(days), supportModel: btcPriceSupport(days), isFuture: true, daysSinceGenesis: days });
    }

    let lastDailyDate = Math.max(...dailyPowerLawData.map(d => d.date));
    for (let timestamp = lastDailyDate + dayMs; timestamp <= endTimestamp; timestamp += dayMs) {
        const days = getDaysSinceGenesis(new Date(timestamp));
        dailyPowerLawData.push({ date: timestamp, price: null, medianModel: btcPriceMedian(days), supportModel: btcPriceSupport(days), isFuture: true, daysSinceGenesis: days });
    }

    powerLawData.sort((a, b) => a.date - b.date);
    dailyPowerLawData.sort((a, b) => a.date - b.date);

    const rSquaredInput = powerLawData
        .filter(d => !d.isFuture && d.price !== null)
        .map(d => [d.date, d.price]);
    const rSquared = calculateRSquared(rSquaredInput);

    const filteredPowerLawData = powerLawData.filter(d => d.date >= displayStartTimestamp);
    const filteredDailyPowerLawData = dailyPowerLawData.filter(d => d.date >= displayStartTimestamp);

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
    });

    const fetchData = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            console.log('データ取得開始');
            const weeklyPricesData = await fetchWeeklyJson();
            console.log('weeklyPrices取得:', weeklyPricesData.length);
            let currentPriceData: PriceResponse;
            let dailyPricesData: Array<{ date: string; price: number }>;

            try {
                console.log('Binanceデータ取得開始');
                [currentPriceData, dailyPricesData] = await Promise.all([
                    fetchBinanceCurrentPrice(),
                    fetchBinanceDailyPrices(),
                ]);
                console.log('Binance成功:', currentPriceData);
            } catch (binanceError) {
                console.warn('Binance失敗、CoinGeckoにフォールバック:', binanceError);
                console.log('CoinGeckoデータ取得開始');
                [currentPriceData, dailyPricesData] = await Promise.all([
                    fetchCoinGeckoCurrentPrice(),
                    fetchCoinGeckoDailyPrices(),
                ]);
                console.log('CoinGecko成功:', currentPriceData);
            }

            const { powerLawData, dailyPowerLawData, rSquared } = generatePowerLawChartData(weeklyPricesData, dailyPricesData, currentPriceData);
            console.log('チャートデータ生成完了:', { rSquared });

            setState({
                loading: false,
                error: null,
                currentPrice: currentPriceData,
                dailyPrices: dailyPricesData,
                weeklyPrices: weeklyPricesData,
                powerLawData,
                dailyPowerLawData,
                exchangeRate: currentPriceData.prices.jpy / currentPriceData.prices.usd,
                rSquared,
                dataSources: {
                    currentPrice: currentPriceData.source,
                    dailyPrices: currentPriceData.source,
                    weeklyPrices: 'local',
                },
            });
            console.log('state更新完了');
        } catch (error) {
            console.error('全体エラー:', error);
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error : new Error(String(error)),
                rSquared: null,
            }));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return state;
};