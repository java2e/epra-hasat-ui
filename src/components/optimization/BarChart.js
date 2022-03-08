import React, { useEffect } from 'react';
import { Chart } from 'primereact/chart';

const BarChart = (props) => {


    useEffect(() => {
        debugger
        console.log(props)
    },[props])
    

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