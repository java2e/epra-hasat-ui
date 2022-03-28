import React, { useEffect } from 'react';
import { Chart } from 'primereact/chart';

const BarChart = (props) => {

    const basicData = {
        labels: props.data.label,
        datasets: [
            {
                label: 'Active Power',
                backgroundColor: '#42A5F5',
                data: props.data.activePower
            }
        ]
    };

    const lineStylesData = {
        labels:  props.data.label,
        datasets: [
            {
                label: 'Gross Load',
                data: props.data.activePowerGross,
                fill: false,
                borderColor: '#42A5F5'
            },
            {
                label: 'Net Load',
                data: props.data.activePowerNet,
                fill: false,
                borderColor: '#66BB6A'
            },
            {
                label: 'PV Generation',
                data: props.data.pvGeneration,
                fill: true,
                borderColor: '#FFA726',
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
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
                    },
                    title: {
                        display: true,
                        text: "Saat"
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    },
                    title: {
                        display: true,
                        text: "P (MW)"
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
                <Chart type="line" data={lineStylesData} options={basicOptions} />
            </div>
        </div>
    )
}

export default BarChart;