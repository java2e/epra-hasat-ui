
import React, { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';


const CompanyForm = (props) => {



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card p-fluid md:col-3">
                    <h5>Şirket Ekle / Güncelle</h5>
                    <div className="field">
                        <label htmlFor="name1">Şirket Adı</label>
                        <InputText id="name1" type="text" />
                    </div>
                    <div className="field">
                        <label htmlFor="email1">Email</label>
                        <InputText id="email1" type="text" />
                    </div>
                    <div className="field">
                        <label htmlFor="age1">Adres</label>
                        <InputText id="age1" type="text" />
                    </div>
                    <Button label="Ekle / Güncelle"></Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyForm;