
import React, { useEffect, useState } from 'react';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import GoogleMap from '../../components/optimization/GoogleMap';
import BarChart from '../../components/optimization/BarChart';
import { Dropdown } from 'primereact/dropdown';
import { FeederService } from '../../service/FeederService';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ReactivePowerService } from '../../service/ReactivePower/ReactivePowerService';


const ReactivePower = (props) => {
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];
    const emptyFeederInfo = {
        demand: '',
        load: '',
        totalPvInsCap: ''
    }

    const emptyData = {
        label: [],
        activePower: []
    }


    const _reactivePowerService = new ReactivePowerService();
    const _feederService = new FeederService();

    const [feederInfo, setFeederInfo] = useState(emptyFeederInfo);
    const [feederList, setFeederList] = useState([]);
    const [barChartData, setBarChartData] = useState(emptyData);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            const res = await _reactivePowerService.getFeederInfo(1);
            if (res.success) {
                setFeederInfo(res.object);
            }
            else {

            }

            const resFeederList = await _feederService.getFeeders();

            if (resFeederList.success) {
                debugger
                setFeederList(resFeederList.object);
            }

            const resAnnualLoadList = await _reactivePowerService.getFeederAnnualLoadChart(1);

            if (resAnnualLoadList.success) {
                setBarChartData(resAnnualLoadList.object);
            }


        }

        loadData().then(res => {
            setLoading(false);
        });



    }, [])


    const loadingItem = <div>
    <h5>Harita yükleniyor....</h5>
    <ProgressSpinner />
</div>




    return (

        <div className="col-12">
            <div className="card">
                <h5>Reactive Power Optimization</h5>
                <div className="grid">
                    <div className="col-4">
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12">
                                <label htmlFor="name1">Feeder Selection</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={feederList} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                            <div className="field col-12">
                                <label htmlFor="email1">PV Selection</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                            <div className="field col-12">
                                <label htmlFor="age1">Maximum Attainable PF</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                            <div className="field  col-12 md:col-4">
                                <label htmlFor="age1">Date / Time</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                            <div className="field  col-12 md:col-4">
                                <label htmlFor="age1">Date / Time</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                            <div className="field  col-12 md:col-4">
                                <label htmlFor="age1">Date / Time</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                        <Divider layout="vertical">
                        </Divider>
                    </div>
                    <div className="col-6 align-items-center justify-content-center">

                        {loading && loadingItem}
                        {!loading && <GoogleMap />}

                        <Divider layout="horizontal" align="center" />
                        <BarChart data={barChartData} />
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

export default ReactivePower;