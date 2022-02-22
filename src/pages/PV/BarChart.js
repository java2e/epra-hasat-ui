import React from 'react';
import { Chart } from 'primereact/chart';

const BarChart = (props) => {

    const basicData = {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
            {
                label: 'Active Power',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions
        }

    }

    const { basicOptions } = getLightTheme();


    return (
        <div>
            <div className="card">
                <Chart type="bar" data={basicData} options={basicOptions} />
            </div>
        </div>
    )
}

export default BarChart;