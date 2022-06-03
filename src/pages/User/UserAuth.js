
import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserAuthForm from './UserAuthForm';
import { UserService } from '../../service/UserService';
import { FeederService } from '../../service/FeederService';
import { FeederUserPathService } from '../../service/FeederUserPathService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";

const emptyFeederUserPath = {
    userId: '',
    feeder: [],

}

const UserAuth = () => {
    const toast = useRef(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [feeders, setFeeders] = useState([]);
    const [feederUserPathList, setFeederUserPathList] = useState([]);
    const _userService = new UserService();
    const _feederService = new FeederService();
    const _feederUserPathService = new FeederUserPathService();
    const [feederUserPath, setFeederUserPath] = useState(emptyFeederUserPath);
    const [deleteFeederUserPath, setDeleteFeederUserPath] = useState(emptyFeederUserPath);
    const [deleteDialog,setDeleteDialog] = useState(false); 

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            await _userService.getUserList().then(res => {
                setUsers(res.object);
            });
            await _feederService.getFeeders().then(res => {
                setFeeders(res.object); 
                setIsLoading(false);
            });
            await _feederUserPathService.getAllFeederUserPath().then(res => {
                setFeederUserPathList(res.object);
            });
        }
        getData().catch(err => {
            toast.current.show({ severity: 'error', summary: 'error', detail: 'Hata', life: 3000 })
        });


    }, []);

    const save = async () => {
       
       const res = await _feederUserPathService.saveFeederUserPath(feederUserPath).then(res => {
            if (res.success) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });               
            }
        });



    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil"  className="p-button-rounded p-button-success mr-2" onClick={() => editFeederUserPAth(rowData.user.id)} ></Button>
               
            </div>
        );
    }
    const editFeederUserPAth = (id) => {       
          
      _feederUserPathService.getUserInFeeder(id).then(res =>{         
            setFeederUserPath({ ...res.object });  
      })
      
       
       
    }
    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }
    const _delete=()=>{
          
        _feederUserPathService.deleteFeederUserPath(deleteFeederUserPath.id).then(res =>{
            if (res.success) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });

             _feederUserPathService.getAllFeederUserPath().then(res => {
                    setFeederUserPathList(res.object);
                });
               
            }
            
        })
        
       
        setDeleteDialog(false);
    }
    const deleteDialogFooter = ( //delete company
    <>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={_delete} />
    </>
    
);
    const confirmDelete = (feederUserPath) => {    
          
        setDeleteFeederUserPath(feederUserPath);  
        setDeleteDialog(true);


    }

    return (
        <div>
            <Toast ref={toast} />
            {!isLoading &&
                <UserAuthForm users={users} feeders={feeders} feederUserPath={feederUserPath} save={save} editFeederUserPAth={editFeederUserPAth}/>}
            <div className="card">
                <DataTable header="Kullanıcı Fider Yetki Listesi" value={feederUserPathList} responsiveLayout="scroll" sortField="id" sortOrder={1}>
                    <Column field="id"sortable header="ID"></Column>
                    <Column field="feeder.name" sortable header="Fider Adı"></Column>
                    <Column field="user.name" sortable header="Adı"></Column>
                    <Column field="user.surname" sortable header="Soyadı"></Column>
                    <Column field="user.company.name" sortable header="Şirket Adı"></Column>
                    <Column field="status" sortable header="Durum"></Column> 
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
                <Dialog visible={deleteDialog} style={{ width: "450px" }} header="Silme Onay" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                    <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }}/>
                    {deleteFeederUserPath && ( <span> <b>{deleteFeederUserPath.feeder.name}</b>  &nbsp; silmek istiyor musunuz? </span> )}
            </div>
          </Dialog>
            </div>

        </div>
    );
}

export default UserAuth;