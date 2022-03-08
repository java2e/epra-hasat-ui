import React, {useEffect, useState} from 'react';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import GoogleMap from '../../components/optimization/GoogleMap';
import BarChart from '../../components/optimization/BarChart';

import { Dropdown } from 'primereact/dropdown';

import { PVLocationService } from '../../service/PVLocation/PVLocationService';
import { FeederService } from '../../service/FeederService';



const PVLocation = (props) => {

    const emptyFeederInfo = {
        demand: '',
        load:'',
        totalPvInsCap:''
    }

    const emptyData = {
        label: [],
        activePower: []
    }

    const pvLocationService = new PVLocationService();
    const feederService = new FeederService();

    const [feederInfo,setFeederInfo] = useState(emptyFeederInfo);
    const [feederList,setFeederList] = useState([]);
    const [barChartData,setBarChartData] = useState(emptyData);
    


    useEffect(() => {

        const loadData = async()=> {
            const res = await pvLocationService.getFeederInfo(1);
            if(res.success){
               setFeederInfo(res.object);
            }
            else {

            }

            const resFeederList = await feederService.getFeeders();

            if(resFeederList.success) {
                setFeederList(resFeederList.object);
            }

            const resAnnualLoadList = await pvLocationService.getFeederAnnualLoadChart(1);

            if(resAnnualLoadList.success) {
                setBarChartData(resAnnualLoadList.object);
            }

   
        }

        loadData();



    },[])

    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'YES', code: 'YES' },
        { name: 'NO', code: 'NO' },
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
                        <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={feederList} optionLabel="name" placeholder="Feeder Seçiniz"></Dropdown>
                    </div>
                    <div className="field">
                        <label htmlFor="email1">Optimization For Avaiable PVs</label>
                        <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Seçiniz"></Dropdown>
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

                    <BarChart data={barChartData}  />

                    <Divider align="right">
                    </Divider>

                    <p>Annual demand of feeder is <span><b>{feederInfo.demand} </b></span>GWh.</p>
                    <p>Peak load of feeder is <span><b>{feederInfo.load}</b></span> MW.</p>
                    <p>PV installed capacity is <span><b>{feederInfo.totalPvInsCap}</b></span> MW.</p>
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