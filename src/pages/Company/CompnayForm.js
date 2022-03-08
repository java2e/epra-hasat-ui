
import React, { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';


const CompanyForm = (props) => {


    const {company} = props;

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card p-fluid md:col-3">
                    <h5>Company Add / Update</h5>
                    <div className="field">
                        <label htmlFor="name1">Company Name</label>
                        <InputText value={company.name} id="name1" type="text"  onChange={(e) => props.onInputChange(e, 'name')} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value = {company.email} type="text" onChange={(e) => props.onInputChange(e, 'email')}/>
                    </div>
                    <div className="field">
                        <label htmlFor="address">Address</label>
                        <InputText id="address" valu = {company.address}type="text" onChange={(e) => props.onInputChange(e, 'address')}/>
                    </div>
                    <Button label="Save/Updadete" icon="pi pi-check" className="p-button-text" onClick={props.save} />
                </div>
            </div>
        </div>
    )
}


export default CompanyForm;