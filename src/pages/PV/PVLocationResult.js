import React, { useEffect, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import GoogleMap from '../../components/optimization/GoogleMap';
import { Chart } from 'primereact/chart';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const PVLocaationResult = (props) => {
    const location = useLocation();
    const history = useHistory();
    let { feederId } = useParams();

    const [loading,setLoading] = useState(false);

 
    debugger

    const basicData = {
        labels: ['Optimum Konumlandırılmış PVler', 'Yeni PVler Dahil'],
        datasets: [
            {
                label: 'Dörtyol',
                backgroundColor: '#42A5F5',
                data: [990, 1190]
            }
        ]
    };


    const dataForLine = {
        labels: [10,20,30,40,50,60],
        datasets: [
            {
                label: 'Scenario 1: No PV',
                data: [0.12, 0.50, 0.45, 0.20, 0.35, 0.55, 0.59],
                fill: false,
                borderColor: '#C70039',
                tension: .4
            },
            {
                label: 'Scenario 2: Optimally Located PVs',
                data: [0.25, 0.55, 0.43, 0.28, 0.32, 0.65, 0.50],
                fill: false,
                borderColor: '#3361FF',
                tension: .4
            }
        ]
    };

    const basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
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
                },
                title: {
                    display: true,
                    text: "Yıllık Teknik Kayıp [MWh]"
                }
            }
        }
    };


    const basicOptions2 = {
        maintainAspectRatio: false,
        aspectRatio: .8,
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
                    text: "Bus Number"
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
                    text: "Voltage [p.u]"
                }
            }
        }
    };




    return (
        <Panel header="Feeder Adı : Dörtyol PV1:12,PV2:25,PV3:45">
            {feederId && <GoogleMap feederId={feederId} /> }
            <Divider />

            <div className="grid">
                <div className="col-4 flex align-items-center justify-content-center">
                    <Chart  width="100%" height='300' type="bar" data={basicData} options={basicOptions} />
                </div>
                <div className="col-1">
                    <Divider layout="vertical" />
                </div>
                <div className="col-7 flex align-items-center justify-content-center">
                    <Chart width="100%" height='100%' type="line" data={dataForLine} options={basicOptions2} />
                </div>
            </div>



        </Panel >
    )

}

export default PVLocaationResult;