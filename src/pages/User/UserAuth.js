
import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserAuthForm from './UserAuthForm';
import { UserService } from '../../service/UserService';
import { FeederService } from '../../service/FeederService';
import { FeederUserPathService } from '../../service/FeederUserPathService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
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

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            await _userService.getUserList().then(res => {
                setUsers(res.object);
            });
            await _feederService.getFeeders().then(res => {
                setFeeders(res.object); console.log(res)
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
        console.log(feederUserPath);
       const res = await _feederUserPathService.saveFeederUserPath(feederUserPath).then(res => {
            if (res.success) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });

             _feederUserPathService.getAllFeederUserPath().then(res => {
                    setFeederUserPathList(res.object);
                });
               
            }
        });



    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil"  className="p-button-rounded p-button-success mr-2" onClick={() => editFeederUserPAth(rowData.user.id)} ></Button>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDelete(rowData)} />
            </div>
        );
    }
    const editFeederUserPAth = (id) => {

        debugger
        
      _feederUserPathService.getUserInFeeder(id).then(res =>{
        
        setFeederUserPath({ ...res.object });

      })
      
       
       
    }
    const confirmDelete = (user) => {       
    }

    return (
        <div>
            <Toast ref={toast} />
            {!isLoading &&
                <UserAuthForm users={users} feeders={feeders} feederUserPath={feederUserPath} save={save} editFeederUserPAth={editFeederUserPAth}/>}
            <div className="card">
                <DataTable header="Kullanici Fider Yetki Listesi" value={feederUserPathList} responsiveLayout="scroll">
                    <Column field="id" header="id"></Column>
                    <Column field="feeder.name" header="Feeder Adı"></Column>
                    <Column field="user.name" header="Kullanıcı Adı"></Column>
                    <Column field="user.company.name" header="Şirket Adı"></Column>
                    <Column field="status" header="Fider Sayısı"></Column> 
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

        </div>
    );
}

export default UserAuth;