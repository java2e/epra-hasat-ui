
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../service/ProductService';
import { PVLocationService } from '../../service/PVLocation/PVLocationService';
import { Button } from 'primereact/button';
import './PVLocationList.css';
import { useHistory } from 'react-router-dom';


const PVLocationList = () => {
    const pvLocationService = new PVLocationService();
    const [loading,setLoading] = useState(false);
    const [values,setValues] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        const dataLoad = async () => {
            const response = await pvLocationService.getPVLocationResultList();
            debugger
            if(response.success) {
                debugger
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
        history.push({pathname:"/pvLocationResult",state:data})
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
               <Button disabled={rowData.processStatus === 'COMPLETED'} label="Sonucu Göster" className="p-button-success" onClick={() => showResult(rowData)} />
            </React.Fragment>
        );
    }

    const statusBodyTemplate = (rowData) => {
        debugger
        return <span className={`pv-badge status-${rowData.processStatus}`}>{rowData.processStatus}</span>;
    }

    return (
        <div>
            <div className="card">
                <DataTable header="İşlemler" value={values} responsiveLayout="scroll" loading={loading}>
                    <Column field="id" header="İşlem ID"></Column>
                    <Column field="optimizationType" header="İşlem"></Column>
                    <Column field="processStatus" header="Durm" body={statusBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                    <Column field="createDate" header="İşlem Tarihi"></Column>
                    <Column field="updateDate" header="Tamamlanan Tarih"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default PVLocationList;