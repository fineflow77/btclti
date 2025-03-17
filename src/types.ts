// src/types.ts
export interface BitcoinData {
    loading: boolean;
    error: Error | null;
    currentPrice: {
        prices: { usd: number; jpy: number };
        timestamp: string;
    } | null;
    exchangeRate: number;
    weeklyPrices: { date: string; price: number }[];
    powerLawData: {
        date: number;
        price: number | null;
        medianModel: number;
        supportModel: number;
        isFuture: boolean;
    }[];
    dailyPrices: { date: string; price: number }[];
    rSquared: number | null;
    networkData?: any; // 使用しない場合は削除可能、必要なら具体的な型を指定
}

export interface DataContainerProps {
    children: React.ReactNode;
    isLoading: boolean;
    error: Error | null;
    loadingMessage: string;
    noDataMessage: string; // 追加
}

export interface PowerLawChartWrapperProps {
    rSquared: number; // 追加
    chartData: {
        date: number;
        price: number | null;
        medianModel: number;
        supportModel: number;
        isFuture: boolean;
        daysSinceGenesis?: number; // オプションとして追加
    }[];
    exchangeRate: number;
    currentPrice: number | undefined;
    height: number;
    isZoomed: boolean;
    powerLawPosition: number | null;
}