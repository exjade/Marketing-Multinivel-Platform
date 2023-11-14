import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import Chart from 'chart.js/auto'

const IncomeChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Earnings',
                        data: data.values,
                        backgroundColor: 'rgba(37,150,130,0.75)',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default IncomeChart;
IncomeChart.propTypes = {
    data: PropTypes.any
}