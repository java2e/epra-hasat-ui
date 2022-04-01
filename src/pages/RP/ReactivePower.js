import React, { useEffect, useRef, useState } from 'react';

import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { ReactivePowerService } from '../../service/ReactivePower/ReactivePowerService';
import { FeederService } from '../../service/FeederService';
import OptimizationRightContext from '../../components/optimization/OptimizationRightContext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { Message } from 'primereact/message';
import { MultiSelect } from 'primereact/multiselect';
import './RPowerList.css';
import { Skeleton } from 'primereact/skeleton';
const ReactivePower = (props) => {

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
    const rPowerService = new ReactivePowerService();
    const feederService = new FeederService();

    const [feederList, setFeederList] = useState([]);
    const [visibleDrop, setVisibleDrop] = useState(false);
    const [dropdownItem, setDropdownItem] = useState(null);
    const [dropdownItems, setDropdownItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const toastBR = useRef(null);
    const history = useHistory();
    const [isSelectPV, setIsSelectPVs] = useState(false);

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


    const [capacityOfNewPv, setCapacityOfNewPv] = useState('');
    const dropdownItems2 = [
        { name: 'Default', code: '1' },
        { name: 'Customized', code: '2' },
    ];

    const [newCapacity, setNewCapacity] = useState(false);

    const months  = [1,2,3,4,5,6,7,8,9,10,11,12];
    const days  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
                    20,21,22,23,24,25,26,27,28,29,30,31];
    const hours  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
                        20,21,22,23,24];               

    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');



    const changeFeeder = (data) => {
        debugger
        setFeederId(data);
        rPowerService.getFeederInPvData(data.id).then(res => {
            if (res.success) {
                setDropdownItems(res.object);
            }

        })

        setVisibleDrop(false)
        setNewPvItems([])
        setIsSelectPVs(true)
    }

    const avaiableRPowerDropHandler = (data) => {
        setDropdownItem(data)
       
    }
        //month
    const monthsChangeHandler = (data) => {
        setMonth(data);
        
    }
    const daysChangeHandler = (data) => {
        setDay(data);
        
    }
    const hoursChangeHandler = (data) => {
        setHour(data);
        
    }


    const newPVCapacityInputHandler = (event, i) => {
        const vals = [...pvValues];
        const val = vals[i];
        val.value = event.value;
        vals[i] = val;
        setPvValues(vals);
    }


  

    const execute = async () => {

        const ReactivePowerOp = {
            feederId: feederId.id,
            month:month,
            day:day,
            hour:hour,
            pvData: dropdownItem
        }

        const response = await rPowerService.exeucte(ReactivePowerOp);

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
                                <label htmlFor="name1">Fider</label>
                                <Dropdown id="state" value={feederId} onChange={(e) => changeFeeder(e.value)} options={feederList} optionLabel="name" placeholder="Feeder Seçiniz"></Dropdown>
                            </div>
                            {isSelectPV && <div className="field">
                                <label htmlFor="state">Reaktif Güç Desteği Alınacak PV'ler</label>
                                <MultiSelect value={dropdownItem} options={dropdownItems} onChange={(e) => avaiableRPowerDropHandler(e.value)} optionLabel="name" placeholder="Pv Seçiniz" maxSelectedLabels={3} />
                            </div>
                            }
                           
                            {isSelectPV &&<div className="p-fluid grid formgrid">
                            <div className="field col-12 md:col-4">
                                    <label htmlFor="age1">Ay</label>
                                    <Dropdown id="month" value={month}                                        
                                        onChange={(e) => monthsChangeHandler(e.value)}
                                        options={months}                                        
                                        placeholder="Ay Seçiniz" ></Dropdown>
                              </div>
                              <div className="field col-12 md:col-4">
                                    <label htmlFor="age1">Gün</label>
                                    <Dropdown id="day" value={day}                                         
                                         onChange={(e) => daysChangeHandler(e.value)}
                                        options={days}                                        
                                        placeholder="Gün"  ></Dropdown>
                             </div>
                             <div className="field col-12 md:col-4">
                                    <label htmlFor="age1">Saat</label>
                                    <Dropdown id="hour" value={hour}                                        
                                         onChange={(e) => hoursChangeHandler(e.value)}
                                        options={hours}                                        
                                        placeholder="Seçiniz" ></Dropdown>
                            </div>
                            </div>
                            }
                            
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

export default ReactivePower;