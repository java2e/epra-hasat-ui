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
import { UserService } from '../service/UserService';
import { Dropdown } from 'primereact/dropdown';
import { CompanyService } from '../service/CompanyService';
const UserManagement = () => {
    let emptyUser = {
        id: null,
        name: '',
        surname: '',
        email: '',
        company: [],
        companyId:'',
        status: 'AKTIF'
    };

    const [companyId,setCompanyId] = useState(null);

    
    const [dropdownItem, setDropdownItem] = useState(null);
    const [dropdownItems, setDopdownItems] = useState(null);
    const _userService = new UserService();
    const _companyService = new CompanyService();
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(emptyUser);

//___________________________________________________
    const [userDialog, setUserDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {        
        _userService.getUserList().then(data => {
            console.log(data)
            setUsers(data.object);
        });
        _companyService.getCompanys().then(data =>{
            console.log(data)
            setDopdownItems(data.object)
        })
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

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
            
            if (user.id) {
                const index = findIndexById(user.id);

                _users[index] = _user;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Updated', life: 3000 });
            }
            else {

                console.log(companyId);
                debugger

                const data = {
                    ...user,
                    companyId:companyId
                }
                debugger
                _userService.saveUser(data).then(res => {
                    console.log(res)
                    if(res.success){                       
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user created', life: 3000 });
                        alert(res.object.name +'"s password  = '+res.object.password);
                    }else{
                        toast.current.show({ severity: 'eror', summary: 'eror', detail: res.message, life: 3000 });
                    }
                }
                    );
                           
                _users.push(_user);
                
            }
            
            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
        }
    }

    const editProduct = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    }

    const confirmDeleteProduct = (user) => {
        setUser(user);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _users = users.filter(val => val.id !== user.id);
        setUsers(_users);
        setDeleteProductDialog(false);
        setUser(emptyUser);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }


    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _users = users.filter(val => !selectedProducts.includes(val));
        setUsers(_users);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'users Deleted', life: 3000 });
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
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        )
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">id</span>
                {rowData.id}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const surnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Surname</span>
                {rowData.surname}
            </>
        );
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {formatCurrency(rowData.email)}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Company</span>
                {rowData.company.name}
            </>
        );
    }


    const statusBodyTemplate = (rowData) => {        
            return (
                <>
                    <span className="p-column-title">Status</span>
                    {rowData.status}
                </>
            );
        
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil"  className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} >Ekle</Button>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
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
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={users} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={globalFilter} emptyMessage="No User found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                        <Column field="id" header="ID" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="surname" header="Surname" body={surnameBodyTemplate}   headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="email" header="Email" body={emailBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="company" header="Company" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={userDialog} style={{ width: '450px' }} header="User Detail" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        {user.image && <img src={`assets/demo/images/user/${user.image}`} alt={user.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                            {submitted && !user.name && <small className="p-invalid">required!</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="surname">Surname</label>
                            <InputText id="surname" value={user.surname} onChange={(e) => onInputChange(e, 'surname')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.surname })} />
                            {submitted && !user.surname && <small className="p-invalid">required!</small>}
                        </div>
                     

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                            {submitted && !user.email && <small className="p-invalid">required!</small>}
                        </div>
                     

                        {/*  <div className="field">
                            <label htmlFor="companyId">Company</label>
                            <InputText id="companyId" value={user.companyId} onChange={(e) => onInputChange(e, 'companyId')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.companyId })} />
                            {submitted && !user.companyId && <small className="p-invalid">required!</small>}
                        </div>  */}
                        <div className="field">
                        <label htmlFor="companyId">Compnay</label>
                        debugger
                        <Dropdown id="companyId" optionValue='id' value={companyId} onChange={(e) => {
                            debugger
                            console.log(e);
                            setCompanyId(e.target.value);
                            
                        }} options={dropdownItems} optionLabel="name" placeholder="Select Compnay"></Dropdown>
                       </div> 
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Are you sure you want to delete <b>{user.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Are you sure you want to delete the selected users?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(UserManagement, comparisonFn);