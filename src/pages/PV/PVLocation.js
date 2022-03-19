import React, { useEffect, useRef, useState } from 'react';

import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { PVLocationService } from '../../service/PVLocation/PVLocationService';
import { FeederService } from '../../service/FeederService';
import OptimizationRightContext from '../../components/optimization/OptimizationRightContext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { Message } from 'primereact/message';



const PVLocation = (props) => {

    const initValues = [
        {
            value: 0.0,
            active: false
        },
        {
            value: 0.0,
            active: false
        },
        {
            value: 0.0,
            active: false
        },
        {
            value: 0.0,
            active: false
        },
        {
            value: 0.0,
            active: false
        }
    ];


    const [newPvItems, setNewPvItems] = useState([]);
    const [pvValues, setPvValues] = useState(initValues);
    const [feederId, setFeederId] = useState('');
    const pvLocationService = new PVLocationService();
    const feederService = new FeederService();

    const [feederList, setFeederList] = useState([]);
    const [visibleDrop, setVisibleDrop] = useState(false);
    const [dropdownItem, setDropdownItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const toastBR = useRef(null);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            const resFeederList = await feederService.getFeeders();
            if (resFeederList.success) {
                setFeederList(resFeederList.object);
            }
        }

        loadData().then(res => {
            setLoading(false);
        });

    }, [])


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


    const changeFeeder = (data) => {


        setFeederId(data);
    }

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


    const newPVCapacityInputHandler = (event, i) => {
        const vals = [...pvValues];
        const val = vals[i];
        val.value = event.value;
        vals[i] = val;
        setPvValues(vals);
    }


    const newPVDropHandler = (data) => {
        setCapacityOfNewPv(data.value);
        if (data.value.code === '2') {
            for (let i = 0; i < pvNumber.code; i++) {
                const vals = [...pvValues];
                const val = vals[i];
                val.active = true;
                vals[i] = val;
                setPvValues(vals);
            }
        }
        else {
            setPvValues(initValues);

        }

    }

    const execute = async () => {

        const listCapacity = pvValues.map((item) => {
            return parseFloat(item.value);
        })

        const data = {
            feederId: feederId.id,
            pvCapacitys: listCapacity
        }


        const response = await pvLocationService.exeucte(data);

        if (response.success) {
            toastBR.current.show({ severity: 'success', summary: 'Sonuc için bekleyiniz', detail: 'Başarılı', life: 3000 });
            history.push("/pvLocationResults")
        }
        else {
            toastBR.current.show({ severity: 'error', summary: 'Error Message', detail: response.message, life: 3000 });
        }

    }




    return (
        <div className="col-12">
            <Toast ref={toastBR} position="bottom-right" />

            <div className="card">
                <h5>PV Location Optimization</h5>
                <div className="grid">
                    <div className="col-4">
                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="name1">Feeder Selection</label>
                                <Dropdown id="state" value={feederId} onChange={(e) => changeFeeder(e.value)} options={feederList} optionLabel="name" placeholder="Feeder Seçiniz"></Dropdown>
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
                            <div className="field" style={{ display: pvValues[0].active ? '' : 'none' }}>
                                <label htmlFor="pv1">PV 1(kW):</label>
                                <InputNumber id="pv1" value={pvValues[0].value} onChange={(e) => newPVCapacityInputHandler(e, 0)} min={0} max={1000} />
                            </div>
                            <div className="field" style={{ display: pvValues[1].active ? '' : 'none' }}>
                                <label htmlFor="pv2">PV 2(kW):</label>
                                <InputNumber id="pv2" value={pvValues[1].value} onChange={(e) => newPVCapacityInputHandler(e, 1)} min={0} max={1000} />
                            </div>
                            <div className="field" style={{ display: pvValues[2].active ? '' : 'none' }}>
                                <label htmlFor="pv3">PV 3(kW):</label>
                                <InputNumber id="pv3" value={pvValues[2].value} onChange={(e) => newPVCapacityInputHandler(e, 2)} min={0} max={1000} />
                            </div>
                            <div className="field" style={{ display: pvValues[3].active ? '' : 'none' }}>
                                <label htmlFor="pv3">PV 4(kW):</label>
                                <InputNumber id="pv3" value={pvValues[3].value} onChange={(e) => newPVCapacityInputHandler(e, 3)} min={0} max={1000} />
                            </div>
                            <div className="field" style={{ display: pvValues[4].active ? '' : 'none' }}>
                                <label htmlFor="pv3">PV 5(kW):</label>
                                <InputNumber id="pv3" value={pvValues[4].value} onChange={(e) => newPVCapacityInputHandler(e, 4)} mode="decimal" min={0} max={1000} />
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                        <Divider layout="vertical">
                        </Divider>
                    </div>

                    {feederId === '' && <div className="col-6 align-items-center justify-content-center">
                    <Message severity="info" text="Lütfen feeder seçiniz!" />
                    </div>}
                    {feederId !== '' && <div className="col-6 align-items-center justify-content-center">
                        <OptimizationRightContext feederId={feederId.id} />

                        <Divider align="right">
                            <Button label="Execute" icon="pi pi-search" className="p-button-outlined" onClick={execute}></Button>
                        </Divider>
                    </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default PVLocation;