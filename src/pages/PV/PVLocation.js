import React, {useState} from 'react';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import GoogleMap from '../../components/optimization/GoogleMap';
import BarChart from '../../components/optimization/BarChart';

import { Dropdown } from 'primereact/dropdown';


const PVLocation = (props) => {
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];


    return(

        <div className="col-12">
        <div className="card">
            <h5>PV Location Optimization</h5>
            <div className="grid">
                <div className="col-4">
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="name1">Feeder Selection</label>
                        <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div className="field">
                        <label htmlFor="email1">Optimization For Avaiable PVs</label>
                        <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div className="field">
                        <label htmlFor="age1">Number of PVs to be Located</label>
                        <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div className="field">
                        <label htmlFor="age1">Capacity of new PVs</label>
                        <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                </div>
                </div>
                <div className="col-1">
                    <Divider layout="vertical">
                    </Divider>
                </div>
                <div className="col-6 align-items-center justify-content-center">
                    
                    <GoogleMap />

                    <Divider layout="horizontal" align="center" />

                    <BarChart />

                    <Divider align="right">
                    </Divider>

                    <p>Annual demand of feeder is 120 GWh.</p>
                    <p>Peak load of feeder is XXX MW.</p>
                    <p>PV installed capacity is XXX MW.</p>
                    <Divider align="right">
                        <Button label="Execute" icon="pi pi-search" className="p-button-outlined"></Button>
                    </Divider>
                </div>
            </div>
        </div>
    </div>

    )
}

export default PVLocation;