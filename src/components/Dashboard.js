import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Panel } from 'primereact/panel';
import { OptimizationService } from '../service/OptimizationService';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [optimizationList, setOptimizationList] = useState([]);
    const optimizationService = new OptimizationService();
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
       
        setLoading(true);
        const loadData = async() => {

            const response = await optimizationService.getAllOptimization();

            if(response.success)
            {
                setOptimizationList(response.object);
                setLoading(false);
            }
            else{
                setLoading(false);
            }

        }
        loadData().then(res =>{
            setLoading(false);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const showResult =(data) => {
        //console.log(data);
        if(data.optimizationType === 'PV_LOCATION')
            history.push({pathname:"/pvLocationResult/"+data.id})

            if(data.optimizationType === 'REACTIVE_POWER')
            history.push({pathname:"/reactivePowerResult/"+data.id})
        }

    const statusBodyTemplate = (rowData) => {
        
        return <span className={`pv-badge status-${rowData.processStatus}`}>{rowData.processStatus}</span>;
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
               <Button disabled={rowData.processStatus !== 'COMPLETED'} label="Sonucu Göster" className="p-button-success" onClick={() => showResult(rowData)} />
            </React.Fragment>
        );
    }

    const optimizationTypeBodyTemplate = (rowData) => {

        if(rowData.optimizationType === 'PV_LOCATION')
          return <span>PV Konumlandırma</span>;
          else{
            return <span >Reaktif Güç Optimizasyonu</span>;
          }
    }

    return (
        <div>
            <Panel header="EPRA">
                <p>
                    EPRA; elektrik enerjisinin üretimi, iletimi, dağıtımı ve ticareti konularında nitelikli mühendislik hizmetleri ile yazılım ve algoritma geliştirme faaliyetleri gerçekleştirmektedir.
                </p>
            </Panel>
            <div className="card">
            <DataTable header="İşlemler" value={optimizationList} responsiveLayout="scroll" loading={loading}>
                    <Column field="id" sortable header="İşlem ID"></Column>
                    <Column field="userName" sortable header="Kullanıcı"></Column>
                    <Column field="optimizationType" sortable header="İşlem" body={optimizationTypeBodyTemplate}></Column>
                    <Column field="processStatus" sortable header="Durum" body={statusBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                    <Column field="createDate" sortable header="İşlem Talep Tarihi"></Column>
                    <Column field="updateDate" sortable header="İşlem Tamamlanma Tarihi"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default Dashboard;