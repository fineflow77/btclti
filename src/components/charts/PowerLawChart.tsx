// src/components/charts/PowerLawChart.tsx
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, Label, ReferenceLine, Legend } from 'recharts';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { HALVING_EVENTS } from '../../utils/constants';
import { getDaysSinceGenesis } from '../../utils/dateUtils';
import { PowerLawChartProps, PowerLawDataPoint } from '../../types';
import { calculatePowerLawPosition, getPowerLawPositionLabel, getPowerLawPositionColor } from '../../utils/models';

interface TooltipContentProps {
    active?: boolean;
    payload?: any[];
    exchangeRate: number;
}

const COLORS = {
    price: '#D4AF37', // Amber for actual price line
    median: '#10B981',
    support: '#FF69B4', // Pink for support price line
    grid: '#5A5A6A',
    halving: 'rgba(255, 255, 255, 0.25)',
    tooltip: { bg: 'rgba(26, 32, 44, 0.95)', border: 'rgba(82, 82, 91, 0.8)' },
    plotAreaBg: '#000000',
    legendText: '#e2e8f0',
    priceArea: 'rgba(59, 130, 246, 0.1)',
    supportArea: 'rgba(248, 113, 113, 0.1)',
};

const CHART_CONFIG = {
    PRICE_LINE_WIDTH: 2,
    MODEL_LINE_WIDTH: 2,
    REFERENCE_LINE_WIDTH: 2,
    MARGIN: { top: 20, right: 30, left: 50, bottom: 20 },
};

const TooltipContent: React.FC<TooltipContentProps> = ({ active, payload, exchangeRate }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    if (!data) return null;

    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

    const deviation =
        data.price !== null && data.price !== undefined
            ? calculatePowerLawPosition(data.price, data.medianModel, data.supportModel)
            : null;
    const deviationLabel = deviation !== null ? getPowerLawPositionLabel(deviation) : '計算不可';
    const deviationColor = deviation !== null ? getPowerLawPositionColor(deviation) : '#888888';

    return (
        <div
            className="p-3 rounded-lg shadow-md"
            style={{ backgroundColor: COLORS.tooltip.bg, border: `1px solid ${COLORS.tooltip.border}`, color: '#fff', fontSize: '12px', opacity: 0.9 }}
        >
            <p className="font-semibold">{formattedDate}</p>
            {!data.isFuture && data.price !== null && data.price !== undefined && (
                <p>
                    実際価格: <span style={{ color: COLORS.price }}>{formatCurrency(data.price * exchangeRate, 'JPY')}</span>
                    <span style={{ color: '#d1d5db' }}> ({formatCurrency(data.price, 'USD')})</span>
                </p>
            )}
            <p>
                中央価格: <span style={{ color: COLORS.median }}>{formatCurrency(data.medianModel * exchangeRate, 'JPY')}</span>
                <span style={{ color: '#d1d5db' }}> ({formatCurrency(data.medianModel, 'USD')})</span>
            </p>
            <p>
                下限価格: <span style={{ color: COLORS.support }}>{formatCurrency(data.supportModel * exchangeRate, 'JPY')}</span>
                <span style={{ color: '#d1d5db' }}> ({formatCurrency(data.supportModel, 'USD')})</span>
            </p>
            {!data.isFuture && data.price !== null && data.price !== undefined && (
                <p>
                    中央価格からの乖離率: <span style={{ color: deviationColor }}>
                        {deviation !== null ? formatPercentage((data.price - data.medianModel) / data.medianModel * 100, { decimals: 1 }) : '-'} ({deviationLabel})
                    </span>
                </p>
            )}
        </div>
    );
};

// Transform data for display with validation
const transformDataForChart = (data: PowerLawDataPoint[], xAxisScale: 'linear' | 'log') => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn('Chart data is empty or invalid:', data);
        return [];
    }

    return data
        .map((point) => {
            const transformedPoint = { ...point };

            // X軸（daysSinceGenesis）の変換
            if (xAxisScale === 'log' && point.daysSinceGenesis > 0) {
                transformedPoint.daysSinceGenesis = Math.log10(point.daysSinceGenesis);
            } else if (xAxisScale === 'log') {
                console.warn('Invalid daysSinceGenesis for log scale:', point.daysSinceGenesis);
                return null; // 0以下の場合はスキップ
            }

            // Y軸（価格）の変換は親コンポーネントで処理済みなのでここでは不要

            // 不正な値（NaN, Infinity）のチェック
            if (
                (transformedPoint.price !== null && (isNaN(transformedPoint.price) || !isFinite(transformedPoint.price))) ||
                (transformedPoint.medianModel !== null && (isNaN(transformedPoint.medianModel) || !isFinite(transformedPoint.medianModel))) ||
                (transformedPoint.supportModel !== null && (isNaN(transformedPoint.supportModel) || !isFinite(transformedPoint.supportModel))) ||
                (isNaN(transformedPoint.daysSinceGenesis) || !isFinite(transformedPoint.daysSinceGenesis))
            ) {
                console.warn('Invalid transformed data point:', transformedPoint);
                return null;
            }

            return transformedPoint;
        })
        .filter((point): point is PowerLawDataPoint => point !== null); // nullを除外
};

