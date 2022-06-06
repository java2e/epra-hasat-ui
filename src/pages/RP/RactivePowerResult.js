import React, { useEffect, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import GoogleMap from '../../components/optimization/GoogleMap_2';
import { Chart } from 'primereact/chart';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { OptimizationService } from '../../service/OptimizationService';
import LineChart from '../../components/optimization/LineChart';
import { Button } from 'primereact/button';
import LineChartResult from '../../components/optimization/LineChartResult';
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
    const [document,setDocument] =useState(null);
    const [loading, setLoading] = useState(false);
    const [pvs, setPvs] = useState(false);
    const [feeder, setFeeder] = useState('');
    const [feederId, setFeederId] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const [rPowerOptimization, setRPowerOptimization] = useState(emptyrPowerOp);
    const [basicData, setBasicDatas] = useState();
    const [voltageTrueList, setVoltageTrueList] = useState();
    const [voltageFalseList, setVoltageFalseList] = useState();
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

                const documentList = res.object.documentList;

                if(documentList){
                    const documentData = documentList[0];
                    setDocument(documentData)
                }
                
                setBasicDatas( {labels: ['Mevcut Durum', 'Optimum Reaktif Destek'],
                datasets: [
                    {
                        label: res.object.feeder.name,
                        backgroundColor: '#42A5F5',
                        data: [res.object.lossVoltageWithoutPv, res.object.lossVoltageWithPv]
                    }
                ]});

                setVoltageTrueList(
                    { 
                        labels:res.object.busNumbers,
                        voltageTrue: res.object.voltageTrueList,
                        
                       
                        
                     }) 
                setVoltageFalseList(
                        { 
                            labels:res.object.busNumbers,                           
                            voltageFalse:res.object.voltageFalseList,
                           
                            
                         })             
                
                
            }
            else {
                console.log(res.message)
            }
        }

        loadData();

    }, [id]);

    
    

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
                    text: "Teknik Kayıp [MWh]"
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
                    text: "Merkez No"
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

        header = 'Fider Adı : ' + feeder.name + ' PV; ';
        for (let index = 0; index < pvs.length; index++) {
            header += pvs[index].name;
            if (index != (pvs.length - 1)){
                header += ', ';
            }
        }
    }
    const getDocument = async () => {
 
        // console.log(document)
         if(document && document.documentId)
         {
           window.open("http://hasat.epra.com.tr:8181/api/document/download/"+document.documentId);
         }
         else{
           alert("Döküman bulunamadı! Lütfen admin ile iletişime geçiniz.")
         }
     
       } 

    return (
        <Panel header={header}>
            <div className="grid">
                {basicData &&
                <div className="col-4 flex align-items-center justify-content-center">
                    <Chart width="100%" height='300' type="bar" data={basicData} options={basicOptions} />
                </div>}
                <div className="col-1">
                </div>
                <div className="col-7">
                    {feederId && pvs && <GoogleMap feederId={feederId} pvs={pvs} />}
                </div>
            </div>
            <Divider />
            <Divider />
            <div className="grid">
               {voltageFalseList && <div className="col-12 flex align-items-center justify-content-center">
                    <LineChartResult width="100%" height='50%' type="line" voltageTrueList={voltageTrueList} voltageFalseList={voltageFalseList} options={basicOptions2} />
                </div> }
            </div>

            <Divider align="right">
        <Button
          label="Excel Olarak Al"
          icon="pi pi-download"
          className="p-button-outlined"
          onClick={getDocument}
        ></Button>
      </Divider>
        </Panel >
    )

}

export default ReactivePowerResult;