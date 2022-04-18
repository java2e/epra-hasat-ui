import React, { useEffect, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import GoogleMap from '../../components/optimization/GoogleMap';
import { Chart } from 'primereact/chart';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { OptimizationService } from '../../service/OptimizationService';
import LineChart from '../../components/optimization/LineChart';
const emptyrPowerOp = {
    id: '',
    feederId: '',
    feeder: '',
    pvData: [],
    month: '',
    day: '',
    hour: '',
    optimizationProcessId: '',

}

const ReactivePowerResult = (props) => {

    let { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [pvs, setPvs] = useState(false);
    const [feeder, setFeeder] = useState('');
    const [feederId, setFeederId] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const [rPowerOptimization, setRPowerOptimization] = useState(emptyrPowerOp);


    const optimizationService = new OptimizationService();



    useEffect(() => {
        setLoading(true);
        const loadData = async () => {

            const res = await optimizationService.getReactivePowerOptimizationParameter(id);

            if (res.success) {

                setRPowerOptimization(res.object);
                setFeederId(res.object.feeder.id);
                setPvs(res.object.pvData);
                setFeeder(res.object.feeder);
                setLoading(false);
            }
            else {
                console.log(res.message)
            }
        }

        loadData();

    }, [id]);

    const basicData = {
        labels: ['Without_pv', 'With_pv'],
        datasets: [
            {
                label: 'Dörtyol',
                backgroundColor: '#42A5F5',
                data: [990, 1190]
            }
        ]
    };


    const dataForLine = {
        labels: [10, 20, 30, 40, 50, 60],
        "voltage": [
            1.000000,
            0.990822,
            0.990810,
            0.989165,
            0.981040,
            0.983536,
            0.981231,
            0.981211,
            0.983299,
            0.986487,
            0.986523,
            0.983540,
            0.983531,
            0.987837,
            0.986415,
            0.993461,
            0.980326,
            0.986313,
            0.986299,
            0.986302,
            0.990677,
            0.986613,

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
                    text: "Gerilim [p.u]"
                }
            }
        }
    };


    let header = '';

    if (feeder) {

        header = 'Feeder Adı : ' + feeder.name + ' PV : ';
        for (let index = 0; index < pvs.length; index++) {
            header += pvs[index].name + ',';

        }
    }

    return (
        <Panel header={header}>
            <div className="grid">
                <div className="col-4 flex align-items-center justify-content-center">
                    <Chart width="100%" height='300' type="bar" data={basicData} options={basicOptions} />
                </div>
                <div className="col-1">
                </div>
                <div className="col-7">
                    {feederId && pvs && <GoogleMap feederId={feederId} pvs={pvs} />}
                </div>
            </div>
            <Divider />
            <Divider />
            <div className="grid">
                <div className="col-12 flex align-items-center justify-content-center">
                    <LineChart width="100%" height='50%' type="line" data={dataForLine} options={basicOptions2} />
                </div>
            </div>
        </Panel >
    )

}

export default ReactivePowerResult;