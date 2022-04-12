
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Button } from 'primereact/button';
import './RPowerList.css';
import { useHistory } from 'react-router-dom';
import { ReactivePowerService } from '../../service/ReactivePower/ReactivePowerService';
import { ProgressSpinner } from 'primereact/progressspinner';

const RPowerList = () => {
    const rPowerService = new ReactivePowerService();
    const [loading,setLoading] = useState(false);
    const [values,setValues] = useState(null);
    const history = useHistory();

    useEffect(() =>{
        setLoading(true);
        const dataLoad = async () => {            
            const response = await rPowerService.getOptimizationProcessList();
             
            if(response.success) {
                 
                setValues(response.object);
            }
        }

        dataLoad().then(res => {
            setLoading(false);
        }
        );


    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const showResult =(data) => {
        console.log(data);
        history.push({pathname:"/reactivePowerResult/"+data.id})
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
               <Button disabled={rowData.processStatus === 'COMPLETED'} label="Sonucu Göster" className="p-button-success" onClick={() => showResult(rowData)} />
            </React.Fragment>
        );
    }

    const statusBodyTemplate = (rowData) => {         
        return <span className={`pv-badge status-${rowData.processStatus}`}>{rowData.processStatus} </span>;
    }

    return (
        <div>
            <div className="card">
                <DataTable header="İşlemler" value={values} responsiveLayout="scroll" loading={loading}  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} >
                    <Column field="id" header="İşlem ID"></Column>
                    <Column field="optimizationType" header="İşlem"></Column>
                    <Column field="processStatus" header="Durum" body={statusBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                    <Column field="createDate" header="İşlem Talep Tarihi"></Column>
                    <Column field="updateDate" header="İşlem Tamamlanma Tarihi"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default RPowerList;