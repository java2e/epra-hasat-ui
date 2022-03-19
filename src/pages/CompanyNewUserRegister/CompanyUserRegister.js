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
import { UserService } from '../../service/UserService';
import { Dropdown } from 'primereact/dropdown';

import { CompanyService } from '../../service/CompanyService';
import UserRegisterForm from './UserRegisterForm';
import DataTableList from './DataTableList';
const CompanyUserRegister = (props) => {
    let emptyUser = {
        id: null,
        name: '',
        surname: '',
        email: '',
        company: [],
        companyId:'',
        status: 'AKTIF'
    };

    let emptyUser2 = {
        id: null,
        name: '',       
        email: '',
        
      
    };

    const [companyId,setCompanyId] = useState(null);
    const [companys, setCompanys] = useState(null);
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(emptyUser);
    const _userService = new UserService();
    const _companyService = new CompanyService(); 


    const [userDialog, setUserDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    
   
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [loading,setLoading] = useState(false);

    useEffect(() => {     
        setLoading(true)
        const getData = async () => {             
       await _userService.getUserList().then(data => {
            
            console.log(data)
            setUsers(data.object);
        });
       await _companyService.getCompanys().then(data =>{
            console.log(data)
            setCompanys(data.object)
        })
    
    };

    getData().then(res =>{
        setLoading(false)
    });

    }, [props]);


    const openNew = () => {
        
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    //User Save 
    const saveUser = () => { 
        setSubmitted(true);
        
        if (user.name.trim()) {           
            
            let _users = [...users];            
            let _user = { ...user }; 

                console.log(companyId);
                 

                const data = {
                    ...user,
                    companyId:companyId
                }
                 
                _userService.saveUser(data).then(res => {
                    console.log(res)
                    if(res.success){                       
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user created', life: 3000 });
                        alert("Kullanıcı Onaylandığında Şifresi Email İle Gönderilicektir.");
                    }else{
                        toast.current.show({ severity: 'eror', summary: 'eror', detail: res.message, life: 3000 });
                    }
                }
                    );
                           
                _users.push(_user);
                
            
            
            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
        }
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                
                </div>
            </React.Fragment>
        )
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const userDialogFooter = (  // User Detail Save or Cancel
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
        </>
    );


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>                   

                    <Dialog visible={userDialog} style={{ width: '450px' }} header="User Detail" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        {user.image && <img src={`assets/demo/images/user/${user.image}`} alt={user.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                       
                       
                        <UserRegisterForm user={user} companys={companys}  onInputChange={onInputChange} ></UserRegisterForm>
                    
                    
                    
                    </Dialog>

                  
                   
                </div>
                {!loading && <DataTableList rowObje= {emptyUser2} dataList={users} setSubmitted={submitted}></DataTableList> }
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default CompanyUserRegister;