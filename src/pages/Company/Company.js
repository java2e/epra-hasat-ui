import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CompanyForm from './CompnayForm';
import { CompanyService } from '../../service/CompanyService';
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { UserService } from '../../service/UserService';

const Company = () => {

    const emptyCompany = {
        id:null,
        name: '',
        email: '',
        address: '',
        status:'',
        user:'',
        userId:'',
        
    }
    
    const [companys, setCompanys] = useState([]);
    const [users, setUsers] = useState();
    const _companyService = new CompanyService();
    const _userService = new UserService();
    const toast = useRef(null);
    const [deleteDialog,setDeleteDialog] = useState(false); 
    
    useEffect(() => {        
        _companyService.getCompanys().then(data => {
            setCompanys(data.object)});
    }, []); 


    const [company, setCompany] = useState(emptyCompany);
    const onInputChange = (e, name) => {
        debugger
        const val = (e.target && e.target.value) || '';
        let _company = { ...company };
        _company[`${name}`] = val;
        setCompany(_company)
    }
    const editCompany=(data) =>{
        debugger
        setCompany(emptyCompany)
        setCompany(data);
        _userService.getCompanyUserList(data.id).then(res =>{
        setUsers(res.object);    
        })
        
    }
    const confirmDelete =(data)=>{
        setCompany(data);
        setDeleteDialog(true);

    }
    const _delete=()=>{
        _companyService.deleteCompany(company.id).then(res=>{
            debugger
        if(res.success){
        _companyService.getCompanys().then(res=>{
           setCompanys(res.object); 
        });
        }
        })
        setDeleteDialog(false);
    }
    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }
    const deleteDialogFooter = ( //delete company
    <>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={_delete} />
    </>
);
    const actionBodyTemplate = (rowData) => {
        return (
         <div className="actions">
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCompany(rowData)} ></Button>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() =>  confirmDelete(rowData)} />
        </div>
        )       
}

    const companySave = () => {

        
        _companyService.saveCompany(company).then(res =>{    
            if(res.success){
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Company Added !', life: 3000 });
            }  
        });            
    
    }
    return (
        <div>
            <Toast ref={toast} />
            <CompanyForm save={companySave} company={company}  users = {users} editCompany= {editCompany} onInputChange={onInputChange} />
            <div className="card">
                <DataTable header="Company List" value={companys} responsiveLayout="scroll" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="id" sortable header="Id"></Column>
                    <Column field="name" sortable header="Company name"></Column>
                    <Column field="email" sortable header="E-mail"></Column>
                    <Column field="address" sortable header="Adres"></Column>
                    <Column field="status" sortable header="Durum"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
            <div>
            <Dialog visible={deleteDialog} style={{ width: "450px" }} header="Silme Onay" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }}/>
              {company && ( <span> <b>{company.name}</b>Silmek İstiyormusunuz ? </span> )}
            </div>
          </Dialog>
            </div>
        </div>
    );
}

export default Company;