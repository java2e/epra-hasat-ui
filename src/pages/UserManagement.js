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
import UserRegisterForm from './CompanyNewUserRegister/UserRegisterForm';
import { getDateMeta } from '@fullcalendar/core';
const UserManagement = () => {
    let emptyUser = {
        id: null,
        name: '',
        surname: '',
        email: '',
        phone:'',
        company: [],
        companyId: '',
        status: 'AKTIF',
        confirm: null,
        role:'',
    };

    const [companyId, setCompanyId] = useState(null);
    const [companys, setCompanys] = useState(null);
    const [users, setUsers] = useState(null);
    const [confirmUsers, setConfirmUser] = useState(null);
    const [refusemUsers, setRefuseUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [confirmButtons, setConfirmButtons] = useState(false);
    const [goBack, setGoBack] = useState(false);
    const [filterButton, setFilterButton] = useState(false);
    const [allButton, setAllButton] = useState(false);
    const [filterUsers, setFilterUsers] = useState(null);
    const [transientUserList, setTransientUserList] = useState(null);
    const _userService = new UserService();
    const _companyService = new CompanyService();
    //___________________________________________________

    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [confirmUserDialog, setconfirmUserDialog] = useState(false);
    const [refuseUserDialog, setRefuseUserDialog] = useState(false);

    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [size, setSize] = useState(null);

    useEffect(() => {
        setLoading(true);

        const loadData = async () => {
            await _userService.getUserList().then(data => {
                setUsers(data.object);
                setFilterUsers(data.object);
            });

            await _userService.getConfirmUserList().then(data => {
                setConfirmUser(data.object);
                setSize(data.object.length);
            });

            await _companyService.getCompanys().then(data => {
                setCompanys(data.object)
            })
        }
        loadData().then(res => {
            setLoading(false);
        });



    }, []);


    const reloadData = async () => {
        setLoading(true);
        await _userService.getUserList().then(data => {
            setUsers(data.object);
            setTransientUserList(users);
        });

        await _userService.getConfirmUserList().then(data => {
            setConfirmUser(data.object);
            setSize(data.object.length);
        });

        await _companyService.getCompanys().then(data => {
            setCompanys(data.object)
        })
        

    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }

    const filterActiveUser = () => {        
        setFilterButton(true);
        setAllButton(true);
        setUsers(filterUsers.filter(x => x.status == 'AKTIF'))

    }
    const filterPasiveUser = () => {
        setFilterButton(false);
        setAllButton(true);
        setUsers(filterUsers.filter(x => x.status == 'PASIF'))

    }
    const filterAllUser = () => {        
        setAllButton(true);
        setUsers(filterUsers);

    }
    const loadWaitConfirmUserList = () => {  
        setTransientUserList(users)      
        setUsers(confirmUsers);        
        setConfirmButtons(true);
        setGoBack(true);
    }

    const goBackUserList = () => {
        setUsers(transientUserList)
        setConfirmButtons(false);
        setGoBack(false);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }
    const hideConfirmUserDialog = () => {
        setconfirmUserDialog(false);
    }
    const hideRefuseUserDialog = () => {
        setRefuseUserDialog(false);
    }

    const refuseUser = (user) => { //Kullanıcı Reddetme          
        user.confirm = false;
        setUser(user);
        setRefuseUserDialog(true);
    }

    const editUser = (user) => { //Kullanıcı Update        
        user.companyId = user.company.id;
        setUser({ ...user });
        setUserDialog(true);

    }
    const confirmDeleteUser = (user) => { //Kullanıcı Silme         
        user.status = 'PASIF';
        setUser(user);
        setDeleteUserDialog(true);
    }
    const confirmConpanyUser = (user) => { //Kullanıcı Onay  
        user.confirm = true;
        setUser(user);
        setconfirmUserDialog(true);
    }



    //User Save 
    const saveUser = () => {
        setSubmitted(true);
        if (user.name.trim()) {
            if (user.id) {
                _userService.updateUser(user).then(res => {
                    console.log(res)
                    if (res.success) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                        _userService.getUserList().then(data => {
                            setUsers(data.object);
                            setTransientUserList(users);
                        });   
                    } else {
                        toast.current.show({ severity: 'eror', summary: 'eror', detail: res.message, life: 3000 });
                    }
                });

            }
            else {
                console.log(companyId);
                const data = {
                    ...user,
                    companyId: companyId
                }
                _userService.saveUser(data).then(res => {
                    console.log(res)
                    if (res.success) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                        alert(res.object.name + "Şiresi Mail Olarak Gönderiliyor....!");
                        _userService.getUserList().then(data => {
                            setUsers(data.object);
                            setTransientUserList(users);
                        });
                       
                    } else {
                        toast.current.show({ severity: 'eror', summary: 'eror', detail: res.message, life: 3000 });
                    }
                }
                );
             }


            setUserDialog(false);
            setUser(emptyUser);
        }
    }

    //Company User Confirm
    const companyUserConfirm = (data) => {
        debugger
        if (data) {
            setconfirmUserDialog(false);
        } else {
            setRefuseUserDialog(false);
        }
        _userService.postConfirmUser(user).then(res => {
            if (res.success) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                setUser(emptyUser);
                _userService.getConfirmUserList().then(data => {
                    setUsers(data.object);                    
                        setConfirmUser(data.object);
                        setSize(data.object.length);
                   
                    setSize(data.object.length);
                });

            } else {
                toast.current.show({ severity: 'eror', summary: 'eror', detail: res.message, life: 3000 });
            }
        });

    }
    //User Delete
    const deleteUser = () => {
        let _users = users.filter(val => val.id !== user.id);
        setUsers(_users);
        setDeleteUserDialog(false);
        _userService.deleteUser(user).then(res => {
            if (res.success) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                setUser(emptyUser);
                
            } else {
                toast.current.show({ severity: 'eror', summary: 'eror', detail: res.message, life: 3000 });
            }
        });

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



    const onInputChange = (e, name) => {
        debugger
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setCompanyId(e.value);
        setUser(_user);
    }


    const leftToolbarTemplate = () => { //new button
        if (!goBack) {
            return (
                <React.Fragment>
                    <div className="my-2">
                        <Button label="Yeni Kullanıcı Ekle" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    </div>

                    {!filterButton && <div className="my-2">
                        <Button label="Aktif Kullanıcılar" icon="pi" className="p-button-info mr-2" onClick={filterActiveUser} />
                    </div>
                    }
                    {filterButton && <div className="my-2">
                        <Button label="Pasif Kullanıcı Listesi" icon="pi" className="p-button-info mr-2" onClick={filterPasiveUser} />
                    </div>
                    }
                   <div className="my-2">
                    <Button label="Tüm Kullanıcı Kullanıcı Listesi" icon="pi" className="p-button-help" onClick={filterAllUser} />
                </div>
                
                </React.Fragment>
            )
        }
    }

    const rightToolbarTemplate = () => {  //User confirm
        if (!goBack) {
            return (
                <React.Fragment>
                    <div className="my-2">
                        <Button label="Onay Bekleyen Kullanıcılar" icon="pi pi-users" className="p-button-warning" badge={size} badgeClassName="p-badge-danger" onClick={loadWaitConfirmUserList} />

                    </div>
                </React.Fragment>
            )
        } else if (goBack) {
            return (
                <React.Fragment>
                    <div className="my-2">
                        <Button label="<--Kullanıcı Listesi" icon="pi pi-users" className="p-button-help" badgeClassName="p-badge-help" onClick={goBackUserList} />
                    </div>
                </React.Fragment>
            )
        }
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

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData.role}
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(rowData)} ></Button>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    }
    const confirmActionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => refuseUser(rowData)}></Button>
                <Button icon="pi pi-check" className="p-button-rounded" onClick={() => confirmConpanyUser(rowData)} />
            </div>
        );
    }
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Kullanıcı Liste</h5>
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
    const deleteUserDialogFooter = ( //delete user
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </>
    );

    const confirmUserDialogFooter = ( //Confirm Onay
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideConfirmUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => companyUserConfirm(true)} />
        </>
    );
    const refuseUserDialogFooter = ( //Refuse Company User
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideRefuseUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => companyUserConfirm(false)} />
        </>
    );
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    {!loading && <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>}

                    {!loading && <DataTable ref={dt} value={users} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={globalFilter} emptyMessage="No User found." header={header} responsiveLayout="scroll">
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Ad" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="surname" header="Soyad" sortable body={surnameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="company" header="Firma" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="role" header="Rol" sortable body={roleBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="status" header="Durum" sortable body={statusBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        {!confirmButtons && <Column body={actionBodyTemplate}></Column>}
                        {confirmButtons && <Column body={confirmActionBodyTemplate}></Column>}
                    </DataTable>
                    }

                    <Dialog visible={userDialog} style={{ width: '450px' }} header="User Detay" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        {user.image && <img src={`assets/demo/images/user/${user.image}`} alt={user.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <UserRegisterForm companys={companys} user={user} page={'userManagment'}onInputChange={onInputChange} ></UserRegisterForm>
                    </Dialog>

                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Kullanıcı Silme Onay" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span><b>{user.name}</b> İsimli Kullanıcıyı Silmek İstiyormusunuz ?</span>}
                        </div>
                    </Dialog>
                    <Dialog visible={confirmUserDialog} style={{ width: '450px' }} header="Onay" modal footer={confirmUserDialogFooter} onHide={hideConfirmUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span><b>{user.name}</b> İsimli Kullanıcıyı Onaylıyormusunuz?</span>}
                        </div>
                    </Dialog>
                    <Dialog visible={refuseUserDialog} style={{ width: '450px' }} header="Kullanıcı Reddetme" modal footer={refuseUserDialogFooter} onHide={hideRefuseUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span><b>{user.name}</b> İsimli Kullanıcıyı Reddetmek İstiyormusunuz?</span>}
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