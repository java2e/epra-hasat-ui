import React, { useEffect, useRef, useState } from 'react';

import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { ReactivePowerService } from '../../service/ReactivePower/ReactivePowerService';
import { FeederService } from '../../service/FeederService';
import OptimizationRightContext from '../../components/optimization/OptimizationRightContext_2';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { Message } from 'primereact/message';
import { MultiSelect } from 'primereact/multiselect';
import './RPowerList.css';
import { Dialog } from "primereact/dialog";
import LineChart from "../../components/optimization/LineChart";


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

    const emptyData = {
        label: [],
        activePower: [],
    };

    

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
    const [displayBasic, setDisplayBasic] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [position, setPosition] = useState("center");
    const [barChartData, setBarChartData] = useState(emptyData);
    const [isChartButton, setIsChartButton] = useState(false);

    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            const resFeederList = await feederService.getAllUserFeeders();
            if (resFeederList.success) {
                setFeederList(resFeederList.object);
            }
        }
        loadData().then(res => {
            setLoading(false);
        });

    }, [])

    const loadChartData = async () => {
        
        const requestChart = {
            feederId:feederId.id,
            month:month,
            day:day,
            hour:hour
        };
        const resAnnualLoadList =
            await rPowerService.getVoltageChart(requestChart);

        if (resAnnualLoadList.success) {
            
            setBarChartData(resAnnualLoadList.object);
        }

    }

    const [capacityOfNewPv, setCapacityOfNewPv] = useState('');
    const dropdownItems2 = [
        { name: 'Default', code: '1' },
        { name: 'Customized', code: '2' },
    ];

    const [newCapacity, setNewCapacity] = useState(false);

    const months = [
        { value: "1", label: "OCAK", key: 31 },
        { value: "2", label: "ŞUBAT", key: 28 },
        { value: "3", label: "MART", key: 31 },
        { value: "4", label: "NİSAN", key: 30 },
        { value: "5", label: "MAYIS", key: 31 },
        { value: "6", label: "HAZİRAN", key: 30 },
        { value: "7", label: "TEMMUZ", key: 31 },
        { value: "8", label: "AĞUSTOS", key: 31 },
        { value: "9", label: "EYLÜL", key: 30 },
        { value: "10", label: "EKİM", key: 31 },
        { value: "11", label: "KASIM", key: 30 },
        { value: "12", label: "ARALIK", key: 31 }
    ];
    const hours = [
        { value: "24", label: "Tüm Gün" },{ value: "0", label: "0" },
        { value: "1", label: "1" },{ value: "2", label: "2" },
        { value: "3", label: "3" },{ value: "4", label: "4"},
        { value: "5", label: "5" },{ value: "6", label: "6" },
        { value: "7", label: "7"},{ value: "8", label: "8"},
        { value: "9", label: "9"},{ value: "10", label: "10"},
        { value: "11", label: "11"},{ value: "12", label: "12"},
        { value: "13", label: "13" },{ value: "14", label: "14" },
        { value: "15", label: "15" },{ value: "16", label: "16"},
        { value: "17", label: "17" },{ value: "18", label: "18" },
        { value: "19", label: "19"},{ value: "20", label: "20"},
        { value: "21", label: "21"}, { value: "22", label: "22"},
        { value: "23", label: "23"}
    ];

  
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [days, setDays] = useState([]);
    const [hour, setHour] = useState([]);



    const changeFeeder = (data) => {
        
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
        const element = [];
        let i = 1;
        for (let index = 0; index < months[data - 1].key; index++) {
            element[i] = i;
            i++;

        }
        setDays(element);

    }
    const daysChangeHandler = (data) => {
        setDay(data);

    }
    const hoursChangeHandler = (data) => {
        
        setIsChartButton (true);
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
            month: month,
            day: day,
            hour: hour,
            pvData: dropdownItem
        }

        const response = await rPowerService.exeucte(ReactivePowerOp);

        if (response.success) {
            //toastBR.current.show({ severity: 'success', summary: 'Sonuç için bekleyiniz', detail: 'Başarılı', life: 10000 });
            props.toast("success","success");
            history.push("/reactivePower")
        }
        else {
            toastBR.current.show({ severity: 'error', summary: 'Error Message', detail: response.message, life: 10000 });
        }

    }
    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
    };
    const onClick = (name, position) => {
        
        dialogFuncMap[`${name}`](true);
        loadChartData();
        if (position) {
            setPosition(position);
            setIsShow(true)
        }
    };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        setIsShow(false);
    };

    return (
        <div className="col-12">
            <Toast ref={toastBR} position="top-right" />
            <div className="card">
                <h5>Reaktif Güç Optimizasyonu</h5>
                <div className="grid">
                    <div className="col-4">
                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="name1">Fider Adı</label>
                                <Dropdown id="state" value={feederId} onChange={(e) => changeFeeder(e.value)} options={feederList} optionLabel="name" placeholder="Fider Seçiniz"></Dropdown>
                            </div>
                            {isSelectPV && <div className="field">
                                <label htmlFor="state">Reaktif Güç Desteği Alınacak PV'ler</label>
                                <MultiSelect value={dropdownItem} options={dropdownItems} onChange={(e) => avaiableRPowerDropHandler(e.value)} optionLabel="name" placeholder="PV Seçiniz" maxSelectedLabels={3} selectedItemsLabel="{} PV Seçildi"/>
                            </div>
                            }

                            {isSelectPV && <div className="p-fluid grid formgrid">
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="age1">Ay</label>
                                    <Dropdown id="month" value={month}
                                        onChange={(e) => monthsChangeHandler(e.value)}
                                        options={months}
                                        placeholder="Seçiniz" ></Dropdown>
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="age1">Gün</label>
                                    <Dropdown id="day" value={day}
                                        onChange={(e) => daysChangeHandler(e.value)}
                                        options={days}
                                        placeholder="Seçiniz"  ></Dropdown>
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="age1">Saat</label>
                                    <Dropdown id="hour" value={hour}
                                        onChange={(e) => hoursChangeHandler(e.value)}
                                        options={hours}
                                        placeholder="Seçiniz" ></Dropdown>
                                </div>
                                <Divider layout="horizontal" align="center" />
                                <div>
                                    <Button
                                        disabled={!isChartButton}
                                        label="Gerilim Grafiği"
                                        icon="pi pi-external-link"
                                        onClick={() => onClick("displayBasic")}
                                    />
                                </div>
                                

                            </div>
                            }

                        </div>

                    </div>
                    <div className="col-1">
                        <Divider layout="vertical">
                        </Divider>
                    </div>

                    {feederId === '' && <div className="col-6 align-items-center justify-content-center">
                        <Message severity="info" text="Lütfen fider seçiniz!" />
                    </div>}
                    {feederId !== '' && <div className="col-6 align-items-center justify-content-center">
                        <OptimizationRightContext feederId={feederId.id} pvs={dropdownItem} /> 

                        <Divider align="right">
                            <Button label="Uygula" icon="pi pi-search" className="p-button-outlined" onClick={execute}></Button>
                        </Divider>
                    </div>
                    }
                    <Dialog
                        header="Reaktif Güç Optimizasyonu"
                        visible={displayBasic}
                        style={{ width: "100%" }}
                        onHide={() => onHide("displayBasic")}
                    >
                        <LineChart data={barChartData} />
                    </Dialog>
                </div>
            </div>
        </div>

    )
}

export default ReactivePower;