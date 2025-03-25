// src/components/charts/PowerLawChartWrapper.tsx
import React from 'react';
import PowerLawChart from './PowerLawChart';
import LogLogPowerLawChart from './LogLogPowerLawChart';
import { PowerLawChartWrapperProps } from '../../types';

const PowerLawChartWrapper: React.FC<PowerLawChartWrapperProps> = (props) => {
    const { isLogScale, height, ...restProps } = props;

    // Simple wrapper that just selects between the two chart types
    return (
        <div className="w-full h-full">
            {isLogScale ? (
                <LogLogPowerLawChart {...restProps} height={height} />
            ) : (
                <PowerLawChart {...restProps} height={height} isLogScale={false} />
            )}
        </div>
    );
};

export default PowerLawChartWrapper;