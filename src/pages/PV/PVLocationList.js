
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
       
        history.push({pathname:"/pvLocationResult/"+data.id})
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
               <Button disabled={rowData.processStatus !== 'COMPLETED'} label="Sonucu Göster" className="p-button-success" onClick={() => showResult(rowData)} />
            </React.Fragment>
        );
    }

    const statusBodyTemplate = (rowData) => {         
        return <span className={`pv-badge status-${rowData.processStatus}`}>{rowData.processStatus}</span>;
    
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
            <div className="card">
                <DataTable header="İşlemler" value={values} responsiveLayout="scroll" loading={loading}  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} >
                    <Column field="id" sortable header="İşlem ID"></Column>
                    <Column field="optimizationType" header="İşlem" body={optimizationTypeBodyTemplate}></Column>
                    <Column field="processStatus" sortable header="Durum" body={statusBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                    <Column field="createDate" header="İşlem Talep Tarihi" data-type="date" data-format="DD/MM/YYYY hh:mm"></Column>
                    <Column field="updateDate" header="İşlem Tamamlanma Tarihi"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default PVLocationList;