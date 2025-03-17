import React from 'react';
import PowerLawChart from './PowerLawChart';
import LogLogPowerLawChart from './LogLogPowerLawChart';
import { ChartDataPoint } from './PowerLawChart';

interface PowerLawChartWrapperProps {
    rSquared: number;
    chartData: ChartDataPoint[];
    exchangeRate: number;
    currentPrice: number | undefined;
    height: number;
    powerLawPosition: number | null;
}

const PowerLawChartWrapper: React.FC<PowerLawChartWrapperProps> = (props) => {
    return (
        <>
            <PowerLawChart
                rSquared={props.rSquared}
                chartData={props.chartData}
                exchangeRate={props.exchangeRate}
                currentPrice={props.currentPrice}
                height={props.height}
                powerLawPosition={props.powerLawPosition}
                showRSquared={false}
                chartTitle="Power Law Chart"
            />
            <LogLogPowerLawChart
                rSquared={props.rSquared}
                chartData={props.chartData}
                exchangeRate={props.exchangeRate}
                currentPrice={props.currentPrice}
                height={400}
                powerLawPosition={props.powerLawPosition}
                showRSquared={true}
                chartTitle="Log-Log Power Law Chart"
            />
        </>
    );
};

export default PowerLawChartWrapper;