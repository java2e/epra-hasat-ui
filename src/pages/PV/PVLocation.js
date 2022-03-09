import React, { useEffect, useState } from 'react';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import GoogleMap from '../../components/optimization/GoogleMap';
import BarChart from '../../components/optimization/BarChart';

import { Dropdown } from 'primereact/dropdown';

import { PVLocationService } from '../../service/PVLocation/PVLocationService';
import { FeederService } from '../../service/FeederService';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import OptimizationRightContext from '../../components/optimization/OptimizationRightContext';



const PVLocation = (props) => {

    const emptyFeederInfo = {
        demand: '',
        load: '',
        totalPvInsCap: ''
    }

    const emptyData = {
        label: [],
        activePower: []
    }

    const pvLocationService = new PVLocationService();
    const feederService = new FeederService();

    const [feederInfo, setFeederInfo] = useState(emptyFeederInfo);
    const [feederList, setFeederList] = useState([]);
    const [barChartData, setBarChartData] = useState(emptyData);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            const res = await pvLocationService.getFeederInfo(1);
            if (res.success) {
                setFeederInfo(res.object);
            }
            else {

            }

            const resFeederList = await feederService.getFeeders();

            if (resFeederList.success) {
                setFeederList(resFeederList.object);
            }

            const resAnnualLoadList = await pvLocationService.getFeederAnnualLoadChart(1);

            if (resAnnualLoadList.success) {
                setBarChartData(resAnnualLoadList.object);
            }


        }

        loadData().then(res => {
            setLoading(false);
        });



    }, [])

    const [visibleDrop, setVisibleDrop] = useState(false);
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'YES', code: 'YES' },
        { name: 'NO', code: 'NO' },
    ];

    const [capacityOfNewPv, setCapacityOfNewPv] = useState('');
    const dropdownItems2 = [
        { name: 'Default', code: '1' },
        { name: 'Customized', code: '2' },
    ];

    const [newCapacity, setNewCapacity] = useState(false);

    const pvNumbers = [
        { name: '1', code: 1 },
        { name: '2', code: 2 },
        { name: '3', code: 3 },
        { name: '4', code: 4 },
        { name: '5', code: 5 },
    ];

    const [pvNumber, setPvNumber] = useState('');


    const avaiablePVDropHandler = (data) => {
        setDropdownItem(data)

        if (data.code === 'NO') {
            setVisibleDrop(true)
            setPvNumber(pvNumbers[0]);
            setCapacityOfNewPv(dropdownItems2[0])
        }
        else {
            setVisibleDrop(false)
            setNewPvItems([])

        }
    }

    const pvNumberChangeHandler = (data) => {
        setPvNumber(data);
        setCapacityOfNewPv(dropdownItems2[0]);
        setNewPvItems([]);
    }

    const [newPvItems, setNewPvItems] = useState([]);
    const newPVDropHandler = (data) => {
        setCapacityOfNewPv(data.value);
        let items = [];
        debugger
        if (data.value.code === '2') {
            debugger
            for (let i = 0; i < pvNumber.code; i++) {
                const element = <div className="field">
                    <label htmlFor="pv1">PV{i} :</label>
                    <InputText id="pv1" />
                </div>;
                items.push(element)
            }
            setNewPvItems(items);

        }
        else {
            setNewPvItems(items);
        }

    }

    const loadingItem = <div>
        <h5>Harita yükleniyor....</h5>
        <ProgressSpinner />
    </div>



    return (

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
                                <label htmlFor="state">Optimization For Avaiable PVs</label>
                                <Dropdown id="state" value={dropdownItem} onChange={(e) => avaiablePVDropHandler(e.value)} options={dropdownItems} optionLabel="name" placeholder="Seçiniz"></Dropdown>
                            </div>
                            <div className="field">
                                <label htmlFor="age1">Number of PVs to be Located</label>
                                <Dropdown id="state" value={pvNumber}
                                    disabled={!visibleDrop}
                                    onChange={(e) => pvNumberChangeHandler(e.value)}
                                    options={pvNumbers}
                                    optionLabel="name"
                                    placeholder="PV Sayısını Seçiniz"></Dropdown>
                            </div>
                            <div className="field">
                                <label htmlFor="age1">Capacity of new PVs</label>
                                <Dropdown id="state" value={capacityOfNewPv}
                                    disabled={!visibleDrop}
                                    onChange={newPVDropHandler}
                                    options={dropdownItems2}
                                    optionLabel="name"
                                    placeholder="Seçiniz"></Dropdown>
                            </div>
                        </div>
                        <div className="p-fluid">
                            {newPvItems}
                        </div>
                    </div>
                    <div className="col-1">
                        <Divider layout="vertical">
                        </Divider>
                    </div>

                    <OptimizationRightContext loading={loading} loadingItem={loadingItem} barChartData={barChartData} feederInfo={feederInfo} />

                </div>
            </div>
        </div>

    )
}

export default PVLocation;