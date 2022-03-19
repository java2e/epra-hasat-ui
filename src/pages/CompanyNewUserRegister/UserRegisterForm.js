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


const UserRegisterForm = (props) => {
    let emptyUser = {
        id: null,
        name: '',
        surname: '',
        email: '',
        company: [],
        companyId:'',
        status: 'AKTIF'
    };
     
    const {companys,user,setSubmitted} = props;
    
    const [companyId,setCompanyId] = useState(null);
    const [users, setUsers] = useState(null);
    

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

                </div>
            </div>
        </div>
    );



}

export default UserRegisterForm;