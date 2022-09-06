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
    const optimizationService = new OptimizationService();
    const [senaryo1BusNumberList,setSenaryo1BusNumberList] = useState([]);
    const [senaryo2BusNumberList,setSenaryo2BusNumberList] = useState([]);
    const [senaryo1List,setSenaryo1List] = useState([]);
    const [senaryo2List,setSenaryo2List] = useState([]);
    const [mevcutPV, setMevcutPv] = useState(false);

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
                setSenaryo1BusNumberList(res.object.busNumbers);   
                setSenaryo1List(res.object.voltageTrueList);
                setSenaryo2List(res.object.voltageFalseList); 
                
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
               
            }
            else {
                console.log(res.message)
            }
        }
        
        loadData();

    }, [id]);

    
    const dataForLine = {
        
        labels: senaryo1BusNumberList.slice(0,Math.ceil(senaryo1BusNumberList.length / 2)),
        datasets: [
          {
            label: "Mevcut Durum",
            data: senaryo1List,
            fill: false,
            borderColor: "#C70039",
            tension: 0.4,
          },
          {
            label: "Optimum Reaktif Destek",
            data: senaryo2List,
            fill: false,
            borderColor: "#3361FF",
            tension: 0.4,
          },
        ],
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
                    text: "Teknik Kayıp [MWh]"
                }
            }
        }
    };


    const basicOptions2 = {
        
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            title: {
                display: true,
                text: 'Gerilim Profili',
                font: {
                  size : 16
                }
                
              },
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
      
        <Chart
          width="100%"
          height="400px"
          type="line"
          data={dataForLine}
          options={basicOptions2}
        />

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