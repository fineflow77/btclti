// src/types.ts
export interface PriceData {
    usd: number;
    jpy: number;
}

export interface CurrentPrice {
    prices: PriceData;
    timestamp: string;
    source?: string;
}

export interface PowerLawDataPoint {
    date: number;
    price: number | null;
    medianModel: number;
    supportModel: number;
    isFuture: boolean;
    daysSinceGenesis: number;
}

export interface WeeklyPrice {
    date: string;
    price: number;
}

export interface DailyPrice {
    date: string;
    price: number;
}

export interface BitcoinData {
    loading: boolean;
    error: Error | null;
    currentPrice: CurrentPrice | null;
    dailyPrices: DailyPrice[];
    weeklyPrices: WeeklyPrice[];
    powerLawData: PowerLawDataPoint[];
    dailyPowerLawData: PowerLawDataPoint[];
    exchangeRate: number;
    rSquared: number | null;
    dataSources: { currentPrice?: string; dailyPrices?: string; weeklyPrices?: string };
}

export interface DataContainerProps {
    children: React.ReactNode;
    isLoading: boolean;
    error: Error | null;
    loadingMessage: string;
    noDataMessage: string;
    className?: string;
}

export interface PowerLawChartProps {
    exchangeRate: number;
    rSquared: number | null;
    chartData: PowerLawDataPoint[];
    currentPrice: number | undefined;
    height?: number;
    xAxisScale?: 'linear' | 'log';
    yAxisScale?: 'linear' | 'log';
    showRSquared?: boolean;
    chartTitle?: string;
    isLogScale?: boolean; // 追加
}

export interface PowerLawChartWrapperProps {
    rSquared: number;
    chartData: PowerLawDataPoint[];
    exchangeRate: number;
    currentPrice: number | undefined;
    height: number;
    isLogScale: boolean;
}