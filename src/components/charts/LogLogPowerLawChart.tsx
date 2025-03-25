// src/components/charts/LogLogPowerLawChart.tsx
import React from 'react';
import PowerLawChart from './PowerLawChart';
import { PowerLawChartProps } from '../../types';

interface LogLogPowerLawChartProps extends Omit<PowerLawChartProps, 'xAxisScale' | 'yAxisScale' | 'height'> {
    height?: number;
}

const LogLogPowerLawChart: React.FC<LogLogPowerLawChartProps> = (props) => {
    return (
        <PowerLawChart
            {...props}
            xAxisScale="log"
            yAxisScale="log"
            height={props.height ?? 400}
        />
    );
};

export default LogLogPowerLawChart;