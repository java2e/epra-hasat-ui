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
import { Checkbox } from 'primereact/checkbox';


const UserRegisterForm = (props) => {
    let emptyUser = {
        id: null,
        name: '',
        surname: '',
        email: '',
        company: [],
        companyId: '',
        status: 'AKTIF',
        role:''
    };
    let statuss = [
        { label: 'AKTIF' },
        { label: 'PASIF' }]

    const { companys, user, setSubmitted } = props;
    const [chekboxValue, setChekboxValue] = useState(null);
    const [users, setUsers] = useState(null);
    const chekedHandler =(data) => {     
        debugger       
        setChekboxValue(data)
        user.role='ROLE_COMPANY_ADMIN';    
    }
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <div className="field">
                        <label htmlFor="name">Adı</label>
                        <InputText id="name" value={user.name} onChange={(e) => props.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': setSubmitted && !user.name })} />
                        {setSubmitted && !user.name && <small className="p-invalid">required!</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="surname">Soyadı</label>
                        <InputText id="surname" value={user.surname} onChange={(e) => props.onInputChange(e, 'surname')} required autoFocus className={classNames({ 'p-invalid': setSubmitted && !user.surname })} />
                        {setSubmitted && !user.surname && <small className="p-invalid">required!</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={user.email} onChange={(e) => props.onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': setSubmitted && !user.email })} />
                        {setSubmitted && !user.email && <small className="p-invalid">required!</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="phone">Telefon</label>
                        <InputText id="phone" value={user.phone} onChange={(e) => props.onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': setSubmitted && !user.phone })} />
                        {setSubmitted && !user.phone && <small className="p-invalid">required!</small>}
                    </div>

                    {companys && <div className="field">
                        <label htmlFor="age1">Firma</label>
                        <Dropdown id="companyId" value={user.companyId}
                            onChange={(e) => props.onInputChange(e, 'companyId')}
                            options={companys}
                            optionLabel="name"
                            optionValue='id'
                            placeholder="Seçiniz"></Dropdown>
                    </div>
                    }
                    {user.id != null && <div className="field">
                        <label htmlFor="age1">Durum</label>
                        <Dropdown id="status" value={user.status}
                            onChange={(e) => props.onInputChange(e, 'status')}
                            options={statuss}
                            optionLabel="label"
                            optionValue='label'
                            placeholder="Seçiniz"></Dropdown>
                    </div>
                    }
                    <div className="field">
                        <label htmlFor="age1">Firma Admin  </label>
                        <Checkbox onChange={(e) => chekedHandler(e.checked)} checked={chekboxValue}></Checkbox>
                    </div>


                </div>
            </div>
        </div>
    );



}

export default UserRegisterForm;