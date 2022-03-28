import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';


const DataTableList = (props)  => {
    // EmptyObje
    // Data []
    // Data Columun [] 
     
    const {rowObje,dataList,userDialog,user} = props;       
    const [columns,setColumns] = useState ([]);   

    //_____
    const [selectedRows, setSelectedRows] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    const [deleteDialog, setDeleteDialog] = useState(false);
   
    
    let headers = ['ID','ADI','SOYADI','EMAIL','DURUM']
     
    useEffect(()=>{       
        setColumns(Object.keys(rowObje));       
              
    },[props])
    

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Data List</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );   
 
     const actionBodyTemplate = (rowData) => {
            return (
             <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => props.editUser(rowData)} ></Button>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() =>  props.confirmDeleteUser(rowData)} />
            </div>
            )       
    }
  
    const dynamicColumns = columns.map((col,i) => {        
        return <Column key={col} sortable field={col} header={headers[i]} />;
    });


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">      
                <DataTable ref={dt} value={dataList} selection={selectedRows} onSelectionChange={(e) => setSelectedRows(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={globalFilter} emptyMessage="No User found." header={header}  responsiveLayout="scroll">
                        {dynamicColumns}                        
                        <Column body={actionBodyTemplate}></Column>
                        
                </DataTable>               
                </div>
            </div>
        </div>
    );



}

export default DataTableList;