const PowerLawChart: React.FC<PowerLawChartProps> = ({
    exchangeRate,
    rSquared,
    chartData,
    height = 400,
    xAxisScale = 'linear',
    yAxisScale = 'log',
    showRSquared = true,
}) => {
    // Transform data for the chart based on scale settings
    const transformedData = useMemo(() => {
        return transformDataForChart(chartData, xAxisScale);
    }, [chartData, xAxisScale]);

    // Calculate chart domains
    const { xDomain, yDomain, yearTicks } = useMemo(() => {
        if (!transformedData || transformedData.length === 0) {
            console.warn('Transformed data is empty');
            return { xDomain: [0, 1], yDomain: [0.1, 1000], yearTicks: [] };
        }

        // X-axis domain
        const daysValues = transformedData
            .map((d) => d.daysSinceGenesis)
            .filter((d) => !isNaN(d) && isFinite(d));
        if (daysValues.length === 0) {
            console.warn('No valid daysSinceGenesis values');
            return { xDomain: [0, 1], yDomain: [0.1, 1000], yearTicks: [] };
        }
        const minDays = Math.min(...daysValues);
        const maxDays = Math.max(...daysValues);

        // Y-axis domain calculation
        const validPrices = transformedData
            .filter((d) => d.price !== null && d.price !== undefined && !isNaN(d.price) && isFinite(d.price))
            .map((d) => d.price as number);

        const validMedians = transformedData
            .filter((d) => d.medianModel !== null && !isNaN(d.medianModel) && isFinite(d.medianModel))
            .map((d) => d.medianModel);

        const validSupports = transformedData
            .filter((d) => d.supportModel !== null && !isNaN(d.supportModel) && isFinite(d.supportModel))
            .map((d) => d.supportModel);

        const allValues = [...validPrices, ...validMedians, ...validSupports];
        if (allValues.length === 0) {
            console.warn('No valid price values for Y-axis');
            return { xDomain: [minDays, maxDays], yDomain: [0.1, 1000], yearTicks: [] };
        }

        const minValue = Math.min(...allValues);
        const maxValue = Math.max(...allValues);

        // 対数スケールの場合、範囲を調整
        const adjustedMinValue = yAxisScale === 'log' ? Math.max(minValue * 0.5, 0.1) : minValue * 0.5;
        const adjustedMaxValue = maxValue * 1.2;

        // Create year ticks
        const genesisDate = new Date('2009-01-03').getTime();
        const maxDaysValue = xAxisScale === 'log' ? Math.pow(10, maxDays) : maxDays;
        const maxYear = new Date(maxDaysValue * 86400000 + genesisDate).getFullYear();

        const ticks: number[] = [];
        for (let year = 2010; year <= maxYear; year += 2) {
            const dateOfYear = new Date(year, 0, 1);
            const days = getDaysSinceGenesis(dateOfYear);
            const transformedDays = xAxisScale === 'log' && days > 0 ? Math.log10(days) : days;
            if (transformedDays >= minDays && transformedDays <= maxDays) {
                ticks.push(transformedDays);
            }
            if (year > 2040) break;
        }

        return {
            xDomain: [minDays, maxDays],
            yDomain: [adjustedMinValue, adjustedMaxValue],
            yearTicks: ticks,
        };
    }, [transformedData, xAxisScale, yAxisScale]);

    // Find current price data point using transformed data
    const currentPriceTransformedDays = useMemo(() => {
        if (!transformedData || transformedData.length === 0) return null;
        const now = Date.now();
        let closest = null;
        let closestDiff = Infinity;

        for (const point of transformedData) {
            if (point.price !== null && point.price !== undefined) {
                const diff = Math.abs(point.date - now);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    closest = point;
                }
            }
        }

        return closest ? closest.daysSinceGenesis : null;
    }, [transformedData]);

    if (!transformedData || transformedData.length === 0) {
        return <div className="text-gray-400 text-center p-2 bg-gray-800 bg-opacity-50 rounded-lg">データがありません</div>;
    }

    return (
        <div className="bg-transparent overflow-hidden relative rounded-lg">
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={transformedData} margin={CHART_CONFIG.MARGIN}>
                    {/* Background */}
                    <ReferenceArea
                        x1={xDomain[0]}
                        x2={xDomain[1]}
                        y1={yDomain[0]}
                        y2={yDomain[1]}
                        fill={COLORS.plotAreaBg}
                        fillOpacity={1}
                        strokeWidth={0}
                    />

                    {/* Grid */}
                    <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" opacity={0.5} />

                    {/* Legend */}
                    <Legend
                        verticalAlign="bottom"
                        align="right"
                        wrapperStyle={{
                            color: COLORS.legendText,
                            fontSize: '12px',
                            padding: '5px 10px',
                            bottom: 10,
                            right: 20,
                            position: 'absolute',
                            backgroundColor: 'transparent',
                        }}
                        formatter={(value) => {
                            const color = value === 'price' ? COLORS.price : value === 'medianModel' ? COLORS.median : value === 'supportModel' ? COLORS.support : COLORS.legendText;
                            return (
                                <span style={{ color, marginRight: '15px', fontWeight: 500 }}>
                                    {value === 'price' ? '実際価格' : value === 'medianModel' ? '中央価格 (予測)' : '下限価格 (予測)'}
                                </span>
                            );
                        }}
                    />

                    {/* X-Axis */}
                    <XAxis
                        dataKey="daysSinceGenesis"
                        stroke="#fff"
                        tickLine={false}
                        axisLine={true}
                        tickFormatter={(days) => {
                            const actualDays = xAxisScale === 'log' ? Math.pow(10, days) : days;
                            return new Date(new Date('2009-01-03').getTime() + actualDays * 86400000)
                                .getFullYear()
                                .toString();
                        }}
                        tick={{ fontSize: 12, fill: COLORS.legendText, fontWeight: 'bold' }}
                        ticks={yearTicks}
                        domain={xDomain}
                        allowDataOverflow={true}
                        type="number"
                        scale={xAxisScale}
                    />

                    {/* Y-Axis */}
                    <YAxis
                        stroke="#fff"
                        tickLine={false}
                        axisLine={true}
                        scale={yAxisScale}
                        domain={yDomain}
                        tickFormatter={(value) => {
                            const displayValue = yAxisScale === 'log' ? Math.pow(10, value) : value;
                            return formatCurrency(displayValue * exchangeRate, 'JPY')
                                .replace(/[\$,]/g, '')
                                .replace('JPY', '¥');
                        }}
                        tick={{ fontSize: 11, fill: COLORS.legendText }}
                        width={70}
                        label={{
                            value: '価格 (円)',
                            angle: -90,
                            position: 'insideLeft',
                            style: { fill: '#fff', fontSize: 12, fontWeight: 500 },
                            dx: -10,
                        }}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        content={<TooltipContent exchangeRate={exchangeRate} />}
                        wrapperStyle={{ outline: 'none', fontSize: '12px' }}
                        isAnimationActive={false}
                    />

                    {/* Reference Line for current date */}
                    {currentPriceTransformedDays !== null && (
                        <ReferenceLine
                            x={currentPriceTransformedDays}
                            stroke="#ffffff"
                            strokeDasharray="3 3"
                            strokeWidth={CHART_CONFIG.REFERENCE_LINE_WIDTH}
                        >
                            <Label value="現在" position="top" fill="#ffffff" fontSize={12} fontWeight="bold" offset={15} />
                        </ReferenceLine>
                    )}

                    {/* Halving events */}
                    {HALVING_EVENTS.map((event, index) => {
                        const eventDate = new Date(event.date).getTime();
                        const eventDays = getDaysSinceGenesis(new Date(eventDate));
                        const transformedEventDays = xAxisScale === 'log' && eventDays > 0 ? Math.log10(eventDays) : eventDays;

                        if (isNaN(transformedEventDays) || !isFinite(transformedEventDays)) {
                            console.warn('Invalid halving event days:', eventDays);
                            return null;
                        }

                        return (
                            <ReferenceLine
                                key={`halving-${index}`}
                                x={transformedEventDays}
                                stroke={COLORS.halving}
                                strokeWidth={1}
                            >
                                <Label value={event.label} position="top" fill="#fff" fontSize={11} offset={10} opacity={0.8} />
                            </ReferenceLine>
                        );
                    }).filter((line): line is JSX.Element => line !== null)}

                    {/* Price Line */}
                    <Line
                        type="monotone"
                        dataKey="price"
                        name="実際価格"
                        stroke={COLORS.price}
                        strokeWidth={CHART_CONFIG.PRICE_LINE_WIDTH}
                        dot={false}
                        connectNulls={true}
                        isAnimationActive={false}
                        activeDot={{ r: 5, fill: COLORS.price, strokeWidth: 1, stroke: '#fff' }}
                    />

                    {/* Median Model Line */}
                    <Line
                        type="monotone"
                        dataKey="medianModel"
                        name="中央価格 (予測)"
                        stroke={COLORS.median}
                        strokeWidth={CHART_CONFIG.MODEL_LINE_WIDTH}
                        dot={false}
                        strokeDasharray="5 5"
                        connectNulls={true}
                        isAnimationActive={false}
                    />

                    {/* Support Model Line */}
                    <Line
                        type="monotone"
                        dataKey="supportModel"
                        name="下限価格 (予測)"
                        stroke={COLORS.support}
                        strokeWidth={CHART_CONFIG.MODEL_LINE_WIDTH}
                        dot={false}
                        connectNulls={true}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* R-Squared Value */}
            {showRSquared && rSquared !== null && (
                <div
                    className="absolute top-2 left-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg p-2 shadow-lg transition-all duration-300 hover:bg-opacity-100 border border-gray-700/50"
                    style={{ zIndex: 10 }}
                >
                    <span className="font-medium">決定係数 (R²): </span>
                    <span className="font-bold text-[#D4AF37]">{rSquared.toFixed(4)}</span>
                </div>
            )}
        </div>
    );
};

export default PowerLawChart;