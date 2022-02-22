
import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { PickList } from 'primereact/picklist';
import { AutoComplete } from 'primereact/autocomplete';
import { Divider } from 'primereact/divider';


const UserAuthForm = (props) => {

    const [selectedAutoValue, setSelectedAutoValue] = useState(null);



    const listValue = [
        { name: 'San Francisco', code: 'SF' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Berlin', code: 'BRL' },
        { name: 'Barcelona', code: 'BRC' },
        { name: 'Rome', code: 'RM' },
    ];

    const [picklistSourceValue, setPicklistSourceValue] = useState(listValue);
    const [picklistTargetValue, setPicklistTargetValue] = useState([]);

    return (

        <div className="col-12">
            <div className="col-12 lg:col-8">
                <div className="card">
                    <h5>Kullanıcı Bilgisi</h5>
                    <AutoComplete placeholder="Kullanıcı Seçiniz" id="dd" dropdown multiple value={selectedAutoValue} field="Kullanıcı" />
                    <Divider />
                    <h5>Fider Listesi</h5>
                    <PickList source={picklistSourceValue} target={picklistTargetValue} sourceHeader="Fiderler" targetHeader="Yetkiler" itemTemplate={(item) => <div>{item.name}</div>}
                        onChange={(e) => { setPicklistSourceValue(e.source); setPicklistTargetValue(e.target) }} sourceStyle={{ height: '200px' }} targetStyle={{ height: '200px' }}></PickList>
                <Divider />
                <Button label="Ekle / Güncelle"></Button>

                </div>
            </div>
        </div>

    )
}

export default UserAuthForm;